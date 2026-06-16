import { Link } from 'react-router-dom'

function FLink({ to, children }) {
  const cls = 'font-sans text-[14px] text-[#9fb1c6] no-underline transition-colors duration-200 hover:text-wahm-goldLight'
  if (to.startsWith('#') || to.startsWith('mailto:')) {
    return <a href={to} className={cls}>{children}</a>
  }
  return <Link to={to} className={cls}>{children}</Link>
}

const COLS = [
  {
    title: 'Plateforme',
    links: [
      { label: 'Formations', to: '#marketplace' },
      { label: 'Comment ça marche', to: '/comment-ca-marche' },
      { label: 'Communauté', to: '/communaute' },
      { label: 'Connexion', to: '#marketplace' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', to: '/a-propos' },
      { label: 'Devenir formateur', to: '/devenir-formateur' },
      { label: 'FAQ formateurs', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'CGU', to: '/mentions-legales' },
      { label: 'CGV', to: '/mentions-legales' },
      { label: 'Confidentialité', to: '/mentions-legales' },
      { label: 'Cookies', to: '/mentions-legales' },
    ],
  },
]

const SOCIALS = [
  { label: 'LinkedIn', short: 'in' },
  { label: 'Instagram', short: 'ig' },
  { label: 'YouTube', short: 'yt' },
  { label: 'X', short: 'x' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-wahm-orange/60 bg-wahm-navyDark">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 py-[72px] sm:grid-cols-2 md:px-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <img src="/assets/wahm-logo.png" alt="WAHM" className="block h-[48px] w-auto" />
          <p className="mt-6 max-w-[300px] font-display text-[18px] font-extrabold uppercase leading-[1.15] tracking-[-0.01em] text-white">
            La connaissance n'a plus de frontières<span className="text-wahm-orange">.</span>
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7f93a8]">Suivez le mouvement</p>
          <div className="mt-3 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.short}
                href="#"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center border border-white/[0.14] font-mono text-[12px] font-semibold lowercase text-[#9fb1c6] no-underline transition-colors duration-200 hover:border-wahm-orange hover:text-wahm-orange"
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <div className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white">
              <span aria-hidden="true" className="h-[6px] w-[6px] bg-wahm-orange" />{col.title}
            </div>
            <div className="flex flex-col gap-3">
              {col.links.map((l, i) => <FLink key={i} to={l.to}>{l.label}</FLink>)}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-[14px] border-t border-white/[0.08] px-5 py-6 md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6f8197]">© 2026 World Academy of Human Movement — WAHM</span>
        <a href="mailto:contact@wahm.com" className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9fb1c6] no-underline transition-colors hover:text-wahm-goldLight">contact@wahm.com</a>
      </div>
    </footer>
  )
}
