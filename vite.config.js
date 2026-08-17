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

export default defineConfig({
  plugins: [react()],
  base: '/',
  ssgOptions: {
    onPageRendered: (_route, html) =>
      html.replace(FONT_PRELOAD_RE, (tag) => (KEEP_FONT_PRELOAD.test(tag) ? tag : '')),
  },
})
