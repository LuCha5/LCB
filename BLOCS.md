# 🧱 Blocs réutilisables — Le Crès Basket

Mémo pour ajouter facilement du contenu (pubs, affiches, actualités, sponsors…)
**sans avoir à toucher au CSS**. Tu copies un bloc, tu le colles au bon endroit,
tu remplaces le texte/l'image → c'est déjà au bon style (couleurs marine + orange,
ombres, arrondis, animations).

---

## 📍 Où coller un bloc ?

Sur une page comme `index.html`, le contenu est une suite de `<section>` placées
**entre la barre de navigation et le pied de page** :

```html
<div id="navbar-container"></div>

   ... colle tes <section> ici ...

<div id="footer-container"></div>
```

👉 Règle simple : colle ton bloc **juste avant** la ligne
`<div id="footer-container"></div>` (ou entre deux sections existantes).

Les images vont dans le dossier **`assets/images/`**.

---

## 1. 📢 Une pub / affiche (une image pleine largeur)

> Pour une promo, une affiche d'événement, un partenaire mis en avant…

```html
<section class="py-5">
  <div class="container text-center">
    <h2 class="mb-4">Titre de la pub</h2>
    <img src="assets/images/ma-pub.jpg" alt="Description de la pub"
         class="img-fluid rounded shadow">
  </div>
</section>
```

✅ Le titre reçoit le petit trait orange automatiquement, l'image est arrondie,
ombrée, avec un léger zoom au survol.

---

## 2. 🖼️ Deux images côte à côte

> Comme la section « Notre planning » de l'accueil.

```html
<section class="py-5">
  <div class="container text-center">
    <h2 class="mb-4">Mon titre</h2>
    <div class="row justify-content-center g-4">
      <div class="col-12 col-md-6">
        <img src="assets/images/image-gauche.jpg" alt="" class="img-fluid rounded shadow-sm w-100">
      </div>
      <div class="col-12 col-md-6">
        <img src="assets/images/image-droite.jpg" alt="" class="img-fluid rounded shadow-sm w-100">
      </div>
    </div>
  </div>
</section>
```

✅ Sur mobile, les deux images passent automatiquement l'une au-dessus de l'autre.

---

## 3. 📰 Une section « Actualités » en cartes

> Pour annoncer des news. Duplique le bloc `<!-- une carte -->` pour chaque actu.

```html
<section class="py-5 bg-light">
  <div class="container">
    <h2 class="text-center mb-4">Actualités</h2>
    <div class="row g-4 justify-content-center">

      <!-- une carte -->
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <img src="assets/images/affiche1.jpg" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">Stage U13 / U15</h5>
            <p class="card-text">Du 2 au 6 mars au gymnase. Inscriptions ouvertes !</p>
          </div>
        </div>
      </div>
      <!-- /une carte -->

    </div>
  </div>
</section>
```

✅ Les cartes ont déjà l'ombre, les coins arrondis et l'effet de survol.
Une carte sans image ? Supprime simplement la ligne `<img …>`.

---

## 4. 🔘 Boutons

> Pour un appel à l'action (lien vers un formulaire, une page…).

```html
<!-- Bouton orange (mise en avant) -->
<a href="#" class="btn btn-accent">Je m'inscris</a>

<!-- Bouton marine (secondaire) -->
<a href="contact.html" class="btn-blue">Nous contacter</a>
```

Pour centrer un bouton :

```html
<div class="text-center my-4">
  <a href="#" class="btn btn-accent">Mon bouton</a>
</div>
```

---

## 5. 🚨 Un bandeau d'annonce (mise en avant)

> Pour un message important (date limite, info ponctuelle…).

```html
<section class="py-4">
  <div class="container">
    <div class="alert alert-info text-center mb-0">
      <strong>Info :</strong> Les inscriptions ferment le 15 septembre !
    </div>
  </div>
</section>
```

---

## 6. ➕ Ajouter un sponsor (automatique)

Dans [partenaire.html](partenaire.html), repère le tableau `sponsors` (vers le bas
du fichier) et ajoute **une ligne** :

```js
const sponsors = [
    { name: 'Avenue Immobilier', logo: 'assets/images/sponsor1.png', url: 'https://...' },
    { name: 'Mcdonalds Le Crès',  logo: 'assets/images/sponsor2.jpg', url: 'https://...' },

    // 👇 nouveau sponsor : ajoute juste cette ligne
    { name: 'Nouveau Sponsor', logo: 'assets/images/sponsorX.png', url: 'https://...' },
];
```

> Le logo (`sponsorX.png`) doit être déposé dans `assets/images/`.
> Pas d'URL ? Mets `url: ''` et la carte ne sera pas cliquable.

---

## 7. 💶 Ajouter une ligne au tableau des tarifs

Dans [index.html](index.html), dans le tableau `table-tarifs`, ajoute une ligne :

```html
<tr>
  <td>Nouvelle catégorie</td>
  <td>2006-2007</td>
  <td>200€</td>
</tr>
```

---

## 🎨 Aide-mémoire : couleurs & classes utiles

Les couleurs sont des **variables** (définies dans [css/styles.css](css/styles.css)).
Tu peux les réutiliser dans un style, ex. `style="color: var(--orange-500)"` :

| Variable            | Couleur            |
|---------------------|--------------------|
| `--navy-700`        | bleu marine (principal) |
| `--orange-500`      | orange (accent)    |
| `--sky-500`         | bleu ciel          |
| `--color-muted`     | gris texte         |

Classes prêtes à l'emploi :

| Classe              | Effet                                   |
|---------------------|-----------------------------------------|
| `page-title`        | grand titre de page centré + trait orange |
| `btn btn-accent`    | bouton orange                           |
| `btn-blue`          | bouton marine (contour au survol)       |
| `card`              | carte blanche (ombre + survol)          |
| `img-fluid rounded shadow` | image responsive arrondie + ombre |
| `py-5` / `py-4`     | espace vertical (haut + bas)            |
| `text-center`       | centre le texte                         |
| `container`         | bloc centré avec marges                 |
| `row` + `col-*`     | grille (colonnes) — voir Bootstrap      |

---

## 👀 Tester avant de publier

1. Lance un petit serveur local depuis le dossier du projet :
   ```bash
   python3 -m http.server 8000
   ```
2. Ouvre **http://127.0.0.1:8000** dans ton navigateur.
3. Si tu modifies un fichier, recharge avec **Ctrl + Shift + R** (vide le cache).

---

> 💡 Besoin d'un bloc qui n'est pas listé ici (carrousel, vidéo, carte Google Maps…) ?
> Demande, on l'ajoute à ce mémo.
