# Cervical Curve Guide SEO Monitoring

Last updated: 2026-06-09

## Current Verified Setup

| Area | Status | Evidence to check |
| --- | --- | --- |
| HTTPS | Done | `https://cervicalcurveguide.com/` returns 200; `http://` redirects to HTTPS |
| Google Search Console | Done | Property: `https://cervicalcurveguide.com/` |
| Google sitemap | Done | GSC Sitemaps: `/sitemap.xml`, status `Success` |
| Bing Webmaster Tools | Done | Site: `cervicalcurveguide.com`; sitemap resubmitted and currently `Processing` after expansion |
| IndexNow | Done | Key file: `/16d893c718cadee9837fbde922d08c8f.txt`; API accepted 120 sitemap URLs |
| GA4 | Done | Property: `Cervical Curve Guide`; measurement ID `G-L8TWWKFELJ` |

## Daily Search Console Check

| Date | GSC sitemap status | Discovered URLs | Indexed pages | Not indexed reasons | Manual URL checks | Notes |
| --- | --- | ---: | ---: | --- | --- | --- |
| 2026-06-09 | Success | 36 visible in GSC after resubmitting expanded 120-URL sitemap; processing may lag | Homepage URL Inspection says indexed; priority article pages requested and pending | Page indexing report still processing; new URLs may need crawl/index time | Homepage plus 5 priority article URLs checked/requested | Public Google `site:` visibility may lag behind URL Inspection; Bing sitemap resubmitted and processing 36 at latest check |

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
| 2026-06-09 | `https://cervicalcurveguide.com/articles/cervical-kyphosis-vs-loss-lordosis/` | URL Inspection: not yet indexed before request; request indexing accepted | Recheck in 24-72 hours |
| 2026-06-09 | `https://cervicalcurveguide.com/articles/cervical-radiculopathy-myelopathy-red-flags/` | Request indexing accepted | Recheck in 24-72 hours |
| 2026-06-09 | `https://cervicalcurveguide.com/articles/can-cervical-curve-be-restored/` | Request indexing accepted | Recheck in 24-72 hours |
| 2026-06-09 | `https://cervicalcurveguide.com/articles/traction-pillow-manipulation-risk-guide/` | Request indexing accepted | Recheck in 24-72 hours |
| 2026-06-09 | `https://cervicalcurveguide.com/en/articles/cervical-kyphosis-vs-loss-lordosis/` | Request indexing accepted | Recheck in 24-72 hours |

## Sitemap and IndexNow Submission Log

| Date | Platform | Submitted | Visible result | Follow-up |
| --- | --- | --- | --- | --- |
| 2026-06-09 | Google Search Console | `https://cervicalcurveguide.com/sitemap.xml` | Success; discovered URLs updated to 36 | Recheck Page Indexing after crawl |
| 2026-06-09 | IndexNow API | 36 sitemap URLs | Accepted by IndexNow endpoint | Watch Bing Webmaster Tools and server logs |
| 2026-06-09 | Bing Webmaster Tools | `https://cervicalcurveguide.com/sitemap.xml` | Submitted; row shows Processing and 19 discovered URLs at check time | Recheck later for 36 discovered URLs |
| 2026-06-09 | Google Search Console | Expanded `https://cervicalcurveguide.com/sitemap.xml` with 120 URLs | Submit confirmation shown; table still displays 36 discovered URLs immediately after submit | Recheck for 120 discovered URLs after processing |
| 2026-06-09 | IndexNow API | 120 sitemap URLs | Accepted by IndexNow and Bing IndexNow endpoints | Watch Bing Webmaster Tools processing |
| 2026-06-09 | Bing Webmaster Tools | Expanded `https://cervicalcurveguide.com/sitemap.xml` with 120 URLs | Submit success toast; row shows Processing and 36 discovered URLs immediately after submit | Recheck for 120 discovered URLs after processing |

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
