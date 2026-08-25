# CLAUDE.md — corehelperlab-site

## Проект
Сайт компании CoreHelperLab и лендинг мобильного приложения Fitence (фитнес-трекер для iOS и Android).

## Структура репозитория
```
/
├── index.html                   # Главная страница компании (без i18n)
├── _i18n/                       # Источник правды лендинга (не публикуется)
│   ├── translations.mjs         # Переводы + SEO-строки + конфиг
│   ├── template.html            # Разметка с токенами {{...}} и data-i18n
│   ├── build.mjs                # Генератор страниц и sitemap.xml
│   └── check-seo.mjs            # Проверка SEO/i18n-инвариантов
├── fitence-workout/
│   ├── index.html               # Сгенерированный лендинг EN (x-default)
│   ├── <lang>/index.html        # Сгенерированные ru ua fr de es it
│   ├── screens/<lang>/          # Локализованные скриншоты (все языки заполнены)
│   ├── privacy.html
│   └── terms.html
├── privacy.html                 # noindex-редирект на fitence-workout/privacy.html
├── terms.html                   # noindex-редирект на fitence-workout/terms.html
├── sitemap.xml                  # Генерируется build.mjs
└── robots.txt
```

## Рабочий процесс

### Ветки
- Всегда работай в выделенной ветке сессии (формат `claude/<name>`)
- Никогда не пушь напрямую в `main`
- После завершения задачи — коммит и пуш, PR обновляется автоматически

### Синхронизация
- Перед началом работы делай `git pull origin <branch>` — владелец может вносить правки напрямую
- Все изменения пушить сразу — контейнер эфемерен

## Деплой
- Хостинг: GitHub Pages
- Домен: corehelperlab.com (файл CNAME)
- Деплоится автоматически из ветки `main`

## Локализация (статическая генерация языковых страниц)

### Поддерживаемые языки
`en` 🇬🇧 · `ru` 🇷🇺 · `ua` 🇺🇦 · `fr` 🇫🇷 · `de` 🇩🇪 · `es` 🇪🇸 · `it` 🇮🇹

### Как устроено (важно)
С Этапа 3 SEO лендинг **генерируется** — у каждого языка свой URL с готовым (server-rendered) HTML, чтобы поисковики его индексировали:
- `en` (и `x-default`) → `fitence-workout/index.html`
- остальные → `fitence-workout/<lang>/index.html` (`ru/`, `ua/`, `fr/`, `de/`, `es/`, `it/`)
- между языками проставлены теги `hreflang`, в `sitemap.xml` — `xhtml:link` альтернативы

**Источник правды — папка `_i18n/` (не публикуется: Jekyll игнорирует пути на `_`):**
- `_i18n/translations.mjs` — все переводы (61 ключ/язык) + локализованные SEO-строки (`title`/`description`) + конфиг (флаги, hreflang-карты)
- `_i18n/template.html` — разметка лендинга с токенами `{{...}}` и атрибутами `data-i18n`
- `_i18n/build.mjs` — генератор

**Эти сгенерированные файлы НЕЛЬЗЯ править руками** — правки затрутся при следующей сборке. Меняй `template.html` / `translations.mjs`, затем:
```
node _i18n/build.mjs && node _i18n/check-seo.mjs
```
Первая команда пересоздаёт `fitence-workout/index.html`, все `fitence-workout/<lang>/index.html` и `sitemap.xml`. Вторая проверяет результат по SEO/i18n-инвариантам и возвращает код 1 при ошибках — прогонять после каждой сборки.

### Перевод текста
- **Текст элемента** — атрибут `data-i18n="key"`, генератор подставляет содержимое.
- **Alt картинок** — атрибут `data-i18n-alt="key"`, генератор подставляет `alt`. Alt локализован, у новой картинки должен быть ключ во всех языках.
- **Head** — `meta[lang].title` / `meta[lang].desc`, плюс `og.imageAlt` / `tw.imageAlt` в `translations`.
- Перевод, который законно совпадает с английским (например «Support» во французском), нужно перечислить в `config.i18nSameAsEnglish.<lang>` — иначе `check-seo.mjs` посчитает его непереведённым.

### Ограничения
- `<title>` ≤ 60 символов, `<meta name="description">` ≤ 160 — иначе обрежется в выдаче.
- `aggregateRating` в JSON-LD не выдумывать: он должен отражать реальные оценки в Play/App Store.

### Добавление нового языка
1. Добавить код языка в `_i18n/translations.mjs`: блок в `translations`, строки в `meta`, записи в `config` (`LANGS`, `htmlLang`, `ogLocale`, `flags`).
2. Положить локализованные скриншоты в `fitence-workout/screens/<lang>/`.
3. Запустить `node _i18n/build.mjs && node _i18n/check-seo.mjs`, устранить найденное и закоммитить результат.

### Скриншоты
- В шаблоне теги вида `<img ... data-screen="filename.jpg" data-i18n-alt="alt.key">`; генератор проставляет `src` на `screens/<lang>/filename.jpg` и локализованный `alt`.
- Полный набор скриншотов лендинга должен лежать в каждой папке `screens/<lang>/` (если файла нет — положить с тем же именем).

## Связанные проекты
- Мобильное приложение: https://github.com/dvsilkin/fitness_app
- CMS: https://github.com/cardmates-dreamers (отдельная организация)
