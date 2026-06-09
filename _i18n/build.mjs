// Fitence landing i18n generator.
//   Usage:  node _i18n/build.mjs
//   Reads:  _i18n/template.html, _i18n/translations.mjs
//   Writes: fitence-workout/index.html            (en, x-default)
//           fitence-workout/<lang>/index.html      (ru, ua, fr, de, es, it)
//           sitemap.xml                            (with hreflang alternates)
//
// This folder (_i18n/) is excluded from GitHub Pages output because its name
// starts with "_" (Jekyll ignores underscore-prefixed paths).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config, meta, translations } from './translations.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const { BASE, LANGS, htmlLang, ogLocale, flags } = config;

const template = readFileSync(join(__dirname, 'template.html'), 'utf8');

// ── helpers ──────────────────────────────────────────────
const pathFor = (l) => (l === 'en' ? '/fitence-workout/' : `/fitence-workout/${l}/`);
const urlFor = (l) => BASE + pathFor(l);

// escape for attribute values / titles (text contexts)
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// escape only bare ampersands inside innerHTML snippets (keep tags/entities intact)
const fixAmp = (s) => s.replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

function hreflangBlock() {
  const links = LANGS.map(
    (l) => `  <link rel="alternate" hreflang="${htmlLang[l]}" href="${urlFor(l)}">`
  );
  links.push(`  <link rel="alternate" hreflang="x-default" href="${urlFor('en')}">`);
  return links.join('\n');
}

function ogLocaleAlternates(lang) {
  return LANGS.filter((l) => l !== lang)
    .map((l) => `  <meta property="og:locale:alternate" content="${ogLocale[l]}">`)
    .join('\n');
}

function jsonLd(lang) {
  const obj = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://corehelperlab.com/#organization',
        name: 'CoreHelperLab',
        url: 'https://corehelperlab.com/',
        logo: 'https://corehelperlab.com/apple-touch-icon.png',
        email: 'info@corehelperlab.com',
      },
      {
        '@type': 'MobileApplication',
        name: 'Fitence: Workout Planner',
        operatingSystem: 'Android, iOS',
        applicationCategory: 'HealthApplication',
        url: urlFor(lang),
        inLanguage: htmlLang[lang],
        image: 'https://corehelperlab.com/fitence-workout/og-image.jpg',
        description: meta[lang].desc,
        installUrl: 'https://play.google.com/store/apps/details?id=com.corehelperlab.fitence.workout',
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.corehelperlab.fitence.workout',
        publisher: { '@id': 'https://corehelperlab.com/#organization' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  };
  return JSON.stringify(obj, null, 2);
}

function headSeo(lang) {
  const title = escAttr(meta[lang].title);
  const desc = escAttr(meta[lang].desc);
  const canonical = urlFor(lang);
  const asset = lang === 'en' ? '' : '../';
  const keywords =
    lang === 'en'
      ? `  <meta name="keywords" content="workout tracker, gym app, HIIT planner, offline workout app, strength training app, AI fitness coach, workout planner iOS Android">\n`
      : '';
  return `  <title>${title}</title>
  <meta name="description" content="${desc}">
${keywords}  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="theme-color" content="#0D0D16">
  <link rel="canonical" href="${canonical}">

  <!-- Localized alternates -->
${hreflangBlock()}

  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Preload hero LCP image -->
  <link rel="preload" as="image" href="${asset}screens/${lang}/active_workout_work.jpg" fetchpriority="high">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Fitence">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://corehelperlab.com/fitence-workout/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Fitence — offline gym &amp; HIIT workout tracker for iOS and Android">
  <meta property="og:locale" content="${ogLocale[lang]}">
${ogLocaleAlternates(lang)}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="https://corehelperlab.com/fitence-workout/og-image.jpg">
  <meta name="twitter:image:alt" content="Fitence workout tracker">

  <!-- Structured data -->
  <script type="application/ld+json">
${jsonLd(lang)}
  </script>`;
}

function langSwitcher(current) {
  const items = LANGS.map((l) => {
    const cls = l === current ? 'lang-btn active' : 'lang-btn';
    const label = `${flags[l]} ${l.toUpperCase()}`;
    return `          <a class="${cls}" href="${pathFor(l)}" hreflang="${htmlLang[l]}">${label}</a>`;
  }).join('\n');
  return `<div class="lang-switcher" id="langSwitcher">
        <div class="lang-selected" onclick="toggleLangDropdown()">
          <span id="langLabel">${flags[current]} ${current.toUpperCase()}</span>
          <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="lang-dropdown">
${items}
        </div>
      </div>`;
}

function bakeI18n(html, lang) {
  return html.replace(
    /<([a-zA-Z0-9]+)([^>]*?)\sdata-i18n="([^"]+)"([^>]*?)>([\s\S]*?)<\/\1>/g,
    (m, tag, pre, key, post, _inner) => {
      const t = translations[lang][key] ?? translations.en[key];
      if (t == null) return m;
      return `<${tag}${pre} data-i18n="${key}"${post}>${fixAmp(t)}</${tag}>`;
    }
  );
}

function renderPage(lang) {
  const asset = lang === 'en' ? '' : '../';
  let html = template
    .split('{{HTML_LANG}}').join(htmlLang[lang])
    .split('{{ASSET}}').join(asset)
    .split('{{LANG}}').join(lang)
    .split('{{HOME}}').join(pathFor(lang))
    .replace('{{HEAD_SEO}}', headSeo(lang))
    .replace('{{LANG_SWITCHER}}', langSwitcher(lang));
  html = bakeI18n(html, lang);
  return html;
}

function buildSitemap() {
  const alt = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${htmlLang[l]}" href="${urlFor(l)}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en')}"/>`)
    .join('\n');
  const landingUrls = LANGS.map(
    (l) => `  <url>
    <loc>${urlFor(l)}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${l === 'en' ? '1.0' : '0.9'}</priority>
${alt}
  </url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${BASE}/</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${landingUrls}
  <url>
    <loc>${BASE}/fitence-workout/privacy.html</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${BASE}/fitence-workout/terms.html</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`;
}

const LASTMOD = new Date().toISOString().slice(0, 10);

// ── write pages ──────────────────────────────────────────
for (const lang of LANGS) {
  const html = renderPage(lang);
  const outDir = lang === 'en' ? join(ROOT, 'fitence-workout') : join(ROOT, 'fitence-workout', lang);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`✓ ${pathFor(lang)}index.html`);
}

writeFileSync(join(ROOT, 'sitemap.xml'), buildSitemap());
console.log('✓ sitemap.xml');
console.log('Done.');
