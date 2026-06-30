# Cervical Curve Guide Traffic Watch Plan

Created: 2026-06-09
Timezone: Asia/Shanghai

## Current Baseline

- Domain: `cervicalcurveguide.com`
- Live sitemap: `220` page URLs after the 2026-06-15 GSC response sprint.
- GA4 property: `Cervical Curve Guide`
- GA4 latest check on 2026-06-30: last 7 days active users `1`, events `3`, Organic Search sessions `1`; realtime self-test passed after delay.
- GSC latest check on 2026-06-30: `8` clicks, `1250` impressions, `0.6%` CTR, average position `53` for the available 28-day window.
- GSC indexing latest check on 2026-06-30: indexed `48`, not indexed `136`; index report still dated 2026-06-12; sitemap `/sitemap.xml` was last read successfully on 2026-06-29 with `220` discovered URLs.

## Main Goal

Get the site from "submitted" to "alive" by watching for the first Google impressions, then use those early signals to decide what to rewrite, internally link, expand, or promote externally.

Do not optimize blindly from traffic estimates. For this site, the first meaningful signal is:

1. GSC impressions appear.
2. Queries and pages appear.
3. Clicks begin.
4. GA4 records real consented visits.

## Daily 10-Minute Watch

Run this once per day from 2026-06-10 to 2026-06-16.

### 1. Google Search Console: Performance

Open:

`Google Search Console -> https://cervicalcurveguide.com/ -> Performance`

Check:

- Total clicks
- Total impressions
- Average position
- Queries table
- Pages table
- Last updated timestamp

Record one line in the log below.

### 2. Google Search Console: Pages

Open:

`Google Search Console -> Indexing -> Pages`

Check:

- Indexed page count
- Not indexed page count
- Main not-indexed reasons
- Whether sitemap discovery is moving from the old `36` count toward `152`

### 3. Google Search Console: Sitemaps

Open:

`Google Search Console -> Indexing -> Sitemaps -> /sitemap.xml`

Check:

- Sitemap status
- Discovered URLs
- Last read date

### 4. GA4 Realtime Self-Test

Open the live site in a normal browser session:

`https://cervicalcurveguide.com/`

Accept the analytics notice, then check:

`GA4 -> Reports -> Realtime overview`

Expected result:

- Realtime active users should briefly show `1`.
- If it stays `0`, investigate analytics consent or the GA4 script before interpreting traffic numbers.

## Decision Rules

| Signal | Meaning | Action |
| --- | --- | --- |
| GSC Performance still says processing | Google has not produced usable performance data yet | Wait, but keep checking Pages and Sitemaps |
| `0` impressions after 72 hours | Google may not be crawling or ranking the pages yet | Inspect top priority URLs, confirm 200/canonical/sitemap, request indexing, and add external discovery seeds |
| Impressions appear, clicks stay `0` | Google is testing pages but snippets are not winning clicks | Rewrite titles/meta for pages with impressions |
| Average position `8-20` | Page is close enough to push | Add internal links, improve the direct answer, add FAQ/detail sections |
| Average position `20-50` | Topic has a weak early signal | Expand only if the query is distinct from existing content |
| Page indexed but no impressions for 7 days | Page may be too broad, weakly linked, or poorly matched to demand | Add internal links from hubs and sharpen title/H1/intro |
| GA4 self-test fails | Analytics data is not trustworthy yet | Fix analytics consent/script before using GA4 for traffic decisions |

## Priority URLs To Watch

Check these first in URL Inspection and in the Pages/Performance reports:

1. `https://cervicalcurveguide.com/`
2. `https://cervicalcurveguide.com/cervical-curve/`
3. `https://cervicalcurveguide.com/cervical-kyphosis/`
4. `https://cervicalcurveguide.com/loss-of-cervical-lordosis/`
5. `https://cervicalcurveguide.com/cervical-radiculopathy/`
6. `https://cervicalcurveguide.com/articles/finger-numbness-nerve-map/`
7. `https://cervicalcurveguide.com/articles/cervical-kyphosis-vs-loss-lordosis/`
8. `https://cervicalcurveguide.com/printable-neck-symptom-tracker/`
9. `https://cervicalcurveguide.com/tools/`
10. `https://cervicalcurveguide.com/articles/is-loss-of-cervical-lordosis-serious/`
11. `https://cervicalcurveguide.com/articles/mild-cervical-kyphosis-symptoms/`
12. `https://cervicalcurveguide.com/articles/can-cervical-kyphosis-cause-hand-numbness/`
13. `https://cervicalcurveguide.com/articles/normal-cervical-lordosis-vs-straight-neck/`
14. `https://cervicalcurveguide.com/articles/cervical-kyphosis-exercises-to-avoid/`
15. `https://cervicalcurveguide.com/articles/c6-c7-numbness-thumb-index-middle-finger/`

## First 7-Day Plan

### 2026-06-10

- Check GSC Performance for first impressions.
- Check GSC Pages and Sitemaps for updated discovered/indexed counts.
- Run the GA4 realtime self-test by accepting the analytics notice.
- If GA4 self-test fails, fix analytics before doing SEO analysis.

### 2026-06-11

- Recheck GSC Performance.
- If impressions appear, note the first queries and pages.
- If still no data, inspect the top 5 priority URLs in URL Inspection.

### 2026-06-12

- If GSC still has `0` impressions, add discovery seeds:
  - Link one original diagram from a relevant forum/community answer.
  - Share the printable tracker only where it directly helps the discussion.
  - Use UTM tags for owned posts only.
- Do not spam communities; answer the question first, link only when useful.

### 2026-06-13 to 2026-06-14

- If impressions exist:
  - Improve titles/meta for pages with impressions and no clicks.
  - Add 2-4 internal links to pages ranking `8-20`.
- If no impressions:
  - Keep focus on indexing, sitemap processing, and a few real external discovery links.

### 2026-06-15

- Export GSC queries and pages if data exists.
- Run:

```bash
node scripts/analyze-gsc-export.mjs <export.csv> --write
```

- Use `GSC_REFRESH_PLAN.md` as the action list.

### 2026-06-16

- Review the first week:
  - Did impressions appear?
  - Which URLs are indexed?
  - Which pages received any impressions?
  - Did GA4 record consented visits?
- Choose one of three next moves:
  - No impressions: indexing/discovery sprint.
  - Impressions but no clicks: title/meta sprint.
  - Positions `8-20`: internal-link and content-depth sprint.

## Weekly Loop After First Data Appears

Every week:

1. Export GSC queries for the last 28 days.
2. Export GSC pages for the last 28 days.
3. Run the local analyzer script.
4. Refresh the top 5 high-impression, low-CTR pages.
5. Add internal links to pages ranking `8-20`.
6. Create new pages only for distinct long-tail queries that rank `20-50`.
7. Re-submit materially changed URLs through URL Inspection and IndexNow.

## Traffic Log

| Date | GSC clicks | GSC impressions | Avg position | Indexed pages | Sitemap discovered URLs | GA4 7-day users | GA4 realtime self-test | Notes | Next action |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| 2026-06-09 | 0 | 0 | n/a | Homepage eligible/indexed; report still processing | 36 visible in previous GSC note; live sitemap has 152 URLs | 0 | Not yet confirmed by self-test | GSC Performance still processing; GA4 shows no data | Recheck on 2026-06-10 |
| 2026-06-10 | 0 | 0 | n/a | Processing; counts unavailable | 152 | 2 | Realtime active users 0 | GSC Performance and Pages still processing; sitemap `/sitemap.xml` was read on 2026-06-10 and is successful. GA4 now shows Direct 6 sessions and Organic Search 2 sessions in the early traffic data. | Recheck GSC tomorrow; if still no Performance data, inspect the top 5 priority URLs. |
| 2026-06-10 follow-up | 0 | 0 | n/a | Public priority URLs return 200 with indexable canonicals; old `/en/` URLs are noindex meta-refresh fallbacks | 156 live sitemap URLs; local sitemap files all exist | 2 | Front-end consent logic passed; GA4 dashboard realtime still needs logged-in confirmation | Top priority URLs are reachable, indexable, and load analytics script. Added Cloudflare Pages `_redirects` and Netlify forced 301 rules for old `/en/*` paths. | Confirm GA4 realtime in the logged-in dashboard, then execute D1 no-link community warm-up comments. |
| 2026-06-11 | 0 | 0 | n/a | Processing; counts unavailable | 156 | 4 | Realtime active users 0 | GSC Performance now loads but still has 0 clicks and 0 impressions; Pages report is still processing. GA4 shows 73 events, 15 sessions, Direct 8 sessions, and Organic Search 7 sessions in the last 7 days. | Continue daily GSC watch; if GSC remains 0 on 2026-06-12, start the discovery-seed actions in the plan. |
| 2026-06-12 | 2 | 22 | 59 | Processing; counts unavailable | 180 after local build | 4 | Realtime active users 0 | GSC Performance is now live: 2 clicks, 22 impressions, 9.1% CTR, average position 59, and 14 query rows. Early query impressions include `cervical kyphosis symptoms`, `normal cervical curvature`, `cervical lordosis 中文`, and `loss of normal cervical lordosis`. GA4 remains at 4 active users, 73 events, Direct 8 sessions, and Organic Search 7 sessions over the last 7 days. | Early-query optimization executed on canonical English URLs and second long-tail sprint generated 6 new article topics across 4 languages: loss of lordosis serious, mild kyphosis symptoms, hand numbness, normal lordosis vs straight neck, exercises to avoid, and C6/C7 finger numbness. Next: deploy, submit the 6 new English URLs in GSC, then publish only high-fit external seed answers/pins. |
| 2026-06-14 | 3 | 80 | 29.7 | 7 indexed; 15 not indexed, main reason `Crawled - currently not indexed` | 200 | 4 | Realtime active users 0 | GSC impressions are rising and the site has first clicks. Top visible pages still include old `/en/*` URLs, but the canonical English URLs are also receiving impressions. GA4 shows Organic Search 10 sessions and Direct 9 sessions over the last 7 days; realtime self-test still did not show an active user. | Improve titles/meta for high-impression low-click canonical pages, keep sitemap at 200 URLs, submit changed canonical URLs for indexing, and fix real 301 redirects for old `/en/*` at hosting/CDN level. |
| 2026-06-15 | 3 | 138 | 41.5 | 48 indexed; 136 not indexed, main reasons include `Discovered - currently not indexed` and `Crawled - currently not indexed` | 220 live sitemap; GSC row still showed 200 before resubmission | Not checked | Not checked | Published 5 four-language GSC response pages, refreshed high-impression title/meta targets, removed old noindex redirect risk in the prior commit, submitted 220 URLs to IndexNow/Bing, requested indexing for 8 priority URLs in GSC, and resubmitted `/sitemap.xml`. | Recheck GSC sitemap and Page Indexing in 24-72 hours; execute only high-fit Reddit/Quora/Pinterest distribution from the execution package. |
| 2026-06-23 | 6 | 667 | 51 | 48 indexed; 136 not indexed, index report still dated 2026-06-12 | 220 | 1 | Passed after delay: realtime showed 1 active user and page_view/session_start/user_engagement | GSC exposure grew but CTR fell to 0.9%. Top high-impression 0-click pages: `/articles/mild-cervical-kyphosis-symptoms/` 183 impressions, `/cervical-kyphosis/` 82, `/articles/reversal-of-cervical-lordosis-meaning/` 77, `/articles/kyphosis-cervical-spine-symptoms/` 51. GA4 remains a low-volume consented-session view: 1 user, 3 events, 1 Organic Search session in 7 days. | Execute high-impression low-CTR title/meta sprint on the four exposed pages; do not create new pages until existing exposed pages earn better CTR. |
| 2026-06-30 | 8 | 1250 | 53 | 48 indexed; 136 not indexed, index report still dated 2026-06-12 | 220 | 1 | Passed after delay: realtime showed 1 active user and page_view/session_start/user_engagement | Exposure continued growing but CTR fell to 0.6%. Top query: `kyphosis exercises to avoid` 2 clicks / 60 impressions. High-exposure 0-click pages remained `/articles/mild-cervical-kyphosis-symptoms/` 263 impressions, `/cervical-kyphosis/` 164, and `/articles/kyphosis-cervical-spine-symptoms/` 94. Old `/en/` redirect shells still received impressions while returning 200 meta-refresh pages. | Add `noindex,follow` to old `/en/` redirect shells and add exact-query direct-answer/FAQ sections to the two highest-exposure 0-click canonical pages. |

## What Not To Do Yet

- Do not apply for AdSense until impressions and visits are stable.
- Do not add fake visits, fake testimonials, or fake medical endorsement.
- Do not create lots of low-quality pages just because GSC is slow.
- Do not rewrite every page before seeing first impressions.
- Do not rely on Similarweb or third-party estimates for this new site.
