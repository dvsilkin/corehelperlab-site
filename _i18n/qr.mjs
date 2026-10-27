// QR redirect pages for printed flyers (ASO-49 / ASO-50).
//   Writes: q/<code>/index.html — called from build.mjs.
//   Brief:  doc/aso/qr_flyer/QR_FLYER.md in the fitness_app repo.
//
// Each page counts the scan (sendBeacon → Cloud Function qrScan, GRW-10) and
// sends the visitor to the store for their platform with per-code attribution.
// The printed URL is permanent: a code is never removed or reused.
// A NEW CODE goes here AND into QR_CODES in functions/src/qr_scan.ts of the
// app repo — otherwise the page works but the counter silently drops its scans.

import { config } from './translations.mjs';

// <country>-<gym|near> (ISO 3166: ua = Ukraine) → page language.
export const QR_CODES = {
  'fr-gym': 'fr',
  'fr-near': 'fr',
  'es-gym': 'es',
  'es-near': 'es',
  'ua-gym': 'uk',
  'ua-near': 'uk',
};

export const QR_COUNTER = 'https://us-central1-fitence---workout-planner.cloudfunctions.net/qrScan';
const PLAY_ID = 'com.corehelperlab.fitence.workout';
const APPLE_ID = '6769868181';

export const qrPath = (code) => `/q/${code}/`;

export function qrStoreLinks(code) {
  const referrer = encodeURIComponent(`utm_source=qr&utm_medium=flyer&utm_campaign=qr-${code}`);
  return {
    apple: `https://apps.apple.com/app/apple-store/id${APPLE_ID}?pt=${config.appStore.providerToken}&ct=qr-${code}&mt=8`,
    play: `https://play.google.com/store/apps/details?id=${PLAY_ID}&referrer=${referrer}`,
  };
}

const TEXT = {
  fr: {
    title: 'Fitence — ouverture du store',
    opening: 'Ouverture du store…',
    fallback: 'Si rien ne se passe, choisissez votre store :',
    appstore: 'Télécharger sur', gplay: 'Disponible sur',
    more: 'Découvrir Fitence',
  },
  es: {
    title: 'Fitence — abriendo la tienda',
    opening: 'Abriendo la tienda…',
    fallback: 'Si no pasa nada, elige tu tienda:',
    appstore: 'Descárgalo en el', gplay: 'Disponible en',
    more: 'Conoce Fitence',
  },
  uk: {
    title: 'Fitence — відкриваємо магазин',
    opening: 'Відкриваємо магазин застосунків…',
    fallback: 'Якщо нічого не сталося, обери магазин:',
    appstore: 'Завантажити в', gplay: 'Доступно в',
    more: 'Дізнатися про Fitence',
  },
};

// Page language follows the device when we have it, else the flyer's language.
// Landing folders use `ua` for Ukrainian.
const LANDING = { fr: '/fitence-workout/fr/', es: '/fitence-workout/es/', uk: '/fitence-workout/ua/' };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function renderQrPage(code) {
  const lang = QR_CODES[code];
  const t = TEXT[lang];
  const { apple, play } = qrStoreLinks(code);
  const landing = LANDING[lang];
  // Inline script, no cookies, no third parties. Counter first (fire-and-forget),
  // then replace() so Back does not bounce into the redirect again.
  const script = `(function () {
  var ua = navigator.userAgent || '';
  var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var p = ios ? 'ios' : /Android/.test(ua) ? 'android' : 'other';
  var T = ${JSON.stringify(Object.fromEntries(Object.entries(TEXT).map(([l, x]) => [l, { ...x, landing: LANDING[l] }])))};
  var langs = navigator.languages || [navigator.language || ''];
  for (var i = 0; i < langs.length; i++) {
    var l = String(langs[i]).slice(0, 2).toLowerCase();
    if (T[l]) {
      if (l !== ${JSON.stringify(lang)}) {
        document.documentElement.lang = l;
        document.title = T[l].title;
        var els = document.querySelectorAll('[data-t]');
        for (var j = 0; j < els.length; j++) els[j].textContent = T[l][els[j].getAttribute('data-t')];
        document.getElementById('more').href = T[l].landing;
      }
      break;
    }
  }
  try {
    if (navigator.sendBeacon) navigator.sendBeacon(${JSON.stringify(QR_COUNTER)}, JSON.stringify({ id: ${JSON.stringify(code)}, p: p }));
  } catch (e) {}
  if (p === 'ios') location.replace(${JSON.stringify(apple)});
  else if (p === 'android') location.replace(${JSON.stringify(play)});
  else document.documentElement.className = 'other';
})();`;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(t.title)}</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
  :root { --bg: #0D0D16; --card: #1D1D2A; --border: #252535; --acc: #FF4D1A; --txt: #EEEEF5; --muted: #6A6A85; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--bg); color: var(--txt); font: 16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px 16px; }
  main { width: 100%; max-width: 360px; text-align: center; }
  .logo { font-size: 32px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 16px; }
  .logo span { color: var(--acc); }
  p { margin: 0 0 16px; color: var(--muted); }
  .opening { color: var(--txt); }
  .other .opening { display: none; }
  a.store { display: block; margin: 0 0 12px; padding: 12px 16px; border: 1px solid var(--border); border-radius: 12px;
    background: var(--card); color: var(--txt); text-decoration: none; }
  a.store small { display: block; font-size: 12px; color: var(--muted); }
  a.store strong { font-size: 18px; }
  a.more { color: var(--acc); }
</style>
</head>
<body>
<main>
  <div class="logo"><span>Fit</span>ence</div>
  <p class="opening" data-t="opening">${esc(t.opening)}</p>
  <p data-t="fallback">${esc(t.fallback)}</p>
  <a class="store" href="${esc(apple)}"><small data-t="appstore">${esc(t.appstore)}</small><strong>App Store</strong></a>
  <a class="store" href="${esc(play)}"><small data-t="gplay">${esc(t.gplay)}</small><strong>Google Play</strong></a>
  <p><a class="more" id="more" href="${landing}" data-t="more">${esc(t.more)}</a></p>
</main>
<script>
${script}
</script>
</body>
</html>
`;
}
