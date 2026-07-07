var ZTL = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/lucide-react.cjs
  var require_lucide_react = __commonJS({
    "src/lucide-react.cjs"(exports, module) {
      var React2 = typeof window !== "undefined" && window.React || typeof global !== "undefined" && global.React || __require("react");
      function icon(paths) {
        return function(props) {
          var attrs = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
          if (props) {
            for (var k in props) attrs[k] = props[k];
          }
          var kids = paths.map(function(d) {
            return React2.createElement("path", { d });
          });
          return React2.createElement.apply(null, ["svg", attrs].concat(kids));
        };
      }
      module.exports = {
        Home: icon(["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]),
        Dumbbell: icon(["M6 10V6a2 2 0 0 1 4 0v12a2 2 0 0 1-4 0v-4", "M14 10V6a2 2 0 0 0 4 0v12a2 2 0 0 0-4 0v-4", "M6 12h12"]),
        UtensilsCrossed: icon(["M7 2v9a2 2 0 0 1-2 2", "M17 2v9a2 2 0 0 0 2 2", "M2 7h10", "M12 7h10", "M7 15l5 5 5-5"]),
        Moon: icon(["M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"]),
        ChefHat: icon(["M6 16V10a6 6 0 0 1 12 0v6", "M4 18h16", "M12 12v6", "M9 16v2h6v-2"]),
        Check: icon(["M20 6 9 17l-5-5"]),
        Plus: icon(["M5 12h14", "M12 5v14"]),
        Minus: icon(["M5 12h14"]),
        Flame: icon(["M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"]),
        Trophy: icon(["M6 9H4.5a2.5 2.5 0 0 1 0-5H6", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", "M4 22h16", "M8 22v-5a4 4 0 0 1 8 0v5"]),
        ChevronDown: icon(["m6 9 6 6 6-6"]),
        Clock: icon(["M12 6v6l4 2", "M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"]),
        Scale: icon(["M21 3 3 21", "M12 3v18", "M3 12h18"]),
        Sunrise: icon(["M12 2v8", "M2 18h20", "M5 18a7 7 0 0 1 14 0", "M12 10a4 4 0 0 0-4 4", "M8 14a4 4 0 0 0 8 0"]),
        Play: icon(["M6 3l14 9-14 9V3"]),
        X: icon(["M18 6 6 18", "M6 6l12 12"]),
        Pencil: icon(["M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"]),
        Trash2: icon(["M3 6h18", "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", "M10 11v6", "M14 11v6"]),
        Sparkles: icon(["M12 3l1.88 5.12L19 10l-5.12 1.88L12 17l-1.88-5.12L5 10l5.12-1.88z", "M19 3v4", "M17 5h4", "M3 19v2", "M4 20H2"]),
        Camera: icon(["M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z", "M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"]),
        Calendar: icon(["M8 2v4", "M16 2v4", "M2 10h20", "M4 6h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"]),
        ShoppingCart: icon(["M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"]),
        ChevronLeft: icon(["m15 18-6-6 6-6"]),
        ChevronRight: icon(["m9 18 6-6-6-6"]),
        ExternalLink: icon(["M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", "M15 3h6v6", "M10 14 21 3"]),
        Sun: icon(["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M12 2v2", "M12 20v2", "m4.93 4.93 1.41 1.41", "m17.66 17.66 1.41 1.41", "M2 12h2", "M20 12h2", "m6.34 17.66-1.41 1.41", "m19.07 4.93-1.41 1.41"]),
        Cloud: icon(["M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"]),
        CloudSun: icon(["M12 2v2", "m4.93 4.93 1.41 1.41", "M20 12h2", "m19.07 4.93-1.41 1.41", "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"]),
        CloudRain: icon(["M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24", "M16 14v6", "M8 14v6", "M12 16v6"]),
        CloudSnow: icon(["M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24", "M8 15h.01", "M8 19h.01", "M12 17h.01", "M12 21h.01", "M16 15h.01", "M16 19h.01"]),
        CloudLightning: icon(["M6 16.33A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.97", "M13 12l-4 8h6l-4-8"]),
        CloudFog: icon(["M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24", "M9 17h7", "M9 21h7"]),
        CloudDrizzle: icon(["M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24", "M8 19v2", "M8 13v2", "M16 19v2", "M16 13v2", "M12 21v2", "M12 15v2"])
      };
    }
  });

  // src/app-full.jsx
  var app_full_exports = {};
  __export(app_full_exports, {
    default: () => App
  });
  var import_react = __require("react");
  var import_lucide_react = __toESM(require_lucide_react());
  var C = {
    bg: "#FBF4EC",
    bg2: "#FFFFFF",
    card: "#FFFFFF",
    cardHi: "#FFF6EE",
    line: "#EFE6DB",
    text: "#241712",
    mut: "#9A8C7E",
    ember: "#F2543D",
    emberSoft: "rgba(242,84,61,0.12)",
    teal: "#0E9C78",
    tealSoft: "rgba(14,156,120,0.12)",
    good: "#3DBE93",
    amber: "#E0A33B",
    greenVivid: "#10B981",
    coral: "#F2543D",
    peach: "#FBE3D8",
    peachLine: "#F3CDBE",
    mint: "#DDF0E6",
    ink: "#241712"
  };
  var FONT_DISPLAY = '"Schibsted Grotesk", system-ui, sans-serif';
  var FONT_BODY = '"Onest", system-ui, sans-serif';
  var FONT_MONO = '"DM Mono", ui-monospace, monospace';
  var TARGETS = { kcal: 2400, protein: 130, carbs: 290, fat: 65 };
  var MEAL_SHARE = { "Petit d\xE9j": 0.25, "Repas": 0.35, "Collation": 0.1, "Dessert": 0.1 };
  var idealFor = (style) => {
    const s = MEAL_SHARE[style] ?? 0.35;
    return { share: s, kcal: Math.round(TARGETS.kcal * s), protein: Math.round(TARGETS.protein * s), carbs: Math.round(TARGETS.carbs * s), fat: Math.round(TARGETS.fat * s) };
  };
  var SATFAT_MAX = 22;
  var SUGAR_MAX = 50;
  function badZone(value, ceiling) {
    const r = ceiling > 0 ? value / ceiling : 0;
    if (r <= 0.6) return { label: "l\xE9ger", color: C.good };
    if (r <= 1) return { label: "raisonnable", color: C.teal };
    if (r <= 1.4) return { label: "un peu trop", color: C.amber };
    return { label: "\xE7a abuse", color: C.ember };
  }
  var SESSIONS = [
    /* ===== Séance 1 — Abdos (~25 min) ===== */
    { id: "abdos", group: "Maison", name: "Abdos", sub: "~25 min \xB7 2-3\xD7/semaine", ex: [
      {
        id: "ab1",
        name: "Dead bug",
        scheme: "3 \xD7 8 / c\xF4t\xE9",
        cue: "Allong\xE9 dos, bras et jambe oppos\xE9s descendent lentement, dos coll\xE9 au sol.",
        art: "deadbug",
        tag: "good",
        do: ["Allong\xE9 sur le dos, bras vers le plafond, jambes lev\xE9es genoux \xE0 90\xB0", "Descends lentement le bras et la jambe oppos\xE9s sans les poser, reviens, alterne", "Bas du dos coll\xE9 au tapis \u2014 si le dos se creuse, r\xE9duis l'amplitude", "Lent et contr\xF4l\xE9, souffle en tendant", "Le mouvement part du ventre"],
        avoid: ["Dos qui se creuse", "Bras ou jambes qui touchent le sol", "Mouvement rapide ou saccad\xE9"]
      },
      {
        id: "ab2",
        name: "Bas des abdos (exo bouteilles)",
        scheme: "3 \xD7 12",
        cue: "Assis en appui arri\xE8re, jambes serr\xE9es d\xE9coll\xE9es passent par-dessus des bouteilles.",
        art: "bottles",
        do: ["Assis en appui arri\xE8re sur les mains, buste inclin\xE9, jambes serr\xE9es d\xE9coll\xE9es (2 bouteilles au sol)", "D\xE9place les jambes serr\xE9es d'un c\xF4t\xE9 \xE0 l'autre par-dessus les bouteilles, puis en les contournant c\xF4t\xE9 corps", "Jambes serr\xE9es, ce sont les abdos qui les d\xE9placent", "Buste gain\xE9, ne t'effondre pas en arri\xE8re"],
        avoid: ["Jambes qui se desserrent", "Buste qui s'effondre en arri\xE8re", "Forcer si l'\xE9paule tire en appui"]
      },
      {
        id: "ab3",
        name: "Toe-touch (crunch vers le haut)",
        scheme: "3 \xD7 12",
        cue: "Allong\xE9 dos, jambes lev\xE9es, d\xE9colle les omoplates pour toucher les pieds.",
        art: "toetouch",
        do: ["Allong\xE9 sur le dos, jambes tendues lev\xE9es vers le plafond, bras vers les pieds", "D\xE9colle les omoplates et va chercher tes pieds, puis redescends lentement", "Ne tire pas sur la nuque \u2014 pars du ventre", "Pas d'\xE9lan avec les bras", "\xC9paules qui d\xE9collent, lombaires plaqu\xE9es"],
        avoid: ["Tirer sur la nuque", "Donner de l'\xE9lan avec les bras", "D\xE9coller les lombaires du sol"]
      },
      {
        id: "ab4",
        name: "Heel touches (crunch c\xF4t\xE9s)",
        scheme: "3 \xD7 12 / c\xF4t\xE9",
        cue: "Sur le dos, genoux fl\xE9chis, \xE9paules d\xE9coll\xE9es, touche chaque talon alternativement.",
        art: "heeltouch",
        do: ["Sur le dos, genoux fl\xE9chis pieds au sol, \xE9paules d\xE9coll\xE9es, bras le long du corps", "Penche-toi alternativement sur chaque c\xF4t\xE9 pour toucher le talon, droite puis gauche", "Le mouvement vient de la taille (on raccourcit le flanc)", "\xC9paules d\xE9coll\xE9es en permanence", "Nuque rel\xE2ch\xE9e"],
        avoid: ["D\xE9coller les \xE9paules du sol trop haut", "Nuque tendue", "Mouvement trop rapide"]
      },
      {
        id: "ab5",
        name: "Planche ventrale",
        scheme: "3 \xD7 20-40 s",
        cue: "Avant-bras au sol, corps align\xE9, ventre et fessiers serr\xE9s.",
        art: "plank",
        tag: "good",
        do: ["Appui sur les avant-bras, coudes sous les \xE9paules, corps align\xE9 t\xEAte-talons", "Tiens la position en gainant le ventre et serrant les fessiers", "Respire normalement", "Corps droit : ni fesses en l'air, ni bassin qui tombe", "\xC9paules loin des oreilles"],
        avoid: ["Fesses en l'air ou bassin qui tombe", "Retenir sa respiration", "\xC9paules remont\xE9es vers les oreilles"]
      }
    ] },
    /* ===== Séance 2 — Dos + Biceps (~35-40 min) ===== */
    { id: "dos-biceps", group: "Maison", name: "Dos + Biceps", sub: "~35-40 min \xB7 dos d'abord, biceps ensuite", ex: [
      {
        id: "db1",
        name: "Rowing horizontal (tirage debout)",
        scheme: "3 \xD7 10-12",
        cue: "Debout face \xE0 la porte, \xE9lastique poitrine, tire vers le ventre, serre les omoplates.",
        band: "rouge (~7 kg)",
        tag: "good",
        art: "row",
        do: ["Accroche-porte au milieu (hauteur poitrine), une poign\xE9e par main, debout face \xE0 la porte, recule pour tendre", "Tire les poign\xE9es vers le ventre, coudes vers l'arri\xE8re le long du corps, serre les omoplates", "Retour lent", "Tire avec les coudes, serre les omoplates", "Buste droit et fixe, pas de balancier", "\xC9paules basses, genoux l\xE9g\xE8rement fl\xE9chis"],
        avoid: ["Buste qui balance", "\xC9paules qui montent vers les oreilles", "Tirer trop vite"]
      },
      {
        id: "db2",
        name: "Tirage vertical (lat pulldown)",
        scheme: "3 \xD7 10-12",
        cue: "\xC0 genoux face \xE0 la porte, \xE9lastique en haut, tire vers les \xE9paules.",
        band: "vert \u2192 rouge (progressif)",
        tag: "good",
        art: "latpulldown",
        do: ["Accroche-porte tout en haut. \xC0 genoux face \xE0 la porte, bras tendus vers le haut vers l'ancrage", "Tire vers le bas jusqu'aux \xE9paules, coudes vers les c\xF4tes (dans les poches arri\xE8re)", "Remont\xE9e lente", "Ce sont les coudes qui descendent ; sens les dorsaux sous les aisselles", "L\xE9ger buste inclin\xE9 en arri\xE8re, gain\xE9", "TOUJOURS devant la nuque, JAMAIS derri\xE8re"],
        avoid: ["Tirer derri\xE8re la nuque", "Bras qui s'\xE9cartent", "\xC0 surveiller si l'aisselle tire"]
      },
      {
        id: "db3",
        name: "Curl biceps",
        scheme: "3 \xD7 10-12",
        cue: "Debout sur l'\xE9lastique, monte les poign\xE9es aux \xE9paules, descente lente.",
        band: "rouge (~7 kg)",
        art: "curl",
        do: ["Debout, pieds au milieu de l'\xE9lastique, une poign\xE9e par main, bras tendus, paumes vers l'avant", "Monte les poign\xE9es vers les \xE9paules en pliant les coudes", "Redescends lentement (2 s)", "Coudes fixes et coll\xE9s au corps", "Amplitude compl\xE8te", "Descente frein\xE9e aussi importante que la mont\xE9e"],
        avoid: ["Coudes qui s'\xE9cartent du corps", "Balancier du buste", "Descente trop rapide"]
      },
      {
        id: "db4",
        name: "Curl marteau (prise neutre)",
        scheme: "3 \xD7 10-12",
        cue: "M\xEAme installation, pouces vers le haut, poignet ne tourne pas.",
        band: "rouge (~7 kg)",
        art: "hammercurl",
        do: ["M\xEAme installation que le curl", "Monte paumes qui se font face (pouces en haut)", "Coudes fixes, descente lente", "Le poignet ne tourne jamais", "Prise neutre maintenue", "Descente frein\xE9e"],
        avoid: ["Tourner le poignet", "Coudes qui s'\xE9cartent", "Descente rapide"]
      }
    ] },
    /* ===== Séance 3 — Pecs + Triceps (~30-35 min) ===== */
    { id: "pecs-triceps", group: "Maison", name: "Pecs + Triceps", sub: "~30-35 min \xB7 l\xE9ger c\xF4t\xE9 pecs en attendant kin\xE9", ex: [
      {
        id: "pt1",
        name: "Pompes inclin\xE9es",
        scheme: "3 \xD7 8-10 (\u219212)",
        cue: "Mains sur\xE9lev\xE9es (plan de travail), corps gain\xE9, coudes \xE0 45\xB0.",
        tag: "soft",
        art: "incline",
        do: ["Mains sur\xE9lev\xE9es (mur \u2192 plan de travail \u2192 canap\xE9 \u2192 sol). D\xE9marrage : plan de travail", "Corps gain\xE9 et droit", "Descends lentement, coudes \xE0 ~45\xB0 (jamais en croix), jusqu'\xE0 approcher la poitrine", "Puis pousse", "Amplitude que TU contr\xF4les", "Progresse seulement si 12 reps propres et z\xE9ro g\xEAne \xE9paule"],
        avoid: ["Coudes \xE9cart\xE9s \xE0 90\xB0 (en croix)", "Bassin qui s'affaisse ou fesses en l'air", "Forcer si l'aisselle tire \u2014 monte les mains plus haut"]
      },
      {
        id: "pt2",
        name: "Extension triceps pushdown",
        scheme: "3 \xD7 10-12",
        cue: "Debout face \xE0 la porte, \xE9lastique en haut, pousse vers le bas coudes fixes.",
        band: "rouge (~7 kg)",
        art: "pushdown",
        do: ["Accroche-porte tout en haut, debout face \xE0 la porte, tout pr\xE8s", "Coudes coll\xE9s aux flancs, avant-bras remont\xE9s", "Pousse vers le bas jusqu'\xE0 tendre les bras, serre le triceps en bas", "Remonte lentement", "Les coudes ne bougent PAS \u2014 viss\xE9s aux flancs"],
        avoid: ["Coudes qui s'\xE9cartent du corps", "Remont\xE9e rapide", "Extension incompl\xE8te"]
      },
      {
        id: "pt3",
        name: "Kickback triceps",
        scheme: "3 \xD7 10-12 / bras",
        cue: "Buste pench\xE9 45\xB0, \xE9lastique sous le pied, tends le bras vers l'arri\xE8re.",
        band: "jaune (~5 kg)",
        art: "kickback",
        do: ["Un bras \xE0 la fois. \xC9lastique sous le pied avant, buste pench\xE9 ~45\xB0 (dos droit, gain\xE9), jambes fl\xE9chies", "Coude remont\xE9 le long du flanc ; tends le bras vers l'arri\xE8re", "Serre le triceps en fin de mouvement", "Retour lent", "Le haut du bras reste FIXE contre le buste ; seul l'avant-bras bouge", "Extension compl\xE8te + pause"],
        avoid: ["Bouger le haut du bras", "Dos qui s'arrondit dans la position pench\xE9e", "Extension incompl\xE8te"]
      }
    ] },
    /* ===== Séance 4 — Épaules (~20 min) ===== */
    { id: "epaules", group: "Maison", name: "\xC9paules", sub: "~20 min + exo bonus \xB7 l\xE9ger et contr\xF4l\xE9", ex: [
      {
        id: "ep1",
        name: "Band pull-apart",
        scheme: "3 \xD7 12-15",
        cue: "\xC9lastique devant, \xE9carte les bras \xE0 l'horizontale en serrant les omoplates.",
        band: "bleu ciel/canard (~3-4 kg l\xE9ger)",
        tag: "good",
        art: "pullapart",
        do: ["Debout, \xE9lastique entre les deux mains, bras tendus devant \xE0 hauteur de poitrine, l\xE9g\xE8re tension de d\xE9part", "\xC9carte les bras \xE0 l'horizontale jusqu'\xE0 fr\xF4ler la poitrine", "Serre les omoplates, retour lent", "Reste \xE0 hauteur de poitrine \u2014 jamais au-dessus des \xE9paules", "\xC9paules basses"],
        avoid: ["Monter au-dessus des \xE9paules", "\xC9paules hauss\xE9es", "Toute g\xEAne \xE0 l'aisselle r\xE9duis l'amplitude"]
      },
      {
        id: "ep2",
        name: "Rotation externe (coude au corps)",
        scheme: "3 \xD7 12-15 / c\xF4t\xE9",
        cue: "Coude coll\xE9 au flanc \xE0 90\xB0, \xE9carte l'avant-bras vers l'ext\xE9rieur.",
        band: "bleu ciel (~3 kg tr\xE8s l\xE9ger)",
        tag: "good",
        art: "extrot",
        do: ["Accroche-porte \xE0 hauteur de coude. De profil, c\xF4t\xE9 travaill\xE9 le plus \xE9loign\xE9 de la porte", "Coude coll\xE9 au flanc \xE0 90\xB0 (serviette entre coude et c\xF4tes)", "Coude viss\xE9 au flanc, fais pivoter l'avant-bras vers l'ext\xE9rieur", "Retour lent", "Amplitude confortable seulement \u2014 ne force pas la rotation", "Arr\xEAte-toi avant tout tiraillement"],
        avoid: ["D\xE9coller le coude du corps", "Forcer la rotation", "\xC9lastique trop dur"]
      },
      {
        id: "ep3",
        name: "\xC9l\xE9vation lat\xE9rale",
        scheme: "3 \xD7 12-15",
        cue: "Pieds sur l'\xE9lastique, l\xE8ve les bras sur les c\xF4t\xE9s jusqu'\xE0 l'horizontale, pas plus haut.",
        band: "bleu ciel (~3 kg l\xE9ger)",
        tag: "soft",
        art: "lateralraise",
        do: ["Debout, pieds au milieu de l'\xE9lastique, une poign\xE9e par main, bras le long du corps", "L\xE8ve les bras sur les c\xF4t\xE9s jusqu'\xE0 hauteur d'\xE9paule (horizontale) et PAS plus haut", "Redescends lentement", "JAMAIS au-dessus de l'\xE9paule", "Prise neutre (pouce vers l'avant), ne \xAB verse \xBB pas", "Coudes l\xE9g\xE8rement fl\xE9chis, lent, z\xE9ro \xE9lan"],
        avoid: ["Monter au-dessus de l'\xE9paule", "Coudes bloqu\xE9s", "Toute g\xEAne aisselle/avant d'\xE9paule \u2192 stoppe"]
      },
      {
        id: "ep4",
        name: "Slot bonus (exo au choix)",
        scheme: "1-2 exos",
        cue: "Ajoute un exo au choix (curl, marteau, pushdown, kickback, bas des abdos).",
        band: "au choix",
        do: ["Choisis 1-2 exercices bonus : curl biceps, curl marteau, pushdown triceps, kickback triceps, ou bas des abdos", "Jamais de pompes/pecs ici"],
        avoid: ["Pompes ou pecs dans cette s\xE9ance"]
      }
    ] },
    /* ===== Séance 5 — Cardio ===== */
    { id: "cardio", group: "Maison", name: "Cardio", sub: "Footing 30-40 min ou fractionn\xE9 25-30 min", ex: [
      {
        id: "ca1",
        name: "Footing facile",
        scheme: "30-40 min",
        cue: "Allure facile \u2014 test de la parole. ~65-75% FC max. Matin \xE0 jeun ou fin de journ\xE9e.",
        do: ["Dur\xE9e : 30-40 min", "Allure facile \u2014 test de la parole. ~65-75% FC max", "Quand : matin \xE0 jeun (tranquille) ou fin de journ\xE9e", "Jamais juste avant la muscu du soir", "\xC7a doit rester facile m\xEAme si tu te sens capable de plus"]
      },
      {
        id: "ca2",
        name: "Fractionn\xE9 (1\xD7/semaine)",
        scheme: "25-30 min",
        cue: "10 min \xE9chauffement \u2192 30s vite / 90s lent \xD7 8-10 \u2192 retour au calme.",
        do: ["10 min \xE9chauffement \u2192 30 s vite / 90 s lent \xD7 8-10 \u2192 retour au calme", "Dur\xE9e : ~25-30 min", "Quand : plut\xF4t le soir ou apr\xE8s avoir mang\xE9 \u2014 pas \xE0 jeun"]
      }
    ] }
  ];
  var exSlug = (name) => (name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  function exDur(e) {
    if (e && e.dur != null) return e.dur;
    const sch = e && e.scheme || "";
    const m = sch.match(/(\d+)\s*[×x]/);
    const sets = m ? parseInt(m[1], 10) : 3;
    const timed = /\bs\b|sec|min/.test(sch);
    const d = timed ? sets * 1.5 + 1 : sets * 2 + 1;
    return Math.max(3, Math.min(12, Math.round(d)));
  }
  function exCat(e) {
    const n = (e && e.name || "").toLowerCase();
    if (/(squat|fente|presse|jambe|mollet|quadri|ischio|hack|goblet|pont fessier|souleve|soulevé|leg|split)/.test(n)) return "Jambes";
    if (/(pompe|developpe pec|développé pec|chest|pec)/.test(n)) return "Pecs";
    if (/(tirage|rowing|row|traction|dos|lat pulldown)/.test(n)) return "Dos";
    if (/(epaule|épaule|oiseau|rear delt|face pull|elevation|élévation|delts|pull.apart)/.test(n)) return "\xC9paules";
    if (/(rotation externe|coiffe|rotateur)/.test(n)) return "Coiffe";
    if (/(curl|biceps)/.test(n)) return "Biceps";
    if (/(triceps|extension triceps|kickback|pushdown)/.test(n)) return "Triceps";
    if (/(gainage|planche|pallof|crunch|abdo|genoux|releve|relevé|dead bug|toe.touch|heel touch|bouteille)/.test(n)) return "Gainage";
    if (/(footing|fractionné|cardio)/.test(n)) return "Cardio";
    return "Autre";
  }
  function normalizeSession(s) {
    return { ...s, ex: (s.ex || []).map((e) => ({ ...e, exKey: e.exKey || exSlug(e.name), dur: e.dur != null ? e.dur : exDur(e) })) };
  }
  var sessionDur = (s) => (s.ex || []).reduce((a, e) => a + (e.dur != null ? e.dur : exDur(e)), 0);
  var EXERCISES = (() => {
    const seen = {};
    const out = [];
    for (const s of SESSIONS) for (const e of s.ex) {
      const k = exSlug(e.name);
      if (seen[k]) continue;
      seen[k] = 1;
      out.push({ ...e, exKey: k, dur: exDur(e), cat: exCat(e) });
    }
    return out.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  })();
  var EX_CATS = [...new Set(EXERCISES.map((e) => e.cat))];
  var QUICK_FOODS = [
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
  function zone(value, target) {
    const r = target > 0 ? value / target : 0;
    if (r < 0.5) return { label: "\xE0 compl\xE9ter", color: C.mut };
    if (r < 0.85) return { label: "en bonne voie", color: C.teal };
    if (r <= 1.1) return { label: "dans la cible", color: C.good };
    if (r <= 1.3) return { label: "un peu trop", color: C.amber };
    return { label: "d\xE9passement", color: C.ember };
  }
  var RECIPES = [
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
      steps: ["Fais revenir oignon + poivron, ajoute le b\u0153uf.", "\xC9pices, tomates, haricots. Laisse mijoter 20 min.", "Sers avec riz. Un peu de fromage blanc dessus pour la fra\xEEcheur."]
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
  var norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/œ/g, "oe").replace(/æ/g, "ae");
  var FOODS = [
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
    let apiKey = await getDeepSeekKey();
    if (!apiKey) throw new Error("Cl\xE9 API DeepSeek requise. Ajoute-la dans \u2699\uFE0F Cl\xE9s API sur l'accueil.");
    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": "Bearer " + apiKey },
      body: JSON.stringify({ model: "deepseek-chat", max_tokens: 1024, temperature: 0, messages: [{ role: "user", content: prompt }] })
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      if (res.status === 401) throw new Error("Cl\xE9 API DeepSeek invalide. Mets-la \xE0 jour dans \u2699\uFE0F Cl\xE9s API.");
      throw new Error("API DeepSeek erreur " + res.status + " : " + t.slice(0, 150));
    }
    const data = await res.json();
    const text = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || "";
    if (!text) throw new Error("R\xE9ponse DeepSeek vide.");
    return text;
  }
  async function aiMacros(ingText) {
    const prompt = `Tu es nutritionniste. Calcule les valeurs nutritionnelles totales de cette recette pour UNE personne (les quantit\xE9s ci-dessous sont pour une personne).
Ingr\xE9dients (un par ligne) :
${ingText}

R\xE8gles :
- Si la quantit\xE9 d'un ingr\xE9dient n'est pas pr\xE9cis\xE9e, suppose une portion r\xE9aliste standard pour une personne (ex. un steak ~125 g, un pain \xE0 burger ~75 g, une portion de frites ~150 g).
- Additionne les macros de tous les ingr\xE9dients.
- Donne des entiers r\xE9alistes en grammes.
- "satfat" = grammes de graisses satur\xE9es ; "sugar" = grammes de sucres.
R\xE9ponds STRICTEMENT par un objet JSON sur une seule ligne, sans aucun texte autour ni backticks :
{"protein": <entier>, "carbs": <entier>, "fat": <entier>, "satfat": <entier>, "sugar": <entier>}`;
    const text = await callModel(prompt);
    const matches = text.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
    if (!matches || !matches.length) throw new Error("r\xE9ponse illisible: " + text.slice(0, 100));
    const j = JSON.parse(matches[matches.length - 1]);
    return { protein: Math.round(+j.protein || 0), carbs: Math.round(+j.carbs || 0), fat: Math.round(+j.fat || 0), satfat: Math.round(+j.satfat || 0), sugar: Math.round(+j.sugar || 0) };
  }
  async function aiMealFromPhoto(base64, mediaType) {
    let apiKey = window._ztlClaudeKey;
    if (!apiKey) {
      try {
        apiKey = localStorage.getItem("_ztlClaudeKey");
      } catch {
      }
    }
    if (!apiKey) {
      try {
        const v = await store.get("_ztlClaudeKey");
        if (v) {
          apiKey = v;
          window._ztlClaudeKey = v;
        }
      } catch {
      }
    }
    if (!apiKey) throw new Error("Cl\xE9 Claude non trouv\xE9e. Contacte le d\xE9veloppeur.");
    const models = ["claude-sonnet-4-20250514", "claude-sonnet-4-6", "claude-haiku-4-5-20251001"];
    let lastErr;
    for (const model of models) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true"
          },
          body: JSON.stringify({
            model,
            max_tokens: 512,
            messages: [{
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: mediaType, data: base64.split(",")[1] || base64 } },
                { type: "text", text: `Analyse cette photo de plat. R\xE9ponds UNIQUEMENT par un objet JSON valide, sans markdown, sans backticks, au format : {"name":"nom du plat","protein":N,"carbs":N,"fat":N,"description":"br\xE8ve description du plat et des quantit\xE9s estim\xE9es"}. Sois pr\xE9cis, estime les portions visibles.` }
              ]
            }]
          })
        });
        if (!res.ok) {
          const t = await res.text().catch(() => "");
          lastErr = new Error("HTTP " + res.status + " : " + t.slice(0, 150));
          if (res.status < 500 && res.status !== 404) break;
          continue;
        }
        const data = await res.json();
        const text = (data.content || []).filter((c) => c.type === "text").map((c) => c.text).join("");
        if (!text) {
          lastErr = new Error("R\xE9ponse Claude vide.");
          continue;
        }
        const clean = text.replace(/```(json)?\n?|```/g, "").trim();
        const matches = clean.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
        if (!matches || !matches.length) {
          lastErr = new Error("Format JSON invalide dans la r\xE9ponse.");
          continue;
        }
        const j = JSON.parse(matches[matches.length - 1]);
        if (typeof j.protein !== "number" || typeof j.carbs !== "number" || typeof j.fat !== "number") {
          lastErr = new Error("Format de r\xE9ponse IA invalide.");
          continue;
        }
        return { plat: j.name || j.plat || "Plat", protein: Math.round(+j.protein || 0), carbs: Math.round(+j.carbs || 0), fat: Math.round(+j.fat || 0) };
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error("Analyse photo impossible.");
  }
  var SHOP_UNITS = {
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
  var fmtMass = (g) => g >= 1e3 ? Math.round(g / 100) / 10 + " kg" : Math.round(g) + " g";
  var fmtVol = (ml) => ml >= 1e3 ? Math.round(ml / 100) / 10 + " l" : Math.round(ml) + " ml";
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
R\xE9ponds STRICTEMENT par un tableau JSON sur une seule ligne, sans texte ni backticks :
[{"item":"<nom>","qty":"<quantit\xE9 agr\xE9g\xE9e ou ''>"}]

Ingr\xE9dients :
${lines.join("\n")}`;
    const text = await callModel(prompt);
    const matches = text.match(/\[[\s\S]*\]/g);
    if (!matches || !matches.length) throw new Error("r\xE9ponse illisible");
    const arr = JSON.parse(matches[matches.length - 1]);
    return Array.isArray(arr) ? arr.map((x) => ({ item: String(x.item || "").trim(), qty: String(x.qty || "").trim() })).filter((x) => x.item) : [];
  }
  var mem = {};
  var store = {
    async get(k) {
      try {
        const r = await window.storage.get(k);
        return r ? JSON.parse(r.value) : null;
      } catch {
        return k in mem ? mem[k] : null;
      }
    },
    async set(k, v) {
      mem[k] = v;
      try {
        await window.storage.set(k, JSON.stringify(v));
      } catch {
      }
    },
    async del(k) {
      delete mem[k];
      try {
        await window.storage.delete(k);
      } catch {
      }
    },
    async list(prefix) {
      try {
        const r = await window.storage.list(prefix);
        return r ? r.keys : [];
      } catch {
        return Object.keys(mem).filter((x) => x.startsWith(prefix));
      }
    }
  };
  var getDeepSeekKey = async () => {
    if (typeof window !== "undefined") {
      if (window._ztlDeepSeekKey) return window._ztlDeepSeekKey;
      try {
        const k = localStorage.getItem("_ztlDeepSeekKey");
        if (k) {
          window._ztlDeepSeekKey = k;
          return k;
        }
      } catch {
      }
      try {
        const v = await store.get("_ztlDeepSeekKey");
        if (v) {
          window._ztlDeepSeekKey = v;
          localStorage.setItem("_ztlDeepSeekKey", v);
          return v;
        }
      } catch {
      }
    }
    return "";
  };
  var setDeepSeekKey = (k) => {
    if (!k || !k.trim()) return;
    window._ztlDeepSeekKey = k.trim();
    try {
      localStorage.setItem("_ztlDeepSeekKey", k.trim());
    } catch {
    }
    try {
      store.set("_ztlDeepSeekKey", k.trim());
    } catch {
    }
  };
  var dateKey = (d = /* @__PURE__ */ new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  var fmtDay = (d = /* @__PURE__ */ new Date()) => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  var addDays = (dk, n) => {
    const d = /* @__PURE__ */ new Date(dk + "T00:00");
    d.setDate(d.getDate() + n);
    return dateKey(d);
  };
  var weekDaysFrom = (offset) => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (d.getDay() + 6) % 7 + offset * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const x = new Date(d);
      x.setDate(d.getDate() + i);
      return dateKey(x);
    });
  };
  var fmtShort = (dk) => (/* @__PURE__ */ new Date(dk + "T00:00")).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
  var safeUrl = (u) => {
    u = (u || "").trim();
    if (!u) return "";
    return /^https?:\/\//i.test(u) ? u : "https://" + u;
  };
  var hToHM = (h) => {
    if (h == null || isNaN(h)) return "";
    let H = Math.floor(h + 1e-6), M = Math.round((h - H) * 60);
    if (M === 60) {
      H += 1;
      M = 0;
    }
    return M === 0 ? `${H}h` : `${H}h ${String(M).padStart(2, "0")}min`;
  };
  var hToHMc = (h) => {
    if (h == null || isNaN(h)) return "";
    let H = Math.floor(h + 1e-6), M = Math.round((h - H) * 60);
    if (M === 60) {
      H += 1;
      M = 0;
    }
    return M === 0 ? `${H}h` : `${H}h${String(M).padStart(2, "0")}`;
  };
  function Ring({ value, max, size = 150, stroke = 13, color, track = C.line }) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    const pct = max ? Math.min(value / max, 1) : 0;
    return /* @__PURE__ */ React.createElement("svg", { width: size, height: size }, /* @__PURE__ */ React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: track, strokeWidth: stroke }), /* @__PURE__ */ React.createElement(
      "circle",
      {
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
      }
    ));
  }
  function Eyebrow({ children, color = C.mut }) {
    return /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color, fontWeight: 700 } }, children);
  }
  function TagBadge({ tag }) {
    if (!tag) return null;
    const ok = tag === "good";
    return /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 10.5,
      fontWeight: 700,
      padding: "2px 7px",
      borderRadius: 99,
      color: ok ? C.teal : C.ember,
      background: ok ? C.tealSoft : C.emberSoft,
      whiteSpace: "nowrap"
    } }, ok ? "Bon pour l'\xE9paule" : "Prudence \xE9paule");
  }
  function ExerciseArt({ art }) {
    const G = C.mut, A = C.ember, L = C.line;
    const S = { stroke: G, strokeWidth: 4, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
    const AR = { stroke: A, strokeWidth: 2.6, fill: "none", strokeLinecap: "round", markerEnd: `url(#ah-${art})` };
    const poses = {
      squat: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "24", y1: "120", x2: "176", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "92", cy: "36", r: "8", fill: G }), /* @__PURE__ */ React.createElement("path", { d: "M89,46 L78,78", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M78,78 L104,92 L74,118", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M88,50 L122,52", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M152,54 L152,92", ...AR })),
      incline: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "20", y1: "120", x2: "116", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("rect", { x: "140", y: "74", width: "38", height: "46", fill: "none", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M40,116 L86,100 L124,84", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M124,84 L152,76", ...S }), /* @__PURE__ */ React.createElement("circle", { cx: "138", cy: "78", r: "8", fill: G }), /* @__PURE__ */ React.createElement("path", { d: "M150,52 L150,70", ...AR })),
      row: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "40", x2: "22", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "118", cy: "40", r: "8", fill: G }), /* @__PURE__ */ React.createElement("path", { d: "M118,48 L118,92", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M118,92 L108,118 M118,92 L128,118", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M118,55 L138,62 L110,66", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M24,60 C60,62 90,64 110,66", stroke: A, strokeWidth: "2.6", fill: "none" }), /* @__PURE__ */ React.createElement("path", { d: "M150,58 L134,62", ...AR })),
      extrot: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "24", y1: "120", x2: "176", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "100", cy: "34", r: "8", fill: G }), /* @__PURE__ */ React.createElement("path", { d: "M100,42 L100,92", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M100,92 L88,118 M100,92 L112,118", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M100,54 L86,74", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M86,74 L122,74", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M104,90 a30,30 0 0 1 24,-14", ...AR })),
      plank: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "20", y1: "120", x2: "184", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M50,120 L74,120", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M74,120 L74,98", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M74,98 L132,108 L176,118", ...S }), /* @__PURE__ */ React.createElement("circle", { cx: "64", cy: "94", r: "8", fill: G }), /* @__PURE__ */ React.createElement("line", { x1: "78", y1: "98", x2: "172", y2: "116", stroke: A, strokeWidth: "2", strokeDasharray: "4 4", strokeLinecap: "round" })),
      lunge: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "104", cy: "34", r: "8", fill: G }), /* @__PURE__ */ React.createElement("path", { d: "M104,42 L100,80", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M100,80 L124,98 L124,120", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M100,80 L70,110 L54,120", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M102,52 L96,78", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M150,68 L150,100", ...AR })),
      bridge: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "38", cy: "112", r: "8", fill: G }), /* @__PURE__ */ React.createElement("path", { d: "M48,116 L108,80 L140,100 L156,120", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M52,116 L84,118", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M108,78 L108,60", ...AR })),
      facepull: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("line", { x1: "178", y1: "28", x2: "178", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "82", cy: "36", r: "8", fill: G }), /* @__PURE__ */ React.createElement("path", { d: "M84,44 L86,92", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M86,92 L76,118 M86,92 L96,118", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M86,52 L108,48 L96,56", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M96,56 C130,50 158,42 176,40", stroke: A, strokeWidth: "2.6", fill: "none" }), /* @__PURE__ */ React.createElement("path", { d: "M116,60 L98,56", ...AR })),
      pallof: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "20", y1: "120", x2: "180", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "40", x2: "22", y2: "120", stroke: L, strokeWidth: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "112", cy: "34", r: "8", fill: G }), /* @__PURE__ */ React.createElement("path", { d: "M112,42 L112,90", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M112,90 L102,118 M112,90 L122,118", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M112,54 L152,58", ...S }), /* @__PURE__ */ React.createElement("path", { d: "M24,60 C70,58 120,58 152,58", stroke: A, strokeWidth: "2.6", fill: "none" }), /* @__PURE__ */ React.createElement("path", { d: "M74,74 L54,74", ...AR }))
    };
    if (!poses[art]) return null;
    return /* @__PURE__ */ React.createElement("div", { style: { background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: "6px 10px" } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 200 132", width: "100%", style: { display: "block", maxHeight: 150 } }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("marker", { id: `ah-${art}`, markerWidth: "7", markerHeight: "7", refX: "3.5", refY: "3.5", orient: "auto" }, /* @__PURE__ */ React.createElement("path", { d: "M0,0 L7,3.5 L0,7 Z", fill: A }))), poses[art]));
  }
  function App() {
    const [tab, setTab] = (0, import_react.useState)("home");
    const [openRecipeId, setOpenRecipeId] = (0, import_react.useState)(null);
    const [recipeNew, setRecipeNew] = (0, import_react.useState)(0);
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
    const [loading, setLoading] = (0, import_react.useState)(true);
    const tk = dateKey();
    const [day, setDay] = (0, import_react.useState)({ macros: { p: 0, c: 0, f: 0 }, sleep: null, weight: null, workout: {}, session: "abdos" });
    const [exlast, setExlast] = (0, import_react.useState)({});
    const [sessions, setSessions] = (0, import_react.useState)(null);
    const [checks, setChecks] = (0, import_react.useState)({});
    const [hist, setHist] = (0, import_react.useState)([]);
    const [offline, setOffline] = (0, import_react.useState)(false);
    (0, import_react.useEffect)(() => {
      setOffline(!navigator.onLine);
      const goOff = () => setOffline(true);
      const goOn = () => setOffline(false);
      window.addEventListener("offline", goOff);
      window.addEventListener("online", goOn);
      return () => {
        window.removeEventListener("offline", goOff);
        window.removeEventListener("online", goOn);
      };
    }, []);
    (0, import_react.useEffect)(() => {
      (async () => {
        const d = await store.get("log:" + tk);
        if (d) {
          const macros = d.macros || { p: d.protein || 0, c: 0, f: 0 };
          setDay({ macros, sleep: null, weight: null, workout: {}, session: "maisonA", ...d, macros });
        }
        setExlast(await store.get("exlast") || {});
        let ss = await store.get("sessions");
        if (!Array.isArray(ss) || !ss.length) {
          ss = SESSIONS.map(normalizeSession);
          store.set("sessions", ss);
        } else {
          const mig = ss.map((s) => s.group === "Phase reprise" ? { ...s, group: "Maison" } : s);
          if (JSON.stringify(mig) !== JSON.stringify(ss)) {
            ss = mig;
            store.set("sessions", ss);
          }
        }
        setSessions(ss);
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
    const saveDay = (next) => {
      setDay(next);
      store.set("log:" + tk, next);
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
        const next = { ...day, sleep: null };
        setDay(next);
        store.set("log:" + tk, next);
      } else {
        const v = await store.get("log:" + date);
        if (v) store.set("log:" + date, { ...v, sleep: null });
      }
      setHist((h) => h.map((r) => r.date === date ? { ...r, sleepH: null, quality: null } : r));
    };
    const saveSleepForDate = async (date, sleepObj) => {
      if (date === tk) {
        const next = { ...day, sleep: sleepObj };
        setDay(next);
        store.set("log:" + tk, next);
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
    const setExVal = (instanceId, exKey, val) => {
      const w = { ...day.workout, [instanceId]: { ...day.workout[instanceId] || {}, val } };
      saveDay({ ...day, workout: w });
      const el = { ...exlast, [exKey || instanceId]: val };
      setExlast(el);
      store.set("exlast", el);
    };
    const saveSessions = (next) => {
      setSessions(next);
      store.set("sessions", next);
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
    const sessList = sessions && sessions.length ? sessions : SESSIONS.map(normalizeSession);
    const sess = sessList.find((s) => s.id === day.session) || sessList[0];
    const exDone = sess.ex.filter((e) => day.workout[e.id]?.done).length;
    const workoutDone = sess.ex.length > 0 && exDone === sess.ex.length;
    const pillars = (workoutDone ? 1 : 0) + ((day.macros?.p || 0) >= TARGETS.protein ? 1 : 0) + (day.sleep ? 1 : 0);
    if (loading) return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: C.bg, color: C.mut, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" } }, "Chargement de ton carnet\u2026");
    const TABS = [
      { id: "train", icon: "\u{1F3CB}\uFE0F", label: "Sport" },
      { id: "food", icon: "\u{1F37D}\uFE0F", label: "Nutrition" },
      { id: "program", icon: "\u{1F4C5}", label: "Programme" },
      { id: "courses", icon: "\u{1F6D2}", label: "Courses" },
      { id: "sleep", icon: "\u{1F319}", label: "Sommeil" }
    ];
    return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: C.bg, color: C.text, fontFamily: FONT_BODY, paddingBottom: 78 } }, /* @__PURE__ */ React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Onest:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap');`), offline && /* @__PURE__ */ React.createElement("div", { style: { background: "#FFF3CD", borderBottom: `1px solid #E0A33B`, color: C.text, padding: "8px 16px", fontSize: 12, lineHeight: 1.4, textAlign: "center" } }, "\u{1F4E1} ", /* @__PURE__ */ React.createElement("b", null, "Mode hors-ligne"), " \xB7 Tes donn\xE9es sont sauvegard\xE9es localement et synchronis\xE9es d\xE8s le retour de la connexion."), /* @__PURE__ */ React.createElement(ZTLHeader, { onHome: () => setTab("home") }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 480, margin: "0 auto", padding: "14px 18px 0" } }, tab === "home" && /* @__PURE__ */ React.createElement(HomeTab, { ...{ day, sess, exDone, workoutDone, pillars, checks, toggleCheck, setTab, hist, saveDay, saveSleepForDate, openRecipe, addRecipe, sessions: sessList } }), tab === "train" && /* @__PURE__ */ React.createElement(TrainTab, { ...{ day, saveDay, toggleEx, setExVal, exlast, sessions: sessList, saveSessions } }), tab === "food" && /* @__PURE__ */ React.createElement(FoodTab, { ...{ day, addMacros, setMacros, addMacrosForDate, openRecipeId, recipeNew } }), tab === "program" && /* @__PURE__ */ React.createElement(ProgramTab, null), tab === "courses" && /* @__PURE__ */ React.createElement(CoursesTab, null), tab === "sleep" && /* @__PURE__ */ React.createElement(SleepTab, { ...{ day, saveDay, hist, onSleepSaved, onDeleteSleep, saveSleepForDate } })), /* @__PURE__ */ React.createElement("nav", { style: { position: "fixed", bottom: 0, left: 0, right: 0, background: C.bg2, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", width: "100%", maxWidth: 520 } }, TABS.map((t) => {
      const on = tab === t.id;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: t.id,
          onClick: () => setTab(t.id),
          style: { flex: 1, minWidth: 0, background: "none", border: "none", padding: "8px 0 10px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: on ? C.ember : C.mut }
        },
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 19, lineHeight: 1 } }, t.icon),
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8.5, fontWeight: on ? 700 : 500, whiteSpace: "nowrap" } }, t.label)
      );
    }))));
  }
  function ZTLHeader({ onHome }) {
    return /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", top: 0, zIndex: 50, background: C.bg } }, /* @__PURE__ */ React.createElement("div", { style: { height: "env(safe-area-inset-top, 0px)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", background: C.bg2, borderBottom: `1px solid ${C.line}`, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 56 } }, /* @__PURE__ */ React.createElement("button", { onClick: onHome, "aria-label": "Accueil", style: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: 11, background: C.cardHi, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1, color: C.ink } }, "\u{1F3E0}")), /* @__PURE__ */ React.createElement("button", { onClick: onHome, "aria-label": "Accueil", style: { background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", flexDirection: "column", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "baseline", fontFamily: '"Helvetica Neue", Arial, system-ui, sans-serif', fontWeight: 900, color: C.ink, fontSize: 23, lineHeight: 0.78, transform: "scaleY(0.9)" } }, /* @__PURE__ */ React.createElement("span", { style: { letterSpacing: "-0.02em" } }, "Z"), /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "-0.05em" } }, "T"), /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "-0.16em" } }, "L")), /* @__PURE__ */ React.createElement("span", { style: { marginTop: 4, color: C.mut, fontWeight: 800, fontSize: 6.5, letterSpacing: "0.3em", whiteSpace: "nowrap" } }, "LIFE IS YOURS"))));
  }
  function wmoInfo(code) {
    if (code === 0) return { emoji: "\u2600\uFE0F", label: "Ensoleill\xE9", color: C.amber };
    if (code === 1 || code === 2) return { emoji: "\u26C5", label: "\xC9claircies", color: C.amber };
    if (code === 3) return { emoji: "\u2601\uFE0F", label: "Couvert", color: C.mut };
    if (code === 45 || code === 48) return { emoji: "\u{1F32B}\uFE0F", label: "Brouillard", color: C.mut };
    if (code >= 51 && code <= 57) return { emoji: "\u{1F326}\uFE0F", label: "Bruine", color: C.teal };
    if (code >= 61 && code <= 67 || code >= 80 && code <= 82) return { emoji: "\u{1F327}\uFE0F", label: "Pluie", color: C.teal };
    if (code >= 71 && code <= 77 || code === 85 || code === 86) return { emoji: "\u{1F328}\uFE0F", label: "Neige", color: C.teal };
    if (code >= 95) return { emoji: "\u26C8\uFE0F", label: "Orage", color: C.ember };
    return { emoji: "\u26C5", label: "\u2014", color: C.mut };
  }
  function Weather() {
    const [w, setW] = (0, import_react.useState)(null);
    (0, import_react.useEffect)(() => {
      let done = false;
      if (typeof navigator === "undefined" || !navigator.geolocation) {
        setW("err");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`);
            const j = await r.json();
            if (!done && j && j.current) setW({ temp: Math.round(j.current.temperature_2m), code: j.current.weather_code });
            else if (!done) setW("err");
          } catch {
            if (!done) setW("err");
          }
        },
        () => {
          if (!done) setW("err");
        },
        { timeout: 8e3, maximumAge: 18e5 }
      );
      return () => {
        done = true;
      };
    }, []);
    if (!w || w === "err") return null;
    const { emoji: wEmoji, label, color } = wmoInfo(w.code);
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, flexShrink: 0, paddingTop: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 24, lineHeight: 1, color } }, wEmoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 19, fontWeight: 800, fontFamily: FONT_MONO, lineHeight: 1.1, color: C.ink } }, w.temp, "\xB0"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, color: C.mut, fontWeight: 600 } }, label));
  }
  function ApiKeyButton() {
    const [show, setShow] = (0, import_react.useState)(false);
    const [val, setVal] = (0, import_react.useState)("");
    const [hasKey, setHasKey] = (0, import_react.useState)(false);
    (0, import_react.useEffect)(() => {
      getDeepSeekKey().then((k) => {
        if (k) setHasKey(true);
      });
    }, []);
    const handleSave = () => {
      if (!val.trim()) return;
      if (val.trim().startsWith("sk-")) {
        setDeepSeekKey(val.trim());
      } else {
        window._ztlGeminiKey = val.trim();
        try {
          localStorage.setItem("_ztlGeminiKey", val.trim());
        } catch {
        }
        try {
          store.set("_ztlGeminiKey", val.trim());
        } catch {
        }
      }
      setHasKey(true);
      setShow(false);
      setVal("");
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setShow(!show), style: { width: "100%", background: "none", border: `1px solid ${C.line}`, color: hasKey ? C.teal : C.mut, borderRadius: 12, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer", marginTop: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1 } }, "\u2699\uFE0F"), " ", hasKey ? "\u2705 Cl\xE9s API" : "Cl\xE9s API (DeepSeek + Groq)"), show && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 8 } }, "DeepSeek (platform.deepseek.com/api_keys) ou Groq (console.groq.com/keys, gratuit). Elle sera synchronis\xE9e sur tous tes appareils."), /* @__PURE__ */ React.createElement("input", { value: val, onChange: (e) => setVal(e.target.value), placeholder: "sk-...", style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 8, padding: "9px 11px", fontSize: 13, marginBottom: 8 } }), /* @__PURE__ */ React.createElement("button", { onClick: handleSave, style: { width: "100%", background: val.trim() ? C.teal : C.line, color: val.trim() ? C.bg : C.mut, border: "none", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 700, cursor: val.trim() ? "pointer" : "default" } }, "Enregistrer")));
  }
  function HomeTab({ day, sess, exDone, workoutDone, setTab, hist, saveDay, saveSleepForDate, openRecipe, addRecipe, sessions }) {
    const [w, setW] = (0, import_react.useState)(day.weight ?? "");
    const [plan, setPlan] = (0, import_react.useState)(null);
    const [recipes, setRecipes] = (0, import_react.useState)([]);
    const [sleepActive, setSleepActive] = (0, import_react.useState)(void 0);
    (0, import_react.useEffect)(() => {
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
      const nowTs = Date.now();
      const hours = Math.max(0, Math.round((nowTs - a.startedAt) / 36e5 * 10) / 10);
      saveSleepForDate(dateKey(), { bed: hhmm(a.startedAt), wake: hhmm(nowTs), quality: 0, hours, endedAt: new Date(nowTs).toISOString() });
      setSleepActive(null);
      store.del("sleepActive");
    };
    const m = day.macros || { p: 0, c: 0, f: 0 };
    const kcal = Math.round((m.p + m.c) * 4 + m.f * 9);
    const kz = zone(kcal, TARGETS.kcal);
    const planSession = plan && plan.session ? (sessions || []).find((s) => s.id === plan.session) : null;
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
    const macroBar = (label, val, target, unit) => {
      const z = zone(val, target);
      const pct = Math.min(100, target ? val / target * 100 : 0);
      return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, val, " / ", target, " ", unit)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99 } })));
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.coral }, fmtDay()), /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 22, fontWeight: 800, fontFamily: FONT_DISPLAY, margin: "3px 0 0", letterSpacing: -0.4 } }, "Ta journ\xE9e")), /* @__PURE__ */ React.createElement(Weather, null)), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("food"), style: { width: "100%", textAlign: "left", background: C.peach, border: "none", borderRadius: 22, padding: 18, cursor: "pointer", color: C.text } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: C.mut } }, "Macros du jour"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.teal, display: "flex", alignItems: "center", gap: 2 } }, "Nutrition ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1 } }, "\u25B6"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: 104, height: 104, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(Ring, { value: Math.min(kcal, TARGETS.kcal), max: TARGETS.kcal, size: 104, stroke: 11, color: kz.color, track: C.peachLine }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, lineHeight: 1, fontFamily: FONT_MONO } }, kcal), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.mut, marginTop: 2 } }, "/ ", TARGETS.kcal, " kcal"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, macroBar("Prot\xE9ines", Math.round(m.p), TARGETS.protein, "g"), macroBar("Glucides", Math.round(m.c), TARGETS.carbs, "g"), macroBar("Lipides", Math.round(m.f), TARGETS.fat, "g"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 4, paddingTop: 12, borderTop: `1px solid ${C.peachLine}` } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: 99, background: satZ.color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut, flex: 1 } }, "Gras satur\xE9s (estim\xE9)"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: satZ.color } }, satDay, " / ", SATFAT_MAX, " g \xB7 ", satZ.label))), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("food"), style: { width: "100%", marginTop: 12, background: C.coral, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1 } }, "\u{1F37D}\uFE0F"), " Ajouter un repas"), sleepActive ? /* @__PURE__ */ React.createElement("button", { onClick: endNight, style: { width: "100%", marginTop: 10, background: C.greenVivid, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1 } }, "\u{1F305}"), " Terminer la nuit \xB7 couch\xE9 \xE0 ", hhmm(sleepActive.startedAt)) : /* @__PURE__ */ React.createElement("button", { onClick: startNight, disabled: sleepActive === void 0, style: { width: "100%", marginTop: 10, background: C.greenVivid, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u{1F319}"), " D\xE9marrer la nuit"), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Au programme aujourd'hui"), /* @__PURE__ */ React.createElement("div", { style: { background: C.mint, border: "none", borderRadius: 16, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      if (planSession) saveDay({ ...day, session: planSession.id });
      setTab("train");
    }, style: { width: "100%", background: "none", border: "none", borderBottom: `1px solid rgba(0,0,0,0.06)`, padding: "13px 15px", display: "flex", alignItems: "center", gap: 11, cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1, color: C.ember, flexShrink: 0 } }, "\u{1F3CB}\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut } }, "S\xE9ance"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: planSession ? C.text : C.mut } }, planSession ? `${planSession.group} \xB7 ${planSession.name}` : "Repos / aucune s\xE9ance pr\xE9vue")), planSession ? /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 4, background: C.coral, color: "#fff", borderRadius: 99, padding: "7px 12px", fontSize: 12.5, fontWeight: 800, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, lineHeight: 1 } }, "\u25B6\uFE0F"), " Ouvrir") : /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1, color: C.mut } }, "\u25B6")), /* @__PURE__ */ React.createElement("div", { style: { padding: "13px 15px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: planMeals.length ? 9 : 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1, color: C.teal } }, "\u{1F468}\u200D\u{1F373}"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.mut, flex: 1 } }, "Repas pr\xE9vus"), planMeals.length > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, /* @__PURE__ */ React.createElement("b", { style: { color: C.ember } }, planKcal), " kcal")), planMeals.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.mut } }, "Aucun repas pr\xE9vu aujourd'hui.") : planMeals.map((r, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => openRecipe(r.id), style: { width: "100%", textAlign: "left", background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, padding: "7px 0", cursor: "pointer", color: C.text } }, /* @__PURE__ */ React.createElement("span", { style: { width: 5, height: 5, borderRadius: 99, background: C.teal, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, r.title), r.link && /* @__PURE__ */ React.createElement("a", { href: safeUrl(r.link), target: "_blank", rel: "noopener noreferrer", onClick: (e) => e.stopPropagation(), style: { display: "flex", color: C.ember } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1 } }, "\u{1F517}")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.mut } }, Math.round((r.protein + r.carbs) * 4 + r.fat * 9), " kcal"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1, color: C.mut, flexShrink: 0 } }, "\u25B6"))), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("program"), style: { marginTop: 10, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 9, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%" } }, "Ouvrir le programme"))), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("sleep"), style: { width: "100%", textAlign: "left", background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", color: C.text, marginTop: 18 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1, color: C.teal, flexShrink: 0 } }, "\u{1F319}"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut } }, "Derni\xE8re nuit"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700 } }, lastNight ? hToHM(lastNight.sleepH) : "\u2014", lastNight && lastNight.quality ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.mut, fontWeight: 600 } }, " \xB7 ", lastNight.quality, "/5") : null)), avg7 != null && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut } }, "Moy. 7j"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.teal } }, hToHM(avg7))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1, color: C.mut } }, "\u25B6")), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Poids"), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1, color: C.teal } }, "\u2696\uFE0F"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, flex: 1 } }, "Poids du jour", lastWeight != null ? /* @__PURE__ */ React.createElement("span", { style: { color: C.mut } }, " \xB7 dernier ", lastWeight, " kg") : ""), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: w,
        onChange: (e) => setW(e.target.value.replace(",", ".")),
        inputMode: "decimal",
        placeholder: "kg",
        style: { width: 64, background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "7px 9px", fontSize: 14, textAlign: "center" }
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => saveDay({ ...day, weight: parseFloat(w) || null }),
        style: { background: C.greenVivid, color: "#fff", border: "none", borderRadius: 10, padding: "8px 13px", fontSize: 13, fontWeight: 800, cursor: "pointer" }
      },
      "OK"
    )), /* @__PURE__ */ React.createElement(ApiKeyButton, null), /* @__PURE__ */ React.createElement("button", { onClick: addRecipe, style: { width: "100%", marginTop: 14, background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1 } }, "\u{1F468}\u200D\u{1F373}"), " Ajouter une recette"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          if (window._ztlLogout) window._ztlLogout();
        },
        style: { width: "100%", marginTop: 20, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 14, padding: "13px", fontSize: 13, fontWeight: 700, cursor: "pointer" }
      },
      "Se d\xE9connecter"
    ), /* @__PURE__ */ React.createElement("div", { style: { height: 16 } }));
  }
  function ExercisePicker({ exercises, onAdd, onClose }) {
    const [f, setF] = (0, import_react.useState)("Tout");
    const [q, setQ] = (0, import_react.useState)("");
    const [openEx, setOpenEx] = (0, import_react.useState)(null);
    const cats = ["Tout", ...EX_CATS];
    const list = exercises.filter((e) => (f === "Tout" || e.cat === f) && (!q.trim() || e.name.toLowerCase().includes(q.trim().toLowerCase())));
    const chip = (s) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setF(s), style: { padding: "8px 14px", borderRadius: 99, border: `1px solid ${f === s ? C.coral : C.line}`, background: f === s ? C.coral : C.bg2, color: f === s ? "#fff" : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 } }, s);
    return /* @__PURE__ */ React.createElement("div", { onClick: onClose, style: { position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,12,8,.38)", display: "flex", flexDirection: "column", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { background: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "86vh", display: "flex", flexDirection: "column", boxShadow: "0 -12px 40px rgba(0,0,0,.18)" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 0 2px", display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 4, borderRadius: 99, background: C.line } })), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 18px", display: "flex", alignItems: "flex-start", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.coral, fontWeight: 800 } }, "Exercices"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 19, fontWeight: 800, fontFamily: FONT_DISPLAY } }, "Ajouter un exercice")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: C.cardHi, border: `1px solid ${C.line}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.text, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1 } }, "\u2715"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7, padding: "2px 18px 10px", overflowX: "auto" } }, cats.map(chip)), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 18px 10px" } }, /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Rechercher un exercice...", style: { width: "100%", boxSizing: "border-box", background: C.bg2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 12, padding: "11px 13px", fontSize: 14, fontFamily: "inherit" } })), /* @__PURE__ */ React.createElement("div", { style: { overflowY: "auto", padding: "0 12px 22px" } }, list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: C.mut, fontSize: 13, padding: "24px 0" } }, "Aucun exercice."), list.map((e) => {
      const op = openEx === e.exKey;
      return /* @__PURE__ */ React.createElement("div", { key: e.exKey, style: { borderRadius: 14, background: op ? C.card : "none", marginBottom: op ? 6 : 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: C.mint, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20, lineHeight: 1, color: C.teal } }, "\u{1F3CB}\uFE0F")), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenEx(op ? null : e.exKey), style: { flex: 1, minWidth: 0, background: "none", border: "none", textAlign: "left", cursor: "pointer", padding: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, e.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, marginTop: 2, display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", null, e.cat, " \xB7 ", e.scheme, " \xB7 ~", e.dur, " min"), /* @__PURE__ */ React.createElement("span", { style: { color: C.teal, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 2 } }, "\xB7 d\xE9tails ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, lineHeight: 1, transform: op ? "rotate(180deg)" : "none", transition: "transform .25s" } }, "\u25BC")))), /* @__PURE__ */ React.createElement("button", { onClick: () => onAdd(e), title: "Ajouter", style: { flexShrink: 0, width: 30, height: 30, borderRadius: 99, background: C.coral, color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2795"))), op && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 12px 14px 66px" } }, e.cue && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: C.mut, margin: "0 0 10px", lineHeight: 1.5 } }, e.cue), e.art && /* @__PURE__ */ React.createElement(ExerciseArt, { art: e.art }), e.do && /* @__PURE__ */ React.createElement("div", { style: { marginTop: e.art ? 12 : 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.teal, marginBottom: 6 } }, "\xC0 faire"), e.do.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 7, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1, color: C.teal, flexShrink: 0, marginTop: 2 } }, "\u2705"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, lineHeight: 1.45 } }, x)))), e.avoid && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.coral, marginBottom: 6 } }, "\xC0 \xE9viter"), e.avoid.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 7, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1, color: C.coral, flexShrink: 0, marginTop: 2 } }, "\u2715"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, lineHeight: 1.45, color: C.mut } }, x)))), !e.do && !e.cue && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut } }, "Pas de d\xE9tails pour cet exercice.")));
    }))));
  }
  function TrainTab({ day, saveDay, toggleEx, setExVal, exlast, sessions, saveSessions }) {
    const groups = [...new Set(sessions.map((s) => s.group))];
    const sess = sessions.find((s) => s.id === day.session) || sessions[0];
    const [tech, setTech] = (0, import_react.useState)({});
    const [edit, setEdit] = (0, import_react.useState)(false);
    const [picker, setPicker] = (0, import_react.useState)(false);
    const newInst = () => "x" + Math.random().toString(36).slice(2, 8);
    const updateSess = (mut) => saveSessions(sessions.map((s) => s.id === sess.id ? mut(s) : s));
    const addExercise = (m) => updateSess((s) => ({ ...s, ex: [...s.ex, { ...m, id: newInst() }] }));
    const removeExercise = (instId) => updateSess((s) => ({ ...s, ex: s.ex.filter((x) => x.id !== instId) }));
    const renameSess = (name) => updateSess((s) => ({ ...s, name }));
    const setGroup = (group) => updateSess((s) => ({ ...s, group }));
    const GROUP_OPTIONS = ["Maison", "Programme salle"];
    const createSession = () => {
      const id = "s" + Date.now();
      saveSessions([...sessions, { id, group: "Maison", name: "Nouvelle s\xE9ance", custom: true, ex: [] }]);
      saveDay({ ...day, session: id });
      setEdit(true);
    };
    const deleteSession = () => {
      const rest = sessions.filter((s) => s.id !== sess.id);
      saveSessions(rest);
      saveDay({ ...day, session: rest[0] && rest[0].id || "" });
      setEdit(false);
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.coral }, "Sport"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Tes s\xE9ances"), groups.map((g) => /* @__PURE__ */ React.createElement("div", { key: g, style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, fontWeight: 700, margin: "0 0 7px" } }, g), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, sessions.filter((s) => s.group === g).map((s) => {
      const on = s.id === day.session;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: s.id,
          onClick: () => {
            saveDay({ ...day, session: s.id });
            setEdit(false);
          },
          style: { padding: "8px 13px", borderRadius: 99, border: `1px solid ${on ? C.coral : C.line}`, background: on ? C.emberSoft : C.card, color: on ? C.coral : C.text, fontSize: 13, fontWeight: 700, cursor: "pointer" }
        },
        s.name
      );
    })))), /* @__PURE__ */ React.createElement("button", { onClick: createSession, style: { background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 99, padding: "8px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "\u2795"), " Nouvelle s\xE9ance"), sess && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "0 0 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, edit ? /* @__PURE__ */ React.createElement("input", { value: sess.name, onChange: (e) => renameSess(e.target.value), placeholder: "Nom de la s\xE9ance", style: { width: "100%", boxSizing: "border-box", background: C.bg2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "9px 11px", fontSize: 15, fontWeight: 700, fontFamily: "inherit" } }) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, fontFamily: FONT_DISPLAY } }, sess.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, display: "flex", alignItems: "center", gap: 5, marginTop: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, lineHeight: 1 } }, "\u{1F550}"), " ~", sessionDur(sess), " min \xB7 ", sess.ex.length, " exo", sess.ex.length > 1 ? "s" : "")), edit && sess.custom && /* @__PURE__ */ React.createElement("button", { onClick: deleteSession, title: "Supprimer la s\xE9ance", style: { background: "none", border: `1px solid ${C.line}`, color: C.coral, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u{1F5D1}\uFE0F")), /* @__PURE__ */ React.createElement("button", { onClick: () => setEdit((v) => !v), style: { background: edit ? C.coral : C.cardHi, border: `1px solid ${edit ? C.coral : C.line}`, color: edit ? "#fff" : C.text, borderRadius: 99, padding: "9px 15px", fontSize: 13, fontWeight: 800, cursor: "pointer", flexShrink: 0 } }, edit ? "Terminer" : "\xC9diter")), sess && edit && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 } }, "Groupe"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, GROUP_OPTIONS.map((g) => /* @__PURE__ */ React.createElement("button", { key: g, onClick: () => setGroup(g), style: { flex: 1, padding: "10px", borderRadius: 10, border: `1px solid ${sess.group === g ? C.teal : C.line}`, background: sess.group === g ? C.tealSoft : C.bg2, color: sess.group === g ? C.teal : C.text, fontSize: 13, fontWeight: 700, cursor: "pointer" } }, g)))), sess.ex.map((e) => {
      const st = day.workout[e.id] || {};
      return /* @__PURE__ */ React.createElement("div", { key: e.id, style: { background: C.card, border: `1px solid ${st.done ? C.good : C.line}`, borderRadius: 16, padding: 15, marginBottom: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => toggleEx(e.id),
          style: { width: 26, height: 26, marginTop: 1, borderRadius: 8, border: `2px solid ${st.done ? C.good : C.line}`, background: st.done ? C.good : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }
        },
        st.done && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1, color: C.bg } }, "\u2705")
      ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 700 } }, e.name), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: C.coral, fontWeight: 700, whiteSpace: "nowrap" } }, e.scheme), edit && /* @__PURE__ */ React.createElement("button", { onClick: () => removeExercise(e.id), title: "Retirer", style: { background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 0, display: "flex" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2715")))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginTop: 2, display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement(import_lucide_react.Clock, { size: 11 }), " ~", e.dur != null ? e.dur : exDur(e), " min"), e.band && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.teal, marginTop: 2, display: "flex", alignItems: "center", gap: 4 } }, "\xC9lastique : ", e.band), /* @__PURE__ */ React.createElement("div", { style: { margin: "5px 0 8px" } }, /* @__PURE__ */ React.createElement(TagBadge, { tag: e.tag })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: C.mut, margin: "0 0 10px", lineHeight: 1.5 } }, e.cue), e.do && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setTech((t) => ({ ...t, [e.id]: !t[e.id] })),
          style: { background: "none", border: `1px solid ${C.line}`, color: tech[e.id] ? C.ember : C.mut, borderRadius: 9, padding: "6px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }
        },
        tech[e.id] ? "Masquer la technique" : "Voir la technique",
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1, transform: tech[e.id] ? "rotate(180deg)" : "none", transition: "transform .25s" } }, "\u25BC")
      ), tech[e.id] && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement(ExerciseArt, { art: e.art }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.teal, marginBottom: 6 } }, "\xC0 faire"), e.do.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 7, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1, color: C.teal, flexShrink: 0, marginTop: 2 } }, "\u2705"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, lineHeight: 1.45 } }, x)))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.ember, marginBottom: 6 } }, "\xC0 \xE9viter"), e.avoid.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 7, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1, color: C.ember, flexShrink: 0, marginTop: 2 } }, "\u2715"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, lineHeight: 1.45, color: C.mut } }, x)))))), exlast[e.exKey] && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.teal, fontWeight: 700, marginBottom: 6 } }, "Dernier : ", exlast[e.exKey]), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(
        "input",
        {
          key: e.exKey + "|" + (exlast[e.exKey] || ""),
          defaultValue: st.val || "",
          onBlur: (ev) => setExVal(e.id, e.exKey, ev.target.value),
          placeholder: "charge / reps du jour",
          style: { flex: 1, background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 9, padding: "8px 10px", fontSize: 13, fontFamily: FONT_MONO }
        }
      )))));
    }), edit && /* @__PURE__ */ React.createElement("button", { onClick: () => setPicker(true), style: { width: "100%", background: C.tealSoft, border: `1px solid ${C.teal}`, color: C.teal, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1 } }, "\u2795"), " Ajouter un exercice"), sess && sess.ex.length === 0 && !edit && /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 20, textAlign: "center", color: C.mut, fontSize: 13 } }, "S\xE9ance vide. Touche \xAB \xC9diter \xBB pour ajouter des exercices."), picker && /* @__PURE__ */ React.createElement(ExercisePicker, { exercises: EXERCISES, onAdd: addExercise, onClose: () => setPicker(false) }), /* @__PURE__ */ React.createElement("div", { style: { height: 8 } }));
  }
  function FoodTab({ day, addMacros, setMacros, addMacrosForDate, openRecipeId, recipeNew }) {
    const m = day.macros || { p: 0, c: 0, f: 0 };
    const kcal = Math.round((m.p + m.c) * 4 + m.f * 9);
    const [manual, setManual] = (0, import_react.useState)({ p: "", c: "", f: "" });
    const [macroHist, setMacroHist] = (0, import_react.useState)(null);
    const [weightHist, setWeightHist] = (0, import_react.useState)(null);
    const [reloadKey, setReloadKey] = (0, import_react.useState)(0);
    const [pastOpen, setPastOpen] = (0, import_react.useState)(false);
    const [pastDate, setPastDate] = (0, import_react.useState)(addDays(dateKey(), -1));
    const [pastText, setPastText] = (0, import_react.useState)("");
    const [pastBusy, setPastBusy] = (0, import_react.useState)(false);
    const [pastErr, setPastErr] = (0, import_react.useState)("");
    const [pastResult, setPastResult] = (0, import_react.useState)(null);
    (0, import_react.useEffect)(() => {
      (async () => {
        const today = dateKey();
        const days = Array.from({ length: 7 }, (_, i) => addDays(today, -(6 - i)));
        const rows2 = [];
        for (const dk of days) {
          let mac;
          if (dk === today) mac = day.macros || { p: 0, c: 0, f: 0 };
          else {
            const v = await store.get("log:" + dk);
            mac = v && v.macros || { p: 0, c: 0, f: 0 };
          }
          rows2.push({ date: dk, p: mac.p || 0, c: mac.c || 0, f: mac.f || 0, kcal: Math.round(((mac.p || 0) + (mac.c || 0)) * 4 + (mac.f || 0) * 9) });
        }
        setMacroHist(rows2);
      })();
    }, [day.macros?.p, day.macros?.c, day.macros?.f, reloadKey]);
    (0, import_react.useEffect)(() => {
      (async () => {
        const today = dateKey();
        const days = Array.from({ length: 14 }, (_, i) => addDays(today, -(13 - i)));
        const rows2 = [];
        for (const dk of days) {
          let weight;
          if (dk === today) weight = day.weight ?? null;
          else {
            const v = await store.get("log:" + dk);
            weight = v && v.weight != null ? v.weight : null;
          }
          rows2.push({ date: dk, weight });
        }
        setWeightHist(rows2);
      })();
    }, [day.weight, reloadKey]);
    const [recipes, setRecipes] = (0, import_react.useState)(null);
    const [rq, setRq] = (0, import_react.useState)("");
    const [toast, setToast] = (0, import_react.useState)("");
    const [todayPlan, setTodayPlan] = (0, import_react.useState)(null);
    (0, import_react.useEffect)(() => {
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
      { key: "p", label: "Prot\xE9ines", val: Math.round(m.p), target: TARGETS.protein, unit: "g" },
      { key: "c", label: "Glucides", val: Math.round(m.c), target: TARGETS.carbs, unit: "g" },
      { key: "f", label: "Lipides", val: Math.round(m.f), target: TARGETS.fat, unit: "g" }
    ];
    const card = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 };
    const chip = { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 99, padding: "8px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 };
    const addManual = () => {
      const p = +manual.p || 0, c = +manual.c || 0, f = +manual.f || 0;
      if (!p && !c && !f) return;
      addMacros({ p, c, f });
      setManual({ p: "", c: "", f: "" });
    };
    const kcalOf = (r) => Math.round(((+r.protein || 0) + (+r.carbs || 0)) * 4 + (+r.fat || 0) * 9);
    const eatRecipe = (r) => {
      addMacros({ p: +r.protein || 0, c: +r.carbs || 0, f: +r.fat || 0 });
      setToast(`${r.title} ajout\xE9e \xE0 ta journ\xE9e`);
      setTimeout(() => setToast(""), 1800);
    };
    const recList = recipes ? recipes.filter((r) => !rq || (r.title || "").toLowerCase().includes(rq.toLowerCase())) : [];
    const plannedMeals = todayPlan && recipes ? (todayPlan.meals || []).map((id) => recipes.find((r) => r.id === id)).filter(Boolean) : [];
    const addAllPlanned = () => {
      const t = plannedMeals.reduce((a, r) => ({ p: a.p + (+r.protein || 0), c: a.c + (+r.carbs || 0), f: a.f + (+r.fat || 0) }), { p: 0, c: 0, f: 0 });
      if (!t.p && !t.c && !t.f) return;
      addMacros(t);
      setToast(`${plannedMeals.length} repas pr\xE9vus ajout\xE9s \xE0 ta journ\xE9e`);
      setTimeout(() => setToast(""), 1800);
    };
    const calcPast = async () => {
      if (!pastText.trim()) {
        setPastErr("D\xE9cris d'abord ton repas.");
        return;
      }
      setPastBusy(true);
      setPastErr("");
      let mac;
      try {
        mac = await aiMacros(pastText);
      } catch (e) {
        mac = recipeMacros(pastText);
        setPastErr("IA indisponible : " + (e && e.message || "erreur") + " \u2014 estimation locale.");
      }
      setPastResult({ p: String(mac.protein), c: String(mac.carbs), f: String(mac.fat) });
      setPastBusy(false);
    };
    const addPast = () => {
      const p = +pastResult.p || 0, c = +pastResult.c || 0, f = +pastResult.f || 0;
      addMacrosForDate(pastDate, { p, c, f });
      setReloadKey((k) => k + 1);
      setToast(`Repas ajout\xE9 au ${fmtShort(pastDate)}`);
      setTimeout(() => setToast(""), 2e3);
      setPastOpen(false);
      setPastText("");
      setPastResult(null);
      setPastErr("");
    };
    const fileRef = (0, import_react.useRef)(null);
    const recipesRef = (0, import_react.useRef)(null);
    (0, import_react.useEffect)(() => {
      if ((openRecipeId || recipeNew) && recipesRef.current) {
        const t = setTimeout(() => recipesRef.current && recipesRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
        return () => clearTimeout(t);
      }
    }, [openRecipeId, recipeNew]);
    const [photoState, setPhotoState] = (0, import_react.useState)("idle");
    const [photoPreview, setPhotoPreview] = (0, import_react.useState)(null);
    const [photoResult, setPhotoResult] = (0, import_react.useState)(null);
    const [photoErr, setPhotoErr] = (0, import_react.useState)("");
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
      setToast(`${photoResult.plat} ajout\xE9 \xE0 ta journ\xE9e`);
      setTimeout(() => setToast(""), 1800);
      setPhotoState("idle");
      setPhotoResult(null);
      setPhotoPreview(null);
    };
    const resetPhoto = () => {
      setPhotoState("idle");
      setPhotoResult(null);
      setPhotoPreview(null);
      setPhotoErr("");
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, toast && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", left: 0, right: 0, bottom: 90, display: "flex", justifyContent: "center", zIndex: 50, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: 99, boxShadow: "0 6px 20px rgba(0,0,0,.4)" } }, toast)), /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Nutrition"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Ta journ\xE9e"), /* @__PURE__ */ React.createElement("p", { style: { color: C.mut, margin: "0 0 16px", fontSize: 14, lineHeight: 1.5 } }, "Suis tes calories et tes macros. On vise la cible, sans se priver."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, rows.map((r) => {
      const z = zone(r.val, r.target);
      const pct = Math.min(100, (r.target ? r.val / r.target : 0) * 100);
      const over = r.val > r.target;
      return /* @__PURE__ */ React.createElement("div", { key: r.key, style: card }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700 } }, r.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: z.color } }, r.val, " ", /* @__PURE__ */ React.createElement("span", { style: { color: C.mut, fontWeight: 600, fontSize: 12.5 } }, "/ ", r.target, " ", r.unit))), /* @__PURE__ */ React.createElement("div", { style: { height: 10, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s ease" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, z.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, over ? `+${r.val - r.target} ${r.unit} au-dessus` : `reste ${r.target - r.val} ${r.unit}`)));
    })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, margin: "12px 2px 0" } }, [["\xE0 compl\xE9ter", C.mut], ["en bonne voie", C.teal], ["dans la cible", C.good], ["un peu trop", C.amber], ["d\xE9passement", C.ember]].map(([l, col]) => /* @__PURE__ */ React.createElement("span", { key: l, style: { fontSize: 10.5, color: C.mut, display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: 99, background: col } }), " ", l))), /* @__PURE__ */ React.createElement("div", { style: { ...card, marginTop: 14 } }, /* @__PURE__ */ React.createElement(IndulgenceGauge, { satfat: Math.round((m.f || 0) * 0.4), sugar: null, daily: true, title: "Gras satur\xE9s du jour (estim\xE9 ~40% des lipides)" })), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Repas pr\xE9vus aujourd'hui"), plannedMeals.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { ...card, borderStyle: "dashed", textAlign: "center", color: C.mut, fontSize: 13, lineHeight: 1.5 } }, "Aucun repas pr\xE9vu aujourd'hui. Planifie-les dans l'onglet Programme pour les ajouter en un tap.") : /* @__PURE__ */ React.createElement("div", { style: card }, plannedMeals.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < plannedMeals.length - 1 ? `1px solid ${C.line}` : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, r.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut } }, /* @__PURE__ */ React.createElement("b", { style: { color: C.ember } }, kcalOf(r)), " kcal \xB7 P", r.protein, " G", r.carbs, " L", r.fat)), /* @__PURE__ */ React.createElement("button", { onClick: () => eatRecipe(r), style: { background: C.tealSoft, color: C.teal, border: `1px solid ${C.teal}`, borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1 } }, "\u2795"), " Ajouter"))), plannedMeals.length > 1 && /* @__PURE__ */ React.createElement("button", { onClick: addAllPlanned, style: { marginTop: 12, width: "100%", background: C.ember, color: "#1b1205", border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2795"), " Tout ajouter \xE0 ma journ\xE9e")), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Analyser une photo"), /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: onFile, style: { display: "none" } }), photoState === "idle" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => fileRef.current && fileRef.current.click(),
        style: { width: "100%", background: C.coral, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1 } }, "\u{1F4F7}"),
      " Photo du plat"
    ), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11.5, color: C.mut, textAlign: "center", marginTop: 8, lineHeight: 1.45 } }, "L'IA identifie le plat et estime ses macros. Tu pourras ajuster avant d'ajouter.")), photoState === "loading" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "4px 0" } }, photoPreview && /* @__PURE__ */ React.createElement("img", { src: photoPreview, alt: "", style: { width: 96, height: 96, objectFit: "cover", borderRadius: 12, marginBottom: 10 } }), /* @__PURE__ */ React.createElement("div", { style: { color: C.teal, fontSize: 14, fontWeight: 700 } }, "Analyse du plat en cours...")), photoState === "error" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { color: C.ember, fontSize: 13, marginBottom: 12, lineHeight: 1.45 } }, "Analyse impossible : ", photoErr), /* @__PURE__ */ React.createElement("button", { onClick: resetPhoto, style: { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" } }, "R\xE9essayer")), photoState === "result" && photoResult && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", marginBottom: 12 } }, photoPreview && /* @__PURE__ */ React.createElement("img", { src: photoPreview, alt: "", style: { width: 64, height: 64, objectFit: "cover", borderRadius: 12, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 } }, "D\xE9tect\xE9"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700 } }, photoResult.plat), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut } }, "\u2248 ", kcalVals(photoResult), " kcal \xB7 ajuste si besoin"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "flex-start" } }, [["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: photoResult[k],
        onChange: (e) => setPhotoResult({ ...photoResult, [k]: e.target.value.replace(/[^0-9.]/g, "") }),
        inputMode: "decimal",
        style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 } }, l, " (g)")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: resetPhoto, style: { flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer" } }, "Annuler"), /* @__PURE__ */ React.createElement("button", { onClick: addPhotoMeal, style: { flex: 2, background: C.ember, border: "none", color: "#1b1205", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer" } }, "Ajouter \xE0 ma journ\xE9e")))), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Ajout rapide"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, QUICK_FOODS.map((f) => /* @__PURE__ */ React.createElement("button", { key: f.n, onClick: () => addMacros({ p: f.p, c: f.c, f: f.f }), style: chip }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, lineHeight: 1, color: C.ember } }, "\u2795"), " ", f.n))), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Ajouter \xE0 la main"), /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "flex-start" } }, [["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: manual[k],
        onChange: (e) => setManual({ ...manual, [k]: e.target.value.replace(/[^0-9.]/g, "") }),
        inputMode: "decimal",
        placeholder: "0",
        style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 } }, l, " (g)"))), /* @__PURE__ */ React.createElement("button", { onClick: addManual, style: { background: C.ember, color: "#1b1205", border: "none", borderRadius: 10, padding: "10px 15px", fontSize: 18, fontWeight: 800, cursor: "pointer", lineHeight: 1 } }, "+"))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setMacros({ p: 0, c: 0, f: 0 }),
        style: { marginTop: 14, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1 } }, "\u2796"),
      " Remettre la journ\xE9e \xE0 z\xE9ro"
    ), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Historique 7 jours"), macroHist === null ? /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13 } }, "Chargement...") : (() => {
      const logged = macroHist.filter((d) => d.kcal > 0);
      const n = logged.length;
      const avg = (sel) => n ? logged.reduce((s, d) => s + sel(d), 0) / n : 0;
      const maxK = Math.max(TARGETS.kcal, ...macroHist.map((x) => x.kcal));
      const rows2 = [
        ["Calories", Math.round(avg((d) => d.kcal)), TARGETS.kcal, "kcal"],
        ["Prot\xE9ines", Math.round(avg((d) => d.p)), TARGETS.protein, "g"],
        ["Glucides", Math.round(avg((d) => d.c)), TARGETS.carbs, "g"],
        ["Lipides", Math.round(avg((d) => d.f)), TARGETS.fat, "g"]
      ];
      return /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 11 } }, "Moyenne sur ", n, " jour", n > 1 ? "s" : "", " avec donn\xE9es", n ? " \xB7 vs ta cible" : ""), n === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.mut, textAlign: "center", padding: "8px 0" } }, "Aucune donn\xE9e cette semaine. Tes repas du jour alimenteront cet historique.") : rows2.map(([label, val, target, unit]) => {
        const z = zone(val, target);
        const pct = Math.min(100, target ? val / target * 100 : 0);
        return /* @__PURE__ */ React.createElement("div", { key: label, style: { marginBottom: 9 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, val, " / ", target, " ", unit, " \xB7 ", z.label)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" } })));
      }), n > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, paddingTop: 12, borderTop: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement(IndulgenceGauge, { satfat: Math.round(avg((d) => d.f) * 0.4), sugar: null, daily: true, title: "Gras satur\xE9s \xB7 moyenne estim\xE9e (~40% des lipides)" })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "flex-end", height: 56, marginTop: 14 } }, macroHist.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, height: `${d.kcal > 0 ? Math.max(4, d.kcal / maxK * 100) : 0}%`, minHeight: d.kcal > 0 ? 4 : 0, background: d.kcal > 0 ? zone(d.kcal, TARGETS.kcal).color : C.line, borderRadius: "4px 4px 0 0" } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, marginTop: 5 } }, macroHist.map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { flex: 1, textAlign: "center", fontSize: 8.5, color: d.date === dateKey() ? C.ember : C.mut } }, d.date.slice(8), "/", d.date.slice(5, 7)))));
    })(), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Ajouter un repas pass\xE9"), !pastOpen ? /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setPastOpen(true);
          setPastResult(null);
          setPastErr("");
        },
        style: { width: "100%", background: "none", border: `1px dashed ${C.line}`, color: C.teal, borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2795"),
      " Ajouter un repas pass\xE9"
    ) : /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 6 } }, "Date du repas"), /* @__PURE__ */ React.createElement(
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
        placeholder: "Ex. poulet curry + riz basmati + 1 bi\xE8re",
        style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, lineHeight: 1.5, resize: "vertical" }
      }
    ), !pastResult ? /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: calcPast,
        disabled: pastBusy,
        style: { width: "100%", marginTop: 12, background: pastBusy ? C.tealSoft : C.teal, color: pastBusy ? C.teal : C.bg, border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: pastBusy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2728"),
      " ",
      pastBusy ? "Calcul des macros..." : "Calculer les macros avec l'IA"
    ) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "flex-start", marginTop: 12 } }, [["p", "Prot"], ["c", "Gluc"], ["f", "Lip"]].map(([k, l]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: pastResult[k],
        onChange: (e) => setPastResult({ ...pastResult, [k]: e.target.value.replace(/[^0-9.]/g, "") }),
        inputMode: "decimal",
        style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px", fontSize: 14, textAlign: "center" }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 } }, l, " (g)")))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", fontSize: 12, color: C.mut, marginTop: 10 } }, "\u2248 ", Math.round(((+pastResult.p || 0) + (+pastResult.c || 0)) * 4 + (+pastResult.f || 0) * 9), " kcal"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: addPast,
        style: { width: "100%", marginTop: 12, background: C.ember, color: "#1b1205", border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer" }
      },
      "Ajouter au ",
      fmtShort(pastDate)
    )), pastErr && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, marginTop: 10, lineHeight: 1.45 } }, pastErr), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setPastOpen(false);
          setPastResult(null);
          setPastErr("");
        },
        style: { width: "100%", marginTop: 8, background: "none", border: "none", color: C.mut, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }
      },
      "Annuler"
    )), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Poids \xB7 14 jours"), weightHist === null ? /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13 } }, "Chargement...") : (() => {
      const pts = weightHist.map((d, i) => ({ ...d, i })).filter((d) => d.weight != null);
      const lastW = pts.length ? pts[pts.length - 1].weight : null;
      if (pts.length === 0) {
        return /* @__PURE__ */ React.createElement("div", { style: { ...card, borderStyle: "dashed", textAlign: "center", color: C.mut, fontSize: 13, lineHeight: 1.5 } }, "Renseigne ton poids du jour (depuis l'accueil) pour suivre ton \xE9volution ici.");
      }
      const W = 320, H = 150, padT = 28, padB = 24, padL = 10, padR = 10;
      const ws = pts.map((p) => p.weight);
      let lo = Math.min(...ws), hi = Math.max(...ws);
      const pad = Math.max(0.5, (hi - lo) * 0.2);
      lo -= pad;
      hi += pad;
      const x = (i) => padL + i * (W - padL - padR) / 13;
      const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
      const line = pts.map((p, k) => `${k === 0 ? "M" : "L"} ${x(p.i).toFixed(1)} ${y(p.weight).toFixed(1)}`).join(" ");
      return /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, "\xC9volution sur 2 semaines"), lastW != null && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: C.teal } }, "dernier : ", lastW, " kg")), /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, style: { width: "100%", height: "auto", display: "block" } }, /* @__PURE__ */ React.createElement("path", { d: line, fill: "none", stroke: C.teal, strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }), pts.map((p, k) => /* @__PURE__ */ React.createElement("g", { key: k }, /* @__PURE__ */ React.createElement("circle", { cx: x(p.i), cy: y(p.weight), r: "3.5", fill: C.teal }), /* @__PURE__ */ React.createElement("text", { x: x(p.i), y: y(p.weight) - 9, fill: C.text, fontSize: "10", fontWeight: "700", textAnchor: "middle" }, p.weight), /* @__PURE__ */ React.createElement("text", { x: x(p.i), y: H - 8, fill: p.date === dateKey() ? C.ember : C.mut, fontSize: "8", textAnchor: "middle" }, p.date.slice(8), "/", p.date.slice(5, 7))))));
    })(), /* @__PURE__ */ React.createElement("div", { ref: recipesRef, style: { marginTop: 28, paddingTop: 8, borderTop: `2px solid ${C.line}` } }, /* @__PURE__ */ React.createElement(RecipesTab, { addMacros, openId: openRecipeId, newSignal: recipeNew })), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }));
  }
  function MacroCompare({ protein = 0, carbs = 0, fat = 0, style }) {
    const p = +protein || 0, c = +carbs || 0, f = +fat || 0;
    const id = idealFor(style);
    const kcal = Math.round((p + c) * 4 + f * 9);
    const rows = [["Calories", kcal, id.kcal, "kcal"], ["Prot\xE9ines", Math.round(p), id.protein, "g"], ["Glucides", Math.round(c), id.carbs, "g"], ["Lipides", Math.round(f), id.fat, "g"]];
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 9, lineHeight: 1.4 } }, "Compar\xE9 \xE0 un \xAB ", style || "Repas", " \xBB id\xE9al ", /* @__PURE__ */ React.createElement("span", { style: { color: C.mut } }, "\xB7 ", Math.round(id.share * 100), "% de ta journ\xE9e")), rows.map(([label, val, target, unit]) => {
      const z = zone(val, target);
      const pct = Math.min(100, target ? val / target * 100 : 0);
      return /* @__PURE__ */ React.createElement("div", { key: label, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, val, " / ", target, " ", unit, " \xB7 ", z.label)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" } })));
    }));
  }
  function IndulgenceGauge({ satfat, sugar, style, daily, title }) {
    const share = daily ? 1 : MEAL_SHARE[style] ?? 0.35;
    const rows = [];
    if (satfat != null) rows.push(["Gras satur\xE9s", Math.round(satfat), Math.round(SATFAT_MAX * share)]);
    if (sugar != null) rows.push(["Sucre", Math.round(sugar), Math.round(SUGAR_MAX * share)]);
    if (rows.length === 0) return null;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginBottom: 9, lineHeight: 1.4 } }, title || "\xC0 quel point \xE7a \xAB abuse \xBB"), rows.map(([label, val, ceil]) => {
      const z = badZone(val, ceil);
      const pct = Math.min(100, ceil ? val / ceil * 100 : 0);
      return /* @__PURE__ */ React.createElement("div", { key: label, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: z.color } }, val, " / ", ceil, " g \xB7 ", z.label)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99, transition: "width .4s" } })));
    }));
  }
  function mealTint(style) {
    switch (style) {
      case "Petit d\xE9j":
        return { bg: "#F7ECD6", fg: C.amber };
      case "Collation":
        return { bg: C.peach, fg: C.coral };
      case "Dessert":
        return { bg: "#E4F2E9", fg: C.good };
      default:
        return { bg: C.mint, fg: C.teal };
    }
  }
  function RecipeThumb({ recipe, size = 46, radius = 12 }) {
    if (recipe && recipe.photo) {
      return /* @__PURE__ */ React.createElement("img", { src: recipe.photo, alt: "", style: { width: size, height: size, borderRadius: radius, objectFit: "cover", flexShrink: 0, display: "block" } });
    }
    const t = mealTint(recipe && recipe.style);
    return /* @__PURE__ */ React.createElement("div", { style: { width: size, height: size, borderRadius: radius, flexShrink: 0, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(import_lucide_react.ChefHat, { size: Math.round(size * 0.46), color: t.fg, strokeWidth: 2 }));
  }
  function RecipePicker({ recipes, dayLabel, added, onAdd, onClose }) {
    const styleOpts = ["Petit d\xE9j", "Repas", "Collation", "Dessert"];
    const [f, setF] = (0, import_react.useState)("Tout");
    const [q, setQ] = (0, import_react.useState)("");
    const kcalOf = (r) => Math.round((+r.protein || 0) * 4 + (+r.carbs || 0) * 4 + (+r.fat || 0) * 9);
    const list = recipes.filter((r) => (f === "Tout" || r.style === f) && (!q.trim() || r.title.toLowerCase().includes(q.trim().toLowerCase())));
    const chip = (s) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setF(s), style: { padding: "8px 14px", borderRadius: 99, border: `1px solid ${f === s ? C.coral : C.line}`, background: f === s ? C.coral : C.bg2, color: f === s ? "#fff" : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 } }, s);
    return /* @__PURE__ */ React.createElement("div", { onClick: onClose, style: { position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,12,8,.38)", display: "flex", flexDirection: "column", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { background: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "86vh", display: "flex", flexDirection: "column", boxShadow: "0 -12px 40px rgba(0,0,0,.18)" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 0 2px", display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 4, borderRadius: 99, background: C.line } })), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 18px", display: "flex", alignItems: "flex-start", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.coral, fontWeight: 800 } }, dayLabel), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 19, fontWeight: 800, fontFamily: FONT_DISPLAY } }, "Ajouter une recette")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: C.cardHi, border: `1px solid ${C.line}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.text, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1 } }, "\u2715"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7, padding: "2px 18px 10px", overflowX: "auto" } }, ["Tout", ...styleOpts].map(chip)), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 18px 10px" } }, /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Rechercher un plat...", style: { width: "100%", boxSizing: "border-box", background: C.bg2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 12, padding: "11px 13px", fontSize: 14, fontFamily: "inherit" } })), /* @__PURE__ */ React.createElement("div", { style: { overflowY: "auto", padding: "0 12px 22px" } }, list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: C.mut, fontSize: 13, padding: "24px 0" } }, "Aucune recette pour ce filtre."), list.map((r) => {
      const isAdded = added.includes(r.id);
      return /* @__PURE__ */ React.createElement("button", { key: r.id, onClick: () => !isAdded && onAdd(r.id), disabled: isAdded, style: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", background: "none", border: "none", borderRadius: 14, cursor: isAdded ? "default" : "pointer", textAlign: "left", opacity: isAdded ? 0.5 : 1 } }, /* @__PURE__ */ React.createElement(RecipeThumb, { recipe: r, size: 48 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, r.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, marginTop: 2 } }, /* @__PURE__ */ React.createElement("b", { style: { color: C.coral, fontFamily: FONT_MONO } }, kcalOf(r)), " kcal \xB7 P", r.protein, " G", r.carbs, " L", r.fat)), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 30, height: 30, borderRadius: 99, background: isAdded ? C.mint : C.coral, color: isAdded ? C.teal : "#fff", display: "flex", alignItems: "center", justifyContent: "center" } }, isAdded ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2705") : /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2795")));
    }))));
  }
  function RecipesTab({ addMacros, openId, newSignal }) {
    const styleOpts = ["Petit d\xE9j", "Repas", "Collation", "Dessert"];
    const [recipes, setRecipes] = (0, import_react.useState)(null);
    const [f, setF] = (0, import_react.useState)("Tout");
    const [open, setOpen] = (0, import_react.useState)(null);
    const [editing, setEditing] = (0, import_react.useState)(null);
    const photoRef = (0, import_react.useRef)(null);
    const [toast, setToast] = (0, import_react.useState)("");
    const [aiLoading, setAiLoading] = (0, import_react.useState)(false);
    (0, import_react.useEffect)(() => {
      if (openId) {
        setOpen(openId);
        setEditing(null);
        setF("Tout");
      }
    }, [openId]);
    (0, import_react.useEffect)(() => {
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
    const flash = (m, ms = 2400) => {
      setToast(m);
      setTimeout(() => setToast(""), ms);
    };
    const startNew = () => {
      setOpen(null);
      setEditing({ id: "u" + Date.now(), style: "Repas", title: "", link: "", manual: false, protein: "", carbs: "", fat: "", ingText: "", stepsText: "", photo: null });
    };
    (0, import_react.useEffect)(() => {
      if (newSignal) startNew();
    }, [newSignal]);
    const startEdit = (r) => setEditing({ ...r, manual: false, link: r.link || "", protein: String(r.protein ?? ""), carbs: String(r.carbs ?? ""), fat: String(r.fat ?? ""), ingText: (r.ing || []).join("\n"), stepsText: (r.steps || []).join("\n") });
    const saveEdit = async () => {
      const d = editing;
      let mac;
      if (d.manual) mac = { protein: +d.protein || 0, carbs: +d.carbs || 0, fat: +d.fat || 0 };
      else if (d.aiVals) mac = d.aiVals;
      else {
        setAiLoading(true);
        try {
          mac = await aiMacros(d.ingText);
        } catch (e) {
          mac = recipeMacros(d.ingText);
          flash("IA indisponible : " + (e && e.message || "erreur") + " \u2014 calcul local utilis\xE9", 6e3);
        }
        setAiLoading(false);
      }
      const clean = {
        id: d.id,
        style: d.style,
        title: (d.title || "").trim() || "Nouvelle recette",
        link: (d.link || "").trim(),
        photo: d.photo || null,
        protein: mac.protein,
        carbs: mac.carbs,
        fat: mac.fat,
        satfat: mac.satfat != null ? mac.satfat : Math.round((mac.fat || 0) * 0.4),
        sugar: mac.sugar != null ? mac.sugar : null,
        ing: d.ingText.split("\n").map((s) => s.trim()).filter(Boolean),
        steps: d.stepsText.split("\n").map((s) => s.trim()).filter(Boolean)
      };
      const exists = recipes.some((r) => r.id === clean.id);
      persist(exists ? recipes.map((r) => r.id === clean.id ? clean : r) : [clean, ...recipes]);
      setEditing(null);
      setOpen(clean.id);
      flash(exists ? "Recette mise \xE0 jour" : "Recette ajout\xE9e");
    };
    const runAI = async () => {
      if (!editing.ingText.trim()) {
        flash("Ajoute d'abord des ingr\xE9dients");
        return;
      }
      setAiLoading(true);
      try {
        const v = await aiMacros(editing.ingText);
        setEditing((e) => ({ ...e, aiVals: v, manual: false }));
      } catch (err) {
        setEditing((e) => ({ ...e, aiVals: recipeMacros(e.ingText) }));
        flash("IA indisponible : " + (err && err.message || "erreur inconnue"), 7e3);
      }
      setAiLoading(false);
    };
    const del = (id) => {
      persist(recipes.filter((r) => r.id !== id));
      setOpen(null);
      flash("Recette supprim\xE9e");
    };
    const eat = (r) => {
      addMacros({ p: +r.protein || 0, c: +r.carbs || 0, f: +r.fat || 0 });
      flash("Ajout\xE9 \xE0 ta journ\xE9e : " + +r.protein || "0 P \xB7 " + +r.carbs || "0 G \xB7 " + +r.fat || "0 L");
    };
    if (!recipes) return /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13, paddingTop: 8 } }, "Chargement des recettes...");
    const fld = { width: "100%", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "10px 12px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" };
    const lbl = { fontSize: 11.5, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" };
    const pill = (l, v, c) => /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 4px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: c } }, v), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.mut, marginTop: 1 } }, l));
    const toastEl = toast ? /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", left: 0, right: 0, bottom: 90, display: "flex", justifyContent: "center", zIndex: 50, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: 99, boxShadow: "0 6px 20px rgba(0,0,0,.4)" } }, toast)) : null;
    if (editing) {
      const isEdit = recipes.some((r) => r.id === editing.id);
      const auto = recipeMacros(editing.ingText);
      const shown = editing.manual ? { protein: +editing.protein || 0, carbs: +editing.carbs || 0, fat: +editing.fat || 0 } : editing.aiVals || auto;
      const kc = kcal(shown);
      const src = editing.manual ? "manuel" : editing.aiVals ? "ia" : "local";
      return /* @__PURE__ */ React.createElement(React.Fragment, null, toastEl, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, isEdit ? "Modifier" : "Nouvelle recette"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, editing.title || "Ta recette"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Titre"), /* @__PURE__ */ React.createElement("input", { value: editing.title, onChange: (e) => setEditing({ ...editing, title: e.target.value }), placeholder: "Ex. Wok de poulet", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Style"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, styleOpts.map((s) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setEditing({ ...editing, style: s }), style: { padding: "7px 13px", borderRadius: 99, border: `1px solid ${editing.style === s ? C.ember : C.line}`, background: editing.style === s ? C.emberSoft : C.card, color: editing.style === s ? C.ember : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, s)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Lien ", /* @__PURE__ */ React.createElement("span", { style: { textTransform: "none", fontWeight: 400 } }, "\xB7 optionnel")), /* @__PURE__ */ React.createElement("input", { value: editing.link || "", onChange: (e) => setEditing({ ...editing, link: e.target.value }), placeholder: "https://\u2026", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Ingr\xE9dients ", /* @__PURE__ */ React.createElement("span", { style: { textTransform: "none", fontWeight: 400 } }, "\xB7 un par ligne, pour une personne")), /* @__PURE__ */ React.createElement("textarea", { value: editing.ingText, onChange: (e) => setEditing({ ...editing, ingText: e.target.value, aiVals: null }), rows: 6, placeholder: "350 g de steak hach\xE9\n1 pain \xE0 burger\n1 tranche de cheddar", style: { ...fld, resize: "vertical", lineHeight: 1.6 } })), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { ...lbl, margin: 0 } }, "Macros (par personne)")), editing.manual ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["protein", "Prot\xE9ines"], ["carbs", "Glucides"], ["fat", "Lipides"]].map(([k, l]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement("input", { value: editing[k], onChange: (e) => setEditing({ ...editing, [k]: e.target.value.replace(/[^0-9.]/g, "") }), inputMode: "decimal", placeholder: "0", style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "8px", fontSize: 14, textAlign: "center" } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, textAlign: "center", marginTop: 4 } }, l, " (g)")))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, pill("prot\xE9ines", shown.protein + " g", C.ember), pill("glucides", shown.carbs + " g", C.teal), pill("lipides", shown.fat + " g", C.amber)), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, textAlign: "center", fontSize: 13, color: C.mut } }, "\u2248 ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20, fontWeight: 800, color: C.ember } }, kc), " kcal / personne"), /* @__PURE__ */ React.createElement("button", { onClick: runAI, disabled: aiLoading, style: { width: "100%", marginTop: 12, background: aiLoading ? C.tealSoft : C.teal, color: aiLoading ? C.teal : C.bg, border: "none", borderRadius: 11, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2728"), " ", aiLoading ? "Calcul en cours\u2026" : "Calculer avec l'IA"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditing({ ...editing, manual: !editing.manual, protein: String(shown.protein), carbs: String(shown.carbs), fat: String(shown.fat) }), style: { width: "100%", marginTop: 8, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 10, padding: "9px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "Corriger \xE0 la main")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Pr\xE9paration ", /* @__PURE__ */ React.createElement("span", { style: { textTransform: "none", fontWeight: 400 } }, "\xB7 une \xE9tape par ligne")), /* @__PURE__ */ React.createElement("textarea", { value: editing.stepsText, onChange: (e) => setEditing({ ...editing, stepsText: e.target.value }), rows: 5, placeholder: "Saisir le poulet 8 min\nAjouter la sauce\n...", style: { ...fld, resize: "vertical", lineHeight: 1.5 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEditing(null), style: { flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" } }, "Annuler"), /* @__PURE__ */ React.createElement("button", { onClick: saveEdit, disabled: aiLoading, style: { flex: 2, background: C.ember, border: "none", color: "#1b1205", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer", opacity: aiLoading ? 0.7 : 1 } }, "Enregistrer"))), /* @__PURE__ */ React.createElement("div", { style: { height: 16 } }));
    }
    const styles = ["Tout", ...styleOpts];
    const list = recipes.filter((r) => f === "Tout" || r.style === f);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, toastEl, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Recettes"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Riches en prot\xE9ines, jamais fades"), /* @__PURE__ */ React.createElement("p", { style: { color: C.mut, margin: "0 0 14px", fontSize: 13 } }, "Modifie, ajoute, supprime \u2014 les calories se recalculent toutes seules."), /* @__PURE__ */ React.createElement("button", { onClick: startNew, style: { width: "100%", background: C.emberSoft, border: `1px solid ${C.ember}`, color: C.ember, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, lineHeight: 1 } }, "\u2795"), " Nouvelle recette"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 } }, styles.map((s) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s,
        onClick: () => setF(s),
        style: { padding: "7px 13px", borderRadius: 99, border: `1px solid ${f === s ? C.ember : C.line}`, background: f === s ? C.emberSoft : C.card, color: f === s ? C.ember : C.text, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }
      },
      s
    ))), list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 22, textAlign: "center", color: C.mut, fontSize: 13 } }, "Aucune recette ici. Ajoutes-en une avec le bouton ci-dessus."), list.map((r) => {
      const on = open === r.id;
      return /* @__PURE__ */ React.createElement("div", { key: r.id, style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, marginBottom: 11, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(on ? null : r.id), style: { width: "100%", background: "none", border: "none", padding: 16, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement(RecipeThumb, { recipe: r, size: 50, radius: 13 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: C.teal, background: C.tealSoft, padding: "2px 7px", borderRadius: 99 } }, r.style), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.mut, fontWeight: 600 } }, /* @__PURE__ */ React.createElement("b", { style: { color: C.ember } }, kcal(r)), " kcal \xB7 P ", r.protein, " \xB7 G ", r.carbs, " \xB7 L ", r.fat)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15.5, fontWeight: 700 } }, r.title)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1, color: C.mut, transform: on ? "rotate(180deg)" : "none", transition: "transform .25s", flexShrink: 0 } }, "\u25BC")), on && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 16px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, pill("prot\xE9ines", r.protein + " g", C.ember), pill("glucides", r.carbs + " g", C.teal), pill("lipides", r.fat + " g", C.amber), pill("kcal", kcal(r), C.text)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, marginBottom: 12 } }, "Quantit\xE9s et macros pour une personne"), /* @__PURE__ */ React.createElement("div", { style: { background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: 13, marginBottom: 14 } }, /* @__PURE__ */ React.createElement(MacroCompare, { protein: r.protein, carbs: r.carbs, fat: r.fat, style: r.style }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement(IndulgenceGauge, { satfat: r.satfat != null ? r.satfat : Math.round((r.fat || 0) * 0.4), sugar: r.sugar ?? null, style: r.style }))), r.link && /* @__PURE__ */ React.createElement(
        "a",
        {
          href: safeUrl(r.link),
          target: "_blank",
          rel: "noopener noreferrer",
          style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, textDecoration: "none", marginBottom: 14, background: C.emberSoft, border: `1px solid ${C.ember}`, color: C.ember, borderRadius: 11, padding: "11px", fontSize: 13.5, fontWeight: 800 }
        },
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u{1F517}"),
        " Ouvrir la recette"
      ), r.ing?.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Ingr\xE9dients"), /* @__PURE__ */ React.createElement("ul", { style: { margin: "0 0 6px", paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 } }, r.ing.map((x, i) => /* @__PURE__ */ React.createElement("li", { key: i }, x)))), r.steps?.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { ...lbl, marginTop: 12 } }, "Pr\xE9paration"), /* @__PURE__ */ React.createElement("ol", { style: { margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 } }, r.steps.map((x, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: { marginBottom: 4 } }, x)))), /* @__PURE__ */ React.createElement("button", { onClick: () => eat(r), style: { width: "100%", marginTop: 16, background: C.tealSoft, border: `1px solid ${C.teal}`, color: C.teal, borderRadius: 11, padding: "11px", fontSize: 13.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "\u2795"), " J'ai mang\xE9 \xE7a \u2014 ajouter au compteur"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => startEdit(r), style: { flex: 1, background: C.card, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1 } }, "\u270F\uFE0F"), " Modifier"), /* @__PURE__ */ React.createElement("button", { onClick: () => del(r.id), style: { flex: 1, background: "none", border: `1px solid ${C.line}`, color: C.mut, borderRadius: 11, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1 } }, "\u{1F5D1}\uFE0F"), " Supprimer"))));
    }), /* @__PURE__ */ React.createElement("div", { style: { height: 8 } }));
  }
  var h1 = { fontSize: 21, fontWeight: 800, fontFamily: FONT_DISPLAY, margin: "3px 0 6px", letterSpacing: -0.4 };
  var sectionH = { fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: C.mut, margin: "26px 0 11px" };
  var cardBtn = { flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 14, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: C.text };
  var navBtn = { background: C.cardHi, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 };
  function ProgramTab() {
    const [recipes, setRecipes] = (0, import_react.useState)(null);
    const [progSessions, setProgSessions] = (0, import_react.useState)([]);
    const [offset, setOffset] = (0, import_react.useState)(0);
    const [plans, setPlans] = (0, import_react.useState)({});
    const [pickFor, setPickFor] = (0, import_react.useState)(null);
    (0, import_react.useEffect)(() => {
      (async () => {
        let r = await store.get("recipes");
        if (!Array.isArray(r) || !r.length) r = RECIPES;
        setRecipes(r);
        let ss = await store.get("sessions");
        if (!Array.isArray(ss) || !ss.length) ss = SESSIONS.map(normalizeSession);
        setProgSessions(ss);
      })();
    }, []);
    const days = weekDaysFrom(offset);
    (0, import_react.useEffect)(() => {
      (async () => {
        var map = {};
        for (const dk of days) {
          var p = await store.get("plan:" + dk);
          map[dk] = p || { meals: [], session: null };
        }
        setPlans(map);
      })();
    }, [offset]);
    var savePlan = (dk, next) => {
      setPlans((p) => ({ ...p, [dk]: next }));
      store.set("plan:" + dk, next);
    };
    var setSession = (dk, sid) => savePlan(dk, { meals: plans[dk]?.meals || [], session: sid || null });
    var addMeal = (dk, rid) => {
      var cur = plans[dk] || { meals: [] };
      if ((cur.meals || []).includes(rid)) return;
      savePlan(dk, { ...cur, meals: [...cur.meals || [], rid] });
    };
    var removeMeal = (dk, rid) => {
      var cur = plans[dk] || { meals: [] };
      var jul = { ...cur.juliette || {} };
      delete jul[rid];
      savePlan(dk, { ...cur, meals: (cur.meals || []).filter((x) => x !== rid), juliette: jul });
    };
    var recById = (id) => (recipes || []).find((r) => r.id === id);
    var dayTotals = (meals) => {
      var p = 0, c = 0, f = 0;
      (meals || []).forEach((rid) => {
        var r = recById(rid);
        if (r) {
          p += +r.protein || 0;
          c += +r.carbs || 0;
          f += +r.fat || 0;
        }
      });
      return { p, c, f, kcal: Math.round((p + c) * 4 + f * 9) };
    };
    var miniGauge = (label, val, target) => {
      var z = zone(val, target);
      var pct = Math.min(100, target ? val / target * 100 : 0);
      return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.mut } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: z.color } }, val, " / ", target)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 99, background: C.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99 } })));
    };
    var rangeLabel = `${(/* @__PURE__ */ new Date(days[0] + "T00:00")).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} \u2013 ${(/* @__PURE__ */ new Date(days[6] + "T00:00")).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`;
    var sel = { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 9, padding: "8px 10px", fontSize: 13 };
    if (!recipes) return /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13, paddingTop: 8 } }, "Chargement\u2026");
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Programme"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Ta semaine"), /* @__PURE__ */ React.createElement("p", { style: { color: C.mut, margin: "0 0 14px", fontSize: 13.5 } }, "Planifie s\xE9ances et repas. Navigue sur autant de semaines que tu veux."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: "8px 10px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOffset(offset - 1), style: navBtn }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1 } }, "\u25C0")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800 } }, offset === 0 ? "Cette semaine" : offset === 1 ? "Semaine prochaine" : offset === -1 ? "Semaine derni\xE8re" : rangeLabel), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut } }, rangeLabel)), /* @__PURE__ */ React.createElement("button", { onClick: () => setOffset(offset + 1), style: navBtn }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1 } }, "\u25B6"))), days.map((dk) => {
      var pl = plans[dk] || { meals: [], session: null };
      var isToday = dk === dateKey();
      return /* @__PURE__ */ React.createElement("div", { key: dk, style: { background: C.card, border: `1px solid ${isToday ? C.ember : C.line}`, borderRadius: 16, padding: 14, marginBottom: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, textTransform: "capitalize", flex: 1 } }, (/* @__PURE__ */ new Date(dk + "T00:00")).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }), isToday ? " \xB7 aujourd'hui" : "")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1, color: C.ember } }, "\u{1F3CB}\uFE0F"), /* @__PURE__ */ React.createElement("select", { value: pl.session || "", onChange: (e) => setSession(dk, e.target.value), style: sel }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Repos / aucune s\xE9ance"), [...new Set(progSessions.map((s) => s.group))].map((g) => /* @__PURE__ */ React.createElement("optgroup", { key: g, label: g }, progSessions.filter((s) => s.group === g).map((s) => /* @__PURE__ */ React.createElement("option", { key: s.id, value: s.id }, s.name)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1, color: C.teal } }, "\u{1F468}\u200D\u{1F373}"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700, color: C.mut } }, "Repas")), (pl.meals || []).length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, marginBottom: 8 } }, "Aucun repas pr\xE9vu."), (pl.meals || []).map((rid) => {
        var r = recById(rid);
        return /* @__PURE__ */ React.createElement("div", { key: rid, style: { display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, marginBottom: 6 } }, /* @__PURE__ */ React.createElement(RecipeThumb, { recipe: r, size: 34, radius: 9 }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, flex: 1 } }, r ? r.title : "Recette supprim\xE9e"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeMeal(dk, rid), style: { background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "\u2715")));
      }), /* @__PURE__ */ React.createElement("button", { onClick: () => setPickFor(dk), style: { marginTop: 4, background: "none", border: `1px dashed ${C.line}`, color: C.coral, borderRadius: 10, padding: "9px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1 } }, "\u2795"), " Ajouter une recette"), (pl.meals || []).length > 0 && (() => {
        var t = dayTotals(pl.meals);
        return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, marginBottom: 9 } }, "Apport des repas / objectif"), miniGauge("Calories", t.kcal, TARGETS.kcal), miniGauge("Prot\xE9ines", Math.round(t.p), TARGETS.protein), miniGauge("Glucides", Math.round(t.c), TARGETS.carbs), miniGauge("Lipides", Math.round(t.f), TARGETS.fat));
      })());
    }), pickFor && /* @__PURE__ */ React.createElement(RecipePicker, { recipes, dayLabel: (/* @__PURE__ */ new Date(pickFor + "T00:00")).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }), added: plans[pickFor]?.meals || [], onAdd: (rid) => addMeal(pickFor, rid), onClose: () => setPickFor(null) }), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }));
  }
  function CoursesTab() {
    const [recipes, setRecipes] = (0, import_react.useState)(null);
    const [items, setItems] = (0, import_react.useState)(null);
    const [newItem, setNewItem] = (0, import_react.useState)("");
    const [busy, setBusy] = (0, import_react.useState)(false);
    const [err, setErr] = (0, import_react.useState)("");
    const [editId, setEditId] = (0, import_react.useState)(null);
    const [editText, setEditText] = (0, import_react.useState)("");
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
        if (pl.shop === false) continue;
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
          setErr("IA indisponible, quantit\xE9s additionn\xE9es localement.");
        }
      }
      const generated = consolidated.map((c) => {
        const name = norm(c.item);
        const text = c.qty ? c.qty + " " + c.item : c.item;
        return { id: uid(), name, text, checked: !!prevChecked[name], manual: false };
      });
      persist([...generated, ...manual]);
      setBusy(false);
    };
    (0, import_react.useEffect)(() => {
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
    const toggle = (id) => persist((items || []).map((it) => it.id === id ? { ...it, checked: !it.checked } : it));
    const del = (id) => persist((items || []).filter((it) => it.id !== id));
    const startEdit = (it) => {
      setEditId(it.id);
      setEditText(it.text);
    };
    const saveEdit = () => {
      const t = editText.trim();
      if (t) persist((items || []).map((it) => it.id === editId ? { ...it, text: t, name: norm(t) } : it));
      setEditId(null);
      setEditText("");
    };
    const addManual = () => {
      const t = newItem.trim();
      if (!t) return;
      persist([...items || [], { id: uid(), name: norm(t), text: t, checked: false, manual: true }]);
      setNewItem("");
    };
    const clearChecked = () => persist((items || []).filter((it) => !it.checked));
    if (!items) return /* @__PURE__ */ React.createElement("div", { style: { color: C.mut, fontSize: 13, paddingTop: 8 } }, "Chargement\u2026");
    const sorted = [...items].sort((a, b) => a.checked === b.checked ? 0 : a.checked ? 1 : -1);
    const remaining = items.filter((it) => !it.checked).length;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.ember }, "Courses"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "Ta liste"), /* @__PURE__ */ React.createElement("p", { style: { color: C.mut, margin: "0 0 14px", fontSize: 13.5 } }, "G\xE9n\xE9r\xE9e depuis toutes les recettes planifi\xE9es \xE0 venir, avec les quantit\xE9s additionn\xE9es."), /* @__PURE__ */ React.createElement("button", { onClick: () => generate(), disabled: busy, style: { width: "100%", background: busy ? C.tealSoft : C.teal, color: busy ? C.teal : C.bg, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: busy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u2728"), " ", busy ? "Calcul de la liste\u2026" : "Actualiser depuis le programme"), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, marginBottom: 12, lineHeight: 1.45 } }, err), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("input", { value: newItem, onChange: (e) => setNewItem(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter") addManual();
    }, placeholder: "Ajouter un article\u2026", style: { flex: 1, boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "11px 12px", fontSize: 14 } }), /* @__PURE__ */ React.createElement("button", { onClick: addManual, style: { background: C.ember, color: "#1b1205", border: "none", borderRadius: 10, padding: "0 16px", fontSize: 18, fontWeight: 800, cursor: "pointer" } }, "+")), items.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 22, textAlign: "center", color: C.mut, fontSize: 13 } }, "Aucune recette planifi\xE9e. Ajoute des repas dans l'onglet Programme, puis actualise.") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 2px 8px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: C.mut } }, remaining, " article", remaining > 1 ? "s" : ""), /* @__PURE__ */ React.createElement("button", { onClick: clearChecked, style: { background: "none", border: "none", color: C.mut, fontSize: 12, fontWeight: 700, cursor: "pointer" } }, "Retirer les coch\xE9s")), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "2px 14px" } }, sorted.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: it.id, style: { display: "flex", alignItems: "center", gap: 11, padding: "11px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : "none" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(it.id), style: { width: 22, height: 22, borderRadius: 6, border: `2px solid ${it.checked ? C.good : C.line}`, background: it.checked ? C.good : "transparent", cursor: "pointer", flexShrink: 0 } }, it.checked && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, lineHeight: 1, color: C.bg } }, "\u2705")), editId === it.id ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("input", { autoFocus: true, value: editText, onChange: (e) => setEditText(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter") saveEdit();
      if (e.key === "Escape") {
        setEditId(null);
        setEditText("");
      }
    }, style: { flex: 1, boxSizing: "border-box", background: C.bg, border: `1px solid ${C.teal}`, color: C.text, borderRadius: 8, padding: "7px 9px", fontSize: 14 } }), /* @__PURE__ */ React.createElement("button", { onClick: saveEdit, style: { background: C.coral, color: "#fff", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "\u2705"))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 14, color: it.checked ? C.mut : C.text, textDecoration: it.checked ? "line-through" : "none" } }, it.text), /* @__PURE__ */ React.createElement("button", { onClick: () => startEdit(it), style: { background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "\u270F\uFE0F")), /* @__PURE__ */ React.createElement("button", { onClick: () => del(it.id), style: { background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "\u{1F5D1}\uFE0F"))))))), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }));
  }
  function SleepTab({ day, saveDay, hist, onSleepSaved, onDeleteSleep, saveSleepForDate }) {
    const s = day.sleep || {};
    const [mode, setMode] = (0, import_react.useState)("live");
    const [active, setActive] = (0, import_react.useState)(null);
    const [now, setNow] = (0, import_react.useState)(Date.now());
    const [bed, setBed] = (0, import_react.useState)(s.bed || "23:00");
    const [wake, setWake] = (0, import_react.useState)(s.wake || "07:00");
    const [q, setQ] = (0, import_react.useState)(s.quality || 0);
    const [justEnded, setJustEnded] = (0, import_react.useState)(false);
    const [manualDate, setManualDate] = (0, import_react.useState)(dateKey());
    (0, import_react.useEffect)(() => {
      (async () => {
        const act = await store.get("sleepActive");
        if (act && act.startedAt && day.sleep && day.sleep.endedAt && day.sleep.endedAt >= act.startedAt) {
          store.del("sleepActive");
          setActive(null);
        } else {
          setActive(act);
        }
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
      setNow(Date.now());
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
      const d = manualDate || today;
      saveSleepForDate(d, { bed, wake, quality: q, hours, endedAt: (/* @__PURE__ */ new Date()).toISOString() });
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
    const avgOf = (arr) => arr.length ? Math.round(arr.reduce((s2, d) => s2 + d.sleepH, 0) / arr.length * 10) / 10 : null;
    const avg7 = avgOf(lastN(7));
    const avg30 = avgOf(lastN(30));
    const maxH = Math.max(9, ...data.map((d) => d.sleepH));
    const cardBox = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: 18 };
    const btnTeal = { width: "100%", background: C.coral, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 };
    const qRow = (onPick) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, margin: "0 0 8px" } }, "Qualit\xE9 ressentie"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: n,
        onClick: () => onPick(n),
        style: { flex: 1, padding: "10px 0", borderRadius: 11, border: `1px solid ${q >= n ? C.teal : C.line}`, background: q >= n ? C.tealSoft : C.bg, color: q >= n ? C.teal : C.mut, fontSize: 16, fontWeight: 700, cursor: "pointer" }
      },
      n
    ))));
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Eyebrow, { color: C.teal }, "Sommeil"), /* @__PURE__ */ React.createElement("h1", { style: h1 }, "R\xE9cup\xE9rer, c'est progresser"), /* @__PURE__ */ React.createElement("p", { style: { color: C.mut, margin: "0 0 16px", fontSize: 14, lineHeight: 1.5 } }, "Vise 7 h 30\u20138 h, et surtout des horaires r\xE9guliers."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 12, padding: 4, marginBottom: 14 } }, [["live", "D\xE9marrer / terminer"], ["manual", "Saisir \xE0 la main"]].map(([m, l]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: m,
        onClick: () => setMode(m),
        style: { flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 700, background: mode === m ? C.teal : "transparent", color: mode === m ? C.bg : C.mut }
      },
      l
    ))), mode === "live" ? active ? /* @__PURE__ */ React.createElement("div", { style: cardBox }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 11, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20, lineHeight: 1, color: C.teal } }, "\u{1F319}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700 } }, "Nuit en cours"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut } }, "d\xE9marr\xE9e \xE0 ", hhmm(new Date(active.startedAt))))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", margin: "12px 0 16px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 36, fontWeight: 800, color: C.teal } }, eh, " h ", String(em).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut } }, "de repos \xE9coul\xE9es")), /* @__PURE__ */ React.createElement("button", { onClick: endNight, style: btnTeal }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1 } }, "\u{1F305}"), " Je me r\xE9veille")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: startNight, style: { ...btnTeal, padding: "18px", fontSize: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 19, lineHeight: 1 } }, "\u{1F319}"), " D\xE9marrer la nuit"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: C.mut, textAlign: "center", margin: "11px 0 0", lineHeight: 1.5 } }, "Appuie quand tu te couches. Au r\xE9veil, tu termines et l'heure est prise toute seule."), justEnded && day.sleep && /* @__PURE__ */ React.createElement("div", { style: { ...cardBox, marginTop: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1, color: C.good } }, "\u2705"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700 } }, "Nuit enregistr\xE9e")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: C.mut, margin: "0 0 14px" } }, day.sleep.bed, " \u2192 ", day.sleep.wake, " \xB7 ", hToHM(day.sleep.hours), " de sommeil"), qRow(pickResave))) : /* @__PURE__ */ React.createElement("div", { style: cardBox }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, marginBottom: 6 } }, "Date de la nuit ", /* @__PURE__ */ React.createElement("span", { style: { color: C.mut } }, "(au r\xE9veil)")), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: manualDate,
        max: dateKey(),
        onChange: (e) => {
          setManualDate(e.target.value);
          setJustEnded(false);
        },
        style: { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "11px", fontSize: 15, textAlign: "center" }
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12 } }, [["Coucher", bed, setBed], ["Lever", wake, setWake]].map(([l, val, set]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.mut, marginBottom: 6 } }, l), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "time",
        value: val,
        onChange: (e) => set(e.target.value),
        style: { width: "100%", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "11px", fontSize: 16, textAlign: "center" }
      }
    )))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", margin: "16px 0 14px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 30, fontWeight: 800, color: C.teal } }, hToHM(calcHours(bed, wake))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: C.mut } }, " de sommeil")), qRow(setQ), /* @__PURE__ */ React.createElement("button", { onClick: saveManual, style: { ...btnTeal, marginTop: 14 } }, "Enregistrer la nuit"), justEnded && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 12, color: C.good, fontSize: 13, fontWeight: 700 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "\u2705"), " Nuit du ", fmtShort(manualDate), " enregistr\xE9e")), /* @__PURE__ */ React.createElement("h3", { style: sectionH }, "Historique du sommeil"), data.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 24, textAlign: "center", color: C.mut, fontSize: 13 } }, "Enregistre ta premi\xE8re nuit, tes statistiques appara\xEEtront ici.") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 12 } }, [["7 jours", avg7, lastN(7).length], ["30 jours", avg30, lastN(30).length]].map(([label, val, n]) => /* @__PURE__ */ React.createElement("div", { key: label, style: { flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: C.mut, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 } }, "Moyenne ", label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 27, fontWeight: 800, color: C.teal, marginTop: 4, lineHeight: 1 } }, val != null ? hToHM(val) : "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.mut, marginTop: 3 } }, n, " nuit", n > 1 ? "s" : "", " enregistr\xE9e", n > 1 ? "s" : "")))), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700, color: C.text } }, "14 derni\xE8res nuits"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.teal, display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 14, borderTop: `1px dashed ${C.teal}`, display: "inline-block" } }), " cible 7 h 30")), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 124, borderBottom: `1px solid ${C.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, right: 0, bottom: `${7.5 / maxH * 90}%`, borderTop: `1px dashed ${C.teal}`, opacity: 0.45 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 4 } }, lastN(14).map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" } }, d.sleepH != null && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8.5, fontWeight: 800, color: d.sleepH >= 7.5 ? C.teal : C.mut, marginBottom: 2, lineHeight: 1, whiteSpace: "nowrap" } }, hToHMc(d.sleepH)), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: `${d.sleepH != null ? Math.max(3, d.sleepH / maxH * 90) : 0}%`, background: d.sleepH >= 7.5 ? C.teal : C.line, borderRadius: "5px 5px 0 0", transition: "height .4s" } }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, marginTop: 5 } }, lastN(14).map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { flex: 1, textAlign: "center", fontSize: 9, color: C.mut } }, d.date.slice(8), "/", d.date.slice(5, 7))))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: C.mut, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "18px 4px 8px" } }, "D\xE9tail \xB7 ", data.length, " nuit", data.length > 1 ? "s" : ""), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "2px 14px", maxHeight: 320, overflowY: "auto" } }, data.slice().reverse().map((d, i, arr) => /* @__PURE__ */ React.createElement("div", { key: d.date, style: { display: "flex", alignItems: "center", gap: 8, padding: "11px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, borderRadius: 99, background: d.sleepH >= 7.5 ? C.teal : d.sleepH >= 6 ? C.amber : C.ember, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, textTransform: "capitalize" } }, (/* @__PURE__ */ new Date(d.date + "T00:00")).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" }), d.date === today ? " \xB7 auj." : ""), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, fontWeight: 800, color: C.teal } }, hToHM(d.sleepH)), d.quality ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: C.mut } }, "\xB7 ", d.quality, "/5") : null, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onDeleteSleep(d.date),
        "aria-label": "Supprimer la nuit",
        style: { marginLeft: "auto", background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 6, display: "flex" }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, lineHeight: 1 } }, "\u{1F5D1}\uFE0F")
    ))))), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }));
  }
  return __toCommonJS(app_full_exports);
})();
