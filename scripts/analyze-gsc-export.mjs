import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.log("Usage: node scripts/analyze-gsc-export.mjs <search-console-queries-or-pages.csv>");
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
const index = (name) => headers.findIndex((header) => header === name || header.includes(name));
const queryIndex = Math.max(index("query"), index("page"));
const clicksIndex = index("clicks");
const impressionsIndex = index("impressions");
const ctrIndex = index("ctr");
const positionIndex = index("position");

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
