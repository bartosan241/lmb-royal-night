/**
 * Catalogue LMB ROYAL NIGHT — Bar & Lounge, Libreville.
 * Prix en FCFA (XAF). Les tarifs sont des placeholders réalistes calés sur le
 * marché de Libreville : à valider avec la direction avant mise en ligne.
 */

export const VENUE = {
  name: "LMB",
  full: "LMB Royal Night",
  tagline: "Bar & Lounge",
  city: "Libreville",
  country: "Gabon",
  address: "Quartier Louis — ex Le Manoir, Libreville",
  phone: "+241 74 66 10 10",
  phoneRaw: "24174661010",
  email: "lmbnzenggp@gmail.com",
  instagram: "https://www.instagram.com/lmb_bar_lounge/",
  facebook: "https://www.facebook.com/lmbbarloungegp",
  maps: "https://maps.google.com/?q=Quartier+Louis+Libreville+Gabon",
  hours: [
    { d: "Lundi", h: "Fermé", closed: true },
    { d: "Mardi", h: "18h00 — 02h00" },
    { d: "Mercredi", h: "18h00 — 02h00" },
    { d: "Jeudi", h: "18h00 — 04h00" },
    { d: "Vendredi", h: "18h00 — 06h00" },
    { d: "Samedi", h: "18h00 — 06h00" },
    { d: "Dimanche", h: "16h00 — 02h00" },
  ],
} as const;

export const fcfa = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

/* ------------------------------------------------------------------ */
/*  ESPACES                                                            */
/* ------------------------------------------------------------------ */

export type Espace = {
  id: string;
  name: string;
  subtitle: string;
  capacity: string;
  capMin: number;
  capMax: number;
  minSpend: number;
  image: string;
  perks: string[];
  accent: string;
};

export const ESPACES: Espace[] = [
  {
    id: "lounge",
    name: "Table Lounge",
    subtitle: "L'essentiel, sans compromis",
    capacity: "2 à 4 personnes",
    capMin: 2,
    capMax: 4,
    minSpend: 50000,
    image: "/img/bar-10.jpg",
    accent: "Accès salle",
    perks: [
      "Table réservée jusqu'à 23h30",
      "Service au plateau",
      "Seau de glace offert",
    ],
  },
  {
    id: "chicha",
    name: "Terrasse Chicha",
    subtitle: "À ciel ouvert, à l'abri du bruit",
    capacity: "2 à 6 personnes",
    capMin: 2,
    capMax: 6,
    minSpend: 75000,
    image: "/img/chicha-01.jpg",
    accent: "Extérieur",
    perks: [
      "Chicha premium incluse",
      "Banquettes velours",
      "Carte tapas dédiée",
    ],
  },
  {
    id: "vip",
    name: "Carré VIP",
    subtitle: "Au cœur du son, au-dessus de la foule",
    capacity: "4 à 8 personnes",
    capMin: 4,
    capMax: 8,
    minSpend: 150000,
    image: "/img/bar-09.jpg",
    accent: "Le plus demandé",
    perks: [
      "Carré privatif surélevé",
      "Hôtesse dédiée",
      "Entrée prioritaire (coupe-file)",
      "Seau à champagne & sparklers",
    ],
  },
  {
    id: "royale",
    name: "Loge Royale",
    subtitle: "La signature de la maison",
    capacity: "8 à 14 personnes",
    capMin: 8,
    capMax: 14,
    minSpend: 350000,
    image: "/img/club-08.jpg",
    accent: "Signature",
    perks: [
      "Loge fermée avec vue sur le dancefloor",
      "Majordome de table",
      "Défilé bouteille avec cortège",
      "Voiturier & table décorée",
      "Playlist sur demande auprès du DJ",
    ],
  },
  {
    id: "privatisation",
    name: "Privatisation",
    subtitle: "Le club rien qu'à vous",
    capacity: "20 à 200 personnes",
    capMin: 20,
    capMax: 200,
    minSpend: 1500000,
    image: "/img/club-06.jpg",
    accent: "Sur devis",
    perks: [
      "Salle entière ou espace dédié",
      "DJ, sono & lightshow inclus",
      "Carte et décoration personnalisées",
      "Sécurité et vestiaire privés",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  SEAUX (buckets)                                                    */
/* ------------------------------------------------------------------ */

export type Bouteille = {
  id: string;
  name: string;
  cat: "biere" | "booster" | "premix";
  unit: number;
  vol: string;
  note?: string;
};

export const BOUTEILLES: Bouteille[] = [
  { id: "regab65", name: "Régab 65 cl", cat: "biere", unit: 2000, vol: "65 cl", note: "L'icône nationale" },
  { id: "regab33", name: "Régab 33 cl", cat: "biere", unit: 1500, vol: "33 cl" },
  { id: "castel", name: "Castel Beer", cat: "biere", unit: 2000, vol: "65 cl" },
  { id: "beaufort", name: "Beaufort Lager", cat: "biere", unit: 2500, vol: "65 cl" },
  { id: "doppel", name: "Doppel Munich", cat: "biere", unit: 2500, vol: "65 cl" },
  { id: "export33", name: "33 Export", cat: "biere", unit: 2500, vol: "65 cl" },
  { id: "guinness", name: "Guinness Smooth", cat: "biere", unit: 3000, vol: "33 cl" },
  { id: "heineken", name: "Heineken", cat: "biere", unit: 3500, vol: "33 cl" },
  { id: "desperados", name: "Desperados", cat: "biere", unit: 3500, vol: "33 cl" },

  { id: "booster-blue", name: "Booster Blue Paradise", cat: "booster", unit: 3000, vol: "27,5 cl", note: "Le best-seller" },
  { id: "booster-red", name: "Booster Red Passion", cat: "booster", unit: 3000, vol: "27,5 cl" },
  { id: "booster-green", name: "Booster Green Apple", cat: "booster", unit: 3000, vol: "27,5 cl" },
  { id: "booster-tropical", name: "Booster Tropical", cat: "booster", unit: 3000, vol: "27,5 cl" },
  { id: "booster-gold", name: "Booster Gold", cat: "booster", unit: 3200, vol: "27,5 cl" },

  { id: "smirnoff", name: "Smirnoff Ice", cat: "premix", unit: 3500, vol: "27,5 cl" },
  { id: "xxl", name: "XXL Energy", cat: "premix", unit: 2500, vol: "50 cl" },
  { id: "jack-cola", name: "Jack & Cola", cat: "premix", unit: 4500, vol: "33 cl" },
  { id: "gin-tonic", name: "Gin Tonic pressé", cat: "premix", unit: 4500, vol: "33 cl" },
];

export const CAT_LABEL: Record<Bouteille["cat"], string> = {
  biere: "Bières",
  booster: "Booster",
  premix: "Premix & Energy",
};

export type Seau = {
  id: string;
  name: string;
  count: number;
  desc: string;
  discount: number; // remise appliquée au prix unitaire cumulé
  badge?: string;
  offert?: string;
};

export const SEAUX: Seau[] = [
  {
    id: "seau-6",
    name: "Seau Découverte",
    count: 6,
    desc: "Six bouteilles au choix, glacées, pour ouvrir la soirée.",
    discount: 0.05,
  },
  {
    id: "seau-10",
    name: "Seau Classique",
    count: 10,
    desc: "Dix bouteilles au choix — panachez bières, Booster et premix comme vous voulez.",
    discount: 0.1,
    badge: "Le plus commandé",
    offert: "Planche de nems offerte",
  },
  {
    id: "seau-15",
    name: "Seau Royal",
    count: 15,
    desc: "Quinze bouteilles, seau doré, sparklers à l'arrivée.",
    discount: 0.15,
    offert: "Sparklers + planche mixte offerts",
  },
  {
    id: "seau-24",
    name: "Seau Empereur",
    count: 24,
    desc: "Deux douzaines. Pour les tables qui ne comptent plus.",
    discount: 0.2,
    badge: "Grande tablée",
    offert: "Défilé bouteille + 2 planches offertes",
  },
];

/* ------------------------------------------------------------------ */
/*  CHAMPAGNES & SPIRITUEUX                                            */
/* ------------------------------------------------------------------ */

export type Bottle = {
  id: string;
  name: string;
  house: string;
  price: number;
  vol?: string;
  tag?: string;
  desc?: string;
};

export const CHAMPAGNES: Bottle[] = [
  { id: "belaire-gold", name: "Belaire Gold", house: "Luc Belaire", price: 95000, vol: "75 cl", tag: "Entrée de gamme", desc: "Bulle festive, bouteille dorée, l'incontournable des tables." },
  { id: "belaire-rose", name: "Belaire Rosé", house: "Luc Belaire", price: 95000, vol: "75 cl", desc: "Fruits rouges, robe rose profond." },
  { id: "moet-imperial", name: "Moët Impérial Brut", house: "Moët & Chandon", price: 150000, vol: "75 cl", tag: "Best-seller", desc: "La référence. Poire, brioche, finale nette." },
  { id: "moet-rose", name: "Moët Rosé Impérial", house: "Moët & Chandon", price: 175000, vol: "75 cl", desc: "Fraise des bois et groseille." },
  { id: "moet-ice", name: "Moët Ice Impérial", house: "Moët & Chandon", price: 200000, vol: "75 cl", tag: "Sur glace", desc: "Le seul champagne conçu pour être servi sur glaçons." },
  { id: "veuve", name: "Veuve Clicquot Brut", house: "Veuve Clicquot", price: 165000, vol: "75 cl", desc: "Étiquette jaune, structure vineuse." },
  { id: "ruinart", name: "Ruinart Blanc de Blancs", house: "Ruinart", price: 320000, vol: "75 cl", desc: "Chardonnay pur, agrumes et craie." },
  { id: "dom-perignon", name: "Dom Pérignon Vintage", house: "Moët Hennessy", price: 450000, vol: "75 cl", tag: "Prestige", desc: "Millésime d'exception, longueur infinie." },
  { id: "cristal", name: "Cristal", house: "Louis Roederer", price: 850000, vol: "75 cl", tag: "Prestige", desc: "La bouteille des grandes annonces." },
  { id: "ace", name: "Armand de Brignac Ace of Spades", house: "Armand de Brignac", price: 1200000, vol: "75 cl", tag: "Rare", desc: "Étain doré à la main. L'entrée la plus remarquée de la salle." },
  { id: "moet-magnum", name: "Moët Impérial — Magnum", house: "Moët & Chandon", price: 320000, vol: "1,5 L", tag: "Magnum", desc: "Double format, double effet." },
  { id: "dom-magnum", name: "Dom Pérignon — Magnum", house: "Moët Hennessy", price: 950000, vol: "1,5 L", tag: "Magnum" },
];

export const SPIRITUEUX: Bottle[] = [
  { id: "hennessy-vs", name: "Hennessy V.S", house: "Cognac", price: 90000, vol: "70 cl" },
  { id: "hennessy-vsop", name: "Hennessy V.S.O.P", house: "Cognac", price: 150000, vol: "70 cl", tag: "Populaire" },
  { id: "hennessy-xo", name: "Hennessy X.O", house: "Cognac", price: 450000, vol: "70 cl", tag: "Prestige" },
  { id: "martell-vs", name: "Martell V.S", house: "Cognac", price: 95000, vol: "70 cl" },
  { id: "jack", name: "Jack Daniel's Old N°7", house: "Whiskey", price: 75000, vol: "70 cl" },
  { id: "jameson", name: "Jameson", house: "Whiskey", price: 80000, vol: "70 cl" },
  { id: "chivas12", name: "Chivas Regal 12 ans", house: "Whisky", price: 85000, vol: "70 cl" },
  { id: "chivas18", name: "Chivas Regal 18 ans", house: "Whisky", price: 180000, vol: "70 cl" },
  { id: "jw-black", name: "Johnnie Walker Black Label", house: "Whisky", price: 90000, vol: "70 cl" },
  { id: "jw-blue", name: "Johnnie Walker Blue Label", house: "Whisky", price: 450000, vol: "70 cl", tag: "Prestige" },
  { id: "glenfiddich", name: "Glenfiddich 12 ans", house: "Single Malt", price: 110000, vol: "70 cl" },
  { id: "absolut", name: "Absolut", house: "Vodka", price: 60000, vol: "70 cl" },
  { id: "greygoose", name: "Grey Goose", house: "Vodka", price: 130000, vol: "70 cl", tag: "Populaire" },
  { id: "belvedere", name: "Belvedere", house: "Vodka", price: 140000, vol: "70 cl" },
  { id: "bacardi", name: "Bacardi Carta Blanca", house: "Rhum", price: 65000, vol: "70 cl" },
  { id: "captain", name: "Captain Morgan Spiced", house: "Rhum", price: 70000, vol: "70 cl" },
  { id: "bombay", name: "Bombay Sapphire", house: "Gin", price: 85000, vol: "70 cl" },
  { id: "baileys", name: "Baileys", house: "Liqueur", price: 55000, vol: "70 cl" },
];

/* ------------------------------------------------------------------ */
/*  CARTE — cocktails, tapas, chicha, softs                            */
/* ------------------------------------------------------------------ */

export type Item = { name: string; price: number; desc?: string; tag?: string };

export const COCKTAILS: Item[] = [
  { name: "Royal LMB", price: 12000, desc: "Champagne, liqueur de fruit de la passion, sucre pétillant", tag: "Signature" },
  { name: "Libreville Sunset", price: 9000, desc: "Rhum ambré, mangue, citron vert, angostura" },
  { name: "Ogooué", price: 9000, desc: "Gin, hibiscus, gingembre frais, tonic" },
  { name: "Couronne d'Or", price: 14000, desc: "Cognac, miel, feuille d'or comestible", tag: "Signature" },
  { name: "Mojito Royal", price: 8500, desc: "Rhum blanc, menthe, citron vert, splash de champagne" },
  { name: "Passion Booster", price: 8000, desc: "Vodka, Booster Blue Paradise, fruit de la passion" },
  { name: "Old Fashioned", price: 10000, desc: "Bourbon, sucre de canne, bitters, zeste d'orange" },
  { name: "Espresso Martini", price: 10000, desc: "Vodka, café expresso, liqueur de café" },
  { name: "Piña Colada", price: 8500, desc: "Rhum, ananas frais, lait de coco" },
  { name: "Virgin Ndjolé", price: 5000, desc: "Ananas, gingembre, citron vert, menthe", tag: "Sans alcool" },
];

export const CHICHAS: Item[] = [
  { name: "Chicha Classique", price: 10000, desc: "Double pomme, menthe, raisin ou citron" },
  { name: "Chicha Premium", price: 15000, desc: "Mélange maison, tête en argile, charbon naturel", tag: "Signature" },
  { name: "Chicha Royale", price: 25000, desc: "Base jus de fruit frais ou champagne, fruit évidé" },
  { name: "Recharge charbon", price: 2000 },
];

export const TAPAS: Item[] = [
  { name: "Planche Royale", price: 35000, desc: "Charcuterie, fromages affinés, olives, grissini", tag: "À partager" },
  { name: "Planche Mixte", price: 25000, desc: "Nems, samoussas, ailes de poulet, frites" },
  { name: "Brochettes de bœuf", price: 12000, desc: "Marinade maison, sauce piment doux" },
  { name: "Ailes de poulet BBQ", price: 10000, desc: "12 pièces, sauce au choix" },
  { name: "Gambas grillées", price: 18000, desc: "Ail, persil, citron" },
  { name: "Nems crevettes", price: 8000, desc: "6 pièces, sauce nuoc-mâm" },
  { name: "Frites maison", price: 5000 },
  { name: "Plateau de fruits frais", price: 15000, desc: "Mangue, ananas, pastèque, papaye" },
];

export const SOFTS: Item[] = [
  { name: "Eau minérale Andza", price: 2000, desc: "50 cl / 1,5 L" },
  { name: "Sodas", price: 2500, desc: "Coca-Cola, Fanta, Sprite, Schweppes" },
  { name: "Jus naturels pressés", price: 4000, desc: "Ananas, mangue, corossol, gingembre" },
  { name: "Red Bull", price: 4500 },
  { name: "Djino", price: 2500, desc: "Cocktail, ananas, orange" },
  { name: "Café / Thé", price: 2500 },
];

/* ------------------------------------------------------------------ */
/*  OPTIONS & EXTRAS                                                   */
/* ------------------------------------------------------------------ */

export type Extra = { id: string; name: string; price: number; desc: string; icon: string };

export const EXTRAS: Extra[] = [
  { id: "sparklers", name: "Sparklers", price: 5000, desc: "Cierges magiques sur chaque bouteille servie", icon: "sparkle" },
  { id: "defile", name: "Défilé bouteille", price: 25000, desc: "Cortège d'hôtesses, sirène et projecteur sur votre table", icon: "crown" },
  { id: "led", name: "Message LED personnalisé", price: 15000, desc: "Votre message affiché sur les écrans du club", icon: "message" },
  { id: "gateau", name: "Gâteau d'anniversaire", price: 30000, desc: "Gâteau 8 parts, bougies, service en salle", icon: "cake" },
  { id: "photographe", name: "Photographe de table", price: 40000, desc: "Reportage 1h, photos retouchées livrées sous 48h", icon: "camera" },
  { id: "deco", name: "Décoration de table", price: 20000, desc: "Ballons, fleurs et calligraphie aux couleurs de votre choix", icon: "flower" },
  { id: "voiturier", name: "Voiturier", price: 10000, desc: "Prise en charge du véhicule à l'arrivée", icon: "car" },
  { id: "navette", name: "Navette retour", price: 25000, desc: "Chauffeur privé pour le retour, dans Libreville", icon: "shield" },
];

export const OCCASIONS = [
  "Sortie entre amis",
  "Anniversaire",
  "Enterrement de vie de garçon / jeune fille",
  "Afterwork entreprise",
  "Dîner d'affaires",
  "Retrouvailles / retour au pays",
  "Autre",
];

/* ------------------------------------------------------------------ */
/*  PROGRAMMATION                                                      */
/* ------------------------------------------------------------------ */

export type Soiree = {
  day: string;
  name: string;
  desc: string;
  image: string;
  tag?: string;
};

export const PROGRAMME: Soiree[] = [
  {
    day: "Mardi",
    name: "Rumba & Zouk",
    desc: "Les classiques congolais et antillais, volume conversation. La soirée des connaisseurs.",
    image: "/img/bar-04.jpg",
  },
  {
    day: "Mercredi",
    name: "Karaoké Royal",
    desc: "Micro ouvert, catalogue de 20 000 titres et une bouteille offerte à la meilleure performance.",
    image: "/img/bar-12.jpg",
  },
  {
    day: "Jeudi",
    name: "Afrobeats Night",
    desc: "Burna, Wizkid, Davido, Asake. Le dancefloor ne désemplit pas avant 4h.",
    image: "/img/afro-08.jpg",
    tag: "Forte affluence",
  },
  {
    day: "Vendredi",
    name: "Ladies Night",
    desc: "Coupe de champagne offerte aux dames avant minuit. Dress code soigné exigé.",
    image: "/img/afro-03.jpg",
    tag: "Réservation conseillée",
  },
  {
    day: "Samedi",
    name: "Royal Saturday",
    desc: "La grande nuit. Guest DJ, lightshow complet, défilés bouteilles toute la soirée.",
    image: "/img/club-06.jpg",
    tag: "Complet chaque semaine",
  },
  {
    day: "Dimanche",
    name: "Sunday Chill",
    desc: "Terrasse, chicha, deep house et carte tapas jusqu'à 2h. Le dimanche qu'on n'a pas envie de finir.",
    image: "/img/chicha-04.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  GALERIE & AVIS                                                     */
/* ------------------------------------------------------------------ */

export const GALERIE = [
  { src: "/img/club-06.jpg", alt: "Lightshow doré sur le dancefloor", span: "tall" },
  { src: "/img/champ-01.jpg", alt: "Service champagne au plateau" },
  { src: "/img/bar-09.jpg", alt: "Carré VIP en velours" },
  { src: "/img/club-04.jpg", alt: "Ambiance dancefloor" , span: "wide" },
  { src: "/img/champ-06.jpg", alt: "Bouteille et sparklers" },
  { src: "/img/bar-01.jpg", alt: "Le bar principal et sa cave" , span: "tall" },
  { src: "/img/chicha-01.jpg", alt: "Chicha sur banquette velours" },
  { src: "/img/afro-03.jpg", alt: "Toast entre amis" },
  { src: "/img/cock-04.jpg", alt: "Cocktail signature" },
  { src: "/img/club-05.jpg", alt: "Soirée au comptoir", span: "wide" },
  { src: "/img/champ-10.jpg", alt: "Coupes dorées" },
  { src: "/img/club-12.jpg", alt: "Mains levées sur le dancefloor" },
  { src: "/img/bar-02.jpg", alt: "Salon lounge" },
  { src: "/img/champ-09.jpg", alt: "Sparklers et toast en loge" },
  { src: "/img/bar-10.jpg", alt: "Table lounge intimiste" },
  { src: "/img/afro-12.jpg", alt: "Anniversaire en loge" },
];

/**
 * Pas d'avis clients ni de chiffres de fréquentation ici : tout cela doit venir
 * de la direction (vrais avis Google/Facebook, capacité réelle de la salle).
 * Rien n'est inventé sur cette page.
 */

export const FAQ = [
  {
    q: "Comment fonctionne la réservation ?",
    a: "Vous composez votre table en ligne — espace, seau, bouteilles, options — puis vous validez. Votre demande part directement sur le WhatsApp de la maison. Un responsable vous confirme la table sous 30 minutes pendant les heures d'ouverture.",
  },
  {
    q: "Qu'est-ce qu'un « minimum de consommation » ?",
    a: "C'est le montant minimum à consommer sur la table pour la garder à votre nom. Ce n'est pas un droit d'entrée : la totalité du montant est consommée en boissons et en nourriture. Tout ce que vous commandez y est décompté.",
  },
  {
    q: "Puis-je mélanger les bouteilles dans un seau ?",
    a: "Oui, entièrement. Un seau de 10 peut contenir 4 Régab, 3 Booster Blue Paradise et 3 Smirnoff Ice si vous le souhaitez. Le configurateur calcule le prix en temps réel et applique la remise du format choisi.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Espèces, carte bancaire, Airtel Money et Moov Money sur place. Pour les loges et les privatisations, un acompte par mobile money peut être demandé afin de bloquer la date.",
  },
  {
    q: "Y a-t-il un dress code ?",
    a: "Tenue soignée exigée à partir de 22h. Sont refusés : claquettes, débardeurs et tenues de sport. Le vendredi et le samedi, la direction se réserve le droit d'apprécier la tenue à l'entrée.",
  },
  {
    q: "Jusqu'à quand ma table est-elle gardée ?",
    a: "Les tables sont conservées 45 minutes après l'heure réservée. Au-delà, prévenez-nous par WhatsApp et nous faisons le maximum pour la maintenir.",
  },
  {
    q: "Acceptez-vous les anniversaires et les groupes ?",
    a: "C'est une grande partie de notre activité. Gâteau, sparklers, message LED, défilé bouteille et décoration se commandent directement dans le configurateur, à l'étape « Options ».",
  },
];
