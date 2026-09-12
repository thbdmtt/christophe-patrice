# Christophe Patrice — site du domaine

Application React (Vite) reproduisant fidèlement la maquette du domaine : hero, chiffres clés,
Domaine, Terroir (atlas interactif), Vins, Espace Professionnel, bandeau village, Visiter/Gîte,
footer.

## Site publié

Aperçu protégé par mot de passe sur Cloudflare Pages :
[christophe-patrice.pages.dev](https://christophe-patrice.pages.dev/).

Le mot de passe est un secret Cloudflare (`SITE_PASSWORD`), hors dépôt. GitHub Pages n’est plus l’hôte public.

Pour republier depuis ce dossier, une fois le site compilé :

```bash
npx wrangler pages deploy ./dist --project-name christophe-patrice
```

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

## Méthode et outils de prospection

L’activité commune aux domaines viticoles est regroupée dans [Atelier viticole](<../Atelier viticole/README.md>), un dossier indépendant de ce site. Les chemins `project-management/` et `reference-sites/` sont conservés comme liens symboliques de compatibilité vers cet espace. Pour travailler sur la prospection et ses outils, ouvrir directement `Projects/Atelier viticole`.
