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

export const routes = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.jsx',
    children: [
      { index: true, element: <Accueil /> },
      { path: 'devenir-formateur', element: <DevenirFormateur /> },
      { path: 'a-propos', element: <APropos /> },
      { path: 'comment-ca-marche', element: <CommentCaMarche /> },
      { path: 'communaute', element: <Communaute /> },
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'mentions-legales', element: <MentionsLegales /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
