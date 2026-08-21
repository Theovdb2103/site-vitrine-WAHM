# Fichiers publics à nom stable

Ce dossier est servi tel quel : les fichiers gardent le nom qu'ils ont ici, sans
empreinte de contenu. Ils ne peuvent donc pas être mis en cache définitivement,
mais leur URL, elle, ne change jamais — c'est précisément ce qu'on attend de deux
d'entre eux.

- **`wahm-logo.png`** — utilisé uniquement par les modèles d'e-mail
  (`emailjs-templates/*.html`), qui pointent vers
  `https://site-vitrine-wahm.vercel.app/assets/wahm-logo.png`. Un e-mail déjà
  envoyé va rechercher cette image des mois plus tard : l'URL doit rester valable
  indéfiniment, ce qu'un nom haché ne garantit pas puisqu'il change à chaque
  build. **Le site lui-même n'utilise pas ce fichier** : l'en-tête, le pied de
  page et la modale de langue chargent `src/assets/wahm-logo.webp`, plus léger et
  servi avec un nom haché. Ne pas supprimer ce PNG en croyant qu'il fait doublon.

- **`wahm-mark.png`** — favicon déclaré dans `index.html`.
