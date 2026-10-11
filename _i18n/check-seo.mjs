// SEO gate: run AFTER `node _i18n/build.mjs`. Exit code 1 on any ERROR.
// WARN lines are known debts (reported, do not fail the gate).
// Invariants per generated page: title/description length, canonical, hreflang
// reciprocity, JSON-LD parses, img alt, store links carry attribution, sitemap == pages.
import { readFileSync, existsSync } from 'node:fs';
import { config } from './translations.mjs';

const { BASE, LANGS } = config;
const TITLE_MAX = 60, DESC_MAX = 160;
const PLAY = 'play.google.com/store/apps/details';
const APPLE = 'apps.apple.com';
const errors = [], warns = [];
const err = (m) => errors.push(m), warn = (m) => warns.push(m);

const file = (l) => (l === 'en' ? 'fitence-workout/index.html' : `fitence-workout/${l}/index.html`);
const url = (l) => (l === 'en' ? `${BASE}/fitence-workout/` : `${BASE}/fitence-workout/${l}/`);
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let hreflangSets = [];
for (const l of LANGS) {
  const f = file(l);
  if (!existsSync(f)) { err(`${l}: ${f} missing`); continue; }
  const h = readFileSync(f, 'utf8');
  const title = dec((h.match(/<title>(.*?)<\/title>/s) || [])[1] || '');
  const desc = dec((h.match(/<meta name="description" content="(.*?)"/s) || [])[1] || '');
  // title/description: known debt for non-EN locales is WARN until rewritten one locale at a time
  const overs = (what, n, max) => (l === 'en' ? err : warn)(`${l}: ${what} ${n} > ${max}`);
  if (!title) err(`${l}: no <title>`); else if ([...title].length > TITLE_MAX) overs('title', [...title].length, TITLE_MAX);
  if (!desc) err(`${l}: no meta description`); else if ([...desc].length > DESC_MAX) overs('description', [...desc].length, DESC_MAX);

  for (const m of h.matchAll(/<meta (?:property="og:image"|name="twitter:image") content="([^"]+)"/g)) {
    if (!existsSync(m[1].replace(BASE + '/', ''))) err(`${l}: og/twitter image missing on disk: ${m[1]}`);
  }
  const canon = (h.match(/<link rel="canonical" href="(.*?)"/) || [])[1];
  if (canon !== url(l)) err(`${l}: canonical ${canon} != ${url(l)}`);

  const alts = [...h.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]}=${m[2]}`).sort();
  hreflangSets.push([l, alts]);
  if (alts.filter((a) => a.startsWith('x-default=')).length !== 1) err(`${l}: x-default count != 1`);
  if (!alts.some((a) => a.endsWith(`=${url(l)}`))) err(`${l}: hreflang has no self-reference`);

  for (const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const j = JSON.parse(m[1]);
      const g = j['@graph'] || [j];
      for (const n of g) if (!n['@type']) err(`${l}: ld+json node without @type`);
      for (const n of g) if (n['@type'] === 'MobileApplication' && !(n.name && n.url && n.offers)) err(`${l}: MobileApplication lacks name/url/offers`);
      for (const n of g) for (const u of n.screenshot || []) if (!existsSync(u.replace(BASE + '/', ''))) err(`${l}: JSON-LD screenshot missing on disk: ${u}`);
      for (const n of g) if (n['@type'] === 'FAQPage' && !(n.mainEntity?.length)) err(`${l}: FAQPage empty`);
    } catch (e) { err(`${l}: ld+json does not parse (${e.message})`); }
  }

  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    const alt = (m[0].match(/\balt="([^"]*)"/) || [])[1];
    if (!alt || !alt.trim()) err(`${l}: <img> without alt: ${m[0].slice(0, 80)}`);
    const src = (m[0].match(/\bsrc="([^"]*)"/) || [])[1];
    if (src && !/^https?:/.test(src)) {
      const path = (l === 'en' ? 'fitence-workout/' : 'fitence-workout/' + l + '/') + src;
      if (!existsSync(path)) err(`${l}: <img> file missing on disk: ${src}`);
    }
  }

  for (const m of h.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = dec(m[1]);
    if (href.includes(PLAY) && !/[?&]referrer=/.test(href)) err(`${l}: Play link without referrer: ${href}`);
    if (href.includes(PLAY) && !href.includes(`utm_medium%3D${l}`)) err(`${l}: Play referrer has wrong utm_medium: ${href}`);
    if (href.includes(APPLE) && !(/[?&]pt=\d+/.test(href) && /[?&]ct=(hero|footer)-/.test(href))) err(`${l}: App Store link without pt/ct: ${href}`);
    if (href.includes(APPLE) && !href.includes(`ct=hero-${l}`) && !href.includes(`ct=footer-${l}`)) err(`${l}: App Store ct has wrong language: ${href}`);
  }
  if (/syncs? automatically|синхронизируются автоматически|синхронізуються автоматично|synchronisieren sich automatisch|se sincronizan automáticamente|se synchronisent automatiquement|si sincronizzano automaticamente/i.test(h))
    err(`${l}: promise of automatic sync is back`);
}
const ref = JSON.stringify(hreflangSets[0]?.[1]);
for (const [l, a] of hreflangSets) if (JSON.stringify(a) !== ref) err(`${l}: hreflang set differs from ${hreflangSets[0][0]}`);

if (!existsSync('sitemap.xml')) err('sitemap.xml missing');
else {
  const sm = readFileSync('sitemap.xml', 'utf8');
  const locs = new Set([...sm.matchAll(/<url>\s*<loc>(.*?)<\/loc>/g)].map((m) => m[1]));
  for (const l of LANGS) if (!locs.has(url(l))) err(`sitemap lacks ${url(l)}`);
  for (const loc of locs) if (loc.includes('/fitence-workout/') && !LANGS.some((l) => url(l) === loc) && !/(privacy|terms)\.html$/.test(loc)) err(`sitemap has unexpected ${loc}`);
}

for (const w of warns) console.log('WARN ', w);
for (const e of errors) console.log('ERROR', e);
console.log(`\n${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
