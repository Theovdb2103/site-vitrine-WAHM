import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import { LOCALES, DEFAULT_LOCALE } from './i18n/locales'

// Chaque page est chargée à la demande (convention `lazy` de React Router, prise en
// charge nativement par vite-react-ssg : les routes correspondantes sont résolues au
// prérendu ET avant l'hydratation côté client, donc sans écart d'hydratation).
// Sans ça, le code des 8 pages part dans un seul fichier livré à chaque visite.
const lazyPage = (loader) => () => loader().then((m) => ({ Component: m.default }))

// `entry` = clé du manifeste Vite de la page. vite-react-ssg s'en sert pour émettre le
// <link modulepreload> du chunk dans le HTML prérendu : sans lui, le navigateur ne
// découvre le chunk de page qu'après avoir exécuté le bundle principal (cascade).
//
// Une seule liste de pages, partagée par toutes les langues — ajouter une langue
// future = ajouter une entrée dans src/i18n/locales.js, pas ici.
const PAGE_ROUTES = [
  { path: '', file: 'Accueil', lazy: lazyPage(() => import("./pages/Accueil.jsx")) },
  { path: 'devenir-formateur', file: 'DevenirFormateur', lazy: lazyPage(() => import("./pages/DevenirFormateur.jsx")) },
  { path: 'a-propos', file: 'APropos', lazy: lazyPage(() => import("./pages/APropos.jsx")) },
  { path: 'comment-ca-marche', file: 'CommentCaMarche', lazy: lazyPage(() => import("./pages/CommentCaMarche.jsx")) },
  { path: 'communaute', file: 'Communaute', lazy: lazyPage(() => import("./pages/Communaute.jsx")) },
  { path: 'contact', file: 'Contact', lazy: lazyPage(() => import("./pages/Contact.jsx")) },
  { path: 'faq', file: 'FAQ', lazy: lazyPage(() => import("./pages/FAQ.jsx")) },
  { path: 'mentions-legales', file: 'MentionsLegales', lazy: lazyPage(() => import("./pages/MentionsLegales.jsx")) },
]

// NotFound reste chargée d'emblée : minuscule, et doit rester résolvable
// immédiatement pour la route attrape-tout.
const buildChildren = () =>
  [
    ...PAGE_ROUTES.map(({ path, file, lazy }) => {
      const route = { lazy, entry: `src/pages/${file}.jsx` }
      return path === '' ? { index: true, ...route } : { path, ...route }
    }),
    { path: '*', element: <NotFound /> },
  ]

export const routes = [
  {
    path: '/',
    element: <Layout key={DEFAULT_LOCALE} locale={DEFAULT_LOCALE} />,
    entry: 'src/components/Layout.jsx',
    children: buildChildren(),
  },
  ...LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
    path: `/${locale}`,
    element: <Layout key={locale} locale={locale} />,
    entry: 'src/components/Layout.jsx',
    children: buildChildren(),
  })),
]
