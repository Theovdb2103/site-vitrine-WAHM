import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

export const LANGS = [
  { code: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'PT', flag: '🇵🇹', name: 'Português' },
  { code: 'IT', flag: '🇮🇹', name: 'Italiano' },
]

const LABELS = { FR: '🇫🇷 FR', EN: '🇬🇧 EN', ES: '🇪🇸 ES', DE: '🇩🇪 DE', PT: '🇵🇹 PT', IT: '🇮🇹 IT' }

export function LanguageProvider({ children }) {
  // SSR/SSG-safe : valeurs par défaut au rendu statique (pas d'accès localStorage/window ici),
  // puis lecture réelle dans useEffect côté client (évite tout mismatch d'hydratation).
  const [lang, setLang] = useState(null)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    // Lien partageable ?lang=FR : présélectionne la langue et saute l'overlay.
    let fromUrl = null
    try {
      const p = new URLSearchParams(window.location.search).get('lang')
      if (p && LANGS.some((l) => l.code === p.toUpperCase())) fromUrl = p.toUpperCase()
    } catch (e) { /* noop */ }
    let stored = null
    try {
      stored = localStorage.getItem('wahm_lang')
    } catch (e) { /* localStorage indisponible */ }
    const chosen = fromUrl || stored
    if (chosen) {
      setLang(chosen)
      if (fromUrl) { try { localStorage.setItem('wahm_lang', fromUrl) } catch (e) { /* noop */ } }
    } else {
      setShowOverlay(true)
    }
  }, [])

  // Verrouille le scroll du body quand l'overlay est ouvert.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = showOverlay ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showOverlay])

  const chooseLang = (code) => {
    try { localStorage.setItem('wahm_lang', code) } catch (e) { /* noop */ }
    setLang(code)
    setShowOverlay(false)
  }
  const openOverlay = () => setShowOverlay(true)
  const closeOverlay = () => setShowOverlay(false)

  const langLabel = (LABELS[lang] || LABELS.FR) + '  ▾'

  const value = { lang, langLabel, showOverlay, chooseLang, openOverlay, closeOverlay }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
