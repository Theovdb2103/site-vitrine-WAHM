import { Head } from 'vite-react-ssg'
import { SITE_URL } from '../lib/site'

// Métadonnées par page. canonical/og:url ne sont émis QUE si SITE_URL est renseigné
// (bloqué tant que le domaine n'est pas confirmé).
export default function Seo({ title, description, path = '' }) {
  const canonical = SITE_URL ? SITE_URL.replace(/\/$/, '') + path : null
  return (
    <Head>
      <html lang="fr" />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta name="twitter:card" content="summary_large_image" />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
    </Head>
  )
}
