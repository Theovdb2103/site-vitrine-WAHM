import Seo from './Seo'
import { useLanguage } from '../context/LanguageContext'

// Racine de chaque page : métadonnées SEO + contenu.
// La transition d'entrée/sortie est gérée globalement par le Layout (AnimatePresence keyé par route).
// `path` (alias `pathKey`) est le chemin par défaut (non préfixé, ex. "/contact") — la
// locale active est lue via useLanguage(), Seo calcule le préfixe + les hreflang.
export default function Page({ title, description, path, pathKey, children }) {
  const { locale } = useLanguage()
  return (
    <>
      {title && <Seo title={title} description={description} pathKey={pathKey ?? path} locale={locale} />}
      {children}
    </>
  )
}
