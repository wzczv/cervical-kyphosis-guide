# Cervical Curve Guide SEO Monitoring

Last updated: 2026-06-09

## Current Verified Setup

| Area | Status | Evidence to check |
| --- | --- | --- |
| HTTPS | Done | `https://cervicalcurveguide.com/` returns 200; `http://` redirects to HTTPS |
| Google Search Console | Done | Property: `https://cervicalcurveguide.com/` |
| Google sitemap | Done | GSC Sitemaps: `/sitemap.xml`, status `Success` |
| Bing Webmaster Tools | Done | Site: `cervicalcurveguide.com`; sitemap status `Success` |
| IndexNow | Done | Key file: `/16d893c718cadee9837fbde922d08c8f.txt`; API accepted sitemap URLs |
| GA4 | Done | Property: `Cervical Curve Guide`; measurement ID `G-L8TWWKFELJ` |

## Daily Search Console Check

| Date | GSC sitemap status | Discovered URLs | Indexed pages | Not indexed reasons | Manual URL checks | Notes |
| --- | --- | ---: | ---: | --- | --- | --- |
| 2026-06-09 | Success | 19 before new article expansion; sitemap expanded to 36 URLs locally | Homepage URL Inspection says indexed | Page indexing report still processing | Homepage checked | Public Google `site:` visibility may lag behind URL Inspection |

## Key Queries To Track Weekly

| Query | Target page | Locale |
| --- | --- | --- |
| cervical kyphosis | `/en/` | English |
| loss of cervical lordosis | `/en/articles/cervical-kyphosis-vs-loss-lordosis/` | English |
| cervical radiculopathy finger numbness | `/en/articles/finger-numbness-nerve-map/` | English |
| 颈椎反弓 | `/` | Chinese |
| 颈椎生理曲度变直 | `/articles/cervical-kyphosis-vs-loss-lordosis/` | Chinese |
| 手麻 颈椎 神经根 | `/articles/finger-numbness-nerve-map/` | Chinese |
| 頸椎 後弯 しびれ | `/ja/articles/finger-numbness-nerve-map/` | Japanese |
| cifosis cervical dedos dormidos | `/es/articles/finger-numbness-nerve-map/` | Spanish |

## Manual Indexing Workflow

1. Open Google Search Console URL Inspection.
2. Inspect the exact canonical HTTPS URL.
3. If the page is new or has changed, click **Request indexing** when available.
4. Record the URL and result below.
5. Recheck Page Indexing and Performance after 24-72 hours.

## Manual Indexing Log

| Date | URL | Result | Follow-up |
| --- | --- | --- | --- |
| 2026-06-09 | `https://cervicalcurveguide.com/` | URL Inspection: indexed and eligible for Google Search | Recheck public result visibility |

## Weekly Quality Checks

| Check | Why it matters |
| --- | --- |
| New pages in sitemap are 200 | Prevent submitted broken URLs |
| Canonical points to HTTPS final URL | Avoid duplicate/canonical confusion |
| `hreflang` alternates match real language pages | Help Google serve the right locale |
| Article structured data parses as JSON-LD | Avoid rich-result/report errors |
| Internal links from homepage and related articles work | Improve discovery and topical clustering |
| Medical disclaimer and review status are visible | Strengthen trust for YMYL health content |
| GA4 active users/events appear after consented visits | Confirm analytics collection |
