# _i18n — landing page generator

Source of truth for the multilingual Fitence landing. This folder is **not
published**: GitHub Pages (Jekyll) ignores paths starting with `_`.

## Files
- `translations.mjs` — all UI translations (61 keys/lang) + localized SEO
  strings (`meta`) + config (langs, hreflang maps, flags).
- `template.html` — landing markup with `{{TOKENS}}` and `data-i18n` attributes.
- `build.mjs` — generator (pure Node, no dependencies).

## Build
```
node _i18n/build.mjs && node _i18n/check-seo.mjs
```
Generates:
- `fitence-workout/index.html` — English (also `x-default`)
- `fitence-workout/<lang>/index.html` — `ru ua fr de es it`
- `sitemap.xml` — with `hreflang` alternates

## Check
`check-seo.mjs` verifies the generated output against the SEO/i18n invariants:
translation-key parity, title/description length and uniqueness, canonical and
hreflang (full set, self-reference, reciprocity), Open Graph/Twitter, JSON-LD
shape, `FAQPage` matching the visible FAQ, single `h1`, image alt/dimensions,
per-language screenshots, dead anchors and links, store buttons vs
`config.appStore`, sitemap and robots.txt. It exits 1 on any error; `--json`
prints machine-readable findings. Run it after every build.

## Translating text
- **Element text** — `data-i18n="key"` on the element; the generator replaces
  its inner HTML.
- **Image alt text** — `data-i18n-alt="key"` on the `<img>`; the generator
  replaces the `alt` attribute. Screenshot alt text is localized, so a new
  `<img>` needs a key in every language.
- **Head strings** — `meta[lang].title` / `meta[lang].desc`, plus
  `og.imageAlt` / `tw.imageAlt` in `translations`.
- A translation that is legitimately identical to English (e.g. "Support" in
  French) must be listed in `config.i18nSameAsEnglish.<lang>`, otherwise
  `check-seo.mjs` flags it as a missed translation.

## Rules
- **Do not hand-edit** the generated files (`fitence-workout/**/index.html`,
  `sitemap.xml`) — changes are overwritten on the next build. Edit the sources
  here and re-run the build.
- Each language needs its screenshots in `fitence-workout/screens/<lang>/`.
- Keep `<title>` ≤ 60 characters and `<meta name="description">` ≤ 160, or the
  build's check step will warn about SERP truncation.
- Never hand-write `aggregateRating` into the JSON-LD — it must reflect real
  Play/App Store figures.

## Enable the App Store button (iOS launch)

The App Store button is config-gated in `translations.mjs`:
```js
config.appStore = { url: 'https://apps.apple.com/app/id6769868181', available: false };
```
While `available: false` it renders as a non-clickable **"Soon"** badge on every
language. When the iOS app is **Ready for Sale**, set `available: true`, run the
build, and the live App Store button appears on all 7 pages at once.

## Add a language
1. Add the language to `translations.mjs` (`translations`, `meta`, and `config`:
   `LANGS`, `htmlLang`, `ogLocale`, `flags`).
2. Add screenshots under `fitence-workout/screens/<lang>/`.
3. Run `node _i18n/build.mjs && node _i18n/check-seo.mjs` and fix what it
   reports, then commit the output.
