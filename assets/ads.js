/**
 * Cervical Curve Guide — AdSense + Consent Mode v2 bootstrap (PREPARED, NOT LIVE)
 * ------------------------------------------------------------------------------
 * This file is inert until BOTH are true:
 *   1. ENABLED is set to true (done automatically by scripts/enable-ads.mjs)
 *   2. The page includes <script src="/assets/ads.js"> BEFORE analytics.js
 *      (also done automatically by scripts/enable-ads.mjs)
 *
 * What it does when enabled:
 *   A. Sets Google Consent Mode v2 defaults as early as possible:
 *        - EEA / UK / Switzerland: all ad signals + analytics DENIED by default.
 *          Google's certified CMP (AdSense "Privacy & messaging" GDPR message)
 *          collects consent and updates consent state via TCF automatically.
 *        - Everywhere else: ad signals GRANTED (no consent requirement),
 *          analytics still denied until the user accepts the site's own
 *          analytics banner (analytics.js shows it and calls consent update).
 *   B. Loads the AdSense library (which also renders Google's consent message
 *      in regions that require it, once enabled in AdSense > Privacy & messaging).
 *   C. Fills existing `.ad-slot` placeholders with responsive ad units
 *      (manual units if AD_SLOT_ID is set, otherwise relies on Auto ads).
 *
 * IMPORTANT: never place ad units inside red-flag / emergency callouts.
 * Placeholders in the templates are already positioned outside those blocks;
 * this script only fills elements that carry the `ad-slot` class.
 */
(() => {
  // ======================= CONFIG (edited by enable-ads.mjs) =======================
  const ENABLED = false;                       // flipped to true by scripts/enable-ads.mjs
  const PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXX"; // replaced by scripts/enable-ads.mjs
  const AD_SLOT_ID = "";                       // optional: a responsive unit ID from AdSense UI.
                                               // Leave "" to rely on Auto ads placement.
  const MAX_FILLED_SLOTS_PER_PAGE = 3;         // conservative density for YMYL review safety
  // =================================================================================

  if (!ENABLED) return;
  if (!/^ca-pub-\d{10,}$/.test(PUBLISHER_ID)) return;

  /* ---------- A. Consent Mode v2 defaults (must run before any Google tag) ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  // EEA + UK + Switzerland (ISO 3166-1 alpha-2)
  const CONSENT_REGIONS = [
    "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT",
    "LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO",
    "GB","CH"
  ];

  // Global default: ads allowed (non-regulated regions), analytics denied until
  // the user accepts the site's own analytics banner (handled by analytics.js).
  gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "denied"
  });

  // Regulated regions: everything denied until Google's certified CMP collects
  // consent (it then updates consent state automatically via TCF v2.2).
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    region: CONSENT_REGIONS,
    wait_for_update: 500
  });

  /* ---------- B. Load the AdSense library ---------- */
  const lib = document.createElement("script");
  lib.async = true;
  lib.crossOrigin = "anonymous";
  lib.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
    PUBLISHER_ID;
  document.head.appendChild(lib);

  /* ---------- C. Fill existing placeholders with responsive units ---------- */
  function fillSlots() {
    if (!AD_SLOT_ID) return; // Auto ads mode: Google decides placement.
    const slots = Array.from(document.querySelectorAll(".ad-slot")).slice(
      0,
      MAX_FILLED_SLOTS_PER_PAGE
    );
    for (const slot of slots) {
      if (slot.dataset.adsFilled === "1") continue;
      slot.dataset.adsFilled = "1";
      slot.textContent = "";
      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", PUBLISHER_ID);
      ins.setAttribute("data-ad-slot", AD_SLOT_ID);
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      slot.appendChild(ins);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fillSlots, { once: true });
  } else {
    fillSlots();
  }
})();
