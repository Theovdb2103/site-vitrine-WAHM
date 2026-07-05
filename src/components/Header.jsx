import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sun, Moon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { NAV_KEYS, ROUTE_CTA, getRouteConfig, getMarketplaceUrl, localizedPath, toDefaultPath } from '../lib/site'
import { LOCALE_LABELS } from '../i18n/locales'
import { Action } from './ui/Frame'
import Flag from './ui/Flag'

function NavLink({ to, active, onClick, children, className = '' }) {
  const base = 'font-display text-[13px] font-bold uppercase tracking-[0.01em] no-underline transition-colors duration-200 hover:text-wahm-goldLight'
  const color = active ? 'text-wahm-goldLight' : 'text-fg'
  // Lien externe (http) → nouvel onglet, pour ne jamais quitter le site vitrine
  // (évite la perte d'état du thème au retour en arrière, cf. bfcache).
  if (/^https?:/.test(to)) {
    return <a href={to} onClick={onClick} target="_blank" rel="noopener noreferrer" className={`${base} ${color} ${className}`}>{children}</a>
  }
  if (/^#/.test(to)) {
    return <a href={to} onClick={onClick} className={`${base} ${color} ${className}`}>{children}</a>
  }
  return <Link to={to} onClick={onClick} className={`${base} ${color} ${className}`}>{children}</Link>
}

// Bouton de bascule de thème (soleil/lune). Affiche l'icône de la cible :
// en sombre → soleil (passer en clair) ; en clair → lune (passer en sombre).
const THEME_BTN = 'flex items-center justify-center border border-line/[0.18] text-fg-soft transition-colors hover:border-line/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight'
function ThemeToggle({ className = '' }) {
  const { t } = useTranslation('common')
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? t('header.theme.toggleToDark') : t('header.theme.toggleToLight')}
      aria-pressed={isLight}
      className={`${THEME_BTN} ${className}`}
    >
      {isLight
        ? <Moon className="h-[16px] w-[16px]" strokeWidth={1.9} aria-hidden="true" />
        : <Sun className="h-[16px] w-[16px]" strokeWidth={1.9} aria-hidden="true" />}
    </button>
  )
}

// Nav desktop sans-serif gras (typo de la nouvelle DA) avec l'animation de survol WAHM :
// un remplissage orange monte depuis le haut + bordures haut/bas qui se resserrent, le
// texte passe en bleu nuit. L'item actif reste en or.
function NavItem({ to, active, children }) {
  const inner = (
    <>
      <span className={`relative z-10 block whitespace-nowrap px-3 py-2 font-display text-[13px] font-bold uppercase tracking-[0.01em] transition-colors duration-300 group-hover:text-wahm-navy ${active ? 'text-wahm-goldLight' : 'text-fg'}`}>
        {children}
      </span>
      {/* Bordures haut & bas qui se resserrent */}
      <span aria-hidden="true" className="absolute inset-0 origin-center scale-y-[2] border-y-2 border-wahm-orange opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100" />
      {/* Remplissage qui monte depuis le haut */}
      <span aria-hidden="true" className="absolute left-0 top-[2px] h-full w-full origin-top scale-0 bg-wahm-orange opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
    </>
  )
  const cls = 'group relative inline-block no-underline'
  if (/^https?:/.test(to)) return <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  if (/^#/.test(to)) return <a href={to} className={cls}>{inner}</a>
  return <Link to={to} className={cls}>{inner}</Link>
}

// Lien dans un menu déroulant (survol orange, texte navy).
function DropLink({ to, active, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block whitespace-nowrap px-4 py-2.5 font-display text-[12.5px] font-bold uppercase tracking-[0.02em] no-underline transition-colors duration-150 hover:bg-wahm-orange hover:text-wahm-navy focus:outline-none focus-visible:bg-wahm-orange focus-visible:text-wahm-navy ${active ? 'text-wahm-goldLight' : 'text-fg-soft'}`}
    >
      {children}
    </Link>
  )
}

// Item « FAQ » avec dropdown : Apprenant (parcours apprenant) + Formateur.
// Accessible au clavier et au tactile : déclencheur <button aria-expanded>, ouverture
// au survol (souris) ou au clic/Entrée (clavier/tactile), fermeture sur Échap ou quand
// le focus quitte le groupe.
function FaqMenu({ navKey, locale }) {
  const { t } = useTranslation('common')
  const active = navKey === 'faq' || navKey === 'comment-ca-marche'
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  // Ferme quand le focus sort du groupe (navigation clavier vers un autre élément).
  const handleBlur = (e) => {
    if (!wrapRef.current?.contains(e.relatedTarget)) setOpen(false)
  }

  return (
    <div
      ref={wrapRef}
      className="relative flex h-[72px] items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
      onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false) }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex select-none items-center gap-1.5 px-3 py-2 font-display text-[13px] font-bold uppercase tracking-[0.01em] transition-colors duration-200 hover:text-wahm-goldLight focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight ${active || open ? 'text-wahm-goldLight' : 'text-fg'}`}
      >
        {t('header.faqMenu.label')}
        <span aria-hidden="true" className={`text-[8px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <div className={`absolute left-0 top-full z-[210] transition-all duration-200 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="min-w-[210px] border border-line/[0.1] bg-surface p-1.5 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.85)]">
          <DropLink to={localizedPath('/comment-ca-marche', locale)} active={navKey === 'comment-ca-marche'} onClick={() => setOpen(false)}>{t('header.faqMenu.learner')}</DropLink>
          <DropLink to={localizedPath('/faq', locale)} active={navKey === 'faq'} onClick={() => setOpen(false)}>{t('header.faqMenu.trainer')}</DropLink>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const { t } = useTranslation('common')
  const { pathname } = useLocation()
  const { locale, openOverlay } = useLanguage()
  const flagCode = LOCALE_LABELS[locale]?.flag || 'FR'
  const defaultPath = toDefaultPath(pathname, locale)
  const { navKey } = getRouteConfig(defaultPath)
  const ctaConf = ROUTE_CTA[defaultPath] || ROUTE_CTA['/']
  const cta = {
    label: t(`cta.${ctaConf.ctaKey}`),
    to: ctaConf.to.startsWith('/') ? localizedPath(ctaConf.to, locale) : ctaConf.to,
  }
  const nav = NAV_KEYS.map((item) => ({
    key: item.key,
    label: t(`nav.${item.key}`),
    to: item.marketplace ? getMarketplaceUrl(locale) : localizedPath(item.to, locale),
  }))
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])
  // Empêche le scroll de la page pendant que l'overlay plein écran est ouvert.
  useEffect(() => {
    if (!menuOpen) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-[200] flex h-[72px] items-stretch bg-surface">
      {/* Barre principale — contenu centré + CTA qui borde le bord droit de l'écran */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-5 md:px-10">
        <Link to={localizedPath('/', locale)} className="flex shrink-0 items-center" aria-label={t('header.homeAriaLabel')}>
          <img src="/assets/wahm-logo.png" alt="WAHM" className="block h-[32px] w-auto shrink-0 md:h-[38px]" />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {nav.filter((item) => item.key !== 'devenir-formateur' && item.key !== 'comment-ca-marche').map((item) => (
            item.key === 'faq'
              ? <FaqMenu key="faq" navKey={navKey} locale={locale} />
              : <NavItem key={item.key} to={item.to} active={navKey === item.key}>{item.label}</NavItem>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          {/* Mise en évidence : contour orange, fond transparent → fond orange au survol */}
          <Link
            to={localizedPath('/devenir-formateur', locale)}
            className="whitespace-nowrap border border-wahm-orange bg-transparent px-4 py-[9px] font-display text-[12px] font-bold uppercase tracking-[0.05em] text-fg no-underline transition-colors duration-200 hover:bg-wahm-orange hover:text-wahm-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight"
          >
            {t('nav.devenir-formateur')}
          </Link>
          <button
            type="button"
            onClick={openOverlay}
            className="flex items-center gap-2 border border-line/[0.18] px-[13px] py-[9px] font-mono text-[12px] uppercase tracking-[0.1em] text-fg-soft transition-colors hover:border-line/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight"
            aria-label={t('header.languageAriaLabel')}
          >
            <Flag code={flagCode} className="h-[13px] w-[19px]" />
            {locale.toUpperCase()}
            <span className="text-[9px] text-subtle" aria-hidden="true">▼</span>
          </button>
          <ThemeToggle className="px-[11px] py-[9px]" />
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-line/[0.18] text-fg-soft lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight"
          aria-label={menuOpen ? t('header.menu.close') : t('header.menu.open')}
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

      {/* CTA plein cadre, accolé au bord droit de l'écran (façon "Get in Touch") —
          même animation « slide-up reveal » que les boutons Action du reste du site.
          Reveal navy + texte blanc = interaction signature, constante dans les 2 thèmes. */}
      {/^https?:/.test(cta.to) ? (
        <a href={cta.to} target="_blank" rel="noopener noreferrer" className="group relative hidden shrink-0 overflow-hidden border-b-2 border-l-2 border-wahm-orange lg:flex">
          <span className="inline-flex h-full w-full translate-y-0 items-center justify-center gap-2 whitespace-nowrap bg-wahm-orange px-9 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white transition duration-500 group-hover:-translate-y-[150%]">
            {cta.label}
          </span>
          <span aria-hidden="true" className="absolute inset-0 inline-flex h-full w-full translate-y-[105%] items-center justify-center gap-2 whitespace-nowrap bg-wahm-navy px-9 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white transition duration-500 ease-out group-hover:translate-y-0">
            {cta.label}
          </span>
        </a>
      ) : /^#/.test(cta.to) ? (
        <a href={cta.to} className="group relative hidden shrink-0 overflow-hidden border-b-2 border-l-2 border-wahm-orange lg:flex">
          <span className="inline-flex h-full w-full translate-y-0 items-center justify-center gap-2 whitespace-nowrap bg-wahm-orange px-9 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white transition duration-500 group-hover:-translate-y-[150%]">
            {cta.label}
          </span>
          <span aria-hidden="true" className="absolute inset-0 inline-flex h-full w-full translate-y-[105%] items-center justify-center gap-2 whitespace-nowrap bg-wahm-navy px-9 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white transition duration-500 ease-out group-hover:translate-y-0">
            {cta.label}
          </span>
        </a>
      ) : (
        <Link to={cta.to} className="group relative hidden shrink-0 overflow-hidden border-b-2 border-l-2 border-wahm-orange lg:flex">
          <span className="inline-flex h-full w-full translate-y-0 items-center justify-center gap-2 whitespace-nowrap bg-wahm-orange px-9 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white transition duration-500 group-hover:-translate-y-[150%]">
            {cta.label}
          </span>
          <span aria-hidden="true" className="absolute inset-0 inline-flex h-full w-full translate-y-[105%] items-center justify-center gap-2 whitespace-nowrap bg-wahm-navy px-9 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white transition duration-500 ease-out group-hover:translate-y-0">
            {cta.label}
          </span>
        </Link>
      )}

      {/* Overlay mobile plein écran — tous les liens du menu, à plat, comme sur desktop */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[72px] bottom-0 z-[199] flex flex-col overflow-y-auto bg-surface px-5 py-6 lg:hidden"
        >
          <nav className="flex flex-col">
            {nav.map((item) => (
              <NavLink key={item.key} to={item.to} active={navKey === item.key} onClick={() => setMenuOpen(false)} className="border-b border-line/[0.06] py-4 text-[16px]">
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { openOverlay(); setMenuOpen(false) }}
                className="flex flex-1 items-center justify-center gap-2 border border-line/[0.18] px-[13px] py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-fg-soft"
              >
                <Flag code={flagCode} className="h-[14px] w-[20px]" />
                {locale.toUpperCase()}
                <span className="text-[10px] text-subtle" aria-hidden="true">▼</span>
              </button>
              <ThemeToggle className="px-4 py-3" />
            </div>
            <Action to={cta.to} size="sm" arrow onClick={() => setMenuOpen(false)}>{cta.label}</Action>
          </div>
        </div>
      )}
    </header>
  )
}
