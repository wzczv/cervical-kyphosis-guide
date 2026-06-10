#!/usr/bin/env node
/**
 * One-command AdSense go-live for cervicalcurveguide.com
 * ------------------------------------------------------
 * Run this ONLY after AdSense approval, with your real publisher ID:
 *
 *   node scripts/enable-ads.mjs ca-pub-1234567890123456
 *   node scripts/enable-ads.mjs ca-pub-1234567890123456 --slot=9876543210   (optional manual unit)
 *   node scripts/enable-ads.mjs ca-pub-1234567890123456 --dry-run           (preview, change nothing)
 *
 * What it does (idempotent — safe to re-run):
 *   1. assets/ads.js      → sets ENABLED=true and writes your publisher ID (and slot ID if given)
 *   2. assets/analytics.js→ converts its consent "default" block to a consent "update"
 *                           (required so it cooperates with ads.js, which now owns the defaults)
 *   3. every *.html page that loads analytics.js → injects <script src="/assets/ads.js">
 *                           immediately BEFORE the analytics.js tag (consent defaults must run first)
 *   4. ads.txt            → creates it at the site root with your publisher ID
 *
 * After running: review `git diff`, then commit & push. Done.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const args = process.argv.slice(2);
const pubId = args.find((a) => a.startsWith("ca-pub-"));
const slotArg = args.find((a) => a.startsWith("--slot="));
const dryRun = args.includes("--dry-run");
const slotId = slotArg ? slotArg.split("=")[1] : "";

if (!pubId || !/^ca-pub-\d{10,}$/.test(pubId)) {
  console.error("Usage: node scripts/enable-ads.mjs ca-pub-XXXXXXXXXXXXXXXX [--slot=NNNNNNNNNN] [--dry-run]");
  process.exit(1);
}

const summary = { adsJs: false, analyticsJs: false, injected: 0, alreadyInjected: 0, adsTxt: false, skipped: 0 };

/* 1. Patch assets/ads.js ------------------------------------------------- */
{
  const file = join(ROOT, "assets/ads.js");
  let src = readFileSync(file, "utf8");
  const before = src;
  src = src.replace(/const ENABLED = (?:false|true);/, "const ENABLED = true;");
  src = src.replace(/const PUBLISHER_ID = "ca-pub-[^"]*";/, `const PUBLISHER_ID = "${pubId}";`);
  if (slotId) src = src.replace(/const AD_SLOT_ID = "[^"]*";/, `const AD_SLOT_ID = "${slotId}";`);
  if (!src.includes(`const PUBLISHER_ID = "${pubId}";`) || !src.includes("const ENABLED = true;")) {
    console.error("FATAL: could not patch assets/ads.js (pattern not found). Aborting, nothing written.");
    process.exit(1);
  }
  summary.adsJs = src !== before;
  if (!dryRun && summary.adsJs) writeFileSync(file, src);
}

/* 2. Patch assets/analytics.js: consent default → consent update ---------- */
{
  const file = join(ROOT, "assets/analytics.js");
  let src = readFileSync(file, "utf8");
  const defaultBlock = /window\.gtag\("consent", "default", \{[\s\S]*?\}\);/;
  const replacement = `window.gtag("consent", "update", {\n      analytics_storage: "granted"\n    });`;
  if (defaultBlock.test(src)) {
    src = src.replace(defaultBlock, replacement);
    summary.analyticsJs = true;
    if (!dryRun) writeFileSync(file, src);
  } else if (src.includes('window.gtag("consent", "update"')) {
    summary.analyticsJs = false; // already patched on a previous run
  } else {
    console.error("FATAL: analytics.js consent block not found — file changed since this script was written. Aborting.");
    process.exit(1);
  }
}

/* 3. Inject ads.js into every page that loads analytics.js ---------------- */
const STAMP = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const ADS_TAG = `<script src="/assets/ads.js?v=${STAMP}"></script>`;

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith(".html")) yield p;
  }
}

for (const file of htmlFiles(ROOT)) {
  const src = readFileSync(file, "utf8");
  if (!src.includes("/assets/analytics.js")) { summary.skipped++; continue; }
  if (src.includes("/assets/ads.js")) { summary.alreadyInjected++; continue; }
  const patched = src.replace(
    /(<script src="\/assets\/analytics\.js[^"]*"[^>]*><\/script>)/,
    `${ADS_TAG}\n    $1`
  );
  if (patched === src) { summary.skipped++; continue; }
  summary.injected++;
  if (!dryRun) writeFileSync(file, patched);
}

/* 4. ads.txt --------------------------------------------------------------- */
{
  const file = join(ROOT, "ads.txt");
  const line = `google.com, ${pubId.replace("ca-pub-", "pub-")}, DIRECT, f08c47fec0942fa0\n`;
  if (!existsSync(file) || readFileSync(file, "utf8") !== line) {
    summary.adsTxt = true;
    if (!dryRun) writeFileSync(file, line);
  }
}

console.log(`${dryRun ? "[DRY RUN] " : ""}enable-ads summary`);
console.log(`  ads.js patched:        ${summary.adsJs}`);
console.log(`  analytics.js patched:  ${summary.analyticsJs}`);
console.log(`  pages injected:        ${summary.injected}`);
console.log(`  already injected:      ${summary.alreadyInjected}`);
console.log(`  pages skipped:         ${summary.skipped}`);
console.log(`  ads.txt written:       ${summary.adsTxt}`);
console.log(dryRun ? "No files were changed." : "Done. Review `git diff`, then commit & push.");
