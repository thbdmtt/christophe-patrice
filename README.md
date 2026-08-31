# Christophe Patrice — site du domaine

Application React (Vite) reproduisant fidèlement la maquette du domaine : hero, chiffres clés,
Domaine, Terroir (atlas interactif), Vins, Espace Professionnel, bandeau village, Visiter/Gîte,
footer.

## Site publié

Le site est déployé automatiquement sur GitHub Pages à chaque mise à jour de la branche `main` :
[thbdmtt.github.io/christophe-patrice](https://thbdmtt.github.io/christophe-patrice/).

## Lancer en développement

```bash
npm install
npm run dev
```

Ouvre l'URL affichée dans le terminal (par défaut http://localhost:5173).

## Compiler pour la production

```bash
npm run build
```

Le site statique est généré dans `dist/`. Pour le prévisualiser localement :

```bash
npm run preview
```

## Structure

- `src/components/` — un composant + une feuille de style par section
- `src/data/wines.js` — cuvées, médailles, disponibilité, positions de la carte de terroir
- `src/styles/` — `variables.css` (palette), `fonts.css`, `base.css`
- `src/assets/` — polices (Fraunces, Archivo) et photographies du domaine
