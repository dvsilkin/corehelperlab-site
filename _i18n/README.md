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
node _i18n/build.mjs
```
Generates:
- `fitence-workout/index.html` — English (also `x-default`)
- `fitence-workout/<lang>/index.html` — `ru ua fr de es it`
- `sitemap.xml` — with `hreflang` alternates

## Rules
- **Do not hand-edit** the generated files (`fitence-workout/**/index.html`,
  `sitemap.xml`) — changes are overwritten on the next build. Edit the sources
  here and re-run the build.
- Each language needs its screenshots in `fitence-workout/screens/<lang>/`.

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
3. Run the build and commit the output.
