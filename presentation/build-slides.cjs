const path = require("node:path");
const fs = require("node:fs");
const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Thibaud";
pptx.company = "Thibaud";
pptx.subject = "Proposition de nouvelle vitrine digitale pour le Domaine Christophe Patrice";
pptx.title = "Une présence digitale à la hauteur du Domaine Christophe Patrice";
pptx.lang = "fr-FR";
pptx.theme = {
  headFontFace: "Georgia",
  bodyFontFace: "Arial",
  lang: "fr-FR",
};

const W = 13.333;
const H = 7.5;
const C = {
  dark: "171A15",
  cream: "F2EFE6",
  panel: "FAF8F2",
  secondary: "E7E2D6",
  ink: "20231E",
  muted: "5A5E55",
  line: "CEC8BA",
  green: "2F7057",
  greenLight: "58A07D",
  white: "F7F4EC",
  gray: "B8B3A6",
  oldBlue: "3A4657",
};
const FONT_HEAD = "Georgia";
const FONT_BODY = "Arial";
const root = path.resolve(__dirname, "..");
const assets = path.join(__dirname, "assets");
const defaultOutput = path.join(__dirname, "output", "Proposition-site-Christophe-Patrice.pptx");

const image = (name) => {
  const file = path.join(assets, name);
  if (!fs.existsSync(file)) throw new Error(`Image manquante : ${file}`);
  return file;
};

function addImageCover(slide, file, x, y, w, h, altText, transparency = 0) {
  slide.addImage({
    path: file,
    x,
    y,
    w,
    h,
    sizing: { type: "cover", w, h },
    altText,
    transparency,
  });
}

function addImageContain(slide, file, x, y, w, h, altText) {
  slide.addImage({
    path: file,
    x,
    y,
    w,
    h,
    sizing: { type: "contain", w, h },
    altText,
  });
}

function addText(slide, text, options = {}) {
  slide.addText(text, {
    fontFace: FONT_BODY,
    fontSize: 16,
    color: C.ink,
    margin: 0,
    breakLine: false,
    valign: "mid",
    ...options,
  });
}

function addKicker(slide, text, x, y, color = C.green) {
  slide.addShape(pptx.ShapeType.line, {
    x,
    y: y + 0.105,
    w: 0.28,
    h: 0,
    line: { color, width: 1.3 },
  });
  addText(slide, text.toUpperCase(), {
    x: x + 0.42,
    y,
    w: 4.7,
    h: 0.24,
    fontFace: FONT_BODY,
    fontSize: 8.5,
    bold: true,
    charSpacing: 1.8,
    color,
  });
}

function addTitle(slide, title, subtitle, dark = false) {
  addKicker(slide, "Domaine Christophe Patrice", 0.72, 0.46, dark ? C.greenLight : C.green);
  addText(slide, title, {
    x: 0.72,
    y: 0.86,
    w: 11.9,
    h: 0.62,
    fontFace: FONT_HEAD,
    fontSize: 26,
    bold: true,
    color: dark ? C.white : C.ink,
    breakLine: true,
    valign: "top",
  });
  if (subtitle) {
    addText(slide, subtitle, {
      x: 0.72,
      y: 1.52,
      w: 11.4,
      h: 0.38,
      fontSize: 11.5,
      color: dark ? C.gray : C.muted,
      valign: "top",
    });
  }
}

function addFooter(slide, number, dark = false, source = "") {
  slide.addShape(pptx.ShapeType.line, {
    x: 0.72,
    y: 7.14,
    w: 11.88,
    h: 0,
    line: { color: dark ? "383C32" : C.line, width: 0.7 },
  });
  addText(slide, source, {
    x: 0.72,
    y: 7.19,
    w: 10.9,
    h: 0.16,
    fontSize: 6.4,
    color: dark ? C.gray : C.muted,
    valign: "top",
  });
  addText(slide, String(number).padStart(2, "0"), {
    x: 12.08,
    y: 7.17,
    w: 0.52,
    h: 0.18,
    fontSize: 7.5,
    bold: true,
    color: dark ? C.greenLight : C.green,
    align: "right",
  });
}

function addPill(slide, text, x, y, w, dark = false) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.05,
    fill: { color: dark ? "252A22" : C.panel },
    line: { color: dark ? "383C32" : C.line, width: 0.8 },
  });
  addText(slide, text, {
    x: x + 0.1,
    y: y + 0.02,
    w: w - 0.2,
    h: 0.29,
    fontSize: 8,
    bold: true,
    color: dark ? C.white : C.green,
    align: "center",
  });
}

// Slide 1 — couverture
{
  const slide = pptx.addSlide();
  addImageCover(
    slide,
    path.join(root, "src", "assets", "images", "hero-aspersion.jpg"),
    0,
    0,
    W,
    H,
    "Nouvelle page d'accueil proposée pour le Domaine Christophe Patrice"
  );
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: H,
    fill: { color: C.dark, transparency: 30 },
    line: { color: C.dark, transparency: 100 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 6.7,
    h: H,
    fill: { color: C.dark, transparency: 20 },
    line: { color: C.dark, transparency: 100 },
  });
  addKicker(slide, "Proposition · Juillet 2026", 0.72, 0.62, C.greenLight);
  addText(slide, "Une présence digitale\nà la hauteur du domaine", {
    x: 0.72,
    y: 1.43,
    w: 6.2,
    h: 1.82,
    fontFace: FONT_HEAD,
    fontSize: 32,
    bold: true,
    color: C.white,
    breakLine: true,
    valign: "top",
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.75,
    y: 3.55,
    w: 0,
    h: 0.84,
    line: { color: C.greenLight, width: 2 },
  });
  addText(slide, "Une nouvelle vitrine pour raconter les terroirs,\nprésenter les cuvées et faciliter la vente directe.", {
    x: 1.02,
    y: 3.56,
    w: 4.95,
    h: 0.82,
    fontSize: 14,
    color: C.white,
    breakLine: true,
    valign: "top",
  });
  addPill(slide, "FRANÇAIS / ENGLISH", 0.72, 5.35, 1.85, true);
  addPill(slide, "MOBILE", 2.72, 5.35, 1.03, true);
  addPill(slide, "VENTE DIRECTE", 3.9, 5.35, 1.55, true);
  addText(slide, "Domaine Christophe Patrice · Beine · Chablis", {
    x: 0.72,
    y: 6.66,
    w: 6,
    h: 0.26,
    fontSize: 9,
    color: C.gray,
  });
  slide.addNotes(
    "Bonjour Monsieur Patrice. Je suis passionné de vin et de création web. En découvrant votre domaine, j’ai eu envie d’imaginer une présence digitale qui restitue davantage le soin, les terroirs et la personnalité que l’on associe à vos cuvées. Cette présentation montre une version déjà fonctionnelle, mais conçue pour être validée et finalisée avec vous."
  );
}

// Slide 2 — avant / après
{
  const slide = pptx.addSlide();
  slide.background = { color: C.cream };
  addTitle(
    slide,
    "Même domaine. Une perception entièrement différente.",
    "Le contenu existe déjà ; la nouvelle version lui donne une hiérarchie, une identité et un véritable parcours."
  );

  addText(slide, "AUJOURD'HUI", {
    x: 0.72,
    y: 2.03,
    w: 2,
    h: 0.24,
    fontSize: 8.5,
    bold: true,
    charSpacing: 1.5,
    color: C.muted,
  });
  addText(slide, "NOUVELLE PROPOSITION", {
    x: 6.88,
    y: 2.03,
    w: 2.8,
    h: 0.24,
    fontSize: 8.5,
    bold: true,
    charSpacing: 1.5,
    color: C.green,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.7,
    y: 2.35,
    w: 5.78,
    h: 3.72,
    fill: { color: C.oldBlue },
    line: { color: C.line, width: 0.8 },
    shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 1.5, angle: 45, distance: 1 },
  });
  addImageCover(
    slide,
    image("site-actuel.png"),
    0.78,
    2.43,
    5.62,
    3.56,
    "Capture du site actuel du Domaine Christophe Patrice"
  );
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.86,
    y: 2.35,
    w: 5.78,
    h: 3.72,
    fill: { color: C.dark },
    line: { color: C.green, width: 1.1 },
    shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 1.5, angle: 45, distance: 1 },
  });
  addImageCover(
    slide,
    image("nouveau-site-accueil.png"),
    6.94,
    2.43,
    5.62,
    3.56,
    "Capture de la nouvelle page d'accueil proposée"
  );

  const comparisons = [
    ["Modèle générique", "Identité propre"],
    ["Information dispersée", "Récit structuré"],
    ["Expérience mobile limitée", "Parcours mobile fluide"],
  ];
  comparisons.forEach(([before, after], i) => {
    const y = 6.25 + i * 0.25;
    addText(slide, before, {
      x: 0.78,
      y,
      w: 2.5,
      h: 0.2,
      fontSize: 8.5,
      color: C.muted,
    });
    addText(slide, "→", {
      x: 3.02,
      y,
      w: 0.4,
      h: 0.2,
      fontSize: 9,
      color: C.line,
      align: "center",
    });
    addText(slide, after, {
      x: 3.55,
      y,
      w: 2.4,
      h: 0.2,
      fontSize: 8.5,
      color: C.green,
      bold: true,
    });
  });
  addText(slide, "Une évolution d’image, sans renier l’histoire du domaine.", {
    x: 6.94,
    y: 6.34,
    w: 5.45,
    h: 0.45,
    fontFace: FONT_HEAD,
    fontSize: 15,
    color: C.ink,
    italic: true,
  });
  addFooter(slide, 2, false, "Captures réalisées le 27 juillet 2026 · Site actuel et prototype fonctionnel.");
  slide.addNotes(
    "Le site actuel contient déjà des informations utiles. Mon intention n’est pas de le dénigrer, mais de montrer que sa forme actuelle masque une partie de la valeur du domaine. La nouvelle proposition reprend cette matière et la transforme en une expérience plus claire, plus contemporaine et plus fidèle à votre identité."
  );
}

// Slide 3 — parcours utiles
{
  const slide = pptx.addSlide();
  slide.background = { color: C.cream };
  addTitle(
    slide,
    "Un site utile, pas seulement plus beau.",
    "Chaque public trouve rapidement la prochaine action qui lui correspond."
  );

  const journeys = [
    {
      n: "01",
      title: "Particulier",
      text: "Découvrir les cuvées  →  préparer une dégustation  →  appeler le domaine",
    },
    {
      n: "02",
      title: "Caviste ou importateur",
      text: "Comprendre la gamme  →  consulter les terroirs  →  demander les tarifs",
    },
    {
      n: "03",
      title: "Visiteur du Chablisien",
      text: "Vérifier les horaires  →  lancer l’itinéraire  →  découvrir le gîte",
    },
  ];

  journeys.forEach((journey, i) => {
    const y = 2.08 + i * 1.28;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.72,
      y,
      w: 8.25,
      h: 1.02,
      rectRadius: 0.04,
      fill: { color: i === 1 ? C.secondary : C.panel },
      line: { color: C.line, width: 0.8 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.72,
      y,
      w: 0.7,
      h: 1.02,
      fill: { color: C.green },
      line: { color: C.green, width: 0 },
    });
    addText(slide, journey.n, {
      x: 0.84,
      y: y + 0.35,
      w: 0.46,
      h: 0.22,
      fontSize: 9,
      bold: true,
      color: C.white,
      align: "center",
    });
    addText(slide, journey.title, {
      x: 1.7,
      y: y + 0.1,
      w: 2.5,
      h: 0.5,
      fontFace: FONT_HEAD,
      fontSize: 14.5,
      bold: true,
      color: C.ink,
      valign: "mid",
    });
    addText(slide, journey.text, {
      x: 1.7,
      y: y + 0.7,
      w: 6.78,
      h: 0.18,
      fontSize: 8.5,
      color: C.muted,
    });
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.66,
    y: 1.92,
    w: 2.6,
    h: 4.72,
    rectRadius: 0.08,
    fill: { color: C.dark },
    line: { color: C.green, width: 1.2 },
    shadow: { type: "outer", color: "000000", opacity: 0.16, blur: 2, angle: 45, distance: 1 },
  });
  addImageContain(
    slide,
    image("nouveau-site-mobile-en.png"),
    9.78,
    2.04,
    2.36,
    4.47,
    "Version anglaise du nouveau site affichée sur mobile"
  );
  addText(slide, "FR / EN", {
    x: 10.13,
    y: 6.67,
    w: 1.65,
    h: 0.22,
    fontSize: 8.5,
    bold: true,
    color: C.green,
    align: "center",
    charSpacing: 1.2,
  });
  addPill(slide, "RESPONSIVE", 0.72, 6.28, 1.38);
  addPill(slide, "ACCESSIBLE", 2.25, 6.28, 1.28);
  addPill(slide, "CONTACT DIRECT", 3.68, 6.28, 1.62);
  addPill(slide, "SANS BANNIÈRE INTRUSIVE", 5.45, 6.28, 2.35);
  addFooter(slide, 3);
  slide.addNotes(
    "La refonte ne se limite pas à une nouvelle esthétique. Elle organise trois parcours simples : le particulier qui veut goûter ou acheter, le professionnel qui cherche une gamme et des tarifs, et le visiteur qui prépare son passage dans le Chablisien. Le site est déjà bilingue et pensé pour le mobile."
  );
}

// Slide 4 — pourquoi maintenant
{
  const slide = pptx.addSlide();
  slide.background = { color: C.dark };
  addImageCover(
    slide,
    image("nouveau-site-terroir.png"),
    7.55,
    0,
    5.78,
    H,
    "Atlas interactif des terroirs de la nouvelle version",
    72
  );
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: H,
    fill: { color: C.dark, transparency: 8 },
    line: { color: C.dark, transparency: 100 },
  });
  addTitle(
    slide,
    "Aujourd’hui, la présence numérique fait partie du caveau.",
    "Avant une visite, une commande ou un premier échange professionnel, le site accueille déjà le futur client.",
    true
  );

  const stats = [
    ["79 %", "des viticulteurs disposent\ndéjà d’un site internet"],
    ["38 %", "réalisent plus de 30 % de leur\nchiffre d’affaires grâce à internet"],
    ["78 %", "des dirigeants de TPE-PME voient\ndes bénéfices réels dans le numérique"],
  ];
  stats.forEach(([value, label], i) => {
    const x = 0.72 + i * 4.03;
    slide.addShape(pptx.ShapeType.line, {
      x,
      y: 2.45,
      w: 3.46,
      h: 0,
      line: { color: C.greenLight, width: 1.2 },
    });
    addText(slide, value, {
      x,
      y: 2.72,
      w: 3.25,
      h: 0.88,
      fontFace: FONT_HEAD,
      fontSize: 34,
      bold: true,
      color: C.white,
      valign: "top",
    });
    addText(slide, label, {
      x,
      y: 3.78,
      w: 3.35,
      h: 0.75,
      fontSize: 11,
      color: C.gray,
      breakLine: true,
      valign: "top",
    });
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.72,
    y: 5.25,
    w: 11.82,
    h: 1.05,
    rectRadius: 0.04,
    fill: { color: "252A22", transparency: 5 },
    line: { color: "383C32", width: 0.8 },
  });
  addText(slide, "Le site ne remplace pas le travail du vigneron.", {
    x: 1.02,
    y: 5.48,
    w: 4.55,
    h: 0.27,
    fontFace: FONT_HEAD,
    fontSize: 15,
    bold: true,
    color: C.white,
  });
  addText(slide, "Il donne envie de venir le découvrir, de l’appeler et de commander en direct.", {
    x: 5.28,
    y: 5.5,
    w: 6.65,
    h: 0.3,
    fontSize: 11,
    color: C.greenLight,
  });
  addFooter(
    slide,
    4,
    true,
    "Sources : Afnic, « La présence en ligne des professionnels de l’agriculture en 2025 » (avec MV2) ; Baromètre France Num 2025."
  );
  slide.addNotes(
    "L’enjeu n’est pas de suivre une mode. Le site est aujourd’hui une extension de l’accueil au domaine. Il rassure, facilite la visite, donne accès aux professionnels et favorise la vente directe. L’étude Afnic menée avec MV2 et le Baromètre France Num montrent que la viticulture est déjà l’un des secteurs agricoles les plus avancés sur ces usages."
  );
}

// Slide 5 — validation factuelle
{
  const slide = pptx.addSlide();
  slide.background = { color: C.cream };
  addTitle(
    slide,
    "La vérité avant la mise en ligne.",
    "La maquette distingue ce qui est documenté de ce qui doit encore être validé avec le domaine."
  );

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.72,
    y: 2.08,
    w: 5.62,
    h: 3.95,
    rectRadius: 0.04,
    fill: { color: "E2ECE6" },
    line: { color: "AFC8B9", width: 0.9 },
  });
  addText(slide, "INFORMATIONS DOCUMENTÉES", {
    x: 1.02,
    y: 2.36,
    w: 3.5,
    h: 0.22,
    fontSize: 8.5,
    bold: true,
    color: C.green,
    charSpacing: 1.3,
  });
  const verified = [
    "1996 · 2006 · 2011 : étapes de l’histoire",
    "Adresses et horaires de Beine et Irancy",
    "Densité annoncée de 5 800 pieds / hectare",
    "Services, gîte et livraison à partir de 60 bouteilles",
    "Archives de distinctions 2019–2020",
  ];
  verified.forEach((item, i) => {
    addText(slide, "✓", {
      x: 1.03,
      y: 2.87 + i * 0.53,
      w: 0.28,
      h: 0.22,
      fontSize: 11,
      bold: true,
      color: C.green,
      align: "center",
    });
    addText(slide, item, {
      x: 1.42,
      y: 2.85 + i * 0.53,
      w: 4.35,
      h: 0.27,
      fontSize: 10.2,
      color: C.ink,
    });
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.7,
    y: 2.08,
    w: 5.92,
    h: 3.95,
    rectRadius: 0.04,
    fill: { color: C.panel },
    line: { color: C.line, width: 0.9 },
  });
  addText(slide, "À CONFIRMER AVEC CHRISTOPHE", {
    x: 7.0,
    y: 2.36,
    w: 3.9,
    h: 0.22,
    fontSize: 8.5,
    bold: true,
    color: C.muted,
    charSpacing: 1.3,
  });
  const pending = [
    "Surface actuelle : 19 ou 22 hectares selon les sources",
    "Gamme 2026 complète et millésimes disponibles",
    "Orthographe actuelle de Beauregard / Beauregards",
    "Fiche technique précise de l’Irancy",
    "Identité légale et droits sur les photographies",
  ];
  pending.forEach((item, i) => {
    addText(slide, String(i + 1).padStart(2, "0"), {
      x: 7.02,
      y: 2.85 + i * 0.53,
      w: 0.38,
      h: 0.22,
      fontSize: 8.5,
      bold: true,
      color: C.green,
      align: "center",
    });
    addText(slide, item, {
      x: 7.54,
      y: 2.83 + i * 0.53,
      w: 4.42,
      h: 0.31,
      fontSize: 10.2,
      color: C.ink,
    });
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.72,
    y: 6.27,
    w: 11.9,
    h: 0.54,
    fill: { color: C.green },
    line: { color: C.green, width: 0 },
  });
  addText(slide, "Une information contradictoire est retirée du site jusqu’à validation — jamais présentée comme certaine.", {
    x: 1.02,
    y: 6.41,
    w: 11.25,
    h: 0.24,
    fontSize: 10.2,
    bold: true,
    color: C.white,
    align: "center",
  });
  addFooter(slide, 5);
  slide.addNotes(
    "Je ne souhaite pas inventer une histoire ou une fiche technique pour rendre la maquette plus impressionnante. J’ai donc retiré les chiffres contradictoires et préparé une liste précise de validation. Une courte séance avec vous permettra de sécuriser la surface, la gamme actuelle, les cuvées et les informations légales."
  );
}

// Slide 6 — proposition
{
  const slide = pptx.addSlide();
  slide.background = { color: C.cream };
  addTitle(
    slide,
    "Une collaboration simple, pensée comme un échange.",
    "Une proposition passion, sensiblement inférieure à la valeur habituelle d’un projet de ce niveau."
  );

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.72,
    y: 2.05,
    w: 5.45,
    h: 3.98,
    rectRadius: 0.05,
    fill: { color: C.panel },
    line: { color: C.line, width: 0.8 },
  });
  addText(slide, "VALEUR DE RÉFÉRENCE", {
    x: 1.05,
    y: 2.42,
    w: 2.5,
    h: 0.22,
    fontSize: 8.5,
    bold: true,
    charSpacing: 1.3,
    color: C.muted,
  });
  addText(slide, "4 200 € HT", {
    x: 1.02,
    y: 2.85,
    w: 4.4,
    h: 0.72,
    fontFace: FONT_HEAD,
    fontSize: 31,
    bold: true,
    color: C.ink,
  });
  addText(slide, "Conception, développement, contenus,\nversion anglaise, tests et mise en ligne.", {
    x: 1.05,
    y: 3.73,
    w: 4.15,
    h: 0.67,
    fontSize: 11,
    color: C.muted,
    breakLine: true,
    valign: "top",
  });
  addText(slide, "Repère marché : site vitrine sur mesure\nfreelance en France, environ 3 000 à 5 000 € HT.", {
    x: 1.05,
    y: 4.88,
    w: 4.05,
    h: 0.58,
    fontSize: 8.8,
    color: C.green,
    breakLine: true,
    valign: "top",
  });

  addText(slide, "→", {
    x: 6.23,
    y: 3.64,
    w: 0.6,
    h: 0.6,
    fontSize: 24,
    color: C.green,
    bold: true,
    align: "center",
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.94,
    y: 2.05,
    w: 5.68,
    h: 3.98,
    rectRadius: 0.05,
    fill: { color: C.dark },
    line: { color: C.green, width: 1.2 },
  });
  addImageCover(
    slide,
    path.join(root, "src", "assets", "images", "pro-gamme.jpg"),
    6.94,
    2.05,
    5.68,
    3.98,
    "Bouteilles du Domaine Christophe Patrice",
    48
  );
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.94,
    y: 2.05,
    w: 5.68,
    h: 3.98,
    fill: { color: C.dark, transparency: 26 },
    line: { color: C.dark, transparency: 100 },
  });
  addText(slide, "PROPOSITION PASSION", {
    x: 7.29,
    y: 2.42,
    w: 2.8,
    h: 0.22,
    fontSize: 8.5,
    bold: true,
    charSpacing: 1.3,
    color: C.greenLight,
  });
  addText(slide, "60 bouteilles", {
    x: 7.28,
    y: 2.84,
    w: 4.7,
    h: 0.72,
    fontFace: FONT_HEAD,
    fontSize: 31,
    bold: true,
    color: C.white,
  });
  addText(slide, "panachées sur la gamme disponible", {
    x: 7.3,
    y: 3.62,
    w: 4.4,
    h: 0.3,
    fontSize: 12,
    color: C.white,
  });
  addText(slide, "Finalisation · mise en ligne · 2 séries de corrections\n30 jours de garantie corrective", {
    x: 7.3,
    y: 4.44,
    w: 4.62,
    h: 0.72,
    fontSize: 10.2,
    color: C.gray,
    breakLine: true,
    valign: "top",
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.72,
    y: 6.3,
    w: 11.9,
    h: 0.5,
    fill: { color: C.secondary },
    line: { color: C.line, width: 0.7 },
  });
  addText(slide, "Domaine et hébergement réglés directement par le domaine · Échange valorisé en euros et formalisé proprement.", {
    x: 1.0,
    y: 6.43,
    w: 11.32,
    h: 0.22,
    fontSize: 8.8,
    color: C.muted,
    align: "center",
  });
  addFooter(slide, 6, false, "Repère tarifaire : Baromètre Malt 2026, développeurs front-end ; estimation de périmètre du projet.");
  slide.addNotes(
    "Un projet de ce niveau se facture normalement autour de 4 000 euros hors taxes. Comme cette première version a été réalisée par passion et que l’idée est de construire une relation directe avec le domaine, je propose une formule inhabituelle : 60 bouteilles panachées, avec les frais techniques réglés directement par le domaine. L’échange serait naturellement valorisé et facturé proprement."
  );
}

// Slide 7 — déroulé et conclusion
{
  const slide = pptx.addSlide();
  slide.background = { color: C.dark };
  addImageCover(
    slide,
    path.join(root, "src", "assets", "images", "hero-aspersion.jpg"),
    0,
    0,
    W,
    H,
    "Nouvelle page d'accueil du Domaine Christophe Patrice",
    72
  );
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: H,
    fill: { color: C.dark, transparency: 7 },
    line: { color: C.dark, transparency: 100 },
  });
  addTitle(
    slide,
    "Une mise en ligne simple et maîtrisée.",
    "Votre validation reste le point de départ de chaque contenu et de chaque décision.",
    true
  );

  const steps = [
    ["01", "Échange", "20 min"],
    ["02", "Validation\ndes contenus", "45 min"],
    ["03", "Ajustements", "5–7 jours"],
    ["04", "Accord final\net domaine", "1 rendez-vous"],
    ["05", "Suivi", "30 jours"],
  ];
  slide.addShape(pptx.ShapeType.line, {
    x: 1.35,
    y: 3.55,
    w: 10.52,
    h: 0,
    line: { color: C.greenLight, width: 1.2 },
  });
  steps.forEach(([n, title, timing], i) => {
    const x = 0.75 + i * 2.46;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.48,
      y: 3.22,
      w: 0.66,
      h: 0.66,
      fill: { color: C.green },
      line: { color: C.greenLight, width: 1 },
    });
    addText(slide, n, {
      x: x + 0.56,
      y: 3.42,
      w: 0.5,
      h: 0.2,
      fontSize: 8,
      bold: true,
      color: C.white,
      align: "center",
    });
    addText(slide, title, {
      x,
      y: 4.14,
      w: 1.62,
      h: 0.62,
      fontFace: FONT_HEAD,
      fontSize: 13,
      bold: true,
      color: C.white,
      align: "center",
      breakLine: true,
      valign: "top",
    });
    addText(slide, timing, {
      x,
      y: 4.94,
      w: 1.62,
      h: 0.24,
      fontSize: 8.8,
      color: C.greenLight,
      align: "center",
      bold: true,
    });
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.0,
    y: 5.78,
    w: 9.33,
    h: 0.82,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.white, width: 0 },
  });
  addText(slide, "Un échange de 20 minutes suffit pour décider de la suite.", {
    x: 2.25,
    y: 5.99,
    w: 8.83,
    h: 0.34,
    fontFace: FONT_HEAD,
    fontSize: 17,
    bold: true,
    color: C.dark,
    align: "center",
  });
  addFooter(slide, 7, true);
  slide.addNotes(
    "La suite est volontairement simple. Nous regardons la version ensemble, nous validons les informations, puis je réalise les ajustements. Rien n’est basculé sur votre domaine sans votre accord final. Je reste ensuite disponible pendant trente jours pour corriger tout problème lié à la mise en ligne."
  );
}

const previewSlide = Number.parseInt(process.env.PREVIEW_SLIDE || "", 10);
if (Number.isInteger(previewSlide) && previewSlide >= 1 && previewSlide <= pptx._slides.length) {
  const selectedSlide = pptx._slides[previewSlide - 1];
  selectedSlide._slideNum = 1;
  selectedSlide._slideId = 256;
  selectedSlide._rId = 2;
  selectedSlide._name = "Slide 1";
  pptx._slides = [selectedSlide];
}

const output = process.env.OUTPUT_PATH
  ? path.resolve(process.env.OUTPUT_PATH)
  : defaultOutput;

fs.mkdirSync(path.dirname(output), { recursive: true });
pptx.writeFile({ fileName: output, compression: true }).then(() => {
  console.log(output);
});
