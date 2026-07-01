import { Head } from 'vite-react-ssg'
import { SITE_URL } from '../lib/site'
import { LOCALES, DEFAULT_LOCALE } from '../i18n/locales'

// Métadonnées par page. canonical/og:url/hreflang ne sont émis QUE si SITE_URL est
// renseigné (bloqué tant que le domaine n'est pas confirmé).
export default function Seo({ title, description, pathKey = '', locale = DEFAULT_LOCALE }) {
  const pathFor = (loc) => (loc === DEFAULT_LOCALE ? pathKey : `/${loc}${pathKey === '/' ? '' : pathKey}`)
  const canonical = SITE_URL ? SITE_URL.replace(/\/$/, '') + pathFor(locale) : null
  return (
    <Head>
      <html lang={locale} />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta name="twitter:card" content="summary_large_image" />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {SITE_URL && LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={SITE_URL.replace(/\/$/, '') + pathFor(l)} />
      ))}
      {SITE_URL && <link rel="alternate" hrefLang="x-default" href={SITE_URL.replace(/\/$/, '') + pathFor(DEFAULT_LOCALE)} />}
    </Head>
  )
}
