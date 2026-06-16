import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll-to-top au changement de route ; scroll vers l'ancre si location.hash est présent.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (hash) {
      // Laisse le temps à la page (et à sa transition) de se monter avant de cibler l'ancre.
      const id = hash.replace('#', '')
      const t = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
