#!/usr/bin/env python3
"""Validate the shared 48-page, 15-locale static site matrix."""

from __future__ import annotations

import json
import importlib.util
import re
import sys
from collections import Counter
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("build_locales", ROOT / "scripts" / "build-locales.py")
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("Could not load scripts/build-locales.py")
BUILD_LOCALES = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = BUILD_LOCALES
SPEC.loader.exec_module(BUILD_LOCALES)

LOCALES = BUILD_LOCALES.LOCALES
canonical_url = BUILD_LOCALES.canonical_url
html_route = BUILD_LOCALES.html_route
route_for = BUILD_LOCALES.route_for
route_manifest = BUILD_LOCALES.route_manifest

FORBIDDEN_MEDICAL_TERMS = {
    "ar": ("عنق الرحم", "أعلام حمراء", "الأعلام الحمراء", "علم أحمر", "العلم الأحمر"),
    "bn": ("জরায়ু",),
    "fr": ("utérus", "utérin", "utérine"),
    "hi": ("गर्भाशय ग्रीवा",),
    "id": ("serviks", "Serviks"),
    "ja": ("子宮頸", "子宫颈"),
    "pnb": ("رحم", "بچہ دانی", "گردن رحم"),
    "pt": ("colo do útero", "Colo do útero", "uterino", "uterina"),
    "ru": (
        "шейка матки",
        "шейки матки",
        "шейку матки",
        "шейке матки",
        "шейкой матки",
        "красные флажки",
        "Красные флажки",
        "Красные флаги",
        "красных флажков",
        "красными флажками",
        "красным флажкам",
        "красному флажку",
        "красной флажке",
    ),
    "th": ("ปากมดลูก", "โพรงมดลูก", "การยืดผม", "ข้อสอบ", "ธงสีแดง", "สัญญาณธงแดง"),
    "ur": ("رحم", "بچہ دانی", "گردن رحم"),
    "vi": ("cổ tử cung", "Cổ tử cung", "báo động đỏ", "cờ đỏ"),
}


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    relative_files = route_manifest()
    expected_alternates = {"x-default": canonical_url("en", "/")}
    expected_page_count = len(relative_files) * len(LOCALES)
    checked = 0

    for relative_file in relative_files:
        route = route_for(relative_file)
        for locale in LOCALES:
            path = html_route(relative_file, locale.path)
            label = str(path.relative_to(ROOT))
            if not path.exists():
                errors.append(f"missing page: {label}")
                continue
            checked += 1
            source = path.read_text(encoding="utf-8")
            for forbidden in FORBIDDEN_MEDICAL_TERMS.get(locale.path, ()):
                if forbidden in source:
                    errors.append(f"forbidden medical mistranslation {forbidden!r}: {label}")
            if "HTML<html" in source:
                errors.append(f"broken doctype text: {label}")
            soup = BeautifulSoup(source, "lxml")
            html_tag = soup.find("html")
            if not html_tag or html_tag.get("lang") != locale.html_lang:
                errors.append(f"wrong html lang: {label}")
            expected_dir = "rtl" if locale.direction == "rtl" else None
            if html_tag and html_tag.get("dir") != expected_dir:
                errors.append(f"wrong dir: {label}")
            if len(soup.find_all("title")) != 1 or not soup.title.get_text(strip=True):
                errors.append(f"title count/content: {label}")
            if len(soup.find_all("h1")) != 1 or not soup.h1.get_text(" ", strip=True):
                errors.append(f"h1 count/content: {label}")
            descriptions = soup.select('meta[name="description"]')
            if len(descriptions) != 1 or not descriptions[0].get("content"):
                errors.append(f"description count/content: {label}")
            canonical = soup.select('link[rel="canonical"]')
            expected_canonical = canonical_url(locale.path, route)
            if len(canonical) != 1 or canonical[0].get("href") != expected_canonical:
                errors.append(f"canonical mismatch: {label}")

            alternates = soup.select('link[rel="alternate"][hreflang]')
            alternate_map = {tag.get("hreflang"): tag.get("href") for tag in alternates}
            expected = {"x-default": canonical_url("en", route)}
            expected.update({item.hreflang: canonical_url(item.path, route) for item in LOCALES})
            if len(alternates) != len(expected) or alternate_map != expected:
                errors.append(f"hreflang mismatch: {label}")

            menu_links = soup.select(".language-options a")
            if len(menu_links) != len(LOCALES):
                errors.append(f"language menu count: {label}")
            if len(soup.select('.language-options a[aria-current="page"]')) != 1:
                errors.append(f"language menu current item: {label}")

            ids = [tag.get("id") for tag in soup.select("[id]")]
            duplicates = sorted(item for item, count in Counter(ids).items() if count > 1)
            if duplicates:
                errors.append(f"duplicate ids {duplicates}: {label}")

            for index, script in enumerate(soup.select('script[type="application/ld+json"]')):
                try:
                    json.loads(script.string or script.get_text())
                except json.JSONDecodeError as error:
                    errors.append(f"invalid JSON-LD #{index + 1}: {label}: {error}")

            if locale.path not in {"en", "zh", "es", "ja"}:
                if len(soup.select(".translation-notice")) != 1:
                    errors.append(f"translation notice count: {label}")
                if route == "/" and soup.select('script[src*="assets/app.js"], script[src*="assets/growth-data.js"]'):
                    errors.append(f"dynamic English homepage script retained: {label}")
                english_words = re.findall(r"\b(?:Translation notice|Primary navigation|Last reviewed)\b", soup.get_text(" "))
                if english_words:
                    warnings.append(f"possible untranslated UI {english_words}: {label}")

            for link in soup.select("a[href]"):
                href = link.get("href", "")
                if not href.startswith(f"/{locale.path}/") or locale.path == "en":
                    continue
                clean = href.split("#", 1)[0].split("?", 1)[0]
                destination = ROOT / clean.lstrip("/")
                if clean.endswith("/"):
                    destination /= "index.html"
                if not destination.exists():
                    errors.append(f"broken localized link {href}: {label}")

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    sitemap_urls = set(re.findall(r"<loc>([^<]+)</loc>", sitemap))
    for relative_file in relative_files:
        route = route_for(relative_file)
        for locale in LOCALES:
            url = canonical_url(locale.path, route)
            if url not in sitemap_urls:
                errors.append(f"sitemap missing: {url}")

    if checked != expected_page_count:
        errors.append(f"checked {checked} pages; expected {expected_page_count}")

    print(
        json.dumps(
            {
                "checked_pages": checked,
                "expected_pages": expected_page_count,
                "routes_per_locale": len(relative_files),
                "locales": len(LOCALES),
                "sitemap_urls": len(sitemap_urls),
                "errors": errors,
                "warnings": warnings[:30],
                "warning_count": len(warnings),
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
