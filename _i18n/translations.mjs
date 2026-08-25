// AUTO-MAINTAINED i18n source of truth for the Fitence landing.
// Edit translations/meta/faq here, then run:  node _i18n/build.mjs
// Outputs: fitence-workout/index.html (en, x-default) + fitence-workout/<lang>/index.html
// This folder (_i18n) is excluded from GitHub Pages output (underscore prefix → Jekyll ignores it).

export const config = {
  "BASE": "https://corehelperlab.com",
  "LANGS": [
    "en",
    "ru",
    "ua",
    "fr",
    "de",
    "es",
    "it"
  ],
  "htmlLang": {
    "en": "en",
    "ru": "ru",
    "ua": "uk",
    "fr": "fr",
    "de": "de",
    "es": "es",
    "it": "it"
  },
  "ogLocale": {
    "en": "en_US",
    "ru": "ru_RU",
    "ua": "uk_UA",
    "fr": "fr_FR",
    "de": "de_DE",
    "es": "es_ES",
    "it": "it_IT"
  },
  "flags": {
    "en": "🇬🇧",
    "ru": "🇷🇺",
    "ua": "🇺🇦",
    "fr": "🇫🇷",
    "de": "🇩🇪",
    "es": "🇪🇸",
    "it": "🇮🇹"
  },
  "appStore": {
    "url": "https://apps.apple.com/us/app/fitence-workout-planner-log/id6769868181",
    "available": true
  },
  "i18nSameAsEnglish": {
    "fr": [
      "faq.eyebrow",
      "footer.support"
    ],
    "de": [
      "nav.screens",
      "footer.support"
    ],
    "it": [
      "footer.home"
    ]
  }
};

export const meta = {
  "en": {
    "title": "Fitence — Offline Gym & HIIT Workout Tracker App",
    "desc": "Offline-first workout tracker for strength & HIIT. Plan sessions, train on autopilot with audio cues, get AI feedback. Free on iOS & Android."
  },
  "ru": {
    "title": "Fitence — офлайн-трекер тренировок для зала и HIIT",
    "desc": "Офлайн-трекер силовых и HIIT-тренировок. Планируй, тренируйся на автопилоте со звуковыми сигналами, получай AI-разбор. Бесплатно на iOS и Android."
  },
  "ua": {
    "title": "Fitence — офлайн-трекер тренувань для залу та HIIT",
    "desc": "Офлайн-трекер силових та HIIT-тренувань. Плануй, тренуйся на автопілоті зі звуковими сигналами, отримуй AI-аналіз. Безкоштовно на iOS і Android."
  },
  "fr": {
    "title": "Fitence — Suivi d'entraînement gym & HIIT hors ligne",
    "desc": "Tracker d'entraînement hors ligne pour la force et le HIIT. Planifiez, entraînez-vous en mode auto, retour IA. Gratuit sur iOS et Android."
  },
  "de": {
    "title": "Fitence — Offline Gym- & HIIT-Trainings-Tracker",
    "desc": "Offline-Trainings-Tracker für Kraft und HIIT. Trainings planen, mit Audiosignalen auf Autopilot trainieren, KI-Feedback. Gratis für iOS und Android."
  },
  "es": {
    "title": "Fitence — Registro de entrenos de gimnasio y HIIT",
    "desc": "Tracker de entrenamientos sin conexión para fuerza y HIIT. Planifica, entrena en piloto automático y recibe feedback de IA. Gratis en iOS y Android."
  },
  "it": {
    "title": "Fitence — Tracker allenamenti palestra e HIIT",
    "desc": "Tracker di allenamento offline per forza e HIIT. Pianifica, allenati in automatico con segnali audio, feedback IA. Gratis su iOS e Android."
  }
};

export const translations = {
  "en": {
    "hero.label": "Workout app for iOS & Android",
    "hero.title": "Train without<br><em>thinking</em> about<br>the app",
    "hero.sub": "Plan workouts, train on autopilot, get AI feedback. No internet needed.",
    "btn.appstore.sub": "Download on the",
    "btn.gplay.sub": "Get it on",
    "stat.offline": "Works offline",
    "stat.account": "Accounts",
    "stat.platforms": "Platforms",
    "stat.ai": "Post-workout analysis",
    "feat.eyebrow": "What makes Fitence different",
    "feat.title": "Everything you need.<br>Nothing you don't.",
    "feat.sub": "Designed for the gym floor — not a boardroom demo.",
    "f1.title": "Autopilot mode",
    "f1.body": "Timers count down, audio cues fire at the right moment, screen stays readable from 2 m away. Phone on the floor — you're still in control.",
    "f2.title": "Flexible builder",
    "f2.body": "Strength, HIIT, circuits. Exercises, sets, reps, rest timers, and technique notes — all in one place.",
    "f3.title": "AI analysis",
    "f3.body": "After every session Fitence gives 2–3 concrete recommendations: load, technique, recovery.",
    "f4.title": "Offline first",
    "f4.body": "Train anywhere — no Wi-Fi, no cellular. Data syncs automatically when you're back online.",
    "f5.title": "No account needed",
    "f5.body": "Start immediately. Export workouts to a file, restore on any device at any time.",
    "f6.title": "Built for the gym",
    "f6.body": "High-contrast typography, large tap targets. Every number readable mid-set.",
    "screens.eyebrow": "See it in action",
    "screens.title": "Clean. Fast. Focused.",
    "screens.caption": "Swipe to see more",
    "ai.badge": "AI-powered",
    "ai.title": "Your personal<br>performance<br><em style=\"color:var(--acc2)\">coach</em>",
    "ai.sub": "After every session, Fitence delivers 2–3 specific, actionable recommendations — not generic advice.",
    "ai.card.title": "Fitence AI Analysis",
    "ai.card.sub": "Session complete · 3 recommendations",
    "ai.rec1": "Bench Press: rest-to-set ratio is optimal. Consider increasing load by 2.5 kg next session.",
    "ai.rec2": "Pull-Ups: strong volume today. Watch elbow flare on the descent — keeping them closer improves lat activation.",
    "ai.rec3": "Recovery: 2 sessions in a row on this muscle group. A rest day will improve adaptation.",
    "data.eyebrow": "Freedom & control",
    "data.title": "Your data.<br>Your rules.",
    "d1.title": "Offline first",
    "d1.body": "Train in a basement gym, on a flight, in a mountain cabin. No connection required.",
    "d2.title": "No account required",
    "d2.body": "Open the app and train. No sign-up, no email. One tap from your first workout.",
    "d3.title": "Backup & transfer",
    "d3.body": "Export all workouts and settings to a file. Restore on any device — new phone, no problem.",
    "d4.title": "No tracking",
    "d4.body": "Without an account, your data never leaves the device. No analytics on your fitness data, ever.",
    "cta.title": "Ready to train<br>without <em>distractions?</em>",
    "cta.sub": "Free to download. No account needed. Start today.",
    "footer.home": "Home",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.support": "Support",
    "footer.tagline": "Built for focus.",
    "nav.features": "Features",
    "nav.screens": "Screenshots",
    "nav.faq": "FAQ",
    "faq.eyebrow": "Questions",
    "faq.title": "Frequently asked questions",
    "alt.prepare": "Fitence workout prepare screen with set countdown",
    "alt.work": "Fitence active workout screen showing the current exercise and timer",
    "alt.rest": "Fitence rest timer between sets",
    "alt.dashboard": "Fitence dashboard with today's workout and activity",
    "alt.workouts": "Workout list in Fitence",
    "alt.detail": "Workout detail with exercises, sets and reps",
    "alt.library": "Workout library with ready-made programs in Fitence",
    "alt.profile": "Profile and training statistics in Fitence",
    "og.imageAlt": "Fitence — offline gym & HIIT workout tracker for iOS and Android",
    "tw.imageAlt": "Fitence workout tracker"
  },
  "ru": {
    "hero.label": "Приложение для тренировок iOS и Android",
    "hero.title": "Тренируйся, не<br>думая об <em>приложении</em>",
    "hero.sub": "Планируй тренировки, работай на автопилоте, получай AI-разбор. Без интернета.",
    "btn.appstore.sub": "Скачать в",
    "btn.gplay.sub": "Доступно в",
    "stat.offline": "Работает офлайн",
    "stat.account": "Аккаунтов",
    "stat.platforms": "Платформы",
    "stat.ai": "AI-анализ тренировок",
    "feat.eyebrow": "Чем Fitence отличается",
    "feat.title": "Всё нужное.<br>Ничего лишнего.",
    "feat.sub": "Создан для зала — не для презентации инвесторам.",
    "f1.title": "Режим автопилота",
    "f1.body": "Таймеры отсчитывают время, звуковые сигналы срабатывают в нужный момент, экран читается с двух метров. Телефон на полу — всё под контролем.",
    "f2.title": "Гибкий конструктор",
    "f2.body": "Силовые, HIIT, круговые. Упражнения, подходы, повторения, отдых и подсказки по технике — всё в одном месте.",
    "f3.title": "AI-анализ",
    "f3.body": "После каждой тренировки Fitence даёт 2–3 конкретные рекомендации: нагрузка, техника, восстановление.",
    "f4.title": "Сначала офлайн",
    "f4.body": "Тренируйся где угодно — без Wi-Fi и мобильной сети. Данные синхронизируются автоматически.",
    "f5.title": "Без аккаунта",
    "f5.body": "Начни сразу. Экспортируй тренировки в файл, восстанови на любом устройстве в любое время.",
    "f6.title": "Создан для зала",
    "f6.body": "Контрастная типографика, крупные элементы. Каждая цифра читается в середине подхода.",
    "screens.eyebrow": "Посмотри в деле",
    "screens.title": "Чисто. Быстро. В фокусе.",
    "screens.caption": "Листай чтобы увидеть больше",
    "ai.badge": "AI-анализ",
    "ai.title": "Твой персональный<br>тренер по<br><em style=\"color:var(--acc2)\">результатам</em>",
    "ai.sub": "После каждой сессии Fitence даёт 2–3 конкретные, применимые рекомендации — не общие советы.",
    "ai.card.title": "AI-анализ Fitence",
    "ai.card.sub": "Тренировка завершена · 3 рекомендации",
    "ai.rec1": "Жим лёжа: соотношение отдыха и подхода оптимальное. Попробуй увеличить вес на 2,5 кг на следующей сессии.",
    "ai.rec2": "Подтягивания: хороший объём сегодня. Следи за разведением локтей при опускании — держи их ближе к телу для лучшей активации широчайших.",
    "ai.rec3": "Восстановление: 2 сессии подряд на эту группу мышц. День отдыха перед следующей тренировкой груди улучшит адаптацию.",
    "data.eyebrow": "Свобода и контроль",
    "data.title": "Твои данные.<br>Твои правила.",
    "d1.title": "Сначала офлайн",
    "d1.body": "Тренируйся в подвальном зале, в самолёте, в горной хижине. Связь не нужна.",
    "d2.title": "Без аккаунта",
    "d2.body": "Открой приложение и тренируйся. Никакой регистрации. Одно нажатие до первой тренировки.",
    "d3.title": "Бэкап и перенос",
    "d3.body": "Экспортируй тренировки и настройки в файл. Восстанови на любом устройстве — новый телефон не проблема.",
    "d4.title": "Без слежки",
    "d4.body": "Без аккаунта данные не покидают устройство. Никакой аналитики фитнес-данных.",
    "cta.title": "Готов тренироваться<br>без <em>отвлечений?</em>",
    "cta.sub": "Бесплатно. Без аккаунта. Начни сегодня.",
    "footer.home": "Главная",
    "footer.privacy": "Политика конфиденциальности",
    "footer.terms": "Условия использования",
    "footer.support": "Поддержка",
    "footer.tagline": "Создано для фокуса.",
    "nav.features": "Возможности",
    "nav.screens": "Скриншоты",
    "nav.faq": "FAQ",
    "faq.eyebrow": "Вопросы",
    "faq.title": "Частые вопросы",
    "alt.prepare": "Экран подготовки к подходу в Fitence с обратным отсчётом",
    "alt.work": "Экран активной тренировки Fitence: текущее упражнение и таймер",
    "alt.rest": "Таймер отдыха между подходами в Fitence",
    "alt.dashboard": "Главный экран Fitence с тренировкой на сегодня и активностью",
    "alt.workouts": "Список тренировок в Fitence",
    "alt.detail": "Детали тренировки: упражнения, подходы и повторения",
    "alt.library": "Библиотека готовых программ тренировок в Fitence",
    "alt.profile": "Профиль и статистика тренировок в Fitence",
    "og.imageAlt": "Fitence — офлайн-трекер тренировок для зала и HIIT на iOS и Android",
    "tw.imageAlt": "Трекер тренировок Fitence"
  },
  "fr": {
    "hero.label": "Application d'entraînement pour iOS et Android",
    "hero.title": "Entraînez-vous sans<br><em>penser</em> à<br>l'application",
    "hero.sub": "Planifiez vos séances, entraînez-vous en mode automatique, obtenez un retour IA. Sans internet.",
    "btn.appstore.sub": "Télécharger sur",
    "btn.gplay.sub": "Disponible sur",
    "stat.offline": "Fonctionne hors ligne",
    "stat.account": "Comptes",
    "stat.platforms": "Plateformes",
    "stat.ai": "Analyse post-séance",
    "feat.eyebrow": "Ce qui distingue Fitence",
    "feat.title": "Tout le nécessaire.<br>Rien de superflu.",
    "feat.sub": "Conçu pour la salle — pas pour une démo en salle de réunion.",
    "f1.title": "Mode automatique",
    "f1.body": "Les minuteries décomptent, les signaux audio se déclenchent au bon moment, l'écran reste lisible à 2 m. Téléphone au sol — vous gardez le contrôle.",
    "f2.title": "Constructeur flexible",
    "f2.body": "Force, HIIT, circuits. Exercices, séries, répétitions, minuteries de repos et notes de technique — tout en un.",
    "f3.title": "Analyse IA",
    "f3.body": "Après chaque séance, Fitence donne 2–3 recommandations concrètes : charge, technique, récupération.",
    "f4.title": "Hors ligne en priorité",
    "f4.body": "Entraînez-vous partout — sans Wi-Fi, sans réseau. Les données se synchronisent automatiquement à la reconnexion.",
    "f5.title": "Sans compte",
    "f5.body": "Commencez immédiatement. Exportez les séances dans un fichier, restaurez sur n'importe quel appareil.",
    "f6.title": "Fait pour la salle",
    "f6.body": "Typographie à fort contraste, grandes zones tactiles. Chaque chiffre lisible en plein effort.",
    "screens.eyebrow": "Voir en action",
    "screens.title": "Clair. Rapide. Focalisé.",
    "screens.caption": "Faites défiler pour voir plus",
    "ai.badge": "Propulsé par l'IA",
    "ai.title": "Votre coach<br>personnel de<br><em style=\"color:var(--acc2)\">performance</em>",
    "ai.sub": "Après chaque séance, Fitence fournit 2–3 recommandations spécifiques et actionnables — pas de conseils génériques.",
    "ai.card.title": "Analyse IA Fitence",
    "ai.card.sub": "Séance terminée · 3 recommandations",
    "ai.rec1": "Développé couché : rapport repos/série optimal. Envisagez d'augmenter la charge de 2,5 kg à la prochaine séance.",
    "ai.rec2": "Tractions : bon volume aujourd'hui. Surveillez l'écartement des coudes à la descente — les garder proches améliore l'activation des dorsaux.",
    "ai.rec3": "Récupération : 2 séances consécutives sur ce groupe musculaire. Un jour de repos améliorera l'adaptation.",
    "data.eyebrow": "Liberté et contrôle",
    "data.title": "Vos données.<br>Vos règles.",
    "d1.title": "Hors ligne en priorité",
    "d1.body": "Entraînez-vous dans un sous-sol, en avion, dans un chalet en montagne. Aucune connexion requise.",
    "d2.title": "Sans compte",
    "d2.body": "Ouvrez l'appli et entraînez-vous. Pas d'inscription, pas d'e-mail. Un tap jusqu'à votre première séance.",
    "d3.title": "Sauvegarde et transfert",
    "d3.body": "Exportez toutes les séances et paramètres dans un fichier. Restaurez sur n'importe quel appareil.",
    "d4.title": "Sans tracking",
    "d4.body": "Sans compte, vos données ne quittent jamais l'appareil. Aucune analyse de vos données fitness.",
    "cta.title": "Prêt à vous entraîner<br>sans <em>distractions ?</em>",
    "cta.sub": "Gratuit. Sans compte. Commencez aujourd'hui.",
    "footer.home": "Accueil",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.support": "Support",
    "footer.tagline": "Conçu pour la concentration.",
    "nav.features": "Fonctions",
    "nav.screens": "Captures",
    "nav.faq": "FAQ",
    "faq.eyebrow": "Questions",
    "faq.title": "Questions fréquentes",
    "alt.prepare": "Écran de préparation de série dans Fitence avec compte à rebours",
    "alt.work": "Écran d'entraînement actif Fitence : exercice en cours et minuteur",
    "alt.rest": "Minuteur de récupération entre les séries dans Fitence",
    "alt.dashboard": "Tableau de bord Fitence avec la séance du jour et l'activité",
    "alt.workouts": "Liste des séances d'entraînement dans Fitence",
    "alt.detail": "Détail d'une séance : exercices, séries et répétitions",
    "alt.library": "Bibliothèque de programmes d'entraînement prêts à l'emploi",
    "alt.profile": "Profil et statistiques d'entraînement dans Fitence",
    "og.imageAlt": "Fitence — suivi d'entraînement gym et HIIT hors ligne pour iOS et Android",
    "tw.imageAlt": "Tracker d'entraînement Fitence"
  },
  "de": {
    "hero.label": "Trainings-App für iOS und Android",
    "hero.title": "Trainiere, ohne<br>an die App zu<br><em>denken</em>",
    "hero.sub": "Trainings planen, auf Autopilot trainieren, KI-Feedback erhalten. Kein Internet nötig.",
    "btn.appstore.sub": "Laden im",
    "btn.gplay.sub": "Jetzt bei",
    "stat.offline": "Offline nutzbar",
    "stat.account": "Konten",
    "stat.platforms": "Plattformen",
    "stat.ai": "KI-Analyse nach dem Training",
    "feat.eyebrow": "Was Fitence anders macht",
    "feat.title": "Alles Nötige.<br>Nichts Überflüssiges.",
    "feat.sub": "Für das Fitnessstudio entwickelt — nicht für eine Boardroom-Demo.",
    "f1.title": "Autopilot-Modus",
    "f1.body": "Timer laufen rückwärts, Audiosignale ertönen im richtigen Moment, der Bildschirm bleibt aus 2 m Entfernung lesbar. Handy auf dem Boden — du behältst die Kontrolle.",
    "f2.title": "Flexibler Baukasten",
    "f2.body": "Kraft, HIIT, Circuits. Übungen, Sätze, Wiederholungen, Pausentimer und Technikhinweise — alles an einem Ort.",
    "f3.title": "KI-Analyse",
    "f3.body": "Nach jeder Einheit gibt Fitence 2–3 konkrete Empfehlungen: Belastung, Technik, Erholung.",
    "f4.title": "Offline-First",
    "f4.body": "Trainiere überall — kein WLAN, kein Mobilnetz. Daten synchronisieren sich automatisch bei Verbindung.",
    "f5.title": "Kein Konto nötig",
    "f5.body": "Sofort loslegen. Trainings in eine Datei exportieren, auf jedem Gerät wiederherstellen.",
    "f6.title": "Fürs Fitnessstudio gebaut",
    "f6.body": "Kontrastreiche Typografie, große Tippziele. Jede Zahl mitten im Satz lesbar.",
    "screens.eyebrow": "In Aktion sehen",
    "screens.title": "Klar. Schnell. Fokussiert.",
    "screens.caption": "Wischen für mehr",
    "ai.badge": "KI-gestützt",
    "ai.title": "Dein persönlicher<br>Performance-<br><em style=\"color:var(--acc2)\">Coach</em>",
    "ai.sub": "Nach jeder Einheit liefert Fitence 2–3 spezifische, umsetzbare Empfehlungen — keine Allgemeinplätze.",
    "ai.card.title": "Fitence KI-Analyse",
    "ai.card.sub": "Training abgeschlossen · 3 Empfehlungen",
    "ai.rec1": "Bankdrücken: Ruhe-zu-Satz-Verhältnis ist optimal. Erwäge nächste Einheit das Gewicht um 2,5 kg zu erhöhen.",
    "ai.rec2": "Klimmzüge: starkes Volumen heute. Achte auf Ellbogenauswärtsbewegung beim Absenken — enger halten verbessert die Latissimusaktivierung.",
    "ai.rec3": "Erholung: 2 Einheiten in Folge auf diese Muskelgruppe. Ein Ruhetag verbessert die Anpassung.",
    "data.eyebrow": "Freiheit & Kontrolle",
    "data.title": "Deine Daten.<br>Deine Regeln.",
    "d1.title": "Offline-First",
    "d1.body": "Trainiere im Kellerstudio, im Flugzeug, in einer Berghütte. Keine Verbindung erforderlich.",
    "d2.title": "Kein Konto nötig",
    "d2.body": "App öffnen und trainieren. Keine Registrierung, keine E-Mail. Ein Tap bis zum ersten Training.",
    "d3.title": "Backup & Transfer",
    "d3.body": "Alle Trainings und Einstellungen in eine Datei exportieren. Auf jedem Gerät wiederherstellen.",
    "d4.title": "Kein Tracking",
    "d4.body": "Ohne Konto verlassen deine Daten das Gerät nie. Keine Analyse deiner Fitnessdaten.",
    "cta.title": "Bereit, ohne<br><em>Ablenkung</em> zu trainieren?",
    "cta.sub": "Kostenlos. Kein Konto. Starte heute.",
    "footer.home": "Startseite",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Nutzungsbedingungen",
    "footer.support": "Support",
    "footer.tagline": "Für den Fokus gebaut.",
    "nav.features": "Funktionen",
    "nav.screens": "Screenshots",
    "nav.faq": "FAQ",
    "faq.eyebrow": "Fragen",
    "faq.title": "Häufige Fragen",
    "alt.prepare": "Satz-Vorbereitungsbildschirm in Fitence mit Countdown",
    "alt.work": "Aktives Training in Fitence: aktuelle Übung und Timer",
    "alt.rest": "Pausen-Timer zwischen den Sätzen in Fitence",
    "alt.dashboard": "Fitence Dashboard mit dem heutigen Training und der Aktivität",
    "alt.workouts": "Trainingsliste in Fitence",
    "alt.detail": "Trainingsdetails mit Übungen, Sätzen und Wiederholungen",
    "alt.library": "Trainingsbibliothek mit fertigen Programmen in Fitence",
    "alt.profile": "Profil und Trainingsstatistiken in Fitence",
    "og.imageAlt": "Fitence — Offline-Tracker für Gym- und HIIT-Training auf iOS und Android",
    "tw.imageAlt": "Fitence Trainings-Tracker"
  },
  "es": {
    "hero.label": "App de entrenamiento para iOS y Android",
    "hero.title": "Entrena sin<br><em>pensar</em> en<br>la app",
    "hero.sub": "Planifica entrenamientos, entrena en piloto automático, recibe feedback de IA. Sin internet.",
    "btn.appstore.sub": "Descargar en",
    "btn.gplay.sub": "Disponible en",
    "stat.offline": "Funciona sin conexión",
    "stat.account": "Cuentas",
    "stat.platforms": "Plataformas",
    "stat.ai": "Análisis post-entrenamiento",
    "feat.eyebrow": "Qué hace diferente a Fitence",
    "feat.title": "Todo lo que necesitas.<br>Nada más.",
    "feat.sub": "Diseñado para el gimnasio — no para una demo en sala de reuniones.",
    "f1.title": "Modo piloto automático",
    "f1.body": "Los temporizadores cuentan atrás, las señales de audio suenan en el momento justo, la pantalla se lee a 2 m. Teléfono en el suelo — sigues en control.",
    "f2.title": "Constructor flexible",
    "f2.body": "Fuerza, HIIT, circuitos. Ejercicios, series, repeticiones, temporizadores de descanso y notas de técnica — todo en un lugar.",
    "f3.title": "Análisis IA",
    "f3.body": "Después de cada sesión Fitence da 2–3 recomendaciones concretas: carga, técnica, recuperación.",
    "f4.title": "Sin conexión primero",
    "f4.body": "Entrena donde sea — sin Wi-Fi, sin datos. Los datos se sincronizan automáticamente al reconectarte.",
    "f5.title": "Sin cuenta",
    "f5.body": "Empieza de inmediato. Exporta entrenamientos a un archivo, restáuralos en cualquier dispositivo.",
    "f6.title": "Hecho para el gimnasio",
    "f6.body": "Tipografía de alto contraste, objetivos táctiles grandes. Cada número legible a mitad de serie.",
    "screens.eyebrow": "Véalo en acción",
    "screens.title": "Limpio. Rápido. Enfocado.",
    "screens.caption": "Desliza para ver más",
    "ai.badge": "Impulsado por IA",
    "ai.title": "Tu entrenador<br>personal de<br><em style=\"color:var(--acc2)\">rendimiento</em>",
    "ai.sub": "Después de cada sesión, Fitence entrega 2–3 recomendaciones específicas y accionables — no consejos genéricos.",
    "ai.card.title": "Análisis IA de Fitence",
    "ai.card.sub": "Sesión completada · 3 recomendaciones",
    "ai.rec1": "Press de banca: relación descanso-serie óptima. Considera aumentar la carga 2,5 kg en la próxima sesión.",
    "ai.rec2": "Dominadas: buen volumen hoy. Vigila la apertura de codos al bajar — mantenerlos cerca mejora la activación del dorsal.",
    "ai.rec3": "Recuperación: 2 sesiones seguidas en este grupo muscular. Un día de descanso mejorará la adaptación.",
    "data.eyebrow": "Libertad y control",
    "data.title": "Tus datos.<br>Tus reglas.",
    "d1.title": "Sin conexión primero",
    "d1.body": "Entrena en un sótano, en un avión, en una cabaña de montaña. Sin conexión requerida.",
    "d2.title": "Sin cuenta",
    "d2.body": "Abre la app y entrena. Sin registro, sin correo. Un toque hasta tu primer entrenamiento.",
    "d3.title": "Copia de seguridad y transferencia",
    "d3.body": "Exporta todos los entrenamientos y ajustes a un archivo. Restáura en cualquier dispositivo.",
    "d4.title": "Sin rastreo",
    "d4.body": "Sin cuenta, tus datos nunca salen del dispositivo. Sin análisis de tus datos de fitness.",
    "cta.title": "¿Listo para entrenar<br>sin <em>distracciones?</em>",
    "cta.sub": "Gratis. Sin cuenta. Empieza hoy.",
    "footer.home": "Inicio",
    "footer.privacy": "Política de privacidad",
    "footer.terms": "Términos de servicio",
    "footer.support": "Soporte",
    "footer.tagline": "Construido para el enfoque.",
    "nav.features": "Funciones",
    "nav.screens": "Capturas",
    "nav.faq": "FAQ",
    "faq.eyebrow": "Preguntas",
    "faq.title": "Preguntas frecuentes",
    "alt.prepare": "Pantalla de preparación de serie en Fitence con cuenta atrás",
    "alt.work": "Pantalla de entrenamiento activo en Fitence: ejercicio actual y temporizador",
    "alt.rest": "Temporizador de descanso entre series en Fitence",
    "alt.dashboard": "Panel de Fitence con el entrenamiento de hoy y la actividad",
    "alt.workouts": "Lista de entrenamientos en Fitence",
    "alt.detail": "Detalle del entrenamiento con ejercicios, series y repeticiones",
    "alt.library": "Biblioteca de programas de entrenamiento listos en Fitence",
    "alt.profile": "Perfil y estadísticas de entrenamiento en Fitence",
    "og.imageAlt": "Fitence — registro de entrenos de gimnasio y HIIT sin conexión para iOS y Android",
    "tw.imageAlt": "Tracker de entrenamientos Fitence"
  },
  "it": {
    "hero.label": "App di allenamento per iOS e Android",
    "hero.title": "Allenati senza<br><em>pensare</em> all'app",
    "hero.sub": "Pianifica gli allenamenti, allenati in automatico, ricevi feedback dall'IA. Senza internet.",
    "btn.appstore.sub": "Scarica su",
    "btn.gplay.sub": "Disponibile su",
    "stat.offline": "Funziona offline",
    "stat.account": "Account",
    "stat.platforms": "Piattaforme",
    "stat.ai": "Analisi post-allenamento",
    "feat.eyebrow": "Cosa rende Fitence diverso",
    "feat.title": "Tutto il necessario.<br>Niente di superfluo.",
    "feat.sub": "Progettato per la palestra — non per una demo in sala riunioni.",
    "f1.title": "Modalità automatica",
    "f1.body": "I timer contano alla rovescia, i segnali audio scattano al momento giusto, lo schermo resta leggibile a 2 m. Telefono a terra — sei sempre in controllo.",
    "f2.title": "Builder flessibile",
    "f2.body": "Forza, HIIT, circuiti. Esercizi, serie, ripetizioni, timer di recupero e note sulla tecnica — tutto in un posto.",
    "f3.title": "Analisi IA",
    "f3.body": "Dopo ogni sessione Fitence dà 2–3 raccomandazioni concrete: carico, tecnica, recupero.",
    "f4.title": "Offline prima di tutto",
    "f4.body": "Allenati ovunque — senza Wi-Fi, senza rete. I dati si sincronizzano automaticamente alla riconnessione.",
    "f5.title": "Senza account",
    "f5.body": "Inizia subito. Esporta gli allenamenti in un file, ripristina su qualsiasi dispositivo.",
    "f6.title": "Fatto per la palestra",
    "f6.body": "Tipografia ad alto contrasto, grandi aree di tocco. Ogni numero leggibile a metà serie.",
    "screens.eyebrow": "Guarda in azione",
    "screens.title": "Pulito. Veloce. Focalizzato.",
    "screens.caption": "Scorri per vedere di più",
    "ai.badge": "Basato sull'IA",
    "ai.title": "Il tuo coach<br>personale di<br><em style=\"color:var(--acc2)\">performance</em>",
    "ai.sub": "Dopo ogni sessione, Fitence fornisce 2–3 raccomandazioni specifiche e praticabili — non consigli generici.",
    "ai.card.title": "Analisi IA Fitence",
    "ai.card.sub": "Sessione completata · 3 raccomandazioni",
    "ai.rec1": "Panca piana: rapporto riposo-serie ottimale. Considera di aumentare il carico di 2,5 kg alla prossima sessione.",
    "ai.rec2": "Trazioni: ottimo volume oggi. Attenzione all'apertura dei gomiti in discesa — tenerli vicini migliora l'attivazione del dorsale.",
    "ai.rec3": "Recupero: 2 sessioni consecutive su questo gruppo muscolare. Un giorno di riposo migliorerà l'adattamento.",
    "data.eyebrow": "Libertà e controllo",
    "data.title": "I tuoi dati.<br>Le tue regole.",
    "d1.title": "Offline prima di tutto",
    "d1.body": "Allenati in una palestra sotterranea, in aereo, in un rifugio di montagna. Nessuna connessione richiesta.",
    "d2.title": "Senza account",
    "d2.body": "Apri l'app e allenati. Nessuna registrazione, nessuna e-mail. Un tap al primo allenamento.",
    "d3.title": "Backup e trasferimento",
    "d3.body": "Esporta tutti gli allenamenti e le impostazioni in un file. Ripristina su qualsiasi dispositivo.",
    "d4.title": "Nessun tracciamento",
    "d4.body": "Senza account, i tuoi dati non lasciano mai il dispositivo. Nessuna analisi dei tuoi dati fitness.",
    "cta.title": "Pronto ad allenarti<br>senza <em>distrazioni?</em>",
    "cta.sub": "Gratis. Senza account. Inizia oggi.",
    "footer.home": "Home",
    "footer.privacy": "Informativa sulla privacy",
    "footer.terms": "Termini di servizio",
    "footer.support": "Supporto",
    "footer.tagline": "Costruito per la concentrazione.",
    "nav.features": "Funzioni",
    "nav.screens": "Screenshot",
    "nav.faq": "FAQ",
    "faq.eyebrow": "Domande",
    "faq.title": "Domande frequenti",
    "alt.prepare": "Schermata di preparazione della serie in Fitence con conto alla rovescia",
    "alt.work": "Schermata di allenamento attivo in Fitence: esercizio corrente e timer",
    "alt.rest": "Timer di recupero tra le serie in Fitence",
    "alt.dashboard": "Dashboard di Fitence con l'allenamento di oggi e l'attività",
    "alt.workouts": "Elenco degli allenamenti in Fitence",
    "alt.detail": "Dettaglio dell'allenamento con esercizi, serie e ripetizioni",
    "alt.library": "Libreria di programmi di allenamento pronti in Fitence",
    "alt.profile": "Profilo e statistiche di allenamento in Fitence",
    "og.imageAlt": "Fitence — tracker offline per allenamenti in palestra e HIIT su iOS e Android",
    "tw.imageAlt": "Tracker allenamenti Fitence"
  },
  "ua": {
    "hero.label": "Застосунок для тренувань iOS і Android",
    "hero.title": "Тренуйся, не<br>думаючи про <em>застосунок</em>",
    "hero.sub": "Плануй тренування, працюй на автопілоті, отримуй AI-аналіз. Без інтернету.",
    "btn.appstore.sub": "Завантажити в",
    "btn.gplay.sub": "Доступно в",
    "stat.offline": "Працює офлайн",
    "stat.account": "Акаунтів",
    "stat.platforms": "Платформи",
    "stat.ai": "AI-аналіз тренувань",
    "feat.eyebrow": "Чим Fitence відрізняється",
    "feat.title": "Все потрібне.<br>Нічого зайвого.",
    "feat.sub": "Створено для залу — не для презентації інвесторам.",
    "f1.title": "Режим автопілота",
    "f1.body": "Таймери відраховують час, звукові сигнали спрацьовують вчасно, екран читається з двох метрів. Телефон на підлозі — все під контролем.",
    "f2.title": "Гнучкий конструктор",
    "f2.body": "Силові, HIIT, колові. Вправи, підходи, повторення, відпочинок і підказки з техніки — все в одному місці.",
    "f3.title": "AI-аналіз",
    "f3.body": "Після кожного тренування Fitence дає 2–3 конкретні рекомендації: навантаження, техніка, відновлення.",
    "f4.title": "Спочатку офлайн",
    "f4.body": "Тренуйся будь-де — без Wi-Fi і мобільної мережі. Дані синхронізуються автоматично.",
    "f5.title": "Без облікового запису",
    "f5.body": "Починай одразу. Експортуй тренування у файл, відновлюй на будь-якому пристрої.",
    "f6.title": "Створено для залу",
    "f6.body": "Контрастна типографіка, великі елементи. Кожна цифра читається в середині підходу.",
    "screens.eyebrow": "Подивись у дії",
    "screens.title": "Чисто. Швидко. У фокусі.",
    "screens.caption": "Гортай щоб побачити більше",
    "ai.badge": "AI-аналіз",
    "ai.title": "Твій персональний<br>тренер за<br><em style=\"color:var(--acc2)\">результатами</em>",
    "ai.sub": "Після кожної сесії Fitence дає 2–3 конкретні, застосовні рекомендації — не загальні поради.",
    "ai.card.title": "AI-аналіз Fitence",
    "ai.card.sub": "Тренування завершено · 3 рекомендації",
    "ai.rec1": "Жим лежачи: співвідношення відпочинку і підходу оптимальне. Спробуй збільшити вагу на 2,5 кг.",
    "ai.rec2": "Підтягування: хороший об'єм сьогодні. Стеж за розведенням ліктів при опусканні.",
    "ai.rec3": "Відновлення: 2 сесії поспіль на цю групу м'язів. День відпочинку покращить адаптацію.",
    "data.eyebrow": "Свобода і контроль",
    "data.title": "Твої дані.<br>Твої правила.",
    "d1.title": "Спочатку офлайн",
    "d1.body": "Тренуйся в підвальному залі, в літаку, в гірській хижині. Зв'язок не потрібен.",
    "d2.title": "Без облікового запису",
    "d2.body": "Відкрий застосунок і тренуйся. Жодної реєстрації. Одне натискання до першого тренування.",
    "d3.title": "Бекап і перенесення",
    "d3.body": "Експортуй тренування і налаштування у файл. Відновлюй на будь-якому пристрої.",
    "d4.title": "Без стеження",
    "d4.body": "Без облікового запису дані не покидають пристрій. Жодної аналітики фітнес-даних.",
    "cta.title": "Готовий тренуватися<br>без <em>відволікань?</em>",
    "cta.sub": "Безкоштовно. Без облікового запису. Починай сьогодні.",
    "footer.home": "Головна",
    "footer.privacy": "Політика конфіденційності",
    "footer.terms": "Умови використання",
    "footer.support": "Підтримка",
    "footer.tagline": "Створено для фокусу.",
    "nav.features": "Можливості",
    "nav.screens": "Скриншоти",
    "nav.faq": "FAQ",
    "faq.eyebrow": "Питання",
    "faq.title": "Часті запитання",
    "alt.prepare": "Екран підготовки до підходу у Fitence зі зворотним відліком",
    "alt.work": "Екран активного тренування Fitence: поточна вправа й таймер",
    "alt.rest": "Таймер відпочинку між підходами у Fitence",
    "alt.dashboard": "Головний екран Fitence із тренуванням на сьогодні та активністю",
    "alt.workouts": "Список тренувань у Fitence",
    "alt.detail": "Деталі тренування: вправи, підходи та повторення",
    "alt.library": "Бібліотека готових програм тренувань у Fitence",
    "alt.profile": "Профіль і статистика тренувань у Fitence",
    "og.imageAlt": "Fitence — офлайн-трекер тренувань для залу та HIIT на iOS і Android",
    "tw.imageAlt": "Трекер тренувань Fitence"
  }
};

export const faq = {
  "en": [
    [
      "Is Fitence free?",
      "Yes. Fitence is free to download — plan workouts, train on autopilot and get AI feedback with no paywall."
    ],
    [
      "Do I need an account?",
      "No. There is no sign-up and no email required. You can export your workouts and settings to a file and restore them on any device."
    ],
    [
      "Does it really work offline?",
      "Yes. Every core feature works with no internet connection. Your data stays on the device and syncs automatically once you are back online."
    ],
    [
      "Which platforms is Fitence on?",
      "Fitence is available on Android via Google Play and on iOS via the App Store."
    ],
    [
      "What does the AI analysis do?",
      "After each session Fitence reviews your performance and gives 2–3 concrete recommendations on load, technique and recovery — specific to your workout, not generic tips."
    ]
  ],
  "ru": [
    [
      "Fitence бесплатный?",
      "Да. Fitence бесплатен для скачивания — планируйте тренировки, работайте на автопилоте и получайте AI-разбор без платных стен."
    ],
    [
      "Нужен ли аккаунт?",
      "Нет. Никакой регистрации и email. Тренировки и настройки можно экспортировать в файл и восстановить на любом устройстве."
    ],
    [
      "Действительно работает офлайн?",
      "Да. Все основные функции работают без интернета. Данные хранятся на устройстве и синхронизируются автоматически, когда появится связь."
    ],
    [
      "На каких платформах доступен Fitence?",
      "Fitence доступен на Android в Google Play и на iOS в App Store."
    ],
    [
      "Что делает AI-анализ?",
      "После каждой тренировки Fitence разбирает результаты и даёт 2–3 конкретные рекомендации по нагрузке, технике и восстановлению — под вашу тренировку, а не общие советы."
    ]
  ],
  "ua": [
    [
      "Fitence безкоштовний?",
      "Так. Fitence безкоштовний для завантаження — плануйте тренування, працюйте на автопілоті й отримуйте AI-аналіз без платних обмежень."
    ],
    [
      "Чи потрібен обліковий запис?",
      "Ні. Жодної реєстрації та email. Тренування й налаштування можна експортувати у файл і відновити на будь-якому пристрої."
    ],
    [
      "Справді працює офлайн?",
      "Так. Усі основні функції працюють без інтернету. Дані зберігаються на пристрої та синхронізуються автоматично, коли зʼявиться звʼязок."
    ],
    [
      "На яких платформах доступний Fitence?",
      "Fitence доступний на Android у Google Play та на iOS в App Store."
    ],
    [
      "Що робить AI-аналіз?",
      "Після кожного тренування Fitence аналізує результати й дає 2–3 конкретні рекомендації щодо навантаження, техніки та відновлення — саме під ваше тренування."
    ]
  ],
  "fr": [
    [
      "Fitence est-il gratuit ?",
      "Oui. Fitence est gratuit à télécharger — planifiez vos séances, entraînez-vous en mode automatique et obtenez un retour IA, sans paywall."
    ],
    [
      "Faut-il un compte ?",
      "Non. Aucune inscription ni e-mail. Vous pouvez exporter vos séances et réglages dans un fichier et les restaurer sur n'importe quel appareil."
    ],
    [
      "Fonctionne-t-il vraiment hors ligne ?",
      "Oui. Toutes les fonctions essentielles marchent sans connexion. Vos données restent sur l'appareil et se synchronisent dès le retour en ligne."
    ],
    [
      "Sur quelles plateformes est Fitence ?",
      "Fitence est disponible sur Android via Google Play et sur iOS via l'App Store."
    ],
    [
      "Que fait l'analyse IA ?",
      "Après chaque séance, Fitence analyse vos performances et donne 2–3 recommandations concrètes sur la charge, la technique et la récupération — adaptées à votre séance."
    ]
  ],
  "de": [
    [
      "Ist Fitence kostenlos?",
      "Ja. Fitence ist kostenlos — Trainings planen, auf Autopilot trainieren und KI-Feedback erhalten, ganz ohne Paywall."
    ],
    [
      "Brauche ich ein Konto?",
      "Nein. Keine Registrierung, keine E-Mail. Du kannst Trainings und Einstellungen in eine Datei exportieren und auf jedem Gerät wiederherstellen."
    ],
    [
      "Funktioniert es wirklich offline?",
      "Ja. Alle Kernfunktionen laufen ohne Internet. Deine Daten bleiben auf dem Gerät und synchronisieren sich automatisch, sobald du wieder online bist."
    ],
    [
      "Auf welchen Plattformen gibt es Fitence?",
      "Fitence ist auf Android über Google Play und auf iOS im App Store verfügbar."
    ],
    [
      "Was macht die KI-Analyse?",
      "Nach jeder Einheit wertet Fitence deine Leistung aus und gibt 2–3 konkrete Empfehlungen zu Belastung, Technik und Erholung – passend zu deinem Training."
    ]
  ],
  "es": [
    [
      "¿Fitence es gratis?",
      "Sí. Fitence es gratis para descargar — planifica entrenamientos, entrena en piloto automático y recibe feedback de IA, sin muros de pago."
    ],
    [
      "¿Necesito una cuenta?",
      "No. Sin registro ni correo. Puedes exportar tus entrenamientos y ajustes a un archivo y restaurarlos en cualquier dispositivo."
    ],
    [
      "¿Funciona de verdad sin conexión?",
      "Sí. Todas las funciones esenciales funcionan sin internet. Tus datos se quedan en el dispositivo y se sincronizan al volver a estar en línea."
    ],
    [
      "¿En qué plataformas está Fitence?",
      "Fitence está disponible en Android a través de Google Play y en iOS a través de la App Store."
    ],
    [
      "¿Qué hace el análisis con IA?",
      "Tras cada sesión, Fitence revisa tu rendimiento y da 2–3 recomendaciones concretas sobre carga, técnica y recuperación — específicas para tu entrenamiento."
    ]
  ],
  "it": [
    [
      "Fitence è gratis?",
      "Sì. Fitence è gratis da scaricare — pianifica gli allenamenti, allenati in automatico e ricevi feedback IA, senza paywall."
    ],
    [
      "Serve un account?",
      "No. Nessuna registrazione né email. Puoi esportare allenamenti e impostazioni in un file e ripristinarli su qualsiasi dispositivo."
    ],
    [
      "Funziona davvero offline?",
      "Sì. Tutte le funzioni principali funzionano senza internet. I tuoi dati restano sul dispositivo e si sincronizzano appena torni online."
    ],
    [
      "Su quali piattaforme è Fitence?",
      "Fitence è disponibile su Android tramite Google Play e su iOS tramite l'App Store."
    ],
    [
      "Cosa fa l'analisi IA?",
      "Dopo ogni sessione Fitence analizza la tua performance e dà 2–3 raccomandazioni concrete su carico, tecnica e recupero — specifiche per il tuo allenamento."
    ]
  ]
};
