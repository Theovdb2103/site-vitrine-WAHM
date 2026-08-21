import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite-react-ssg précharge automatiquement TOUT fichier de police atteignable depuis
// l'entrée — soit les 12 sous-ensembles Unicode (latin, cyrillique, grec, vietnamien…)
// des polices variables. Un preload force le téléchargement sans tenir compte de
// l'unicode-range : les 12 fichiers partaient sur chaque page (434 Ko) au lieu des 2 ou
// 3 réellement nécessaires. On ne garde donc que le latin, seul sous-ensemble utilisé
// sur 100 % des routes et des langues (marque, navigation, pied de page) ; les autres
// restent découverts normalement via le CSS, qui applique bien l'unicode-range.
const KEEP_FONT_PRELOAD = /-latin-wght-normal-/
const FONT_PRELOAD_RE = /<link[^>]+rel="preload"[^>]+as="font"[^>]*>/g

// Même logique pour les modules volontairement différés (cobe, SDK EmailJS) : le
// préchargement automatique les téléchargeait dès l'affichage de la page, alors qu'ils
// ne servent qu'au scroll jusqu'au globe ou à l'envoi d'un formulaire. Le préchargement
// du chunk de la page, lui, est conservé (il évite une cascade au chargement).
const DEFERRED_PRELOAD_RE = /<link[^>]+rel="modulepreload"[^>]+href="[^"]*\/differe-[^"]*"[^>]*>/g

// Le préchargement automatique des images ignore <picture> : il émet un lien par
// variante importée (les 4 largeurs WebP + le JPEG de repli du héros, ~129 Ko) alors
// que le navigateur ne retiendra qu'un seul fichier — et pas même un de ceux-là, le
// format AVIF n'étant pas géré par ce préchargement. Tout était donc téléchargé en
// pure perte. La sélection revient à srcset/sizes, seuls capables d'arbitrer.
//
// Le logo est écarté pour une autre raison : l'élément LCP mesuré est un texte, pas une
// image. Le précharger revient à disputer la bande passante aux polices et au CSS dont
// ce texte dépend, alors qu'il est de toute façon découvert tôt (présent dans l'en-tête
// du HTML prérendu, donc chargé en priorité haute sans qu'on ait à l'exiger).
//
// Liste explicite plutôt que « toutes les images » : une future image réellement
// critique, préchargée volontairement, ne doit pas être neutralisée ici.
const IMAGE_PRELOAD_RE = /<link[^>]+rel="preload"[^>]+as="image"[^>]+href="[^"]*(?:hero-home-|wahm-logo-)[^"]*"[^>]*>/g

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Les fichiers générés par le build portent un hash de contenu et peuvent donc être
    // mis en cache indéfiniment ; ceux de public/ gardent un nom stable et ne le peuvent
    // pas. Les séparer dans /static permet de viser exactement les premiers dans les
    // en-têtes Cache-Control de vercel.json, sans risque de figer les seconds.
    assetsDir: 'static',
    rollupOptions: {
      output: {
        // Nommer ces chunks sert uniquement à les reconnaître pour retirer leur
        // préchargement ci-dessous — pas à regrouper des dépendances (le découpage
        // automatique de Rollup ne produit aucune duplication à corriger ici).
        manualChunks(id) {
          if (id.includes('node_modules/cobe')) return 'differe-globe'
          if (id.includes('node_modules/@emailjs')) return 'differe-emailjs'
        },
      },
    },
  },
  ssgOptions: {
    onPageRendered: (_route, html) =>
      html
        .replace(FONT_PRELOAD_RE, (tag) => (KEEP_FONT_PRELOAD.test(tag) ? tag : ''))
        .replace(DEFERRED_PRELOAD_RE, '')
        .replace(IMAGE_PRELOAD_RE, ''),
  },
})
