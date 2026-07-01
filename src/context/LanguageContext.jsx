import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LOCALES, DEFAULT_LOCALE } from '../i18n/locales'
import { localizedPath, toDefaultPath } from '../lib/site'

const LanguageContext = createContext(null)

// `locale` vient de la route (prop fixée par src/routes.jsx) — c'est l'URL qui fait
// foi, jamais localStorage. localStorage.wahm_lang ne fait que SUIVRE l'URL visitée
// (pré-sélection de la modale de premier passage + mémoire pour un prochain visiteur
// sans préférence), il ne déclenche jamais de redirection silencieuse.
export function LanguageProvider({ locale, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    let stored = null
    try {
      stored = localStorage.getItem('wahm_lang')
    } catch (e) { /* localStorage indisponible */ }
    if (!stored) {
      setShowOverlay(true)
    } else if (stored !== locale) {
      try { localStorage.setItem('wahm_lang', locale) } catch (e) { /* noop */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  // Verrouille le scroll du body quand l'overlay est ouvert.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = showOverlay ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showOverlay])

  const chooseLang = (code) => {
    try { localStorage.setItem('wahm_lang', code) } catch (e) { /* noop */ }
    setShowOverlay(false)
    if (code !== locale && LOCALES.includes(code)) {
      const defaultPath = toDefaultPath(location.pathname, locale)
      navigate(localizedPath(defaultPath, code) + location.search + location.hash)
    }
  }
  const openOverlay = () => setShowOverlay(true)
  const closeOverlay = () => setShowOverlay(false)

  const value = { locale: locale || DEFAULT_LOCALE, showOverlay, chooseLang, openOverlay, closeOverlay }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
