import { Activity, Award, Brain, Check, Dumbbell, FlaskConical, Flower2, Globe2, GraduationCap, HeartPulse, Languages, TrendingUp, X } from 'lucide-react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import SectionOutro from '../components/SectionOutro'
import { GhostNumber } from '../components/ui/Kinetic'
import { Label, SectionHead, Action, ChevronDivider, Motif, TiltCard } from '../components/ui/Frame'
import { getRouteConfig } from '../lib/site'

// Photo Unsplash (nouvelles, hors bibliothèque locale) — cadrage portrait éditorial.
const UN = (id) => `https://images.unsplash.com/${id}?w=640&h=820&fit=crop&q=80&auto=format`

// Les six grands domaines d'expertise (cartes-photos de la section Mission).
const DOMAINES = [
  { title: 'Coaching sportif & Personal Training', img: UN('photo-1584466977773-e625c37cdd50'), pos: '50% 28%' },
  { title: 'Santé & Rééducation – biomécanique', img: UN('photo-1519823551278-64ac92734fb1'), pos: '50% 45%' },
  { title: 'Préparation physique multisports', img: UN('photo-1526506118085-60ce8714f8c5'), pos: '50% 35%' },
  { title: 'Yoga & Pilates – Zen training', img: UN('photo-1593164842264-854604db2260'), pos: '50% 42%' },
  { title: 'Neurotraining & sciences du mouvement', img: UN('photo-1526676317768-d9b14f15615a'), pos: '50% 38%' },
  { title: 'Développement personnel & Mental Coaching', img: UN('photo-1576005391034-242dd8f40823'), pos: '50% 35%' },
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

// Profils de la communauté WAHM (libellé + icône).
const COMMUNAUTE = [
  { icon: Dumbbell, label: 'Coachs sportifs' },
  { icon: HeartPulse, label: 'Thérapeutes & professionnels de santé' },
  { icon: Activity, label: 'Préparateurs physiques' },
  { icon: Flower2, label: 'Instructeurs Pilates & Yoga' },
  { icon: GraduationCap, label: 'Étudiants en sciences du sport' },
  { icon: Brain, label: 'Experts du développement humain' },
]

// Engagements WAHM (icône correspondant à la phrase + énoncé).
const ENGAGEMENTS = [
  { icon: Award, txt: 'Proposer uniquement des contenus de haute qualité' },
  { icon: Languages, txt: "Garantir une expérience d'apprentissage fluide, accessible et multilingue" },
  { icon: Globe2, txt: "Réunir une communauté mondiale d'experts" },
  { icon: TrendingUp, txt: 'Aider chaque utilisateur à développer une expertise solide, moderne et rentable' },
  { icon: FlaskConical, txt: "Soutenir la recherche et l'innovation dans le domaine du mouvement humain" },
]

// Piliers de la vision WAHM (grands titres contournés section « Notre vision »).
const PILIERS = [
  {
    titre: 'Accessibilité',
    texte: "Rendre accessible, partout, l'expertise la plus avancée en santé, bien-être et performance.",
  },
  {
    titre: 'Excellence',
    texte: 'Une sélection rigoureuse des meilleurs experts et formations, sans compromis sur la qualité.',
  },
  {
    titre: 'Communauté',
    texte: 'Une communauté mondiale unie par la même ambition : se former, progresser, transmettre.',
  },
]

// Raisons d'exister (cartes « Mieux que… »).
const POURQUOI = [
  'Mieux que des formations génériques',
  'Mieux que du contenu amateur',
  'Mieux que des plateformes sans exigence',
]

const SECTION = 'bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

export default function APropos() {
  const meta = getRouteConfig('/a-propos')
  return (
    <Page title={meta.title} description={meta.description} path="/a-propos">

      {/* ===== HERO (plein cadre, façon éditoriale) ===== */}
      <Reveal as="section" className="relative overflow-hidden bg-wahm-navy pt-[120px] md:pt-[150px]">
        <div className={`${WRAP} relative py-14 md:py-20`}>
          <Label>À propos</Label>
          <h1 className="mt-7 max-w-[920px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[58px]">
            World Academy of Human Movement<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-7 max-w-[560px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            L'excellence mondiale au service de votre évolution.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Action to="#marketplace" variant="filled" arrow>Découvrir la plateforme</Action>
            <Action to="/communaute" variant="outline">Rejoindre la communauté WAHM</Action>
          </div>
          <Motif color="#D4A018" cols={8} rows={5} size={40} gap={11} className="pointer-events-none absolute -bottom-2 right-0 hidden w-[270px] md:grid lg:w-[330px]" />
        </div>

        {/* Bandeau plein cadre — coupe diagonale or/orange vers la photo (la photo domine, comme la référence) */}
        <div className="relative h-[320px] w-full overflow-hidden md:h-[460px] lg:h-[620px]">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-wahm-gold to-wahm-orange" style={{ clipPath: 'polygon(0 0, 30% 0, 15% 100%, 0 100%)' }} />
          <img
            src="https://images.unsplash.com/photo-1544021601-3e5723f9d333?w=1800&h=1000&fit=crop&q=80&auto=format"
            alt="World Academy of Human Movement"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale-[35%]"
            style={{ clipPath: 'polygon(15% 100%, 30% 0, 100% 0, 100% 100%)' }}
          />
        </div>
      </Reveal>

      {/* ===== NOTRE VISION (label à gauche + grand titre à droite, façon référence) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr] lg:items-start lg:gap-28">
            <Label className="lg:self-start lg:pt-2">Notre vision</Label>
            <div>
              <h2 className="font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-white sm:text-[36px] md:text-[44px]">
                La connaissance a le pouvoir de transformer des vies<span className="text-wahm-orange">.</span>
              </h2>
              <p className="mt-6 font-sans text-[16px] leading-[1.7] text-[#9fb1c6] md:text-[17px]">
                Chez World Academy of Human Movement (WAHM), nous croyons que la connaissance a le pouvoir de transformer des vies. Dans un monde où les approches du mouvement humain évoluent sans cesse, notre mission est claire : <strong className="text-[#cdd8e4]">rendre accessible, partout, l'expertise la plus avancée en santé, bien-être et performance.</strong>
              </p>
            </div>
          </div>

          {/* Valeurs — grands titres en contour + description, séparés par des filets (façon référence) */}
          <div className="mt-14 border-t border-white/[0.1] lg:mt-20">
            {PILIERS.map(({ titre, texte }) => (
              <div key={titre} className="border-b border-white/[0.1] py-10 md:py-14">
                <h3
                  className="m-0 font-grotesk font-bold leading-[0.92] tracking-normal text-[clamp(42px,8.5vw,104px)]"
                  style={{ color: '#0A1A2F', WebkitTextStroke: '3px #FF7B2C', paintOrder: 'stroke' }}
                >
                  {titre}
                </h3>
                <p className="mt-5 max-w-[760px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6] md:mt-7 md:text-[17px]">
                  {texte}
                </p>
              </div>
            ))}
          </div>

          <SectionOutro>WAHM est née d'un constat simple : les meilleures formations sont souvent dispersées, inégales en qualité, parfois inaccessibles à cause de la langue ou de barrières géographiques. Nous avons décidé de changer cela.</SectionOutro>
        </div>
      </Reveal>

      <ChevronDivider className="py-2" />

      {/* ===== NOTRE MISSION ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          {/* En-tête deux colonnes — titre à gauche, intro à droite (façon « Our squad ») */}
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
            <div>
              <Label className="mb-4">Notre mission</Label>
              <h2 className="m-0 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-white sm:text-[36px] md:text-[44px]">
                Réunir, sur une seule plateforme, les formateurs les plus influents et les contenus les plus innovants du monde<span className="text-wahm-orange">.</span>
              </h2>
            </div>
            <p className="font-sans text-[16px] leading-[1.7] text-[#9fb1c6] lg:pb-2">
              Nous sélectionnons des experts reconnus dans les domaines suivants :
            </p>
          </div>

          {/* Six grands domaines — cartes-photos éditoriales (N&B → couleur au survol) */}
          <div className="mt-14 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINES.map((d, i) => (
              <article key={d.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-wahm-navyDark">
                  <img
                    src={d.img}
                    alt={d.title}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-[800ms] ease-out will-change-transform group-hover:scale-[1.05] group-hover:grayscale-0"
                    style={{ objectPosition: d.pos }}
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,26,47,0) 42%, rgba(6,18,31,0.78) 100%)' }} />
                  <GhostNumber className="absolute left-5 top-4 text-[46px]" stroke="rgba(255,123,44,0.6)">{String(i + 1).padStart(2, '0')}</GhostNumber>
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 border-b-2 border-r-2 border-wahm-goldLight/70" />
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <span aria-hidden="true" className="mt-[7px] h-[2px] w-7 shrink-0 bg-wahm-orange transition-all duration-300 group-hover:w-11" />
                  <h3 className="m-0 font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-white md:text-[20px]">{d.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <p className="mb-6 mt-12 max-w-[760px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            Chaque formation intégrée à WAHM répond à des critères stricts :
          </p>

          {/* Critères stricts — grille bordée compacte (check + libellé) */}
          <div className="grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {CRITERES.map((c) => (
              <TiltCard key={c} className="flex items-center gap-3 border-b border-r border-white/[0.08] p-5 md:p-6">
                <Check className="h-[17px] w-[17px] shrink-0 text-wahm-gold" strokeWidth={2.75} aria-hidden="true" />
                <span className="font-display text-[13.5px] font-bold uppercase leading-[1.25] tracking-[0.01em] text-white md:text-[14.5px]">{c}</span>
              </TiltCard>
            ))}
          </div>

          {/* Conviction — phrase de conclusion, même design que les autres fins de section */}
          <SectionOutro>Nous ne sommes pas une plateforme. Nous sommes la référence mondiale en formation e-learning dédiée au mouvement humain.</SectionOutro>
        </div>
      </Reveal>

      {/* ===== NOTRE COMMUNAUTÉ ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label="Notre communauté">
            WAHM est avant tout un écosystème d'échange, d'excellence et d'impact
          </SectionHead>
          <p className="mt-6 max-w-[760px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            WAHM fédère des :
          </p>
          {/* Profils — cartes (même design que « Notre vision ») */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3">
            {COMMUNAUTE.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col bg-wahm-orange/[0.07] p-10 md:p-12">
                <Icon className="h-10 w-10 text-wahm-goldLight" strokeWidth={1.8} aria-hidden="true" />
                <p className="mt-12 font-display text-[20px] font-extrabold uppercase leading-[1.15] tracking-[-0.01em] text-white md:text-[22px]">{label}</p>
              </div>
            ))}
          </div>
          <SectionOutro>Tous unis par une même ambition : se former, progresser, transmettre.</SectionOutro>
        </div>
      </Reveal>

      <ChevronDivider className="py-2" />

      {/* ===== NOTRE ENGAGEMENT ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          {/* Gauche : titre + liste empilés ; droite : photo de la section */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Label className="mb-5">Notre engagement</Label>
              <h2 className="m-0 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-white sm:text-[36px] md:text-[44px]">
                Nous nous engageons à <span className="text-wahm-orange">:</span>
              </h2>
              <ol className="m-0 mt-10 list-none p-0">
                {ENGAGEMENTS.map(({ icon: Icon, txt }, i) => (
                  <li key={i} className="border-t border-white/[0.1] py-5 last:border-b md:py-6">
                    <div className="flex items-start gap-5 md:gap-7">
                      <Icon className="mt-[1px] h-[18px] w-[18px] shrink-0 text-wahm-goldLight/75" strokeWidth={1.8} aria-hidden="true" />
                      <p className="m-0 font-display text-[14px] font-semibold uppercase leading-[1.5] tracking-[0.03em] text-[#e7ecf2] md:text-[15px]">{txt}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative min-h-[360px] overflow-hidden bg-wahm-navyDark">
              <img
                src="https://images.unsplash.com/photo-1698671823406-035c77ff6fcd?w=900&h=1200&fit=crop&q=80&auto=format"
                alt="L'engagement WAHM envers l'excellence"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale-[30%]"
              />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,26,47,0.12), rgba(6,18,31,0.5))' }} />
              <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-wahm-goldLight/70" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-wahm-goldLight/70" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== POURQUOI NOUS EXISTONS ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label="Pourquoi nous existons">
            Parce que les professionnels d'aujourd'hui méritent mieux
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {POURQUOI.map((txt, i) => (
              <TiltCard key={txt} className="border-b border-r border-white/[0.08] p-7 md:p-8">
                <X className="h-9 w-9 text-red-500" strokeWidth={2.5} aria-hidden="true" />
                <p className="mt-5 font-display text-[17px] font-extrabold uppercase leading-[1.2] tracking-[-0.005em] text-wahm-goldLight">{txt}</p>
              </TiltCard>
            ))}
          </div>
          <SectionOutro>WAHM offre un accès direct aux meilleurs experts, formations et approches du monde, sans compromis.</SectionOutro>
        </div>
      </Reveal>

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section className="bg-wahm-navy py-20 md:py-[120px]">
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">Rejoignez-nous</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                Vous êtes coach <span className="text-white">?</span> thérapeute <span className="text-white">?</span> formateur <span className="text-white">?</span> passionné<span className="text-white"> ?</span>
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
              <Motif color="#0A1A2F" fill={false} cols={8} rows={8} size={40} gap={18} />
            </div>
          </div>
        </div>
      </section>

    </Page>
  )
}
