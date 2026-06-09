import { readFileSync } from "node:fs";

const host = "cervicalcurveguide.com";
const key = readFileSync("16d893c718cadee9837fbde922d08c8f.txt", "utf8").trim();
const keyLocation = `https://${host}/${key}.txt`;
const sitemapUrl = process.argv.find((arg) => arg.startsWith("http")) || `https://${host}/sitemap.xml`;
const dryRun = process.argv.includes("--dry-run");
const endpoints = ["https://api.indexnow.org/IndexNow", "https://www.bing.com/indexnow"];

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
}

const response = await fetch(sitemapUrl, { redirect: "follow" });
if (!response.ok) {
  throw new Error(`Could not fetch sitemap ${sitemapUrl}: ${response.status}`);
}

const sitemap = await response.text();
const urlList = extractUrls(sitemap);
if (!urlList.length) {
  throw new Error(`No <loc> URLs found in ${sitemapUrl}`);
}

const payload = { host, key, keyLocation, urlList };

if (dryRun) {
  console.log(`Dry run: would submit ${urlList.length} URLs from ${sitemapUrl}`);
  console.log(urlList.join("\n"));
  process.exit(0);
}

for (const endpoint of endpoints) {
  const result = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload)
  });
  console.log(`${endpoint}: ${result.status} ${result.statusText}; submitted ${urlList.length} URLs`);
  if (!result.ok) {
    const text = await result.text();
    console.log(text.slice(0, 1000));
  }
}
