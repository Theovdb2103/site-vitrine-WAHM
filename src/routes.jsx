import Layout from './components/Layout'
import Accueil from './pages/Accueil'
import DevenirFormateur from './pages/DevenirFormateur'
import APropos from './pages/APropos'
import CommentCaMarche from './pages/CommentCaMarche'
import Communaute from './pages/Communaute'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import MentionsLegales from './pages/MentionsLegales'
import NotFound from './pages/NotFound'
import { LOCALES, DEFAULT_LOCALE } from './i18n/locales'

// Une seule liste de pages, partagée par toutes les langues — ajouter une langue
// future = ajouter une entrée dans src/i18n/locales.js, pas ici.
const PAGE_ROUTES = [
  { path: '', element: <Accueil /> },
  { path: 'devenir-formateur', element: <DevenirFormateur /> },
  { path: 'a-propos', element: <APropos /> },
  { path: 'comment-ca-marche', element: <CommentCaMarche /> },
  { path: 'communaute', element: <Communaute /> },
  { path: 'contact', element: <Contact /> },
  { path: 'faq', element: <FAQ /> },
  { path: 'mentions-legales', element: <MentionsLegales /> },
]

const buildChildren = () => [
  ...PAGE_ROUTES.map(({ path, element }) => (path === '' ? { index: true, element } : { path, element })),
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
