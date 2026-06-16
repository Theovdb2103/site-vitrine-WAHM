import Seo from './Seo'

// Racine de chaque page : métadonnées SEO + contenu.
// La transition d'entrée/sortie est gérée globalement par le Layout (AnimatePresence keyé par route).
export default function Page({ title, description, path, children }) {
  return (
    <>
      {title && <Seo title={title} description={description} path={path} />}
      {children}
    </>
  )
}
