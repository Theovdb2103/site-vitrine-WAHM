import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../context/LanguageContext'
import { getMarketplaceUrl, localizedPath } from '../lib/site'

// Lien de footer : couleur douce, survol doré.
function FLink({ to, children }) {
  const cls = 'font-sans text-[15px] text-muted no-underline transition-colors duration-200 hover:text-wahm-orange'
  if (/^https?:/.test(to)) {
    return <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  }
  if (/^(mailto:|tel:|#)/.test(to)) {
    return <a href={to} className={cls}>{children}</a>
  }
  return <Link to={to} className={cls}>{children}</Link>
}

// Structure des 4 colonnes — labels traduits via common.json (footer.columns[i].links[j]),
// `to` non traduisible reste ici, zippé par index avec le texte au rendu.
const COLS_META = [
  {
    links: [{ marketplace: true }, { to: '/comment-ca-marche' }, { to: '/communaute' }],
  },
  {
    links: [{ to: '/a-propos' }, { to: '/devenir-formateur' }, { to: '/faq' }],
  },
  {
    links: [{ to: '/mentions-legales' }, { to: '/mentions-legales' }, { to: '/mentions-legales' }, { to: '/mentions-legales' }],
  },
  {
    links: [{ to: 'mailto:contact@wahm.com' }, { to: '/contact' }, { to: '/contact' }],
  },
]

// Icônes réseaux en SVG inline (lucide n'inclut plus les marques) — noms de marque,
// non traduits.
const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h4v12H3zM10 9h3.8v1.6h.05c.53-.95 1.8-1.95 3.7-1.95 3.96 0 4.45 2.45 4.45 5.65V21h-4v-5.1c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.96 1.3-1.96 2.66V21h-4z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]">
        <path d="M17.5 3h3l-7.1 8.1L22 21h-6.3l-4.9-6.4L5 21H2l7.6-8.7L2 3h6.4l4.5 5.9zM16.4 19h1.7L7.7 4.9H5.9z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { t } = useTranslation('common')
  const { locale } = useLanguage()
  const columns = t('footer.columns', { returnObjects: true })

  return (
    <footer className="relative border-t border-line/[0.1] bg-surface-2">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-12 px-5 py-[80px] md:px-10 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1.1fr] lg:gap-x-10">
        {/* Bloc marque (gauche) */}
        <div className="col-span-2 lg:col-span-1">
          <img src="/assets/wahm-logo.png" alt="WAHM" className="block h-[40px] w-auto" />
          <p className="mt-7 max-w-[300px] font-display text-[22px] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-fg md:text-[26px]">
            {t('footer.tagline').replace(/\.$/, '')}<span className="text-wahm-orange">.</span>
          </p>
          <div className="mt-7 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center border border-wahm-goldLight/35 text-fg-soft transition-colors duration-200 hover:border-wahm-orange hover:text-wahm-orange"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Colonnes de liens */}
        {columns.map((col, i) => (
          <div key={col.title}>
            <h4 className="m-0 mb-5 font-display text-[14px] font-bold uppercase tracking-[0.06em] text-fg md:text-[15px]">{col.title}</h4>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {col.links.map((label, j) => {
                const meta = COLS_META[i].links[j]
                const to = meta.marketplace ? getMarketplaceUrl(locale) : (meta.to.startsWith('/') ? localizedPath(meta.to, locale) : meta.to)
                return <li key={j}><FLink to={to}>{label}</FLink></li>
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Barre basse */}
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 border-t border-line/[0.08] px-5 py-6 md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">{t('footer.copyright')}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
          {t('footer.credit')} <a href="https://effiweb.be" target="_blank" rel="noopener noreferrer" className="text-gold no-underline transition-colors hover:text-wahm-orange">Effiweb</a>
        </span>
      </div>

      {/* Typo géante WAHM — SVG textLength = 100% largeur garantie, fill=none = transparent */}
      <div className="select-none" aria-hidden="true">
        <svg
          viewBox="0 0 1000 230"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            style={{ fontFamily: "'General Sans', Montserrat, system-ui, sans-serif", fontWeight: 700 }}
            x="0"
            y="215"
            fontSize="230"
            fill="none"
            stroke="#D4A018"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
          >
            WAHM
          </text>
        </svg>
      </div>
    </footer>
  )
}
