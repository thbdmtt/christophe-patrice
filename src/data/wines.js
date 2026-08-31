export const order = ["petit-chablis", "chablis", "montmains", "beauroy", "beauregard", "irancy"];

export const winesByLanguage = {
  fr: {
    "petit-chablis": {
      kicker: "Blanc · Plateau",
      name: "Petit Chablis",
      commune: "Beine, Courgis, Chablis",
      facts: [
        ["Sol", "Portlandien, terroir de plateau"],
        ["Cépage", "Chardonnay"],
        ["Profil publié", "Fruit et fraîcheur"],
        ["Garde publiée", "À boire jeune"],
      ],
      note: "Fruit et fraîcheur — idéal à l'apéritif.",
    },
    chablis: {
      kicker: "Blanc · Coteau",
      name: "Chablis",
      commune: "Beine, Courgis, Chablis",
      facts: [
        ["Sol", "Kimméridgien, calcaire à fossiles"],
        ["Cépage", "Chardonnay"],
        ["Profil publié", "Vif, fruité et très sec"],
        ["Garde publiée", "3 à 5 ans"],
      ],
      note: "Vif et fruité, très sec, avec une acidité rafraîchissante — sur un poisson ou une viande blanche.",
    },
    montmains: {
      kicker: "Blanc · Premier Cru",
      name: "Chablis 1er Cru Montmains",
      commune: "Chablis",
      facts: [
        ["Appellation", "Chablis Premier Cru"],
        ["Climat", "Montmains"],
        ["Cépage", "Chardonnay"],
        ["Sol", "Kimméridgien"],
      ],
      note: "Minéralité, fruit et fraîcheur ; le domaine souligne son aptitude au vieillissement.",
    },
    beauroy: {
      kicker: "Blanc · Premier Cru",
      name: "Chablis 1er Cru Beauroy",
      commune: "Beine",
      facts: [
        ["Appellation", "Chablis Premier Cru"],
        ["Climat", "Beauroy"],
        ["Exposition publiée", "Plein sud, au-dessus de Beine"],
        ["Cépage", "Chardonnay"],
      ],
      note: "Un caractère chaleureux que le domaine relie à son exposition plein sud.",
    },
    beauregard: {
      kicker: "Blanc · Premier Cru",
      name: "Chablis 1er Cru Beauregard",
      commune: "Courgis",
      facts: [
        ["Appellation", "Chablis Premier Cru"],
        ["Climat", "Beauregard — orthographe à confirmer"],
        ["Terroir publié", "Courgis"],
        ["Cépage", "Chardonnay"],
      ],
      note: "Le domaine le décrit comme vif, avec un arôme de poire et de miel, et indique une garde de 5 à 7 ans.",
    },
    irancy: {
      kicker: "Rouge · Appellation Irancy",
      name: "Irancy",
      commune: "Accueil à Irancy, à 15 km de Beine",
      facts: [
        ["Appellation", "Irancy AOC"],
        ["Couleur", "Rouge"],
        ["Détails de la cuvée", "À confirmer avec le domaine"],
      ],
      note: "La fiche technique, l'élevage et la note de dégustation seront ajoutés après validation par Christophe Patrice.",
    },
  },
  en: {
    "petit-chablis": {
      kicker: "White · Plateau",
      name: "Petit Chablis",
      commune: "Beine, Courgis, Chablis",
      facts: [
        ["Soil", "Portlandian plateau soils"],
        ["Grape", "Chardonnay"],
        ["Published profile", "Fruit and freshness"],
        ["Published ageing", "Best enjoyed young"],
      ],
      note: "Fruit and freshness — ideal as an aperitif.",
    },
    chablis: {
      kicker: "White · Slope",
      name: "Chablis",
      commune: "Beine, Courgis, Chablis",
      facts: [
        ["Soil", "Kimmeridgian fossil-rich limestone"],
        ["Grape", "Chardonnay"],
        ["Published profile", "Lively, fruity and very dry"],
        ["Published ageing", "3 to 5 years"],
      ],
      note: "Lively, fruity and very dry, with refreshing acidity — a match for fish or white meat.",
    },
    montmains: {
      kicker: "White · Premier Cru",
      name: "Chablis 1er Cru Montmains",
      commune: "Chablis",
      facts: [
        ["Appellation", "Chablis Premier Cru"],
        ["Climat", "Montmains"],
        ["Grape", "Chardonnay"],
        ["Soil", "Kimmeridgian"],
      ],
      note: "Minerality, fruit and freshness; the estate highlights its ageing potential.",
    },
    beauroy: {
      kicker: "White · Premier Cru",
      name: "Chablis 1er Cru Beauroy",
      commune: "Beine",
      facts: [
        ["Appellation", "Chablis Premier Cru"],
        ["Climat", "Beauroy"],
        ["Published exposure", "South-facing, above Beine"],
        ["Grape", "Chardonnay"],
      ],
      note: "A warm character that the estate associates with its full southern exposure.",
    },
    beauregard: {
      kicker: "White · Premier Cru",
      name: "Chablis 1er Cru Beauregard",
      commune: "Courgis",
      facts: [
        ["Appellation", "Chablis Premier Cru"],
        ["Climat", "Beauregard — spelling to be confirmed"],
        ["Published terroir", "Courgis"],
        ["Grape", "Chardonnay"],
      ],
      note: "The estate describes it as lively, with pear and honey aromas, and suggests 5 to 7 years of ageing.",
    },
    irancy: {
      kicker: "Red · Irancy appellation",
      name: "Irancy",
      commune: "Visitor location in Irancy, 15 km from Beine",
      facts: [
        ["Appellation", "Irancy AOC"],
        ["Colour", "Red"],
        ["Wine details", "To be confirmed with the estate"],
      ],
      note: "Technical details, ageing and tasting notes will be added after validation by Christophe Patrice.",
    },
  },
};

export const medalsByLanguage = {
  fr: {
    "petit-chablis": {
      2019: ["Or Gilbert & Gaillard", "Or Concours de Lyon", "2★ Guide Hachette"],
      2020: ["Or Gilbert & Gaillard", "Or Burgondia"],
    },
    chablis: {
      2019: ["Or Gilbert & Gaillard", "Argent Concours de Lyon"],
      2020: ["Or Gilbert & Gaillard", "Argent Burgondia", "Or Féminalise"],
    },
    montmains: {
      2019: ["Or Gilbert & Gaillard", "Argent Concours de Lyon"],
      2020: ["Or Gilbert & Gaillard", "Or Féminalise"],
    },
    beauroy: {
      2019: ["Or Gilbert & Gaillard", "Or Burgondia", "Or Féminalise"],
      2020: ["Or Gilbert & Gaillard", "Or Burgondia", "Or Féminalise"],
    },
    beauregard: {
      2019: ["Or Gilbert & Gaillard", "Argent Burgondia"],
      2020: ["Or Gilbert & Gaillard", "Or Concours de Lyon"],
    },
    irancy: {},
  },
  en: {
    "petit-chablis": {
      2019: ["Gold — Gilbert & Gaillard", "Gold — Concours de Lyon", "2★ — Guide Hachette"],
      2020: ["Gold — Gilbert & Gaillard", "Gold — Burgondia"],
    },
    chablis: {
      2019: ["Gold — Gilbert & Gaillard", "Silver — Concours de Lyon"],
      2020: ["Gold — Gilbert & Gaillard", "Silver — Burgondia", "Gold — Féminalise"],
    },
    montmains: {
      2019: ["Gold — Gilbert & Gaillard", "Silver — Concours de Lyon"],
      2020: ["Gold — Gilbert & Gaillard", "Gold — Féminalise"],
    },
    beauroy: {
      2019: ["Gold — Gilbert & Gaillard", "Gold — Burgondia", "Gold — Féminalise"],
      2020: ["Gold — Gilbert & Gaillard", "Gold — Burgondia", "Gold — Féminalise"],
    },
    beauregard: {
      2019: ["Gold — Gilbert & Gaillard", "Silver — Burgondia"],
      2020: ["Gold — Gilbert & Gaillard", "Gold — Concours de Lyon"],
    },
    irancy: {},
  },
};
