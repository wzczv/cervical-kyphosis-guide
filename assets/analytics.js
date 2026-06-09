(() => {
  const measurementId = "G-L8TWWKFELJ";
  const storageKey = "ccg_analytics_consent";
  const messages = {
    zh: {
      aria: "统计同意",
      copy:
        "本站使用 Google Analytics 了解访问量和内容互动，用来改进健康教育内容。广告个性化信号未启用。",
      decline: "拒绝",
      accept: "接受统计"
    },
    en: {
      aria: "Analytics consent",
      copy:
        "We use Google Analytics to understand site traffic and improve this educational guide. No advertising personalization is enabled.",
      decline: "Decline",
      accept: "Accept analytics"
    },
    ja: {
      aria: "アクセス解析への同意",
      copy:
        "このサイトでは、教育内容を改善するために Google Analytics でアクセス状況とコンテンツの利用状況を把握します。広告のパーソナライズは有効にしていません。",
      decline: "拒否",
      accept: "解析を許可"
    },
    es: {
      aria: "Consentimiento de analíticas",
      copy:
        "Usamos Google Analytics para entender el tráfico y mejorar esta guía educativa. La personalización publicitaria no está activada.",
      decline: "Rechazar",
      accept: "Aceptar analíticas"
    }
  };

  function setConsent(value) {
    localStorage.setItem(storageKey, value);
  }

  function getConsent() {
    return localStorage.getItem(storageKey);
  }

  function loadAnalytics() {
    if (window.__ccgAnalyticsLoaded) return;
    window.__ccgAnalyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
      ad_personalization: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      analytics_storage: "granted"
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }

  function removeBanner() {
    document.querySelector(".analytics-consent")?.remove();
  }

  function showBanner() {
    if (document.querySelector(".analytics-consent")) return;
    const lang = document.documentElement.lang?.toLowerCase().startsWith("zh")
      ? "zh"
      : document.documentElement.lang?.slice(0, 2).toLowerCase();
    const message = messages[lang] || messages.en;

    const banner = document.createElement("section");
    banner.className = "analytics-consent";
    banner.setAttribute("aria-label", message.aria);

    const copy = document.createElement("p");
    copy.textContent = message.copy;

    const actions = document.createElement("div");
    const decline = document.createElement("button");
    decline.type = "button";
    decline.textContent = message.decline;
    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "primary";
    accept.textContent = message.accept;

    decline.addEventListener("click", () => {
      setConsent("denied");
      removeBanner();
    });

    accept.addEventListener("click", () => {
      setConsent("granted");
      removeBanner();
      loadAnalytics();
    });

    actions.append(decline, accept);
    banner.append(copy, actions);
    document.body.append(banner);
  }

  function init() {
    const consent = getConsent();
    if (consent === "granted") {
      loadAnalytics();
      return;
    }
    if (consent !== "denied") showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
