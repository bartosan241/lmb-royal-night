# LMB Royal Night — Bar & Lounge · Libreville

Site vitrine et moteur de réservation pour **LMB Royal Night**, bar / lounge / club
au Quartier Louis à Libreville (Gabon).

**V1 — version de présentation.** Les contenus (prix, horaires, adresse, visuels)
sont des placeholders réalistes destinés à être validés par la direction avant
mise en ligne publique. Voir « À valider avant production » plus bas.

---

## Ce que fait le site

| Page | Rôle |
|---|---|
| `/` | Accroche, espaces, seaux, cave à champagne, programmation, galerie, avis, FAQ |
| `/espaces` | Les 5 espaces + plan de salle interactif |
| `/carte` | Carte complète : champagnes, spiritueux, cocktails, bières & Booster, chicha, tapas, softs |
| `/formules` | Les 4 formats de seau, 4 packs prêts à réserver, options |
| `/evenements` | Programmation des 6 nuits |
| `/galerie` | Galerie masonry + lightbox |
| `/contact` | Coordonnées, formulaire → WhatsApp, plan d'accès, FAQ |
| `/reservation` | **Configurateur de réservation en 6 étapes** |

### Le configurateur (`/reservation`)

Le cœur du site. En six étapes :

1. **La soirée** — date, heure d'arrivée, nombre de convives, occasion
2. **L'espace** — choix parmi 5 espaces, puis **sélection de l'emplacement exact sur un plan de salle interactif** (les tables déjà réservées sont grisées)
3. **Le seau** — choix d'un format (6 / 10 / 15 / 24 bouteilles) puis composition libre : on panache bières, Booster et premix comme on veut, la remise du format s'applique automatiquement, le total se recalcule en direct
4. **Bouteilles** — cave à champagne et spiritueux
5. **Options** — sparklers, défilé bouteille, message LED, gâteau, photographe, déco, voiturier, navette
6. **Récapitulatif** — coordonnées, puis génération d'un message WhatsApp complet et formaté envoyé au numéro de la maison

Le panier latéral affiche en permanence l'estimation, y compris le **complément
au minimum de consommation** de l'espace choisi.

> Aucun paiement en ligne : la demande part sur WhatsApp, un responsable confirme.
> C'est le circuit le plus fiable localement (Airtel Money / Moov Money sur place).

---

## Stack

- **Next.js 16** (App Router, Turbopack) — 9 routes, toutes statiques
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens dans `app/globals.css`)
- **Framer Motion** — animations de scroll, transitions, curseur, préchargeur

Aucune base de données, aucun backend : le site est 100 % statique et se déploie
tel quel.

## Direction artistique

Typographie « affiche de club » plutôt que « luxe générique » :

- **Anton** — titres, capitales, condensé, gros calibres
- **Inter Tight** — texte courant et interface
- **JetBrains Mono** — micro-labels, index de section, prix (chiffres tabulaires)

Palette : noir d'encre `#0a0a0b`, or métallique `#c9a227`, crème `#f3f1ec`.
Angles vifs, filets visibles, grain photo, l'or utilisé comme accent franc et non
en dégradé de texte.

---

## Lancer en local

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## Déploiement Vercel

Le dépôt est prêt tel quel : importer le repo sur Vercel, framework détecté
automatiquement (Next.js), aucune variable d'environnement requise.

---

## À valider avant production

Ces éléments sont des placeholders crédibles, à confirmer avec la direction :

- [ ] **Tarifs** (`lib/data.ts`) — calés sur le marché de Libreville, à ajuster
- [ ] **Minimums de consommation** par espace
- [ ] **Adresse exacte** et coordonnées GPS (la carte pointe le Quartier Louis)
- [ ] **Téléphone / WhatsApp** et email — repris des pages publiques existantes
- [ ] **Horaires** d'ouverture
- [ ] **Programmation** et noms de DJ
- [ ] **Photos** — actuellement des visuels d'illustration sous licence libre
      (Unsplash). À remplacer par un shooting du lieu : c'est le principal levier
      de crédibilité restant.
- [ ] **Avis clients** — textes d'exemple, à remplacer par de vrais avis
- [ ] **Plan de salle** (`components/reservation/FloorPlan.tsx`) — à caler sur la
      disposition réelle (nombre de carrés, loges, capacités)

## Structure

```
app/                    routes (une par page)
components/
  home/                 sections de la page d'accueil
  layout/               header, footer, en-tête de page
  pages/                contenus des pages secondaires
  reservation/          configurateur, plan de salle, builder de seau
  ui/                   primitives d'animation, kit UI, chrome (curseur, préchargeur)
lib/data.ts             TOUT le contenu éditorial et tarifaire
public/img/             visuels
```

Pour changer un prix, un espace, une soirée ou une bouteille : **`lib/data.ts`**
suffit dans la quasi-totalité des cas.
