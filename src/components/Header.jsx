import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { NAV, getRouteConfig } from '../lib/site'
import { Action } from './ui/Frame'
import Flag from './ui/Flag'

function NavLink({ to, active, onClick, children, className = '' }) {
  const base = 'font-mono text-[12px] uppercase tracking-[0.14em] no-underline transition-colors duration-200 hover:text-wahm-goldLight'
  const color = active ? 'text-wahm-orange' : 'text-[#cdd8e4]'
  if (to.startsWith('#')) {
    return <a href={to} onClick={onClick} className={`${base} ${color} ${className}`}>{children}</a>
  }
  return <Link to={to} onClick={onClick} className={`${base} ${color} ${className}`}>{children}</Link>
}

// Nav desktop avec effet de survol « menu-hover » (DA WAHM) : au survol, un remplissage
// orange monte depuis le haut + bordures haut/bas qui se resserrent, et le texte passe
// en bleu nuit. Reproduit l'animation de référence en couleurs WAHM.
function NavItem({ to, active, children }) {
  const inner = (
    <>
      <span className={`relative z-10 block whitespace-nowrap px-3 py-2 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-300 group-hover:text-wahm-navy ${active ? 'text-wahm-orange' : 'text-[#cdd8e4]'}`}>
        {children}
      </span>
      {/* Bordures haut & bas qui se resserrent */}
      <span aria-hidden="true" className="absolute inset-0 origin-center scale-y-[2] border-y-2 border-wahm-orange opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100" />
      {/* Remplissage qui monte depuis le haut */}
      <span aria-hidden="true" className="absolute left-0 top-[2px] h-full w-full origin-top scale-0 bg-wahm-orange opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
    </>
  )
  const cls = 'group relative inline-block no-underline'
  if (to.startsWith('#')) return <a href={to} className={cls}>{inner}</a>
  return <Link to={to} className={cls}>{inner}</Link>
}

export default function Header() {
  const { pathname } = useLocation()
  const { lang, openOverlay } = useLanguage()
  const code = lang || 'FR'
  const { navKey, cta } = getRouteConfig(pathname)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-[200] bg-[rgba(10,26,47,0.88)] backdrop-blur-[12px]">
      {/* Bandeau supérieur technique */}
      <div className="hidden md:block">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-10 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7f93a8]">
          <span className="flex items-center gap-2"><span className="h-[6px] w-[6px] bg-wahm-orange" aria-hidden="true" />World Academy of Human Movement</span>
          <span>Santé · Sport · Performance · Bien-être</span>
        </div>
      </div>

      {/* Barre principale */}
      <div className="border-b border-white/[0.1]">
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between gap-3 px-5 md:px-10">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Accueil WAHM">
            <img src="/assets/wahm-logo.png" alt="WAHM" className="block h-[30px] w-auto shrink-0 md:h-[34px]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <NavItem key={item.key} to={item.to} active={navKey === item.key}>{item.label}</NavItem>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={openOverlay}
              className="flex items-center gap-2 border border-white/[0.18] px-[13px] py-[9px] font-mono text-[12px] uppercase tracking-[0.1em] text-[#cdd8e4] transition-colors hover:border-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight"
              aria-label="Changer de langue"
            >
              <Flag code={code} className="h-[13px] w-[19px]" />
              {code}
              <span className="text-[9px] text-[#7f93a8]" aria-hidden="true">▼</span>
            </button>
            <Action to={cta.to} size="sm" arrow>{cta.label}</Action>
          </div>

          {/* Burger mobile */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-white/[0.18] text-[#cdd8e4] lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-[14px] w-[20px]" aria-hidden="true">
              <span className={`absolute left-0 block h-[2px] w-full bg-current transition-all ${menuOpen ? 'top-[6px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-[6px] block h-[2px] w-full bg-current transition-all ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 block h-[2px] w-full bg-current transition-all ${menuOpen ? 'top-[6px] -rotate-45' : 'top-[12px]'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      {menuOpen && (
        <div id="mobile-menu" className="border-b border-white/[0.1] bg-[rgba(10,26,47,0.98)] px-5 py-4 backdrop-blur-[12px] lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <NavLink key={item.key} to={item.to} active={navKey === item.key} onClick={() => setMenuOpen(false)} className="border-b border-white/[0.06] py-3.5 text-[13px]">
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => { openOverlay(); setMenuOpen(false) }}
              className="flex w-full items-center justify-center gap-2 border border-white/[0.18] px-[13px] py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-[#cdd8e4]"
            >
              <Flag code={code} className="h-[14px] w-[20px]" />
              {code}
              <span className="text-[10px] text-[#7f93a8]" aria-hidden="true">▼</span>
            </button>
            <Action to={cta.to} size="sm" arrow onClick={() => setMenuOpen(false)}>{cta.label}</Action>
          </div>
        </div>
      )}
    </header>
  )
}
