# Traffic and Monetization Roadmap

Last updated: 2026-06-09

## Current Status

- Search setup is already documented in `SEO_MONITORING.md`: Google Search Console, Bing Webmaster Tools, IndexNow, sitemap, and GA4 are marked done.
- The site now has a practical conversion path: homepage resource CTA, article tracker CTA, printable 7-day tracker, contact page, and trust/legal pages.
- Real-time DataForSEO tools were not available in this environment, so this roadmap avoids invented search volume or difficulty scores.

## Deployment Priority

1. Keep GitHub Pages as the current publish path if that is already working.
2. If moving to Cloudflare Pages or Netlify, keep `_headers` in the publish root so security and cache headers apply.
3. Enable Brotli/gzip compression at the CDN/platform level.
4. Set long cache TTL for `/assets/*`, `/assets/og/*`, `/assets/visuals/*`, and `favicon.svg`.
5. Keep HTML, `sitemap.xml`, `robots.txt`, and `llms.txt` on short cache TTL so content updates propagate quickly.

## Weekly SEO Loop

1. Export GSC query and page data for the last 28 days.
2. Run `node scripts/analyze-gsc-export.mjs <export.csv> --write`.
3. Prioritize queries with high impressions and low CTR for title/meta rewrites.
4. Prioritize average positions 8-20 for internal-link boosts and richer answer sections.
5. Turn positions 20-50 into new pages only when the intent is distinct from existing pages.
6. Re-submit materially changed URLs through URL Inspection and IndexNow.

## Content Queue

| Priority | Cluster | Target intent | Proposed page | Primary internal links |
| --- | --- | --- | --- | --- |
| 1 | Exercises | Exercise searcher wants safe starting dose | Cervical kyphosis exercises: what to try, what to avoid, and how to progress | `/exercises/`, `/printable-neck-symptom-tracker/` |
| 2 | Treatments | Pillow buyers and anxious report readers | Neck curve correction pillow: comfort tool or curve fix? | `/treatments/`, `/articles/pillow-height-sleep-position/` |
| 3 | Imaging | Report interpretation | Reversal of cervical lordosis on MRI: what it can and cannot tell you | `/diagnosis/`, `/loss-of-cervical-lordosis/` |
| 4 | Symptoms | High-intent nerve symptom search | Neck pain and tingling fingers at night: neck, wrist, or elbow? | `/symptoms/`, `/articles/morning-hand-numbness-differential/` |
| 5 | Sports | Return-to-activity query | Weightlifting with cervical kyphosis: load rules and warning signs | `/sports/`, `/articles/strength-training-with-cervical-kyphosis/` |
| 6 | Tools | Shareable utility | Neck symptom log template for doctor visits | `/tools/`, `/printable-neck-symptom-tracker/` |
| 7 | Diagnosis | Clinical pathway | When neck X-ray is enough and when MRI/EMG may be discussed | `/diagnosis/`, `/articles/xray-mri-emg-what-tests-show/` |
| 8 | Treatments | Risk-aware manual therapy query | Chiropractor for cervical kyphosis: claims, risks, and safer questions | `/treatments/`, `/articles/massage-manipulation-safety/` |
| 9 | Symptoms | Red-flag differentiation | Neck pain with dizziness: cervicogenic, vestibular, or urgent? | `/symptoms/`, `/articles/headache-dizziness-neck-curve/` |
| 10 | Exercises | Desk-worker long tail | Forward head posture vs cervical kyphosis: overlap and differences | `/cervical-curve/`, `/articles/office-neck-curve-ergonomics/` |

## Conversion Path

| Stage | Page element | Goal |
| --- | --- | --- |
| First visit | Homepage secondary CTA | Send readers to the printable tracker without asking for sensitive data |
| Article read | Tracker CTA after medical callout | Convert anxious readers into tool users |
| Tool use | Print/save tracker button | Build trust and repeat visits |
| Follow-up | Contact page | Let readers ask site/editorial questions without creating medical consultation claims |
| Future opt-in | Email course or PDF bundle | Only add after privacy wording and email provider are configured |

## Monetization Order

1. Keep trust-first utility content as the base: tracker, diagrams, clear medical boundaries.
2. Apply for AdSense only after indexing and stable impressions improve.
3. Add `ads.txt` only after a real publisher ID exists.
4. Use at most one in-content ad and one end-of-article ad at first.
5. Do not place ads inside red-flag, emergency-care, disclaimer, or clinical-safety sections.
6. If adding affiliates later, only use products that can be framed as comfort/support tools, never as curve-correction cures.
7. Add a visible affiliate disclosure before any affiliate link appears.

## Distribution Experiments

| Channel | Asset | Guardrail |
| --- | --- | --- |
| Reddit / forums | Finger numbness map and tracker | Answer the thread first; link only when directly useful |
| Surf communities | Surfing neck load guide | Include trauma and neurological red-flag caveat |
| Snow sport communities | Ski/snowboard fall guide | Avoid advising return after significant trauma |
| Climbing communities | Belay neck pain guide | Position as load management, not diagnosis |
| Pinterest / image search | Original diagrams | Link to visual landing pages, not raw image files |
| YouTube comments | Video reference pages | Avoid spam; comment only when the exact drill is discussed |

## Do Not Do Yet

- Do not add fake testimonials, fake clinician review, or implied medical endorsement.
- Do not add `ads.txt` without a real publisher ID.
- Do not promise curve restoration, posture correction, or nerve-pain cures.
- Do not collect symptom details in a form until privacy, storage, and medical-boundary language are upgraded.
