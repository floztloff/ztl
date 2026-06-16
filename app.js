const C = {
  bg: "#13151A",
  bg2: "#181B22",
  card: "#1E222B",
  cardHi: "#242A34",
  line: "#2C323D",
  text: "#ECEEF2",
  mut: "#8B94A4",
  ember: "#FF7A3D",
  emberSoft: "rgba(255,122,61,0.14)",
  teal: "#56C7BE",
  tealSoft: "rgba(86,199,190,0.14)",
  good: "#7BD389"
};
const TARGETS = { kcal: 2400, protein: 130, carbs: 290, fat: 65 };
const MEAL_SHARE = { "Petit d\xE9j": 0.25, "Repas": 0.35, "Collation": 0.1, "Dessert": 0.1 };
const SATFAT_MAX = 22;
const SUGAR_MAX = 50;
const idealFor = (style) => {
  const s = MEAL_SHARE[style] ?? 0.35;
  return { share: s, kcal: Math.round(TARGETS.kcal * s), protein: Math.round(TARGETS.protein * s), carbs: Math.round(TARGETS.carbs * s), fat: Math.round(TARGETS.fat * s) };
};
function zone(value, target) {
  const r = target > 0 ? value / target : 0;
  if (r < 0.5) return { label: "\xE0 compl\xE9ter", color: C.mut };
  if (r < 0.85) return { label: "en bonne voie", color: C.teal };
  if (r <= 1.1) return { label: "dans la cible", color: C.good };
  if (r <= 1.3) return { label: "un peu trop", color: "#C9A24B" };
  return { label: "d\xE9passement", color: C.ember };
}
function badZone(value, ceiling) {
  const r = ceiling > 0 ? value / ceiling : 0;
  if (r <= 0.6) return { label: "l\xE9ger", color: C.good };
  if (r <= 1) return { label: "raisonnable", color: C.teal };
  if (r <= 1.4) return { label: "un peu trop", color: "#C9A24B" };
  return { label: "\xE7a abuse", color: C.ember };
}
const hToHM = (h) => {
  if (h == null || isNaN(h)) return "";
  let H = Math.floor(h + 1e-6), M = Math.round((h - H) * 60);
  if (M === 60) {
    H += 1;
    M = 0;
  }
  return M === 0 ? `${H}h` : `${H}h ${String(M).padStart(2, "0")}min`;
};
const hToHMc = (h) => {
  if (h == null || isNaN(h)) return "";
  let H = Math.floor(h + 1e-6), M = Math.round((h - H) * 60);
  if (M === 60) {
    H += 1;
    M = 0;
  }
  return M === 0 ? `${H}h` : `${H}h${String(M).padStart(2, "0")}`;
};
const dateKey = (d = /* @__PURE__ */ new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmtDay = (d = /* @__PURE__ */ new Date()) => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
const fmtShort = (dk) => (/* @__PURE__ */ new Date(dk + "T00:00")).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
const addDays = (dk, n) => {
  const d = /* @__PURE__ */ new Date(dk + "T00:00");
  d.setDate(d.getDate() + n);
  return dateKey(d);
};
const weekDaysFrom = (offset) => {
  const d = /* @__PURE__ */ new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - (d.getDay() + 6) % 7 + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    return dateKey(x);
  });
};
const safeUrl = (u) => {
  u = (u || "").trim();
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : "https://" + u;
};
const SESSIONS = [
  { id: "maisonA", group: "Phase reprise", name: "Maison A", sub: "Plein le corps \xB7 ~25 min", ex: [
    {
      id: "ma1",
      name: "Squat au poids du corps",
      scheme: "2 \xD7 12",
      cue: "Descends comme pour t'asseoir, dos droit, pousse dans les talons.",
      art: "squat",
      do: ["Pieds largeur d'\xE9paules, pointes l\xE9g\xE8rement ouvertes", "Pousse les fesses en arri\xE8re, dos droit, poitrine ouverte", "Descends cuisses parall\xE8les au sol, poids dans les talons"],
      avoid: ["Genoux qui rentrent vers l'int\xE9rieur", "Talons qui d\xE9collent du sol", "Dos qui s'arrondit"]
    },
    {
      id: "ma2",
      name: "Pompes inclin\xE9es",
      scheme: "2 \xD7 8-10",
      cue: "Mains sur\xE9lev\xE9es sur un meuble, corps gain\xE9. Plus haut = plus facile.",
      tag: "soft",
      art: "incline",
      do: ["Mains un peu plus larges que les \xE9paules sur un support stable", "Corps gain\xE9 en planche, descends la poitrine vers le support", "Coudes \xE0 ~45\xB0 du corps \u2014 plus doux pour l'\xE9paule"],
      avoid: ["Bassin qui s'affaisse ou fesses en l'air", "Descendre trop bas si l'\xE9paule tire", "Coudes \xE9cart\xE9s \xE0 90\xB0"]
    },
    {
      id: "ma3",
      name: "Rowing \xE9lastique",
      scheme: "2 \xD7 12",
      cue: "Tire les coudes vers l'arri\xE8re, serre les omoplates.",
      tag: "good",
      art: "row",
      do: ["\xC9lastique \xE0 hauteur de poitrine, bras tendus devant", "Tire les coudes vers l'arri\xE8re en serrant les omoplates", "Reviens lentement, en contr\xF4le"],
      avoid: ["\xC9paules qui montent vers les oreilles", "Dos qui s'arrondit", "Mouvement fait \xE0 la va-vite"]
    },
    {
      id: "ma4",
      name: "Rotation externe \xE9lastique",
      scheme: "2 \xD7 12 / bras",
      cue: "Coude au corps, \xE9carte l'avant-bras. L\xE9ger et contr\xF4l\xE9.",
      tag: "good",
      art: "extrot",
      do: ["Coude coll\xE9 au flanc, pli\xE9 \xE0 90\xB0", "\xC9carte lentement l'avant-bras vers l'ext\xE9rieur", "Reste l\xE9ger et lent \u2014 c'est le but"],
      avoid: ["D\xE9coller le coude du corps", "\xC9lastique trop dur", "Geste rapide ou en force"]
    },
    {
      id: "ma5",
      name: "Gainage planche",
      scheme: "2 \xD7 20-30 s",
      cue: "Corps align\xE9, abdos et fessiers serr\xE9s.",
      art: "plank",
      do: ["Coudes sous les \xE9paules, appui avant-bras + pointes de pieds", "Corps parfaitement align\xE9, abdos et fessiers serr\xE9s", "Respire normalement"],
      avoid: ["Fesses en l'air ou dos creus\xE9", "T\xEAte qui pend vers le bas", "Tenir affaiss\xE9 : 15 s parfaites valent mieux"]
    }
  ] },
  { id: "maisonB", group: "Phase reprise", name: "Maison B", sub: "Plein le corps \xB7 ~25 min", ex: [
    {
      id: "mb1",
      name: "Fentes altern\xE9es",
      scheme: "2 \xD7 10 / jambe",
      cue: "Grand pas, genou arri\xE8re vers le sol, buste droit.",
      art: "lunge",
      do: ["Grand pas en avant, descends les deux genoux", "Genou avant au-dessus de la cheville, buste droit", "Pousse sur le talon avant pour remonter"],
      avoid: ["Genou avant qui d\xE9passe la pointe du pied", "Buste pench\xE9 en avant", "Pas trop court"]
    },
    {
      id: "mb2",
      name: "Pont fessier",
      scheme: "2 \xD7 15",
      cue: "Pousse les hanches vers le haut, serre les fessiers en haut.",
      art: "bridge",
      do: ["Dos au sol, pieds \xE0 plat largeur de bassin", "Pousse dans les talons, monte les hanches", "Serre fort les fessiers en haut, 1 seconde"],
      avoid: ["Pousser avec le bas du dos", "Cambrer les reins", "Monter trop haut"]
    },
    {
      id: "mb3",
      name: "Face pull \xE9lastique",
      scheme: "2 \xD7 15",
      cue: "Tire vers le visage, coudes hauts. Top pour l'\xE9paule.",
      tag: "good",
      art: "facepull",
      do: ["\xC9lastique \xE0 hauteur du visage, devant toi", "Tire vers le front, coudes hauts et ouverts", "Serre les omoplates en fin de mouvement"],
      avoid: ["Coudes qui tombent vers le bas", "Hausser les \xE9paules", "\xC9lastique trop dur"]
    },
    {
      id: "mb4",
      name: "Pompes inclin\xE9es",
      scheme: "2 \xD7 8-10",
      cue: "Comme en s\xE9ance A.",
      tag: "soft",
      art: "incline",
      do: ["Mains un peu plus larges que les \xE9paules sur un support stable", "Corps gain\xE9 en planche, descends la poitrine vers le support", "Coudes \xE0 ~45\xB0 du corps \u2014 plus doux pour l'\xE9paule"],
      avoid: ["Bassin qui s'affaisse ou fesses en l'air", "Descendre trop bas si l'\xE9paule tire", "Coudes \xE9cart\xE9s \xE0 90\xB0"]
    },
    {
      id: "mb5",
      name: "Pallof press \xE9lastique",
      scheme: "2 \xD7 10 / c\xF4t\xE9",
      cue: "\xC9lastique sur le c\xF4t\xE9, tends les bras devant sans tourner le buste.",
      art: "pallof",
      do: ["\xC9lastique fix\xE9 sur le c\xF4t\xE9, \xE0 hauteur de poitrine", "Tends les bras droit devant, puis reviens", "Garde le buste face \xE0 l'avant, sans tourner"],
      avoid: ["Laisser le buste pivoter vers l'\xE9lastique", "Cambrer le dos", "Bras trop rel\xE2ch\xE9s"]
    }
  ] },
  { id: "upperA", group: "Programme salle", name: "Haut A", sub: "Basic Fit \xB7 ~45 min", ex: [
    { id: "ua1", name: "Tirage vertical poulie (prise neutre)", scheme: "3 \xD7 10", cue: "Machine lat pulldown. Tire vers la poitrine, omoplates basses.", tag: "good" },
    { id: "ua2", name: "Rowing assis machine", scheme: "3 \xD7 10", cue: "Tire vers le ventre, dos droit.", tag: "good" },
    { id: "ua3", name: "D\xE9velopp\xE9 pec machine (l\xE9ger)", scheme: "3 \xD7 10", cue: "Chest press. Amplitude contr\xF4l\xE9e, ne force pas en arri\xE8re.", tag: "soft" },
    { id: "ua4", name: "Face pull poulie", scheme: "3 \xD7 15", cue: "Corde en haut, tire vers le visage.", tag: "good" },
    { id: "ua5", name: "Rotation externe poulie", scheme: "3 \xD7 12", cue: "Coiffe des rotateurs. L\xE9ger.", tag: "good" },
    { id: "ua6", name: "Curl biceps halt\xE8res", scheme: "3 \xD7 12", cue: "Coudes coll\xE9s au corps." }
  ] },
  { id: "lowerA", group: "Programme salle", name: "Bas A", sub: "Basic Fit \xB7 ~45 min", ex: [
    { id: "la1", name: "Presse \xE0 cuisses", scheme: "3 \xD7 12", cue: "Pieds largeur bassin, ne verrouille pas les genoux." },
    { id: "la2", name: "Leg curl (ischios)", scheme: "3 \xD7 12", cue: "Contr\xF4le la descente." },
    { id: "la3", name: "Fentes ou split squat", scheme: "2 \xD7 10 / jambe", cue: "Halt\xE8res l\xE9gers le long du corps." },
    { id: "la4", name: "Mollets debout", scheme: "3 \xD7 15", cue: "Talon bien bas pour \xE9tirer." },
    { id: "la5", name: "Gainage + Pallof", scheme: "3 \xD7 30 s", cue: "Anti-rotation, abdos serr\xE9s." }
  ] },
  { id: "upperB", group: "Programme salle", name: "Haut B", sub: "Basic Fit \xB7 ~45 min", ex: [
    { id: "ub1", name: "D\xE9velopp\xE9 \xE9paules machine (devant, l\xE9ger)", scheme: "3 \xD7 10", cue: "Jamais derri\xE8re la nuque.", tag: "soft" },
    { id: "ub2", name: "Tirage horizontal poulie", scheme: "3 \xD7 10", cue: "Serre les omoplates.", tag: "good" },
    { id: "ub3", name: "Pompes", scheme: "3 \xD7 max contr\xF4l\xE9", cue: "Amplitude que tu ma\xEEtrises.", tag: "soft" },
    { id: "ub4", name: "Oiseau / rear delts", scheme: "3 \xD7 15", cue: "Buste pench\xE9, \xE9carte les bras.", tag: "good" },
    { id: "ub5", name: "Extensions triceps poulie", scheme: "3 \xD7 12", cue: "Coudes fixes." }
  ] },
  { id: "lowerB", group: "Programme salle", name: "Bas B", sub: "Basic Fit \xB7 ~45 min", ex: [
    { id: "lb1", name: "Hack squat ou goblet squat", scheme: "3 \xD7 12", cue: "Dos cal\xE9, descends bas et contr\xF4l\xE9." },
    { id: "lb2", name: "Soulev\xE9 de terre roumain l\xE9ger", scheme: "3 \xD7 10", cue: "Charge l\xE9g\xE8re, dos droit, prise sans forcer l'\xE9paule." },
    { id: "lb3", name: "Extensions quadriceps", scheme: "3 \xD7 12", cue: "Pause en haut." },
    { id: "lb4", name: "Relev\xE9s de genoux / crunch poulie", scheme: "3 \xD7 12", cue: "Souffle en remontant." },
    { id: "lb5", name: "Mollets", scheme: "3 \xD7 15", cue: "Amplitude compl\xE8te." }
  ] }
];
const QUICK_FOODS = [
  { n: "\u0152uf", p: 6, c: 0.5, f: 5 },
  { n: "100 g poulet", p: 30, c: 0, f: 3 },
  { n: "100 g b\u0153uf", p: 26, c: 0, f: 8 },
  { n: "100 g saumon", p: 22, c: 0, f: 13 },
  { n: "Yaourt grec", p: 10, c: 6, f: 4 },
  { n: "Fromage blanc 150 g", p: 12, c: 6, f: 4 },
  { n: "Shake whey", p: 25, c: 3, f: 2 },
  { n: "Thon (bo\xEEte)", p: 25, c: 0, f: 1 },
  { n: "100 g riz cuit", p: 3, c: 28, f: 0 },
  { n: "100 g p\xE2tes cuites", p: 5, c: 25, f: 1 },
  { n: "Tranche de pain", p: 3, c: 15, f: 1 },
  { n: "Banane", p: 1, c: 27, f: 0 },
  { n: "Pomme", p: 0, c: 25, f: 0 },
  { n: "Avocat \xBD", p: 1, c: 4, f: 11 },
  { n: "1 c.\xE0.s huile", p: 0, c: 0, f: 14 },
  { n: "Poign\xE9e de noix", p: 5, c: 4, f: 18 }
];
const RECIPES = [
  {
    id: "r1",
    style: "Repas",
    title: "Poulet tikka express",
    protein: 48,
    carbs: 55,
    fat: 14,
    serves: 2,
    ing: ["350 g de poulet en cubes", "3 c.\xE0.s de yaourt grec", "2 c.\xE0.c de p\xE2te ou poudre tikka", "1 gousse d'ail, gingembre r\xE2p\xE9", "Riz basmati", "Coriandre fra\xEEche"],
    steps: ["M\xE9lange poulet + yaourt + \xE9pices + ail/gingembre, laisse 15 min.", "Po\xEAle bien chaude, saisis le poulet 8-10 min jusqu'\xE0 coloration.", "Sers sur riz basmati, coriandre dessus."]
  },
  {
    id: "r2",
    style: "Repas",
    title: "Chili con carne",
    protein: 42,
    carbs: 50,
    fat: 16,
    serves: 2,
    ing: ["300 g de b\u0153uf hach\xE9 5%", "1 bo\xEEte haricots rouges", "1 bo\xEEte tomates concass\xE9es", "1 oignon, 1 poivron", "Cumin, paprika fum\xE9, piment", "Riz ou tortillas"],
    steps: ["Fais revenir oignon + poivron, ajoute le b\u0153uf.", "\xC9pices, tomates, haricots. Laisse mijoter 20 min.", "Sers avec riz. Un peu de fromage blanc dessus."]
  },
  {
    id: "r3",
    style: "Repas",
    title: "Saumon r\xF4ti, courgettes & quinoa",
    protein: 40,
    carbs: 45,
    fat: 22,
    serves: 2,
    ing: ["2 pav\xE9s de saumon", "2 courgettes", "Tomates cerises", "Quinoa", "Huile d'olive, ail, citron, herbes de Provence"],
    steps: ["Quinoa \xE0 cuire selon le paquet.", "L\xE9gumes + huile d'olive + ail au four 20 min \xE0 200\xB0C.", "Ajoute le saumon les 12 derni\xE8res min. Citron au moment de servir."]
  },
  {
    id: "r4",
    style: "Repas",
    title: "Boulettes de dinde fa\xE7on grecque",
    protein: 45,
    carbs: 40,
    fat: 16,
    serves: 2,
    ing: ["350 g dinde hach\xE9e", "1 \u0153uf, ail, origan, persil", "Tzatziki (yaourt grec, concombre, ail)", "Pita ou riz", "Salade tomate-concombre"],
    steps: ["M\xE9lange dinde + \u0153uf + ail + herbes, forme des boulettes.", "Cuis 12 min \xE0 la po\xEAle, \xE0 feu moyen.", "Sers avec tzatziki, pita et salade."]
  },
  {
    id: "r5",
    style: "Repas",
    title: "Wok de b\u0153uf brocoli",
    protein: 44,
    carbs: 55,
    fat: 16,
    serves: 2,
    ing: ["300 g de b\u0153uf \xE9minc\xE9", "1 brocoli", "Sauce soja, gingembre, ail", "1 c.\xE0.c de miel", "Riz", "Graines de s\xE9same"],
    steps: ["Riz \xE0 cuire. Brocoli 3 min \xE0 la vapeur.", "Wok tr\xE8s chaud : saisis le b\u0153uf 2 min, retire.", "Ail/gingembre, soja + miel, remets b\u0153uf + brocoli 2 min. S\xE9same, riz."]
  },
  {
    id: "r6",
    style: "Repas",
    title: "Poulet teriyaki & edamame",
    protein: 46,
    carbs: 60,
    fat: 12,
    serves: 2,
    ing: ["350 g de poulet", "Sauce soja, miel, ail, gingembre", "Edamame", "Nouilles ou riz", "Oignon vert"],
    steps: ["Saisis le poulet en morceaux 8 min.", "Ajoute soja + miel + ail/gingembre, laisse r\xE9duire et napper.", "Sers avec nouilles, edamame et oignon vert."]
  },
  {
    id: "r7",
    style: "Repas",
    title: "Gratin p\xE2tes poulet-\xE9pinards",
    protein: 43,
    carbs: 65,
    fat: 20,
    serves: 2,
    ing: ["350 g de poulet", "P\xE2tes", "\xC9pinards", "Fromage blanc + un peu de cr\xE8me l\xE9g\xE8re", "Ail, parmesan", "Mozzarella r\xE2p\xE9e"],
    steps: ["P\xE2tes al dente. Po\xEAle le poulet avec l'ail.", "M\xE9lange p\xE2tes + poulet + \xE9pinards + sauce fromage blanc/cr\xE8me.", "Plat \xE0 gratin, mozza dessus, four 15 min \xE0 200\xB0C."]
  },
  {
    id: "r8",
    style: "Repas",
    title: "Hachis parmentier maison",
    protein: 40,
    carbs: 50,
    fat: 18,
    serves: 2,
    ing: ["300 g de b\u0153uf hach\xE9 5%", "Pur\xE9e de pommes de terre", "1 oignon, ail", "Concentr\xE9 de tomate, thym", "Un peu de gruy\xE8re"],
    steps: ["Revenir oignon + b\u0153uf + ail, concentr\xE9 de tomate, thym.", "Plat : b\u0153uf au fond, pur\xE9e au-dessus, gruy\xE8re.", "Four 20 min \xE0 200\xB0C jusqu'\xE0 coloration."]
  }
];
const CHECKLIST = [
  "4 s\xE9ances cette semaine, m\xEAme courtes",
  "Une prot\xE9ine \xE0 chaque repas",
  "Un meal-prep le dimanche",
  "Fast food : 1 fois max",
  "Prendre RDV contr\xF4le chirurgien"
];
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
  { k: ["tikka", "curry", "paprika", "cumin", "piment", "epice", "sel", "poivre", "moutarde"], per100: { p: 0, c: 0, f: 0 }, portion: 2 }
];
function parseQty(n) {
  let m = n.match(/(\d+)\s*\/\s*(\d+)/);
  if (m) return parseInt(m[1]) / parseInt(m[2]);
  m = n.match(/(\d+([.,]\d+)?)/);
  if (m) return parseFloat(m[1].replace(",", "."));
  return null;
}
function unitToGrams(n, qty, food) {
  if (/\bkg\b/.test(n)) return qty * 1e3;
  if (/\b(g|gr|gramme|grammes)\b/.test(n)) return qty;
  if (/\bcl\b/.test(n)) return qty * 10;
  if (/\b(l|litre|litres)\b/.test(n)) return qty * 1e3;
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
  const n = norm(line);
  let food = null, kl = 0;
  for (const fd of FOODS) for (const kw of fd.k) {
    const k = norm(kw);
    if (n.includes(k) && k.length > kl) {
      food = fd;
      kl = k.length;
    }
  }
  if (!food) return { p: 0, c: 0, f: 0, matched: false };
  const qty = parseQty(n);
  if (food.unitMacro) {
    const cnt = qty == null ? 1 : qty;
    return { p: food.unitMacro.p * cnt, c: food.unitMacro.c * cnt, f: food.unitMacro.f * cnt, matched: true };
  }
  let g;
  if (qty == null) {
    if (food.portion != null) g = food.portion * serves;
    else if (food.unit != null) g = food.unit;
    else if (food.can != null) g = food.can;
    else return { p: 0, c: 0, f: 0, matched: true };
  } else g = unitToGrams(n, qty, food);
  const m = food.per100;
  return { p: m.p * g / 100, c: m.c * g / 100, f: m.f * g / 100, matched: true };
}
function recipeMacros(ingText) {
  let p = 0, c = 0, f = 0, unmatched = 0, total = 0;
  for (const line of (ingText || "").split("\n")) {
    if (!line.trim()) continue;
    total++;
    const m = lineMacros(line, 1);
    if (!m.matched) unmatched++;
    p += m.p;
    c += m.c;
    f += m.f;
  }
  return { protein: Math.round(p), carbs: Math.round(c), fat: Math.round(f), satfat: Math.round(f * 0.4), sugar: null, unmatched, total };
}
async function callModel(prompt) {
  let lastErr;
  const models = ["claude-sonnet-4-20250514", "claude-sonnet-4-6", "claude-haiku-4-5-20251001"];
  for (const model of models) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model, max_tokens: 1024, temperature: 0, messages: [{ role: "user", content: prompt }] })
      });
      if (!res.ok) {
        let t = "";
        try {
          t = (await res.text()).slice(0, 80);
        } catch {
        }
        lastErr = new Error("HTTP " + res.status + " " + t);
        continue;
      }
      const data = await res.json();
      const text = (data.content || []).map((i) => i.type === "text" ? i.text : "").join("");
      if (text) return text;
      lastErr = new Error("r\xE9ponse vide");
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("indisponible");
}
async function aiMacros(ingText) {
  const prompt = `Tu es nutritionniste. Calcule les valeurs nutritionnelles totales de cette recette pour UNE personne (les quantit\xE9s ci-dessous sont pour une personne).
Ingr\xE9dients (un par ligne) :
${ingText}
R\xE8gles : - Si la quantit\xE9 d'un ingr\xE9dient n'est pas pr\xE9cis\xE9e, suppose une portion r\xE9aliste standard pour une personne. - Additionne les macros de tous les ingr\xE9dients. - Donne des entiers r\xE9alistes en grammes. - "satfat" = grammes de graisses satur\xE9es ; "sugar" = grammes de sucres.
R\xE9ponds STRICTEMENT par un objet JSON sur une seule ligne, sans aucun texte autour ni backticks :
{"protein": <entier>, "carbs": <entier>, "fat": <entier>, "satfat": <entier>, "sugar": <entier>}`;
  const text = await callModel(prompt);
  const m = text && text.match(/\{[\s\S]*?\}/);
  if (!m) throw new Error("r\xE9ponse illisible");
  const j = JSON.parse(m[0]);
  return { protein: Math.round(+j.protein || 0), carbs: Math.round(+j.carbs || 0), fat: Math.round(+j.fat || 0), satfat: Math.round(+j.satfat || 0), sugar: Math.round(+j.sugar || 0) };
}
async function aiMealFromPhoto(base64, mediaType) {
  const prompt = `Analyse la photo de ce plat. Identifie le plat et estime ses valeurs nutritionnelles pour la portion visible sur la photo.
R\xE9ponds STRICTEMENT par un objet JSON sur une seule ligne, sans aucun texte autour ni backticks :
{"plat": "<nom court du plat>", "protein": <entier g>, "carbs": <entier g>, "fat": <entier g>}`;
  const content = [
    { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
    { type: "text", text: prompt }
  ];
  let lastErr;
  const models = ["claude-sonnet-4-20250514", "claude-sonnet-4-6"];
  for (const model of models) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model, max_tokens: 1024, temperature: 0, messages: [{ role: "user", content }] })
      });
      if (!res.ok) {
        let t = "";
        try {
          t = (await res.text()).slice(0, 80);
        } catch {
        }
        lastErr = new Error("HTTP " + res.status + " " + t);
        continue;
      }
      const data = await res.json();
      const text = (data.content || []).map((i) => i.type === "text" ? i.text : "").join("");
      const mt = text.match(/\{[\s\S]*\}/);
      if (!mt) {
        lastErr = new Error("r\xE9ponse illisible");
        continue;
      }
      const j = JSON.parse(mt[0]);
      return { plat: j.plat || "Plat", protein: Math.round(+j.protein || 0), carbs: Math.round(+j.carbs || 0), fat: Math.round(+j.fat || 0) };
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("indisponible");
}
const SHOP_UNITS = {
  g: { cls: "mass", f: 1 },
  gr: { cls: "mass", f: 1 },
  gramme: { cls: "mass", f: 1 },
  grammes: { cls: "mass", f: 1 },
  kg: { cls: "mass", f: 1e3 },
  mg: { cls: "mass", f: 1e-3 },
  ml: { cls: "vol", f: 1 },
  cl: { cls: "vol", f: 10 },
  dl: { cls: "vol", f: 100 },
  l: { cls: "vol", f: 1e3 },
  litre: { cls: "vol", f: 1e3 },
  litres: { cls: "vol", f: 1e3 }
};
const fmtMass = (g) => g >= 1e3 ? Math.round(g / 100) / 10 + " kg" : Math.round(g) + " g";
const fmtVol = (ml) => ml >= 1e3 ? Math.round(ml / 100) / 10 + " l" : Math.round(ml) + " ml";
function scaleLine(line, factor) {
  if (!factor || factor === 1) return line;
  const m = (line || "").match(/^(\s*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return line;
  const n = parseFloat(m[2].replace(",", ".")) * factor;
  const r = Math.round(n * 100) / 100;
  return m[1] + (Number.isInteger(r) ? String(r) : String(r)) + m[3];
}
function localAggregate(lines) {
  const groups = {};
  for (const raw of lines) {
    const line = (raw || "").trim();
    if (!line) continue;
    const m = line.match(/^(\d+(?:[.,]\d+)?)\s*([^\s\d]+)?\s*(.*)$/);
    if (!m) {
      const k = "x:" + norm(line);
      (groups[k] = groups[k] || { cls: "txt", name: line, val: 0 }).val += 1;
      continue;
    }
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
  return Object.values(groups).map((g) => {
    if (g.cls === "mass") return { item: g.name, qty: fmtMass(g.val) };
    if (g.cls === "vol") return { item: g.name, qty: fmtVol(g.val) };
    if (g.cls === "count") return { item: g.name, qty: String(Math.round(g.val * 100) / 100) };
    return { item: g.name, qty: "" };
  });
}
async function aiShoppingList(lines) {
  const prompt = `Voici des ingr\xE9dients issus de plusieurs recettes planifi\xE9es (avec doublons possibles).
Regroupe les ingr\xE9dients IDENTIQUES en additionnant leurs quantit\xE9s, et produis une liste de courses claire et compacte.
- Additionne les quantit\xE9s de m\xEAme unit\xE9 (ex. 350 g + 200 g = 550 g).
- Garde des unit\xE9s lisibles (g, kg, ml, pi\xE8ces, bo\xEEtes...).
- Un m\xEAme aliment ne doit appara\xEEtre qu'une seule fois.
R\xC9PONDS STRICTEMENT par un tableau JSON sur une seule ligne, sans texte ni backticks :
[{"item":"<nom>","qty":"<quantit\xE9 agr\xE9g\xE9e ou ''>"}]
Ingr\xE9dients :
${lines.join("\n")}`;
  const text = await callModel(prompt);
  const m = text && text.match(/\[[\s\S]*\]/);
  if (!m) throw new Error("r\xE9ponse illisible");
  const arr = JSON.parse(m[0]);
  return Array.isArray(arr) ? arr.map((x) => ({ item: String(x.item || "").trim(), qty: String(x.qty || "").trim() })).filter((x) => x.item) : [];
}
function Ring({ value, max, size = 150, stroke = 13, color }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const pct = max ? Math.min(value / max, 1) : 0;
  return React.createElement(
    "svg",
    { width: size, height: size },
    React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: C.line, strokeWidth: stroke }),
    React.createElement("circle", {
      cx: size / 2,
      cy: size / 2,
      r,
      fill: "none",
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeDasharray: c,
      strokeDashoffset: c * (1 - pct),
      transform: `rotate(-90 ${size / 2} ${size / 2})`,
      style: { transition: "stroke-dashoffset .6s ease" }
    })
  );
}
function Bar({ value, max, color }) {
  return React.createElement(
    "div",
    { style: { height: 8, borderRadius: 99, background: C.line, overflow: "hidden" } },
    React.createElement("div", { style: { height: "100%", width: `${Math.min(100, value / max * 100)}%`, background: color, borderRadius: 99, transition: "width .4s ease" } })
  );
}
function Eyebrow({ children, color = C.mut }) {
  return React.createElement("div", { style: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color, fontWeight: 700 } }, children);
}
function TagBadge({ tag }) {
  if (!tag) return null;
  const ok = tag === "good";
  return React.createElement(
    "span",
    { style: { fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 99, color: ok ? C.teal : C.ember, background: ok ? C.tealSoft : C.emberSoft, whiteSpace: "nowrap" } },
    ok ? "Bon pour l'\xE9paule" : "Prudence \xE9paule"
  );
}
function ExerciseArt({ art }) {
  const G = C.mut, A = C.ember, L = C.line;
  const S = { stroke: G, strokeWidth: 4, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const AR = { stroke: A, strokeWidth: 2.6, fill: "none", strokeLinecap: "round", markerEnd: `url(#ah-${art})` };
  const defs = React.createElement(
    "defs",
    null,
    React.createElement(
      "marker",
      { id: `ah-${art}`, markerWidth: "7", markerHeight: "7", refX: "3.5", refY: "3.5", orient: "auto" },
      React.createElement("path", { d: "M0,0 L7,3.5 L0,7 Z", fill: A })
    )
  );
  const poses = {
    squat: [
      React.createElement("line", { key: "b", x1: "24", y1: "120", x2: "176", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("circle", { key: "h", cx: "92", cy: "36", r: "8", fill: G }),
      React.createElement("path", { key: "1", d: "M89,46 L78,78", ...S }),
      React.createElement("path", { key: "2", d: "M78,78 L104,92 L74,118", ...S }),
      React.createElement("path", { key: "3", d: "M88,50 L122,52", ...S }),
      React.createElement("path", { key: "a", d: "M152,54 L152,92", ...AR })
    ],
    incline: [
      React.createElement("line", { key: "b", x1: "20", y1: "120", x2: "116", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("rect", { key: "box", x: "140", y: "74", width: "38", height: "46", fill: "none", stroke: L, strokeWidth: "3" }),
      React.createElement("path", { key: "1", d: "M40,116 L86,100 L124,84", ...S }),
      React.createElement("path", { key: "2", d: "M124,84 L152,76", ...S }),
      React.createElement("circle", { key: "h", cx: "138", cy: "78", r: "8", fill: G }),
      React.createElement("path", { key: "a", d: "M150,52 L150,70", ...AR })
    ],
    row: [
      React.createElement("line", { key: "b", x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("line", { key: "v", x1: "22", y1: "40", x2: "22", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("circle", { key: "h", cx: "118", cy: "40", r: "8", fill: G }),
      React.createElement("path", { key: "1", d: "M118,48 L118,92", ...S }),
      React.createElement("path", { key: "2", d: "M118,92 L108,118 M118,92 L128,118", ...S }),
      React.createElement("path", { key: "3", d: "M118,55 L138,62 L110,66", ...S }),
      React.createElement("path", { key: "el", d: "M24,60 C60,62 90,64 110,66", stroke: A, strokeWidth: "2.6", fill: "none" }),
      React.createElement("path", { key: "a", d: "M150,58 L134,62", ...AR })
    ],
    extrot: [
      React.createElement("line", { key: "b", x1: "24", y1: "120", x2: "176", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("circle", { key: "h", cx: "100", cy: "34", r: "8", fill: G }),
      React.createElement("path", { key: "1", d: "M100,42 L100,92", ...S }),
      React.createElement("path", { key: "2", d: "M100,92 L88,118 M100,92 L112,118", ...S }),
      React.createElement("path", { key: "3", d: "M100,54 L86,74", ...S }),
      React.createElement("path", { key: "4", d: "M86,74 L122,74", ...S }),
      React.createElement("path", { key: "a", d: "M104,90 a30,30 0 0 1 24,-14", ...AR })
    ],
    plank: [
      React.createElement("line", { key: "b", x1: "20", y1: "120", x2: "184", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("path", { key: "1", d: "M50,120 L74,120", ...S }),
      React.createElement("path", { key: "2", d: "M74,120 L74,98", ...S }),
      React.createElement("path", { key: "3", d: "M74,98 L132,108 L176,118", ...S }),
      React.createElement("circle", { key: "h", cx: "64", cy: "94", r: "8", fill: G }),
      React.createElement("line", { key: "a", x1: "78", y1: "98", x2: "172", y2: "116", stroke: A, strokeWidth: "2", strokeDasharray: "4 4", strokeLinecap: "round" })
    ],
    lunge: [
      React.createElement("line", { key: "b", x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("circle", { key: "h", cx: "104", cy: "34", r: "8", fill: G }),
      React.createElement("path", { key: "1", d: "M104,42 L100,80", ...S }),
      React.createElement("path", { key: "2", d: "M100,80 L124,98 L124,120", ...S }),
      React.createElement("path", { key: "3", d: "M100,80 L70,110 L54,120", ...S }),
      React.createElement("path", { key: "4", d: "M102,52 L96,78", ...S }),
      React.createElement("path", { key: "a", d: "M150,68 L150,100", ...AR })
    ],
    bridge: [
      React.createElement("line", { key: "b", x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("circle", { key: "h", cx: "38", cy: "112", r: "8", fill: G }),
      React.createElement("path", { key: "1", d: "M48,116 L108,80 L140,100 L156,120", ...S }),
      React.createElement("path", { key: "2", d: "M52,116 L84,118", ...S }),
      React.createElement("path", { key: "a", d: "M108,78 L108,60", ...AR })
    ],
    facepull: [
      React.createElement("line", { key: "b", x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("line", { key: "v", x1: "178", y1: "28", x2: "178", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("circle", { key: "h", cx: "82", cy: "36", r: "8", fill: G }),
      React.createElement("path", { key: "1", d: "M84,44 L86,92", ...S }),
      React.createElement("path", { key: "2", d: "M86,92 L76,118 M86,92 L96,118", ...S }),
      React.createElement("path", { key: "3", d: "M86,52 L108,48 L96,56", ...S }),
      React.createElement("path", { key: "el", d: "M96,56 C130,50 158,42 176,40", stroke: A, strokeWidth: "2.6", fill: "none" }),
      React.createElement("path", { key: "a", d: "M116,60 L98,56", ...AR })
    ],
    pallof: [
      React.createElement("line", { key: "b", x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("line", { key: "v", x1: "22", y1: "40", x2: "22", y2: "120", stroke: L, strokeWidth: "3" }),
      React.createElement("circle", { key: "h", cx: "112", cy: "34", r: "8", fill: G }),
      React.createElement("path", { key: "1", d: "M112,42 L112,90", ...S }),
      React.createElement("path", { key: "2", d: "M112,90 L102,118 M112,90 L122,118", ...S }),
      React.createElement("path", { key: "3", d: "M112,54 L152,58", ...S }),
      React.createElement("path", { key: "el", d: "M24,60 C70,58 120,58 152,58", stroke: A, strokeWidth: "2.6", fill: "none" }),
      React.createElement("path", { key: "a", d: "M74,74 L54,74", ...AR })
    ]
  };
  if (!poses[art]) return null;
  return React.createElement(
    "div",
    { style: { background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: "6px 10px" } },
    React.createElement("svg", { viewBox: "0 0 200 132", width: "100%", style: { display: "block", maxHeight: 150 } }, defs, ...poses[art])
  );
}
function MacroCompare({ protein = 0, carbs = 0, fat = 0, style }) {
  const p = +protein || 0, c = +carbs || 0, f = +fat || 0;
  const id = idealFor(style);
  const kcal = Math.round((p + c) * 4 + f * 9);
  const rows = [["Calories", kcal, id.kcal, "kcal"], ["Prot\xE9ines", Math.round(p), id.protein, "g"], ["Glucides", Math.round(c), id.carbs, "g"], ["Lipides", Math.round(f), id.fat, "g"]];
  return React.createElement(
    "div",
    null,
    React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 9, lineHeight: 1.4 } }, "Compar\xE9 \xE0 un \xAB ", style || "Repas", " \xBB id\xE9al \xB7 ", Math.round(id.share * 100), "% de ta journ\xE9e"),
    ...rows.map(([label, val, target, unit]) => {
      const z = zone(val, target);
      const pct = Math.min(100, target ? val / target * 100 : 0);
      return React.createElement(
        "div",
        { key: label, style: { marginBottom: 8 } },
        React.createElement(
          "div",
          { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } },
          React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, label),
          React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, `${val} / ${target} ${unit} \xB7 ${z.label}`)
        ),
        React.createElement(
          "div",
          { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } },
          React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" } })
        )
      );
    })
  );
}
function IndulgenceGauge({ satfat, sugar, style, daily, title }) {
  const share = daily ? 1 : MEAL_SHARE[style] ?? 0.35;
  const rows = [];
  if (satfat != null) rows.push(["Gras satur\xE9s", Math.round(satfat), Math.round(SATFAT_MAX * share)]);
  if (sugar != null) rows.push(["Sucre", Math.round(sugar), Math.round(SUGAR_MAX * share)]);
  if (rows.length === 0) return null;
  return React.createElement(
    "div",
    null,
    React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 9, lineHeight: 1.4 } }, title || "\xC0 quel point \xE7a \xAB abuse \xBB"),
    ...rows.map(([label, val, ceil]) => {
      const z = badZone(val, ceil);
      const pct = Math.min(100, ceil ? val / ceil * 100 : 0);
      return React.createElement(
        "div",
        { key: label, style: { marginBottom: 8 } },
        React.createElement(
          "div",
          { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } },
          React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, label),
          React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, `${val} / ${ceil} g \xB7 ${z.label}`)
        ),
        React.createElement(
          "div",
          { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } },
          React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" } })
        )
      );
    })
  );
}
const h1 = { fontSize: 24, fontWeight: 800, margin: "4px 0 6px", letterSpacing: -0.4 };
const sectionH = { fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: C.mut, margin: "26px 0 11px" };
const navBtn = { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 };
const sel = { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 9, padding: "8px 10px", fontSize: 13 };
const fld = { width: "100%", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px 12px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" };
const lbl = { fontSize: 11.5, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" };
const cardBox = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 };
function Card({ children, style: extStyle }) {
  return /* @__PURE__ */ React.createElement("div", { style: { ...cardBox, ...extStyle } }, children);
}
function MiniGauge({ label, val, target }) {
  const z = zone(val, target);
  const pct = Math.min(100, target ? val / target * 100 : 0);
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.mut } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: z.color } }, val, "/", target)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" } })));
}
function MacroBar({ label, val, target, unit }) {
  const z = zone(val, target);
  const pct = Math.min(100, target ? val / target * 100 : 0);
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, val, "/", target, " ", unit)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99 } })));
}
const pill = (label, val, color) => /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 4px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color } }, val), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.mut, marginTop: 1 } }, label));
function showToast(msg, ms = 2400) {
  const el = document.createElement("div");
  el.style.cssText = "position:fixed;left:0;right:0;bottom:90px;display:flex;justify-content:center;z-index:50;pointer-events:none;transition:opacity .3s";
  el.innerHTML = `<div style="background:${C.cardHi};border:1px solid ${C.line};color:${C.text};font-size:13px;font-weight:600;padding:10px 16px;border-radius:99px;box-shadow:0 6px 20px rgba(0,0,0,.4)">${msg}</div>`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 400);
  }, ms);
}
function ZTLApp() {
  const [tab, setTab] = React.useState("home");
  const [openRecipeId, setOpenRecipeId] = React.useState(null);
  const [recipeNew, setRecipeNew] = React.useState(0);
  const openRecipe = (id) => {
    setOpenRecipeId(id);
    setRecipeNew(0);
    setTab("food");
  };
  const addRecipe = () => {
    setOpenRecipeId(null);
    setRecipeNew((n) => n + 1);
    setTab("food");
  };
  const [loading, setLoading] = React.useState(true);
  const tk = dateKey();
  const [day, setDay] = React.useState({ macros: { p: 0, c: 0, f: 0 }, sleep: null, weight: null, workout: {}, session: "maisonA" });
  const [exlast, setExlast] = React.useState({});
  const [checks, setChecks] = React.useState({});
  const [hist, setHist] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const d = await store.get("log:" + tk);
      if (d) {
        const macros = d.macros || { p: d.protein || 0, c: 0, f: 0 };
        setDay({ macros, sleep: null, weight: null, workout: {}, session: "maisonA", ...d, macros });
      }
      setExlast(await store.get("exlast") || {});
      setChecks(await store.get("checks") || {});
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
  const saveDay = (n) => {
    setDay(n);
    store.set("log:" + tk, n);
  };
  const onSleepSaved = (date, hours, quality) => {
    setHist((h) => {
      const prev = h.find((r) => r.date === date);
      const others = h.filter((r) => r.date !== date);
      return [...others, { date, sleepH: hours, quality, weight: prev ? prev.weight : null }].sort((a, b) => a.date < b.date ? -1 : 1).slice(-30);
    });
  };
  const onDeleteSleep = async (date) => {
    if (date === tk) {
      const n = { ...day, sleep: null };
      setDay(n);
      store.set("log:" + tk, n);
    } else {
      const v = await store.get("log:" + date);
      if (v) store.set("log:" + date, { ...v, sleep: null });
    }
    setHist((h) => h.map((r) => r.date === date ? { ...r, sleepH: null, quality: null } : r));
  };
  const saveSleepForDate = async (date, sleepObj) => {
    if (date === tk) {
      const n = { ...day, sleep: sleepObj };
      setDay(n);
      store.set("log:" + tk, n);
    } else {
      const v = await store.get("log:" + date) || { macros: { p: 0, c: 0, f: 0 }, sleep: null, weight: null, workout: {}, session: "maisonA" };
      store.set("log:" + date, { ...v, sleep: sleepObj });
    }
    onSleepSaved(date, sleepObj.hours, sleepObj.quality);
  };
  const toggleEx = (id) => {
    const w = { ...day.workout, [id]: { ...day.workout[id] || {}, done: !day.workout[id]?.done } };
    saveDay({ ...day, workout: w });
  };
  const setExVal = (id, val) => {
    const w = { ...day.workout, [id]: { ...day.workout[id] || {}, val } };
    saveDay({ ...day, workout: w });
    const el = { ...exlast, [id]: val };
    setExlast(el);
    store.set("exlast", el);
  };
  const addMacros = (d) => {
    const m = day.macros || { p: 0, c: 0, f: 0 };
    saveDay({ ...day, macros: { p: Math.max(0, m.p + (d.p || 0)), c: Math.max(0, m.c + (d.c || 0)), f: Math.max(0, m.f + (d.f || 0)) } });
  };
  const setMacros = (m) => saveDay({ ...day, macros: { p: Math.max(0, m.p || 0), c: Math.max(0, m.c || 0), f: Math.max(0, m.f || 0) } });
  const addMacrosForDate = async (date, delta) => {
    if (date === tk) {
      addMacros(delta);
      return;
    }
    const v = await store.get("log:" + date) || { macros: { p: 0, c: 0, f: 0 }, sleep: null, weight: null, workout: {}, session: "maisonA" };
    const m = v.macros || { p: 0, c: 0, f: 0 };
    store.set("log:" + date, { ...v, macros: { p: Math.max(0, m.p + (delta.p || 0)), c: Math.max(0, m.c + (delta.c || 0)), f: Math.max(0, m.f + (delta.f || 0)) } });
  };
  const toggleCheck = (i) => {
    const c = { ...checks, [i]: !checks[i] };
    setChecks(c);
    store.set("checks", c);
  };
  const sess = SESSIONS.find((s) => s.id === day.session) || SESSIONS[0];
  const exDone = sess.ex.filter((e) => day.workout[e.id]?.done).length;
  const workoutDone = exDone === sess.ex.length;
  const loadingEl = /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: C.bg, color: C.mut, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" } }, "Chargement de ton carnet\u2026");
  if (loading) return loadingEl;
  const TABS = [
    { id: "home", icon: Icons.Home, label: "Accueil" },
    { id: "train", icon: Icons.Dumbbell, label: "S\xE9ances" },
    { id: "food", icon: Icons.UtensilsCrossed, label: "Nutrition" },
    { id: "program", icon: Icons.Calendar, label: "Programme" },
    { id: "courses", icon: Icons.ShoppingCart, label: "Courses" },
    { id: "sleep", icon: Icons.Moon, label: "Sommeil" }
  ];
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui,-apple-system,sans-serif", paddingBottom: 78 } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 480, margin: "0 auto", padding: "22px 18px 0" } }, tab === "home" && /* @__PURE__ */ React.createElement(HomeTab, { ...{ day, sess, exDone, workoutDone, setTab, hist, saveDay, saveSleepForDate, openRecipe, addRecipe } }), tab === "train" && /* @__PURE__ */ React.createElement(TrainTab, { ...{ day, saveDay, toggleEx, setExVal, exlast } }), tab === "food" && /* @__PURE__ */ React.createElement(FoodTab, { ...{ day, addMacros, setMacros, addMacrosForDate, openRecipeId, recipeNew } }), tab === "program" && /* @__PURE__ */ React.createElement(ProgramTab, null), tab === "courses" && /* @__PURE__ */ React.createElement(CoursesTab, null), tab === "sleep" && /* @__PURE__ */ React.createElement(SleepTab, { ...{ day, saveDay, hist, onSleepSaved, onDeleteSleep, saveSleepForDate } })), /* @__PURE__ */ React.createElement("nav", { style: { position: "fixed", bottom: 0, left: 0, right: 0, background: C.bg2, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", width: "100%", maxWidth: 520 } }, TABS.map((t) => {
    const IC = t.icon, on = tab === t.id;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: t.id,
        onClick: () => setTab(t.id),
        style: { flex: 1, minWidth: 0, background: "none", border: "none", padding: "8px 0 10px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: on ? C.ember : C.mut }
      },
      IC({ size: 19 }),
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8.5, fontWeight: on ? 700 : 500, whiteSpace: "nowrap" } }, t.label)
    );
  }))));
}
function HomeTab({ day, sess, exDone, workoutDone, setTab, hist, saveDay, saveSleepForDate, openRecipe, addRecipe }) {
  const [w, setW] = React.useState(day.weight ?? "");
  const [plan, setPlan] = React.useState(null);
  const [recipes, setRecipes] = React.useState([]);
  const [sleepActive, setSleepActive] = React.useState(void 0);
  React.useEffect(() => {
    (async () => {
      setPlan(await store.get("plan:" + dateKey()) || { meals: [], session: null });
      let r = await store.get("recipes");
      if (!Array.isArray(r) || !r.length) r = RECIPES;
      setRecipes(r);
      setSleepActive(await store.get("sleepActive") || null);
    })();
  }, []);
  const hhmm = (ts) => {
    const d = new Date(ts);
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  };
  const startNight = () => {
    const a = { startedAt: Date.now() };
    setSleepActive(a);
    store.set("sleepActive", a);
  };
  const endNight = () => {
    const a = sleepActive;
    if (!a) return;
    const n = Date.now();
    const h = Math.max(0, Math.round((n - a.startedAt) / 36e5 * 10) / 10);
    saveSleepForDate(dateKey(), { bed: hhmm(a.startedAt), wake: hhmm(n), quality: 0, hours: h, endedAt: new Date(n).toISOString() });
    setSleepActive(null);
    store.del("sleepActive");
  };
  const m = day.macros || { p: 0, c: 0, f: 0 };
  const kcal = Math.round((m.p + m.c) * 4 + m.f * 9);
  const kz = zone(kcal, TARGETS.kcal);
  const planSession = plan && plan.session ? SESSIONS.find((s) => s.id === plan.session) : null;
  const planMeals = plan ? (plan.meals || []).map((id) => recipes.find((r) => r.id === id)).filter(Boolean) : [];
  const planTotals = planMeals.reduce((t, r) => ({ p: t.p + (+r.protein || 0), c: t.c + (+r.carbs || 0), f: t.f + (+r.fat || 0) }), { p: 0, c: 0, f: 0 });
  const planKcal = Math.round((planTotals.p + planTotals.c) * 4 + planTotals.f * 9);
  const sleepRows = (hist || []).filter((h) => h.sleepH != null).sort((a, b) => a.date < b.date ? -1 : 1);
  const lastNight = sleepRows.length ? sleepRows[sleepRows.length - 1] : null;
  const last7 = sleepRows.slice(-7);
  const avg7 = last7.length ? Math.round(last7.reduce((s, d) => s + d.sleepH, 0) / last7.length * 10) / 10 : null;
  const weightRows = (hist || []).filter((h) => h.weight != null).sort((a, b) => a.date < b.date ? -1 : 1);
  const lastWeight = day.weight != null ? day.weight : weightRows.length ? weightRows[weightRows.length - 1].weight : null;
  const satDay = Math.round(m.f * 0.4);
  const satZ = badZone(satDay, SATFAT_MAX);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, fontWeight: 900, letterSpacing: 2, color: C.ember } }, "ZTL"), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, height: 1, background: C.line } })), /* @__PURE__ */ React.createElement(Eyebrow, null, fmtDay()), /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 27, fontWeight: 800, margin: "4px 0 2px", letterSpacing: -0.5 } }, "Ta journ\xE9e"), /* @__PURE__ */ React.createElement("p", { style: { color: C.mut, margin: "0 0 18px", fontSize: 14 } }, "Tes macros, ta s\xE9ance et tes repas du jour, d'un coup d'\u0153il."), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("food"), style: { width: "100%", textAlign: "left", background: C.card, border: `1px solid ${C.line}`, borderRadius: 20, padding: 18, cursor: "pointer", color: C.text } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: C.mut } }, "Macros du jour"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.teal, display: "flex", alignItems: "center", gap: 2 } }, "Nutrition ", Icons.ChevronRight({ size: 14 }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: 104, height: 104, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(Ring, { value: Math.min(kcal, TARGETS.kcal), max: TARGETS.kcal, size: 104, stroke: 11, color: kz.color }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, lineHeight: 1 } }, kcal), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.mut, marginTop: 2 } }, "/", TARGETS.kcal, "kcal"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement(MacroBar, { label: "Prot\xE9ines", val: Math.round(m.p), target: TARGETS.protein, unit: "g" }), /* @__PURE__ */ React.createElement(MacroBar, { label: "Glucides", val: Math.round(m.c), target: TARGETS.carbs, unit: "g" }), /* @__PURE__ */ React.createElement(MacroBar, { label: "Lipides", val: Math.round(m.f), target: TARGETS.fat, unit: "g" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 4, paddingTop: 12, borderTop: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: 99, background: satZ.color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut, flex: 1 } }, "Gras satur\xE9s(estim\xE9)"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: satZ.color } }, satDay, "/", SATFAT_MAX, "g\xB7", satZ.label))), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Au programme aujourd'hui"), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (planSession) saveDay({ ...day, session: planSession.id });
    setTab("train");
  }, style: { width: "100%", background: "none", border: "none", borderBottom: `1px solid ${C.line}`, padding: "13px 15px", display: "flex", alignItems: "center", gap: 11, cursor: "pointer", textAlign: "left" } }, Icons.Dumbbell({ size: 17, color: C.ember }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut } }, "S\xE9ance"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: planSession ? C.text : C.mut } }, planSession ? `${planSession.group}\xB7${planSession.name}` : "Repos/aucune s\xE9ance pr\xE9vue")), planSession ? /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 4, background: C.emberSoft, color: C.ember, borderRadius: 9, padding: "7px 11px", fontSize: 12.5, fontWeight: 800, flexShrink: 0 } }, Icons.Play({ size: 13 }), "Ouvrir") : Icons.ChevronRight({ size: 17, color: C.mut })), /* @__PURE__ */ React.createElement("div", { style: { padding: "13px 15px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: planMeals.length ? 9 : 0 } }, Icons.ChefHat({ size: 16, color: C.teal }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.mut, flex: 1 } }, "Repas pr\xE9vus"), planMeals.length > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, /* @__PURE__ */ React.createElement("b", { style: { color: C.ember } }, planKcal), "kcal")), planMeals.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.mut } }, "Aucun repas pr\xE9vu aujourd'hui.") : planMeals.map((r, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => openRecipe(r.id), style: { width: "100%", textAlign: "left", background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, padding: "7px 0", cursor: "pointer", color: C.text } }, /* @__PURE__ */ React.createElement("span", { style: { width: 5, height: 5, borderRadius: 99, background: C.teal, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, r.title), r.link && /* @__PURE__ */ React.createElement("a", { href: safeUrl(r.link), target: "_blank", rel: "noopener noreferrer", onClick: (e) => e.stopPropagation(), style: { display: "flex", color: C.ember } }, Icons.ExternalLink({ size: 14 })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.mut } }, Math.round((r.protein + r.carbs) * 4 + r.fat * 9), "kcal"), Icons.ChevronRight({ size: 15, color: C.mut }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("program"), style: { marginTop: 10, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 9, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%" } }, "Ouvrir le programme"))), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Sommeil"), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("sleep"), style: { width: "100%", textAlign: "left", background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", color: C.text } }, Icons.Moon({ size: 18, color: C.teal }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut } }, "Derni\xE8re nuit"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700 } }, lastNight ? hToHM(lastNight.sleepH) : "\u2014", lastNight && lastNight.quality ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.mut, fontWeight: 600 } }, "\xB7", lastNight.quality, "/5") : null)), avg7 != null && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut } }, "Moy.7j"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.teal } }, hToHM(avg7))), Icons.ChevronRight({ size: 17, color: C.mut })), sleepActive ? /* @__PURE__ */ React.createElement("button", { onClick: endNight, style: { width: "100%", background: C.teal, color: C.bg, border: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } }, Icons.Sunrise({ size: 17 }), "Terminer la nuit\xB7couch\xE9\xE0", hhmm(sleepActive.startedAt)) : /* @__PURE__ */ React.createElement("button", { onClick: startNight, disabled: sleepActive === void 0, style: { width: "100%", background: C.tealSoft, color: C.teal, border: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } }, Icons.Moon({ size: 16 }), "D\xE9marrer la nuit"), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Poids"), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12 } }, Icons.Scale({ size: 18, color: C.teal }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, flex: 1 } }, "Poids du jour", lastWeight != null ? /* @__PURE__ */ React.createElement("span", { style: { color: C.mut } }, "\xB7dernier", lastWeight, "kg") : ""), /* @__PURE__ */ React.createElement("input", { value: w, onChange: (e) => setW(e.target.value.replace(",", ".")), inputMode: "decimal", placeholder: "kg", style: { width: 64, background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "7px 9px", fontSize: 14, textAlign: "center" } }), /* @__PURE__ */ React.createElement("button", { onClick: () => saveDay({ ...day, weight: parseFloat(w) || null }), style: { background: C.tealSoft, color: C.teal, border: "none", borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer" } }, "OK")), /* @__PURE__ */ React.createElement("button", { onClick: addRecipe, style: { width: "100%", marginTop: 22, background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } }, Icons.ChefHat({ size: 17 }), "Ajouter une recette"), /* @__PURE__ */ React.createElement("div", { style: { height: 16 } }));
}
function TrainTab({ day, saveDay, toggleEx, setExVal, exlast }) {
  const groups = [...new Set(SESSIONS.map((s) => s.group))];
  const sess = SESSIONS.find((s) => s.id === day.session) || SESSIONS[0];
  const [tech, setTech] = React.useState({});
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Entra\xEEnement"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Ta s\xE9ance"), groups.map((g) => /* @__PURE__ */ React.createElement("div", { key: g, style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, fontWeight: 700, margin: "0 0 7px" } }, g), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, SESSIONS.filter((s) => s.group === g).map((s) => {
    const on = s.id === day.session;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s.id,
        onClick: () => saveDay({ ...day, session: s.id }),
        style: { padding: "8px 13px", borderRadius: 99, border: `1px solid ${on ? C.ember : C.line}`, background: on ? C.emberSoft : C.card, color: on ? C.ember : C.text, fontSize: 13, fontWeight: 700, cursor: "pointer" }
      },
      s.name
    );
  })))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: C.mut, margin: "6px 0 14px" } }, sess.sub, "\xB7r\xE8gle d'or:aucune douleur articulaire \xE0 l'\xE9paule."), sess.ex.map((e) => {
    const st = day.workout[e.id] || {};
    return /* @__PURE__ */ React.createElement("div", { key: e.id, style: { background: C.card, border: `1px solid ${st.done ? C.good : C.line}`, borderRadius: 16, padding: 15, marginBottom: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => toggleEx(e.id),
        style: { width: 26, height: 26, marginTop: 1, borderRadius: 8, border: `2px solid ${st.done ? C.good : C.line}`, background: st.done ? C.good : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }
      },
      st.done && Icons.Check({ size: 15, color: C.bg })
    ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 700 } }, e.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: C.ember, fontWeight: 700, whiteSpace: "nowrap" } }, e.scheme)), /* @__PURE__ */ React.createElement("div", { style: { margin: "5px 0 8px" } }, /* @__PURE__ */ React.createElement(TagBadge, { tag: e.tag })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: C.mut, margin: "0 0 10px", lineHeight: 1.5 } }, e.cue), e.do && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTech((t) => ({ ...t, [e.id]: !t[e.id] })),
        style: { background: "none", border: `1px solid ${C.line}`, color: tech[e.id] ? C.ember : C.mut, borderRadius: 9, padding: "6px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }
      },
      tech[e.id] ? "Masquer la technique" : "Voir la technique",
      Icons.ChevronDown({ size: 14 })
    ), tech[e.id] && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement(ExerciseArt, { art: e.art }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.teal, marginBottom: 6 } }, "\xC0 faire"), e.do.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 7, marginBottom: 5 } }, Icons.Check({ size: 14, color: C.teal }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, lineHeight: 1.45 } }, x)))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.ember, marginBottom: 6 } }, "\xC0 \xE9viter"), e.avoid.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 7, marginBottom: 5 } }, Icons.X({ size: 14, color: C.ember }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, lineHeight: 1.45, color: C.mut } }, x)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        defaultValue: st.val || "",
        onBlur: (ev) => setExVal(e.id, ev.target.value),
        placeholder: "charge/reps",
        style: { flex: 1, background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 9, padding: "7px 10px", fontSize: 13 }
      }
    ), exlast[e.id] && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut, whiteSpace: "nowrap" } }, "dernier:", exlast[e.id])))));
  }), /* @__PURE__ */ React.createElement("div", { style: { height: 8 } }));
}
function FoodTab({ day, addMacros, setMacros, addMacrosForDate, openRecipeId, recipeNew }) {
  const m = day.macros || { p: 0, c: 0, f: 0 };
  const kcal = Math.round((m.p + m.c) * 4 + m.f * 9);
  const [manual, setManual] = React.useState({ p: "", c: "", f: "" });
  const [macroHist, setMacroHist] = React.useState(null);
  const [weightHist, setWeightHist] = React.useState(null);
  const [reloadKey, setReloadKey] = React.useState(0);
  const [pastOpen, setPastOpen] = React.useState(false);
  const [pastDate, setPastDate] = React.useState(addDays(dateKey(), -1));
  const [pastText, setPastText] = React.useState("");
  const [pastBusy, setPastBusy] = React.useState(false);
  const [pastErr, setPastErr] = React.useState("");
  const [pastResult, setPastResult] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const t = dateKey();
      const days = Array.from({ length: 7 }, (_, i) => addDays(t, -(6 - i)));
      const rows2 = [];
      for (const dk of days) {
        let mac;
        if (dk === t) mac = day.macros || { p: 0, c: 0, f: 0 };
        else {
          const v = await store.get("log:" + dk);
          mac = v && v.macros || { p: 0, c: 0, f: 0 };
        }
        rows2.push({ date: dk, p: mac.p || 0, c: mac.c || 0, f: mac.f || 0, kcal: Math.round(((mac.p || 0) + (mac.c || 0)) * 4 + (mac.f || 0) * 9) });
      }
      setMacroHist(rows2);
    })();
  }, [day.macros?.p, day.macros?.c, day.macros?.f, reloadKey]);
  React.useEffect(() => {
    (async () => {
      const t = dateKey();
      const days = Array.from({ length: 14 }, (_, i) => addDays(t, -(13 - i)));
      const rows2 = [];
      for (const dk of days) {
        let w;
        if (dk === t) w = day.weight ?? null;
        else {
          const v = await store.get("log:" + dk);
          w = v && v.weight != null ? v.weight : null;
        }
        rows2.push({ date: dk, weight: w });
      }
      setWeightHist(rows2);
    })();
  }, [day.weight, reloadKey]);
  const [recipes, setRecipes] = React.useState(null);
  const [todayPlan, setTodayPlan] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      let r = await store.get("recipes");
      if (!Array.isArray(r) || !r.length) r = RECIPES;
      setRecipes(r);
      const pl = await store.get("plan:" + dateKey());
      setTodayPlan(pl || { meals: [], session: null });
    })();
  }, []);
  const rows = [{ key: "kcal", label: "Calories", val: kcal, target: TARGETS.kcal, unit: "kcal" }, { key: "p", label: "Prot\xE9ines", val: Math.round(m.p), target: TARGETS.protein, unit: "g" }, { key: "c", label: "Glucides", val: Math.round(m.c), target: TARGETS.carbs, unit: "g" }, { key: "f", label: "Lipides", val: Math.round(m.f), target: TARGETS.fat, unit: "g" }];
  const addManual = () => {
    const p = +manual.p || 0, c = +manual.c || 0, f = +manual.f || 0;
    if (!p && !c && !f) return;
    addMacros({ p, c, f });
    setManual({ p: "", c: "", f: "" });
  };
  const kcalOf = (r) => Math.round(((+r.protein || 0) + (+r.carbs || 0)) * 4 + (+r.fat || 0) * 9);
  const eatRecipe = (r) => {
    addMacros({ p: +r.protein || 0, c: +r.carbs || 0, f: +r.fat || 0 });
    showToast(`${r.title} ajout\xE9e \xE0 ta journ\xE9e`);
  };
  const plannedMeals = todayPlan && recipes ? (todayPlan.meals || []).map((id) => recipes.find((r) => r.id === id)).filter(Boolean) : [];
  const addAllPlanned = () => {
    const t = plannedMeals.reduce((a, r) => ({ p: a.p + (+r.protein || 0), c: a.c + (+r.carbs || 0), f: a.f + (+r.fat || 0) }), { p: 0, c: 0, f: 0 });
    if (!t.p && !t.c && !t.f) return;
    addMacros(t);
    showToast(`${plannedMeals.length} repas pr\xE9vus ajout\xE9s`);
  };
  const calcPast = async () => {
    if (!pastText.trim()) {
      setPastErr("D\xE9cris d'abord ton repas.");
      return;
    }
    setPastBusy(true);
    setPastErr("");
    try {
      const mac = await aiMacros(pastText);
      setPastResult({ p: String(mac.protein), c: String(mac.carbs), f: String(mac.fat) });
    } catch (e) {
      const mac = recipeMacros(pastText);
      setPastResult({ p: String(mac.protein), c: String(mac.carbs), f: String(mac.fat) });
      setPastErr("IA indisponible:" + (e && e.message || "erreur") + "\u2014estimation locale.");
    }
    setPastBusy(false);
  };
  const addPast = () => {
    const p = +pastResult.p || 0, c = +pastResult.c || 0, f = +pastResult.f || 0;
    addMacrosForDate(pastDate, { p, c, f });
    setReloadKey((k) => k + 1);
    showToast(`Repas ajout\xE9 au ${fmtShort(pastDate)}`);
    setPastOpen(false);
    setPastText("");
    setPastResult(null);
    setPastErr("");
  };
  const fileRef = React.useRef(null);
  const recipesRef = React.useRef(null);
  React.useEffect(() => {
    if ((openRecipeId || recipeNew) && recipesRef.current) {
      const t = setTimeout(() => recipesRef.current && recipesRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      return () => clearTimeout(t);
    }
  }, [openRecipeId, recipeNew]);
  const [photoState, setPhotoState] = React.useState("idle");
  const [photoPreview, setPhotoPreview] = React.useState(null);
  const [photoResult, setPhotoResult] = React.useState(null);
  const [photoErr, setPhotoErr] = React.useState("");
  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result);
      const base64 = dataUrl.split(",")[1];
      const mediaType = file.type || "image/jpeg";
      setPhotoPreview(dataUrl);
      setPhotoErr("");
      setPhotoState("loading");
      try {
        const r = await aiMealFromPhoto(base64, mediaType);
        setPhotoResult({ plat: r.plat, p: String(r.protein), c: String(r.carbs), f: String(r.fat) });
        setPhotoState("result");
      } catch (err) {
        setPhotoErr(err && err.message || "erreur inconnue");
        setPhotoState("error");
      }
    };
    reader.readAsDataURL(file);
  };
  const addPhotoMeal = () => {
    addMacros({ p: +photoResult.p || 0, c: +photoResult.c || 0, f: +photoResult.f || 0 });
    showToast(`${photoResult.plat} ajout\xE9 \xE0 ta journ\xE9e`);
    setPhotoState("idle");
    setPhotoResult(null);
    setPhotoPreview(null);
  };
  const chip = { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 99, padding: "8px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Nutrition"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Ta journ\xE9e"), /* @__PURE__ */ React.createElement("p", { style: { color: C.mut, margin: "0 0 16px", fontSize: 14, lineHeight: 1.5 } }, "Suis tes calories et tes macros. On vise la cible, sans se priver."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, rows.map((r) => {
    const z = zone(r.val, r.target);
    const pct = Math.min(100, (r.target ? r.val / r.target : 0) * 100);
    const over = r.val > r.target;
    return /* @__PURE__ */ React.createElement(Card, { key: r.key }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700 } }, r.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: z.color } }, r.val, /* @__PURE__ */ React.createElement("span", { style: { color: C.mut, fontWeight: 600, fontSize: 12.5 } }, "/", r.target, r.unit))), /* @__PURE__ */ React.createElement("div", { style: { height: 10, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s ease" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, z.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, over ? `+${r.val - r.target}${r.unit}au-dessus` : `reste ${r.target - r.val}${r.unit}`)));
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, margin: "12px 2px 0" } }, [["\xE0 compl\xE9ter", C.mut], ["en bonne voie", C.teal], ["dans la cible", C.good], ["un peu trop", "#C9A24B"], ["d\xE9passement", C.ember]].map(([l, col]) => /* @__PURE__ */ React.createElement("span", { key: l, style: { fontSize: 10.5, color: C.mut, display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: 99, background: col } }), l))), /* @__PURE__ */ React.createElement(Card, { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement(IndulgenceGauge, { satfat: Math.round((m.f || 0) * 0.4), sugar: null, daily: true, title: "Gras satur\xE9s du jour(estim\xE9~40% des lipides)" })), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Repas pr\xE9vus aujourd'hui"), plannedMeals.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { ...cardBox, border: `1px dashed ${C.line}`, textAlign: "center", color: C.mut, fontSize: 13, lineHeight: 1.5 } }, "Aucun repas pr\xE9vu aujourd'hui.") : /* @__PURE__ */ React.createElement(Card, null, plannedMeals.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < plannedMeals.length - 1 ? `1px solid ${C.line}` : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, r.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut } }, /* @__PURE__ */ React.createElement("b", { style: { color: C.ember } }, kcalOf(r)), "kcal\xB7P", r.protein, "G", r.carbs, "L", r.fat)), /* @__PURE__ */ React.createElement("button", { onClick: () => eatRecipe(r), style: { background: C.tealSoft, color: C.teal, border: `1px solid ${C.teal}`, borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 } }, Icons.Plus({ size: 14 }), "Ajouter"))), plannedMeals.length > 1 && /* @__PURE__ */ React.createElement("button", { onClick: addAllPlanned, style: { marginTop: 12, width: "100%", background: C.ember, color: "#1b1205", border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 } }, Icons.Plus({ size: 16 }), "Tout ajouter \xE0 ma journ\xE9e")), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Analyser une photo"), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: onFile, style: { display: "none" } }), photoState === "idle" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => fileRef.current && fileRef.current.click(),
      style: { width: "100%", background: C.teal, color: C.bg, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }
    },
    Icons.Camera({ size: 18 }),
    "Photo du plat"
  ), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11.5, color: C.mut, textAlign: "center", marginTop: 8, lineHeight: 1.45 } }, "L'IA identifie le plat et estime ses macros.")), photoState === "loading" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "4px 0" } }, photoPreview && /* @__PURE__ */ React.createElement("img", { src: photoPreview, alt: "", style: { width: 96, height: 96, objectFit: "cover", borderRadius: 12, marginBottom: 10 } }), /* @__PURE__ */ React.createElement("div", { style: { color: C.teal, fontSize: 14, fontWeight: 700 } }, "Analyse en cours\u2026")), photoState === "error" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { color: C.ember, fontSize: 13, marginBottom: 12 } }, "Analyse impossible:", photoErr), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setPhotoState("idle");
    setPhotoPreview(null);
    setPhotoResult(null);
    setPhotoErr("");
  }, style: { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" } }, "R\xE9essayer")), photoState === "result" && photoResult && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", marginBottom: 12 } }, photoPreview && /* @__PURE__ */ React.createElement("img", { src: photoPreview, alt: "", style: { width: 64, height: 64, objectFit: "cover", borderRadius: 12, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 } }, "D\xE9tect\xE9"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700 } }, photoResult.plat), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut } }, "\u2248", Math.round((+photoResult.p + +photoResult.c) * 4 + +photoResult.f * 9), "kcal\xB7ajuste si besoin"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: photoResult[k],
      onChange: (e) => setPhotoResult({ ...photoResult, [k]: e.target.value.replace(/[^0-9.]/g, "") }),
      inputMode: "decimal",
      style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 } }, l, "(g)")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setPhotoState("idle");
    setPhotoResult(null);
    setPhotoPreview(null);
  }, style: { flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer" } }, "Annuler"), /* @__PURE__ */ React.createElement("button", { onClick: addPhotoMeal, style: { flex: 2, background: C.ember, border: "none", color: "#1b1205", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer" } }, "Ajouter \xE0 ma journ\xE9e")))), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Ajout rapide"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, QUICK_FOODS.map((f) => /* @__PURE__ */ React.createElement("button", { key: f.n, onClick: () => addMacros({ p: f.p, c: f.c, f: f.f }), style: chip }, Icons.Plus({ size: 13, color: C.ember }), f.n))), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Ajouter \xE0 la main"), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "flex-start" } }, [["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: manual[k],
      onChange: (e) => setManual({ ...manual, [k]: e.target.value.replace(/[^0-9.]/g, "") }),
      inputMode: "decimal",
      placeholder: "0",
      style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 } }, l, "(g)"))), /* @__PURE__ */ React.createElement("button", { onClick: addManual, style: { background: C.ember, color: "#1b1205", border: "none", borderRadius: 10, padding: "10px 15px", fontSize: 18, fontWeight: 800, cursor: "pointer", lineHeight: 1 } }, "+"))), /* @__PURE__ */ React.createElement("button", { onClick: () => setMacros({ p: 0, c: 0, f: 0 }), style: { marginTop: 14, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } }, Icons.Minus({ size: 14 }), "Remettre la journ\xE9e \xE0 z\xE9ro"), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Historique 7 jours"), macroHist === null ? /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13 } }, "Chargement\u2026") : (() => {
    const logged = macroHist.filter((d) => d.kcal > 0);
    const n = logged.length;
    const avgF = (sel2) => n ? logged.reduce((s, d) => s + sel2(d), 0) / n : 0;
    const maxK = Math.max(TARGETS.kcal, ...macroHist.map((x) => x.kcal));
    const avgRows = [["Calories", Math.round(avgF((d) => d.kcal)), TARGETS.kcal, "kcal"], ["Prot\xE9ines", Math.round(avgF((d) => d.p)), TARGETS.protein, "g"], ["Glucides", Math.round(avgF((d) => d.c)), TARGETS.carbs, "g"], ["Lipides", Math.round(avgF((d) => d.f)), TARGETS.fat, "g"]];
    return /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 11 } }, "Moyenne sur ", n, "jour", n > 1 ? "s" : "", " avec donn\xE9es", n ? "\xB7vs ta cible" : ""), n === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.mut, textAlign: "center", padding: "8px 0" } }, "Aucune donn\xE9e cette semaine.") : avgRows.map(([label, val, target, unit]) => {
      const z = zone(val, target);
      const pct = Math.min(100, target ? val / target * 100 : 0);
      return /* @__PURE__ */ React.createElement("div", { key: label, style: { marginBottom: 9 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, val, "/", target, unit, "\xB7", z.label)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" } })));
    }), n > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, paddingTop: 12, borderTop: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement(IndulgenceGauge, { satfat: Math.round(avgF((d) => d.f) * 0.4), sugar: null, daily: true, title: "Gras satur\xE9s\xB7moyenne estim\xE9e" })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "flex-end", height: 56, marginTop: 14 } }, macroHist.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, height: `${d.kcal > 0 ? Math.max(4, d.kcal / maxK * 100) : 0}%`, minHeight: d.kcal > 0 ? 4 : 0, background: d.kcal > 0 ? zone(d.kcal, TARGETS.kcal).color : C.line, borderRadius: "4px 4px 0 0" } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, marginTop: 5 } }, macroHist.map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { flex: 1, textAlign: "center", fontSize: 8.5, color: d.date === dateKey() ? C.ember : C.mut } }, d.date.slice(8), "/", d.date.slice(5, 7)))));
  })(), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Ajouter un repas pass\xE9"), !pastOpen ? /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setPastOpen(true);
    setPastResult(null);
    setPastErr("");
  }, style: { width: "100%", background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 } }, Icons.Plus({ size: 16 }), "Ajouter un repas pass\xE9") : /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 6 } }, "Date du repas"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value: pastDate,
      max: dateKey(),
      onChange: (e) => setPastDate(e.target.value),
      style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center", marginBottom: 12 }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 6 } }, "D\xE9cris ton repas"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: pastText,
      onChange: (e) => {
        setPastText(e.target.value);
        setPastResult(null);
      },
      rows: 3,
      placeholder: "Ex.poulet curry+riz basmati+1bi\xE8re",
      style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, lineHeight: 1.5, resize: "vertical" }
    }
  ), !pastResult ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: calcPast,
      disabled: pastBusy,
      style: { width: "100%", marginTop: 12, background: pastBusy ? C.tealSoft : C.teal, color: pastBusy ? C.teal : C.bg, border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: pastBusy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }
    },
    Icons.Sparkles({ size: 16 }),
    pastBusy ? "Calcul des macros\u2026" : "Calculer les macros avec l'IA"
  ) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "flex-start", marginTop: 12 } }, [["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: pastResult[k],
      onChange: (e) => setPastResult({ ...pastResult, [k]: e.target.value.replace(/[^0-9.]/g, "") }),
      inputMode: "decimal",
      style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 } }, l, "(g)")))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", fontSize: 12, color: C.mut, marginTop: 10 } }, "\u2248", Math.round(((+pastResult.p || 0) + (+pastResult.c || 0)) * 4 + (+pastResult.f || 0) * 9), "kcal"), /* @__PURE__ */ React.createElement("button", { onClick: addPast, style: { width: "100%", marginTop: 12, background: C.ember, color: "#1b1205", border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer" } }, "Ajouter au ", fmtShort(pastDate))), pastErr && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, marginTop: 10, lineHeight: 1.45 } }, pastErr), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setPastOpen(false);
    setPastResult(null);
    setPastErr("");
  }, style: { width: "100%", marginTop: 8, background: "none", border: "none", color: C.mut, fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "Annuler")), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Poids\xB714jours"), weightHist === null ? /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13 } }, "Chargement\u2026") : (() => {
    const pts = weightHist.map((d, i) => ({ ...d, i })).filter((d) => d.weight != null);
    const lastW = pts.length ? pts[pts.length - 1].weight : null;
    if (pts.length === 0) return /* @__PURE__ */ React.createElement(Card, { style: { border: `1px dashed ${C.line}`, textAlign: "center", color: C.mut, fontSize: 13, lineHeight: 1.5 } }, "Renseigne ton poids du jour.");
    const W = 320, H = 150, padT = 28, padB = 24, padL = 10, padR = 10;
    const ws = pts.map((p) => p.weight);
    let lo = Math.min(...ws), hi = Math.max(...ws);
    const pad = Math.max(0.5, (hi - lo) * 0.2);
    lo -= pad;
    hi += pad;
    const x = (i) => padL + i * (W - padL - padR) / 13;
    const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
    const line = pts.map((p, k) => `${k === 0 ? "M" : "L"} ${x(p.i).toFixed(1)} ${y(p.weight).toFixed(1)}`).join(" ");
    return /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, "\xC9volution sur 2 semaines"), lastW != null && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: C.teal } }, "dernier:", lastW, "kg")), /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, style: { width: "100%", height: "auto", display: "block" } }, /* @__PURE__ */ React.createElement("path", { d: line, fill: "none", stroke: C.teal, strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }), pts.map((p, k) => /* @__PURE__ */ React.createElement("g", { key: k }, /* @__PURE__ */ React.createElement("circle", { cx: x(p.i), cy: y(p.weight), r: "3.5", fill: C.teal }), /* @__PURE__ */ React.createElement("text", { x: x(p.i), y: y(p.weight) - 9, fill: C.text, fontSize: "10", fontWeight: "700", textAnchor: "middle" }, p.weight), /* @__PURE__ */ React.createElement("text", { x: x(p.i), y: H - 8, fill: p.date === dateKey() ? C.ember : C.mut, fontSize: "8", textAnchor: "middle" }, p.date.slice(8), "/", p.date.slice(5, 7))))));
  })(), /* @__PURE__ */ React.createElement("div", { ref: recipesRef, style: { marginTop: 28, paddingTop: 8, borderTop: `2px solid ${C.line}` } }, /* @__PURE__ */ React.createElement(RecipesTab, { addMacros, openId: openRecipeId, newSignal: recipeNew })), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }));
}
function RecipesTab({ addMacros, openId, newSignal }) {
  const styleOpts = ["Petit d\xE9j", "Repas", "Collation", "Dessert"];
  const [recipes, setRecipes] = React.useState(null);
  const [f, setF] = React.useState("Tout");
  const [open, setOpen] = React.useState(null);
  const [editing, setEditing] = React.useState(null);
  React.useEffect(() => {
    if (openId) {
      setOpen(openId);
      setEditing(null);
      setF("Tout");
    }
  }, [openId]);
  React.useEffect(() => {
    (async () => {
      let r = await store.get("recipes");
      const inited = await store.get("recipesInit");
      if (r == null && !inited) {
        r = RECIPES.map((x) => ({ ...x }));
        store.set("recipes", r);
        store.set("recipesInit", 1);
      }
      setRecipes(Array.isArray(r) ? r : []);
    })();
  }, []);
  const persist = (list2) => {
    setRecipes(list2);
    store.set("recipes", list2);
  };
  const kcal = (r) => Math.round((+r.protein || 0) * 4 + (+r.carbs || 0) * 4 + (+r.fat || 0) * 9);
  const startNew = () => {
    setOpen(null);
    setEditing({ id: "u" + Date.now(), style: "Repas", title: "", link: "", manual: false, protein: "", carbs: "", fat: "", ingText: "", stepsText: "" });
  };
  React.useEffect(() => {
    if (newSignal) startNew();
  }, [newSignal]);
  const startEdit = (r) => setEditing({ ...r, manual: false, link: r.link || "", protein: String(r.protein ?? ""), carbs: String(r.carbs ?? ""), fat: String(r.fat ?? ""), ingText: (r.ing || []).join("\n"), stepsText: (r.steps || []).join("\n") });
  const saveEdit = async () => {
    const d = editing;
    let mac;
    if (d.manual) mac = { protein: +d.protein || 0, carbs: +d.carbs || 0, fat: +d.fat || 0 };
    else if (d.aiVals) mac = d.aiVals;
    else {
      try {
        mac = await aiMacros(d.ingText);
      } catch (e) {
        mac = recipeMacros(d.ingText);
        showToast("IA indisponible\u2014calcul local", 6e3);
      }
    }
    const exists = recipes.some((r) => r.id === d.id);
    persist(exists ? recipes.map((r) => r.id === d.id ? clean : r) : [clean, ...recipes]);
    setEditing(null);
    setOpen(clean.id);
    showToast(exists ? "Recette mise \xE0 jour" : "Recette ajout\xE9e");
  };
  const runAI = async () => {
    if (!editing.ingText.trim()) {
      showToast("Ajoute des ingr\xE9dients");
      return;
    }
    try {
      const v = await aiMacros(editing.ingText);
      setEditing((e) => ({ ...e, aiVals: v, manual: false }));
    } catch (err) {
      setEditing((e) => ({ ...e, aiVals: recipeMacros(e.ingText) }));
      showToast("IA indisponible", 5e3);
    }
  };
  const del = (id) => {
    persist(recipes.filter((r) => r.id !== id));
    setOpen(null);
    showToast("Recette supprim\xE9e");
  };
  const eat = (r) => {
    addMacros({ p: +r.protein || 0, c: +r.carbs || 0, f: +r.fat || 0 });
    showToast("Ajout\xE9!" + (+r.protein || 0) + "P " + (+r.carbs || 0) + "G " + (+r.fat || 0) + "L");
  };
  if (!recipes) return /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13, paddingTop: 8 } }, "Chargement\u2026");
  if (editing) {
    const isEdit = recipes.some((r) => r.id === editing.id);
    const auto = recipeMacros(editing.ingText);
    const shown = editing.manual ? { protein: +editing.protein || 0, carbs: +editing.carbs || 0, fat: +editing.fat || 0 } : editing.aiVals || auto;
    const kc = Math.round((shown.protein + shown.carbs) * 4 + shown.fat * 9);
    const src = editing.manual ? "manuel" : editing.aiVals ? "ia" : "local";
    const clean2 = { id: editing.id, style: editing.style, title: (editing.title || "").trim() || "Nouvelle recette", link: (editing.link || "").trim(), protein: shown.protein, carbs: shown.carbs, fat: shown.fat, satfat: shown.satfat != null ? shown.satfat : Math.round((shown.fat || 0) * 0.4), sugar: shown.sugar ?? null, ing: editing.ingText.split("\n").map((s) => s.trim()).filter(Boolean), steps: editing.stepsText.split("\n").map((s) => s.trim()).filter(Boolean) };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, isEdit ? "Modifier" : "Nouvelle recette"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, editing.title || "Ta recette"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Titre"), /* @__PURE__ */ React.createElement("input", { value: editing.title, onChange: (e) => setEditing({ ...editing, title: e.target.value }), placeholder: "Ex.Wok de poulet", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Style"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, styleOpts.map((s) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setEditing({ ...editing, style: s }), style: { padding: "7px 13px", borderRadius: 99, border: `1px solid ${editing.style === s ? C.ember : C.line}`, background: editing.style === s ? C.emberSoft : C.card, color: editing.style === s ? C.ember : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, s)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Lien"), /* @__PURE__ */ React.createElement("input", { value: editing.link, onChange: (e) => setEditing({ ...editing, link: e.target.value }), placeholder: "https://\u2026", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Ingr\xE9dients"), /* @__PURE__ */ React.createElement("textarea", { value: editing.ingText, onChange: (e) => setEditing({ ...editing, ingText: e.target.value, aiVals: null }), rows: 6, placeholder: "350g steak\n1pain", style: { ...fld, resize: "vertical", lineHeight: 1.6 } })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { ...lbl, margin: 0 } }, "Macros"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: src === "ia" ? C.teal : C.mut, background: src === "ia" ? C.tealSoft : C.line, padding: "3px 9px", borderRadius: 99 } }, src === "manuel" ? "manuel" : src === "ia" ? "\u2713IA" : "aper\xE7u")), editing.manual ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["protein", "Prot\xE9ines"], ["carbs", "Glucides"], ["fat", "Lipides"]].map(([k, l]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement("input", { value: editing[k], onChange: (e) => setEditing({ ...editing, [k]: e.target.value.replace(/[^0-9.]/g, "") }), inputMode: "decimal", placeholder: "0", style: { ...fld, textAlign: "center" } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 } }, l, "(g)")))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, pill("prot\xE9ines", shown.protein + "g", C.ember), pill("glucides", shown.carbs + "g", C.teal), pill("lipides", shown.fat + "g", "#C9A24B")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, textAlign: "center", fontSize: 13, color: C.mut } }, "\u2248", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20, fontWeight: 800, color: C.ember } }, kc), "kcal/personne"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement(MacroCompare, { protein: shown.protein, carbs: shown.carbs, fat: shown.fat, style: editing.style })), !editing.manual && /* @__PURE__ */ React.createElement("button", { onClick: runAI, style: { width: "100%", marginTop: 12, background: C.teal, color: C.bg, border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 } }, Icons.Sparkles({ size: 16 }), "Calculer avec l'IA"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setEditing({ ...editing, manual: !editing.manual, ...editing.manual ? {} : { protein: String(shown.protein), carbs: String(shown.carbs), fat: String(shown.fat) } }),
        style: { width: "100%", marginTop: 8, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 10, padding: "9px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }
      },
      editing.manual ? "Revenir au calcul auto" : "Corriger \xE0 la main"
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Pr\xE9paration"), /* @__PURE__ */ React.createElement("textarea", { value: editing.stepsText, onChange: (e) => setEditing({ ...editing, stepsText: e.target.value }), rows: 5, placeholder: "\xC9tape1\n\xC9tape2", style: { ...fld, resize: "vertical", lineHeight: 1.5 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEditing(null), style: { flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" } }, "Annuler"), /* @__PURE__ */ React.createElement("button", { onClick: saveEdit, style: { flex: 2, background: C.ember, border: "none", color: "#1b1205", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer" } }, "Enregistrer"))), /* @__PURE__ */ React.createElement("div", { style: { height: 16 } }));
  }
  const styles = ["Tout", ...styleOpts];
  const list = recipes.filter((r) => f === "Tout" || r.style === f);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Recettes"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Riches en prot\xE9ines, jamais fades"), /* @__PURE__ */ React.createElement("button", { onClick: startNew, style: { width: "100%", background: C.emberSoft, border: `1px solid ${C.ember}`, color: C.ember, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 16 } }, Icons.Plus({ size: 17 }), "Nouvelle recette"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 } }, styles.map((s) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setF(s), style: { padding: "7px 13px", borderRadius: 99, border: `1px solid ${f === s ? C.ember : C.line}`, background: f === s ? C.emberSoft : C.card, color: f === s ? C.ember : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, s))), list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 22, textAlign: "center", color: C.mut, fontSize: 13 } }, "Aucune recette."), list.map((r) => {
    const on = open === r.id;
    return /* @__PURE__ */ React.createElement("div", { key: r.id, style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, marginBottom: 11, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(on ? null : r.id), style: { width: "100%", background: "none", border: "none", padding: 16, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: C.teal, background: C.tealSoft, padding: "2px 7px", borderRadius: 99 } }, r.style), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.mut, fontWeight: 600 } }, /* @__PURE__ */ React.createElement("b", { style: { color: C.ember } }, kcal(r)), "kcal\xB7P", r.protein, "\xB7G", r.carbs, "\xB7L", r.fat)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15.5, fontWeight: 700 } }, r.title)), Icons.ChevronDown({ size: 18, color: C.mut })), on && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 16px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, pill("prot\xE9ines", r.protein + "g", C.ember), pill("glucides", r.carbs + "g", C.teal), pill("lipides", r.fat + "g", "#C9A24B"), pill("kcal", kcal(r), C.text)), /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement(MacroCompare, { protein: r.protein, carbs: r.carbs, fat: r.fat, style: r.style })), r.link && /* @__PURE__ */ React.createElement("a", { href: safeUrl(r.link), target: "_blank", rel: "noopener noreferrer", style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, textDecoration: "none", marginBottom: 14, background: C.emberSoft, border: `1px solid ${C.ember}`, color: C.ember, borderRadius: 11, padding: "11px", fontSize: 13.5, fontWeight: 800 } }, Icons.ExternalLink({ size: 16 }), "Voir la recette"), r.ing?.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Ingr\xE9dients"), /* @__PURE__ */ React.createElement("ul", { style: { margin: "0 0 6px", paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 } }, r.ing.map((x, i) => /* @__PURE__ */ React.createElement("li", { key: i }, x)))), r.steps?.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { ...lbl, marginTop: 12 } }, "Pr\xE9paration"), /* @__PURE__ */ React.createElement("ol", { style: { margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 } }, r.steps.map((x, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: { marginBottom: 4 } }, x)))), /* @__PURE__ */ React.createElement("button", { onClick: () => eat(r), style: { width: "100%", marginTop: 16, background: C.tealSoft, border: `1px solid ${C.teal}`, color: C.teal, borderRadius: 11, padding: "11px", fontSize: 13.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } }, Icons.Plus({ size: 15 }), "J'ai mang\xE9 \xE7a"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => startEdit(r), style: { flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } }, Icons.Pencil({ size: 14 }), "Modifier"), /* @__PURE__ */ React.createElement("button", { onClick: () => del(r.id), style: { flex: 1, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 11, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } }, Icons.Trash2({ size: 14 }), "Supprimer"))));
  }), /* @__PURE__ */ React.createElement("div", { style: { height: 8 } }));
}
function SleepTab({ day, saveDay, hist, onSleepSaved, onDeleteSleep, saveSleepForDate }) {
  const s = day.sleep || {};
  const [mode, setMode] = React.useState("live");
  const [active, setActive] = React.useState(null);
  const [now, setNow] = React.useState(Date.now());
  const [bed, setBed] = React.useState(s.bed || "23:00");
  const [wake, setWake] = React.useState(s.wake || "07:00");
  const [q, setQ] = React.useState(s.quality || 0);
  const [justEnded, setJustEnded] = React.useState(false);
  const [manualDate, setManualDate] = React.useState(dateKey());
  React.useEffect(() => {
    (async () => {
      const act = await store.get("sleepActive");
      if (act && act.startedAt && day.sleep && day.sleep.endedAt && day.sleep.endedAt >= act.startedAt) {
        store.del("sleepActive");
        setActive(null);
      } else setActive(act);
    })();
    const id = setInterval(() => setNow(Date.now()), 2e4);
    return () => clearInterval(id);
  }, []);
  const today = dateKey();
  const hhmm = (d) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const calcHours = (b, w) => {
    const [bh, bm] = b.split(":").map(Number), [wh, wm] = w.split(":").map(Number);
    let mins = wh * 60 + wm - (bh * 60 + bm);
    if (mins <= 0) mins += 1440;
    return Math.round(mins / 60 * 10) / 10;
  };
  const startNight = () => {
    const a = { startedAt: (/* @__PURE__ */ new Date()).toISOString() };
    store.set("sleepActive", a);
    setActive(a);
    setJustEnded(false);
  };
  const endNight = () => {
    if (!active) return;
    const start = new Date(active.startedAt), end = /* @__PURE__ */ new Date();
    const b = hhmm(start), w = hhmm(end);
    const hours = Math.round((end - start) / 36e5 * 10) / 10;
    setBed(b);
    setWake(w);
    saveDay({ ...day, sleep: { bed: b, wake: w, quality: q, hours, endedAt: end.toISOString() } });
    onSleepSaved(today, hours, q);
    store.del("sleepActive");
    setActive(null);
    setJustEnded(true);
  };
  const saveManual = () => {
    const hours = calcHours(bed, wake);
    saveSleepForDate(manualDate || today, { bed, wake, quality: q, hours, endedAt: (/* @__PURE__ */ new Date()).toISOString() });
    setJustEnded(true);
  };
  const pickResave = (n) => {
    setQ(n);
    const sl = { ...day.sleep || {}, quality: n };
    saveDay({ ...day, sleep: sl });
    onSleepSaved(today, sl.hours, n);
  };
  const elapsed = Math.max(0, active ? now - new Date(active.startedAt).getTime() : 0);
  const eh = Math.floor(elapsed / 36e5), em = Math.floor(elapsed % 36e5 / 6e4);
  const data = hist.filter((h) => h.sleepH != null).sort((a, b) => a.date < b.date ? -1 : 1);
  const lastN = (n) => data.slice(-n);
  const avg7 = lastN(7).length ? Math.round(lastN(7).reduce((s2, d) => s2 + d.sleepH, 0) / lastN(7).length * 10) / 10 : null;
  const avg30 = lastN(30).length ? Math.round(lastN(30).reduce((s2, d) => s2 + d.sleepH, 0) / lastN(30).length * 10) / 10 : null;
  const maxH = Math.max(9, ...data.map((d) => d.sleepH));
  const btnTeal = { width: "100%", background: C.teal, color: C.bg, border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 };
  const qRow = (onPick) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, margin: "0 0 8px" } }, "Qualit\xE9 ressentie"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ React.createElement("button", { key: n, onClick: () => onPick(n), style: { flex: 1, padding: "10px 0", borderRadius: 11, border: `1px solid ${q >= n ? C.teal : C.line}`, background: q >= n ? C.tealSoft : C.bg, color: q >= n ? C.teal : C.mut, fontSize: 16, fontWeight: 700, cursor: "pointer" } }, n))));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.teal }, "Sommeil"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "R\xE9cup\xE9rer,c'est progresser"), /* @__PURE__ */ React.createElement("p", { style: { color: C.mut, margin: "0 0 16px", fontSize: 14, lineHeight: 1.5 } }, "Vise 7h30-8h,et surtout des horaires r\xE9guliers."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 12, padding: 4, marginBottom: 14 } }, [["live", "D\xE9marrer/terminer"], ["manual", "Saisir \xE0 la main"]].map(([m, l]) => /* @__PURE__ */ React.createElement("button", { key: m, onClick: () => setMode(m), style: { flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 700, background: mode === m ? C.teal : "transparent", color: mode === m ? C.bg : C.mut } }, l))), mode === "live" ? active ? /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 11, marginBottom: 6 } }, Icons.Moon({ size: 20, color: C.teal }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700 } }, "Nuit en cours"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut } }, "d\xE9marr\xE9e \xE0", hhmm(new Date(active.startedAt))))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", margin: "12px 0 16px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 36, fontWeight: 800, color: C.teal } }, eh, "h", String(em).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut } }, "de repos")), /* @__PURE__ */ React.createElement("button", { onClick: endNight, style: btnTeal }, Icons.Sunrise({ size: 18 }), "Je me r\xE9veille")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: startNight, style: { ...btnTeal, padding: 18, fontSize: 16 } }, Icons.Moon({ size: 19 }), "D\xE9marrer la nuit"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: C.mut, textAlign: "center", margin: "11px 0 0", lineHeight: 1.5 } }, "Appuie quand tu te couches."), justEnded && day.sleep && /* @__PURE__ */ React.createElement(Card, { style: { marginTop: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } }, Icons.Check({ size: 16, color: C.good }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700 } }, "Nuit enregistr\xE9e")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: C.mut, margin: "0 0 14px" } }, day.sleep.bed, "\u2192", day.sleep.wake, "\xB7", hToHM(day.sleep.hours)), qRow(pickResave))) : /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, marginBottom: 6 } }, "Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: manualDate, max: dateKey(), onChange: (e) => {
    setManualDate(e.target.value);
    setJustEnded(false);
  }, style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "11px", fontSize: 15, textAlign: "center" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12 } }, [["Coucher", bed, setBed], ["Lever", wake, setWake]].map(([l, val, set]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, marginBottom: 6 } }, l), /* @__PURE__ */ React.createElement("input", { type: "time", value: val, onChange: (e) => set(e.target.value), style: { width: "100%", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "11px", fontSize: 16, textAlign: "center" } })))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", margin: "16px 0 14px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 30, fontWeight: 800, color: C.teal } }, hToHM(calcHours(bed, wake)))), qRow(setQ), /* @__PURE__ */ React.createElement("button", { onClick: saveManual, style: { ...btnTeal, marginTop: 14 } }, "Enregistrer"), justEnded && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 12, color: C.good, fontSize: 13, fontWeight: 700 } }, Icons.Check({ size: 15 }), "Nuit enregistr\xE9e")), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Historique"), data.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 24, textAlign: "center", color: C.mut, fontSize: 13 } }, "Enregistre ta premi\xE8re nuit.") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 12 } }, [["7j", avg7, lastN(7).length], ["30j", avg30, lastN(30).length]].map(([l, v, n]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 } }, "Moy.", l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 27, fontWeight: 800, color: C.teal, marginTop: 4 } }, v != null ? hToHM(v) : "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginTop: 3 } }, n, "nuits")))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700 } }, "14 derni\xE8res nuits"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.teal, display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 14, borderTop: `1px dashed ${C.teal}`, display: "inline-block" } }), "cible7h30")), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 124, borderBottom: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, right: 0, bottom: `${7.5 / maxH * 90}%`, borderTop: `1px dashed ${C.teal}`, opacity: 0.45 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 4 } }, lastN(14).map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" } }, d.sleepH != null && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8.5, fontWeight: 800, color: d.sleepH >= 7.5 ? C.teal : C.mut, marginBottom: 2 } }, hToHMc(d.sleepH)), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: `${d.sleepH != null ? Math.max(3, d.sleepH / maxH * 90) : 0}%`, background: d.sleepH >= 7.5 ? C.teal : C.line, borderRadius: "5px 5px 0 0" } }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, marginTop: 5 } }, lastN(14).map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { flex: 1, textAlign: "center", fontSize: 9, color: C.mut } }, d.date.slice(8), "/", d.date.slice(5, 7))))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "18px 4px 8px" } }, "D\xE9tail\xB7", data.length, "nuits"), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "2px 14px", maxHeight: 320, overflowY: "auto" } }, data.slice().reverse().map((d, i, arr) => /* @__PURE__ */ React.createElement("div", { key: d.date, style: { display: "flex", alignItems: "center", gap: 8, padding: "11px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, borderRadius: 99, background: d.sleepH >= 7.5 ? C.teal : d.sleepH >= 6 ? "#C9A24B" : C.ember, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, textTransform: "capitalize" } }, (/* @__PURE__ */ new Date(d.date + "T00:00")).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, fontWeight: 800, color: C.teal, marginLeft: "auto" } }, hToHM(d.sleepH)), d.quality ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, "\xB7", d.quality, "/5") : null, /* @__PURE__ */ React.createElement("button", { onClick: () => onDeleteSleep(d.date), style: { background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 6 } }, Icons.Trash2({ size: 16 })))))), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }));
}
function ProgramTab() {
  const [recipes, setRecipes] = React.useState(null);
  const [offset, setOffset] = React.useState(0);
  const [plans, setPlans] = React.useState({});
  const [pickFor, setPickFor] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      let r = await store.get("recipes");
      if (!Array.isArray(r) || !r.length) r = RECIPES;
      setRecipes(r);
    })();
  }, []);
  const days = weekDaysFrom(offset);
  React.useEffect(() => {
    (async () => {
      const map = {};
      for (const dk of days) {
        const p = await store.get("plan:" + dk);
        map[dk] = p || { meals: [], session: null };
      }
      setPlans(map);
    })();
  }, [offset]);
  const savePlan = (dk, n) => {
    setPlans((p) => ({ ...p, [dk]: n }));
    store.set("plan:" + dk, n);
  };
  const setSession = (dk, sid) => savePlan(dk, { meals: plans[dk]?.meals || [], session: sid || null });
  const addMeal = (dk, rid) => {
    const cur = plans[dk] || { meals: [] };
    if ((cur.meals || []).includes(rid)) return;
    savePlan(dk, { ...cur, meals: [...cur.meals || [], rid] });
  };
  const removeMeal = (dk, rid) => {
    const cur = plans[dk] || { meals: [] };
    const jul = { ...cur.juliette || {} };
    delete jul[rid];
    savePlan(dk, { ...cur, meals: (cur.meals || []).filter((x) => x !== rid), juliette: jul });
  };
  const toggleJul = (dk, rid) => {
    const cur = plans[dk] || { meals: [] };
    const jul = { ...cur.juliette || {} };
    if (jul[rid]) delete jul[rid];
    else jul[rid] = true;
    savePlan(dk, { ...cur, juliette: jul });
  };
  const recById = (id) => (recipes || []).find((r) => r.id === id);
  const today = dateKey();
  const dayTotals = (meals) => {
    let p = 0, c = 0, f = 0;
    (meals || []).forEach((rid) => {
      const r = recById(rid);
      if (r) {
        p += +r.protein || 0;
        c += +r.carbs || 0;
        f += +r.fat || 0;
      }
    });
    return { p, c, f, kcal: Math.round((p + c) * 4 + f * 9) };
  };
  const rangeLabel = `${(/* @__PURE__ */ new Date(days[0] + "T00:00")).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}\u2013${(/* @__PURE__ */ new Date(days[6] + "T00:00")).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`;
  if (!recipes) return /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13, paddingTop: 8 } }, "Chargement\u2026");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Programme"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Ta semaine"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: "8px 10px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOffset(offset - 1), style: navBtn }, Icons.ChevronLeft({ size: 18 })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800 } }, offset === 0 ? "Cette semaine" : rangeLabel)), /* @__PURE__ */ React.createElement("button", { onClick: () => setOffset(offset + 1), style: navBtn }, Icons.ChevronRight({ size: 18 }))), days.map((dk) => {
    const pl = plans[dk] || { meals: [], session: null };
    const isToday = dk === today;
    return /* @__PURE__ */ React.createElement("div", { key: dk, style: { background: C.card, border: `1px solid ${isToday ? C.ember : C.line}`, borderRadius: 16, padding: 14, marginBottom: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, textTransform: "capitalize", marginBottom: 10 } }, (/* @__PURE__ */ new Date(dk + "T00:00")).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }), isToday ? "\xB7auj." : ""), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 } }, Icons.Dumbbell({ size: 15, color: C.ember }), /* @__PURE__ */ React.createElement("select", { value: pl.session || "", onChange: (e) => setSession(dk, e.target.value), style: sel }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Repos"), [...new Set(SESSIONS.map((s) => s.group))].map((g) => /* @__PURE__ */ React.createElement("optgroup", { key: g, label: g }, SESSIONS.filter((s) => s.group === g).map((s) => /* @__PURE__ */ React.createElement("option", { key: s.id, value: s.id }, s.name)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 } }, Icons.ChefHat({ size: 15, color: C.teal }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700, color: C.mut } }, "Repas")), (pl.meals || []).length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, marginBottom: 8 } }, "Aucun repas."), (pl.meals || []).map((rid) => {
      const r = recById(rid);
      return /* @__PURE__ */ React.createElement("div", { key: rid, style: { display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: C.bg, border: `1px solid ${C.line}`, borderRadius: 10, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, flex: 1 } }, r ? r.title : "Supprim\xE9e"), r && r.link && /* @__PURE__ */ React.createElement("a", { href: safeUrl(r.link), target: "_blank", rel: "noopener noreferrer", style: { color: C.ember, flexShrink: 0 } }, Icons.ExternalLink({ size: 15 })), /* @__PURE__ */ React.createElement("button", { onClick: () => toggleJul(dk, rid), title: "Juliette\xD71.75", style: { width: 26, height: 26, borderRadius: 8, flexShrink: 0, cursor: "pointer", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${pl.juliette && pl.juliette[rid] ? C.teal : C.line}`, background: pl.juliette && pl.juliette[rid] ? C.teal : "transparent", color: pl.juliette && pl.juliette[rid] ? C.bg : C.mut } }, "J"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeMeal(dk, rid), style: { background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 2 } }, Icons.X({ size: 15 })));
    }), pickFor === dk ? /* @__PURE__ */ React.createElement("select", { autoFocus: true, value: "", onChange: (e) => {
      if (e.target.value) addMeal(dk, e.target.value);
      setPickFor(null);
    }, onBlur: () => setPickFor(null), style: { ...sel, marginTop: 4 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Choisir\u2026"), recipes.map((r) => /* @__PURE__ */ React.createElement("option", { key: r.id, value: r.id }, r.title))) : /* @__PURE__ */ React.createElement("button", { onClick: () => setPickFor(dk), style: { marginTop: 4, background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 10, padding: "8px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 } }, Icons.Plus({ size: 14 }), "Ajouter une recette"), (pl.meals || []).length > 0 && (() => {
      const t = dayTotals(pl.meals);
      return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, marginBottom: 9 } }, "Apport des repas/objectif"), /* @__PURE__ */ React.createElement(MiniGauge, { label: "Calories", val: t.kcal, target: TARGETS.kcal }), /* @__PURE__ */ React.createElement(MiniGauge, { label: "Prot\xE9ines", val: Math.round(t.p), target: TARGETS.protein }), /* @__PURE__ */ React.createElement(MiniGauge, { label: "Glucides", val: Math.round(t.c), target: TARGETS.carbs }), /* @__PURE__ */ React.createElement(MiniGauge, { label: "Lipides", val: Math.round(t.f), target: TARGETS.fat }));
    })());
  }), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }));
}
function CoursesTab() {
  const [recipes, setRecipes] = React.useState(null);
  const [items, setItems] = React.useState(null);
  const [newItem, setNewItem] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [editId, setEditId] = React.useState(null);
  const [editText, setEditText] = React.useState("");
  const uid = () => "i" + Math.random().toString(36).slice(2, 9);
  const persist = (list) => {
    setItems(list);
    store.set("shopping", list);
  };
  const collectLines = async (recs) => {
    const keys = await store.list("plan:");
    const td = dateKey();
    const lines = [];
    for (const k of keys) {
      const date = k.slice(5);
      if (date < td) continue;
      const pl = await store.get(k);
      if (!pl || !pl.meals) continue;
      for (const rid of pl.meals) {
        const r = (recs || []).find((x) => x.id === rid);
        if (!r) continue;
        const factor = pl.juliette && pl.juliette[rid] ? 1.75 : 1;
        for (const line of r.ing || []) if (line && line.trim()) lines.push(scaleLine(line.trim(), factor));
      }
    }
    return lines;
  };
  const generate = async (recs, existing) => {
    setBusy(true);
    setErr("");
    const lines = await collectLines(recs || recipes);
    const base = existing || items || [];
    const prevChecked = {};
    base.forEach((it) => {
      if (it.checked && it.name) prevChecked[it.name] = true;
    });
    const manual = base.filter((it) => it.manual);
    let consolidated = [];
    if (lines.length > 0) {
      try {
        consolidated = await aiShoppingList(lines);
      } catch (e) {
        consolidated = localAggregate(lines);
        setErr("IA indisponible:" + (e && e.message || "erreur"));
      }
    }
    const generated = consolidated.map((c) => ({ id: uid(), name: norm(c.item), text: c.qty ? `${c.qty} ${c.item}` : c.item, checked: !!prevChecked[norm(c.item)], manual: false }));
    persist([...generated, ...manual]);
    setBusy(false);
  };
  React.useEffect(() => {
    (async () => {
      let r = await store.get("recipes");
      if (!Array.isArray(r) || !r.length) r = RECIPES;
      setRecipes(r);
      const s = await store.get("shopping");
      const stored = Array.isArray(s) ? s : [];
      setItems(stored);
      if (stored.length === 0) generate(r, stored);
    })();
  }, []);
  const toggle = (id) => persist(items.map((it) => it.id === id ? { ...it, checked: !it.checked } : it));
  const del = (id) => persist(items.filter((it) => it.id !== id));
  const startEdit = (it) => {
    setEditId(it.id);
    setEditText(it.text);
  };
  const saveEdit = () => {
    const t = editText.trim();
    if (t) persist(items.map((it) => it.id === editId ? { ...it, text: t, name: norm(t) } : it));
    setEditId(null);
    setEditText("");
  };
  const addManual = () => {
    const t = newItem.trim();
    if (!t) return;
    persist([...items || [], { id: uid(), name: norm(t), text: t, checked: false, manual: true }]);
    setNewItem("");
  };
  const clearChecked = () => persist(items.filter((it) => !it.checked));
  if (!items) return /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13, paddingTop: 8 } }, "Chargement\u2026");
  const sorted = [...items].sort((a, b) => a.checked === b.checked ? 0 : a.checked ? 1 : -1);
  const remaining = items.filter((it) => !it.checked).length;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Courses"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Ta liste"), /* @__PURE__ */ React.createElement("button", { onClick: () => generate(), disabled: busy, style: { width: "100%", background: busy ? C.tealSoft : C.teal, color: busy ? C.teal : C.bg, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: busy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 } }, Icons.Sparkles({ size: 16 }), busy ? "Calcul\u2026" : "Actualiser depuis le programme"), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, marginBottom: 12 } }, err), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: newItem,
      onChange: (e) => setNewItem(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") addManual();
      },
      placeholder: "Ajouter un article\u2026",
      style: { flex: 1, boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "11px 12px", fontSize: 14 }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: addManual, style: { background: C.ember, color: "#1b1205", border: "none", borderRadius: 10, padding: "0 16px", fontSize: 18, fontWeight: 800, cursor: "pointer" } }, "+")), items.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 22, textAlign: "center", color: C.mut, fontSize: 13 } }, busy ? "G\xE9n\xE9ration\u2026" : "Aucune recette planifi\xE9e.") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 2px 8px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: C.mut } }, remaining, "restant", remaining > 1 ? "s" : ""), /* @__PURE__ */ React.createElement("button", { onClick: clearChecked, style: { background: "none", border: "none", color: C.mut, fontSize: 12, fontWeight: 700, cursor: "pointer" } }, "Retirer coch\xE9s")), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "2px 14px" } }, sorted.map((it, i, arr) => /* @__PURE__ */ React.createElement("div", { key: it.id, style: { display: "flex", alignItems: "center", gap: 11, padding: "11px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(it.id), style: { width: 22, height: 22, borderRadius: 6, border: `2px solid ${it.checked ? C.good : C.line}`, background: it.checked ? C.good : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 } }, it.checked && Icons.Check({ size: 13, color: C.bg })), editId === it.id ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: editText,
      onChange: (e) => setEditText(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") {
          setEditId(null);
          setEditText("");
        }
      },
      style: { flex: 1, boxSizing: "border-box", background: C.bg, border: `1px solid ${C.teal}`, color: C.text, borderRadius: 8, padding: "7px 9px", fontSize: 14 }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: saveEdit, style: { background: C.teal, color: C.bg, border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer" } }, Icons.Check({ size: 15 }))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 14, color: it.checked ? C.mut : C.text, textDecoration: it.checked ? "line-through" : "none" } }, it.text), /* @__PURE__ */ React.createElement("button", { onClick: () => startEdit(it), style: { background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 4 } }, Icons.Pencil({ size: 15 })), /* @__PURE__ */ React.createElement("button", { onClick: () => del(it.id), style: { background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 4 } }, Icons.Trash2({ size: 15 }))))))), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }));
}

/* ---------- Auth Root Wrapper ---------- */
    function ZTLRoot() {
      const [user, setUser] = React.useState(undefined); // undefined = loading, null = not logged in
      const [syncing, setSyncing] = React.useState(false);

      React.useEffect(() => {
        // Check existing session
        (async () => {
          try {
            const session = await window.ZTLAuth.getSession();
            if (session && session.user) {
              window._ztlUser = session.user;
              setUser(session.user);
              // Sync from cloud
              setSyncing(true);
              await store.syncFromCloud();
              setSyncing(false);
            } else {
              setUser(null);
            }
          } catch (e) {
            console.warn("Auth check error:", e);
            setUser(null);
          }
        })();
        // Listen for auth changes
        const { data: { subscription } } = window.ZTLAuth.onAuthChange(async (event, session) => {
          if (session && session.user) {
            window._ztlUser = session.user;
            setUser(session.user);
          } else {
            window._ztlUser = null;
            setUser(null);
          }
        });
        return () => subscription.unsubscribe();
      }, []);

      const handleLogin = async (u) => {
        window._ztlUser = u;
        setUser(u);
        // Push existing local data to cloud on first login
        setSyncing(true);
        await store.pushToCloud();
        await store.syncFromCloud();
        setSyncing(false);
      };

      const handleLogout = async () => {
        await window.ZTLAuth.signOut();
        window._ztlUser = null;
        setUser(null);
      };

      // Loading state
      if (user === undefined) {
        return React.createElement("div", {
          style: { minHeight: "100vh", background: "#13151A", color: "#8B94A4", display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 14 }
        }, React.createElement("div", { className: "spinner", style: { width: 32, height: 32, border: "3px solid #2C323D", borderTopColor: "#FF7A3D", borderRadius: "50%", animation: "spin .8s linear infinite" } }),
           "ZTL se prépare\u2026");
      }

      // Not logged in — show auth screen
      if (!user) {
        return React.createElement(window.AuthScreen, { onLogin: handleLogin });
      }

      // Syncing indicator
      if (syncing) {
        return React.createElement("div", {
          style: { minHeight: "100vh", background: "#13151A", color: "#8B94A4", display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 14 }
        }, React.createElement("div", { className: "spinner", style: { width: 32, height: 32, border: "3px solid #2C323D", borderTopColor: "#56C7BE", borderRadius: "50%", animation: "spin .8s linear infinite" } }),
           "Synchronisation\u2026");
      }

      // Logged in — render app with logout button
      return React.createElement(React.Fragment, null,
        React.createElement(ZTLApp, null),
        React.createElement("div", { style: { maxWidth: 480, margin: "0 auto", padding: "12px 18px 24px", textAlign: "center" } },
          React.createElement("button", {
            onClick: handleLogout,
            style: { background: "none", border: "1px solid #2C323D", color: "#8B94A4", borderRadius: 10,
              padding: "10px 20px", fontSize: 13, cursor: "pointer" }
          }, "D\u00E9connexion (" + user.email + ")")
        )
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(ZTLRoot));
