import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'wahm_theme'

// Résout le thème initial côté client : choix mémorisé sinon préférence système.
// (SSG-safe : appelé uniquement dans useEffect, jamais au rendu statique.)
function resolveInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch (e) { /* localStorage indisponible */ }
  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  } catch (e) { /* matchMedia indisponible */ }
  return 'dark'
}

export function ThemeProvider({ children }) {
  // null au rendu statique (le script anti-FOUC d'index.html a déjà posé data-theme) ;
  // valeur réelle lue en useEffect côté client → pas de mismatch d'hydratation.
  const [theme, setThemeState] = useState(null)

  useEffect(() => {
    const initial = resolveInitialTheme()
    setThemeState(initial)
    document.documentElement.dataset.theme = initial

    // Suit les changements système tant qu'aucun choix manuel n'est enregistré.
    let mql
    const onSystemChange = (e) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return
      } catch (err) { /* noop */ }
      const next = e.matches ? 'light' : 'dark'
      setThemeState(next)
      document.documentElement.dataset.theme = next
    }
    try {
      mql = window.matchMedia('(prefers-color-scheme: light)')
      mql.addEventListener('change', onSystemChange)
    } catch (e) { /* noop */ }
    return () => {
      try { mql?.removeEventListener('change', onSystemChange) } catch (e) { /* noop */ }
    }
  }, [])

  const setTheme = (next) => {
    setThemeState(next)
    document.documentElement.dataset.theme = next
    try { localStorage.setItem(STORAGE_KEY, next) } catch (e) { /* noop */ }
  }
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const value = { theme, setTheme, toggleTheme }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
