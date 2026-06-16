import { Check } from 'lucide-react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { GhostNumber } from '../components/ui/Kinetic'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif, Shot, TiltCard } from '../components/ui/Frame'
import { getRouteConfig } from '../lib/site'

// Les six grands domaines d'expertise (puces de la section Mission).
const DOMAINES = [
  'Coaching sportif & Personal Training',
  'Santé & Rééducation – biomécanique',
  'Préparation physique multisports',
  'Yoga & Pilates – Zen training',
  'Neurotraining & sciences du mouvement',
  'Développement personnel & Mental Coaching',
]

// Critères stricts de sélection des formations.
const CRITERES = [
  'Pertinence scientifique',
  'Clarté pédagogique',
  'Applicabilité immédiate',
  'Originalité du contenu',
  'Qualité audiovisuelle',
  'Accessibilité multilingue',
]

// Profils de la communauté WAHM (libellé + photo).
const COMMUNAUTE = [
  { label: 'Coachs sportifs', img: '/assets/media/profil-coachs.webp' },
  { label: 'Thérapeutes & professionnels de santé', img: '/assets/media/profil-therapeutes.webp' },
  { label: 'Préparateurs physiques', img: '/assets/media/profil-preparateurs.webp' },
  { label: 'Instructeurs Pilates & Yoga', img: '/assets/media/profil-instructeurs.webp' },
  { label: 'Étudiants en sciences du sport', img: '/assets/media/profil-etudiants.webp' },
  { label: 'Experts du développement humain', img: '/assets/media/profil-experts.webp' },
]

// Engagements numérotés.
const ENGAGEMENTS = [
  'Proposer uniquement des contenus de haute qualité.',
  "Garantir une expérience d'apprentissage fluide, accessible et multilingue.",
  "Réunir une communauté mondiale d'experts.",
  'Aider chaque utilisateur à développer une expertise solide, moderne et rentable.',
  'Soutenir la recherche et l’innovation dans le domaine du mouvement humain.',
]

// Raisons d'exister (cartes « Mieux que… »).
const POURQUOI = [
  'Mieux que des formations génériques',
  'Mieux que du contenu amateur',
  'Mieux que des plateformes sans exigence',
]

const SECTION = 'border-b border-white/[0.08] bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1240px] px-5 md:px-10'

export default function APropos() {
  const meta = getRouteConfig('/a-propos')
  return (
    <Page title={meta.title} description={meta.description} path="/a-propos">

      {/* ===== HERO ===== */}
      <Reveal as="section" className="border-b border-white/[0.08] bg-wahm-navy pt-[120px] md:pt-[150px]">
        <div className={WRAP}>
          <div className="relative grid border-l border-t border-white/[0.08] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative border-b border-r border-white/[0.08] p-7 py-12 md:p-12 md:py-16">
              <CornerTicks />
              <Label>À propos</Label>
              <h1 className="mt-7 max-w-[920px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[60px]">
                World Academy of Human Movement<span className="text-wahm-orange">.</span>
              </h1>
              <p className="mt-6 max-w-[560px] font-display text-[18px] font-semibold uppercase tracking-[0.01em] text-wahm-goldLight md:text-[21px]">
                L'excellence mondiale au service de votre évolution.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Action to="#marketplace" variant="filled" arrow>Découvrir la plateforme</Action>
                <Action to="/communaute" variant="outline">Rejoindre la communauté WAHM</Action>
              </div>
            </div>
            <div className="relative border-b border-r border-white/[0.08]">
              <CornerTicks />
              <Shot src="/assets/media/apropos-hero.webp" alt="World Academy of Human Movement" className="h-full min-h-[260px] w-full" corners />
              <Motif color="rgba(255,123,44,0.95)" cols={5} rows={3} className="pointer-events-none absolute bottom-5 left-5 hidden w-[150px] md:grid" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== NOTRE VISION ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={`${WRAP} grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <Label>Notre vision</Label>
            <h2 className="mt-5 font-display text-[28px] font-extrabold uppercase leading-[1.04] tracking-[-0.015em] text-white sm:text-[36px]">
              La connaissance a le pouvoir de transformer des vies<span className="text-wahm-orange">.</span>
            </h2>
            <p className="mt-6 font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
              Chez World Academy of Human Movement (WAHM), nous croyons que la connaissance a le pouvoir de transformer des vies.
            </p>
            <p className="mt-[18px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
              Dans un monde où les approches du mouvement humain évoluent sans cesse, nous avons une mission claire : rendre accessible, partout, l'expertise la plus avancée en santé, bien-être et performance.
            </p>
            <p className="mt-[18px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
              WAHM est née d'un constat simple : les meilleures formations sont souvent dispersées, inégales en qualité, parfois inaccessibles à cause de la langue ou de barrières géographiques. <strong className="text-[#cdd8e4]">Nous avons décidé de changer cela.</strong>
            </p>
          </div>
          <Framed className="relative flex items-center justify-center bg-wahm-navyDark p-6 md:p-10">
            <Shot src="/assets/media/apropos-vision.webp" alt="La vision WAHM du mouvement humain" className="aspect-square w-full max-w-[320px]" corners />
          </Framed>
        </div>
      </Reveal>

      {/* ===== NOTRE MISSION ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Notre mission">
            Réunir les formateurs les plus influents et les contenus les plus innovants du monde
          </SectionHead>
          <p className="mt-6 max-w-[760px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            Nous sélectionnons des experts reconnus dans six grands domaines :
          </p>

          {/* Six grands domaines — grille bordée signature */}
          <div className="mt-10 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINES.map((d, i) => (
              <TiltCard key={d} className="border-b border-r border-white/[0.08] p-7 md:p-8">
                <GhostNumber className="text-[40px]" stroke="rgba(255,123,44,0.28)">{String(i + 1).padStart(2, '0')}</GhostNumber>
                <p className="mt-5 font-display text-[15.5px] font-semibold uppercase leading-[1.3] tracking-[-0.005em] text-white">{d}</p>
              </TiltCard>
            ))}
          </div>

          <p className="mb-6 mt-12 max-w-[760px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            Chaque formation intégrée à WAHM répond à des critères stricts :
          </p>

          {/* Critères stricts — grille bordée signature */}
          <div className="grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {CRITERES.map((c) => (
              <TiltCard key={c} className="flex items-start gap-4 border-b border-r border-white/[0.08] p-7 md:p-8">
                <span className="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center bg-wahm-orange/15 text-wahm-orange"><Check className="h-[16px] w-[16px]" strokeWidth={2.6} aria-hidden="true" /></span>
                <span className="font-sans text-[15px] leading-[1.55] text-[#cdd8e4]">{c}</span>
              </TiltCard>
            ))}
          </div>

          {/* Conviction encadrée */}
          <Framed className="mt-12 bg-wahm-navyDark px-7 py-9 md:px-12 md:py-11" tickColor="text-wahm-orange/70">
            <p className="m-0 max-w-[920px] font-display text-[20px] font-bold leading-[1.3] text-white md:text-[24px]">
              Nous ne sommes pas une plateforme. <span className="text-wahm-goldLight">Nous sommes la référence mondiale en formation e-learning dédiée au mouvement humain.</span>
            </p>
          </Framed>
        </div>
      </Reveal>

      {/* ===== NOTRE COMMUNAUTÉ ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Notre communauté">
            Un écosystème d'échange, d'excellence et d'impact
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNAUTE.map((profil, i) => (
              <TiltCard key={profil.label} className="group border-b border-r border-white/[0.08]">
                <Shot src={profil.img} alt={profil.label} className="h-[200px] w-full" position="top" />
                <div className="flex items-center gap-3 p-6">
                  <span className="font-mono text-[11px] text-wahm-orange">{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-display text-[15px] font-semibold uppercase leading-[1.3] tracking-[-0.005em] text-white">{profil.label}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <p className="mt-8 font-sans text-[15.5px] text-[#9fb1c6]">
            Tous unis par une même ambition : <strong className="text-[#cdd8e4]">se former, progresser, transmettre.</strong>
          </p>
        </div>
      </Reveal>

      {/* ===== NOTRE ENGAGEMENT ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Notre engagement">Ce que nous vous garantissons</SectionHead>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.5fr] lg:gap-16">
            <div className="border-t border-white/[0.08]">
              {ENGAGEMENTS.map((txt, i) => (
                <div key={i} className="flex items-start gap-5 border-b border-white/[0.08] py-5 md:gap-7">
                  <span className="min-w-[34px] font-display text-[15px] font-black text-wahm-orange">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-sans text-[16px] leading-[1.5] text-[#cdd8e4] md:text-[16.5px]">{txt}</span>
                </div>
              ))}
            </div>
            <Framed className="relative hidden items-center justify-center bg-wahm-navyDark p-6 lg:flex">
              <Shot src="/assets/media/apropos-engagement.webp" alt="L'engagement WAHM" className="aspect-[2/3] w-full max-w-[200px]" corners />
            </Framed>
          </div>
        </div>
      </Reveal>

      {/* ===== POURQUOI NOUS EXISTONS ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Pourquoi nous existons">
            Parce que les professionnels d'aujourd'hui méritent mieux
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {POURQUOI.map((txt, i) => (
              <TiltCard key={txt} className="border-b border-r border-white/[0.08] p-7 md:p-8">
                <GhostNumber className="text-[40px]" stroke="rgba(255,123,44,0.28)">{String(i + 1).padStart(2, '0')}</GhostNumber>
                <p className="mt-5 font-display text-[17px] font-extrabold uppercase leading-[1.2] tracking-[-0.005em] text-wahm-orange">{txt}</p>
              </TiltCard>
            ))}
          </div>
          <p className="mt-8 max-w-[760px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            WAHM offre un accès direct aux meilleurs experts, formations et approches du monde, <strong className="text-[#cdd8e4]">sans compromis.</strong>
          </p>
        </div>
      </Reveal>

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section className="border-b border-white/[0.08] bg-wahm-navy py-16 md:py-[88px]">
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">Rejoignez-nous</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                Vous êtes coach, thérapeute, formateur ou passionné<span className="text-white"> ?</span>
              </h2>
              <p className="mt-5 max-w-[460px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">
                Bienvenue dans la première communauté mondiale dédiée au mouvement humain.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to="#marketplace" variant="dark" arrow>Découvrir la plateforme</Action>
                <Action to="/communaute" variant="outlineDark">Rejoindre la communauté WAHM</Action>
              </div>
            </div>
            <div className="relative hidden items-center justify-center border-l border-wahm-navy/15 p-10 md:flex">
              <Motif color="#0A1A2F" />
            </div>
          </div>
        </div>
      </section>

    </Page>
  )
}
