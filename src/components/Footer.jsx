import { Link } from 'react-router-dom'

// Lien de footer : couleur douce, survol doré.
function FLink({ to, children }) {
  const cls = 'font-sans text-[15px] text-[#aebccd] no-underline transition-colors duration-200 hover:text-wahm-orange'
  if (to.startsWith('#') || to.startsWith('mailto:') || to.startsWith('tel:')) {
    return <a href={to} className={cls}>{children}</a>
  }
  return <Link to={to} className={cls}>{children}</Link>
}

// 4 colonnes de liens (façon référence : Overview / Club / News / Contacts).
const COLS = [
  {
    title: 'Plateforme',
    links: [
      { label: 'Formations', to: '#marketplace' },
      { label: 'Comment ça marche', to: '/comment-ca-marche' },
      { label: 'Communauté', to: '/communaute' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', to: '/a-propos' },
      { label: 'Devenir formateur', to: '/devenir-formateur' },
      { label: 'FAQ formateurs', to: '/faq' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'CGU & CGV', to: '/mentions-legales' },
      { label: 'Confidentialité', to: '/mentions-legales' },
      { label: 'Cookies', to: '/mentions-legales' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'contact@wahm.com', to: 'mailto:contact@wahm.com' },
      { label: 'Nous contacter', to: '/contact' },
      { label: 'Support international 24/7', to: '/contact' },
    ],
  },
]

// Icônes réseaux en SVG inline (lucide n'inclut plus les marques).
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
  return (
    <footer className="relative border-t border-white/[0.1] bg-wahm-navyDark">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-12 px-5 py-[80px] md:px-10 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1.1fr] lg:gap-x-10">
        {/* Bloc marque (gauche) */}
        <div className="col-span-2 lg:col-span-1">
          <img src="/assets/wahm-logo.png" alt="WAHM" className="block h-[40px] w-auto" />
          <p className="mt-7 max-w-[300px] font-display text-[22px] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-white md:text-[26px]">
            Suivez le mouvement<span className="text-wahm-orange">.</span>
          </p>
          <div className="mt-7 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center border border-wahm-goldLight/35 text-[#d6e0ea] transition-colors duration-200 hover:border-wahm-orange hover:text-wahm-orange"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Colonnes de liens */}
        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="m-0 mb-5 font-display text-[14px] font-bold uppercase tracking-[0.06em] text-white md:text-[15px]">{col.title}</h4>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {col.links.map((l, i) => (
                <li key={i}><FLink to={l.to}>{l.label}</FLink></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Barre basse */}
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] px-5 py-6 md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6f8197]">© 2026 World Academy of Human Movement — WAHM</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6f8197]">
          Conçu par <a href="https://effiweb.be" target="_blank" rel="noopener noreferrer" className="text-wahm-goldLight no-underline transition-colors hover:text-wahm-orange">Effiweb</a>
        </span>
      </div>
    </footer>
  )
}
