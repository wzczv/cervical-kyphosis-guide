import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const positional = [];
let writePlan = false;
let outputFile = "GSC_REFRESH_PLAN.md";

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === "--write") {
    writePlan = true;
    if (args[i + 1] && !args[i + 1].startsWith("-")) {
      outputFile = args[i + 1];
      i += 1;
    }
  } else if (arg.startsWith("--write=")) {
    writePlan = true;
    outputFile = arg.slice("--write=".length) || outputFile;
  } else {
    positional.push(arg);
  }
}

const file = positional[0];
if (!file) {
  console.log("Usage: node scripts/analyze-gsc-export.mjs <search-console-queries-or-pages.csv> [--write[=GSC_REFRESH_PLAN.md]]");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (field || row.length) rows.push([...row, field]);
      row = [];
      field = "";
      if (char === "\r" && next === "\n") i += 1;
    } else {
      field += char;
    }
  }
  if (field || row.length) rows.push([...row, field]);
  return rows;
}

const rows = parseCsv(readFileSync(file, "utf8"));
const headers = rows.shift().map((item) => item.trim().toLowerCase());
const index = (names) =>
  headers.findIndex((header) => names.some((name) => header === name || header.includes(name)));
const queryIndex = index(["query", "queries", "page", "pages"]);
const clicksIndex = index(["clicks"]);
const impressionsIndex = index(["impressions"]);
const ctrIndex = index(["ctr"]);
const positionIndex = index(["position"]);

const missing = [
  ["query/page", queryIndex],
  ["clicks", clicksIndex],
  ["impressions", impressionsIndex],
  ["ctr", ctrIndex],
  ["position", positionIndex]
]
  .filter(([, columnIndex]) => columnIndex < 0)
  .map(([name]) => name);

if (missing.length) {
  throw new Error(`Missing expected Search Console columns: ${missing.join(", ")}. Found: ${headers.join(", ")}`);
}

const data = rows
  .map((row) => ({
    item: row[queryIndex] || "(unknown)",
    clicks: Number(row[clicksIndex] || 0),
    impressions: Number(row[impressionsIndex] || 0),
    ctr: Number(String(row[ctrIndex] || "0").replace("%", "")),
    position: Number(row[positionIndex] || 0)
  }))
  .filter((row) => row.impressions > 0 || row.clicks > 0);

const highImpressionLowCtr = data
  .filter((row) => row.impressions >= 50 && row.ctr < 2)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 20);

const strikingDistance = data
  .filter((row) => row.position >= 8 && row.position <= 20 && row.impressions >= 10)
  .sort((a, b) => a.position - b.position)
  .slice(0, 20);

const newLongTail = data
  .filter((row) => row.position > 20 && row.position <= 50 && row.impressions >= 10)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 20);

function printGroup(title, rowsToPrint, recommendation) {
  console.log(`\n${title}`);
  console.log(recommendation);
  for (const row of rowsToPrint) {
    console.log(`- ${row.item} | clicks ${row.clicks} | impressions ${row.impressions} | CTR ${row.ctr}% | pos ${row.position}`);
  }
}

console.log(`Rows analyzed: ${data.length}`);
printGroup("High impressions, low CTR", highImpressionLowCtr, "Action: improve title/meta, clarify search intent, add stronger intro.");
printGroup("Positions 8-20", strikingDistance, "Action: add internal links, expand sections, improve topical match.");
printGroup("Positions 20-50", newLongTail, "Action: consider new long-tail pages or hub sections.");

function escapeTable(value) {
  return String(value).replace(/\|/g, "\\|");
}

function markdownTable(rowsToPrint) {
  if (!rowsToPrint.length) return "_No matching rows in this export._";
  return [
    "| Query or page | Clicks | Impressions | CTR | Position | Suggested action |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
    ...rowsToPrint.map((row) => {
      const action =
        row.position <= 20
          ? "Refresh title/meta and add internal links from the nearest hub."
          : "Check whether intent is distinct enough for a new section or article.";
      return `| ${escapeTable(row.item)} | ${row.clicks} | ${row.impressions} | ${row.ctr}% | ${row.position} | ${action} |`;
    })
  ].join("\n");
}

if (writePlan) {
  const generatedAt = new Date().toISOString().slice(0, 10);
  const markdown = `# GSC Refresh Plan

Generated: ${generatedAt}
Source export: ${file}
Rows analyzed: ${data.length}

## High Impressions, Low CTR

Action: improve title/meta, clarify search intent in the opening answer, and make the page title match the exact query language.

${markdownTable(highImpressionLowCtr)}

## Positions 8-20

Action: add internal links from hubs and related articles, expand the section that answers the query, and add a concise answer near the top.

${markdownTable(strikingDistance)}

## Positions 20-50

Action: use these as long-tail candidates only when they show a distinct reader intent that is not already answered well.

${markdownTable(newLongTail)}

## Next Sprint Checklist

- Refresh the top 5 high-impression titles and descriptions.
- Add 2-4 contextual internal links to each position 8-20 page.
- Turn only clearly distinct position 20-50 intents into new source-backed pages.
- Rebuild the sitemap and resubmit after meaningful content changes.
`;
  writeFileSync(outputFile, markdown);
  console.log(`\nWrote ${outputFile}`);
}
