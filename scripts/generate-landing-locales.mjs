import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SOURCE_PATH = path.join(ROOT, "src/locales/en/landing.json")
const LOCALES_ROOT = path.join(ROOT, "src/locales")

const LOCALE_OVERRIDES = {
  de: {
    meta: {
      title: "Dexora — Täglicher Pokémon GO Assistent & Sammlungs-Tracker",
      description:
        "Dexora ist dein täglicher Pokémon GO Begleiter — Home-Dashboard, Living-Dex-Tracking, Raid- und PvP-Intelligenz, Trainer Vision und 13 Sprachen. Kostenlos auf Google Play.",
    },
    nav: {
      legalLabel: "Rechtliches und Support",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      deleteAccount: "Konto löschen",
      contact: "Kontakt",
      feedback: "Feedback",
      home: "Start",
      tools: "Tools",
      daily: "Daily",
      community: "Community",
      explore: "Entdecken",
      download: "Download",
      legal: "Rechtliches",
    },
    language: {
      title: "Sprache",
      choose: "Sprache wählen",
      searchPlaceholder: "Sprachen suchen…",
      previewHint: "Tippe auf eine Sprache für eine Sofortvorschau",
    },
    hero: {
      eyebrow: "Pokémon GO Begleiter",
      headline1: "Dein täglicher",
      headline2: "Pokémon GO",
      headline3: "Assistent",
      copy: "Verfolge deinen Living Dex, plane Jagden und erhalte klügere Kampf-Einblicke — für Trainer, die jeden Tag spielen.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Kostenlos auf Android · iOS kommt bald",
      waitlistEyebrow: "Oder tritt der Warteliste bei",
      waitlistHint: "FRÜHER ZUGANG · KEIN SPAM",
    },
    tools: {
      eyebrow: "POWER-TOOLS",
      headline1: "Scannen, tracken,",
      headline2: "offline planen",
      copy: "Trainer Vision, Catch Queue, Offline-Pokédex und Live-Events — die Tools für jede Jagd.",
    },
    daily: {
      eyebrow: "DEIN HOME-SCREEN",
      headline1: "Guten Morgen,",
      headlineHighlight: "Trainer",
      copy: "Täglicher Assistent, Sammlungs-Tracking und Kampfintelligenz — ein ruhiges Dashboard bei jedem Öffnen.",
    },
    community: {
      eyebrow: "TRAINER WELTWEIT",
      headline: "Gemeinsam spielen, in deiner Sprache",
      copy: "Freundescodes, Gruppenchat und volle Lokalisierung in 13 Sprachen.",
    },
    showcase: {
      eyebrow: "DEXORA ENTDECKEN",
      headline1: "Entwickelt für Trainer",
      headline2: "die",
      headlineHighlight: "jeden Tag spielen",
      copy: "Ein Home-Dashboard. Prioritäten, Sammlungsfortschritt, Kampfintelligenz, Events und Community — alles, was du brauchst, bevor du das Haus verlässt.",
      coreDailyTitle: "Täglicher Assistent",
      coreDailyText:
        "Prioritäten, heutige Jagd, tägliche Missionen und ein eventbewusstes Hero-Panel — jedes Mal, wenn du Dexora öffnest.",
      coreCollectionTitle: "Sammlungs-Tracking",
      coreCollectionText:
        "Living Dex, Shinys, Megas, Hundos und Meilenstein-Ringe — sicher in die Cloud mit Google-Anmeldung synchronisiert.",
      coreBattleTitle: "Kampfintelligenz",
      coreBattleText:
        "Raid-Bewertungen, PvP-Ränge, Rocket-Konter und KI-Empfehlungen pro Pokémon.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "Scanne Screenshots, um Pokémon, IVs und Fangchancen sofort mit OCR auf dem Gerät zu erkennen.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "Wöchentliche Raid-Ziele werden automatisch synchronisiert. Verfolge ausstehende und gefangene Pokémon.",
      highlightPokedexTitle: "Offline Pokédex",
      highlightPokedexText:
        "{{speciesCount}} Arten mit GO-Stats, Attacken und Artwork auf dem Gerät zwischengespeichert.",
      highlightEventsTitle: "Event-Tracker",
      highlightEventsText:
        "Community Day, GO Fest und Live-Events mit Move-Pools, Boni und Countdown-Erinnerungen.",
      highlightCommunityTitle: "Trainer-Community",
      highlightCommunityText:
        "Freundescodes, Gruppenchat, Raid-Koordination und Moderationstools — verbinde dich mit Trainern weltweit.",
      highlightLanguagesTitle: "13 Sprachen",
      highlightLanguagesText:
        "Vollständige App-Lokalisierung — English, Deutsch, Français, Español und 9 weitere, darunter Arabisch und Hebräisch.",
      ctaNote:
        "Vertraut von Trainern, die {{speciesCount}}+ Arten offline synchronisieren",
    },
    download: {
      exploreLabel: "ENTDECKEN",
      headlinePrefix: "Hol dir",
      headlineBrand: "Dexora",
      copy: "Nimm deinen täglichen Begleiter auf jede Jagd mit. Kostenlos auf Android — iOS folgt bald.",
    },
    waitlist: {
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "trainer@email.com",
      join: "Zur Warteliste",
      joining: "Wird beigetreten...",
      joinButton: "Zur Warteliste",
      invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
      notConfigured:
        "Die Warteliste ist noch nicht konfiguriert. Bitte versuche es bald erneut.",
      alreadyOnList: "Du stehst bereits auf der Warteliste!",
      error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      success:
        "Du bist auf der Liste! Wir benachrichtigen dich zum Start.",
    },
    store: {
      googlePlayAria: "Hol dir Dexora auf Google Play",
      appStoreAria: "Dexora im App Store — demnächst",
      getItOn: "JETZT AUF",
      downloadOn: "Laden im",
      googlePlay: "Google Play",
      appStore: "App Store",
      comingSoonToast: "Demnächst im App Store!",
    },
    footer: {
      rights: "© {{year}} Dexora. Alle Rechte vorbehalten.",
      contact: "Kontakt",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "Gültig ab {{date}}",
      backHome: "← Zurück zur Startseite",
      emailSupport: "E-Mail an support@dexora.app",
      privacyPolicy: "Datenschutzerklärung",
    },
    legal: {
      privacy: {
        title: "Datenschutzerklärung",
        description:
          "Wie Dexora deine Informationen auf dexora.app und in der App verarbeitet.",
      },
      terms: {
        title: "Nutzungsbedingungen",
        description:
          "Regeln für die Nutzung von dexora.app und der Dexora Begleit-App.",
      },
      contact: {
        title: "Kontakt",
        description: "Nimm Kontakt mit dem Dexora-Team auf.",
      },
      feedback: {
        title: "Feedback",
        description: "Teile Ideen, melde Bugs oder schlage Verbesserungen vor.",
      },
      "delete-account": {
        title: "Konto und Daten löschen",
        description:
          "Entferne dein Dexora Cloud-Konto und zugehörige Daten dauerhaft.",
      },
    },
  },
  fr: {
    meta: {
      title: "Dexora — Assistant Pokémon GO quotidien et suivi de collection",
      description:
        "Dexora est votre compagnon Pokémon GO quotidien — tableau de bord, suivi du living dex, intelligence Raid et PvP, Trainer Vision et 13 langues. Gratuit sur Google Play.",
    },
    nav: {
      legalLabel: "Légal et support",
      privacy: "Confidentialité",
      terms: "Conditions",
      deleteAccount: "Supprimer le compte",
      contact: "Contact",
      feedback: "Retour",
      home: "Accueil",
      explore: "Explorer",
      download: "Télécharger",
      legal: "Légal",
    },
    language: {
      title: "Langue",
      choose: "Choisir la langue",
      searchPlaceholder: "Rechercher des langues…",
      previewHint: "Touchez une langue pour un aperçu instantané",
    },
    hero: {
      eyebrow: "Compagnon Pokémon GO",
      headline1: "Votre",
      headline2: "Pokémon GO",
      headline3: "assistant quotidien",
      copy: "Suivez votre living dex, planifiez vos chasses et obtenez de meilleures analyses de combat — pour les dresseurs qui jouent chaque jour.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Gratuit sur Android · iOS arrive bientôt",
      waitlistEyebrow: "Ou rejoignez la liste d'attente",
      waitlistHint: "ACCÈS ANTICIPÉ · PAS DE SPAM",
    },
    showcase: {
      eyebrow: "DÉCOUVRIR DEXORA",
      headline1: "Conçu pour les dresseurs",
      headline2: "qui jouent",
      headlineHighlight: "chaque jour",
      copy: "Un seul tableau de bord. Priorités, progression de collection, intelligence de combat, événements et communauté — tout ce qu'il faut avant de sortir.",
      coreDailyTitle: "Assistant quotidien",
      coreDailyText:
        "Priorités, chasse du jour, missions quotidiennes et héro sensible aux événements — à chaque ouverture de Dexora.",
      coreCollectionTitle: "Suivi de collection",
      coreCollectionText:
        "Living dex, shinies, megas, hundos et anneaux de progression — synchronisés en toute sécurité dans le cloud avec connexion Google.",
      coreBattleTitle: "Intelligence de combat",
      coreBattleText:
        "Classements de raid, tiers PvP, contres Rocket et recommandations IA par Pokémon.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "Scannez des captures pour identifier Pokémon, IV et opportunités de capture instantanément avec OCR embarqué.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "Les cibles de raid hebdomadaires se synchronisent automatiquement. Suivez les Pokémon en attente et capturés.",
      highlightPokedexTitle: "Pokédex hors ligne",
      highlightPokedexText:
        "{{speciesCount}} espèces avec stats GO, attaques et illustrations mises en cache sur l'appareil.",
      highlightEventsTitle: "Suivi des événements",
      highlightEventsText:
        "Community Day, GO Fest et événements en direct avec pools d'attaques, bonus et rappels de compte à rebours.",
      highlightCommunityTitle: "Communauté de dresseurs",
      highlightCommunityText:
        "Codes ami, chat de groupe, coordination de raid et outils de modération — connectez-vous avec des dresseurs du monde entier.",
      highlightLanguagesTitle: "13 langues",
      highlightLanguagesText:
        "Localisation complète de l'app — English, Deutsch, Français, Español et 9 autres, dont l'arabe et l'hébreu.",
      ctaNote:
        "Adopté par des dresseurs qui synchronisent {{speciesCount}}+ espèces hors ligne",
    },
    download: {
      exploreLabel: "EXPLORER",
      headlinePrefix: "Téléchargez",
      headlineBrand: "Dexora",
      copy: "Emportez votre compagnon quotidien à chaque chasse. Gratuit sur Android — iOS arrive bientôt.",
    },
    waitlist: {
      emailLabel: "Adresse e-mail",
      emailPlaceholder: "trainer@email.com",
      join: "Rejoindre la liste",
      joining: "Inscription...",
      joinButton: "Rejoindre la liste",
      invalidEmail: "Veuillez saisir une adresse e-mail valide.",
      notConfigured:
        "La liste d'attente n'est pas encore configurée. Réessayez bientôt.",
      alreadyOnList: "Vous êtes déjà sur la liste d'attente !",
      error: "Un problème est survenu. Veuillez réessayer.",
      success:
        "Vous êtes sur la liste ! Nous vous informerons au lancement.",
    },
    store: {
      googlePlayAria: "Obtenir Dexora sur Google Play",
      getItOn: "DISPONIBLE SUR",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. Tous droits réservés.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "En vigueur {{date}}",
      backHome: "← Retour à l'accueil",
      emailSupport: "Envoyer un e-mail à support@dexora.app",
      privacyPolicy: "Politique de confidentialité",
    },
    legal: {
      privacy: {
        title: "Politique de confidentialité",
        description:
          "Comment Dexora gère vos informations sur dexora.app et dans l'application.",
      },
      terms: {
        title: "Conditions générales",
        description:
          "Règles d'utilisation de dexora.app et de l'application compagnon Dexora.",
      },
      contact: {
        title: "Contactez-nous",
        description: "Prenez contact avec l'équipe Dexora.",
      },
      feedback: {
        title: "Retour",
        description:
          "Partagez des idées, signalez des bugs ou suggérez des améliorations.",
      },
      "delete-account": {
        title: "Supprimer le compte et les données",
        description:
          "Supprimez définitivement votre compte cloud Dexora et les données associées.",
      },
    },
  },
  es: {
    meta: {
      title: "Dexora — Asistente diario de Pokémon GO y seguimiento de colección",
      description:
        "Dexora es tu compañero diario de Pokémon GO: panel principal, seguimiento de living dex, inteligencia de raids y PvP, Trainer Vision y 13 idiomas. Gratis en Google Play.",
    },
    nav: {
      legalLabel: "Legal y soporte",
      privacy: "Privacidad",
      terms: "Términos",
      deleteAccount: "Eliminar cuenta",
      contact: "Contacto",
      feedback: "Comentarios",
      home: "Inicio",
      explore: "Explorar",
      download: "Descargar",
      legal: "Legal",
    },
    language: {
      title: "Idioma",
      choose: "Elegir idioma",
      searchPlaceholder: "Buscar idiomas…",
      previewHint: "Toca un idioma para vista previa instantánea",
    },
    hero: {
      eyebrow: "Compañero de Pokémon GO",
      headline1: "Tu",
      headline2: "Pokémon GO",
      headline3: "asistente diario",
      copy: "Sigue tu living dex, planifica cacerías y obtén mejores análisis de combate — para entrenadores que juegan cada día.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Gratis en Android · iOS próximamente",
      waitlistEyebrow: "O únete a la lista de espera",
      waitlistHint: "ACCESO ANTICIPADO · SIN SPAM",
    },
    showcase: {
      eyebrow: "EXPLORA DEXORA",
      headline1: "Creado para entrenadores",
      headline2: "que juegan",
      headlineHighlight: "cada día",
      copy: "Un panel principal. Prioridades, progreso de colección, inteligencia de combate, eventos y comunidad: todo lo que necesitas antes de salir.",
      coreDailyTitle: "Asistente diario",
      coreDailyText:
        "Prioridades, cacería de hoy, misiones diarias y héroe consciente de eventos, cada vez que abres Dexora.",
      coreCollectionTitle: "Seguimiento de colección",
      coreCollectionText:
        "Living dex, shinies, megas, hundos y anillos de hitos, sincronizados de forma segura en la nube con inicio de sesión de Google.",
      coreBattleTitle: "Inteligencia de combate",
      coreBattleText:
        "Calificaciones de raid, niveles PvP, counters de Rocket y recomendaciones de IA por Pokémon.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "Escanea capturas para identificar Pokémon, IV y oportunidades de captura al instante con OCR en el dispositivo.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "Los objetivos semanales de raid se sincronizan automáticamente. Sigue Pokémon pendientes y capturados.",
      highlightPokedexTitle: "Pokédex sin conexión",
      highlightPokedexText:
        "{{speciesCount}} especies con estadísticas GO, movimientos e ilustraciones en caché en el dispositivo.",
      highlightEventsTitle: "Seguimiento de eventos",
      highlightEventsText:
        "Community Day, GO Fest y eventos en vivo con grupos de movimientos, bonificaciones y recordatorios de cuenta regresiva.",
      highlightCommunityTitle: "Comunidad de entrenadores",
      highlightCommunityText:
        "Códigos de amigo, chat grupal, coordinación de raids y herramientas de moderación: conéctate con entrenadores de todo el mundo.",
      highlightLanguagesTitle: "13 idiomas",
      highlightLanguagesText:
        "Localización completa de la app: English, Deutsch, Français, Español y 9 más, incluyendo árabe y hebreo.",
      ctaNote:
        "Con la confianza de entrenadores que sincronizan {{speciesCount}}+ especies sin conexión",
    },
    download: {
      exploreLabel: "EXPLORAR",
      headlinePrefix: "Consigue",
      headlineBrand: "Dexora",
      copy: "Lleva a tu compañero diario en cada caza. Gratis en Android — iOS llegará pronto.",
    },
    waitlist: {
      emailLabel: "Correo electrónico",
      emailPlaceholder: "trainer@email.com",
      join: "Unirme a la lista",
      joining: "Uniéndote...",
      joinButton: "Unirme a la lista",
      invalidEmail: "Introduce un correo electrónico válido.",
      notConfigured:
        "La lista de espera aún no está configurada. Inténtalo de nuevo pronto.",
      alreadyOnList: "¡Ya estás en la lista de espera!",
      error: "Algo salió mal. Inténtalo de nuevo.",
      success: "¡Ya estás en la lista! Te avisaremos en el lanzamiento.",
    },
    store: {
      googlePlayAria: "Consigue Dexora en Google Play",
      getItOn: "CONSÍGUELO EN",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. Todos los derechos reservados.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "Vigente desde {{date}}",
      backHome: "← Volver al inicio",
      emailSupport: "Enviar correo a support@dexora.app",
      privacyPolicy: "Política de privacidad",
    },
    legal: {
      privacy: {
        title: "Política de privacidad",
        description:
          "Cómo Dexora gestiona tu información en dexora.app y en la app.",
      },
      terms: {
        title: "Términos y condiciones",
        description:
          "Reglas para usar dexora.app y la app complementaria Dexora.",
      },
      contact: {
        title: "Contáctanos",
        description: "Ponte en contacto con el equipo de Dexora.",
      },
      feedback: {
        title: "Comentarios",
        description: "Comparte ideas, reporta errores o sugiere mejoras.",
      },
      "delete-account": {
        title: "Eliminar cuenta y datos",
        description:
          "Elimina permanentemente tu cuenta en la nube de Dexora y los datos asociados.",
      },
    },
  },
  it: {
    meta: {
      title: "Dexora — Assistente giornaliero di Pokémon GO e tracker collezione",
      description:
        "Dexora è il tuo compagno quotidiano per Pokémon GO — dashboard home, monitoraggio living dex, intelligence raid e PvP, Trainer Vision e 13 lingue. Gratis su Google Play.",
    },
    nav: {
      legalLabel: "Legale e supporto",
      privacy: "Privacy",
      terms: "Termini",
      deleteAccount: "Elimina account",
      contact: "Contatti",
      feedback: "Feedback",
      home: "Home",
      explore: "Esplora",
      download: "Scarica",
      legal: "Legale",
    },
    language: {
      title: "Lingua",
      choose: "Scegli lingua",
      searchPlaceholder: "Cerca lingue…",
      previewHint: "Tocca una lingua per un'anteprima immediata",
    },
    hero: {
      eyebrow: "Compagno Pokémon GO",
      headline1: "Il tuo",
      headline2: "Pokémon GO",
      headline3: "assistente quotidiano",
      copy: "Traccia il tuo living dex, pianifica cacce e ottieni analisi di combattimento più intelligenti — per allenatori che giocano ogni giorno.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Gratis su Android · iOS in arrivo",
      waitlistEyebrow: "Oppure unisciti alla lista d'attesa",
      waitlistHint: "ACCESSO ANTICIPATO · NIENTE SPAM",
    },
    showcase: {
      eyebrow: "ESPLORA DEXORA",
      headline1: "Creato per gli allenatori",
      headline2: "che giocano",
      headlineHighlight: "ogni giorno",
      copy: "Una dashboard home. Priorità, progresso collezione, intelligence battaglia, eventi e community — tutto ciò che ti serve prima di uscire.",
      coreDailyTitle: "Assistente quotidiano",
      coreDailyText:
        "Priorità, caccia di oggi, missioni giornaliere ed hero orientato agli eventi — ogni volta che apri Dexora.",
      coreCollectionTitle: "Tracking collezione",
      coreCollectionText:
        "Living dex, shiny, mega, hundo e anelli traguardo — sincronizzati in sicurezza sul cloud con accesso Google.",
      coreBattleTitle: "Intelligence battaglia",
      coreBattleText:
        "Valutazioni raid, tier PvP, counter Rocket e consigli AI per ogni Pokémon.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "Scansiona screenshot per identificare Pokémon, IV e opportunità di cattura istantaneamente con OCR sul dispositivo.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "I target raid settimanali si sincronizzano automaticamente. Traccia Pokémon in attesa e catturati.",
      highlightPokedexTitle: "Pokédex offline",
      highlightPokedexText:
        "{{speciesCount}} specie con statistiche GO, mosse e artwork in cache sul dispositivo.",
      highlightEventsTitle: "Tracker eventi",
      highlightEventsText:
        "Community Day, GO Fest ed eventi live con pool mosse, bonus e promemoria countdown.",
      highlightCommunityTitle: "Community allenatori",
      highlightCommunityText:
        "Codici amico, chat di gruppo, coordinamento raid e strumenti di moderazione — connettiti con allenatori di tutto il mondo.",
      highlightLanguagesTitle: "13 lingue",
      highlightLanguagesText:
        "Localizzazione completa dell'app — English, Deutsch, Français, Español e altre 9, incluse arabo ed ebraico.",
      ctaNote:
        "Scelto dagli allenatori che sincronizzano {{speciesCount}}+ specie offline",
    },
    download: {
      exploreLabel: "ESPLORA",
      headlinePrefix: "Ottieni",
      headlineBrand: "Dexora",
      copy: "Porta il tuo compagno quotidiano in ogni caccia. Gratis su Android — iOS in arrivo.",
    },
    waitlist: {
      emailLabel: "Indirizzo email",
      emailPlaceholder: "trainer@email.com",
      join: "Unisciti alla lista",
      joining: "Iscrizione in corso...",
      joinButton: "Unisciti alla lista",
      invalidEmail: "Inserisci un indirizzo email valido.",
      notConfigured:
        "La lista d'attesa non è ancora configurata. Riprova presto.",
      alreadyOnList: "Sei già nella lista d'attesa!",
      error: "Qualcosa è andato storto. Riprova.",
      success:
        "Sei nella lista! Ti avviseremo al momento del lancio.",
    },
    store: {
      googlePlayAria: "Ottieni Dexora su Google Play",
      getItOn: "SCARICALO SU",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. Tutti i diritti riservati.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "In vigore dal {{date}}",
      backHome: "← Torna alla home",
      emailSupport: "Invia un'email a support@dexora.app",
      privacyPolicy: "Informativa sulla privacy",
    },
    legal: {
      privacy: {
        title: "Informativa sulla privacy",
        description:
          "Come Dexora gestisce le tue informazioni su dexora.app e nell'app.",
      },
      terms: {
        title: "Termini e condizioni",
        description:
          "Regole per l'uso di dexora.app e dell'app companion Dexora.",
      },
      contact: {
        title: "Contattaci",
        description: "Mettiti in contatto con il team Dexora.",
      },
      feedback: {
        title: "Feedback",
        description: "Condividi idee, segnala bug o suggerisci miglioramenti.",
      },
      "delete-account": {
        title: "Elimina account e dati",
        description:
          "Rimuovi definitivamente il tuo account cloud Dexora e i dati associati.",
      },
    },
  },
  pt: {
    meta: {
      title: "Dexora — Assistente diário de Pokémon GO e rastreador de coleção",
      description:
        "Dexora é seu companheiro diário de Pokémon GO — painel inicial, acompanhamento do living dex, inteligência de raid e PvP, Trainer Vision e 13 idiomas. Grátis no Google Play.",
    },
    nav: {
      legalLabel: "Jurídico e suporte",
      privacy: "Privacidade",
      terms: "Termos",
      deleteAccount: "Excluir conta",
      contact: "Contato",
      feedback: "Feedback",
      home: "Início",
      explore: "Explorar",
      download: "Baixar",
      legal: "Jurídico",
    },
    language: {
      title: "Idioma",
      choose: "Escolher idioma",
      searchPlaceholder: "Pesquisar idiomas…",
      previewHint: "Toque em um idioma para pré-visualizar instantaneamente",
    },
    hero: {
      eyebrow: "Companheiro Pokémon GO",
      headline1: "Seu",
      headline2: "Pokémon GO",
      headline3: "assistente diário",
      copy: "Acompanhe seu living dex, planeje caçadas e obtenha insights de batalha mais inteligentes — para treinadores que jogam todos os dias.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Grátis no Android · iOS em breve",
      waitlistEyebrow: "Ou entre na lista de espera",
      waitlistHint: "ACESSO ANTECIPADO · SEM SPAM",
    },
    showcase: {
      eyebrow: "EXPLORE O DEXORA",
      headline1: "Feito para treinadores",
      headline2: "que jogam",
      headlineHighlight: "todos os dias",
      copy: "Um painel inicial. Prioridades, progresso da coleção, inteligência de batalha, eventos e comunidade — tudo o que você precisa antes de sair de casa.",
      coreDailyTitle: "Assistente diário",
      coreDailyText:
        "Prioridades, caça de hoje, missões diárias e destaque sensível a eventos — toda vez que você abre o Dexora.",
      coreCollectionTitle: "Rastreamento de coleção",
      coreCollectionText:
        "Living dex, shinies, megas, hundos e anéis de marcos — sincronizados com segurança na nuvem com login Google.",
      coreBattleTitle: "Inteligência de batalha",
      coreBattleText:
        "Classificações de raid, tiers de PvP, counters de Rocket e recomendações de IA por Pokémon.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "Escaneie capturas para identificar Pokémon, IV e oportunidades de captura instantaneamente com OCR no dispositivo.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "Alvos semanais de raid sincronizam automaticamente. Acompanhe Pokémon pendentes e capturados.",
      highlightPokedexTitle: "Pokédex offline",
      highlightPokedexText:
        "{{speciesCount}} espécies com stats GO, movimentos e artes em cache no dispositivo.",
      highlightEventsTitle: "Rastreador de eventos",
      highlightEventsText:
        "Community Day, GO Fest e eventos ao vivo com pools de movimentos, bônus e lembretes de contagem regressiva.",
      highlightCommunityTitle: "Comunidade de treinadores",
      highlightCommunityText:
        "Códigos de amizade, chat em grupo, coordenação de raid e ferramentas de moderação — conecte-se com treinadores do mundo inteiro.",
      highlightLanguagesTitle: "13 idiomas",
      highlightLanguagesText:
        "Localização completa do app — English, Deutsch, Français, Español e mais 9, incluindo árabe e hebraico.",
      ctaNote:
        "Confiado por treinadores que sincronizam {{speciesCount}}+ espécies offline",
    },
    download: {
      exploreLabel: "EXPLORAR",
      headlinePrefix: "Baixe",
      headlineBrand: "Dexora",
      copy: "Leve seu companheiro diário em cada caçada. Grátis no Android — iOS em breve.",
    },
    waitlist: {
      emailLabel: "Endereço de e-mail",
      emailPlaceholder: "trainer@email.com",
      join: "Entrar na lista",
      joining: "Entrando...",
      joinButton: "Entrar na lista",
      invalidEmail: "Insira um endereço de e-mail válido.",
      notConfigured:
        "A lista de espera ainda não está configurada. Tente novamente em breve.",
      alreadyOnList: "Você já está na lista de espera!",
      error: "Algo deu errado. Tente novamente.",
      success: "Você está na lista! Avisaremos você no lançamento.",
    },
    store: {
      googlePlayAria: "Baixe Dexora no Google Play",
      getItOn: "DISPONÍVEL NO",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. Todos os direitos reservados.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "Em vigor em {{date}}",
      backHome: "← Voltar para o início",
      emailSupport: "Enviar e-mail para support@dexora.app",
      privacyPolicy: "Política de privacidade",
    },
    legal: {
      privacy: {
        title: "Política de privacidade",
        description:
          "Como o Dexora trata suas informações em dexora.app e no app.",
      },
      terms: {
        title: "Termos e condições",
        description:
          "Regras para usar dexora.app e o app complementar Dexora.",
      },
      contact: {
        title: "Fale conosco",
        description: "Entre em contato com a equipe Dexora.",
      },
      feedback: {
        title: "Feedback",
        description: "Compartilhe ideias, relate bugs ou sugira melhorias.",
      },
      "delete-account": {
        title: "Excluir conta e dados",
        description:
          "Remova permanentemente sua conta na nuvem Dexora e os dados associados.",
      },
    },
  },
  ru: {
    meta: {
      title: "Dexora — Ежедневный помощник Pokémon GO и трекер коллекции",
      description:
        "Dexora — ваш ежедневный спутник Pokémon GO: домашняя панель, отслеживание living dex, аналитика рейдов и PvP, Trainer Vision и 13 языков. Бесплатно в Google Play.",
    },
    nav: {
      legalLabel: "Правовая информация и поддержка",
      privacy: "Конфиденциальность",
      terms: "Условия",
      deleteAccount: "Удалить аккаунт",
      contact: "Контакты",
      feedback: "Обратная связь",
      home: "Главная",
      explore: "Обзор",
      download: "Скачать",
      legal: "Правовая информация",
    },
    language: {
      title: "Язык",
      choose: "Выбрать язык",
      searchPlaceholder: "Поиск языков…",
      previewHint: "Нажмите на язык для мгновенного предпросмотра",
    },
    hero: {
      eyebrow: "Спутник Pokémon GO",
      headline1: "Ваш ежедневный",
      headline2: "Pokémon GO",
      headline3: "помощник",
      copy: "Отслеживайте living dex, планируйте охоты и получайте умную боевую аналитику — для тренеров, которые играют каждый день.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Бесплатно на Android · iOS скоро",
      waitlistEyebrow: "Или присоединяйтесь к листу ожидания",
      waitlistHint: "РАННИЙ ДОСТУП · БЕЗ СПАМА",
    },
    showcase: {
      eyebrow: "ИЗУЧИТЕ DEXORA",
      headline1: "Создано для тренеров,",
      headline2: "которые играют",
      headlineHighlight: "каждый день",
      copy: "Одна домашняя панель. Приоритеты, прогресс коллекции, боевая аналитика, события и сообщество — всё, что нужно перед выходом из дома.",
      coreDailyTitle: "Ежедневный помощник",
      coreDailyText:
        "Приоритеты, сегодняшняя охота, ежедневные задания и блок с учётом событий — каждый раз при открытии Dexora.",
      coreCollectionTitle: "Отслеживание коллекции",
      coreCollectionText:
        "Living dex, шайни, мега, хундо и кольца прогресса — безопасная синхронизация в облако через вход Google.",
      coreBattleTitle: "Боевая аналитика",
      coreBattleText:
        "Оценки рейдов, тиры PvP, контры Rocket и рекомендации ИИ для каждого Pokémon.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "Сканируйте скриншоты, чтобы мгновенно распознавать Pokémon, IV и возможности поимки с помощью OCR на устройстве.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "Еженедельные цели рейдов синхронизируются автоматически. Отслеживайте ожидаемых и пойманных Pokémon.",
      highlightPokedexTitle: "Офлайн Pokédex",
      highlightPokedexText:
        "{{speciesCount}} видов со stats GO, атаками и артом, кэшированными на устройстве.",
      highlightEventsTitle: "Трекер событий",
      highlightEventsText:
        "Community Day, GO Fest и живые события с пулами атак, бонусами и напоминаниями обратного отсчёта.",
      highlightCommunityTitle: "Сообщество тренеров",
      highlightCommunityText:
        "Коды друзей, групповой чат, координация рейдов и инструменты модерации — общайтесь с тренерами по всему миру.",
      highlightLanguagesTitle: "13 языков",
      highlightLanguagesText:
        "Полная локализация приложения — English, Deutsch, Français, Español и ещё 9 языков, включая арабский и иврит.",
      ctaNote:
        "Выбор тренеров, синхронизирующих {{speciesCount}}+ видов офлайн",
    },
    download: {
      exploreLabel: "ИССЛЕДОВАТЬ",
      headlinePrefix: "Установите",
      headlineBrand: "Dexora",
      copy: "Берите ежедневного спутника на каждую охоту. Бесплатно на Android — iOS скоро.",
    },
    waitlist: {
      emailLabel: "Электронная почта",
      emailPlaceholder: "trainer@email.com",
      join: "Вступить в лист ожидания",
      joining: "Добавляем...",
      joinButton: "Вступить в лист ожидания",
      invalidEmail: "Пожалуйста, введите корректный email.",
      notConfigured:
        "Лист ожидания ещё не настроен. Попробуйте снова чуть позже.",
      alreadyOnList: "Вы уже в листе ожидания!",
      error: "Что-то пошло не так. Попробуйте снова.",
      success: "Вы в списке! Мы уведомим вас о запуске.",
    },
    store: {
      googlePlayAria: "Скачать Dexora в Google Play",
      getItOn: "ДОСТУПНО В",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. Все права защищены.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "Действует с {{date}}",
      backHome: "← Назад на главную",
      emailSupport: "Написать на support@dexora.app",
      privacyPolicy: "Политика конфиденциальности",
    },
    legal: {
      privacy: {
        title: "Политика конфиденциальности",
        description:
          "Как Dexora обрабатывает вашу информацию на dexora.app и в приложении.",
      },
      terms: {
        title: "Условия использования",
        description:
          "Правила использования dexora.app и приложения-спутника Dexora.",
      },
      contact: {
        title: "Свяжитесь с нами",
        description: "Свяжитесь с командой Dexora.",
      },
      feedback: {
        title: "Обратная связь",
        description:
          "Поделитесь идеями, сообщите об ошибках или предложите улучшения.",
      },
      "delete-account": {
        title: "Удаление аккаунта и данных",
        description:
          "Навсегда удалите ваш облачный аккаунт Dexora и связанные данные.",
      },
    },
  },
  ja: {
    meta: {
      title: "Dexora — 毎日使える Pokémon GO アシスタント＆コレクショントラッカー",
      description:
        "Dexora は毎日の Pokémon GO コンパニオン。ホームダッシュボード、living dex 管理、レイドと PvP インテリジェンス、Trainer Vision、13言語に対応。Google Play で無料。",
    },
    nav: {
      legalLabel: "法務とサポート",
      privacy: "プライバシー",
      terms: "利用規約",
      deleteAccount: "アカウント削除",
      contact: "お問い合わせ",
      feedback: "フィードバック",
      home: "ホーム",
      explore: "機能を見る",
      download: "ダウンロード",
      legal: "法務",
    },
    language: {
      title: "言語",
      choose: "言語を選択",
      searchPlaceholder: "言語を検索…",
      previewHint: "言語をタップするとすぐにプレビューできます",
    },
    hero: {
      eyebrow: "Pokémon GO コンパニオン",
      headline1: "あなたの毎日を支える",
      headline2: "Pokémon GO",
      headline3: "アシスタント",
      copy: "living dex を管理し、捕獲を計画し、より賢いバトル分析を取得 — 毎日プレイするトレーナーのために。",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Android で無料 · iOS は近日公開",
      waitlistEyebrow: "またはウェイトリストに参加",
      waitlistHint: "先行アクセス · スパムなし",
    },
    showcase: {
      eyebrow: "DEXORA をチェック",
      headline1: "毎日プレイする",
      headline2: "トレーナーのために",
      headlineHighlight: "設計",
      copy: "ひとつのホームダッシュボードに、優先事項、コレクション進捗、バトル情報、イベント、コミュニティを集約。外出前に必要な情報がそろいます。",
      coreDailyTitle: "デイリーアシスタント",
      coreDailyText:
        "優先事項、今日の狙い、デイリーミッション、イベント連動ヒーローを Dexora 起動時に毎回表示。",
      coreCollectionTitle: "コレクション管理",
      coreCollectionText:
        "living dex、色違い、メガ、hundo、マイルストーンリングを Google サインインで安全にクラウド同期。",
      coreBattleTitle: "バトルインテリジェンス",
      coreBattleText:
        "レイド評価、PvP ティア、Rocket 対策、Pokémon ごとの AI 推奨を提供。",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "スクリーンショットをスキャンして、Pokémon、IV、捕獲チャンスを OCR ですぐに判別。",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "週間レイド目標を自動同期。未捕獲・捕獲済みの Pokémon を追跡。",
      highlightPokedexTitle: "オフライン Pokédex",
      highlightPokedexText:
        "{{speciesCount}} 種の GO ステータス、技、アートワークを端末にキャッシュ。",
      highlightEventsTitle: "イベントトラッカー",
      highlightEventsText:
        "Community Day、GO Fest、開催中イベントの技プール、ボーナス、カウントダウン通知を確認。",
      highlightCommunityTitle: "トレーナーコミュニティ",
      highlightCommunityText:
        "フレンドコード、グループチャット、レイド調整、モデレーション機能で世界中のトレーナーとつながる。",
      highlightLanguagesTitle: "13言語",
      highlightLanguagesText:
        "アプリを完全ローカライズ。English、Deutsch、Français、Español を含む 13 言語（アラビア語・ヘブライ語対応）。",
      ctaNote:
        "{{speciesCount}}+ 種をオフライン同期するトレーナーに支持されています",
    },
    download: {
      exploreLabel: "探索",
      headlinePrefix: "今すぐ",
      headlineBrand: "Dexora",
      copy: "毎日の相棒をすべてのハントに。Androidは無料 — iOSは近日公開。",
    },
    waitlist: {
      emailLabel: "メールアドレス",
      emailPlaceholder: "trainer@email.com",
      join: "ウェイトリストに参加",
      joining: "参加中...",
      joinButton: "ウェイトリストに参加",
      invalidEmail: "有効なメールアドレスを入力してください。",
      notConfigured:
        "ウェイトリストはまだ設定されていません。しばらくしてから再度お試しください。",
      alreadyOnList: "すでにウェイトリストに登録されています！",
      error: "問題が発生しました。もう一度お試しください。",
      success: "登録完了！リリース時にお知らせします。",
    },
    store: {
      googlePlayAria: "Google Play で Dexora を入手",
      getItOn: "入手先",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. All rights reserved.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "施行日 {{date}}",
      backHome: "← ホームに戻る",
      emailSupport: "support@dexora.app にメール",
      privacyPolicy: "プライバシーポリシー",
    },
    legal: {
      privacy: {
        title: "プライバシーポリシー",
        description:
          "dexora.app およびアプリ内で Dexora が情報をどのように扱うか。",
      },
      terms: {
        title: "利用規約",
        description:
          "dexora.app と Dexora コンパニオンアプリの利用ルール。",
      },
      contact: {
        title: "お問い合わせ",
        description: "Dexora チームへの連絡先。",
      },
      feedback: {
        title: "フィードバック",
        description: "アイデア共有、バグ報告、改善提案はこちら。",
      },
      "delete-account": {
        title: "アカウントとデータの削除",
        description:
          "Dexora クラウドアカウントと関連データを完全に削除します。",
      },
    },
  },
  ko: {
    meta: {
      title: "Dexora — 매일 쓰는 Pokémon GO 도우미 & 컬렉션 트래커",
      description:
        "Dexora는 매일 사용하는 Pokémon GO 동반자입니다. 홈 대시보드, living dex 추적, 레이드 및 PvP 인텔리전스, Trainer Vision, 13개 언어를 제공합니다. Google Play에서 무료.",
    },
    nav: {
      legalLabel: "법적 정보 및 지원",
      privacy: "개인정보",
      terms: "이용약관",
      deleteAccount: "계정 삭제",
      contact: "문의",
      feedback: "피드백",
      home: "홈",
      explore: "둘러보기",
      download: "다운로드",
      legal: "법적 고지",
    },
    language: {
      title: "언어",
      choose: "언어 선택",
      searchPlaceholder: "언어 검색…",
      previewHint: "언어를 탭하면 즉시 미리보기됩니다",
    },
    hero: {
      eyebrow: "Pokémon GO 동반자",
      headline1: "당신의 매일을 위한",
      headline2: "Pokémon GO",
      headline3: "도우미",
      copy: "living dex를 추적하고, 사냥을 계획하며, 더 똑똑한 배틀 인사이트를 받으세요 — 매일 플레이하는 트레이너를 위해.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Android 무료 · iOS 곧 출시",
      waitlistEyebrow: "또는 대기자 명단에 참여",
      waitlistHint: "얼리 액세스 · 스팸 없음",
    },
    showcase: {
      eyebrow: "DEXORA 살펴보기",
      headline1: "매일 플레이하는",
      headline2: "트레이너를 위해",
      headlineHighlight: "만들었습니다",
      copy: "하나의 홈 대시보드에 우선순위, 컬렉션 진행도, 배틀 인텔리전스, 이벤트, 커뮤니티를 모두 담았습니다. 집을 나서기 전 필요한 정보가 준비됩니다.",
      coreDailyTitle: "데일리 어시스턴트",
      coreDailyText:
        "우선순위, 오늘의 사냥, 일일 미션, 이벤트 반영 히어로를 Dexora를 열 때마다 확인하세요.",
      coreCollectionTitle: "컬렉션 추적",
      coreCollectionText:
        "living dex, shiny, mega, hundo, 마일스톤 링을 Google 로그인으로 안전하게 클라우드 동기화.",
      coreBattleTitle: "배틀 인텔리전스",
      coreBattleText:
        "레이드 평점, PvP 티어, Rocket 카운터, Pokémon별 AI 추천 제공.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "스크린샷을 스캔해 Pokémon, IV, 포획 기회를 기기 내 OCR로 즉시 식별합니다.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "주간 레이드 목표가 자동으로 동기화됩니다. 대기 중/포획 완료 Pokémon을 추적하세요.",
      highlightPokedexTitle: "오프라인 Pokédex",
      highlightPokedexText:
        "{{speciesCount}}종의 GO 스탯, 기술, 아트워크를 기기에 캐시.",
      highlightEventsTitle: "이벤트 트래커",
      highlightEventsText:
        "Community Day, GO Fest, 라이브 이벤트의 기술 풀, 보너스, 카운트다운 알림 제공.",
      highlightCommunityTitle: "트레이너 커뮤니티",
      highlightCommunityText:
        "친구 코드, 그룹 채팅, 레이드 조율, 모더레이션 도구로 전 세계 트레이너와 연결.",
      highlightLanguagesTitle: "13개 언어",
      highlightLanguagesText:
        "전체 앱 현지화 지원 — English, Deutsch, Français, Español 포함 13개 언어(아랍어, 히브리어 포함).",
      ctaNote:
        "{{speciesCount}}+ 종을 오프라인 동기화하는 트레이너가 신뢰합니다",
    },
    download: {
      exploreLabel: "탐색",
      headlinePrefix: "지금",
      headlineBrand: "Dexora",
      copy: "매일 함께하는 동반자를 모든 사냥에. Android는 무료 — iOS 곧 출시.",
    },
    waitlist: {
      emailLabel: "이메일 주소",
      emailPlaceholder: "trainer@email.com",
      join: "대기자 명단 참여",
      joining: "참여 중...",
      joinButton: "대기자 명단 참여",
      invalidEmail: "유효한 이메일 주소를 입력해 주세요.",
      notConfigured:
        "대기자 명단이 아직 설정되지 않았습니다. 잠시 후 다시 시도해 주세요.",
      alreadyOnList: "이미 대기자 명단에 등록되어 있습니다!",
      error: "문제가 발생했습니다. 다시 시도해 주세요.",
      success: "명단에 등록되었습니다! 출시 시 알려드리겠습니다.",
    },
    store: {
      googlePlayAria: "Google Play에서 Dexora 받기",
      getItOn: "다운로드",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. 모든 권리 보유.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "{{date}}부터 적용",
      backHome: "← 홈으로 돌아가기",
      emailSupport: "support@dexora.app로 이메일 보내기",
      privacyPolicy: "개인정보 처리방침",
    },
    legal: {
      privacy: {
        title: "개인정보 처리방침",
        description:
          "dexora.app 및 앱에서 Dexora가 정보를 처리하는 방식입니다.",
      },
      terms: {
        title: "이용약관",
        description: "dexora.app 및 Dexora 동반 앱 이용 규칙입니다.",
      },
      contact: {
        title: "문의하기",
        description: "Dexora 팀에 연락하세요.",
      },
      feedback: {
        title: "피드백",
        description: "아이디어 공유, 버그 신고, 개선 제안을 보내주세요.",
      },
      "delete-account": {
        title: "계정 및 데이터 삭제",
        description:
          "Dexora 클라우드 계정과 관련 데이터를 영구적으로 삭제합니다.",
      },
    },
  },
  "zh-Hans": {
    meta: {
      title: "Dexora — 每日 Pokémon GO 助手与收藏追踪",
      description:
        "Dexora 是你的每日 Pokémon GO 伙伴——主页仪表盘、living dex 追踪、Raid 与 PvP 情报、Trainer Vision，以及 13 种语言。Google Play 免费提供。",
    },
    nav: {
      legalLabel: "法律与支持",
      privacy: "隐私",
      terms: "条款",
      deleteAccount: "删除账号",
      contact: "联系我们",
      feedback: "反馈",
      home: "首页",
      explore: "探索",
      download: "下载",
      legal: "法律",
    },
    language: {
      title: "语言",
      choose: "选择语言",
      searchPlaceholder: "搜索语言…",
      previewHint: "点击语言可立即预览",
    },
    hero: {
      eyebrow: "Pokémon GO 伙伴",
      headline1: "你的每日",
      headline2: "Pokémon GO",
      headline3: "助手",
      copy: "追踪 living dex、规划狩猎并获得更智能的对战分析 — 为每天游玩的训练家打造。",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Android 免费 · iOS 即将推出",
      waitlistEyebrow: "或加入候补名单",
      waitlistHint: "抢先体验 · 无垃圾邮件",
    },
    showcase: {
      eyebrow: "探索 DEXORA",
      headline1: "专为每天游玩的",
      headline2: "训练家打造",
      headlineHighlight: "",
      copy: "一个主页仪表盘，整合优先事项、收藏进度、对战情报、活动与社区——出门前所需信息一目了然。",
      coreDailyTitle: "每日助手",
      coreDailyText:
        "优先事项、今日狩猎、每日任务与活动感知首页，每次打开 Dexora 都能看到。",
      coreCollectionTitle: "收藏追踪",
      coreCollectionText:
        "living dex、shiny、mega、hundo 与里程碑圆环，通过 Google 登录安全云同步。",
      coreBattleTitle: "对战情报",
      coreBattleText:
        "提供 Raid 评级、PvP 分级、Rocket 克制与按 Pokémon 的 AI 推荐。",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "通过设备端 OCR 扫描截图，立即识别 Pokémon、IV 与捕捉机会。",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "每周 Raid 目标自动同步，追踪待抓与已抓 Pokémon。",
      highlightPokedexTitle: "离线 Pokédex",
      highlightPokedexText:
        "{{speciesCount}} 个物种，含 GO 数据、招式与插图，缓存到设备。",
      highlightEventsTitle: "活动追踪",
      highlightEventsText:
        "Community Day、GO Fest 与实时活动，提供招式池、加成与倒计时提醒。",
      highlightCommunityTitle: "训练家社区",
      highlightCommunityText:
        "好友码、群聊、Raid 协调与审核工具——与全球训练家连接。",
      highlightLanguagesTitle: "13 种语言",
      highlightLanguagesText:
        "完整应用本地化——English、Deutsch、Français、Español 等 13 种语言，含阿拉伯语与希伯来语。",
      ctaNote: "深受训练家信赖，离线同步 {{speciesCount}}+ 个物种",
    },
    download: {
      exploreLabel: "探索",
      headlinePrefix: "获取",
      headlineBrand: "Dexora",
      copy: "让每日伙伴陪你每次狩猎。Android 免费 — iOS 即将推出。",
    },
    waitlist: {
      emailLabel: "邮箱地址",
      emailPlaceholder: "trainer@email.com",
      join: "加入候补名单",
      joining: "加入中...",
      joinButton: "加入候补名单",
      invalidEmail: "请输入有效的邮箱地址。",
      notConfigured: "候补名单尚未配置，请稍后再试。",
      alreadyOnList: "你已在候补名单中！",
      error: "发生错误，请重试。",
      success: "你已成功加入！上线时我们会通知你。",
    },
    store: {
      googlePlayAria: "在 Google Play 获取 Dexora",
      getItOn: "下载于",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora。保留所有权利。",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "{{date}} 生效",
      backHome: "← 返回首页",
      emailSupport: "发送邮件至 support@dexora.app",
      privacyPolicy: "隐私政策",
    },
    legal: {
      privacy: {
        title: "隐私政策",
        description: "Dexora 如何在 dexora.app 与应用中处理你的信息。",
      },
      terms: {
        title: "条款与条件",
        description: "使用 dexora.app 与 Dexora 伴侣应用的规则。",
      },
      contact: {
        title: "联系我们",
        description: "联系 Dexora 团队。",
      },
      feedback: {
        title: "反馈",
        description: "分享想法、报告问题或提出改进建议。",
      },
      "delete-account": {
        title: "删除账号与数据",
        description: "永久移除你的 Dexora 云账号及相关数据。",
      },
    },
  },
  "zh-Hant": {
    meta: {
      title: "Dexora — 每日 Pokémon GO 助手與收藏追蹤",
      description:
        "Dexora 是你的每日 Pokémon GO 夥伴——首頁儀表板、living dex 追蹤、Raid 與 PvP 情報、Trainer Vision，以及 13 種語言。Google Play 免費提供。",
    },
    nav: {
      legalLabel: "法律與支援",
      privacy: "隱私",
      terms: "條款",
      deleteAccount: "刪除帳號",
      contact: "聯絡我們",
      feedback: "回饋",
      home: "首頁",
      explore: "探索",
      download: "下載",
      legal: "法律",
    },
    language: {
      title: "語言",
      choose: "選擇語言",
      searchPlaceholder: "搜尋語言…",
      previewHint: "點選語言即可立即預覽",
    },
    hero: {
      eyebrow: "Pokémon GO 夥伴",
      headline1: "你的每日",
      headline2: "Pokémon GO",
      headline3: "助手",
      copy: "追蹤 living dex、規劃狩獵並取得更聰明的對戰分析 — 為每天遊玩的訓練家打造。",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "Android 免費 · iOS 即將推出",
      waitlistEyebrow: "或加入候補名單",
      waitlistHint: "搶先體驗 · 無垃圾郵件",
    },
    showcase: {
      eyebrow: "探索 DEXORA",
      headline1: "專為每天遊玩的",
      headline2: "訓練家打造",
      headlineHighlight: "",
      copy: "一個首頁儀表板，整合優先事項、收藏進度、對戰情報、活動與社群——出門前需要的資訊一次到位。",
      coreDailyTitle: "每日助手",
      coreDailyText:
        "優先事項、今日狩獵、每日任務與活動感知首頁，每次開啟 Dexora 都能看到。",
      coreCollectionTitle: "收藏追蹤",
      coreCollectionText:
        "living dex、shiny、mega、hundo 與里程碑圓環，透過 Google 登入安全雲端同步。",
      coreBattleTitle: "對戰情報",
      coreBattleText:
        "提供 Raid 評分、PvP 分級、Rocket 克制與依 Pokémon 提供的 AI 建議。",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "透過裝置端 OCR 掃描截圖，立即辨識 Pokémon、IV 與捕捉機會。",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText: "每週 Raid 目標自動同步，追蹤待抓與已抓 Pokémon。",
      highlightPokedexTitle: "離線 Pokédex",
      highlightPokedexText:
        "{{speciesCount}} 個物種，含 GO 數據、招式與插圖，快取於裝置。",
      highlightEventsTitle: "活動追蹤",
      highlightEventsText:
        "Community Day、GO Fest 與即時活動，提供招式池、加成與倒數提醒。",
      highlightCommunityTitle: "訓練家社群",
      highlightCommunityText:
        "好友代碼、群聊、Raid 協調與管理工具——與全球訓練家連結。",
      highlightLanguagesTitle: "13 種語言",
      highlightLanguagesText:
        "完整應用在地化——English、Deutsch、Français、Español 等 13 種語言，含阿拉伯語與希伯來語。",
      ctaNote: "深受訓練家信賴，離線同步 {{speciesCount}}+ 個物種",
    },
    download: {
      exploreLabel: "探索",
      headlinePrefix: "取得",
      headlineBrand: "Dexora",
      copy: "讓每日夥伴陪你每次狩獵。Android 免費 — iOS 即將推出。",
    },
    waitlist: {
      emailLabel: "電子郵件地址",
      emailPlaceholder: "trainer@email.com",
      join: "加入候補名單",
      joining: "加入中...",
      joinButton: "加入候補名單",
      invalidEmail: "請輸入有效的電子郵件地址。",
      notConfigured: "候補名單尚未設定，請稍後再試。",
      alreadyOnList: "你已在候補名單中！",
      error: "發生錯誤，請再試一次。",
      success: "你已加入名單！我們會在上線時通知你。",
    },
    store: {
      googlePlayAria: "在 Google Play 取得 Dexora",
      getItOn: "下載於",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora。版權所有。",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "{{date}} 生效",
      backHome: "← 返回首頁",
      emailSupport: "寄信至 support@dexora.app",
      privacyPolicy: "隱私政策",
    },
    legal: {
      privacy: {
        title: "隱私政策",
        description: "Dexora 如何在 dexora.app 與應用程式中處理你的資訊。",
      },
      terms: {
        title: "條款與細則",
        description: "使用 dexora.app 與 Dexora 伴侶應用程式的規則。",
      },
      contact: {
        title: "聯絡我們",
        description: "聯絡 Dexora 團隊。",
      },
      feedback: {
        title: "回饋",
        description: "分享想法、回報錯誤或提出改進建議。",
      },
      "delete-account": {
        title: "刪除帳號與資料",
        description: "永久移除你的 Dexora 雲端帳號及相關資料。",
      },
    },
  },
  ar: {
    meta: {
      title: "Dexora — مساعد Pokémon GO اليومي ومتتبع المجموعة",
      description:
        "Dexora هو رفيقك اليومي في Pokémon GO — لوحة رئيسية، تتبع living dex، ذكاء Raid وPvP، Trainer Vision، و13 لغة. مجاناً على Google Play.",
    },
    nav: {
      legalLabel: "القانوني والدعم",
      privacy: "الخصوصية",
      terms: "الشروط",
      deleteAccount: "حذف الحساب",
      contact: "اتصل بنا",
      feedback: "الملاحظات",
      home: "الرئيسية",
      explore: "استكشاف",
      download: "تنزيل",
      legal: "قانوني",
    },
    language: {
      title: "اللغة",
      choose: "اختر اللغة",
      searchPlaceholder: "ابحث عن اللغات…",
      previewHint: "اضغط على لغة لمعاينة فورية",
    },
    hero: {
      eyebrow: "رفيق Pokémon GO",
      headline1: "مساعدك اليومي",
      headline2: "Pokémon GO",
      headline3: "مساعد",
      copy: "تتبع living dex، خطط للصيد، واحصل على رؤى معارك أذكى — للمدربين الذين يلعبون كل يوم.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "مجاناً على Android · iOS قريباً",
      waitlistEyebrow: "أو انضم إلى قائمة الانتظار",
      waitlistHint: "وصول مبكر · بدون رسائل مزعجة",
    },
    showcase: {
      eyebrow: "استكشف DEXORA",
      headline1: "مصمم للمدربين",
      headline2: "الذين يلعبون",
      headlineHighlight: "كل يوم",
      copy: "لوحة رئيسية واحدة: الأولويات، تقدم المجموعة، ذكاء المعارك، الأحداث، والمجتمع — كل ما تحتاجه قبل الخروج.",
      coreDailyTitle: "المساعد اليومي",
      coreDailyText:
        "الأولويات، صيد اليوم، المهام اليومية، وواجهة تراعي الأحداث — في كل مرة تفتح فيها Dexora.",
      coreCollectionTitle: "تتبع المجموعة",
      coreCollectionText:
        "living dex وshinies وmegas وhundos وحلقات الإنجاز — مزامنة سحابية آمنة عبر تسجيل Google.",
      coreBattleTitle: "ذكاء المعارك",
      coreBattleText:
        "تقييمات Raid، وتصنيفات PvP، وعدادات Rocket، وتوصيات AI لكل Pokémon.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "امسح لقطات الشاشة للتعرف فوراً على Pokémon وIV وفرص الالتقاط عبر OCR على الجهاز.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "تتزامن أهداف Raid الأسبوعية تلقائياً. تتبع Pokémon المعلق والمصاد.",
      highlightPokedexTitle: "Pokédex دون اتصال",
      highlightPokedexText:
        "{{speciesCount}} نوعاً مع إحصاءات GO والحركات والرسومات محفوظة على الجهاز.",
      highlightEventsTitle: "متتبع الأحداث",
      highlightEventsText:
        "Community Day وGO Fest والأحداث المباشرة مع مجموعات الحركات والمكافآت وتذكيرات العد التنازلي.",
      highlightCommunityTitle: "مجتمع المدربين",
      highlightCommunityText:
        "أكواد الأصدقاء، دردشة جماعية، تنسيق Raid، وأدوات الإشراف — تواصل مع مدربين حول العالم.",
      highlightLanguagesTitle: "13 لغة",
      highlightLanguagesText:
        "توطين كامل للتطبيق — English وDeutsch وFrançais وEspañol و9 لغات أخرى، منها العربية والعبرية.",
      ctaNote:
        "موثوق من مدربين يزامنون {{speciesCount}}+ نوعاً دون اتصال",
    },
    download: {
      exploreLabel: "استكشف",
      headlinePrefix: "احصل على",
      headlineBrand: "Dexora",
      copy: "اصطحب رفيقك اليومي في كل مطاردة. مجاني على Android — iOS قريبًا.",
    },
    waitlist: {
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "trainer@email.com",
      join: "انضم إلى قائمة الانتظار",
      joining: "جارٍ الانضمام...",
      joinButton: "انضم إلى قائمة الانتظار",
      invalidEmail: "يرجى إدخال بريد إلكتروني صالح.",
      notConfigured:
        "قائمة الانتظار غير مهيأة بعد. يرجى المحاولة مرة أخرى قريباً.",
      alreadyOnList: "أنت بالفعل في قائمة الانتظار!",
      error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      success: "تمت إضافتك إلى القائمة! سنبلغك عند الإطلاق.",
    },
    store: {
      googlePlayAria: "احصل على Dexora من Google Play",
      getItOn: "متوفر على",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. جميع الحقوق محفوظة.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "ساري اعتباراً من {{date}}",
      backHome: "← العودة إلى الرئيسية",
      emailSupport: "راسل support@dexora.app",
      privacyPolicy: "سياسة الخصوصية",
    },
    legal: {
      privacy: {
        title: "سياسة الخصوصية",
        description:
          "كيف يتعامل Dexora مع معلوماتك على dexora.app وداخل التطبيق.",
      },
      terms: {
        title: "الشروط والأحكام",
        description:
          "قواعد استخدام dexora.app وتطبيق Dexora المرافق.",
      },
      contact: {
        title: "اتصل بنا",
        description: "تواصل مع فريق Dexora.",
      },
      feedback: {
        title: "الملاحظات",
        description: "شارك أفكارك، أبلغ عن الأخطاء، أو اقترح تحسينات.",
      },
      "delete-account": {
        title: "حذف الحساب والبيانات",
        description:
          "احذف حساب Dexora السحابي والبيانات المرتبطة به نهائياً.",
      },
    },
  },
  he: {
    meta: {
      title: "Dexora — עוזר Pokémon GO יומי ומעקב אוסף",
      description:
        "Dexora הוא בן הלוויה היומי שלך ל-Pokémon GO — לוח בית, מעקב living dex, מודיעין Raid ו-PvP, ‏Trainer Vision ו-13 שפות. בחינם ב-Google Play.",
    },
    nav: {
      legalLabel: "משפטי ותמיכה",
      privacy: "פרטיות",
      terms: "תנאים",
      deleteAccount: "מחיקת חשבון",
      contact: "יצירת קשר",
      feedback: "משוב",
      home: "בית",
      explore: "לחקור",
      download: "הורדה",
      legal: "משפטי",
    },
    language: {
      title: "שפה",
      choose: "בחירת שפה",
      searchPlaceholder: "חיפוש שפות…",
      previewHint: "הקש על שפה לתצוגה מקדימה מיידית",
    },
    hero: {
      eyebrow: "בן לוויה ל-Pokémon GO",
      headline1: "העוזר היומי שלך",
      headline2: "Pokémon GO",
      headline3: "עוזר",
      copy: "עקוב אחרי living dex, תכנן ציידים וקבל תובנות קרב חכמות יותר — ללוחמים שמשחקים כל יום.",
      benefitDaily: "Daily GO Assistant",
      benefitCollection: "Collection Tracking",
      benefitBattle: "Battle Intelligence",
      playStoreNote: "חינם ב-Android · iOS בקרוב",
      waitlistEyebrow: "או הצטרף לרשימת ההמתנה",
      waitlistHint: "גישה מוקדמת · ללא ספאם",
    },
    showcase: {
      eyebrow: "גלו את DEXORA",
      headline1: "נבנה עבור מאמנים",
      headline2: "שמשחקים",
      headlineHighlight: "כל יום",
      copy: "לוח בית אחד: סדרי עדיפויות, התקדמות אוסף, מודיעין קרב, אירועים וקהילה — כל מה שצריך לפני שיוצאים מהבית.",
      coreDailyTitle: "עוזר יומי",
      coreDailyText:
        "סדרי עדיפויות, צייד היום, משימות יומיות ו-Hero מודע לאירועים — בכל פתיחה של Dexora.",
      coreCollectionTitle: "מעקב אוסף",
      coreCollectionText:
        "living dex, ‏shinies, ‏megas, ‏hundos וטבעות אבני דרך — מסתנכרנים בענן בצורה מאובטחת עם כניסת Google.",
      coreBattleTitle: "מודיעין קרב",
      coreBattleText:
        "דירוגי Raid, שכבות PvP, קאונטרים ל-Rocket והמלצות AI לכל Pokémon.",
      highlightVisionTitle: "Trainer Vision",
      highlightVisionText:
        "סרקו צילומי מסך לזיהוי מיידי של Pokémon, ‏IV והזדמנויות תפיסה באמצעות OCR במכשיר.",
      highlightCatchTitle: "Catch Queue",
      highlightCatchText:
        "יעדי Raid שבועיים מסתנכרנים אוטומטית. עקבו אחרי Pokémon ממתינים ונתפסים.",
      highlightPokedexTitle: "Pokédex לא מקוון",
      highlightPokedexText:
        "{{speciesCount}} מינים עם נתוני GO, מהלכים וארט שמורים במטמון במכשיר.",
      highlightEventsTitle: "מעקב אירועים",
      highlightEventsText:
        "Community Day, ‏GO Fest ואירועים חיים עם מאגרי מהלכים, בונוסים ותזכורות ספירה לאחור.",
      highlightCommunityTitle: "קהילת מאמנים",
      highlightCommunityText:
        "קודי חבר, צ'אט קבוצתי, תיאום Raid וכלי ניהול — התחברו למאמנים מכל העולם.",
      highlightLanguagesTitle: "13 שפות",
      highlightLanguagesText:
        "לוקליזציה מלאה לאפליקציה — English, ‏Deutsch, ‏Français, ‏Español ועוד 9 שפות, כולל ערבית ועברית.",
      ctaNote:
        "מאמנים סומכים עלינו לסנכרון לא מקוון של {{speciesCount}}+ מינים",
    },
    download: {
      exploreLabel: "גלה",
      headlinePrefix: "הורידו את",
      headlineBrand: "Dexora",
      copy: "קחו את בן הלוויה היומי לכל מצוד. חינם ב-Android — iOS בקרוב.",
    },
    waitlist: {
      emailLabel: "כתובת אימייל",
      emailPlaceholder: "trainer@email.com",
      join: "הצטרפות לרשימת ההמתנה",
      joining: "מצטרף...",
      joinButton: "הצטרפות לרשימת ההמתנה",
      invalidEmail: "נא להזין כתובת אימייל תקינה.",
      notConfigured:
        "רשימת ההמתנה עדיין לא מוגדרת. נסו שוב בקרוב.",
      alreadyOnList: "אתם כבר ברשימת ההמתנה!",
      error: "משהו השתבש. נסו שוב.",
      success: "נרשמתם! נעדכן אתכם בהשקה.",
    },
    store: {
      googlePlayAria: "הורידו Dexora ב-Google Play",
      getItOn: "להורדה ב-",
      googlePlay: "Google Play",
    },
    footer: {
      rights: "© {{year}} Dexora. כל הזכויות שמורות.",
    },
    legalPage: {
      brand: "DEXORA",
      effective: "בתוקף מתאריך {{date}}",
      backHome: "← חזרה לבית",
      emailSupport: "שלחו אימייל אל support@dexora.app",
      privacyPolicy: "מדיניות פרטיות",
    },
    legal: {
      privacy: {
        title: "מדיניות פרטיות",
        description:
          "כיצד Dexora מטפלת במידע שלך ב-dexora.app ובאפליקציה.",
      },
      terms: {
        title: "תנאים והגבלות",
        description:
          "כללים לשימוש ב-dexora.app ובאפליקציית הליווי Dexora.",
      },
      contact: {
        title: "יצירת קשר",
        description: "צרו קשר עם צוות Dexora.",
      },
      feedback: {
        title: "משוב",
        description: "שתפו רעיונות, דווחו על באגים או הציעו שיפורים.",
      },
      "delete-account": {
        title: "מחיקת חשבון ונתונים",
        description:
          "מחיקה לצמיתות של חשבון הענן של Dexora והנתונים המשויכים.",
      },
    },
  },
}

function collectLeafPaths(value, prefix = "") {
  if (value === null || typeof value !== "object") return [prefix]
  return Object.entries(value).flatMap(([key, nestedValue]) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key
    return collectLeafPaths(nestedValue, nextPrefix)
  })
}

function assertSameLeafPaths({ source, target, locale }) {
  const sourcePaths = collectLeafPaths(source).sort()
  const targetPaths = collectLeafPaths(target).sort()
  const sourceSet = new Set(sourcePaths)
  const targetSet = new Set(targetPaths)
  const missingPaths = sourcePaths.filter((keyPath) => !targetSet.has(keyPath))
  const extraPaths = targetPaths.filter((keyPath) => !sourceSet.has(keyPath))
  if (!missingPaths.length && !extraPaths.length) return
  throw new Error(
    `[${locale}] Locale shape mismatch\nMissing: ${
      missingPaths.join(", ") || "none"
    }\nExtra: ${extraPaths.join(", ") || "none"}`
  )
}

function deepMerge(base, override) {
  if (override === undefined) return base
  if (typeof override !== "object" || override === null || Array.isArray(override)) {
    return override
  }
  if (typeof base !== "object" || base === null || Array.isArray(base)) {
    return override
  }
  const result = { ...base }
  for (const key of Object.keys(override)) {
    result[key] = deepMerge(base[key], override[key])
  }
  return result
}

async function executeGenerateLandingLocales() {
  const sourceRaw = await fs.readFile(SOURCE_PATH, "utf8")
  const sourceJson = JSON.parse(sourceRaw)

  const locales = Object.keys(LOCALE_OVERRIDES)
  for (const locale of locales) {
    const localeJson = deepMerge(sourceJson, LOCALE_OVERRIDES[locale])
    assertSameLeafPaths({
      source: sourceJson,
      target: localeJson,
      locale,
    })

    const localeDir = path.join(LOCALES_ROOT, locale)
    await fs.mkdir(localeDir, { recursive: true })
    const targetPath = path.join(localeDir, "landing.json")
    await fs.writeFile(targetPath, `${JSON.stringify(localeJson, null, 2)}\n`, "utf8")
  }

  console.log(
    `Generated ${locales.length} locale landing files: ${locales.join(", ")}`
  )
}

executeGenerateLandingLocales().catch((error) => {
  console.error("Failed to generate landing locale files")
  console.error(error)
  process.exit(1)
})
