# Cervical Curve Guide Growth Playbook

Last updated: 2026-06-09

## Weekly Search Console Loop

1. Export Google Search Console queries and pages for the last 28 days.
2. Run `node scripts/analyze-gsc-export.mjs <export.csv> --write` to create `GSC_REFRESH_PLAN.md`.
3. Improve high-impression, low-CTR rows with clearer titles and meta descriptions.
4. Strengthen positions 8-20 with internal links, richer sections, and better answer matching.
5. Turn positions 20-50 into new long-tail articles only when the query has a distinct intent.

## Content Clusters

| Cluster | URL | Traffic role |
| --- | --- | --- |
| Symptoms | `/symptoms/` | Hand numbness, arm pain, headache, dizziness, red flags |
| Imaging | `/diagnosis/` | Report terms, MRI/X-ray/EMG, when to seek care |
| Exercises | `/exercises/` | Desk setup, sleep, strength training, rehab expectations |
| Treatments | `/treatments/` | Traction, pillow, massage, manipulation boundaries |
| Sports | `/sports/` | Surfing, skiing, snowboarding, climbing return-to-sport |
| Tools | `/tools/` | Original diagrams and response tracker for links/shares |
| Videos | `/videos/` | Reference videos kept secondary to on-site guidance |
| Pillars | `/cervical-kyphosis/`, `/loss-of-cervical-lordosis/`, `/cervical-radiculopathy/` | Broad English-first entry pages that consolidate authority and route users into long-tail articles |

## External Distribution

Use useful, non-spammy distribution only:

- Share the surfing guide in surf communities when the discussion is about paddling-related neck pain.
- Share the snow guide after questions about neck pain after falls, with a trauma-care caveat.
- Share the climbing guide in climbing communities when belayers report neck pain.
- Share original diagrams from `/tools/` on image-friendly channels with a link back to the relevant hub.
- Link directly to visual landing pages, for example `/images/c6-c7-c8-finger-numbness-map/`, when the discussion is about hand or finger numbness patterns.
- Offer `/printable-neck-symptom-tracker/` when users need a practical way to prepare for a clinical visit.
- Use UTM tags only for owned posts, for example `?utm_source=reddit&utm_medium=social&utm_campaign=sports-hub`.

## Refresh Cadence

- Review GSC/Bing indexing 24-72 hours after major sitemap changes.
- Use `GSC_REFRESH_PLAN.md` as the working list after each Search Console export, then delete or regenerate it after the next export.
- Add one source-backed article per cluster before applying to additional ad networks.
- Recheck YouTube reference links monthly and replace unavailable videos.
- Update review dates only when content is actually reviewed or materially changed.
