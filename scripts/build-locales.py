#!/usr/bin/env python3
"""Build draft static locales from the canonical English pages.

The script deliberately reads the 48-path Spanish tree only as a route manifest;
all translated content comes from the canonical English files at the site root.
It adds new files, patches only hreflang/menu fragments in existing locales, and
preserves unrelated hand-edited HTML.
"""

from __future__ import annotations

import argparse
import html
import json
import random
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

from bs4 import BeautifulSoup, Comment, Doctype, NavigableString


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://cervicalcurveguide.com"
BUILD_DATE = "2026-07-21"
TRANSLATION_NOTICE = (
    "Translation notice: This page was machine-translated from the English source "
    "and has not been reviewed by a native-speaking clinician. If wording is "
    "unclear, use the English version and seek qualified medical care."
)


@dataclass(frozen=True)
class Locale:
    path: str
    html_lang: str
    hreflang: str
    translate_code: str
    native_name: str
    short_name: str
    direction: str = "ltr"


LOCALES: tuple[Locale, ...] = (
    Locale("en", "en", "en", "en", "English", "EN"),
    Locale("zh", "zh-Hans", "zh-Hans", "zh-CN", "中文", "中文"),
    Locale("hi", "hi", "hi", "hi", "हिन्दी", "HI"),
    Locale("es", "es", "es", "es", "Español", "ES"),
    Locale("ar", "ar", "ar", "ar", "العربية", "AR", "rtl"),
    Locale("fr", "fr", "fr", "fr", "Français", "FR"),
    Locale("bn", "bn", "bn", "bn", "বাংলা", "BN"),
    Locale("pt", "pt", "pt", "pt", "Português", "PT"),
    Locale("id", "id", "id", "id", "Bahasa Indonesia", "ID"),
    Locale("ur", "ur", "ur", "ur", "اردو", "UR", "rtl"),
    Locale("ru", "ru", "ru", "ru", "Русский", "RU"),
    Locale("ja", "ja", "ja", "ja", "日本語", "日本語"),
    Locale("pnb", "pa-Arab", "pa-Arab", "pa-Arab", "پنجابی", "PN", "rtl"),
    Locale("vi", "vi", "vi", "vi", "Tiếng Việt", "VI"),
    Locale("th", "th", "th", "th", "ไทย", "TH"),
)

EXISTING_LOCALES = {"en", "zh", "es", "ja"}
NEW_LOCALES = tuple(locale for locale in LOCALES if locale.path not in EXISTING_LOCALES)
LOCALE_BY_PATH = {locale.path: locale for locale in LOCALES}

SKIP_TEXT_PARENTS = {"script", "style", "noscript", "svg", "code", "pre"}
TRANSLATABLE_ATTRIBUTES = {"alt", "aria-label", "placeholder", "title"}
RESERVED_JSON_KEYS = {
    "@context",
    "@id",
    "@type",
    "author",
    "contentUrl",
    "dateModified",
    "datePublished",
    "embedUrl",
    "encodingFormat",
    "height",
    "image",
    "inLanguage",
    "isAccessibleForFree",
    "item",
    "lastReviewed",
    "license",
    "logo",
    "medicalAudience",
    "position",
    "publisher",
    "sameAs",
    "thumbnailUrl",
    "uploadDate",
    "url",
    "width",
}
URL_ATTRIBUTES = {"href", "src", "poster", "action"}

# High-risk false friends produced by generic machine translation in a spine
# context. Order matters: replace longer phrases before their component words.
MEDICAL_TERM_REPLACEMENTS: dict[str, tuple[tuple[str, str], ...]] = {
    "ar": (
        ("عنق الرحم", "العمود الفقري العنقي"),
        ("أعلام حمراء", "علامات الخطر"),
        ("الأعلام الحمراء", "علامات الخطر"),
        ("علم أحمر", "علامة خطر"),
        ("العلم الأحمر", "علامة الخطر"),
    ),
    "bn": (
        ("জরায়ুর", "সার্ভিকাল"),
        ("জরায়ু", "সার্ভিকাল"),
        ("লাল পতাকাগুলি", "সতর্কতার লক্ষণ"),
        ("লাল পতাকা", "সতর্কতার লক্ষণ"),
    ),
    "hi": (
        ("गर्भाशय ग्रीवा", "सर्वाइकल स्पाइन"),
        ("लाल झंडे", "चेतावनी संकेत"),
        ("लाल झंडा", "चेतावनी संकेत"),
    ),
    "id": (
        ("Serviks", "Servikal"),
        ("serviks", "servikal"),
        ("bendera merah", "tanda bahaya"),
    ),
    "fr": (
        ("de l'utérus ", ""),
        ("de l’utérus ", ""),
        ("du col de l'utérus", "cervical"),
        ("du col de l’utérus", "cervical"),
    ),
    "pt": (
        ("Colo do útero", "Coluna cervical"),
        ("colo do útero", "coluna cervical"),
    ),
    "ru": (
        ("шейки матки", "шейного отдела позвоночника"),
        ("Красные флаги", "Тревожные признаки"),
        ("Красные флажки", "Тревожные признаки"),
        ("красные флажки", "тревожные признаки"),
        ("красных флажков", "тревожных признаков"),
        ("красными флажками", "тревожными признаками"),
        ("красным флажкам", "тревожным признакам"),
        ("красному флажку", "тревожному признаку"),
        ("красной флажке", "тревожном признаке"),
    ),
    "th": (
        ("อาการปากมดลูก Kyphosis", "อาการของภาวะกระดูกสันหลังส่วนคอโค้งไปด้านหลัง"),
        ("kyphosis ของปากมดลูก", "ภาวะกระดูกสันหลังส่วนคอโค้งไปด้านหลัง"),
        ("Kyphosis ของปากมดลูก", "ภาวะกระดูกสันหลังส่วนคอโค้งไปด้านหลัง"),
        ("kyphosis ปากมดลูก", "ภาวะกระดูกสันหลังส่วนคอโค้งไปด้านหลัง"),
        ("ปากมดลูก", "กระดูกสันหลังส่วนคอ"),
        ("ภาวะโพรงมดลูกเจริญผิดที่", "ภาวะกระดูกสันหลังส่วนคอโค้งแอ่น"),
        ("โพรงมดลูก", "กระดูกสันหลังส่วนคอ"),
        ("การยืดผม", "การเหยียดตรงของแนวกระดูกคอ"),
        ("สัญญาณธงแดง", "สัญญาณอันตราย"),
        ("ธงสีแดง", "สัญญาณอันตราย"),
        ("ข้อสอบ", "การตรวจร่างกาย"),
    ),
    "ur": (
        ("سرخ جھنڈے", "انتباہی علامات"),
        ("سرخ جھنڈا", "انتباہی علامت"),
    ),
    "pnb": (
        ("لال جھنڈے", "خطرے دیاں نشانیاں"),
        ("لال جھنڈا", "خطرے دی نشانی"),
    ),
    "vi": (
        ("Cổ tử cung", "Cột sống cổ"),
        ("cổ tử cung", "cột sống cổ"),
        ("báo động đỏ", "dấu hiệu cảnh báo"),
        ("cờ đỏ", "dấu hiệu cảnh báo"),
    ),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--cache-dir",
        type=Path,
        default=Path("/tmp/ccg-locale-cache"),
        help="Translation cache outside the repository.",
    )
    parser.add_argument(
        "--locales",
        default=",".join(locale.path for locale in NEW_LOCALES),
        help="Comma-separated new locale paths.",
    )
    parser.add_argument("--patch-existing-only", action="store_true")
    return parser.parse_args()


def route_manifest() -> list[Path]:
    paths = [path.relative_to(ROOT / "es") for path in (ROOT / "es").rglob("index.html")]
    return sorted(paths, key=lambda path: (str(path) != "index.html", str(path)))


def route_for(relative_file: Path) -> str:
    if str(relative_file) == "index.html":
        return "/"
    return f"/{relative_file.parent.as_posix()}/"


def localized_route(locale_path: str, route: str) -> str:
    if locale_path == "en":
        return route
    if route == "/":
        return f"/{locale_path}/"
    return f"/{locale_path}{route}"


def canonical_url(locale_path: str, route: str) -> str:
    return f"{BASE_URL}{localized_route(locale_path, route)}"


def html_route(relative_file: Path, locale_path: str) -> Path:
    if locale_path == "en":
        return ROOT / relative_file
    return ROOT / locale_path / relative_file


def render_hreflang(route: str, indent: str = "    ") -> str:
    lines = [
        f'{indent}<link rel="alternate" hreflang="x-default" href="{canonical_url("en", route)}" />'
    ]
    lines.extend(
        f'{indent}<link rel="alternate" hreflang="{locale.hreflang}" href="{canonical_url(locale.path, route)}" />'
        for locale in LOCALES
    )
    return "\n".join(lines)


def render_language_menu(route: str, current: str, indent: str = "      ") -> str:
    active = LOCALE_BY_PATH[current]
    links = []
    for locale in LOCALES:
        current_attr = ' aria-current="page"' if locale.path == current else ""
        links.append(
            f'{indent}    <a href="{localized_route(locale.path, route)}" '
            f'hreflang="{locale.hreflang}" lang="{locale.html_lang}"{current_attr}>'
            f'{locale.native_name}</a>'
        )
    return (
        f'{indent}<details class="language-menu">\n'
        f'{indent}  <summary aria-label="Language">{active.short_name}</summary>\n'
        f'{indent}  <div class="language-options">\n'
        + "\n".join(links)
        + f"\n{indent}  </div>\n{indent}</details>"
    )


def replace_hreflang_fragment(source: str, route: str) -> tuple[str, bool]:
    pattern = re.compile(
        r'(?P<indent>^[ \t]*)<link\s+rel=["\']alternate["\']\s+hreflang=["\'][^"\']+["\'][^>]*?/?>'
        r'(?:\s*\n?[ \t]*<link\s+rel=["\']alternate["\']\s+hreflang=["\'][^"\']+["\'][^>]*?/?>)*',
        re.MULTILINE,
    )
    match = pattern.search(source)
    if not match:
        return source, False
    replacement = render_hreflang(route, match.group("indent"))
    return source[: match.start()] + replacement + source[match.end() :], True


def replace_language_menu_fragment(source: str, route: str, current: str) -> tuple[str, bool]:
    pattern = re.compile(
        r'(?P<indent>^[ \t]*)<div\s+class=["\']language-switcher["\'][^>]*>.*?</div>',
        re.MULTILINE | re.DOTALL,
    )
    match = pattern.search(source)
    if not match:
        return source, False
    replacement = render_language_menu(route, current, match.group("indent"))
    return source[: match.start()] + replacement + source[match.end() :], True


def patch_existing_pages(relative_files: list[Path]) -> tuple[int, list[str]]:
    changed = 0
    warnings: list[str] = []
    for relative_file in relative_files:
        route = route_for(relative_file)
        for locale_path in ("en", "zh", "es", "ja"):
            path = html_route(relative_file, locale_path)
            source = path.read_text(encoding="utf-8")
            source, found_hreflang = replace_hreflang_fragment(source, route)
            source, found_menu = replace_language_menu_fragment(source, route, locale_path)
            if not found_menu and 'class="language-menu"' in source:
                found_menu = True
            if not found_hreflang:
                warnings.append(f"missing hreflang block: {path.relative_to(ROOT)}")
            if not found_menu:
                warnings.append(f"missing language menu: {path.relative_to(ROOT)}")
            original = path.read_text(encoding="utf-8")
            if source != original:
                path.write_text(source, encoding="utf-8")
                changed += 1
    return changed, warnings


def render_home() -> str:
    chrome = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    if not chrome.exists():
        raise RuntimeError("Google Chrome is required to pre-render the dynamic English homepage")
    result = subprocess.run(
        [
            str(chrome),
            "--headless",
            "--disable-gpu",
            "--no-sandbox",
            "--dump-dom",
            (ROOT / "index.html").as_uri(),
        ],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        timeout=45,
    )
    if "id=\"learn-cards\"" not in result.stdout or "info-card" not in result.stdout:
        raise RuntimeError("Homepage pre-render did not include the dynamic content cards")
    return result.stdout


def source_html(relative_file: Path, rendered_home: str) -> str:
    if str(relative_file) == "index.html":
        return rendered_home
    return (ROOT / relative_file).read_text(encoding="utf-8")


def should_translate(text: str) -> bool:
    value = text.strip()
    if len(value) < 2:
        return False
    if value in {"Cervical Curve Guide", "YouTube", "FAQ", "MRI", "PDF", "C5", "C6", "C7", "C8"}:
        return False
    if re.fullmatch(r"[\d\W_]+", value, re.UNICODE):
        return False
    if re.match(r"^(?:https?://|mailto:|tel:|/)", value):
        return False
    return True


def iter_json_strings(value: Any, parent_key: str | None = None) -> Iterable[str]:
    if isinstance(value, dict):
        for key, child in value.items():
            yield from iter_json_strings(child, key)
    elif isinstance(value, list):
        for child in value:
            yield from iter_json_strings(child, parent_key)
    elif isinstance(value, str) and parent_key not in RESERVED_JSON_KEYS and should_translate(value):
        yield value


def map_json_strings(value: Any, translations: dict[str, str], locale: Locale, parent_key: str | None = None) -> Any:
    if isinstance(value, dict):
        result = {key: map_json_strings(child, translations, locale, key) for key, child in value.items()}
        if "inLanguage" in result:
            result["inLanguage"] = locale.html_lang
        if "dateModified" in result:
            result["dateModified"] = BUILD_DATE
        return result
    if isinstance(value, list):
        return [map_json_strings(child, translations, locale, parent_key) for child in value]
    if isinstance(value, str):
        if parent_key not in RESERVED_JSON_KEYS and value in translations:
            return translations[value]
        return value
    return value


def collect_translatable_strings(soup: BeautifulSoup) -> set[str]:
    strings: set[str] = {TRANSLATION_NOTICE}
    for node in soup.find_all(string=True):
        if isinstance(node, (Comment, Doctype)) or node.parent is None:
            continue
        parent_name = node.parent.name if node.parent else None
        if parent_name in SKIP_TEXT_PARENTS:
            continue
        core = str(node).strip()
        if should_translate(core):
            strings.add(core)

    for tag in soup.find_all(True):
        for attribute in TRANSLATABLE_ATTRIBUTES:
            value = tag.get(attribute)
            if isinstance(value, str) and should_translate(value):
                strings.add(value)
        if tag.name == "meta":
            key = (tag.get("name") or tag.get("property") or "").lower()
            if key in {
                "description",
                "og:title",
                "og:description",
                "twitter:title",
                "twitter:description",
            }:
                value = tag.get("content")
                if isinstance(value, str) and should_translate(value):
                    strings.add(value)

    for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(script.string or script.get_text())
        except json.JSONDecodeError:
            continue
        strings.update(iter_json_strings(data))
    return strings


class Translator:
    def __init__(self, locale: Locale, cache_dir: Path):
        self.locale = locale
        cache_dir.mkdir(parents=True, exist_ok=True)
        self.cache_path = cache_dir / f"{locale.path}.json"
        self.cache: dict[str, str] = {}
        if self.cache_path.exists():
            self.cache = json.loads(self.cache_path.read_text(encoding="utf-8"))

    def save(self) -> None:
        self.cache_path.write_text(
            json.dumps(self.cache, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
            encoding="utf-8",
        )

    def translate_all(self, strings: set[str]) -> dict[str, str]:
        pending = sorted((value for value in strings if value not in self.cache), key=len, reverse=True)
        batches: list[list[str]] = []
        batch: list[str] = []
        size = 0
        for value in pending:
            projected = size + len(value) + 60
            if batch and projected > 3600:
                batches.append(batch)
                batch = []
                size = 0
            batch.append(value)
            size += len(value) + 60
        if batch:
            batches.append(batch)

        for index, values in enumerate(batches, start=1):
            translated = self._translate_batch(values)
            self.cache.update(translated)
            self.save()
            print(
                f"[{self.locale.path}] translated batch {index}/{len(batches)} "
                f"({len(values)} strings; cache {len(self.cache)})",
                flush=True,
            )
            time.sleep(0.18 + random.random() * 0.12)
        return {value: self.cache.get(value, value) for value in strings}

    def _translate_batch(self, values: list[str]) -> dict[str, str]:
        payload = "<div>" + "".join(
            f'<span id="ccg{index}">{html.escape(value)}</span>' for index, value in enumerate(values)
        ) + "</div>"
        query = urllib.parse.urlencode(
            {
                "client": "gtx",
                "sl": "en",
                "tl": self.locale.translate_code,
                "format": "html",
                "v": "1.0",
                "q": payload,
            }
        )
        url = f"https://translate.googleapis.com/translate_a/t?{query}"
        last_error: Exception | None = None
        for attempt in range(6):
            try:
                request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 CCG locale builder"})
                with urllib.request.urlopen(request, timeout=45) as response:
                    body = response.read().decode("utf-8")
                translated_html = json.loads(body)[0]
                parsed = BeautifulSoup(translated_html, "html.parser")
                result = {}
                for index, source in enumerate(values):
                    span = parsed.find("span", id=f"ccg{index}")
                    if span is None:
                        raise ValueError(f"translation response omitted span ccg{index}")
                    result[source] = span.get_text("", strip=False).strip()
                return result
            except Exception as error:  # network/API retry boundary
                last_error = error
                time.sleep(min(20, 1.5 * (2**attempt)) + random.random())
        if len(values) > 1:
            midpoint = len(values) // 2
            return {**self._translate_batch(values[:midpoint]), **self._translate_batch(values[midpoint:])}
        raise RuntimeError(f"translation failed for {self.locale.path}: {last_error}")


def replace_text_preserving_space(node: NavigableString, translated: str) -> None:
    original = str(node)
    prefix_match = re.match(r"^\s*", original)
    suffix_match = re.search(r"\s*$", original)
    prefix = prefix_match.group(0) if prefix_match else ""
    suffix = suffix_match.group(0) if suffix_match else ""
    node.replace_with(f"{prefix}{translated}{suffix}")


def route_with_suffix(value: str) -> tuple[str, str]:
    match = re.match(r"([^?#]*)(.*)$", value)
    return (match.group(1), match.group(2)) if match else (value, "")


def localize_internal_url(value: str, locale: Locale, valid_routes: set[str]) -> str:
    if value.startswith(BASE_URL):
        suffix = value[len(BASE_URL) :] or "/"
        path, tail = route_with_suffix(suffix)
        if path in valid_routes:
            return f"{BASE_URL}{localized_route(locale.path, path)}{tail}"
        return value
    if not value.startswith("/") or value.startswith("//"):
        return value
    path, tail = route_with_suffix(value)
    if path in valid_routes:
        return f"{localized_route(locale.path, path)}{tail}"
    return value


def make_relative_assets_rooted(soup: BeautifulSoup) -> None:
    for tag in soup.find_all(True):
        for attribute in ("src", "poster"):
            value = tag.get(attribute)
            if isinstance(value, str) and value.startswith("assets/"):
                tag[attribute] = f"/{value}"
        srcset = tag.get("srcset")
        if isinstance(srcset, str):
            tag["srcset"] = re.sub(r"(?<![/\w-])assets/", "/assets/", srcset)


def sanitize_medical_terms(output: str, locale: Locale) -> str:
    for wrong, correct in MEDICAL_TERM_REPLACEMENTS.get(locale.path, ()):
        output = output.replace(wrong, correct)
    return output


def localize_json_urls(value: Any, locale: Locale, valid_routes: set[str], parent_key: str | None = None) -> Any:
    if isinstance(value, dict):
        return {key: localize_json_urls(child, locale, valid_routes, key) for key, child in value.items()}
    if isinstance(value, list):
        return [localize_json_urls(child, locale, valid_routes, parent_key) for child in value]
    if isinstance(value, str) and (parent_key in RESERVED_JSON_KEYS or value.startswith(("/", BASE_URL))):
        return localize_internal_url(value, locale, valid_routes)
    return value


def apply_translation(
    soup: BeautifulSoup,
    locale: Locale,
    route: str,
    valid_routes: set[str],
    translations: dict[str, str],
) -> None:
    html_tag = soup.find("html")
    if html_tag:
        html_tag["lang"] = locale.html_lang
        if locale.direction == "rtl":
            html_tag["dir"] = "rtl"
        else:
            html_tag.attrs.pop("dir", None)

    for node in list(soup.find_all(string=True)):
        if isinstance(node, (Comment, Doctype)) or node.parent is None:
            continue
        parent_name = node.parent.name if node.parent else None
        if parent_name in SKIP_TEXT_PARENTS:
            continue
        core = str(node).strip()
        if core in translations:
            replace_text_preserving_space(node, translations[core])

    for tag in soup.find_all(True):
        for attribute in TRANSLATABLE_ATTRIBUTES:
            value = tag.get(attribute)
            if isinstance(value, str) and value in translations:
                tag[attribute] = translations[value]
        if tag.name == "meta":
            key = (tag.get("name") or tag.get("property") or "").lower()
            value = tag.get("content")
            if key in {
                "description",
                "og:title",
                "og:description",
                "twitter:title",
                "twitter:description",
            } and isinstance(value, str) and value in translations:
                tag["content"] = translations[value]
            if key == "og:url":
                tag["content"] = canonical_url(locale.path, route)
            if key == "og:locale":
                tag["content"] = locale.html_lang.replace("-", "_")
        for attribute in URL_ATTRIBUTES:
            value = tag.get(attribute)
            if isinstance(value, str):
                tag[attribute] = localize_internal_url(value, locale, valid_routes)

    for canonical in soup.select('link[rel="canonical"]'):
        canonical["href"] = canonical_url(locale.path, route)

    for alternate in list(soup.select('link[rel="alternate"][hreflang]')):
        alternate.decompose()
    canonical = soup.select_one('link[rel="canonical"]')
    head = soup.find("head")
    insertion_point = canonical if canonical else head.find("meta") if head else None
    if insertion_point:
        for item in reversed(LOCALES):
            tag = soup.new_tag("link", rel="alternate", hreflang=item.hreflang, href=canonical_url(item.path, route))
            insertion_point.insert_after(tag)
        default_tag = soup.new_tag("link", rel="alternate", hreflang="x-default", href=canonical_url("en", route))
        insertion_point.insert_after(default_tag)

    for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(script.string or script.get_text())
        except json.JSONDecodeError:
            continue
        data = map_json_strings(data, translations, locale)
        data = localize_json_urls(data, locale, valid_routes)
        script.string = json.dumps(data, ensure_ascii=False, indent=2)

    old_menu = soup.select_one(".language-switcher, .language-menu")
    if old_menu:
        menu = BeautifulSoup(render_language_menu(route, locale.path, ""), "html.parser").find("details")
        old_menu.replace_with(menu)

    for tag in soup.select("[data-i18n], [data-lang], [aria-pressed]"):
        tag.attrs.pop("data-i18n", None)
        tag.attrs.pop("data-lang", None)
        tag.attrs.pop("aria-pressed", None)

    if route == "/":
        for script in list(soup.find_all("script", src=True)):
            src = script.get("src", "")
            if "assets/app.js" in src or "assets/growth-data.js" in src:
                script.decompose()

    main = soup.find("main")
    if main:
        notice = soup.new_tag("aside")
        notice["class"] = ["translation-notice"]
        notice.string = translations.get(TRANSLATION_NOTICE, TRANSLATION_NOTICE)
        main.insert(0, notice)

    make_relative_assets_rooted(soup)


def write_localized_pages(relative_files: list[Path], selected_locales: tuple[Locale, ...], cache_dir: Path) -> int:
    rendered_home = render_home()
    valid_routes = {route_for(path) for path in relative_files}
    source_soups: dict[Path, BeautifulSoup] = {}
    all_strings: set[str] = set()
    for relative_file in relative_files:
        soup = BeautifulSoup(source_html(relative_file, rendered_home), "lxml")
        source_soups[relative_file] = soup
        all_strings.update(collect_translatable_strings(soup))
    print(f"Collected {len(all_strings)} unique translatable strings from {len(relative_files)} pages.", flush=True)

    written = 0
    for locale in selected_locales:
        translator = Translator(locale, cache_dir)
        translations = translator.translate_all(all_strings)
        for relative_file, source_soup in source_soups.items():
            soup = BeautifulSoup(str(source_soup), "lxml")
            route = route_for(relative_file)
            apply_translation(soup, locale, route, valid_routes, translations)
            destination = ROOT / locale.path / relative_file
            destination.parent.mkdir(parents=True, exist_ok=True)
            output = str(soup)
            if not output.lstrip().lower().startswith("<!doctype"):
                output = "<!doctype html>\n" + output
            output = sanitize_medical_terms(output, locale)
            destination.write_text(output, encoding="utf-8")
            written += 1
        print(f"[{locale.path}] wrote {len(relative_files)} pages", flush=True)
    return written


def patch_sitemap(relative_files: list[Path], selected_locales: tuple[Locale, ...]) -> int:
    path = ROOT / "sitemap.xml"
    source = path.read_text(encoding="utf-8")
    existing = set(re.findall(r"<loc>([^<]+)</loc>", source))
    additions = []
    for locale in selected_locales:
        for relative_file in relative_files:
            url = canonical_url(locale.path, route_for(relative_file))
            if url in existing:
                continue
            additions.append(
                "  <url>\n"
                f"    <loc>{url}</loc>\n"
                f"    <lastmod>{BUILD_DATE}</lastmod>\n"
                "  </url>"
            )
            existing.add(url)
    if additions:
        source = source.replace("</urlset>", "\n".join(additions) + "\n</urlset>")
        path.write_text(source, encoding="utf-8")
    return len(additions)


def main() -> int:
    args = parse_args()
    relative_files = route_manifest()
    requested = tuple(part.strip() for part in args.locales.split(",") if part.strip())
    invalid = sorted(set(requested) - {locale.path for locale in NEW_LOCALES})
    if invalid:
        raise SystemExit(f"Unsupported new locale(s): {', '.join(invalid)}")
    selected = tuple(LOCALE_BY_PATH[path] for path in requested)

    patched, warnings = patch_existing_pages(relative_files)
    for warning in warnings:
        print(f"WARNING: {warning}", file=sys.stderr)
    if args.patch_existing_only:
        print(f"Patched {patched} existing pages.")
        return 0

    written = write_localized_pages(relative_files, selected, args.cache_dir)
    sitemap_added = patch_sitemap(relative_files, selected)
    print(
        f"Done: patched {patched} existing pages, wrote {written} localized pages, "
        f"and added {sitemap_added} sitemap URLs."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
