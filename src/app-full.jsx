import { useState, useEffect, useRef } from "react";
import {
  Home, Dumbbell, UtensilsCrossed, Moon, ChefHat,
  Check, Plus, Minus, Flame, Trophy, ChevronDown, Clock, Scale, Sunrise, Play, X, Pencil, Trash2, Sparkles, Camera, Calendar, ShoppingCart, ChevronLeft, ChevronRight, ExternalLink,
  Sun, Cloud, CloudSun, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle
} from "lucide-react";

/* ---------- palette Soft pop : crème chaud, ink, teal profond, corail = action ---------- */
const C = {
  bg: "#FBF4EC", bg2: "#FFFFFF", card: "#FFFFFF", cardHi: "#FFF6EE",
  line: "#EFE6DB", text: "#241712", mut: "#9A8C7E",
  ember: "#F2543D", emberSoft: "rgba(242,84,61,0.12)",
  teal: "#0E9C78", tealSoft: "rgba(14,156,120,0.12)",
  good: "#3DBE93", amber: "#E0A33B", greenVivid: "#10B981",
  coral: "#F2543D",
  peach: "#FBE3D8", peachLine: "#F3CDBE", mint: "#DDF0E6",
  ink: "#241712",
};
/* polices Soft pop */
const FONT_DISPLAY = '"Schibsted Grotesk", system-ui, sans-serif';
const FONT_BODY = '"Onest", system-ui, sans-serif';
const FONT_MONO = '"DM Mono", ui-monospace, monospace';
const TARGETS = { kcal: 2400, protein: 130, carbs: 290, fat: 65 };
/* part des objectifs journaliers visée selon le type de repas */
const MEAL_SHARE = { "Petit déj": 0.25, "Repas": 0.35, "Collation": 0.10, "Dessert": 0.10 };
const idealFor = (style) => {
  const s = MEAL_SHARE[style] ?? 0.35;
  return { share: s, kcal: Math.round(TARGETS.kcal * s), protein: Math.round(TARGETS.protein * s), carbs: Math.round(TARGETS.carbs * s), fat: Math.round(TARGETS.fat * s) };
};
/* "mauvaises choses" : limites journalières indicatives */
const SATFAT_MAX = 22; // g/jour de gras saturés (~<10% des kcal)
const SUGAR_MAX = 50;  // g/jour de sucres
/* zone inversée : plus c'est haut, pire c'est */
function badZone(value, ceiling) {
  const r = ceiling > 0 ? value / ceiling : 0;
  if (r <= 0.6) return { label: "léger", color: C.good };
  if (r <= 1) return { label: "raisonnable", color: C.teal };
  if (r <= 1.4) return { label: "un peu trop", color: C.amber };
  return { label: "ça abuse", color: C.ember };
}

/* ---------- données statiques ---------- */
const SESSIONS = [
  { id: "maisonA", group: "Maison", name: "Maison A", sub: "Plein le corps · ~25 min", ex: [
    { id: "ma1", name: "Squat au poids du corps", scheme: "2 × 12", cue: "Descends comme pour t'asseoir, dos droit, pousse dans les talons.", art: "squat",
      do: ["Pieds largeur d'épaules, pointes légèrement ouvertes", "Pousse les fesses en arrière, dos droit, poitrine ouverte", "Descends cuisses parallèles au sol, poids dans les talons"],
      avoid: ["Genoux qui rentrent vers l'intérieur", "Talons qui décollent du sol", "Dos qui s'arrondit"] },
    { id: "ma2", name: "Pompes inclinées", scheme: "2 × 8-10", cue: "Mains surélevées sur un meuble, corps gainé. Plus haut = plus facile.", tag: "soft", art: "incline",
      do: ["Mains un peu plus larges que les épaules sur un support stable", "Corps gainé en planche, descends la poitrine vers le support", "Coudes à ~45° du corps — plus doux pour l'épaule"],
      avoid: ["Bassin qui s'affaisse ou fesses en l'air", "Descendre trop bas si l'épaule tire", "Coudes écartés à 90°"] },
    { id: "ma3", name: "Rowing élastique", scheme: "2 × 12", cue: "Tire les coudes vers l'arrière, serre les omoplates.", tag: "good", art: "row",
      do: ["Élastique à hauteur de poitrine, bras tendus devant", "Tire les coudes vers l'arrière en serrant les omoplates", "Reviens lentement, en contrôle"],
      avoid: ["Épaules qui montent vers les oreilles", "Dos qui s'arrondit", "Mouvement fait à la va-vite"] },
    { id: "ma4", name: "Rotation externe élastique", scheme: "2 × 12 / bras", cue: "Coude au corps, écarte l'avant-bras. Léger et contrôlé.", tag: "good", art: "extrot",
      do: ["Coude collé au flanc, plié à 90°", "Écarte lentement l'avant-bras vers l'extérieur", "Reste léger et lent — c'est le but"],
      avoid: ["Décoller le coude du corps", "Élastique trop dur", "Geste rapide ou en force"] },
    { id: "ma5", name: "Gainage planche", scheme: "2 × 20-30 s", cue: "Corps aligné, abdos et fessiers serrés.", art: "plank",
      do: ["Coudes sous les épaules, appui avant-bras + pointes de pieds", "Corps parfaitement aligné, abdos et fessiers serrés", "Respire normalement"],
      avoid: ["Fesses en l'air ou dos creusé", "Tête qui pend vers le bas", "Tenir affaissé : 15 s parfaites valent mieux"] },
  ]},
  { id: "maisonB", group: "Maison", name: "Maison B", sub: "Plein le corps · ~25 min", ex: [
    { id: "mb1", name: "Fentes alternées", scheme: "2 × 10 / jambe", cue: "Grand pas, genou arrière vers le sol, buste droit.", art: "lunge",
      do: ["Grand pas en avant, descends les deux genoux", "Genou avant au-dessus de la cheville, buste droit", "Pousse sur le talon avant pour remonter"],
      avoid: ["Genou avant qui dépasse la pointe du pied", "Buste penché en avant", "Pas trop court"] },
    { id: "mb2", name: "Pont fessier", scheme: "2 × 15", cue: "Pousse les hanches vers le haut, serre les fessiers en haut.", art: "bridge",
      do: ["Dos au sol, pieds à plat largeur de bassin", "Pousse dans les talons, monte les hanches", "Serre fort les fessiers en haut, 1 seconde"],
      avoid: ["Pousser avec le bas du dos", "Cambrer les reins", "Monter trop haut"] },
    { id: "mb3", name: "Face pull élastique", scheme: "2 × 15", cue: "Tire vers le visage, coudes hauts. Top pour l'épaule.", tag: "good", art: "facepull",
      do: ["Élastique à hauteur du visage, devant toi", "Tire vers le front, coudes hauts et ouverts", "Serre les omoplates en fin de mouvement"],
      avoid: ["Coudes qui tombent vers le bas", "Hausser les épaules", "Élastique trop dur"] },
    { id: "mb4", name: "Pompes inclinées", scheme: "2 × 8-10", cue: "Comme en séance A.", tag: "soft", art: "incline",
      do: ["Mains un peu plus larges que les épaules sur un support stable", "Corps gainé en planche, descends la poitrine vers le support", "Coudes à ~45° du corps — plus doux pour l'épaule"],
      avoid: ["Bassin qui s'affaisse ou fesses en l'air", "Descendre trop bas si l'épaule tire", "Coudes écartés à 90°"] },
    { id: "mb5", name: "Pallof press élastique", scheme: "2 × 10 / côté", cue: "Élastique sur le côté, tends les bras devant sans tourner le buste.", art: "pallof",
      do: ["Élastique fixé sur le côté, à hauteur de poitrine", "Tends les bras droit devant, puis reviens", "Garde le buste face à l'avant, sans tourner"],
      avoid: ["Laisser le buste pivoter vers l'élastique", "Cambrer le dos", "Bras trop relâchés"] },
  ]},
  { id: "upperA", group: "Programme salle", name: "Haut A", sub: "Basic Fit · ~45 min", ex: [
    { id: "ua1", name: "Tirage vertical poulie (prise neutre)", scheme: "3 × 10", cue: "Machine lat pulldown. Tire vers la poitrine, omoplates basses.", tag: "good" },
    { id: "ua2", name: "Rowing assis machine", scheme: "3 × 10", cue: "Tire vers le ventre, dos droit.", tag: "good" },
    { id: "ua3", name: "Développé pec machine (léger)", scheme: "3 × 10", cue: "Chest press. Amplitude contrôlée, ne force pas en arrière.", tag: "soft" },
    { id: "ua4", name: "Face pull poulie", scheme: "3 × 15", cue: "Corde en haut, tire vers le visage.", tag: "good" },
    { id: "ua5", name: "Rotation externe poulie", scheme: "3 × 12", cue: "Coiffe des rotateurs. Léger.", tag: "good" },
    { id: "ua6", name: "Curl biceps haltères", scheme: "3 × 12", cue: "Coudes collés au corps." },
  ]},
  { id: "lowerA", group: "Programme salle", name: "Bas A", sub: "Basic Fit · ~45 min", ex: [
    { id: "la1", name: "Presse à cuisses", scheme: "3 × 12", cue: "Pieds largeur bassin, ne verrouille pas les genoux." },
    { id: "la2", name: "Leg curl (ischios)", scheme: "3 × 12", cue: "Contrôle la descente." },
    { id: "la3", name: "Fentes ou split squat", scheme: "2 × 10 / jambe", cue: "Haltères légers le long du corps." },
    { id: "la4", name: "Mollets debout", scheme: "3 × 15", cue: "Talon bien bas pour étirer." },
    { id: "la5", name: "Gainage + Pallof", scheme: "3 × 30 s", cue: "Anti-rotation, abdos serrés." },
  ]},
  { id: "upperB", group: "Programme salle", name: "Haut B", sub: "Basic Fit · ~45 min", ex: [
    { id: "ub1", name: "Développé épaules machine (devant, léger)", scheme: "3 × 10", cue: "Jamais derrière la nuque.", tag: "soft" },
    { id: "ub2", name: "Tirage horizontal poulie", scheme: "3 × 10", cue: "Serre les omoplates.", tag: "good" },
    { id: "ub3", name: "Pompes", scheme: "3 × max contrôlé", cue: "Amplitude que tu maîtrises.", tag: "soft" },
    { id: "ub4", name: "Oiseau / rear delts", scheme: "3 × 15", cue: "Buste penché, écarte les bras.", tag: "good" },
    { id: "ub5", name: "Extensions triceps poulie", scheme: "3 × 12", cue: "Coudes fixes." },
  ]},
  { id: "lowerB", group: "Programme salle", name: "Bas B", sub: "Basic Fit · ~45 min", ex: [
    { id: "lb1", name: "Hack squat ou goblet squat", scheme: "3 × 12", cue: "Dos calé, descends bas et contrôlé." },
    { id: "lb2", name: "Soulevé de terre roumain léger", scheme: "3 × 10", cue: "Charge légère, dos droit, prise sans forcer l'épaule." },
    { id: "lb3", name: "Extensions quadriceps", scheme: "3 × 12", cue: "Pause en haut." },
    { id: "lb4", name: "Relevés de genoux / crunch poulie", scheme: "3 × 12", cue: "Souffle en remontant." },
    { id: "lb5", name: "Mollets", scheme: "3 × 15", cue: "Amplitude complète." },
  ]},
];

/* ---------- Exercices : durée, catégorie, liste maître ---------- */
const exSlug = (name) => (name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function exDur(e) {
  if (e && e.dur != null) return e.dur;
  const sch = (e && e.scheme) || "";
  const m = sch.match(/(\d+)\s*[×x]/);
  const sets = m ? parseInt(m[1], 10) : 3;
  const timed = /\bs\b|sec|min/.test(sch);
  const d = timed ? sets * 1.5 + 1 : sets * 2 + 1;
  return Math.max(3, Math.min(12, Math.round(d)));
}
function exCat(e) {
  const n = ((e && e.name) || "").toLowerCase();
  if (/(squat|fente|presse|jambe|mollet|quadri|ischio|hack|goblet|pont fessier|souleve|soulevé|leg|split)/.test(n)) return "Jambes";
  if (/(pompe|developpe pec|développé pec|chest|pec)/.test(n)) return "Pecs";
  if (/(tirage|rowing|row|traction|dos)/.test(n)) return "Dos";
  if (/(epaule|épaule|oiseau|rear delt|face pull|elevation|élévation|delts)/.test(n)) return "Épaules";
  if (/(rotation externe|coiffe|rotateur)/.test(n)) return "Coiffe";
  if (/(curl|biceps)/.test(n)) return "Biceps";
  if (/(triceps|extension triceps)/.test(n)) return "Triceps";
  if (/(gainage|planche|pallof|crunch|abdo|genoux|releve|relevé)/.test(n)) return "Gainage";
  return "Autre";
}
function normalizeSession(s) {
  return { ...s, ex: (s.ex || []).map(e => ({ ...e, exKey: e.exKey || exSlug(e.name), dur: e.dur != null ? e.dur : exDur(e) })) };
}
const sessionDur = (s) => (s.ex || []).reduce((a, e) => a + (e.dur != null ? e.dur : exDur(e)), 0);
const EXERCISES = (() => {
  const seen = {}; const out = [];
  for (const s of SESSIONS) for (const e of s.ex) {
    const k = exSlug(e.name);
    if (seen[k]) continue; seen[k] = 1;
    out.push({ ...e, exKey: k, dur: exDur(e), cat: exCat(e) });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name, "fr"));
})();
const EX_CATS = [...new Set(EXERCISES.map(e => e.cat))];

const QUICK_FOODS = [
  { n: "Œuf", p: 6, c: 0.5, f: 5 },
  { n: "100 g poulet", p: 30, c: 0, f: 3 },
  { n: "100 g bœuf", p: 26, c: 0, f: 8 },
  { n: "100 g saumon", p: 22, c: 0, f: 13 },
  { n: "Yaourt grec", p: 10, c: 6, f: 4 },
  { n: "Fromage blanc 150 g", p: 12, c: 6, f: 4 },
  { n: "Shake whey", p: 25, c: 3, f: 2 },
  { n: "Thon (boîte)", p: 25, c: 0, f: 1 },
  { n: "100 g riz cuit", p: 3, c: 28, f: 0 },
  { n: "100 g pâtes cuites", p: 5, c: 25, f: 1 },
  { n: "Tranche de pain", p: 3, c: 15, f: 1 },
  { n: "Banane", p: 1, c: 27, f: 0 },
  { n: "Pomme", p: 0, c: 25, f: 0 },
  { n: "Avocat ½", p: 1, c: 4, f: 11 },
  { n: "1 c.à.s huile", p: 0, c: 0, f: 14 },
  { n: "Poignée de noix", p: 5, c: 4, f: 18 },
];

/* classe une valeur par rapport à sa cible : à compléter → bonne voie → cible → trop → dépassement */
function zone(value, target) {
  const r = target > 0 ? value / target : 0;
  if (r < 0.5) return { label: "à compléter", color: C.mut };
  if (r < 0.85) return { label: "en bonne voie", color: C.teal };
  if (r <= 1.1) return { label: "dans la cible", color: C.good };
  if (r <= 1.3) return { label: "un peu trop", color: C.amber };
  return { label: "dépassement", color: C.ember };
}

const RECIPES = [
  { id: "r1", style: "Repas", title: "Poulet tikka express", protein: 48, carbs: 55, fat: 14, serves: 2,
    ing: ["350 g de poulet en cubes", "3 c.à.s de yaourt grec", "2 c.à.c de pâte ou poudre tikka", "1 gousse d'ail, gingembre râpé", "Riz basmati", "Coriandre fraîche"],
    steps: ["Mélange poulet + yaourt + épices + ail/gingembre, laisse 15 min.", "Poêle bien chaude, saisis le poulet 8-10 min jusqu'à coloration.", "Sers sur riz basmati, coriandre dessus."] },
  { id: "r2", style: "Repas", title: "Chili con carne", protein: 42, carbs: 50, fat: 16, serves: 2,
    ing: ["300 g de bœuf haché 5%", "1 boîte haricots rouges", "1 boîte tomates concassées", "1 oignon, 1 poivron", "Cumin, paprika fumé, piment", "Riz ou tortillas"],
    steps: ["Fais revenir oignon + poivron, ajoute le bœuf.", "Épices, tomates, haricots. Laisse mijoter 20 min.", "Sers avec riz. Un peu de fromage blanc dessus pour la fraîcheur."] },
  { id: "r3", style: "Repas", title: "Saumon rôti, courgettes & quinoa", protein: 40, carbs: 45, fat: 22, serves: 2,
    ing: ["2 pavés de saumon", "2 courgettes", "Tomates cerises", "Quinoa", "Huile d'olive, ail, citron, herbes de Provence"],
    steps: ["Quinoa à cuire selon le paquet.", "Légumes + huile d'olive + ail au four 20 min à 200°C.", "Ajoute le saumon les 12 dernières min. Citron au moment de servir."] },
  { id: "r4", style: "Repas", title: "Boulettes de dinde façon grecque", protein: 45, carbs: 40, fat: 16, serves: 2,
    ing: ["350 g dinde hachée", "1 œuf, ail, origan, persil", "Tzatziki (yaourt grec, concombre, ail)", "Pita ou riz", "Salade tomate-concombre"],
    steps: ["Mélange dinde + œuf + ail + herbes, forme des boulettes.", "Cuis 12 min à la poêle, à feu moyen.", "Sers avec tzatziki, pita et salade."] },
  { id: "r5", style: "Repas", title: "Wok de bœuf brocoli", protein: 44, carbs: 55, fat: 16, serves: 2,
    ing: ["300 g de bœuf émincé", "1 brocoli", "Sauce soja, gingembre, ail", "1 c.à.c de miel", "Riz", "Graines de sésame"],
    steps: ["Riz à cuire. Brocoli 3 min à la vapeur.", "Wok très chaud : saisis le bœuf 2 min, retire.", "Ail/gingembre, soja + miel, remets bœuf + brocoli 2 min. Sésame, riz."] },
  { id: "r6", style: "Repas", title: "Poulet teriyaki & edamame", protein: 46, carbs: 60, fat: 12, serves: 2,
    ing: ["350 g de poulet", "Sauce soja, miel, ail, gingembre", "Edamame", "Nouilles ou riz", "Oignon vert"],
    steps: ["Saisis le poulet en morceaux 8 min.", "Ajoute soja + miel + ail/gingembre, laisse réduire et napper.", "Sers avec nouilles, edamame et oignon vert."] },
  { id: "r7", style: "Repas", title: "Gratin pâtes poulet-épinards", protein: 43, carbs: 65, fat: 20, serves: 2,
    ing: ["350 g de poulet", "Pâtes", "Épinards", "Fromage blanc + un peu de crème légère", "Ail, parmesan", "Mozzarella râpée"],
    steps: ["Pâtes al dente. Poêle le poulet avec l'ail.", "Mélange pâtes + poulet + épinards + sauce fromage blanc/crème.", "Plat à gratin, mozza dessus, four 15 min à 200°C."] },
  { id: "r8", style: "Repas", title: "Hachis parmentier maison", protein: 40, carbs: 50, fat: 18, serves: 2,
    ing: ["300 g de bœuf haché 5%", "Purée de pommes de terre", "1 oignon, ail", "Concentré de tomate, thym", "Un peu de gruyère"],
    steps: ["Revenir oignon + bœuf + ail, concentré de tomate, thym.", "Plat : bœuf au fond, purée au-dessus, gruyère.", "Four 20 min à 200°C jusqu'à coloration."] },
];

const CHECKLIST = [
  "4 séances cette semaine, même courtes",
  "Une protéine à chaque repas",
  "Un meal-prep le dimanche",
  "Fast food : 1 fois max",
  "Prendre RDV contrôle chirurgien",
];

/* ---------- moteur nutritionnel : macros calculées depuis les ingrédients ---------- */
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/œ/g, "oe").replace(/æ/g, "ae");
const FOODS = [
  { k: ["blanc de poulet", "escalope de poulet", "poulet"], per100: { p: 23, c: 0, f: 2 }, piece: 150 },
  { k: ["dinde"], per100: { p: 22, c: 0, f: 2 }, piece: 150 },
  { k: ["boeuf", "steak hache", "viande hachee", "hache", "bavette", "bourguignon"], per100: { p: 20, c: 0, f: 8 }, piece: 125 },
  { k: ["veau"], per100: { p: 21, c: 0, f: 5 }, piece: 125 },
  { k: ["porc", "filet mignon", "echine", "cote de porc"], per100: { p: 21, c: 0, f: 7 }, piece: 125 },
  { k: ["agneau", "mouton"], per100: { p: 18, c: 0, f: 17 }, piece: 125 },
  { k: ["canard", "magret"], per100: { p: 19, c: 0, f: 15 }, piece: 150 },
  { k: ["saucisse", "merguez", "chipolata"], per100: { p: 13, c: 2, f: 25 }, portion: 80 },
  { k: ["lardon", "bacon"], per100: { p: 14, c: 1, f: 30 }, portion: 40 },
  { k: ["chorizo"], per100: { p: 24, c: 2, f: 38 }, portion: 30 },
  { k: ["cabillaud", "colin", "lieu", "merlu", "poisson blanc", "poisson"], per100: { p: 18, c: 0, f: 1 }, piece: 140 },
  { k: ["tofu"], per100: { p: 8, c: 2, f: 5 }, portion: 150 },
  { k: ["pain a burger", "pain burger", "pain hamburger", "burger", "bun"], per100: { p: 9, c: 47, f: 6 }, portion: 70 },
  { k: ["cheddar"], per100: { p: 25, c: 2, f: 33 }, portion: 30 },
  { k: ["frite"], per100: { p: 3, c: 35, f: 15 }, portion: 150 },
  { k: ["ketchup"], per100: { p: 1, c: 25, f: 0 }, tbsp: 17 },
  { k: ["mayonnaise", "mayo"], per100: { p: 1, c: 1, f: 75 }, tbsp: 14 },
  { k: ["mais"], per100: { p: 3, c: 19, f: 1 }, portion: 80 },
  { k: ["petit pois", "petits pois"], per100: { p: 5, c: 14, f: 0.4 }, portion: 80 },
  { k: ["aubergine"], per100: { p: 1, c: 6, f: 0.2 }, unit: 250 },
  { k: ["chou-fleur", "chou fleur", "chou"], per100: { p: 2, c: 5, f: 0.3 }, portion: 150 },
  { k: ["saumon"], per100: { p: 20, c: 0, f: 13 }, piece: 140 },
  { k: ["thon"], per100: { p: 26, c: 0, f: 1 }, can: 110 },
  { k: ["crevette"], per100: { p: 20, c: 0, f: 1 }, portion: 120 },
  { k: ["jambon"], per100: { p: 18, c: 1, f: 5 }, portion: 50 },
  { k: ["oeuf"], unitMacro: { p: 6, c: 0.5, f: 5 } },
  { k: ["lentille"], per100: { p: 9, c: 20, f: 0.5 }, portion: 150 },
  { k: ["pois chiche"], per100: { p: 9, c: 27, f: 3 }, can: 240 },
  { k: ["edamame"], per100: { p: 11, c: 9, f: 5 }, portion: 80 },
  { k: ["yaourt grec", "yaourt"], per100: { p: 9, c: 4, f: 5 }, portion: 150 },
  { k: ["fromage blanc"], per100: { p: 8, c: 4, f: 3 }, portion: 150 },
  { k: ["mozzarella", "mozza"], per100: { p: 18, c: 2, f: 17 }, portion: 50 },
  { k: ["parmesan"], per100: { p: 33, c: 0, f: 29 }, portion: 15 },
  { k: ["gruyere", "emmental", "fromage rape", "fromage"], per100: { p: 27, c: 1, f: 28 }, portion: 30 },
  { k: ["feta"], per100: { p: 14, c: 4, f: 21 }, portion: 40 },
  { k: ["creme"], per100: { p: 2, c: 3, f: 20 }, portion: 30 },
  { k: ["lait"], per100: { p: 3, c: 5, f: 2 } },
  { k: ["beurre"], per100: { p: 1, c: 0, f: 81 }, portion: 10 },
  { k: ["riz basmati", "riz"], per100: { p: 7, c: 78, f: 1 }, portion: 65 },
  { k: ["pates", "spaghetti", "tagliatelle", "nouille", "penne", "macaroni"], per100: { p: 12, c: 72, f: 1.5 }, portion: 80 },
  { k: ["quinoa"], per100: { p: 14, c: 64, f: 6 }, portion: 65 },
  { k: ["semoule", "boulgour", "couscous"], per100: { p: 12, c: 72, f: 1.5 }, portion: 65 },
  { k: ["pomme de terre", "pommes de terre", "puree", "patate"], per100: { p: 2, c: 17, f: 0.1 }, portion: 200 },
  { k: ["patate douce"], per100: { p: 1.6, c: 20, f: 0.1 }, portion: 200 },
  { k: ["pita", "tortilla", "pain"], per100: { p: 8, c: 50, f: 3 }, portion: 60 },
  { k: ["miel", "sirop d'erable"], per100: { p: 0, c: 80, f: 0 }, tbsp: 21 },
  { k: ["sucre"], per100: { p: 0, c: 100, f: 0 }, tbsp: 12 },
  { k: ["brocoli"], per100: { p: 3, c: 7, f: 0.4 }, unit: 300 },
  { k: ["courgette"], per100: { p: 1, c: 3, f: 0.3 }, unit: 200 },
  { k: ["haricots verts", "haricot vert"], per100: { p: 2, c: 7, f: 0.2 }, portion: 150 },
  { k: ["tomates concassees", "tomate concassee", "concassees", "tomate"], per100: { p: 1, c: 4, f: 0.2 }, can: 400, unit: 120 },
  { k: ["tomates cerises", "tomate cerise"], per100: { p: 1, c: 4, f: 0.2 }, portion: 100 },
  { k: ["oignon", "echalote"], per100: { p: 1, c: 9, f: 0.1 }, unit: 110 },
  { k: ["poivron"], per100: { p: 1, c: 6, f: 0.2 }, unit: 150 },
  { k: ["champignon"], per100: { p: 3, c: 3, f: 0.3 }, portion: 100 },
  { k: ["carotte"], per100: { p: 1, c: 9, f: 0.2 }, unit: 80 },
  { k: ["epinard"], per100: { p: 3, c: 1, f: 0.4 }, portion: 100 },
  { k: ["haricots rouges", "haricot rouge"], per100: { p: 8, c: 20, f: 0.5 }, can: 240 },
  { k: ["concombre"], per100: { p: 1, c: 3, f: 0.1 }, unit: 300 },
  { k: ["salade", "laitue", "roquette"], per100: { p: 1, c: 2, f: 0.2 }, portion: 50 },
  { k: ["avocat"], per100: { p: 2, c: 9, f: 15 }, unit: 150 },
  { k: ["gingembre"], per100: { p: 2, c: 18, f: 0.8 }, portion: 8 },
  { k: ["ail", "gousse"], per100: { p: 6, c: 33, f: 0.5 }, clove: 5 },
  { k: ["coriandre", "persil", "origan", "thym", "basilic", "ciboulette", "herbe"], per100: { p: 3, c: 7, f: 0.5 }, portion: 4 },
  { k: ["huile"], per100: { p: 0, c: 0, f: 100 }, tbsp: 14 },
  { k: ["sauce soja", "soja"], per100: { p: 8, c: 5, f: 0 }, tbsp: 16 },
  { k: ["graines de sesame", "sesame"], per100: { p: 18, c: 23, f: 50 }, tbsp: 9 },
  { k: ["noix", "amande", "noisette"], per100: { p: 15, c: 14, f: 60 }, portion: 30 },
  { k: ["tzatziki"], per100: { p: 4, c: 4, f: 6 }, portion: 60 },
  { k: ["citron"], per100: { p: 1, c: 9, f: 0.3 }, unit: 60 },
  { k: ["tikka", "curry", "paprika", "cumin", "piment", "epice", "sel", "poivre", "moutarde"], per100: { p: 0, c: 0, f: 0 }, portion: 2 },
];
function parseQty(n) {
  let m = n.match(/(\d+)\s*\/\s*(\d+)/); if (m) return parseInt(m[1]) / parseInt(m[2]);
  m = n.match(/(\d+([.,]\d+)?)/); if (m) return parseFloat(m[1].replace(",", "."));
  return null;
}
function unitToGrams(n, qty, food) {
  if (/\bkg\b/.test(n)) return qty * 1000;
  if (/\b(g|gr|gramme|grammes)\b/.test(n)) return qty;
  if (/\bcl\b/.test(n)) return qty * 10;
  if (/\b(l|litre|litres)\b/.test(n)) return qty * 1000;
  if (/\bml\b/.test(n)) return qty;
  if (/(c\.?\s?a\.?\s?s|cuillere[s]? a soupe|\bcs\b)/.test(n)) return qty * (food.tbsp || 15);
  if (/(c\.?\s?a\.?\s?c|cuillere[s]? a cafe|\bcc\b)/.test(n)) return qty * (food.tsp || 5);
  if (/(boite|conserve|cannette)/.test(n)) return qty * (food.can || 400);
  if (/(pave|filet|escalope|steak|darne)/.test(n)) return qty * (food.piece || 150);
  if (/(gousse)/.test(n)) return qty * (food.clove || 5);
  if (/(tranche)/.test(n)) return qty * 30;
  if (/(pincee)/.test(n)) return qty * 1;
  if (/(poignee)/.test(n)) return qty * 30;
  if (food.unit) return qty * food.unit;
  if (food.piece) return qty * food.piece;
  if (food.portion) return qty * food.portion;
  return qty;
}
function lineMacros(line, serves) {
  const n = norm(line); let food = null, kl = 0;
  for (const fd of FOODS) for (const kw of fd.k) { const k = norm(kw); if (n.includes(k) && k.length > kl) { food = fd; kl = k.length; } }
  if (!food) return { p: 0, c: 0, f: 0, matched: false };
  const qty = parseQty(n);
  if (food.unitMacro) { const cnt = qty == null ? 1 : qty; return { p: food.unitMacro.p * cnt, c: food.unitMacro.c * cnt, f: food.unitMacro.f * cnt, matched: true }; }
  let g;
  if (qty == null) { if (food.portion != null) g = food.portion * serves; else if (food.unit != null) g = food.unit; else if (food.can != null) g = food.can; else return { p: 0, c: 0, f: 0, matched: true }; }
  else g = unitToGrams(n, qty, food);
  const m = food.per100; return { p: m.p * g / 100, c: m.c * g / 100, f: m.f * g / 100, matched: true };
}
function recipeMacros(ingText) {
  let p = 0, c = 0, f = 0, unmatched = 0, total = 0;
  for (const line of (ingText || "").split("\n")) { if (!line.trim()) continue; total++; const m = lineMacros(line, 1); if (!m.matched) unmatched++; p += m.p; c += m.c; f += m.f; }
  return { protein: Math.round(p), carbs: Math.round(c), fat: Math.round(f), satfat: Math.round(f * 0.4), sugar: null, unmatched, total };
}

/* macros calculées par l'IA — fiable sur n'importe quel ingrédient */
async function callModel(prompt) {
  let apiKey = await getDeepSeekKey();
  if (!apiKey) {
    try { const k = typeof prompt !== "undefined" ? prompt("Clé API DeepSeek") : null; if (k && k.trim()) setDeepSeekKey(k.trim()); } catch {}
    apiKey = await getDeepSeekKey();
    if (!apiKey) throw new Error("Clé API requise. Ouvre ⚙️ Clé API DeepSeek sur l'accueil.");
  }
  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", "authorization": "Bearer " + apiKey },
    body: JSON.stringify({ model: "deepseek-chat", max_tokens: 1024, temperature: 0, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) { 
    const t = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("Clé API DeepSeek invalide. Mets-la à jour dans ⚙️ Clé API.");
    throw new Error("API DeepSeek erreur " + res.status + ": " + t.slice(0, 150));
  }
  const data = await res.json();
  if (!data || !data.choices || !data.choices.length) throw new Error("Réponse DeepSeek vide");
  const text = data.choices[0].message?.content || "";
  if (!text) throw new Error("Réponse DeepSeek sans contenu");
  return text;
}


async function aiMacros(ingText) {
  const prompt = `Tu es nutritionniste. Calcule les valeurs nutritionnelles totales de cette recette pour UNE personne (les quantités ci-dessous sont pour une personne).
Ingrédients (un par ligne) :
${ingText}

Règles :
- Si la quantité d'un ingrédient n'est pas précisée, suppose une portion réaliste standard pour une personne (ex. un steak ~125 g, un pain à burger ~75 g, une portion de frites ~150 g).
- Additionne les macros de tous les ingrédients.
- Donne des entiers réalistes en grammes.
- "satfat" = grammes de graisses saturées ; "sugar" = grammes de sucres.
Réponds STRICTEMENT par un objet JSON sur une seule ligne, sans aucun texte autour ni backticks :
{"protein": <entier>, "carbs": <entier>, "fat": <entier>, "satfat": <entier>, "sugar": <entier>}`;
  const text = await callModel(prompt);
  // Extraire le dernier objet JSON (le plus complet)
  const matches = text.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
  if (!matches || !matches.length) throw new Error("réponse illisible: " + text.slice(0,100));
  const j = JSON.parse(matches[matches.length - 1]);
  return { protein: Math.round(+j.protein || 0), carbs: Math.round(+j.carbs || 0), fat: Math.round(+j.fat || 0), satfat: Math.round(+j.satfat || 0), sugar: Math.round(+j.sugar || 0) };
}

/* vision IA : estime le plat et ses macros à partir d'une photo */
async function aiMealFromPhoto(base64, mediaType) {
  let apiKey = window._ztlGeminiKey;
  if (!apiKey) {
    try { apiKey = await store.get("_ztlGeminiKey"); if (apiKey) { window._ztlGeminiKey = apiKey; } } catch {}
  }
  if (!apiKey) throw new Error("Clé Gemini requise. ⚙️ Clés API sur l'accueil.");
  
  const models = ["gemini-1.5-flash-8b", "gemini-1.5-flash"];
  let lastErr;
  
  for (const model of models) {
    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [
            { inlineData: { mimeType: mediaType, data: base64 } },
            { text: "Analyse ce plat. Réponds UNIQUEMENT par un objet JSON: {\"plat\":\"nom\",\"protein\":g,\"carbs\":g,\"fat\":g}" }
          ]}]
        }),
      });
      if (res.status === 429 || res.status === 403) { const t = await res.text().catch(()=>""); lastErr = new Error("Erreur " + res.status + ": " + t.slice(0,100)); continue; }
      if (!res.ok) { const t = await res.text().catch(()=>""); lastErr = new Error("Erreur " + res.status); continue; }
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const clean = text.replace(/```json\n?|```/g, "").trim();
      const mt = clean.match(/\{[^}]*\}/);
      if (!mt) { lastErr = new Error("Réponse illisible"); continue; }
      const j = JSON.parse(mt[0]);
      return { plat: j.plat || "Plat", protein: Math.round(+j.protein || 0), carbs: Math.round(+j.carbs || 0), fat: Math.round(+j.fat || 0) };
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error("Analyse photo indisponible");
}


/* unités reconnues pour additionner les quantités localement */
const SHOP_UNITS = {
  g: { cls: "mass", f: 1 }, gr: { cls: "mass", f: 1 }, gramme: { cls: "mass", f: 1 }, grammes: { cls: "mass", f: 1 },
  kg: { cls: "mass", f: 1000 }, mg: { cls: "mass", f: 0.001 },
  ml: { cls: "vol", f: 1 }, cl: { cls: "vol", f: 10 }, dl: { cls: "vol", f: 100 }, l: { cls: "vol", f: 1000 }, litre: { cls: "vol", f: 1000 }, litres: { cls: "vol", f: 1000 },
};
const fmtMass = (g) => (g >= 1000 ? (Math.round(g / 100) / 10) + " kg" : Math.round(g) + " g");
const fmtVol = (ml) => (ml >= 1000 ? (Math.round(ml / 100) / 10) + " l" : Math.round(ml) + " ml");

/* multiplie la quantité en tête de ligne (pour les courses, ex. ×1,75 si Juliette mange aussi) */
function scaleLine(line, factor) {
  if (!factor || factor === 1) return line;
  const m = (line || "").match(/^(\s*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return line;
  const n = parseFloat(m[2].replace(",", ".")) * factor;
  const r = Math.round(n * 100) / 100;
  return m[1] + (Number.isInteger(r) ? String(r) : String(r)) + m[3];
}

/* agrège des lignes d'ingrédients en sommant réellement les quantités (sans IA) */
function localAggregate(lines) {
  const groups = {};
  for (const raw of lines) {
    const line = (raw || "").trim();
    if (!line) continue;
    const m = line.match(/^(\d+(?:[.,]\d+)?)\s*([^\s\d]+)?\s*(.*)$/);
    if (!m) { const k = "x:" + norm(line); (groups[k] = groups[k] || { cls: "txt", name: line, val: 0 }).val += 1; continue; }
    const num = parseFloat(m[1].replace(",", "."));
    const tok = (m[2] || "").toLowerCase().replace(/\.$/, "");
    const rest = (m[3] || "").trim();
    const u = SHOP_UNITS[tok];
    if (u) {
      const name = rest || tok;
      const k = u.cls + ":" + norm(name);
      (groups[k] = groups[k] || { cls: u.cls, name, val: 0 }).val += num * u.f;
    } else {
      const name = ((tok ? tok + " " : "") + rest).trim() || line;
      const k = "count:" + norm(name);
      (groups[k] = groups[k] || { cls: "count", name, val: 0 }).val += num;
    }
  }
  return Object.values(groups).map(g => {
    if (g.cls === "mass") return { item: g.name, qty: fmtMass(g.val) };
    if (g.cls === "vol") return { item: g.name, qty: fmtVol(g.val) };
    if (g.cls === "count") return { item: g.name, qty: String(Math.round(g.val * 100) / 100) };
    return { item: g.name, qty: "" };
  });
}

/* IA : regroupe et additionne les ingrédients en une liste de courses */
async function aiShoppingList(lines) {
  const prompt = `Voici des ingrédients issus de plusieurs recettes planifiées (avec doublons possibles).
Regroupe les ingrédients IDENTIQUES en additionnant leurs quantités, et produis une liste de courses claire et compacte.
- Additionne les quantités de même unité (ex. 350 g + 200 g = 550 g).
- Garde des unités lisibles (g, kg, ml, pièces, boîtes...).
- Un même aliment ne doit apparaître qu'une seule fois.
Réponds STRICTEMENT par un tableau JSON sur une seule ligne, sans texte ni backticks :
[{"item":"<nom>","qty":"<quantité agrégée ou ''>"}]

Ingrédients :
${lines.join("\n")}`;
  const text = await callModel(prompt);
  const matches = text.match(/\[[\s\S]*\]/g);
  if (!matches || !matches.length) throw new Error("réponse illisible");
  const arr = JSON.parse(matches[matches.length - 1]);
  return Array.isArray(arr) ? arr.map(x => ({ item: String(x.item || "").trim(), qty: String(x.qty || "").trim() })).filter(x => x.item) : [];
}

const mem = {};
const store = {
  async get(k) {
    try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; }
    catch { return k in mem ? mem[k] : null; }
  },
  async set(k, v) {
    mem[k] = v;
    try { await window.storage.set(k, JSON.stringify(v)); } catch {}
  },
  async del(k) {
    delete mem[k];
    try { await window.storage.delete(k); } catch {}
  },
  async list(prefix) {
    try { const r = await window.storage.list(prefix); return r ? r.keys : []; }
    catch { return Object.keys(mem).filter(x => x.startsWith(prefix)); }
  },
};


const getDeepSeekKey = async () => {
  if (typeof window !== "undefined") {
    if (window._ztlDeepSeekKey) return window._ztlDeepSeekKey;
    try { const k = localStorage.getItem("_ztlDeepSeekKey"); if (k) { window._ztlDeepSeekKey = k; return k; } } catch {}
    try { const v = await store.get("_ztlDeepSeekKey"); if (v) { window._ztlDeepSeekKey = v; localStorage.setItem("_ztlDeepSeekKey", v); return v; } } catch {}
  }
  return "";
};

const setDeepSeekKey = (k) => {
  if (!k || !k.trim()) return;
  window._ztlDeepSeekKey = k.trim();
  try { localStorage.setItem("_ztlDeepSeekKey", k.trim()); } catch {}
  try { store.set("_ztlDeepSeekKey", k.trim()); } catch {}
};
const promptDeepSeekKey = () => {
  const k = prompt("Clé API DeepSeek\n\nEntre ta clé API (https://platform.deepseek.com/api_keys).\nElle sera sauvegardée dans ton compte ZTL et synchronisée sur tous tes appareils.");
  if (k && k.trim()) {
    window._ztlDeepSeekKey = k.trim();
    try { localStorage.setItem("_ztlDeepSeekKey", k.trim()); } catch {}
    try { store.set("_ztlDeepSeekKey", k.trim()); } catch {} // sync Supabase
    return k.trim();
  }
  return "";
};
const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmtDay = (d = new Date()) =>
  d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
const addDays = (dk, n) => { const d = new Date(dk + "T00:00"); d.setDate(d.getDate() + n); return dateKey(d); };
const weekDaysFrom = (offset) => {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + offset * 7);
  return Array.from({ length: 7 }, (_, i) => { const x = new Date(d); x.setDate(d.getDate() + i); return dateKey(x); });
};
const fmtShort = (dk) => new Date(dk + "T00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
const safeUrl = (u) => { u = (u || "").trim(); if (!u) return ""; return /^https?:\/\//i.test(u) ? u : "https://" + u; };
const hToHM = (h) => {
  if (h == null || isNaN(h)) return "";
  let H = Math.floor(h + 1e-6), M = Math.round((h - H) * 60);
  if (M === 60) { H += 1; M = 0; }
  return M === 0 ? `${H}h` : `${H}h ${String(M).padStart(2, "0")}min`;
};
const hToHMc = (h) => {
  if (h == null || isNaN(h)) return "";
  let H = Math.floor(h + 1e-6), M = Math.round((h - H) * 60);
  if (M === 60) { H += 1; M = 0; }
  return M === 0 ? `${H}h` : `${H}h${String(M).padStart(2, "0")}`;
};

/* ---------- petits composants ---------- */
function Ring({ value, max, size = 150, stroke = 13, color, track = C.line }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const pct = max ? Math.min(value / max, 1) : 0;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: "stroke-dashoffset .6s ease" }} />
    </svg>
  );
}
function Bar({ value, max, color }) {
  return (
    <div style={{ height: 8, borderRadius: 99, background: C.line, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.min(100, (value / max) * 100)}%`, background: color, borderRadius: 99, transition: "width .4s ease" }} />
    </div>
  );
}
function Eyebrow({ children, color = C.mut }) {
  return <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color, fontWeight: 700 }}>{children}</div>;
}
function TagBadge({ tag }) {
  if (!tag) return null;
  const ok = tag === "good";
  return (
    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 99,
      color: ok ? C.teal : C.ember, background: ok ? C.tealSoft : C.emberSoft, whiteSpace: "nowrap" }}>
      {ok ? "Bon pour l'épaule" : "Prudence épaule"}
    </span>
  );
}

/* schémas dessinés (fiables, sans dépendance internet) */
function ExerciseArt({ art }) {
  const G = C.mut, A = C.ember, L = C.line;
  const S = { stroke: G, strokeWidth: 4, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const AR = { stroke: A, strokeWidth: 2.6, fill: "none", strokeLinecap: "round", markerEnd: `url(#ah-${art})` };
  const poses = {
    squat: (<>
      <line x1="24" y1="120" x2="176" y2="120" stroke={L} strokeWidth="3" />
      <circle cx="92" cy="36" r="8" fill={G} />
      <path d="M89,46 L78,78" {...S} />
      <path d="M78,78 L104,92 L74,118" {...S} />
      <path d="M88,50 L122,52" {...S} />
      <path d="M152,54 L152,92" {...AR} />
    </>),
    incline: (<>
      <line x1="20" y1="120" x2="116" y2="120" stroke={L} strokeWidth="3" />
      <rect x="140" y="74" width="38" height="46" fill="none" stroke={L} strokeWidth="3" />
      <path d="M40,116 L86,100 L124,84" {...S} />
      <path d="M124,84 L152,76" {...S} />
      <circle cx="138" cy="78" r="8" fill={G} />
      <path d="M150,52 L150,70" {...AR} />
    </>),
    row: (<>
      <line x1="20" y1="120" x2="180" y2="120" stroke={L} strokeWidth="3" />
      <line x1="22" y1="40" x2="22" y2="120" stroke={L} strokeWidth="3" />
      <circle cx="118" cy="40" r="8" fill={G} />
      <path d="M118,48 L118,92" {...S} />
      <path d="M118,92 L108,118 M118,92 L128,118" {...S} />
      <path d="M118,55 L138,62 L110,66" {...S} />
      <path d="M24,60 C60,62 90,64 110,66" stroke={A} strokeWidth="2.6" fill="none" />
      <path d="M150,58 L134,62" {...AR} />
    </>),
    extrot: (<>
      <line x1="24" y1="120" x2="176" y2="120" stroke={L} strokeWidth="3" />
      <circle cx="100" cy="34" r="8" fill={G} />
      <path d="M100,42 L100,92" {...S} />
      <path d="M100,92 L88,118 M100,92 L112,118" {...S} />
      <path d="M100,54 L86,74" {...S} />
      <path d="M86,74 L122,74" {...S} />
      <path d="M104,90 a30,30 0 0 1 24,-14" {...AR} />
    </>),
    plank: (<>
      <line x1="20" y1="120" x2="184" y2="120" stroke={L} strokeWidth="3" />
      <path d="M50,120 L74,120" {...S} />
      <path d="M74,120 L74,98" {...S} />
      <path d="M74,98 L132,108 L176,118" {...S} />
      <circle cx="64" cy="94" r="8" fill={G} />
      <line x1="78" y1="98" x2="172" y2="116" stroke={A} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
    </>),
    lunge: (<>
      <line x1="20" y1="120" x2="180" y2="120" stroke={L} strokeWidth="3" />
      <circle cx="104" cy="34" r="8" fill={G} />
      <path d="M104,42 L100,80" {...S} />
      <path d="M100,80 L124,98 L124,120" {...S} />
      <path d="M100,80 L70,110 L54,120" {...S} />
      <path d="M102,52 L96,78" {...S} />
      <path d="M150,68 L150,100" {...AR} />
    </>),
    bridge: (<>
      <line x1="20" y1="120" x2="180" y2="120" stroke={L} strokeWidth="3" />
      <circle cx="38" cy="112" r="8" fill={G} />
      <path d="M48,116 L108,80 L140,100 L156,120" {...S} />
      <path d="M52,116 L84,118" {...S} />
      <path d="M108,78 L108,60" {...AR} />
    </>),
    facepull: (<>
      <line x1="20" y1="120" x2="180" y2="120" stroke={L} strokeWidth="3" />
      <line x1="178" y1="28" x2="178" y2="120" stroke={L} strokeWidth="3" />
      <circle cx="82" cy="36" r="8" fill={G} />
      <path d="M84,44 L86,92" {...S} />
      <path d="M86,92 L76,118 M86,92 L96,118" {...S} />
      <path d="M86,52 L108,48 L96,56" {...S} />
      <path d="M96,56 C130,50 158,42 176,40" stroke={A} strokeWidth="2.6" fill="none" />
      <path d="M116,60 L98,56" {...AR} />
    </>),
    pallof: (<>
      <line x1="20" y1="120" x2="180" y2="120" stroke={L} strokeWidth="3" />
      <line x1="22" y1="40" x2="22" y2="120" stroke={L} strokeWidth="3" />
      <circle cx="112" cy="34" r="8" fill={G} />
      <path d="M112,42 L112,90" {...S} />
      <path d="M112,90 L102,118 M112,90 L122,118" {...S} />
      <path d="M112,54 L152,58" {...S} />
      <path d="M24,60 C70,58 120,58 152,58" stroke={A} strokeWidth="2.6" fill="none" />
      <path d="M74,74 L54,74" {...AR} />
    </>),
  };
  if (!poses[art]) return null;
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: "6px 10px" }}>
      <svg viewBox="0 0 200 132" width="100%" style={{ display: "block", maxHeight: 150 }}>
        <defs>
          <marker id={`ah-${art}`} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill={A} />
          </marker>
        </defs>
        {poses[art]}
      </svg>
    </div>
  );
}

/* ---------- app ---------- */
export default function App() {
  const [tab, setTab] = useState("home");
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [recipeNew, setRecipeNew] = useState(0);
  const openRecipe = (id) => { setOpenRecipeId(id); setRecipeNew(0); setTab("food"); };
  const addRecipe = () => { setOpenRecipeId(null); setRecipeNew(n => n + 1); setTab("food"); };
  const [loading, setLoading] = useState(true);
  const tk = dateKey();
  const [day, setDay] = useState({ macros: { p: 0, c: 0, f: 0 }, sleep: null, weight: null, workout: {}, session: "maisonA" });
  const [exlast, setExlast] = useState({});
  const [sessions, setSessions] = useState(null);
  const [checks, setChecks] = useState({});
  const [hist, setHist] = useState([]);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    const goOff = () => setOffline(true);
    const goOn = () => setOffline(false);
    window.addEventListener("offline", goOff);
    window.addEventListener("online", goOn);
    return () => { window.removeEventListener("offline", goOff); window.removeEventListener("online", goOn); };
  }, []);

  useEffect(() => {
    (async () => {
      const d = await store.get("log:" + tk);
      if (d) {
        const macros = d.macros || { p: d.protein || 0, c: 0, f: 0 };
        setDay({ macros, sleep: null, weight: null, workout: {}, session: "maisonA", ...d, macros });
      }
      setExlast((await store.get("exlast")) || {});
      let ss = await store.get("sessions");
      if (!Array.isArray(ss) || !ss.length) { ss = SESSIONS.map(normalizeSession); store.set("sessions", ss); }
      else { const mig = ss.map(s => s.group === "Phase reprise" ? { ...s, group: "Maison" } : s); if (JSON.stringify(mig) !== JSON.stringify(ss)) { ss = mig; store.set("sessions", ss); } }
      setSessions(ss);
      setChecks((await store.get("checks")) || {});
      const keys = (await store.list("log:")).sort().slice(-30);
      const rows = [];
      for (const k of keys) {
        const v = await store.get(k);
        if (!v) continue;
        rows.push({ date: k.slice(4), sleepH: v.sleep?.hours ?? null, quality: v.sleep?.quality ?? null, weight: v.weight ?? null });
      }
      setHist(rows);
      setLoading(false);
    })();
  }, []);

  const saveDay = (next) => { setDay(next); store.set("log:" + tk, next); };
  const onSleepSaved = (date, hours, quality) => {
    setHist(h => {
      const prev = h.find(r => r.date === date);
      const others = h.filter(r => r.date !== date);
      return [...others, { date, sleepH: hours, quality, weight: prev ? prev.weight : null }]
        .sort((a, b) => (a.date < b.date ? -1 : 1)).slice(-30);
    });
  };
  const onDeleteSleep = async (date) => {
    if (date === tk) { const next = { ...day, sleep: null }; setDay(next); store.set("log:" + tk, next); }
    else { const v = await store.get("log:" + date); if (v) store.set("log:" + date, { ...v, sleep: null }); }
    setHist(h => h.map(r => r.date === date ? { ...r, sleepH: null, quality: null } : r));
  };
  const saveSleepForDate = async (date, sleepObj) => {
    if (date === tk) { const next = { ...day, sleep: sleepObj }; setDay(next); store.set("log:" + tk, next); }
    else {
      const v = (await store.get("log:" + date)) || { macros: { p: 0, c: 0, f: 0 }, sleep: null, weight: null, workout: {}, session: "maisonA" };
      store.set("log:" + date, { ...v, sleep: sleepObj });
    }
    onSleepSaved(date, sleepObj.hours, sleepObj.quality);
  };
  const toggleEx = (id) => {
    const w = { ...day.workout, [id]: { ...(day.workout[id] || {}), done: !day.workout[id]?.done } };
    saveDay({ ...day, workout: w });
  };
  const setExVal = (instanceId, exKey, val) => {
    const w = { ...day.workout, [instanceId]: { ...(day.workout[instanceId] || {}), val } };
    saveDay({ ...day, workout: w });
    const el = { ...exlast, [exKey || instanceId]: val }; setExlast(el); store.set("exlast", el);
  };
  const saveSessions = (next) => { setSessions(next); store.set("sessions", next); };
  const addMacros = (d) => {
    const m = day.macros || { p: 0, c: 0, f: 0 };
    saveDay({ ...day, macros: { p: Math.max(0, m.p + (d.p || 0)), c: Math.max(0, m.c + (d.c || 0)), f: Math.max(0, m.f + (d.f || 0)) } });
  };
  const setMacros = (m) => saveDay({ ...day, macros: { p: Math.max(0, m.p || 0), c: Math.max(0, m.c || 0), f: Math.max(0, m.f || 0) } });
  const addMacrosForDate = async (date, delta) => {
    if (date === tk) { addMacros(delta); return; }
    const v = (await store.get("log:" + date)) || { macros: { p: 0, c: 0, f: 0 }, sleep: null, weight: null, workout: {}, session: "maisonA" };
    const m = v.macros || { p: 0, c: 0, f: 0 };
    store.set("log:" + date, { ...v, macros: { p: Math.max(0, m.p + (delta.p || 0)), c: Math.max(0, m.c + (delta.c || 0)), f: Math.max(0, m.f + (delta.f || 0)) } });
  };
  const toggleCheck = (i) => { const c = { ...checks, [i]: !checks[i] }; setChecks(c); store.set("checks", c); };

  const sessList = (sessions && sessions.length) ? sessions : SESSIONS.map(normalizeSession);
  const sess = sessList.find(s => s.id === day.session) || sessList[0];
  const exDone = sess.ex.filter(e => day.workout[e.id]?.done).length;
  const workoutDone = sess.ex.length > 0 && exDone === sess.ex.length;
  const pillars = (workoutDone ? 1 : 0) + ((day.macros?.p || 0) >= TARGETS.protein ? 1 : 0) + (day.sleep ? 1 : 0);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.mut, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
      Chargement de ton carnet…
    </div>
  );

  const TABS = [
    { id: "train", icon: "🏋️", label: "Sport" },
    { id: "food", icon: "🍽️", label: "Nutrition" },
    { id: "program", icon: "📅", label: "Programme" },
    { id: "courses", icon: "🛒", label: "Courses" },
    { id: "sleep", icon: "🌙", label: "Sommeil" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: FONT_BODY, paddingBottom: 78 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Onest:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap');`}</style>
      {offline && (
        <div style={{ background: "#FFF3CD", borderBottom: `1px solid #E0A33B`, color: C.text, padding: "8px 16px", fontSize: 12, lineHeight: 1.4, textAlign: "center" }}>
          📡 <b>Mode hors-ligne</b> · Tes données sont sauvegardées localement et synchronisées dès le retour de la connexion.
        </div>
      )}
      <ZTLHeader onHome={() => setTab("home")} />
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "14px 18px 0" }}>
        {tab === "home" && <HomeTab {...{ day, sess, exDone, workoutDone, pillars, checks, toggleCheck, setTab, hist, saveDay, saveSleepForDate, openRecipe, addRecipe, sessions: sessList }} />}
        {tab === "train" && <TrainTab {...{ day, saveDay, toggleEx, setExVal, exlast, sessions: sessList, saveSessions }} />}
        {tab === "food" && <FoodTab {...{ day, addMacros, setMacros, addMacrosForDate, openRecipeId, recipeNew }} />}
        {tab === "program" && <ProgramTab />}
        {tab === "courses" && <CoursesTab />}
        {tab === "sleep" && <SleepTab {...{ day, saveDay, hist, onSleepSaved, onDeleteSleep, saveSleepForDate }} />}
      </div>

      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.bg2, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", width: "100%", maxWidth: 520 }}>
          {TABS.map(t => {
            const on = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ flex: 1, minWidth: 0, background: "none", border: "none", padding: "8px 0 10px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: on ? C.ember : C.mut }}>
                <span style={{ fontSize: 19, lineHeight: 1 }}>{t.icon}</span>
                <span style={{ fontSize: 8.5, fontWeight: on ? 700 : 500, whiteSpace: "nowrap" }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* ---------- Aujourd'hui ---------- */
function ZTLHeader({ onHome }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: C.bg }}>
      <div style={{ height: "env(safe-area-inset-top, 0px)" }} />
      <div style={{ position: "relative", background: C.bg2, borderBottom: `1px solid ${C.line}`, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 56 }}>
        <button onClick={onHome} aria-label="Accueil" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: 11, background: C.cardHi, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
          <span style={{fontSize:18,lineHeight:1,color:C.ink}}>🏠</span>
        </button>
        <button onClick={onHome} aria-label="Accueil" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "baseline", fontFamily: '"Helvetica Neue", Arial, system-ui, sans-serif', fontWeight: 900, color: C.ink, fontSize: 23, lineHeight: 0.78, transform: "scaleY(0.9)" }}>
            <span style={{ letterSpacing: "-0.02em" }}>Z</span>
            <span style={{ marginLeft: "-0.05em" }}>T</span>
            <span style={{ marginLeft: "-0.16em" }}>L</span>
          </span>
          <span style={{ marginTop: 4, color: C.mut, fontWeight: 800, fontSize: 6.5, letterSpacing: "0.3em", whiteSpace: "nowrap" }}>LIFE IS YOURS</span>
        </button>
      </div>
    </div>
  );
}

/* Météo du jour */
function wmoInfo(code) {
  if (code === 0) return { emoji: "☀️", label: "Ensoleillé", color: C.amber };
  if (code === 1 || code === 2) return { emoji: "⛅", label: "Éclaircies", color: C.amber };
  if (code === 3) return { emoji: "☁️", label: "Couvert", color: C.mut };
  if (code === 45 || code === 48) return { emoji: "🌫️", label: "Brouillard", color: C.mut };
  if (code >= 51 && code <= 57) return { emoji: "🌦️", label: "Bruine", color: C.teal };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { emoji: "🌧️", label: "Pluie", color: C.teal };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { emoji: "🌨️", label: "Neige", color: C.teal };
  if (code >= 95) return { emoji: "⛈️", label: "Orage", color: C.ember };
  return { emoji: "⛅", label: "—", color: C.mut };
}
function Weather() {
  const [w, setW] = useState(null);
  useEffect(() => {
    let done = false;
    if (typeof navigator === "undefined" || !navigator.geolocation) { setW("err"); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`);
          const j = await r.json();
          if (!done && j && j.current) setW({ temp: Math.round(j.current.temperature_2m), code: j.current.weather_code });
          else if (!done) setW("err");
        } catch { if (!done) setW("err"); }
      },
      () => { if (!done) setW("err"); },
      { timeout: 8000, maximumAge: 1800000 }
    );
    return () => { done = true; };
  }, []);
  if (!w || w === "err") return null;
  const { emoji: wEmoji, label, color } = wmoInfo(w.code);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, flexShrink: 0, paddingTop: 2 }}>
      <span style={{fontSize:24,lineHeight:1,color:color}}>{wEmoji}</span>
      <div style={{ fontSize: 19, fontWeight: 800, fontFamily: FONT_MONO, lineHeight: 1.1, color: C.ink }}>{w.temp}°</div>
      <div style={{ fontSize: 9.5, color: C.mut, fontWeight: 600 }}>{label}</div>
    </div>
  );
}


function ApiKeyButton() {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState("");
  const [hasKey, setHasKey] = useState(false);
  useEffect(() => { getDeepSeekKey().then(k => { if (k) setHasKey(true); }); }, []);
  const handleSave = () => {
    if (!val.trim()) return;
    // Si la clé commence par "sk-", c'est DeepSeek, sinon Gemini
    if (val.trim().startsWith("sk-")) {
      setDeepSeekKey(val.trim());
    } else {
      window._ztlGeminiKey = val.trim();
      try { localStorage.setItem("_ztlGeminiKey", val.trim()); } catch {}
      try { store.set("_ztlGeminiKey", val.trim()); } catch {}
    }
    setHasKey(true);
    setShow(false);
    setVal("");
  };
  return (
    <>
      <button onClick={() => setShow(!show)} style={{ width: "100%", background: "none", border: `1px solid ${C.line}`, color: hasKey ? C.teal : C.mut, borderRadius: 12, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
        <span style={{fontSize:14,lineHeight:1}}>⚙️</span> {hasKey ? "✅ Clés API" : "Clés API (DeepSeek + Gemini)"}
      </button>
      {show && (
        <div style={{ marginTop: 8, background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 11, color: C.mut, marginBottom: 8 }}>Clé DeepSeek (platform.deepseek.com/api_keys) ou Gemini (aistudio.google.com/apikey, gratuit). Elle sera synchronisée sur tous tes appareils.</div>
          <input value={val} onChange={e => setVal(e.target.value)} placeholder="sk-..." style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 8, padding: "9px 11px", fontSize: 13, marginBottom: 8 }} />
          <button onClick={handleSave} style={{ width: "100%", background: val.trim() ? C.teal : C.line, color: val.trim() ? C.bg : C.mut, border: "none", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 700, cursor: val.trim() ? "pointer" : "default" }}>
            Enregistrer
          </button>
        </div>
      )}
    </>
  );
}

function HomeTab({ day, sess, exDone, workoutDone, setTab, hist, saveDay, saveSleepForDate, openRecipe, addRecipe, sessions }) {
  const [w, setW] = useState(day.weight ?? "");
  const [plan, setPlan] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [sleepActive, setSleepActive] = useState(undefined);
  useEffect(() => {
    (async () => {
      setPlan((await store.get("plan:" + dateKey())) || { meals: [], session: null });
      let r = await store.get("recipes"); if (!Array.isArray(r) || !r.length) r = RECIPES; setRecipes(r);
      setSleepActive((await store.get("sleepActive")) || null);
    })();
  }, []);
  const hhmm = (ts) => { const d = new Date(ts); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };
  const startNight = () => { const a = { startedAt: Date.now() }; setSleepActive(a); store.set("sleepActive", a); };
  const endNight = () => {
    const a = sleepActive; if (!a) return;
    const nowTs = Date.now();
    const hours = Math.max(0, Math.round(((nowTs - a.startedAt) / 3600000) * 10) / 10);
    saveSleepForDate(dateKey(), { bed: hhmm(a.startedAt), wake: hhmm(nowTs), quality: 0, hours, endedAt: new Date(nowTs).toISOString() });
    setSleepActive(null); store.del("sleepActive");
  };
  const m = day.macros || { p: 0, c: 0, f: 0 };
  const kcal = Math.round((m.p + m.c) * 4 + m.f * 9);
  const kz = zone(kcal, TARGETS.kcal);
  const planSession = plan && plan.session ? (sessions || []).find(s => s.id === plan.session) : null;
  const planMeals = plan ? (plan.meals || []).map(id => recipes.find(r => r.id === id)).filter(Boolean) : [];
  const planTotals = planMeals.reduce((t, r) => ({ p: t.p + (+r.protein || 0), c: t.c + (+r.carbs || 0), f: t.f + (+r.fat || 0) }), { p: 0, c: 0, f: 0 });
  const planKcal = Math.round((planTotals.p + planTotals.c) * 4 + planTotals.f * 9);
  const sleepRows = (hist || []).filter(h => h.sleepH != null).sort((a, b) => (a.date < b.date ? -1 : 1));
  const lastNight = sleepRows.length ? sleepRows[sleepRows.length - 1] : null;
  const last7 = sleepRows.slice(-7);
  const avg7 = last7.length ? Math.round((last7.reduce((s, d) => s + d.sleepH, 0) / last7.length) * 10) / 10 : null;
  const weightRows = (hist || []).filter(h => h.weight != null).sort((a, b) => (a.date < b.date ? -1 : 1));
  const lastWeight = day.weight != null ? day.weight : (weightRows.length ? weightRows[weightRows.length - 1].weight : null);
  const satDay = Math.round(m.f * 0.4);
  const satZ = badZone(satDay, SATFAT_MAX);

  const macroBar = (label, val, target, unit) => {
    const z = zone(val, target);
    const pct = Math.min(100, target ? (val / target) * 100 : 0);
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
          <span style={{ fontSize: 11.5, color: C.mut }}>{label}</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: z.color }}>{val} / {target} {unit}</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: C.line, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99 }} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <div style={{ minWidth: 0 }}>
          <Eyebrow color={C.coral}>{fmtDay()}</Eyebrow>
          <h1 style={{ fontSize: 22, fontWeight: 800, fontFamily: FONT_DISPLAY, margin: "3px 0 0", letterSpacing: -0.4 }}>Ta journée</h1>
        </div>
        <Weather />
      </div>

      <button onClick={() => setTab("food")} style={{ width: "100%", textAlign: "left", background: C.peach, border: "none", borderRadius: 22, padding: 18, cursor: "pointer", color: C.text }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: C.mut }}>Macros du jour</span>
          <span style={{ fontSize: 12, color: C.teal, display: "flex", alignItems: "center", gap: 2 }}>Nutrition <span style={{fontSize:14,lineHeight:1}}>▶</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ position: "relative", width: 104, height: 104, flexShrink: 0 }}>
            <Ring value={Math.min(kcal, TARGETS.kcal)} max={TARGETS.kcal} size={104} stroke={11} color={kz.color} track={C.peachLine} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1, fontFamily: FONT_MONO }}>{kcal}</div>
              <div style={{ fontSize: 10, color: C.mut, marginTop: 2 }}>/ {TARGETS.kcal} kcal</div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {macroBar("Protéines", Math.round(m.p), TARGETS.protein, "g")}
            {macroBar("Glucides", Math.round(m.c), TARGETS.carbs, "g")}
            {macroBar("Lipides", Math.round(m.f), TARGETS.fat, "g")}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, paddingTop: 12, borderTop: `1px solid ${C.peachLine}` }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: satZ.color, flexShrink: 0 }} />
          <span style={{ fontSize: 11.5, color: C.mut, flex: 1 }}>Gras saturés (estimé)</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: satZ.color }}>{satDay} / {SATFAT_MAX} g · {satZ.label}</span>
        </div>
      </button>

      <button onClick={() => setTab("food")} style={{ width: "100%", marginTop: 12, background: C.coral, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{fontSize:18,lineHeight:1}}>🍽️</span> Ajouter un repas
      </button>

      {sleepActive ? (
        <button onClick={endNight} style={{ width: "100%", marginTop: 10, background: C.greenVivid, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{fontSize:17,lineHeight:1}}>🌅</span> Terminer la nuit · couché à {hhmm(sleepActive.startedAt)}
        </button>
      ) : (
        <button onClick={startNight} disabled={sleepActive === undefined} style={{ width: "100%", marginTop: 10, background: C.greenVivid, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{fontSize:16,lineHeight:1}}>🌙</span> Démarrer la nuit
        </button>
      )}

      <h3 style={sectionH}>Au programme aujourd'hui</h3>
      <div style={{ background: C.mint, border: "none", borderRadius: 16, overflow: "hidden" }}>
        <button onClick={() => { if (planSession) saveDay({ ...day, session: planSession.id }); setTab("train"); }} style={{ width: "100%", background: "none", border: "none", borderBottom: `1px solid rgba(0,0,0,0.06)`, padding: "13px 15px", display: "flex", alignItems: "center", gap: 11, cursor: "pointer", textAlign: "left" }}>
          <span style={{fontSize:17,lineHeight:1,color:C.ember, flexShrink: 0 }}>🏋️</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: C.mut }}>Séance</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: planSession ? C.text : C.mut }}>{planSession ? `${planSession.group} · ${planSession.name}` : "Repos / aucune séance prévue"}</div>
          </div>
          {planSession ? (
            <span style={{ display: "flex", alignItems: "center", gap: 4, background: C.coral, color: "#fff", borderRadius: 99, padding: "7px 12px", fontSize: 12.5, fontWeight: 800, flexShrink: 0 }}>
              <span style={{fontSize:13,lineHeight:1}}>▶️</span> Ouvrir
            </span>
          ) : <span style={{fontSize:17,lineHeight:1,color:C.mut}}>▶</span>}
        </button>
        <div style={{ padding: "13px 15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: planMeals.length ? 9 : 0 }}>
            <span style={{fontSize:16,lineHeight:1,color:C.teal}}>👨‍🍳</span>
            <span style={{ fontSize: 11, color: C.mut, flex: 1 }}>Repas prévus</span>
            {planMeals.length > 0 && <span style={{ fontSize: 11.5, color: C.mut }}><b style={{ color: C.ember }}>{planKcal}</b> kcal</span>}
          </div>
          {planMeals.length === 0 ? (
            <div style={{ fontSize: 13, color: C.mut }}>Aucun repas prévu aujourd'hui.</div>
          ) : (
            planMeals.map((r, i) => (
              <button key={i} onClick={() => openRecipe(r.id)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, padding: "7px 0", cursor: "pointer", color: C.text }}>
                <span style={{ width: 5, height: 5, borderRadius: 99, background: C.teal, flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</span>
                {r.link && <a href={safeUrl(r.link)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "flex", color: C.ember }}><span style={{fontSize:14,lineHeight:1}}>🔗</span></a>}
                <span style={{ fontSize: 11, color: C.mut }}>{Math.round((r.protein + r.carbs) * 4 + r.fat * 9)} kcal</span>
                <span style={{fontSize:15,lineHeight:1,color:C.mut, flexShrink: 0 }}>▶</span>
              </button>
            ))
          )}
          <button onClick={() => setTab("program")} style={{ marginTop: 10, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 9, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%" }}>
            Ouvrir le programme
          </button>
        </div>
      </div>

      <button onClick={() => setTab("sleep")} style={{ width: "100%", textAlign: "left", background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", color: C.text, marginTop: 18 }}>
        <span style={{fontSize:18,lineHeight:1,color:C.teal, flexShrink: 0 }}>🌙</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: C.mut }}>Dernière nuit</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>
            {lastNight ? hToHM(lastNight.sleepH) : "—"}
            {lastNight && lastNight.quality ? <span style={{ fontSize: 12, color: C.mut, fontWeight: 600 }}> · {lastNight.quality}/5</span> : null}
          </div>
        </div>
        {avg7 != null && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10.5, color: C.mut }}>Moy. 7j</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.teal }}>{hToHM(avg7)}</div>
          </div>
        )}
        <span style={{fontSize:17,lineHeight:1,color:C.mut}}>▶</span>
      </button>

      <h3 style={sectionH}>Poids</h3>
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{fontSize:18,lineHeight:1,color:C.teal}}>⚖️</span>
        <span style={{ fontSize: 13.5, flex: 1 }}>Poids du jour{lastWeight != null ? <span style={{ color: C.mut }}> · dernier {lastWeight} kg</span> : ""}</span>
        <input value={w} onChange={e => setW(e.target.value.replace(",", "."))} inputMode="decimal" placeholder="kg"
          style={{ width: 64, background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "7px 9px", fontSize: 14, textAlign: "center" }} />
        <button onClick={() => saveDay({ ...day, weight: parseFloat(w) || null })}
          style={{ background: C.greenVivid, color: "#fff", border: "none", borderRadius: 10, padding: "8px 13px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>OK</button>
      </div>

      <ApiKeyButton />
      <button onClick={addRecipe} style={{ width: "100%", marginTop: 14, background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{fontSize:17,lineHeight:1}}>👨‍🍳</span> Ajouter une recette
      </button>

      <button onClick={() => { if (window._ztlLogout) window._ztlLogout(); }}
        style={{ width: "100%", marginTop: 20, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 14, padding: "13px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
        Se déconnecter
      </button>
      <div style={{ height: 16 }} />
    </>
  );
}


/* ---------- Séances ---------- */
function ExercisePicker({ exercises, onAdd, onClose }) {
  const [f, setF] = useState("Tout");
  const [q, setQ] = useState("");
  const [openEx, setOpenEx] = useState(null);
  const cats = ["Tout", ...EX_CATS];
  const list = exercises.filter(e => (f === "Tout" || e.cat === f) && (!q.trim() || e.name.toLowerCase().includes(q.trim().toLowerCase())));
  const chip = (s) => (
    <button key={s} onClick={() => setF(s)} style={{ padding: "8px 14px", borderRadius: 99, border: `1px solid ${f === s ? C.coral : C.line}`, background: f === s ? C.coral : C.bg2, color: f === s ? "#fff" : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{s}</button>
  );
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,12,8,.38)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "86vh", display: "flex", flexDirection: "column", boxShadow: "0 -12px 40px rgba(0,0,0,.18)" }}>
        <div style={{ padding: "10px 0 2px", display: "flex", justifyContent: "center" }}><div style={{ width: 40, height: 4, borderRadius: 99, background: C.line }} /></div>
        <div style={{ padding: "8px 18px", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.coral, fontWeight: 800 }}>Exercices</div>
            <div style={{ fontSize: 19, fontWeight: 800, fontFamily: FONT_DISPLAY }}>Ajouter un exercice</div>
          </div>
          <button onClick={onClose} style={{ background: C.cardHi, border: `1px solid ${C.line}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.text, flexShrink: 0 }}><span style={{fontSize:17,lineHeight:1}}>✕</span></button>
        </div>
        <div style={{ display: "flex", gap: 7, padding: "2px 18px 10px", overflowX: "auto" }}>{cats.map(chip)}</div>
        <div style={{ padding: "0 18px 10px" }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un exercice..." style={{ width: "100%", boxSizing: "border-box", background: C.bg2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 12, padding: "11px 13px", fontSize: 14, fontFamily: "inherit" }} />
        </div>
        <div style={{ overflowY: "auto", padding: "0 12px 22px" }}>
          {list.length === 0 && <div style={{ textAlign: "center", color: C.mut, fontSize: 13, padding: "24px 0" }}>Aucun exercice.</div>}
          {list.map(e => {
            const op = openEx === e.exKey;
            return (
              <div key={e.exKey} style={{ borderRadius: 14, background: op ? C.card : "none", marginBottom: op ? 6 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: C.mint, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{fontSize:20,lineHeight:1,color:C.teal}}>🏋️</span></div>
                  <button onClick={() => setOpenEx(op ? null : e.exKey)} style={{ flex: 1, minWidth: 0, background: "none", border: "none", textAlign: "left", cursor: "pointer", padding: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.name}</div>
                    <div style={{ fontSize: 11.5, color: C.mut, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                      <span>{e.cat} · {e.scheme} · ~{e.dur} min</span>
                      <span style={{ color: C.teal, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 2 }}>· détails <span style={{fontSize:12,lineHeight:1, transform: op ? "rotate(180deg)" : "none", transition: "transform .25s" }}>▼</span></span>
                    </div>
                  </button>
                  <button onClick={() => onAdd(e)} title="Ajouter" style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 99, background: C.coral, color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><span style={{fontSize:16,lineHeight:1}}>➕</span></button>
                </div>
                {op && (
                  <div style={{ padding: "0 12px 14px 66px" }}>
                    {e.cue && <p style={{ fontSize: 12.5, color: C.mut, margin: "0 0 10px", lineHeight: 1.5 }}>{e.cue}</p>}
                    {e.art && <ExerciseArt art={e.art} />}
                    {e.do && (
                      <div style={{ marginTop: e.art ? 12 : 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.teal, marginBottom: 6 }}>À faire</div>
                        {e.do.map((x, i) => (
                          <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5 }}><span style={{fontSize:14,lineHeight:1,color:C.teal, flexShrink: 0, marginTop: 2 }}>✅</span><span style={{ fontSize: 12.5, lineHeight: 1.45 }}>{x}</span></div>
                        ))}
                      </div>
                    )}
                    {e.avoid && (
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.coral, marginBottom: 6 }}>À éviter</div>
                        {e.avoid.map((x, i) => (
                          <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5 }}><span style={{fontSize:14,lineHeight:1,color:C.coral, flexShrink: 0, marginTop: 2 }}>✕</span><span style={{ fontSize: 12.5, lineHeight: 1.45, color: C.mut }}>{x}</span></div>
                        ))}
                      </div>
                    )}
                    {!e.do && !e.cue && <div style={{ fontSize: 12, color: C.mut }}>Pas de détails pour cet exercice.</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


/* ---------- TrainTab ---------- */
function TrainTab({ day, saveDay, toggleEx, setExVal, exlast, sessions, saveSessions }) {
  const groups = [...new Set(sessions.map(s => s.group))];
  const sess = sessions.find(s => s.id === day.session) || sessions[0];
  const [tech, setTech] = useState({});
  const [edit, setEdit] = useState(false);
  const [picker, setPicker] = useState(false);
  const newInst = () => "x" + Math.random().toString(36).slice(2, 8);
  const updateSess = (mut) => saveSessions(sessions.map(s => s.id === sess.id ? mut(s) : s));
  const addExercise = (m) => updateSess(s => ({ ...s, ex: [...s.ex, { ...m, id: newInst() }] }));
  const removeExercise = (instId) => updateSess(s => ({ ...s, ex: s.ex.filter(x => x.id !== instId) }));
  const renameSess = (name) => updateSess(s => ({ ...s, name }));
  const setGroup = (group) => updateSess(s => ({ ...s, group }));
  const GROUP_OPTIONS = ["Maison", "Programme salle"];
  const createSession = () => { const id = "s" + Date.now(); saveSessions([...sessions, { id, group: "Maison", name: "Nouvelle séance", custom: true, ex: [] }]); saveDay({ ...day, session: id }); setEdit(true); };
  const deleteSession = () => { const rest = sessions.filter(s => s.id !== sess.id); saveSessions(rest); saveDay({ ...day, session: (rest[0] && rest[0].id) || "" }); setEdit(false); };
  return (
    <>
      <Eyebrow color={C.coral}>Sport</Eyebrow>
      <h1 style={h1}>Tes séances</h1>
      {groups.map(g => (
        <div key={g} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11.5, color: C.mut, fontWeight: 700, margin: "0 0 7px" }}>{g}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {sessions.filter(s => s.group === g).map(s => {
              const on = s.id === day.session;
              return (
                <button key={s.id} onClick={() => { saveDay({ ...day, session: s.id }); setEdit(false); }}
                  style={{ padding: "8px 13px", borderRadius: 99, border: `1px solid ${on ? C.coral : C.line}`, background: on ? C.emberSoft : C.card, color: on ? C.coral : C.text, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <button onClick={createSession} style={{ background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 99, padding: "8px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        <span style={{fontSize:15,lineHeight:1}}>➕</span> Nouvelle séance
      </button>

      {sess && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 14px" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {edit ? (
              <input value={sess.name} onChange={e => renameSess(e.target.value)} placeholder="Nom de la séance" style={{ width: "100%", boxSizing: "border-box", background: C.bg2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "9px 11px", fontSize: 15, fontWeight: 700, fontFamily: "inherit" }} />
            ) : (
              <div style={{ fontSize: 16, fontWeight: 800, fontFamily: FONT_DISPLAY }}>{sess.name}</div>
            )}
            <div style={{ fontSize: 12, color: C.mut, display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
              <span style={{fontSize:13,lineHeight:1}}>🕐</span> ~{sessionDur(sess)} min · {sess.ex.length} exo{sess.ex.length > 1 ? "s" : ""}
            </div>
          </div>
          {edit && sess.custom && (
            <button onClick={deleteSession} title="Supprimer la séance" style={{ background: "none", border: `1px solid ${C.line}`, color: C.coral, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}><span style={{fontSize:16,lineHeight:1}}>🗑️</span></button>
          )}
          <button onClick={() => setEdit(v => !v)} style={{ background: edit ? C.coral : C.cardHi, border: `1px solid ${edit ? C.coral : C.line}`, color: edit ? "#fff" : C.text, borderRadius: 99, padding: "9px 15px", fontSize: 13, fontWeight: 800, cursor: "pointer", flexShrink: 0 }}>{edit ? "Terminer" : "Éditer"}</button>
        </div>
      )}
      {sess && edit && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 }}>Groupe</div>
          <div style={{ display: "flex", gap: 8 }}>
            {GROUP_OPTIONS.map(g => (
              <button key={g} onClick={() => setGroup(g)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1px solid ${sess.group === g ? C.teal : C.line}`, background: sess.group === g ? C.tealSoft : C.bg2, color: sess.group === g ? C.teal : C.text, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{g}</button>
            ))}
          </div>
        </div>
      )}

      {sess.ex.map(e => {
        const st = day.workout[e.id] || {};
        return (
          <div key={e.id} style={{ background: C.card, border: `1px solid ${st.done ? C.good : C.line}`, borderRadius: 16, padding: 15, marginBottom: 11 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <button onClick={() => toggleEx(e.id)}
                style={{ width: 26, height: 26, marginTop: 1, borderRadius: 8, border: `2px solid ${st.done ? C.good : C.line}`, background: st.done ? C.good : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                {st.done && <span style={{fontSize:15,lineHeight:1,color:C.bg}}>✅</span>}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{e.name}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 13, color: C.coral, fontWeight: 700, whiteSpace: "nowrap" }}>{e.scheme}</span>
                    {edit && <button onClick={() => removeExercise(e.id)} title="Retirer" style={{ background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 0, display: "flex" }}><span style={{fontSize:16,lineHeight:1}}>✕</span></button>}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: C.mut, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}><span style={{fontSize:11,lineHeight:1}}>🕐</span> ~{e.dur != null ? e.dur : exDur(e)} min</div>
                <div style={{ margin: "5px 0 8px" }}><TagBadge tag={e.tag} /></div>
                <p style={{ fontSize: 12.5, color: C.mut, margin: "0 0 10px", lineHeight: 1.5 }}>{e.cue}</p>
                {e.do && (
                  <>
                    <button onClick={() => setTech(t => ({ ...t, [e.id]: !t[e.id] }))}
                      style={{ background: "none", border: `1px solid ${C.line}`, color: tech[e.id] ? C.ember : C.mut, borderRadius: 9, padding: "6px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                      {tech[e.id] ? "Masquer la technique" : "Voir la technique"}
                      <span style={{fontSize:14,lineHeight:1, transform: tech[e.id] ? "rotate(180deg)" : "none", transition: "transform .25s" }}>▼</span>
                    </button>
                    {tech[e.id] && (
                      <div style={{ marginBottom: 12 }}>
                        <ExerciseArt art={e.art} />
                        <div style={{ marginTop: 12 }}>
                          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.teal, marginBottom: 6 }}>À faire</div>
                          {e.do.map((x, i) => (
                            <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5 }}>
                              <span style={{fontSize:14,lineHeight:1,color:C.teal, flexShrink: 0, marginTop: 2 }}>✅</span>
                              <span style={{ fontSize: 12.5, lineHeight: 1.45 }}>{x}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: 10 }}>
                          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.ember, marginBottom: 6 }}>À éviter</div>
                          {e.avoid.map((x, i) => (
                            <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5 }}>
                              <span style={{fontSize:14,lineHeight:1,color:C.ember, flexShrink: 0, marginTop: 2 }}>✕</span>
                              <span style={{ fontSize: 12.5, lineHeight: 1.45, color: C.mut }}>{x}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {exlast[e.exKey] && <div style={{ fontSize: 11.5, color: C.teal, fontWeight: 700, marginBottom: 6 }}>Dernier : {exlast[e.exKey]}</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input key={e.exKey + "|" + (exlast[e.exKey] || "")} defaultValue={st.val || ""} onBlur={ev => setExVal(e.id, e.exKey, ev.target.value)} placeholder="charge / reps du jour"
                    style={{ flex: 1, background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 9, padding: "8px 10px", fontSize: 13, fontFamily: FONT_MONO }} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {edit && (
        <button onClick={() => setPicker(true)} style={{ width: "100%", background: C.tealSoft, border: `1px solid ${C.teal}`, color: C.teal, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 8 }}>
          <span style={{fontSize:17,lineHeight:1}}>➕</span> Ajouter un exercice
        </button>
      )}
      {sess && sess.ex.length === 0 && !edit && (
        <div style={{ background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 20, textAlign: "center", color: C.mut, fontSize: 13 }}>Séance vide. Touche « Éditer » pour ajouter des exercices.</div>
      )}
      {picker && <ExercisePicker exercises={EXERCISES} onAdd={addExercise} onClose={() => setPicker(false)} />}
      <div style={{ height: 8 }} />
    </>
  );
}


/* ---------- Nutrition ---------- */
function FoodTab({ day, addMacros, setMacros, addMacrosForDate, openRecipeId, recipeNew }) {
  const m = day.macros || { p: 0, c: 0, f: 0 };
  const kcal = Math.round((m.p + m.c) * 4 + m.f * 9);
  const [manual, setManual] = useState({ p: "", c: "", f: "" });
  const [macroHist, setMacroHist] = useState(null);
  const [weightHist, setWeightHist] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [pastOpen, setPastOpen] = useState(false);
  const [pastDate, setPastDate] = useState(addDays(dateKey(), -1));
  const [pastText, setPastText] = useState("");
  const [pastBusy, setPastBusy] = useState(false);
  const [pastErr, setPastErr] = useState("");
  const [pastResult, setPastResult] = useState(null);
  useEffect(() => {
    (async () => {
      const today = dateKey();
      const days = Array.from({ length: 7 }, (_, i) => addDays(today, -(6 - i)));
      const rows = [];
      for (const dk of days) {
        let mac;
        if (dk === today) mac = day.macros || { p: 0, c: 0, f: 0 };
        else { const v = await store.get("log:" + dk); mac = (v && v.macros) || { p: 0, c: 0, f: 0 }; }
        rows.push({ date: dk, p: mac.p || 0, c: mac.c || 0, f: mac.f || 0, kcal: Math.round(((mac.p || 0) + (mac.c || 0)) * 4 + (mac.f || 0) * 9) });
      }
      setMacroHist(rows);
    })();
  }, [day.macros?.p, day.macros?.c, day.macros?.f, reloadKey]);
  useEffect(() => {
    (async () => {
      const today = dateKey();
      const days = Array.from({ length: 14 }, (_, i) => addDays(today, -(13 - i)));
      const rows = [];
      for (const dk of days) {
        let weight;
        if (dk === today) weight = day.weight ?? null;
        else { const v = await store.get("log:" + dk); weight = (v && v.weight != null) ? v.weight : null; }
        rows.push({ date: dk, weight });
      }
      setWeightHist(rows);
    })();
  }, [day.weight, reloadKey]);
  const [recipes, setRecipes] = useState(null);
  const [rq, setRq] = useState("");
  const [toast, setToast] = useState("");
  const [todayPlan, setTodayPlan] = useState(null);
  useEffect(() => {
    (async () => {
      let r = await store.get("recipes");
      if (!Array.isArray(r) || !r.length) r = RECIPES;
      setRecipes(r);
      const pl = await store.get("plan:" + dateKey());
      setTodayPlan(pl || { meals: [], session: null });
    })();
  }, []);

  const rows = [
    { key: "kcal", label: "Calories", val: kcal, target: TARGETS.kcal, unit: "kcal" },
    { key: "p", label: "Protéines", val: Math.round(m.p), target: TARGETS.protein, unit: "g" },
    { key: "c", label: "Glucides", val: Math.round(m.c), target: TARGETS.carbs, unit: "g" },
    { key: "f", label: "Lipides", val: Math.round(m.f), target: TARGETS.fat, unit: "g" },
  ];
  const card = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 };
  const chip = { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 99, padding: "8px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 };

  const addManual = () => {
    const p = +manual.p || 0, c = +manual.c || 0, f = +manual.f || 0;
    if (!p && !c && !f) return;
    addMacros({ p, c, f }); setManual({ p: "", c: "", f: "" });
  };
  const kcalOf = (r) => Math.round(((+r.protein || 0) + (+r.carbs || 0)) * 4 + (+r.fat || 0) * 9);
  const eatRecipe = (r) => { addMacros({ p: +r.protein || 0, c: +r.carbs || 0, f: +r.fat || 0 }); setToast(`${r.title} ajoutée à ta journée`); setTimeout(() => setToast(""), 1800); };
  const recList = recipes ? recipes.filter(r => !rq || (r.title || "").toLowerCase().includes(rq.toLowerCase())) : [];
  const plannedMeals = (todayPlan && recipes) ? (todayPlan.meals || []).map(id => recipes.find(r => r.id === id)).filter(Boolean) : [];
  const addAllPlanned = () => {
    const t = plannedMeals.reduce((a, r) => ({ p: a.p + (+r.protein || 0), c: a.c + (+r.carbs || 0), f: a.f + (+r.fat || 0) }), { p: 0, c: 0, f: 0 });
    if (!t.p && !t.c && !t.f) return;
    addMacros(t);
    setToast(`${plannedMeals.length} repas prévus ajoutés à ta journée`); setTimeout(() => setToast(""), 1800);
  };
  const calcPast = async () => {
    if (!pastText.trim()) { setPastErr("Décris d'abord ton repas."); return; }
    setPastBusy(true); setPastErr("");
    let mac;
    try { mac = await aiMacros(pastText); }
    catch (e) { mac = recipeMacros(pastText); setPastErr("IA indisponible : " + ((e && e.message) || "erreur") + " — estimation locale."); }
    setPastResult({ p: String(mac.protein), c: String(mac.carbs), f: String(mac.fat) });
    setPastBusy(false);
  };
  const addPast = () => {
    const p = +pastResult.p || 0, c = +pastResult.c || 0, f = +pastResult.f || 0;
    addMacrosForDate(pastDate, { p, c, f });
    setReloadKey(k => k + 1);
    setToast(`Repas ajouté au ${fmtShort(pastDate)}`); setTimeout(() => setToast(""), 2000);
    setPastOpen(false); setPastText(""); setPastResult(null); setPastErr("");
  };

  const fileRef = useRef(null);
  const recipesRef = useRef(null);
  useEffect(() => {
    if ((openRecipeId || recipeNew) && recipesRef.current) {
      const t = setTimeout(() => recipesRef.current && recipesRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      return () => clearTimeout(t);
    }
  }, [openRecipeId, recipeNew]);
  const [photoState, setPhotoState] = useState("idle");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoResult, setPhotoResult] = useState(null);
  const [photoErr, setPhotoErr] = useState("");
  const kcalVals = (v) => Math.round(((+v.p || 0) + (+v.c || 0)) * 4 + (+v.f || 0) * 9);
  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result);
      const base64 = dataUrl.split(",")[1];
      const mediaType = file.type || "image/jpeg";
      setPhotoPreview(dataUrl); setPhotoErr(""); setPhotoState("loading");
      try {
        const r = await aiMealFromPhoto(base64, mediaType);
        setPhotoResult({ plat: r.plat, p: String(r.protein), c: String(r.carbs), f: String(r.fat) });
        setPhotoState("result");
      } catch (err) {
        setPhotoErr((err && err.message) || "erreur inconnue"); setPhotoState("error");
      }
    };
    reader.readAsDataURL(file);
  };
  const addPhotoMeal = () => {
    addMacros({ p: +photoResult.p || 0, c: +photoResult.c || 0, f: +photoResult.f || 0 });
    setToast(`${photoResult.plat} ajouté à ta journée`); setTimeout(() => setToast(""), 1800);
    setPhotoState("idle"); setPhotoResult(null); setPhotoPreview(null);
  };
  const resetPhoto = () => { setPhotoState("idle"); setPhotoResult(null); setPhotoPreview(null); setPhotoErr(""); };

  return (
    <>
      {toast && (
        <div style={{ position: "fixed", left: 0, right: 0, bottom: 90, display: "flex", justifyContent: "center", zIndex: 50, pointerEvents: "none" }}>
          <div style={{ background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: 99, boxShadow: "0 6px 20px rgba(0,0,0,.4)" }}>{toast}</div>
        </div>
      )}
      <Eyebrow color={C.ember}>Nutrition</Eyebrow>
      <h1 style={h1}>Ta journée</h1>
      <p style={{ color: C.mut, margin: "0 0 16px", fontSize: 14, lineHeight: 1.5 }}>
        Suis tes calories et tes macros. On vise la cible, sans se priver.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map(r => {
          const z = zone(r.val, r.target);
          const pct = Math.min(100, (r.target ? r.val / r.target : 0) * 100);
          const over = r.val > r.target;
          return (
            <div key={r.key} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{r.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: z.color }}>
                  {r.val} <span style={{ color: C.mut, fontWeight: 600, fontSize: 12.5 }}>/ {r.target} {r.unit}</span>
                </span>
              </div>
              <div style={{ height: 10, borderRadius: 99, background: C.line, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: z.color }}>{z.label}</span>
                <span style={{ fontSize: 11.5, color: C.mut }}>
                  {over ? `+${r.val - r.target} ${r.unit} au-dessus` : `reste ${r.target - r.val} ${r.unit}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>


      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "12px 2px 0" }}>
        {[["à compléter", C.mut], ["en bonne voie", C.teal], ["dans la cible", C.good], ["un peu trop", C.amber], ["dépassement", C.ember]].map(([l, col]) => (
          <span key={l} style={{ fontSize: 10.5, color: C.mut, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 99, background: col }} /> {l}
          </span>
        ))}
      </div>

      <div style={{ ...card, marginTop: 14 }}>
        <IndulgenceGauge satfat={Math.round((m.f || 0) * 0.4)} sugar={null} daily title="Gras saturés du jour (estimé ~40% des lipides)" />
      </div>

      <h3 style={sectionH}>Repas prévus aujourd'hui</h3>
      {plannedMeals.length === 0 ? (
        <div style={{ ...card, borderStyle: "dashed", textAlign: "center", color: C.mut, fontSize: 13, lineHeight: 1.5 }}>
          Aucun repas prévu aujourd'hui. Planifie-les dans l'onglet Programme pour les ajouter en un tap.
        </div>
      ) : (
        <div style={card}>
          {plannedMeals.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < plannedMeals.length - 1 ? `1px solid ${C.line}` : "none" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
                <div style={{ fontSize: 11.5, color: C.mut }}><b style={{ color: C.ember }}>{kcalOf(r)}</b> kcal · P{r.protein} G{r.carbs} L{r.fat}</div>
              </div>
              <button onClick={() => eatRecipe(r)} style={{ background: C.tealSoft, color: C.teal, border: `1px solid ${C.teal}`, borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                <span style={{fontSize:14,lineHeight:1}}>➕</span> Ajouter
              </button>
            </div>
          ))}
          {plannedMeals.length > 1 && (
            <button onClick={addAllPlanned} style={{ marginTop: 12, width: "100%", background: C.ember, color: "#1b1205", border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <span style={{fontSize:16,lineHeight:1}}>➕</span> Tout ajouter à ma journée
            </button>
          )}
        </div>
      )}

      <h3 style={sectionH}>Analyser une photo</h3>
      <div style={card}>
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        {photoState === "idle" && (
          <>
            <button onClick={() => fileRef.current && fileRef.current.click()}
              style={{ width: "100%", background: C.coral, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{fontSize:18,lineHeight:1}}>📷</span> Photo du plat
            </button>
            <p style={{ fontSize: 11.5, color: C.mut, textAlign: "center", marginTop: 8, lineHeight: 1.45 }}>
              L'IA identifie le plat et estime ses macros. Tu pourras ajuster avant d'ajouter.
            </p>
          </>
        )}
        {photoState === "loading" && (
          <div style={{ textAlign: "center", padding: "4px 0" }}>
            {photoPreview && <img src={photoPreview} alt="" style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 12, marginBottom: 10 }} />}
            <div style={{ color: C.teal, fontSize: 14, fontWeight: 700 }}>Analyse du plat en cours...</div>
          </div>
        )}
        {photoState === "error" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ color: C.ember, fontSize: 13, marginBottom: 12, lineHeight: 1.45 }}>Analyse impossible : {photoErr}</div>
            <button onClick={resetPhoto} style={{ background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Réessayer</button>
          </div>
        )}
        {photoState === "result" && photoResult && (
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              {photoPreview && <img src={photoPreview} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 12, flexShrink: 0 }} />}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10.5, color: C.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Détecté</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{photoResult.plat}</div>
                <div style={{ fontSize: 11.5, color: C.mut }}>≈ {kcalVals(photoResult)} kcal · ajuste si besoin</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              {[["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => (
                <div key={k} style={{ flex: 1 }}>
                  <input value={photoResult[k]} onChange={e => setPhotoResult({ ...photoResult, [k]: e.target.value.replace(/[^0-9.]/g, "") })} inputMode="decimal"
                    style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }} />
                  <div style={{ fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 }}>{l} (g)</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button onClick={resetPhoto} style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Annuler</button>
              <button onClick={addPhotoMeal} style={{ flex: 2, background: C.ember, border: "none", color: "#1b1205", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Ajouter à ma journée</button>
            </div>
          </div>
        )}
      </div>

      <h3 style={sectionH}>Ajout rapide</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {QUICK_FOODS.map(f => (
          <button key={f.n} onClick={() => addMacros({ p: f.p, c: f.c, f: f.f })} style={chip}>
            <span style={{fontSize:13,lineHeight:1,color:C.ember}}>➕</span> {f.n}
          </button>
        ))}
      </div>

      <h3 style={sectionH}>Ajouter à la main</h3>
      <div style={card}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          {[["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => (
            <div key={k} style={{ flex: 1 }}>
              <input value={manual[k]} onChange={e => setManual({ ...manual, [k]: e.target.value.replace(/[^0-9.]/g, "") })} inputMode="decimal" placeholder="0"
                style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }} />
              <div style={{ fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 }}>{l} (g)</div>
            </div>
          ))}
          <button onClick={addManual} style={{ background: C.ember, color: "#1b1205", border: "none", borderRadius: 10, padding: "10px 15px", fontSize: 18, fontWeight: 800, cursor: "pointer", lineHeight: 1 }}>+</button>
        </div>
      </div>

      <button onClick={() => setMacros({ p: 0, c: 0, f: 0 })}
        style={{ marginTop: 14, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <span style={{fontSize:14,lineHeight:1}}>➖</span> Remettre la journée à zéro
      </button>

      <h3 style={sectionH}>Historique 7 jours</h3>
      {macroHist === null ? (
        <div style={{ color: C.mut, fontSize: 13 }}>Chargement...</div>
      ) : (() => {
        const logged = macroHist.filter(d => d.kcal > 0);
        const n = logged.length;
        const avg = (sel) => n ? logged.reduce((s, d) => s + sel(d), 0) / n : 0;
        const maxK = Math.max(TARGETS.kcal, ...macroHist.map(x => x.kcal));
        const rows = [
          ["Calories", Math.round(avg(d => d.kcal)), TARGETS.kcal, "kcal"],
          ["Protéines", Math.round(avg(d => d.p)), TARGETS.protein, "g"],
          ["Glucides", Math.round(avg(d => d.c)), TARGETS.carbs, "g"],
          ["Lipides", Math.round(avg(d => d.f)), TARGETS.fat, "g"],
        ];
        return (
          <div style={card}>
            <div style={{ fontSize: 11, color: C.mut, marginBottom: 11 }}>Moyenne sur {n} jour{n > 1 ? "s" : ""} avec données{n ? " · vs ta cible" : ""}</div>
            {n === 0 ? (
              <div style={{ fontSize: 13, color: C.mut, textAlign: "center", padding: "8px 0" }}>Aucune donnée cette semaine. Tes repas du jour alimenteront cet historique.</div>
            ) : rows.map(([label, val, target, unit]) => {
              const z = zone(val, target);
              const pct = Math.min(100, target ? (val / target) * 100 : 0);
              return (
                <div key={label} style={{ marginBottom: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 11.5, color: C.mut }}>{label}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: z.color }}>{val} / {target} {unit} · {z.label}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: C.line, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" }} />
                  </div>
                </div>
              );
            })}
            {n > 0 && (
              <div style={{ marginTop: 4, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
                <IndulgenceGauge satfat={Math.round(avg(d => d.f) * 0.4)} sugar={null} daily title="Gras saturés · moyenne estimée (~40% des lipides)" />
              </div>
            )}
            <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 56, marginTop: 14 }}>
              {macroHist.map((d, i) => (
                <div key={i} style={{ flex: 1, height: `${d.kcal > 0 ? Math.max(4, (d.kcal / maxK) * 100) : 0}%`, minHeight: d.kcal > 0 ? 4 : 0, background: d.kcal > 0 ? zone(d.kcal, TARGETS.kcal).color : C.line, borderRadius: "4px 4px 0 0" }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
              {macroHist.map((d, i) => (
                <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 8.5, color: d.date === dateKey() ? C.ember : C.mut }}>{d.date.slice(8)}/{d.date.slice(5, 7)}</span>
              ))}
            </div>
          </div>
        );
      })()}

      <h3 style={sectionH}>Ajouter un repas passé</h3>
      {!pastOpen ? (
        <button onClick={() => { setPastOpen(true); setPastResult(null); setPastErr(""); }}
          style={{ width: "100%", background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <span style={{fontSize:16,lineHeight:1}}>➕</span> Ajouter un repas passé
        </button>
      ) : (
        <div style={card}>
          <div style={{ fontSize: 11, color: C.mut, marginBottom: 6 }}>Date du repas</div>
          <input type="date" value={pastDate} max={dateKey()} onChange={e => setPastDate(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center", marginBottom: 12 }} />
          <div style={{ fontSize: 11, color: C.mut, marginBottom: 6 }}>Décris ton repas</div>
          <textarea value={pastText} onChange={e => { setPastText(e.target.value); setPastResult(null); }} rows={3} placeholder={"Ex. poulet curry + riz basmati + 1 bière"}
            style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, lineHeight: 1.5, resize: "vertical" }} />
          {!pastResult ? (
            <button onClick={calcPast} disabled={pastBusy}
              style={{ width: "100%", marginTop: 12, background: pastBusy ? C.tealSoft : C.teal, color: pastBusy ? C.teal : C.bg, border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: pastBusy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <span style={{fontSize:16,lineHeight:1}}>✨</span> {pastBusy ? "Calcul des macros..." : "Calculer les macros avec l'IA"}
            </button>
          ) : (
            <>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 12 }}>
                {[["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => (
                  <div key={k} style={{ flex: 1 }}>
                    <input value={pastResult[k]} onChange={e => setPastResult({ ...pastResult, [k]: e.target.value.replace(/[^0-9.]/g, "") })} inputMode="decimal"
                      style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }} />
                    <div style={{ fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 }}>{l} (g)</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", fontSize: 12, color: C.mut, marginTop: 10 }}>
                ≈ {Math.round(((+pastResult.p || 0) + (+pastResult.c || 0)) * 4 + (+pastResult.f || 0) * 9)} kcal
              </div>
              <button onClick={addPast}
                style={{ width: "100%", marginTop: 12, background: C.ember, color: "#1b1205", border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
                Ajouter au {fmtShort(pastDate)}
              </button>
            </>
          )}
          {pastErr && <div style={{ fontSize: 11.5, color: C.mut, marginTop: 10, lineHeight: 1.45 }}>{pastErr}</div>}
          <button onClick={() => { setPastOpen(false); setPastResult(null); setPastErr(""); }}
            style={{ width: "100%", marginTop: 8, background: "none", border: "none", color: C.mut, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Annuler</button>
        </div>
      )}

      <h3 style={sectionH}>Poids · 14 jours</h3>
      {weightHist === null ? (
        <div style={{ color: C.mut, fontSize: 13 }}>Chargement...</div>
      ) : (() => {
        const pts = weightHist.map((d, i) => ({ ...d, i })).filter(d => d.weight != null);
        const lastW = pts.length ? pts[pts.length - 1].weight : null;
        if (pts.length === 0) {
          return <div style={{ ...card, borderStyle: "dashed", textAlign: "center", color: C.mut, fontSize: 13, lineHeight: 1.5 }}>Renseigne ton poids du jour (depuis l'accueil) pour suivre ton évolution ici.</div>;
        }
        const W = 320, H = 150, padT = 28, padB = 24, padL = 10, padR = 10;
        const ws = pts.map(p => p.weight);
        let lo = Math.min(...ws), hi = Math.max(...ws);
        const pad = Math.max(0.5, (hi - lo) * 0.2); lo -= pad; hi += pad;
        const x = (i) => padL + i * (W - padL - padR) / 13;
        const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
        const line = pts.map((p, k) => `${k === 0 ? "M" : "L"} ${x(p.i).toFixed(1)} ${y(p.weight).toFixed(1)}`).join(" ");
        return (
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 11.5, color: C.mut }}>Évolution sur 2 semaines</span>
              {lastW != null && <span style={{ fontSize: 13, fontWeight: 800, color: C.teal }}>dernier : {lastW} kg</span>}
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
              <path d={line} fill="none" stroke={C.teal} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {pts.map((p, k) => (
                <g key={k}>
                  <circle cx={x(p.i)} cy={y(p.weight)} r="3.5" fill={C.teal} />
                  <text x={x(p.i)} y={y(p.weight) - 9} fill={C.text} fontSize="10" fontWeight="700" textAnchor="middle">{p.weight}</text>
                  <text x={x(p.i)} y={H - 8} fill={p.date === dateKey() ? C.ember : C.mut} fontSize="8" textAnchor="middle">{p.date.slice(8)}/{p.date.slice(5, 7)}</text>
                </g>
              ))}
            </svg>
          </div>
        );
      })()}

      <div ref={recipesRef} style={{ marginTop: 28, paddingTop: 8, borderTop: `2px solid ${C.line}` }}>
        <RecipesTab addMacros={addMacros} openId={openRecipeId} newSignal={recipeNew} />
      </div>

      <div style={{ height: 12 }} />
    </>
  );
}


/* ---------- MacroCompare ---------- */
function MacroCompare({ protein = 0, carbs = 0, fat = 0, style }) {
  const p = +protein || 0, c = +carbs || 0, f = +fat || 0;
  const id = idealFor(style);
  const kcal = Math.round((p + c) * 4 + f * 9);
  const rows = [["Calories", kcal, id.kcal, "kcal"], ["Protéines", Math.round(p), id.protein, "g"], ["Glucides", Math.round(c), id.carbs, "g"], ["Lipides", Math.round(f), id.fat, "g"]];
  return (
    <div>
      <div style={{ fontSize: 11, color: C.mut, marginBottom: 9, lineHeight: 1.4 }}>
        Comparé à un « {style || "Repas"} » idéal <span style={{ color: C.mut }}>· {Math.round(id.share * 100)}% de ta journée</span>
      </div>
      {rows.map(([label, val, target, unit]) => {
        const z = zone(val, target);
        const pct = Math.min(100, target ? (val / target) * 100 : 0);
        return (
          <div key={label} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11.5, color: C.mut }}>{label}</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: z.color }}>{val} / {target} {unit} · {z.label}</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: C.line, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- IndulgenceGauge ---------- */
function IndulgenceGauge({ satfat, sugar, style, daily, title }) {
  const share = daily ? 1 : (MEAL_SHARE[style] ?? 0.35);
  const rows = [];
  if (satfat != null) rows.push(["Gras saturés", Math.round(satfat), Math.round(SATFAT_MAX * share)]);
  if (sugar != null) rows.push(["Sucre", Math.round(sugar), Math.round(SUGAR_MAX * share)]);
  if (rows.length === 0) return null;
  return (
    <div>
      <div style={{ fontSize: 11, color: C.mut, marginBottom: 9, lineHeight: 1.4 }}>{title || "À quel point ça « abuse »"}</div>
      {rows.map(([label, val, ceil]) => {
        const z = badZone(val, ceil);
        const pct = Math.min(100, ceil ? (val / ceil) * 100 : 0);
        return (
          <div key={label} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11.5, color: C.mut }}>{label}</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: z.color }}>{val} / {ceil} g · {z.label}</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: C.line, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- helpers recette ---------- */
function fileToDataURL(file, max = 420) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        try { resolve(canvas.toDataURL("image/jpeg", 0.72)); } catch (e) { reject(e); }
      };
      img.onerror = reject; img.src = reader.result;
    };
    reader.onerror = reject; reader.readAsDataURL(file);
  });
}
function mealTint(style) {
  switch (style) {
    case "Petit déj": return { bg: "#F7ECD6", fg: C.amber };
    case "Collation": return { bg: C.peach, fg: C.coral };
    case "Dessert": return { bg: "#E4F2E9", fg: C.good };
    default: return { bg: C.mint, fg: C.teal };
  }
}
function RecipeThumb({ recipe, size = 46, radius = 12 }) {
  if (recipe && recipe.photo) {
    return <img src={recipe.photo} alt="" style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", flexShrink: 0, display: "block" }} />;
  }
  const t = mealTint(recipe && recipe.style);
  return (
    <div style={{ width: size, height: size, borderRadius: radius, flexShrink: 0, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ChefHat size={Math.round(size * 0.46)} color={t.fg} strokeWidth={2} />
    </div>
  );
}

/* ---------- RecipePicker ---------- */
function RecipePicker({ recipes, dayLabel, added, onAdd, onClose }) {
  const styleOpts = ["Petit déj", "Repas", "Collation", "Dessert"];
  const [f, setF] = useState("Tout");
  const [q, setQ] = useState("");
  const kcalOf = (r) => Math.round((+r.protein || 0) * 4 + (+r.carbs || 0) * 4 + (+r.fat || 0) * 9);
  const list = recipes.filter(r => (f === "Tout" || r.style === f) && (!q.trim() || r.title.toLowerCase().includes(q.trim().toLowerCase())));
  const chip = (s) => (
    <button key={s} onClick={() => setF(s)} style={{ padding: "8px 14px", borderRadius: 99, border: `1px solid ${f === s ? C.coral : C.line}`, background: f === s ? C.coral : C.bg2, color: f === s ? "#fff" : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{s}</button>
  );
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,12,8,.38)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "86vh", display: "flex", flexDirection: "column", boxShadow: "0 -12px 40px rgba(0,0,0,.18)" }}>
        <div style={{ padding: "10px 0 2px", display: "flex", justifyContent: "center" }}><div style={{ width: 40, height: 4, borderRadius: 99, background: C.line }} /></div>
        <div style={{ padding: "8px 18px", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.coral, fontWeight: 800 }}>{dayLabel}</div>
            <div style={{ fontSize: 19, fontWeight: 800, fontFamily: FONT_DISPLAY }}>Ajouter une recette</div>
          </div>
          <button onClick={onClose} style={{ background: C.cardHi, border: `1px solid ${C.line}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.text, flexShrink: 0 }}><span style={{fontSize:17,lineHeight:1}}>✕</span></button>
        </div>
        <div style={{ display: "flex", gap: 7, padding: "2px 18px 10px", overflowX: "auto" }}>{["Tout", ...styleOpts].map(chip)}</div>
        <div style={{ padding: "0 18px 10px" }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un plat..." style={{ width: "100%", boxSizing: "border-box", background: C.bg2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 12, padding: "11px 13px", fontSize: 14, fontFamily: "inherit" }} />
        </div>
        <div style={{ overflowY: "auto", padding: "0 12px 22px" }}>
          {list.length === 0 && <div style={{ textAlign: "center", color: C.mut, fontSize: 13, padding: "24px 0" }}>Aucune recette pour ce filtre.</div>}
          {list.map(r => {
            const isAdded = added.includes(r.id);
            return (
              <button key={r.id} onClick={() => !isAdded && onAdd(r.id)} disabled={isAdded} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", background: "none", border: "none", borderRadius: 14, cursor: isAdded ? "default" : "pointer", textAlign: "left", opacity: isAdded ? 0.5 : 1 }}>
                <RecipeThumb recipe={r} size={48} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
                  <div style={{ fontSize: 11.5, color: C.mut, marginTop: 2 }}><b style={{ color: C.coral, fontFamily: FONT_MONO }}>{kcalOf(r)}</b> kcal · P{r.protein} G{r.carbs} L{r.fat}</div>
                </div>
                <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 99, background: isAdded ? C.mint : C.coral, color: isAdded ? C.teal : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{isAdded ? <span style={{fontSize:16,lineHeight:1}}>✅</span> : <span style={{fontSize:16,lineHeight:1}}>➕</span>}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


/* ---------- RecipesTab ---------- */
function RecipesTab({ addMacros, openId, newSignal }) {
  const styleOpts = ["Petit déj", "Repas", "Collation", "Dessert"];
  const [recipes, setRecipes] = useState(null);
  const [f, setF] = useState("Tout");
  const [open, setOpen] = useState(null);
  const [editing, setEditing] = useState(null);
  const photoRef = useRef(null);
  const [toast, setToast] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  useEffect(() => { if (openId) { setOpen(openId); setEditing(null); setF("Tout"); } }, [openId]);

  useEffect(() => {
    (async () => {
      let r = await store.get("recipes");
      const inited = await store.get("recipesInit");
      if (r == null && !inited) { r = RECIPES.map(x => ({ ...x })); store.set("recipes", r); store.set("recipesInit", 1); }
      setRecipes(Array.isArray(r) ? r : []);
    })();
  }, []);

  const persist = (list) => { setRecipes(list); store.set("recipes", list); };
  const kcal = (r) => Math.round((+r.protein || 0) * 4 + (+r.carbs || 0) * 4 + (+r.fat || 0) * 9);
  const flash = (m, ms = 2400) => { setToast(m); setTimeout(() => setToast(""), ms); };

  const startNew = () => { setOpen(null); setEditing({ id: "u" + Date.now(), style: "Repas", title: "", link: "", manual: false, protein: "", carbs: "", fat: "", ingText: "", stepsText: "", photo: null }); };
  useEffect(() => { if (newSignal) startNew(); }, [newSignal]);
  const startEdit = (r) => setEditing({ ...r, manual: false, link: r.link || "", protein: String(r.protein ?? ""), carbs: String(r.carbs ?? ""), fat: String(r.fat ?? ""), ingText: (r.ing || []).join("\n"), stepsText: (r.steps || []).join("\n") });
  const saveEdit = async () => {
    const d = editing;
    let mac;
    if (d.manual) mac = { protein: +d.protein || 0, carbs: +d.carbs || 0, fat: +d.fat || 0 };
    else if (d.aiVals) mac = d.aiVals;
    else {
      setAiLoading(true);
      try { mac = await aiMacros(d.ingText); }
      catch (e) { mac = recipeMacros(d.ingText); flash("IA indisponible : " + ((e && e.message) || "erreur") + " — calcul local utilisé", 6000); }
      setAiLoading(false);
    }
    const clean = {
      id: d.id, style: d.style, title: (d.title || "").trim() || "Nouvelle recette", link: (d.link || "").trim(),
      photo: d.photo || null,
      protein: mac.protein, carbs: mac.carbs, fat: mac.fat,
      satfat: mac.satfat != null ? mac.satfat : Math.round((mac.fat || 0) * 0.4),
      sugar: mac.sugar != null ? mac.sugar : null,
      ing: d.ingText.split("\n").map(s => s.trim()).filter(Boolean),
      steps: d.stepsText.split("\n").map(s => s.trim()).filter(Boolean),
    };
    const exists = recipes.some(r => r.id === clean.id);
    persist(exists ? recipes.map(r => r.id === clean.id ? clean : r) : [clean, ...recipes]);
    setEditing(null); setOpen(clean.id); flash(exists ? "Recette mise à jour" : "Recette ajoutée");
  };
  const runAI = async () => {
    if (!editing.ingText.trim()) { flash("Ajoute d'abord des ingrédients"); return; }
    setAiLoading(true);
    try { const v = await aiMacros(editing.ingText); setEditing(e => ({ ...e, aiVals: v, manual: false })); }
    catch (err) { setEditing(e => ({ ...e, aiVals: recipeMacros(e.ingText) })); flash("IA indisponible : " + ((err && err.message) || "erreur inconnue"), 7000); }
    setAiLoading(false);
  };
  const del = (id) => { persist(recipes.filter(r => r.id !== id)); setOpen(null); flash("Recette supprimée"); };
  const eat = (r) => { addMacros({ p: +r.protein || 0, c: +r.carbs || 0, f: +r.fat || 0 }); flash("Ajouté à ta journée : " + +r.protein || 0 + " P · " + +r.carbs || 0 + " G · " + +r.fat || 0 + " L"); };

  if (!recipes) return <div style={{ color: C.mut, fontSize: 13, paddingTop: 8 }}>Chargement des recettes...</div>;

  const fld = { width: "100%", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px 12px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" };
  const lbl = { fontSize: 11.5, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" };
  const pill = (l, v, c) => (
    <div style={{ flex: 1, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 4px", textAlign: "center" }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: c }}>{v}</div>
      <div style={{ fontSize: 10, color: C.mut, marginTop: 1 }}>{l}</div>
    </div>
  );
  const toastEl = toast ? (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 90, display: "flex", justifyContent: "center", zIndex: 50, pointerEvents: "none" }}>
      <div style={{ background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: 99, boxShadow: "0 6px 20px rgba(0,0,0,.4)" }}>{toast}</div>
    </div>
  ) : null;

  if (editing) {
    const isEdit = recipes.some(r => r.id === editing.id);
    const auto = recipeMacros(editing.ingText);
    const shown = editing.manual ? { protein: +editing.protein || 0, carbs: +editing.carbs || 0, fat: +editing.fat || 0 } : (editing.aiVals || auto);
    const kc = kcal(shown);
    const src = editing.manual ? "manuel" : editing.aiVals ? "ia" : "local";
    return (
      <>
        {toastEl}
        <Eyebrow color={C.ember}>{isEdit ? "Modifier" : "Nouvelle recette"}</Eyebrow>
        <h1 style={h1}>{editing.title || "Ta recette"}</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
          <div><div style={lbl}>Titre</div><input value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} placeholder="Ex. Wok de poulet" style={fld} /></div>
          <div><div style={lbl}>Style</div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{styleOpts.map(s => (<button key={s} onClick={() => setEditing({...editing, style: s})} style={{ padding: "7px 13px", borderRadius: 99, border: `1px solid ${editing.style === s ? C.ember : C.line}`, background: editing.style === s ? C.emberSoft : C.card, color: editing.style === s ? C.ember : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{s}</button>))}</div></div>
          <div><div style={lbl}>Lien <span style={{ textTransform: "none", fontWeight: 400 }}>· optionnel</span></div><input value={editing.link || ""} onChange={e => setEditing({...editing, link: e.target.value})} placeholder="https://…" style={fld} /></div>
          <div><div style={lbl}>Ingrédients <span style={{ textTransform: "none", fontWeight: 400 }}>· un par ligne, pour une personne</span></div><textarea value={editing.ingText} onChange={e => setEditing({...editing, ingText: e.target.value, aiVals: null})} rows={6} placeholder={"350 g de steak haché\n1 pain à burger\n1 tranche de cheddar"} style={{ ...fld, resize: "vertical", lineHeight: 1.6 }} /></div>
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}><div style={{ ...lbl, margin: 0 }}>Macros (par personne)</div></div>
            {editing.manual ? (
              <div style={{ display: "flex", gap: 8 }}>
                {[["protein", "Protéines"], ["carbs", "Glucides"], ["fat", "Lipides"]].map(([k, l]) => (
                  <div key={k} style={{ flex: 1 }}>
                    <input value={editing[k]} onChange={e => setEditing({...editing, [k]: e.target.value.replace(/[^0-9.]/g, "")})} inputMode="decimal" placeholder="0" style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "8px", fontSize: 14, textAlign: "center" }} />
                    <div style={{ fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 }}>{l} (g)</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>{pill("protéines", shown.protein + " g", C.ember)}{pill("glucides", shown.carbs + " g", C.teal)}{pill("lipides", shown.fat + " g", C.amber)}</div>
            )}
            <div style={{ marginTop: 12, textAlign: "center", fontSize: 13, color: C.mut }}>≈ <span style={{ fontSize: 20, fontWeight: 800, color: C.ember }}>{kc}</span> kcal / personne</div>
            <button onClick={runAI} disabled={aiLoading} style={{ width: "100%", marginTop: 12, background: aiLoading ? C.tealSoft : C.teal, color: aiLoading ? C.teal : C.bg, border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}><span style={{fontSize:16,lineHeight:1}}>✨</span> {aiLoading ? "Calcul en cours…" : "Calculer avec l'IA"}</button>
            <button onClick={() => setEditing({...editing, manual: !editing.manual, protein: String(shown.protein), carbs: String(shown.carbs), fat: String(shown.fat)})} style={{ width: "100%", marginTop: 8, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 10, padding: "9px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Corriger à la main</button>
          </div>
          <div><div style={lbl}>Préparation <span style={{ textTransform: "none", fontWeight: 400 }}>· une étape par ligne</span></div><textarea value={editing.stepsText} onChange={e => setEditing({...editing, stepsText: e.target.value})} rows={5} placeholder={"Saisir le poulet 8 min\nAjouter la sauce\n..."} style={{ ...fld, resize: "vertical", lineHeight: 1.5 }} /></div>
          <div style={{ display: "flex", gap: 10 }}><button onClick={() => setEditing(null)} style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Annuler</button><button onClick={saveEdit} disabled={aiLoading} style={{ flex: 2, background: C.ember, border: "none", color: "#1b1205", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer", opacity: aiLoading ? 0.7 : 1 }}>Enregistrer</button></div>
        </div>
        <div style={{ height: 16 }} />
      </>
    );
  }
  const styles = ["Tout", ...styleOpts];
  const list = recipes.filter(r => f === "Tout" || r.style === f);
  return (
    <>
      {toastEl}
      <Eyebrow color={C.ember}>Recettes</Eyebrow>
      <h1 style={h1}>Riches en protéines, jamais fades</h1>
      <p style={{ color: C.mut, margin: "0 0 14px", fontSize: 13 }}>Modifie, ajoute, supprime — les calories se recalculent toutes seules.</p>

      <button onClick={startNew} style={{ width: "100%", background: C.emberSoft, border: `1px solid ${C.ember}`, color: C.ember, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 16 }}>
        <span style={{fontSize:17,lineHeight:1}}>➕</span> Nouvelle recette
      </button>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {styles.map(s => (
          <button key={s} onClick={() => setF(s)}
            style={{ padding: "7px 13px", borderRadius: 99, border: `1px solid ${f === s ? C.ember : C.line}`, background: f === s ? C.emberSoft : C.card, color: f === s ? C.ember : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{s}</button>
        ))}
      </div>

      {list.length === 0 && (
        <div style={{ background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 22, textAlign: "center", color: C.mut, fontSize: 13 }}>
          Aucune recette ici. Ajoutes-en une avec le bouton ci-dessus.
        </div>
      )}

      {list.map(r => {
        const on = open === r.id;
        return (
          <div key={r.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, marginBottom: 11, overflow: "hidden" }}>
            <button onClick={() => setOpen(on ? null : r.id)} style={{ width: "100%", background: "none", border: "none", padding: 16, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" }}>
              <RecipeThumb recipe={r} size={50} radius={13} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: C.teal, background: C.tealSoft, padding: "2px 7px", borderRadius: 99 }}>{r.style}</span>
                  <span style={{ fontSize: 11, color: C.mut, fontWeight: 600 }}><b style={{ color: C.ember }}>{kcal(r)}</b> kcal · P {r.protein} · G {r.carbs} · L {r.fat}</span>
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 700 }}>{r.title}</div>
              </div>
              <span style={{fontSize:18,lineHeight:1,color:C.mut, transform: on ? "rotate(180deg)" : "none", transition: "transform .25s", flexShrink: 0 }}>▼</span>
            </button>
            {on && (
              <div style={{ padding: "0 16px 16px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  {pill("protéines", r.protein + " g", C.ember)}
                  {pill("glucides", r.carbs + " g", C.teal)}
                  {pill("lipides", r.fat + " g", C.amber)}
                  {pill("kcal", kcal(r), C.text)}
                </div>
                <div style={{ fontSize: 11.5, color: C.mut, marginBottom: 12 }}>Quantités et macros pour une personne</div>
                <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: 13, marginBottom: 14 }}>
                  <MacroCompare protein={r.protein} carbs={r.carbs} fat={r.fat} style={r.style} />
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
                    <IndulgenceGauge satfat={r.satfat != null ? r.satfat : Math.round((r.fat || 0) * 0.4)} sugar={r.sugar ?? null} style={r.style} />
                  </div>
                </div>
                {r.link && (
                  <a href={safeUrl(r.link)} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, textDecoration: "none", marginBottom: 14, background: C.emberSoft, border: `1px solid ${C.ember}`, color: C.ember, borderRadius: 11, padding: "11px", fontSize: 13.5, fontWeight: 800 }}>
                    <span style={{fontSize:16,lineHeight:1}}>🔗</span> Ouvrir la recette
                  </a>
                )}
                {r.ing?.length > 0 && (<>
                  <div style={lbl}>Ingrédients</div>
                  <ul style={{ margin: "0 0 6px", paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 }}>{r.ing.map((x, i) => <li key={i}>{x}</li>)}</ul>
                </>)}
                {r.steps?.length > 0 && (<>
                  <div style={{ ...lbl, marginTop: 12 }}>Préparation</div>
                  <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 }}>{r.steps.map((x, i) => <li key={i} style={{ marginBottom: 4 }}>{x}</li>)}</ol>
                </>)}
                <button onClick={() => eat(r)} style={{ width: "100%", marginTop: 16, background: C.tealSoft, border: `1px solid ${C.teal}`, color: C.teal, borderRadius: 11, padding: "11px", fontSize: 13.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <span style={{fontSize:15,lineHeight:1}}>➕</span> J'ai mangé ça — ajouter au compteur
                </button>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button onClick={() => startEdit(r)} style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <span style={{fontSize:14,lineHeight:1}}>✏️</span> Modifier
                  </button>
                  <button onClick={() => del(r.id)} style={{ flex: 1, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 11, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <span style={{fontSize:14,lineHeight:1}}>🗑️</span> Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ height: 8 }} />
    </>
  );
}


/* ---------- styles partagés ---------- */
const h1 = { fontSize: 21, fontWeight: 800, fontFamily: FONT_DISPLAY, margin: "3px 0 6px", letterSpacing: -0.4 };
const sectionH = { fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: C.mut, margin: "26px 0 11px" };
const cardBtn = { flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 14, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: C.text };
const navBtn = { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 };
/* ---------- Programme ---------- */
function ProgramTab() {
  const [recipes, setRecipes] = useState(null);
  const [progSessions, setProgSessions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [plans, setPlans] = useState({});
  const [pickFor, setPickFor] = useState(null);

  useEffect(() => { (async () => { let r = await store.get("recipes"); if (!Array.isArray(r) || !r.length) r = RECIPES; setRecipes(r); let ss = await store.get("sessions"); if (!Array.isArray(ss) || !ss.length) ss = SESSIONS.map(normalizeSession); setProgSessions(ss); })(); }, []);

  const days = weekDaysFrom(offset);
  useEffect(() => {
    (async () => { var map = {}; for (const dk of days) { var p = await store.get("plan:" + dk); map[dk] = p || { meals: [], session: null }; } setPlans(map); })();
  }, [offset]);

  var savePlan = (dk, next) => { setPlans(p => ({ ...p, [dk]: next })); store.set("plan:" + dk, next); };
  var setSession = (dk, sid) => savePlan(dk, { meals: (plans[dk]?.meals) || [], session: sid || null });
  var addMeal = (dk, rid) => { var cur = plans[dk] || { meals: [] }; if ((cur.meals || []).includes(rid)) return; savePlan(dk, { ...cur, meals: [...(cur.meals || []), rid] }); };
  var removeMeal = (dk, rid) => { var cur = plans[dk] || { meals: [] }; var jul = { ...(cur.juliette || {}) }; delete jul[rid]; savePlan(dk, { ...cur, meals: (cur.meals || []).filter(x => x !== rid), juliette: jul }); };
  var recById = (id) => (recipes || []).find(r => r.id === id);
  var dayTotals = (meals) => { var p = 0, c = 0, f = 0; (meals || []).forEach(rid => { var r = recById(rid); if (r) { p += +r.protein || 0; c += +r.carbs || 0; f += +r.fat || 0; } }); return { p, c, f, kcal: Math.round((p + c) * 4 + f * 9) }; };
  var miniGauge = (label, val, target) => { var z = zone(val, target); var pct = Math.min(100, target ? (val / target) * 100 : 0); return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: C.mut }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: z.color }}>{val} / {target}</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: C.line, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99 }} />
      </div>
    </div>
  ); };
  var rangeLabel = `${new Date(days[0] + "T00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} – ${new Date(days[6] + "T00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`;
  var sel = { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 9, padding: "8px 10px", fontSize: 13 };

  if (!recipes) return <div style={{ color: C.mut, fontSize: 13, paddingTop: 8 }}>Chargement…</div>;

  return (
    <>
      <Eyebrow color={C.ember}>Programme</Eyebrow>
      <h1 style={h1}>Ta semaine</h1>
      <p style={{ color: C.mut, margin: "0 0 14px", fontSize: 13.5 }}>Planifie séances et repas. Navigue sur autant de semaines que tu veux.</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: "8px 10px", marginBottom: 14 }}>
        <button onClick={() => setOffset(offset - 1)} style={navBtn}><span style={{fontSize:18,lineHeight:1}}>◀</span></button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{offset === 0 ? "Cette semaine" : offset === 1 ? "Semaine prochaine" : offset === -1 ? "Semaine dernière" : rangeLabel}</div>
          <div style={{ fontSize: 11, color: C.mut }}>{rangeLabel}</div>
        </div>
        <button onClick={() => setOffset(offset + 1)} style={navBtn}><span style={{fontSize:18,lineHeight:1}}>▶</span></button>
      </div>
      {days.map(dk => {
        var pl = plans[dk] || { meals: [], session: null };
        var isToday = dk === dateKey();
        return (
          <div key={dk} style={{ background: C.card, border: `1px solid ${isToday ? C.ember : C.line}`, borderRadius: 16, padding: 14, marginBottom: 11 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 800, textTransform: "capitalize", flex: 1 }}>{new Date(dk + "T00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}{isToday ? " · aujourd'hui" : ""}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{fontSize:15,lineHeight:1,color:C.ember}}>🏋️</span>
              <select value={pl.session || ""} onChange={e => setSession(dk, e.target.value)} style={sel}>
                <option value="">Repos / aucune séance</option>
                {[...new Set(progSessions.map(s => s.group))].map(g => (
                  <optgroup key={g} label={g}>
                    {progSessions.filter(s => s.group === g).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{fontSize:15,lineHeight:1,color:C.teal}}>👨‍🍳</span><span style={{ fontSize: 12.5, fontWeight: 700, color: C.mut }}>Repas</span></div>
            {(pl.meals || []).length === 0 && <div style={{ fontSize: 12, color: C.mut, marginBottom: 8 }}>Aucun repas prévu.</div>}
            {(pl.meals || []).map(rid => {
              var r = recById(rid);
              return (
                <div key={rid} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, marginBottom: 6 }}>
                  <RecipeThumb recipe={r} size={34} radius={9} />
                  <span style={{ fontSize: 13, flex: 1 }}>{r ? r.title : "Recette supprimée"}</span>
                  <button onClick={() => removeMeal(dk, rid)} style={{ background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 2 }}><span style={{fontSize:15,lineHeight:1}}>✕</span></button>
                </div>
              );
            })}
            <button onClick={() => setPickFor(dk)} style={{ marginTop: 4, background: "none", border: `1px dashed ${C.line}`, color: C.coral, borderRadius: 10, padding: "9px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><span style={{fontSize:14,lineHeight:1}}>➕</span> Ajouter une recette</button>
            {(pl.meals || []).length > 0 && (() => {
              var t = dayTotals(pl.meals);
              return (<div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, marginBottom: 9 }}>Apport des repas / objectif</div>
                {miniGauge("Calories", t.kcal, TARGETS.kcal)}
                {miniGauge("Protéines", Math.round(t.p), TARGETS.protein)}
                {miniGauge("Glucides", Math.round(t.c), TARGETS.carbs)}
                {miniGauge("Lipides", Math.round(t.f), TARGETS.fat)}</div>);
            })()}
          </div>);
      })}
      {pickFor && <RecipePicker recipes={recipes} dayLabel={new Date(pickFor + "T00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} added={(plans[pickFor]?.meals) || []} onAdd={(rid) => addMeal(pickFor, rid)} onClose={() => setPickFor(null)} />}
      <div style={{ height: 12 }} />
    </>
  );
}
/* ---------- Courses ---------- */
function CoursesTab() {
  const [recipes, setRecipes] = useState(null);
  const [items, setItems] = useState(null);
  const [newItem, setNewItem] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const uid = () => "i" + Math.random().toString(36).slice(2, 9);
  const persist = (list) => { setItems(list); store.set("shopping", list); };

  const collectLines = async (recs) => {
    const keys = await store.list("plan:");
    const td = dateKey();
    const lines = [];
    for (const k of keys) { const date = k.slice(5); if (date < td) continue; const pl = await store.get(k); if (!pl || !pl.meals) continue; if (pl.shop === false) continue; for (const rid of pl.meals) { const r = (recs || []).find(x => x.id === rid); if (!r) continue; const factor = (pl.juliette && pl.juliette[rid]) ? 1.75 : 1; for (const line of (r.ing || [])) if (line && line.trim()) lines.push(scaleLine(line.trim(), factor)); } }
    return lines;
  };

  const generate = async (recs, existing) => {
    setBusy(true); setErr("");
    const lines = await collectLines(recs || recipes);
    const base = existing || items || [];
    const prevChecked = {}; base.forEach(it => { if (it.checked && it.name) prevChecked[it.name] = true; });
    const manual = base.filter(it => it.manual);
    let consolidated = [];
    if (lines.length > 0) { try { consolidated = await aiShoppingList(lines); } catch (e) { consolidated = localAggregate(lines); setErr("IA indisponible, quantités additionnées localement."); } }
    const generated = consolidated.map(c => { const name = norm(c.item); const text = c.qty ? c.qty + " " + c.item : c.item; return { id: uid(), name, text, checked: !!prevChecked[name], manual: false }; });
    persist([...generated, ...manual]); setBusy(false);
  };

  useEffect(() => { (async () => { let r = await store.get("recipes"); if (!Array.isArray(r) || !r.length) r = RECIPES; setRecipes(r); const s = await store.get("shopping"); const stored = Array.isArray(s) ? s : []; setItems(stored); if (stored.length === 0) generate(r, stored); })(); }, []);

  const toggle = (id) => persist((items || []).map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  const del = (id) => persist((items || []).filter(it => it.id !== id));
  const startEdit = (it) => { setEditId(it.id); setEditText(it.text); };
  const saveEdit = () => { const t = editText.trim(); if (t) persist((items || []).map(it => it.id === editId ? { ...it, text: t, name: norm(t) } : it)); setEditId(null); setEditText(""); };
  const addManual = () => { const t = newItem.trim(); if (!t) return; persist([...(items || []), { id: uid(), name: norm(t), text: t, checked: false, manual: true }]); setNewItem(""); };
  const clearChecked = () => persist((items || []).filter(it => !it.checked));

  if (!items) return <div style={{ color: C.mut, fontSize: 13, paddingTop: 8 }}>Chargement…</div>;
  const sorted = [...items].sort((a, b) => (a.checked === b.checked ? 0 : a.checked ? 1 : -1));
  const remaining = items.filter(it => !it.checked).length;

  return (
    <>
      <Eyebrow color={C.ember}>Courses</Eyebrow>
      <h1 style={h1}>Ta liste</h1>
      <p style={{ color: C.mut, margin: "0 0 14px", fontSize: 13.5 }}>Générée depuis toutes les recettes planifiées à venir, avec les quantités additionnées.</p>
      <button onClick={() => generate()} disabled={busy} style={{ width: "100%", background: busy ? C.tealSoft : C.teal, color: busy ? C.teal : C.bg, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: busy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}><span style={{fontSize:16,lineHeight:1}}>✨</span> {busy ? "Calcul de la liste…" : "Actualiser depuis le programme"}</button>
      {err && <div style={{ fontSize: 11.5, color: C.mut, marginBottom: 12, lineHeight: 1.45 }}>{err}</div>}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addManual(); }} placeholder="Ajouter un article…" style={{ flex: 1, boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "11px 12px", fontSize: 14 }} />
        <button onClick={addManual} style={{ background: C.ember, color: "#1b1205", border: "none", borderRadius: 10, padding: "0 16px", fontSize: 18, fontWeight: 800, cursor: "pointer" }}>+</button>
      </div>
      {items.length === 0 ? (
        <div style={{ background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 22, textAlign: "center", color: C.mut, fontSize: 13 }}>Aucune recette planifiée. Ajoute des repas dans l'onglet Programme, puis actualise.</div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 2px 8px" }}>
            <span style={{ fontSize: 12.5, color: C.mut }}>{remaining} article{remaining > 1 ? "s" : ""}</span>
            <button onClick={clearChecked} style={{ background: "none", border: "none", color: C.mut, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Retirer les cochés</button>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "2px 14px" }}>
            {sorted.map((it, i) => (
              <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : "none" }}>
                <button onClick={() => toggle(it.id)} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${it.checked ? C.good : C.line}`, background: it.checked ? C.good : "transparent", cursor: "pointer", flexShrink: 0 }}>
                  {it.checked && <span style={{fontSize:13,lineHeight:1,color:C.bg}}>✅</span>}
                </button>
                {editId === it.id ? (
                  <>
                    <input autoFocus value={editText} onChange={e => setEditText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") { setEditId(null); setEditText(""); } }} style={{ flex: 1, boxSizing: "border-box", background: C.bg, border: `1px solid ${C.teal}`, color: C.text, borderRadius: 8, padding: "7px 9px", fontSize: 14 }} />
                    <button onClick={saveEdit} style={{ background: C.coral, color: "#fff", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer" }}><span style={{fontSize:15,lineHeight:1}}>✅</span></button>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1, fontSize: 14, color: it.checked ? C.mut : C.text, textDecoration: it.checked ? "line-through" : "none" }}>{it.text}</span>
                    <button onClick={() => startEdit(it)} style={{ background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 4 }}><span style={{fontSize:15,lineHeight:1}}>✏️</span></button>
                    <button onClick={() => del(it.id)} style={{ background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 4 }}><span style={{fontSize:15,lineHeight:1}}>🗑️</span></button>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ height: 12 }} />
    </>
  );
}
/* ---------- Sommeil ---------- */
function SleepTab({ day, saveDay, hist, onSleepSaved, onDeleteSleep, saveSleepForDate }) {
  const s = day.sleep || {};
  const [mode, setMode] = useState("live");
  const [active, setActive] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [bed, setBed] = useState(s.bed || "23:00");
  const [wake, setWake] = useState(s.wake || "07:00");
  const [q, setQ] = useState(s.quality || 0);
  const [justEnded, setJustEnded] = useState(false);
  const [manualDate, setManualDate] = useState(dateKey());

  useEffect(() => {
    (async () => {
      const act = await store.get("sleepActive");
      if (act && act.startedAt && day.sleep && day.sleep.endedAt && day.sleep.endedAt >= act.startedAt) {
        store.del("sleepActive"); setActive(null);
      } else {
        setActive(act);
      }
    })();
    const id = setInterval(() => setNow(Date.now()), 20000);
    return () => clearInterval(id);
  }, []);

  const today = dateKey();
  const hhmm = (d) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const calcHours = (b, w) => {
    const [bh, bm] = b.split(":").map(Number), [wh, wm] = w.split(":").map(Number);
    let mins = (wh * 60 + wm) - (bh * 60 + bm); if (mins <= 0) mins += 1440;
    return Math.round((mins / 60) * 10) / 10;
  };
  const startNight = () => {
    const a = { startedAt: new Date().toISOString() };
    store.set("sleepActive", a); setActive(a); setNow(Date.now()); setJustEnded(false);
  };
  const endNight = () => {
    if (!active) return;
    const start = new Date(active.startedAt), end = new Date();
    const b = hhmm(start), w = hhmm(end);
    const hours = Math.round(((end - start) / 3600000) * 10) / 10;
    setBed(b); setWake(w);
    saveDay({ ...day, sleep: { bed: b, wake: w, quality: q, hours, endedAt: end.toISOString() } });
    onSleepSaved(today, hours, q);
    store.del("sleepActive"); setActive(null); setJustEnded(true);
  };
  const saveManual = () => {
    const hours = calcHours(bed, wake);
    const d = manualDate || today;
    saveSleepForDate(d, { bed, wake, quality: q, hours, endedAt: new Date().toISOString() });
    setJustEnded(true);
  };
  const pickResave = (n) => {
    setQ(n);
    const sl = { ...(day.sleep || {}), quality: n };
    saveDay({ ...day, sleep: sl });
    onSleepSaved(today, sl.hours, n);
  };

  const elapsed = Math.max(0, active ? now - new Date(active.startedAt).getTime() : 0);
  const eh = Math.floor(elapsed / 3600000), em = Math.floor((elapsed % 3600000) / 60000);

  const data = hist.filter(h => h.sleepH != null).sort((a, b) => (a.date < b.date ? -1 : 1));
  const lastN = (n) => data.slice(-n);
  const avgOf = (arr) => arr.length ? Math.round((arr.reduce((s, d) => s + d.sleepH, 0) / arr.length) * 10) / 10 : null;
  const avg7 = avgOf(lastN(7));
  const avg30 = avgOf(lastN(30));
  const maxH = Math.max(9, ...data.map(d => d.sleepH));

  const cardBox = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: 18 };
  const btnTeal = { width: "100%", background: C.coral, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 };
  const qRow = (onPick) => (
    <>
      <div style={{ fontSize: 12, color: C.mut, margin: "0 0 8px" }}>Qualité ressentie</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => onPick(n)}
            style={{ flex: 1, padding: "10px 0", borderRadius: 11, border: `1px solid ${q >= n ? C.teal : C.line}`, background: q >= n ? C.tealSoft : C.bg, color: q >= n ? C.teal : C.mut, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>{n}</button>
        ))}
      </div>
    </>
  );

  return (
    <>
      <Eyebrow color={C.teal}>Sommeil</Eyebrow>
      <h1 style={h1}>Récupérer, c'est progresser</h1>
      <p style={{ color: C.mut, margin: "0 0 16px", fontSize: 14, lineHeight: 1.5 }}>Vise 7 h 30–8 h, et surtout des horaires réguliers.</p>

      <div style={{ display: "flex", gap: 6, background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 12, padding: 4, marginBottom: 14 }}>
        {[["live", "Démarrer / terminer"], ["manual", "Saisir à la main"]].map(([m, l]) => (
          <button key={m} onClick={() => setMode(m)}
            style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 700, background: mode === m ? C.teal : "transparent", color: mode === m ? C.bg : C.mut }}>{l}</button>
        ))}
      </div>

      {mode === "live" ? (
        active ? (
          <div style={cardBox}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
              <span style={{fontSize:20,lineHeight:1,color:C.teal}}>🌙</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Nuit en cours</div>
                <div style={{ fontSize: 12, color: C.mut }}>démarrée à {hhmm(new Date(active.startedAt))}</div>
              </div>
            </div>
            <div style={{ textAlign: "center", margin: "12px 0 16px" }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: C.teal }}>{eh} h {String(em).padStart(2, "0")}</span>
              <div style={{ fontSize: 12, color: C.mut }}>de repos écoulées</div>
            </div>
            <button onClick={endNight} style={btnTeal}><span style={{fontSize:18,lineHeight:1}}>🌅</span> Je me réveille</button>
          </div>
        ) : (
          <>
            <button onClick={startNight} style={{ ...btnTeal, padding: "18px", fontSize: 16 }}><span style={{fontSize:19,lineHeight:1}}>🌙</span> Démarrer la nuit</button>
            <p style={{ fontSize: 12.5, color: C.mut, textAlign: "center", margin: "11px 0 0", lineHeight: 1.5 }}>
              Appuie quand tu te couches. Au réveil, tu termines et l'heure est prise toute seule.
            </p>
            {justEnded && day.sleep && (
              <div style={{ ...cardBox, marginTop: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{fontSize:16,lineHeight:1,color:C.good}}>✅</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Nuit enregistrée</span>
                </div>
                <div style={{ fontSize: 12.5, color: C.mut, margin: "0 0 14px" }}>{day.sleep.bed} → {day.sleep.wake} · {hToHM(day.sleep.hours)} de sommeil</div>
                {qRow(pickResave)}
              </div>
            )}
          </>
        )
      ) : (
        <div style={cardBox}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: C.mut, marginBottom: 6 }}>Date de la nuit <span style={{ color: C.mut }}>(au réveil)</span></div>
            <input type="date" value={manualDate} max={dateKey()} onChange={e => { setManualDate(e.target.value); setJustEnded(false); }}
              style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "11px", fontSize: 15, textAlign: "center" }} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["Coucher", bed, setBed], ["Lever", wake, setWake]].map(([l, val, set]) => (
              <div key={l} style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: C.mut, marginBottom: 6 }}>{l}</div>
                <input type="time" value={val} onChange={e => set(e.target.value)}
                  style={{ width: "100%", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "11px", fontSize: 16, textAlign: "center" }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", margin: "16px 0 14px" }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: C.teal }}>{hToHM(calcHours(bed, wake))}</span>
            <span style={{ fontSize: 13, color: C.mut }}> de sommeil</span>
          </div>
          {qRow(setQ)}
          <button onClick={saveManual} style={{ ...btnTeal, marginTop: 14 }}>Enregistrer la nuit</button>
          {justEnded && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 12, color: C.good, fontSize: 13, fontWeight: 700 }}>
              <span style={{fontSize:15,lineHeight:1}}>✅</span> Nuit du {fmtShort(manualDate)} enregistrée
            </div>
          )}
        </div>
      )}

      <h3 style={sectionH}>Historique du sommeil</h3>
      {data.length === 0 ? (
        <div style={{ background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 24, textAlign: "center", color: C.mut, fontSize: 13 }}>
          Enregistre ta première nuit, tes statistiques apparaîtront ici.
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            {[["7 jours", avg7, lastN(7).length], ["30 jours", avg30, lastN(30).length]].map(([label, val, n]) => (
              <div key={label} style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "14px 16px" }}>
                <div style={{ fontSize: 10.5, color: C.mut, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Moyenne {label}</div>
                <div style={{ fontSize: 27, fontWeight: 800, color: C.teal, marginTop: 4, lineHeight: 1 }}>
                  {val != null ? hToHM(val) : "—"}
                </div>
                <div style={{ fontSize: 11, color: C.mut, marginTop: 3 }}>{n} nuit{n > 1 ? "s" : ""} enregistrée{n > 1 ? "s" : ""}</div>
              </div>
            ))}
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>14 dernières nuits</span>
              <span style={{ fontSize: 11, color: C.teal, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 14, borderTop: `1px dashed ${C.teal}`, display: "inline-block" }} /> cible 7 h 30
              </span>
            </div>
            <div style={{ position: "relative", height: 124, borderBottom: `1px solid ${C.line}` }}>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: `${(7.5 / maxH) * 90}%`, borderTop: `1px dashed ${C.teal}`, opacity: 0.45 }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 4 }}>
                {lastN(14).map((d, i) => (
                  <div key={i} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }}>
                    {d.sleepH != null && (
                      <span style={{ fontSize: 8.5, fontWeight: 800, color: d.sleepH >= 7.5 ? C.teal : C.mut, marginBottom: 2, lineHeight: 1, whiteSpace: "nowrap" }}>{hToHMc(d.sleepH)}</span>
                    )}
                    <div style={{ width: "100%", height: `${d.sleepH != null ? Math.max(3, (d.sleepH / maxH) * 90) : 0}%`, background: d.sleepH >= 7.5 ? C.teal : C.line, borderRadius: "5px 5px 0 0", transition: "height .4s" }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
              {lastN(14).map((d, i) => (
                <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 9, color: C.mut }}>{d.date.slice(8)}/{d.date.slice(5, 7)}</span>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 11.5, color: C.mut, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "18px 4px 8px" }}>
            Détail · {data.length} nuit{data.length > 1 ? "s" : ""}
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "2px 14px", maxHeight: 320, overflowY: "auto" }}>
            {data.slice().reverse().map((d, i, arr) => (
              <div key={d.date} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: d.sleepH >= 7.5 ? C.teal : d.sleepH >= 6 ? C.amber : C.ember, flexShrink: 0 }} />
                <span style={{ fontSize: 13, textTransform: "capitalize" }}>
                  {new Date(d.date + "T00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
                  {d.date === today ? " · auj." : ""}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: C.teal }}>{hToHM(d.sleepH)}</span>
                {d.quality ? <span style={{ fontSize: 11.5, color: C.mut }}>· {d.quality}/5</span> : null}
                <button onClick={() => onDeleteSleep(d.date)} aria-label="Supprimer la nuit"
                  style={{ marginLeft: "auto", background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 6, display: "flex" }}>
                  <span style={{fontSize:16,lineHeight:1}}>🗑️</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ height: 12 }} />
    </>
  );
}
