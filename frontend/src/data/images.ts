export type SiteImage = {
  src: string;
  alt: string;
  location: string;
  source?: string;
};

/**
 * Centralized image registry. Photography sourced from Wikimedia Commons
 * (public domain / CC-licensed), self-hosted in /public/images/kashmir.
 * Replace `src` with your own photography at any time — every consumer
 * of this file reads from here, nothing is hardcoded in components.
 */
export const images = {
  hero: {
    src: "/images/kashmir/hero-dal-sunset.jpg",
    alt: "Sunset light over Dal Lake with a lone shikara, Srinagar",
    location: "Dal Lake, Srinagar",
    source: "Wikimedia Commons",
  },

  srinagar: {
    src: "/images/kashmir/srinagar-char-chinar.jpg",
    alt: "Char Chinar island seen from a boat on Dal Lake",
    location: "Char Chinar, Srinagar",
    source: "Wikimedia Commons",
  },
  srinagarOldCity: {
    src: "/images/kashmir/old-srinagar-downtown.jpg",
    alt: "Downtown Srinagar near Zaina Kadal, old city",
    location: "Zaina Kadal, Srinagar",
    source: "Wikimedia Commons",
  },
  srinagarMosque: {
    src: "/images/kashmir/jamia-masjid-courtyard.jpg",
    alt: "Courtyard of Jamia Masjid, Srinagar",
    location: "Jamia Masjid, Srinagar",
    source: "Wikimedia Commons",
  },
  srinagarMosquePortrait: {
    src: "/images/kashmir/jamia-masjid-portrait.jpg",
    alt: "Wooden pillars inside Jamia Masjid, Srinagar",
    location: "Jamia Masjid, Srinagar",
    source: "Wikimedia Commons",
  },
  dalLakeWide: {
    src: "/images/kashmir/dal-lake-wide.jpg",
    alt: "Wide view of Dal Lake with the Zabarwan hills behind",
    location: "Dal Lake, Srinagar",
    source: "Wikimedia Commons",
  },
  dalLakeChinarIslands: {
    src: "/images/kashmir/dal-lake-chinar-islands.jpg",
    alt: "Dal Lake with chinar-covered islands",
    location: "Dal Lake, Srinagar",
    source: "Wikimedia Commons",
  },

  gulmarg: {
    src: "/images/kashmir/gulmarg-apharwat-peak.jpg",
    alt: "Apharwat Peak rising above Gulmarg",
    location: "Apharwat Peak, Gulmarg",
    source: "Wikimedia Commons",
  },
  gulmargSnow: {
    src: "/images/kashmir/gulmarg-snow-footprints.jpg",
    alt: "Footprints across a snow-covered slope in Gulmarg",
    location: "Gulmarg",
    source: "Wikimedia Commons",
  },
  gulmargGondola: {
    src: "/images/kashmir/gulmarg-gondola.jpg",
    alt: "Gondola cable cars over the Himalayas at Gulmarg",
    location: "Gulmarg Gondola, Phase II",
    source: "Wikimedia Commons",
  },
  gulmargMeadow: {
    src: "/images/kashmir/gulmarg-amazing-view.jpg",
    alt: "Green meadow and pine slopes at Gulmarg",
    location: "Gulmarg",
    source: "Wikimedia Commons",
  },

  pahalgam: {
    src: "/images/kashmir/pahalgam-valley.jpg",
    alt: "Morning light over the Pahalgam valley",
    location: "Pahalgam",
    source: "Wikimedia Commons",
  },
  lidderRiver: {
    src: "/images/kashmir/lidder-river-stream.jpg",
    alt: "Clear mountain stream running through the Betaab valley",
    location: "Betaab Valley, Pahalgam",
    source: "Wikimedia Commons",
  },
  aruValley: {
    src: "/images/kashmir/aru-valley.jpg",
    alt: "Wide grassy meadow of Aru Valley near Pahalgam",
    location: "Aru Valley, Pahalgam",
    source: "Wikimedia Commons",
  },
  betaabValley: {
    src: "/images/kashmir/betaab-valley.jpg",
    alt: "Pine-lined slopes of Betaab Valley",
    location: "Betaab Valley, Pahalgam",
    source: "Wikimedia Commons",
  },

  sonamarg: {
    src: "/images/kashmir/sonamarg-valley.jpg",
    alt: "Sonamarg valley framed by high mountains",
    location: "Sonamarg",
    source: "Wikimedia Commons",
  },
  thajiwasGlacier: {
    src: "/images/kashmir/thajiwas-glacier.jpg",
    alt: "Thajiwas Glacier above Sonamarg",
    location: "Thajiwas Glacier, Sonamarg",
    source: "Wikimedia Commons",
  },

  gurez: {
    src: "/images/kashmir/gurez-valley-01.jpg",
    alt: "Remote Gurez Valley along the Kishanganga river",
    location: "Gurez Valley",
    source: "Wikimedia Commons",
  },
  gurezAlt: {
    src: "/images/kashmir/gurez-valley-05.jpg",
    alt: "Mountain village in the Gurez Valley",
    location: "Gurez Valley",
    source: "Wikimedia Commons",
  },

  mughalGarden: {
    src: "/images/kashmir/nishat-bagh-mughal-garden.jpg",
    alt: "Terraced facade of Nishat Bagh, a Mughal-era garden",
    location: "Nishat Bagh, Srinagar",
    source: "Wikimedia Commons",
  },

  houseboat: {
    src: "/images/kashmir/houseboats-dal-lake.jpg",
    alt: "Row of traditional houseboats on Dal Lake",
    location: "Dal Lake, Srinagar",
    source: "Wikimedia Commons",
  },
  shikara: {
    src: "/images/kashmir/shikara-empty-dal-lake.jpg",
    alt: "A single shikara resting on the still water of Dal Lake",
    location: "Dal Lake, Srinagar",
    source: "Wikimedia Commons",
  },
  flowerSeller: {
    src: "/images/kashmir/flower-seller-shikara.jpg",
    alt: "A flower seller paddling between houseboats on Dal Lake",
    location: "Dal Lake, Srinagar",
    source: "Wikimedia Commons",
  },

  artisan: {
    src: "/images/kashmir/artisan-srinagar-shikara.jpg",
    alt: "An artisan selling wood carvings from a shikara",
    location: "Dal Lake, Srinagar",
    source: "Wikimedia Commons",
  },
  driedFruitsMarket: {
    src: "/images/kashmir/dried-fruits-market.jpg",
    alt: "Dried fruits and nuts on display at a Srinagar market",
    location: "Srinagar market",
    source: "Wikimedia Commons",
  },
  wazwan: {
    src: "/images/kashmir/kashmiri-wazwan.jpg",
    alt: "A traditional Kashmiri wazwan spread",
    location: "Kashmiri Wazwan",
    source: "Wikimedia Commons",
  },
  pashmina: {
    src: "/images/kashmir/pashmina-handwoven-craft.jpg",
    alt: "Hands at work on a handwoven pashmina shawl",
    location: "Pashmina craftsmanship, Srinagar",
    source: "Wikimedia Commons",
  },
  chinarAutumn: {
    src: "/images/kashmir/chinar-of-kashmir.jpg",
    alt: "A chinar tree in full autumn colour",
    location: "Kashmir, autumn",
    source: "Wikimedia Commons",
  },
  chinarSquare: {
    src: "/images/kashmir/chinar-tree-square.jpg",
    alt: "The broad canopy of a centuries-old chinar tree",
    location: "Kashmir",
    source: "Wikimedia Commons",
  },
  saffron: {
    src: "/images/kashmir/saffron-pampore.jpg",
    alt: "Saffron crocus flowers in bloom at Pampore",
    location: "Pampore saffron fields",
    source: "Wikimedia Commons",
  },
} as const;

export type ImageKey = keyof typeof images;
