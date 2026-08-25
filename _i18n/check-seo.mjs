// SEO/ASO invariant checker for the generated Fitence landing.
//   Usage:  node _i18n/check-seo.mjs          (run AFTER node _i18n/build.mjs)
//           node _i18n/check-seo.mjs --json   machine-readable output
//
// Reads:  _i18n/translations.mjs, _i18n/template.html, the generated pages,
//         sitemap.xml, robots.txt and the screenshot folders.
// Writes: nothing. Exits 1 if any ERROR-level invariant is violated.
//
// Pure Node, no dependencies — same constraint as build.mjs.

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config, meta, translations, faq } from './translations.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const { BASE, LANGS, htmlLang, ogLocale, appStore } = config;

const JSON_OUT = process.argv.includes('--json');

// ── finding collector ────────────────────────────────────
const findings = [];
const add = (level, group, id, scope, msg) => findings.push({ level, group, id, scope, msg });
const err = (group, id, scope, msg) => add('error', group, id, scope, msg);
const warn = (group, id, scope, msg) => add('warn', group, id, scope, msg);
const info = (group, id, scope, msg) => add('info', group, id, scope, msg);

// ── tiny HTML helpers (regex-based; the markup is generated, so it is regular) ──
const pathFor = (l) => (l === 'en' ? '/fitence-workout/' : `/fitence-workout/${l}/`);
const urlFor = (l) => BASE + pathFor(l);
const fileFor = (l) => (l === 'en' ? join(ROOT, 'fitence-workout', 'index.html') : join(ROOT, 'fitence-workout', l, 'index.html'));

function parseAttrs(tagSrc) {
  const out = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(tagSrc))) out[m[1].toLowerCase()] = m[2];
  return out;
}

// all self-closing / void tags of a given name, e.g. meta, link, img
function voidTags(html, name) {
  const re = new RegExp(`<${name}\\b[^>]*>`, 'gi');
  return (html.match(re) || []).map((raw) => ({ raw, attrs: parseAttrs(raw) }));
}

// paired tags with their inner html, non-nested (works for title/h1/summary/script)
function pairTags(html, name) {
  const re = new RegExp(`<${name}\\b([^>]*)>([\\s\\S]*?)<\\/${name}>`, 'gi');
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push({ attrs: parseAttrs('<x ' + m[1] + '>'), inner: m[2], raw: m[0] });
  return out;
}

const headOf = (html) => (html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i) || [, ''])[1];
const bodyOf = (html) => (html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i) || [, ''])[1];

const decode = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

const stripTags = (s) => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

function metaContent(head, kind, key) {
  const hits = voidTags(head, 'meta').filter((t) => (t.attrs[kind] || '').toLowerCase() === key.toLowerCase());
  return hits.map((t) => t.attrs.content ?? '');
}
const metaName = (head, k) => metaContent(head, 'name', k);
const metaProp = (head, k) => metaContent(head, 'property', k);

// ═══════════════════════════════════════════════════════════
// GROUP A — sources & build integrity
// ═══════════════════════════════════════════════════════════
const template = readFileSync(join(__dirname, 'template.html'), 'utf8');
const pages = {};

function checkSources() {
  const G = 'A/sources';

  // A1 — every language has a generated page
  for (const l of LANGS) {
    const f = fileFor(l);
    if (!existsSync(f)) {
      err(G, 'A1.page-missing', l, `generated page is missing: ${f.replace(ROOT + '/', '')}`);
      continue;
    }
    pages[l] = readFileSync(f, 'utf8');
  }

  // A2 — translation key parity across languages
  const enKeys = Object.keys(translations.en || {});
  for (const l of LANGS) {
    const t = translations[l];
    if (!t) {
      err(G, 'A2.lang-missing', l, 'no `translations` block for this language');
      continue;
    }
    const keys = Object.keys(t);
    const missing = enKeys.filter((k) => !(k in t));
    const extra = keys.filter((k) => !enKeys.includes(k));
    if (missing.length) err(G, 'A2.keys-missing', l, `${missing.length} key(s) absent vs en: ${missing.join(', ')}`);
    if (extra.length) warn(G, 'A2.keys-extra', l, `${extra.length} key(s) not present in en: ${extra.join(', ')}`);
    for (const k of keys) {
      if (typeof t[k] !== 'string' || !t[k].trim()) err(G, 'A2.key-empty', `${l}:${k}`, 'translation is empty');
    }
  }

  // A3 — every data-i18n key used by the template exists in en
  const usedKeys = [...template.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]);
  for (const k of new Set(usedKeys)) {
    if (!(k in (translations.en || {}))) err(G, 'A3.key-undefined', k, 'used in template.html but absent from translations.en');
  }
  // A3b — translations that nothing renders
  const unused = enKeys.filter((k) => !usedKeys.includes(k) && !k.startsWith('btn.appstore'));
  if (unused.length) info(G, 'A3.key-unused', 'en', `${unused.length} translation key(s) never referenced by the template: ${unused.join(', ')}`);

  // A4 — meta/faq blocks complete
  for (const l of LANGS) {
    if (!meta[l]?.title || !meta[l]?.desc) err(G, 'A4.meta-missing', l, 'meta.title / meta.desc is missing');
    if (!Array.isArray(faq[l]) || !faq[l].length) err(G, 'A4.faq-missing', l, 'no FAQ entries');
  }
  const faqCounts = new Set(LANGS.map((l) => (faq[l] || []).length));
  if (faqCounts.size > 1) warn(G, 'A4.faq-count-mismatch', 'all', `FAQ entry counts differ per language: ${LANGS.map((l) => `${l}=${(faq[l] || []).length}`).join(' ')}`);

  // A5 — config completeness
  for (const l of LANGS) {
    if (!htmlLang[l]) err(G, 'A5.config', l, 'config.htmlLang has no entry');
    if (!ogLocale[l]) err(G, 'A5.config', l, 'config.ogLocale has no entry');
    if (!config.flags?.[l]) err(G, 'A5.config', l, 'config.flags has no entry');
  }

  // A6 — generated output is not stale relative to its sources
  const srcMtime = Math.max(
    statSync(join(__dirname, 'template.html')).mtimeMs,
    statSync(join(__dirname, 'translations.mjs')).mtimeMs
  );
  for (const l of LANGS) {
    const f = fileFor(l);
    if (existsSync(f) && statSync(f).mtimeMs < srcMtime)
      warn(G, 'A6.stale', l, 'generated page is older than template.html/translations.mjs — re-run `node _i18n/build.mjs`');
  }

  // A7 — no unreplaced template tokens leaked into the output
  for (const l of LANGS) {
    const tokens = new Set([...(pages[l] || '').matchAll(/\{\{[A-Z_]+\}\}/g)].map((m) => m[0]));
    if (tokens.size) err(G, 'A7.token-leak', l, `unreplaced template token(s) in output: ${[...tokens].join(', ')}`);
  }
}

// ═══════════════════════════════════════════════════════════
// GROUP B — head / meta invariants
// ═══════════════════════════════════════════════════════════
const TITLE_MAX = 60;
const TITLE_MIN = 30;
const DESC_MAX = 160;
const DESC_MIN = 70;

function checkHead() {
  const G = 'B/head';
  const titles = {};
  const descs = {};

  for (const l of LANGS) {
    const html = pages[l];
    if (!html) continue;
    const head = headOf(html);

    // B1 — <html lang> matches config
    const htmlTag = (html.match(/<html\b[^>]*>/i) || [''])[0];
    const langAttr = parseAttrs(htmlTag).lang;
    if (langAttr !== htmlLang[l]) err(G, 'B1.html-lang', l, `<html lang="${langAttr}"> should be "${htmlLang[l]}"`);

    // B2 — charset + viewport
    if (!/<meta\s+charset=/i.test(head)) err(G, 'B2.charset', l, '<meta charset> missing');
    if (!metaName(head, 'viewport').length) err(G, 'B2.viewport', l, '<meta name="viewport"> missing');

    // B3 — exactly one <title>, sane length, matches meta source
    const t = pairTags(head, 'title');
    if (t.length !== 1) {
      err(G, 'B3.title-count', l, `expected exactly 1 <title>, found ${t.length}`);
    } else {
      const text = decode(t[0].inner).trim();
      titles[l] = text;
      if (text !== meta[l].title) err(G, 'B3.title-drift', l, 'rendered <title> differs from meta[lang].title in translations.mjs');
      if (text.length > TITLE_MAX) warn(G, 'B3.title-long', l, `title is ${text.length} chars (>${TITLE_MAX}) — will be truncated in SERP: "${text}"`);
      if (text.length < TITLE_MIN) warn(G, 'B3.title-short', l, `title is only ${text.length} chars (<${TITLE_MIN})`);
    }

    // B4 — exactly one meta description, sane length
    const d = metaName(head, 'description');
    if (d.length !== 1) {
      err(G, 'B4.desc-count', l, `expected exactly 1 <meta name="description">, found ${d.length}`);
    } else {
      const text = decode(d[0]).trim();
      descs[l] = text;
      if (text !== meta[l].desc) err(G, 'B4.desc-drift', l, 'rendered description differs from meta[lang].desc');
      if (text.length > DESC_MAX) warn(G, 'B4.desc-long', l, `description is ${text.length} chars (>${DESC_MAX}) — will be truncated in SERP`);
      if (text.length < DESC_MIN) warn(G, 'B4.desc-short', l, `description is only ${text.length} chars (<${DESC_MIN})`);
    }

    // B5 — robots must not block indexing
    const robots = metaName(head, 'robots').join(' ').toLowerCase();
    if (!robots) warn(G, 'B5.robots', l, '<meta name="robots"> missing');
    else if (/noindex|none/.test(robots)) err(G, 'B5.robots-noindex', l, `indexable page carries robots="${robots}"`);

    // B6 — exactly one absolute canonical equal to the language URL
    const canon = voidTags(head, 'link').filter((x) => (x.attrs.rel || '').toLowerCase() === 'canonical');
    if (canon.length !== 1) {
      err(G, 'B6.canonical-count', l, `expected exactly 1 canonical, found ${canon.length}`);
    } else {
      const href = canon[0].attrs.href || '';
      if (!/^https?:\/\//.test(href)) err(G, 'B6.canonical-relative', l, `canonical must be absolute, got "${href}"`);
      if (href !== urlFor(l)) err(G, 'B6.canonical-wrong', l, `canonical is "${href}", expected "${urlFor(l)}"`);
    }

    // B7 — theme-color present (PWA/SERP polish)
    if (!metaName(head, 'theme-color').length) info(G, 'B7.theme-color', l, '<meta name="theme-color"> missing');
  }

  // B8 — titles and descriptions unique across languages
  const dupe = (obj, what, id) => {
    const seen = new Map();
    for (const [l, v] of Object.entries(obj)) {
      if (seen.has(v)) err(G, id, `${seen.get(v)},${l}`, `identical ${what} on two languages: "${v}"`);
      else seen.set(v, l);
    }
  };
  dupe(titles, 'title', 'B8.title-duplicate');
  dupe(descs, 'description', 'B8.desc-duplicate');
}

// ═══════════════════════════════════════════════════════════
// GROUP C — hreflang / Open Graph / Twitter
// ═══════════════════════════════════════════════════════════
function checkAlternates() {
  const G = 'C/alternates';
  const expected = new Map(LANGS.map((l) => [htmlLang[l], urlFor(l)]));
  expected.set('x-default', urlFor('en'));
  const graph = {}; // lang -> Map(hreflang -> href)

  for (const l of LANGS) {
    const html = pages[l];
    if (!html) continue;
    const head = headOf(html);

    // C1 — hreflang set is complete, correct and self-referencing
    const alts = voidTags(head, 'link').filter((x) => (x.attrs.rel || '').toLowerCase() === 'alternate' && x.attrs.hreflang);
    const seen = new Map();
    for (const a of alts) {
      const hl = a.attrs.hreflang;
      if (seen.has(hl)) err(G, 'C1.hreflang-duplicate', l, `hreflang="${hl}" declared more than once`);
      seen.set(hl, a.attrs.href || '');
    }
    graph[l] = seen;

    for (const [hl, href] of expected) {
      if (!seen.has(hl)) err(G, 'C1.hreflang-missing', l, `hreflang="${hl}" alternate is missing`);
      else if (seen.get(hl) !== href) err(G, 'C1.hreflang-href', l, `hreflang="${hl}" points at "${seen.get(hl)}", expected "${href}"`);
    }
    for (const hl of seen.keys()) {
      if (!expected.has(hl)) err(G, 'C1.hreflang-unknown', l, `unexpected hreflang="${hl}"`);
      if (!/^[a-z]{2}(-[A-Z]{2})?$|^x-default$/.test(hl)) err(G, 'C1.hreflang-format', l, `hreflang="${hl}" is not a valid language code`);
    }
    if (seen.get(htmlLang[l]) !== urlFor(l)) err(G, 'C1.hreflang-self', l, 'page does not self-reference in its hreflang set');
    for (const href of seen.values()) {
      if (!/^https?:\/\//.test(href)) err(G, 'C1.hreflang-relative', l, `hreflang href must be absolute, got "${href}"`);
    }

    // C2 — Open Graph
    const need = {
      'og:type': 'website',
      'og:site_name': null,
      'og:title': null,
      'og:description': null,
      'og:url': urlFor(l),
      'og:image': null,
      'og:locale': ogLocale[l],
    };
    for (const [k, want] of Object.entries(need)) {
      const v = metaProp(head, k);
      if (v.length !== 1) {
        err(G, 'C2.og-count', `${l}:${k}`, `expected exactly 1 <meta property="${k}">, found ${v.length}`);
        continue;
      }
      if (want !== null && v[0] !== want) err(G, 'C2.og-value', `${l}:${k}`, `is "${v[0]}", expected "${want}"`);
    }
    const ogImg = metaProp(head, 'og:image')[0] || '';
    if (ogImg && !/^https?:\/\//.test(ogImg)) err(G, 'C2.og-image-relative', l, `og:image must be an absolute URL, got "${ogImg}"`);
    if (ogImg.startsWith(BASE)) {
      const p = join(ROOT, ogImg.slice(BASE.length));
      if (!existsSync(p)) err(G, 'C2.og-image-404', l, `og:image points at a file that does not exist: ${ogImg}`);
    }
    for (const k of ['og:image:width', 'og:image:height', 'og:image:alt']) {
      if (!metaProp(head, k).length) warn(G, 'C2.og-image-meta', `${l}:${k}`, `<meta property="${k}"> missing`);
    }
    const ogTitle = decode(metaProp(head, 'og:title')[0] || '');
    const ogDesc = decode(metaProp(head, 'og:description')[0] || '');
    if (ogTitle && ogTitle !== meta[l].title) warn(G, 'C2.og-title-drift', l, 'og:title differs from <title>');
    if (ogDesc && ogDesc !== meta[l].desc) warn(G, 'C2.og-desc-drift', l, 'og:description differs from meta description');

    // C3 — og:locale:alternate covers every other language
    const ogAlts = new Set(metaProp(head, 'og:locale:alternate'));
    for (const other of LANGS.filter((x) => x !== l)) {
      if (!ogAlts.has(ogLocale[other])) err(G, 'C3.og-locale-alt', l, `og:locale:alternate "${ogLocale[other]}" missing`);
    }
    if (ogAlts.has(ogLocale[l])) err(G, 'C3.og-locale-self', l, `og:locale:alternate must not repeat the page's own locale "${ogLocale[l]}"`);

    // C4 — Twitter card
    const card = metaName(head, 'twitter:card')[0];
    if (card !== 'summary_large_image') err(G, 'C4.twitter-card', l, `twitter:card is "${card}", expected "summary_large_image"`);
    for (const k of ['twitter:title', 'twitter:description', 'twitter:image']) {
      if (metaName(head, k).length !== 1) err(G, 'C4.twitter-meta', `${l}:${k}`, `<meta name="${k}"> missing or duplicated`);
    }
    if (!metaName(head, 'twitter:image:alt').length) info(G, 'C4.twitter-image-alt', l, 'twitter:image:alt missing');

    // C5 — LCP preload must reference a file that exists and stay in sync with the hero <img>
    const pre = voidTags(head, 'link').filter((x) => (x.attrs.rel || '').toLowerCase() === 'preload' && (x.attrs.as || '') === 'image');
    if (!pre.length) {
      warn(G, 'C5.preload-missing', l, 'no <link rel="preload" as="image"> for the LCP hero image');
    } else {
      for (const p of pre) {
        const href = p.attrs.href || '';
        const rel = href.replace(/^\.\.\//, '');
        const abs = href.startsWith('../') ? join(ROOT, 'fitence-workout', rel) : join(ROOT, 'fitence-workout', l === 'en' ? '' : l, href);
        if (!existsSync(abs)) err(G, 'C5.preload-404', l, `preloaded LCP image does not exist: ${href}`);
        if ((p.attrs.fetchpriority || '') !== 'high') warn(G, 'C5.preload-priority', l, 'LCP preload lacks fetchpriority="high"');
        const heroImgs = voidTags(bodyOf(html), 'img').filter((i) => (i.attrs.src || '').endsWith(href.replace(/^\.\.\//, '')));
        if (!heroImgs.length) err(G, 'C5.preload-orphan', l, `preloaded image "${href}" is not used by any <img> on the page`);
        else if ((heroImgs[0].attrs.loading || '') === 'lazy') err(G, 'C5.preload-lazy', l, 'the preloaded LCP image is also loading="lazy"');
      }
    }
  }

  // C6 — hreflang reciprocity: if A points at B, B must point back at A
  for (const a of LANGS) {
    for (const b of LANGS) {
      if (a === b || !graph[a] || !graph[b]) continue;
      if (graph[a].has(htmlLang[b]) && !graph[b].has(htmlLang[a]))
        err(G, 'C6.hreflang-reciprocity', `${a}->${b}`, `${a} declares ${b} as an alternate but ${b} does not declare ${a}`);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// GROUP D — structured data
// ═══════════════════════════════════════════════════════════
function checkJsonLd() {
  const G = 'D/schema';

  for (const l of LANGS) {
    const html = pages[l];
    if (!html) continue;
    const blocks = pairTags(html, 'script').filter((s) => (s.attrs.type || '') === 'application/ld+json');
    if (!blocks.length) {
      err(G, 'D1.jsonld-missing', l, 'no application/ld+json block on the page');
      continue;
    }

    const parsed = [];
    for (const [i, b] of blocks.entries()) {
      try {
        parsed.push(JSON.parse(b.inner));
      } catch (e) {
        err(G, 'D1.jsonld-invalid', `${l}#${i}`, `application/ld+json is not valid JSON: ${e.message}`);
      }
    }

    const nodes = [];
    for (const p of parsed) nodes.push(...(Array.isArray(p['@graph']) ? p['@graph'] : [p]));
    const byType = (t) => nodes.filter((n) => n['@type'] === t);

    // D2 — Organization
    const org = byType('Organization')[0];
    if (!org) err(G, 'D2.org-missing', l, 'no Organization node in structured data');
    else if (!org['@id']) warn(G, 'D2.org-id', l, 'Organization has no @id, so publisher references cannot resolve');

    // D3 — MobileApplication
    const app = byType('MobileApplication')[0] || byType('SoftwareApplication')[0];
    if (!app) {
      err(G, 'D3.app-missing', l, 'no MobileApplication node in structured data');
    } else {
      if (app.url !== urlFor(l)) err(G, 'D3.app-url', l, `MobileApplication.url is "${app.url}", expected "${urlFor(l)}"`);
      if (app.inLanguage !== htmlLang[l]) err(G, 'D3.app-lang', l, `MobileApplication.inLanguage is "${app.inLanguage}", expected "${htmlLang[l]}"`);
      if (app.description !== meta[l].desc) err(G, 'D3.app-desc', l, 'MobileApplication.description differs from the page meta description');
      if (!app.applicationCategory) warn(G, 'D3.app-category', l, 'MobileApplication.applicationCategory missing');
      if (!app.offers?.price && app.offers?.price !== '0' && app.offers?.price !== 0)
        warn(G, 'D3.app-offers', l, 'MobileApplication.offers.price missing');
      if (app.offers && !app.offers.priceCurrency) warn(G, 'D3.app-currency', l, 'offers.priceCurrency missing');
      // publisher reference must resolve inside the same graph
      const pubId = app.publisher?.['@id'];
      if (pubId && !nodes.some((n) => n['@id'] === pubId)) err(G, 'D3.publisher-dangling', l, `publisher @id "${pubId}" does not resolve to a node in the graph`);
      // aggregateRating / ratingCount are ASO-relevant rich-result eligibility signals
      if (!app.aggregateRating) info(G, 'D3.app-rating', l, 'MobileApplication has no aggregateRating — app rich results stay ineligible');
      // D3b — store coverage must match config.appStore
      const urls = [app.installUrl, app.downloadUrl].filter(Boolean).join(' ');
      if (!/play\.google\.com/.test(urls)) err(G, 'D3.store-play', l, 'no Google Play URL in MobileApplication install/downloadUrl');
      if (appStore?.available && !/apps\.apple\.com/.test(JSON.stringify(app)))
        err(G, 'D3.store-apple', l, 'config.appStore.available is true but the App Store URL is absent from the MobileApplication node');
      const os = String(app.operatingSystem || '');
      if (appStore?.available && !/ios/i.test(os)) warn(G, 'D3.app-os', l, `operatingSystem "${os}" does not mention iOS although the App Store build is live`);
    }

    // D4 — FAQPage must mirror the visible FAQ exactly (Google requirement)
    const faqNode = byType('FAQPage')[0];
    const details = pairTags(html, 'details').filter((d) => /faq-item/.test(d.attrs.class || ''));
    if (!faqNode) {
      err(G, 'D4.faq-missing', l, 'no FAQPage node although the page renders an FAQ section');
    } else {
      const qs = Array.isArray(faqNode.mainEntity) ? faqNode.mainEntity : [];
      if (!qs.length) err(G, 'D4.faq-empty', l, 'FAQPage.mainEntity is empty');
      if (qs.length !== details.length)
        err(G, 'D4.faq-count', l, `FAQPage has ${qs.length} Question node(s) but the page renders ${details.length} <details class="faq-item">`);
      if (faqNode.inLanguage && faqNode.inLanguage !== htmlLang[l])
        err(G, 'D4.faq-lang', l, `FAQPage.inLanguage is "${faqNode.inLanguage}", expected "${htmlLang[l]}"`);
      const visibleQ = details.map((d) => stripTags(pairTags(d.inner, 'summary')[0]?.inner || ''));
      const visibleA = details.map((d) => stripTags((d.inner.match(/<div class="faq-answer">([\s\S]*?)<\/div>/) || [, ''])[1]));
      qs.forEach((q, i) => {
        const name = stripTags(String(q.name ?? ''));
        const answer = stripTags(String(q.acceptedAnswer?.text ?? ''));
        if (!name) err(G, 'D4.faq-q-empty', `${l}#${i}`, 'Question.name is empty');
        if (!answer) err(G, 'D4.faq-a-empty', `${l}#${i}`, 'acceptedAnswer.text is empty');
        if (visibleQ[i] !== undefined && name !== visibleQ[i])
          err(G, 'D4.faq-q-drift', `${l}#${i}`, `Question.name does not match the visible <summary>:\n      schema:  "${name}"\n      visible: "${visibleQ[i]}"`);
        if (visibleA[i] !== undefined && answer !== visibleA[i])
          err(G, 'D4.faq-a-drift', `${l}#${i}`, `acceptedAnswer.text does not match the visible answer:\n      schema:  "${answer.slice(0, 90)}"\n      visible: "${visibleA[i].slice(0, 90)}"`);
      });
    }

    // D5 — BreadcrumbList is a cheap SERP win and is currently optional
    if (!byType('BreadcrumbList').length) info(G, 'D5.breadcrumb', l, 'no BreadcrumbList node');
  }
}

// ═══════════════════════════════════════════════════════════
// GROUP E — on-page content, images, links
// ═══════════════════════════════════════════════════════════
function checkContent() {
  const G = 'E/content';
  const altByLang = {};

  for (const l of LANGS) {
    const html = pages[l];
    if (!html) continue;
    const body = bodyOf(html);

    // E1 — exactly one <h1>
    const h1 = pairTags(body, 'h1');
    if (h1.length !== 1) err(G, 'E1.h1-count', l, `expected exactly 1 <h1>, found ${h1.length}`);
    else if (!stripTags(h1[0].inner)) err(G, 'E1.h1-empty', l, '<h1> renders no text');

    // E2 — heading levels never skip a rank
    const seq = [...body.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
    let prev = 0;
    seq.forEach((lvl, i) => {
      if (prev && lvl > prev + 1) warn(G, 'E2.heading-skip', l, `heading rank jumps h${prev} → h${lvl} (heading #${i + 1})`);
      prev = lvl;
    });

    // E3 — images: alt, intrinsic size, existing file, lazy discipline
    const imgs = voidTags(body, 'img');
    altByLang[l] = {};
    imgs.forEach((img, i) => {
      const src = img.attrs.src || '';
      const ref = `${l}#${i} ${src || '(no src)'}`;
      if (!src) err(G, 'E3.img-src', ref, '<img> has no src');
      if (!('alt' in img.attrs)) err(G, 'E3.img-alt-missing', ref, '<img> has no alt attribute');
      else if (!img.attrs.alt.trim()) warn(G, 'E3.img-alt-empty', ref, 'alt is empty (decorative?) — screenshots should describe the screen');
      if (!img.attrs.width || !img.attrs.height) warn(G, 'E3.img-dimensions', ref, 'no width/height — causes layout shift (CLS)');
      if (src && !/^https?:|^data:/.test(src)) {
        const dir = l === 'en' ? join(ROOT, 'fitence-workout') : join(ROOT, 'fitence-workout', l);
        if (!existsSync(join(dir, src))) err(G, 'E3.img-404', ref, 'referenced image file does not exist');
      }
      const key = img.attrs['data-screen'] || src;
      if (img.attrs.alt) altByLang[l][key] = img.attrs.alt;
    });

    // E4 — every screenshot the template asks for exists in this language's folder
    const wanted = [...template.matchAll(/data-screen="([^"]+)"/g)].map((m) => m[1]);
    const dir = join(ROOT, 'fitence-workout', 'screens', l);
    if (!existsSync(dir)) {
      err(G, 'E4.screens-dir', l, `screenshot folder is missing: fitence-workout/screens/${l}/`);
    } else {
      const have = new Set(readdirSync(dir));
      for (const f of new Set(wanted)) {
        if (!have.has(f)) err(G, 'E4.screen-missing', `${l}/${f}`, `screenshot used by the landing is missing from screens/${l}/`);
      }
    }

    // E5 — in-page anchors must resolve
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const anchors = [...body.matchAll(/href="#([^"]*)"/g)].map((m) => m[1]);
    for (const a of new Set(anchors)) {
      if (!a) warn(G, 'E5.anchor-empty', l, 'href="#" placeholder link');
      else if (!ids.has(a)) err(G, 'E5.anchor-dead', `${l}#${a}`, `anchor points at #${a}, no element with that id exists`);
    }

    // E6 — external links: rel/target hygiene, and no internal dead ends
    for (const a of pairTags(body, 'a')) {
      const href = a.attrs.href || '';
      if (!href) {
        warn(G, 'E6.link-nohref', l, `<a> without href: "${stripTags(a.inner).slice(0, 40)}"`);
        continue;
      }
      if (/^https?:\/\//.test(href) && !href.startsWith(BASE)) {
        if ((a.attrs.target || '') === '_blank' && !/noopener/.test(a.attrs.rel || ''))
          warn(G, 'E6.link-noopener', l, `target="_blank" without rel="noopener": ${href}`);
      } else if (href.startsWith('/')) {
        const p = join(ROOT, href.replace(/\/$/, '/index.html'));
        if (!existsSync(p) && !existsSync(join(ROOT, href))) err(G, 'E6.link-404', l, `internal link has no target file: ${href}`);
      }
    }

    // E7 — store buttons must match config.appStore
    const bodyHasApple = /apps\.apple\.com/.test(body);
    const bodyHasPlay = /play\.google\.com/.test(body);
    if (!bodyHasPlay) err(G, 'E7.play-missing', l, 'no Google Play link on the page');
    if (appStore?.available && !bodyHasApple) err(G, 'E7.apple-missing', l, 'config.appStore.available is true but no App Store link is rendered');
    if (!appStore?.available && bodyHasApple) err(G, 'E7.apple-leak', l, 'config.appStore.available is false but an App Store link is rendered');
    if (appStore?.available && /store-btn-soon/.test(body)) err(G, 'E7.apple-soon', l, 'App Store button still renders the non-clickable "Soon" state');

    // E8 — language switcher completeness
    for (const other of LANGS) {
      const re = new RegExp(`href="${pathFor(other).replace(/\//g, '\\/')}"[^>]*hreflang="${htmlLang[other]}"`);
      if (!re.test(body)) err(G, 'E8.switcher', l, `language switcher has no correct link to "${other}"`);
    }
    const active = [...body.matchAll(/class="lang-btn active"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
    if (active.length !== 1 || active[0] !== pathFor(l))
      err(G, 'E8.switcher-active', l, `expected exactly one active switcher entry pointing at "${pathFor(l)}", got ${JSON.stringify(active)}`);
  }

  // E9 — alt text and og:image:alt must be localized, not copied from English
  for (const l of LANGS.filter((x) => x !== 'en')) {
    const same = Object.keys(altByLang[l] || {}).filter((k) => altByLang.en?.[k] && altByLang.en[k] === altByLang[l][k]);
    if (same.length)
      err(G, 'E9.alt-not-localized', l, `${same.length}/${Object.keys(altByLang[l]).length} image alt attributes are byte-identical to the English ones — image alt text is not translated`);
    const ogAlt = metaProp(headOf(pages[l] || ''), 'og:image:alt')[0];
    const enOgAlt = metaProp(headOf(pages.en || ''), 'og:image:alt')[0];
    if (ogAlt && ogAlt === enOgAlt) warn(G, 'E9.og-alt-not-localized', l, 'og:image:alt is identical to the English one');
    const twAlt = metaName(headOf(pages[l] || ''), 'twitter:image:alt')[0];
    const enTwAlt = metaName(headOf(pages.en || ''), 'twitter:image:alt')[0];
    if (twAlt && twAlt === enTwAlt) warn(G, 'E9.tw-alt-not-localized', l, 'twitter:image:alt is identical to the English one');
  }

  // E10 — keywords meta should not be lang-specific dead weight / must be consistent
  const kw = LANGS.filter((l) => pages[l] && metaName(headOf(pages[l]), 'keywords').length);
  if (kw.length && kw.length !== LANGS.length)
    warn(G, 'E10.keywords-partial', kw.join(','), `<meta name="keywords"> is present on ${kw.length}/${LANGS.length} languages only — inconsistent (the tag is ignored by Google either way)`);

  // E11 — every visible text node driven by data-i18n must actually be translated
  for (const l of LANGS.filter((x) => x !== 'en')) {
    if (!pages[l] || !pages.en) continue;
    const grab = (html) => {
      const out = {};
      const re = /<([a-zA-Z0-9]+)([^>]*?)\sdata-i18n="([^"]+)"([^>]*?)>([\s\S]*?)<\/\1>/g;
      let m;
      while ((m = re.exec(html))) out[m[3]] = stripTags(m[5]);
      return out;
    };
    const en = grab(pages.en);
    const cur = grab(pages[l]);
    const untranslated = Object.keys(cur).filter((k) => en[k] && en[k] === cur[k] && /[a-zA-Z]{4}/.test(en[k]));
    if (untranslated.length)
      warn(G, 'E11.i18n-fallback', l, `${untranslated.length} data-i18n block(s) render identical English text: ${untranslated.join(', ')}`);
  }
}

// ═══════════════════════════════════════════════════════════
// GROUP F — sitemap & robots
// ═══════════════════════════════════════════════════════════
function checkSitemapRobots() {
  const G = 'F/sitemap';
  const sitemapPath = join(ROOT, 'sitemap.xml');
  const robotsPath = join(ROOT, 'robots.txt');

  if (!existsSync(sitemapPath)) {
    err(G, 'F1.sitemap-missing', '-', 'sitemap.xml does not exist');
  } else {
    const xml = readFileSync(sitemapPath, 'utf8');
    if (!/^<\?xml/.test(xml.trim())) err(G, 'F1.sitemap-decl', '-', 'sitemap.xml has no XML declaration');
    if (!/xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(xml)) err(G, 'F1.sitemap-ns', '-', 'sitemap urlset namespace missing');
    if (/xhtml:link/.test(xml) && !/xmlns:xhtml=/.test(xml)) err(G, 'F1.sitemap-xhtml-ns', '-', 'sitemap uses xhtml:link without declaring the xhtml namespace');

    const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    const locs = urlBlocks.map((b) => (b.match(/<loc>([^<]+)<\/loc>/) || [, ''])[1]);

    // F2 — every language URL is listed, exactly once
    for (const l of LANGS) {
      const n = locs.filter((u) => u === urlFor(l)).length;
      if (n === 0) err(G, 'F2.loc-missing', l, `${urlFor(l)} is not in sitemap.xml`);
      if (n > 1) err(G, 'F2.loc-duplicate', l, `${urlFor(l)} appears ${n} times in sitemap.xml`);
    }

    // F3 — each landing entry carries the full xhtml:link alternate set
    for (const b of urlBlocks) {
      const loc = (b.match(/<loc>([^<]+)<\/loc>/) || [, ''])[1];
      const lang = LANGS.find((l) => urlFor(l) === loc);
      if (!lang) continue;
      const alts = new Map([...b.matchAll(/<xhtml:link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
      for (const l of LANGS) {
        if (alts.get(htmlLang[l]) !== urlFor(l)) err(G, 'F3.sitemap-alt', `${lang}->${l}`, `xhtml:link alternate for "${htmlLang[l]}" missing or wrong in the ${lang} entry`);
      }
      if (alts.get('x-default') !== urlFor('en')) err(G, 'F3.sitemap-xdefault', lang, 'x-default xhtml:link missing or wrong');
    }

    // F4 — every <loc> resolves to a real file, and is not noindex
    for (const loc of locs) {
      if (!loc.startsWith(BASE)) {
        err(G, 'F4.loc-host', loc, `<loc> is outside the canonical host ${BASE}`);
        continue;
      }
      let rel = loc.slice(BASE.length);
      const p = rel.endsWith('/') ? join(ROOT, rel, 'index.html') : join(ROOT, rel);
      if (!existsSync(p)) {
        err(G, 'F4.loc-404', loc, `<loc> has no corresponding file (${p.replace(ROOT + '/', '')})`);
        continue;
      }
      const h = headOf(readFileSync(p, 'utf8'));
      const robots = metaName(h, 'robots').join(' ').toLowerCase();
      if (/noindex/.test(robots)) err(G, 'F4.loc-noindex', loc, 'page listed in sitemap.xml is marked noindex');
      const canon = voidTags(h, 'link').filter((x) => (x.attrs.rel || '').toLowerCase() === 'canonical')[0]?.attrs.href;
      if (canon && canon !== loc) err(G, 'F4.loc-canonical', loc, `page canonicalises to "${canon}", so this <loc> should not be listed`);
      const lastmod = (urlBlocks[locs.indexOf(loc)].match(/<lastmod>([^<]+)<\/lastmod>/) || [, ''])[1];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) warn(G, 'F4.lastmod', loc, `<lastmod> is "${lastmod}", expected YYYY-MM-DD`);
    }

    // F5 — indexable HTML pages that the sitemap forgot
    const walk = (dir, acc = []) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.name.startsWith('.') || e.name.startsWith('_') || e.name === 'node_modules' || e.name === 'screens') continue;
        const p = join(dir, e.name);
        if (e.isDirectory()) walk(p, acc);
        else if (e.name.endsWith('.html')) acc.push(p);
      }
      return acc;
    };
    for (const p of walk(ROOT)) {
      const html = readFileSync(p, 'utf8');
      const h = headOf(html);
      const robots = metaName(h, 'robots').join(' ').toLowerCase();
      if (/noindex/.test(robots)) continue;
      const canon = voidTags(h, 'link').filter((x) => (x.attrs.rel || '').toLowerCase() === 'canonical')[0]?.attrs.href;
      const relUrl = BASE + '/' + p.replace(ROOT + '/', '').replace(/(^|\/)index\.html$/, '$1');
      const target = canon || relUrl;
      if (!locs.includes(target))
        warn(G, 'F5.sitemap-gap', p.replace(ROOT + '/', ''), `indexable page is not listed in sitemap.xml (would be "${target}")`);
    }
  }

  // F6 — robots.txt
  if (!existsSync(robotsPath)) {
    err(G, 'F6.robots-missing', '-', 'robots.txt does not exist');
  } else {
    const txt = readFileSync(robotsPath, 'utf8');
    if (!/^user-agent:/im.test(txt)) err(G, 'F6.robots-ua', '-', 'robots.txt has no User-agent directive');
    if (/^\s*disallow:\s*\/\s*$/im.test(txt)) err(G, 'F6.robots-disallow-all', '-', 'robots.txt disallows the whole site');
    const sm = (txt.match(/^sitemap:\s*(\S+)/im) || [, ''])[1];
    if (!sm) err(G, 'F6.robots-sitemap', '-', 'robots.txt has no Sitemap: directive');
    else if (sm !== `${BASE}/sitemap.xml`) err(G, 'F6.robots-sitemap-url', '-', `robots.txt Sitemap is "${sm}", expected "${BASE}/sitemap.xml"`);
  }
}

// ═══════════════════════════════════════════════════════════
// run + report
// ═══════════════════════════════════════════════════════════
checkSources();
checkHead();
checkAlternates();
checkJsonLd();
checkContent();
checkSitemapRobots();

const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');
const infos = findings.filter((f) => f.level === 'info');

if (JSON_OUT) {
  console.log(JSON.stringify({ errors: errors.length, warnings: warns.length, infos: infos.length, findings }, null, 2));
} else {
  const ICON = { error: '✗', warn: '!', info: '·' };
  let lastGroup = null;
  for (const f of [...errors, ...warns, ...infos].sort((a, b) => a.group.localeCompare(b.group) || a.id.localeCompare(b.id))) {
    if (f.group !== lastGroup) {
      console.log(`\n── ${f.group} ${'─'.repeat(Math.max(0, 56 - f.group.length))}`);
      lastGroup = f.group;
    }
    console.log(`  ${ICON[f.level]} [${f.id}] ${f.scope}\n      ${f.msg}`);
  }
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${errors.length} error(s) · ${warns.length} warning(s) · ${infos.length} note(s)`);
  console.log('═'.repeat(60));
}

process.exit(errors.length ? 1 : 0);
