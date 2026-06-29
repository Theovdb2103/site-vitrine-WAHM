import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Dumbbell, HeartPulse, Activity, Wind, Brain, Target, Check, Award, Sparkles, Languages, Globe2, Users, BadgeCheck, FlaskConical, Layers } from 'lucide-react'
import Page from '../components/Page'
import Reveal, { RevealStagger, RevealItem } from '../components/Reveal'
import HomeHero from '../components/sections/HomeHero'
import { GhostNumber } from '../components/ui/Kinetic'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif, Shot, TiltCard, GridPattern, ChevronDivider } from '../components/ui/Frame'
import { ExpandingCards } from '../components/ui/ExpandingCards'
import SectionOutro from '../components/SectionOutro'
import Globe from '../components/Globe'
import { getRouteConfig } from '../lib/site'

const POURQUOI_CARDS = [
  { id: 'experts', title: 'Experts mondiaux', description: 'Experts renommés à travers le monde en sciences du mouvement, performance et santé.', imgSrc: '/assets/media/pq-experts.webp', icon: <Award size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'exclusifs', title: 'Contenus exclusifs', description: 'Formations originales et introuvables ailleurs.', imgSrc: '/assets/media/pq-exclusifs.webp', icon: <Sparkles size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'multilingue', title: 'Multilingue', description: 'Traduction vocale instantanée offrant automatiquement une version doublée en conservant la voix originale, dans plusieurs langues.', imgSrc: '/assets/media/pq-multilingue.webp', icon: <Languages size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'acces', title: 'Accès mondial', description: "Un accès immédiat depuis n'importe quel pays et sur tous supports.", imgSrc: '/assets/media/pq-acces.webp', icon: <Globe2 size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'communaute', title: 'Communauté', description: 'Une communauté de coachs, thérapeutes et passionnés partageant les mêmes valeurs : progression, excellence, impact.', imgSrc: '/assets/media/pq-communaute.webp', icon: <Users size={24} strokeWidth={2} aria-hidden="true" /> },
]

const PROMESSE = [
  { Icon: BadgeCheck, title: 'Certifiées & reconnues', text: 'Certifiantes ou reconnues dans leur domaine', img: '/assets/media/prom-certif.webp' },
  { Icon: Globe2, title: 'Référents mondiaux', text: 'Créées par des leaders internationaux (préparation physique, santé, Pilates, yoga, neurotraining, bien-être…)', img: '/assets/media/prom-monde.webp' },
  { Icon: Target, title: 'Immédiatement applicables', text: 'Pédagogiques, pratiques et immédiatement applicables', img: '/assets/media/prom-applic.webp' },
  { Icon: FlaskConical, title: 'Toujours à jour', text: 'Mises à jour régulièrement selon les dernières recherches scientifiques', img: '/assets/media/prom-science.webp' },
  { Icon: Layers, title: 'Pour tous les niveaux', text: 'Adaptées tous niveaux : débutants, confirmés, experts', img: '/assets/media/prom-niveaux.webp' },
]

const CATEGORIES = [
  { Icon: Dumbbell, title: 'Coaching sportif & Personal Training', desc: 'Méthodologies modernes, planification, gestion clients, business du coaching.', img: '/assets/media/cat-coaching.webp' },
  { Icon: HeartPulse, title: 'Santé & Rééducation – biomécanique', desc: 'Réhabilitation, biomécanique, mouvement fonctionnel, réathlétisation.', img: '/assets/media/cat-sante.webp' },
  { Icon: Activity, title: 'Préparation physique multisports', desc: 'Sports spécifiques, performance, puissance, vitesse, prévention des blessures.', img: '/assets/media/cat-prepa.webp' },
  { Icon: Wind, title: 'Yoga & Pilates – Zen training', desc: 'Flow, mobilité, respiration, optimisation du mouvement.', img: '/assets/media/cat-yoga.webp' },
  { Icon: Brain, title: 'Neurotraining & sciences du mouvement', desc: 'Réflexes archaïques, préférences motrices, boucle sensorimotrice.', img: '/assets/media/cat-neuro.webp' },
  { Icon: Target, title: 'Développement personnel & Mental Coaching', desc: 'Imagerie mentale, mindset, motivation, gestion du stress.', img: '/assets/media/cat-mental.webp' },
]

// Bento « plateforme » : tuiles asymétriques (image plein cadre + accent orange).
const PLATEFORME = [
  { id: 'videos', tag: 'Vidéo', title: 'Des vidéos HD multilingues', desc: 'Cours filmés en haute définition, doublés dans plusieurs langues.', img: '/assets/media/plat-videos.webp', span: 'lg:col-span-3', h: 'min-h-[300px] md:min-h-[340px]' },
  { id: 'espace', tag: 'Suivi', title: 'Un espace personnel', desc: 'Votre tableau de bord : formations, certificats et progression en un coup d’œil.', img: '/assets/media/plat-espace.webp', span: 'lg:col-span-3', h: 'min-h-[300px] md:min-h-[340px]' },
  { id: 'soustitres', tag: 'Langues', title: 'Des sous-titres intelligents', desc: 'Synchronisés FR / EN / ES et plus encore.', img: '/assets/media/plat-soustitres.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
  { id: 'supports', tag: 'Ressources', title: 'Des supports téléchargeables', desc: 'Fiches, PDF et ressources à emporter partout.', img: '/assets/media/plat-supports.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
  { id: '247', tag: 'Disponibilité', title: 'Une accessibilité 24/7', desc: 'Apprenez quand vous voulez, où vous voulez.', img: '/assets/media/plat-247.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
]

// Frise « trajectoire » de la communauté (titre court + détail).
// Avantages membres — contenu de référence du site, verbatim.
const COMMUNAUTE = [
  'Un réseau international de coachs, thérapeutes, préparateurs physiques et instructeurs',
  'Des webinaires exclusifs avec les meilleurs experts',
  'Des réductions sur des formations',
  "Des groupes d'échange privés",
  'Une veille scientifique continue',
]

const STATS = [
  { value: '10', suffix: '+', label: 'Langues disponibles' },
  { value: '24/7', suffix: '', label: 'Accès illimité' },
  { value: '6', suffix: '', label: "Domaines d'expertise" },
  { value: '100', suffix: '%', label: 'Formations vérifiées' },
]

const SECTION = 'bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Spotlight « Notre promesse » : un grand panneau qui défile automatiquement
// entre les engagements, piloté par des onglets + une barre de progression.
const SPOTLIGHT_MS = 4800
function PromesseSpotlight({ items }) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return undefined
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), SPOTLIGHT_MS)
    return () => clearTimeout(t)
  }, [active, items.length, reduce])

  const cur = items[active]
  const CurIcon = cur.Icon

  return (
    <div className="mt-12">
      {/* Panneau vedette */}
      <div className="relative min-h-[300px] overflow-hidden border border-white/[0.1] bg-wahm-navyDark md:min-h-[340px]">
        <GridPattern />
        <CornerTicks />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(7px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduce ? undefined : { opacity: 0, y: -14, filter: 'blur(7px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] grid h-full items-center gap-8 p-8 md:grid-cols-[1fr_minmax(0,0.82fr)] md:gap-10 md:p-10 lg:gap-12 lg:p-12"
          >
            {/* Contenu */}
            <div>
              <div className="flex items-center gap-5">
                <span aria-hidden="true" className="font-display text-[64px] font-black leading-[0.8] text-wahm-goldLight md:text-[92px]">{String(active + 1).padStart(2, '0')}</span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-wahm-orange/30 bg-wahm-orange/10 text-wahm-goldLight">
                  <CurIcon className="h-[24px] w-[24px]" strokeWidth={1.85} aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-6 font-display text-[24px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-white sm:text-[30px] md:text-[34px]">
                {cur.title}<span className="text-wahm-orange">.</span>
              </h3>
              <p className="mt-4 max-w-[520px] font-sans text-[16px] leading-[1.7] text-[#aebccd] md:text-[17px]">{cur.text}</p>
            </div>

            {/* Image cadrée (équerres dorées, façon hero) */}
            <div className="relative">
              <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 z-[2] h-8 w-8 border-l-2 border-t-2 border-wahm-goldLight" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 z-[2] h-8 w-8 border-b-2 border-r-2 border-wahm-goldLight" />
              <div className="relative h-[210px] w-full overflow-hidden border border-white/10 sm:h-[240px] md:h-[260px] lg:h-[280px]">
                <img src={cur.img} alt={cur.title} className="h-full w-full object-cover grayscale-[30%]" />
                <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,26,47,0.18) 0%, rgba(10,26,47,0.52) 100%)' }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Onglets + barre de progression */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((p, i) => {
          const on = i === active
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`group relative overflow-hidden border p-4 text-left transition-colors duration-200 ${on ? 'border-wahm-orange/50 bg-wahm-navyDark' : 'border-white/[0.08] hover:bg-wahm-navyDark/60'}`}
            >
              <span className={`font-mono text-[11px] tracking-[0.12em] ${on ? 'text-wahm-goldLight' : 'text-[#7f93a8]'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`mt-1.5 block font-display text-[13px] font-bold uppercase leading-[1.15] tracking-[0.01em] ${on ? 'text-white' : 'text-[#9fb1c6]'}`}>{p.title}</span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.06]" />
              {on && !reduce && (
                <motion.span
                  key={active}
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] bg-wahm-orange"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: SPOTLIGHT_MS / 1000, ease: 'linear' }}
                />
              )}
              {on && reduce && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-wahm-orange" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Accueil() {
  const meta = getRouteConfig('/')
  return (
    <Page title={meta.title} description={meta.description} path="/">

      {/* ===== HERO ===== */}
      <HomeHero />

      {/* ===== STATS ===== */}
      <section className={`${SECTION} pb-20 md:pb-[120px]`}>
        <div className={WRAP}>
          <RevealStagger className="grid grid-cols-2 border-l border-t border-white/[0.08] lg:grid-cols-4" stagger={0.12}>
            {STATS.map((s, i) => (
              <RevealItem as="div" key={s.label} className="relative border-b border-r border-white/[0.08] p-7 md:p-8">
                <CornerTicks />
                <span className="font-mono text-[11px] text-wahm-goldLight">{String(i + 1).padStart(2, '0')}</span>
                <div className="mt-3 font-display text-[44px] font-black leading-none text-white md:text-[56px]">{s.value}<span className="text-wahm-goldLight">{s.suffix}</span></div>
                <div className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[#9fb1c6]">{s.label}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===== POURQUOI WAHM (grands numéros) ===== */}
      <Reveal as="section" id="pourquoi" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label="Pourquoi WAHM ?" action={<Action to="#marketplace" variant="pill" size="sm" arrow>Découvrir</Action>}>
            L'excellence mondiale, accessible à tous
          </SectionHead>
          <p className="mt-6 max-w-[760px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            Chez World Academy of Human Movement, nous sélectionnons uniquement les formations qui ont déjà transformé des milliers de professionnels à travers le monde. WAHM n'est pas une marketplace comme les autres : c'est le point de convergence international entre :
          </p>
          <ExpandingCards items={POURQUOI_CARDS} className="mt-12" />
          <SectionOutro>WAHM vous ouvre les portes du savoir mondial, structuré, vérifié et pensé pour votre évolution professionnelle.</SectionOutro>
        </div>
      </Reveal>

      <ChevronDivider className="py-2" />

      {/* ===== NOTRE PROMESSE (spotlight auto-rotatif) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label="Notre promesse">Vous former au meilleur, sans frontières</SectionHead>
          <p className="mt-6 max-w-[560px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">Nous nous engageons à proposer des formations :</p>

          <PromesseSpotlight items={PROMESSE} />

          <SectionOutro>Votre progression devient illimitée.</SectionOutro>
        </div>
      </Reveal>

      {/* ===== CATEGORIES ===== */}
      <Reveal as="section" id="categories" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead
            label="Trouvez votre formation idéale"
            action={<Action to="#marketplace" variant="pill" size="sm" arrow>Tout explorer</Action>}
          >
            Des catégories claires, pensées pour vous guider
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <TiltCard key={cat.title} href="#marketplace" className="block border-b border-r border-white/[0.08] no-underline transition-colors duration-200 hover:bg-wahm-navyDark" max={5}>
                {/* Visuel : image plein cadre + zoom au survol + dégradé navy */}
                <div className="relative">
                  <div className="relative h-[208px] w-full overflow-hidden">
                    <img src={cat.img} alt={cat.title} loading="lazy" className="h-full w-full object-cover grayscale-[25%] transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                    <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,26,47,0.96) 0%, rgba(10,26,47,0.30) 55%, rgba(10,26,47,0.05) 100%)' }} />
                  </div>
                  {/* Accent orange qui se déploie au survol */}
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-wahm-orange transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  {/* Numéro */}
                  <span className="absolute right-4 top-4 font-mono text-[12px] font-semibold tracking-[0.1em] text-wahm-goldLight">{String(i + 1).padStart(2, '0')}</span>
                  {/* Pastille icône, chevauchant le bas du visuel */}
                  <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center border border-white/15 bg-wahm-navy text-wahm-goldLight"><cat.Icon className="h-[24px] w-[24px]" strokeWidth={1.8} aria-hidden="true" /></span>
                </div>
                <div className="p-7 pt-10 md:px-8 md:pb-8">
                  <h3 className="font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-white md:text-[20px]">{cat.title}</h3>
                  <p className="mt-3 font-sans text-[14px] leading-[1.6] text-[#9fb1c6]">{cat.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-wahm-goldLight">Explorer <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span></span>
                </div>
              </TiltCard>
            ))}
          </div>
          <SectionOutro>Chaque formation est un investissement sécurisé dans votre expertise.</SectionOutro>
        </div>
      </Reveal>

      {/* ===== BANNIERE CITATION (photo plein cadre + fondu navy) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <Framed ticks={false} className="relative bg-wahm-navyDark">
            {/* Photo de fond, déborde à droite, en N&B */}
            <img
              src="/assets/media/conviction.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[68%_center] grayscale"
            />
            {/* Fondu navy : opaque à gauche → transparent à droite (lisibilité du texte) */}
            <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #0A1A2F 0%, #0A1A2F 26%, rgba(10,26,47,0.72) 52%, rgba(10,26,47,0.30) 80%, rgba(10,26,47,0.12) 100%)' }} />
            <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(6,18,31,0.55) 0%, transparent 42%)' }} />

            {/* Contenu */}
            <div className="relative z-10 max-w-[620px] px-6 py-16 md:px-14 md:py-28">
              <Label>Notre conviction</Label>
              <p className="mt-6 font-display text-[30px] font-extrabold uppercase leading-[1.04] tracking-[-0.015em] text-white sm:text-[42px] md:text-[52px]">
                WAHM n'est pas une<br />marketplace comme les autres<span className="text-wahm-orange">.</span>
              </p>
              <div className="mt-9">
                <Action to="#marketplace" variant="filled" arrow>Explorer les formations</Action>
              </div>
            </div>

            {/* Marques d'angle WAHM, au-dessus de la photo */}
            <CornerTicks className="pointer-events-none absolute inset-0 z-20 text-wahm-orange" />
          </Framed>
        </div>
      </Reveal>

      {/* ===== PLATEFORME INTERNATIONALE ===== */}
      <Reveal as="section" id="plateforme" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <Label>Pensée pour l'international</Label>
          <h2 className="mt-5 max-w-[760px] font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-white sm:text-[36px] md:text-[44px]">Apprenez dans votre langue. À votre rythme. Partout<span className="text-wahm-orange">.</span></h2>

          {/* Bento : tuiles asymétriques, images plein cadre */}
          <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-6">
            {PLATEFORME.map((f, i) => (
              <div key={f.id} className={`group relative overflow-hidden border border-white/[0.1] bg-wahm-navyDark ${f.span} ${f.h}`}>
                <img src={f.img} alt={f.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[20%] transition-transform duration-700 ease-out group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,26,47,0.96), rgba(10,26,47,0.55) 48%, rgba(10,26,47,0.12))' }} />
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-wahm-orange transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-wahm-goldLight">{String(i + 1).padStart(2, '0')} · {f.tag}</span>
                  <h3 className="mt-2 font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-white md:text-[20px]">{f.title}</h3>
                  <p className="mt-1.5 max-w-[440px] font-sans text-[13.5px] leading-[1.5] text-[#cdd8e4]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <SectionOutro>Vous choisissez où, quand et comment vous formez.</SectionOutro>
        </div>
      </Reveal>

      <ChevronDivider className="py-2" />

      {/* ===== COMMUNAUTE (frise « trajectoire ») ===== */}
      <Reveal as="section" id="communaute" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
        {/* Panneau arrondi · texte à gauche, globe qui déborde du coin (cf. Featured_05) */}
        <div className={WRAP}>
          <div className="relative mx-auto w-full overflow-hidden border border-white/[0.08] bg-wahm-navyDark px-6 py-16 shadow-md md:px-16 md:py-20">
            <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
              <div className="z-10 max-w-xl text-left">
                <Label>Communauté WAHM</Label>
                <h2 className="mt-5 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-white sm:text-[36px] md:text-[44px]">Rejoignez la seule communauté mondiale dédiée au mouvement humain<span className="text-wahm-orange">.</span></h2>
                <p className="mt-6 font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">En devenant membre, vous accédez à :</p>
                <ul className="mt-5 space-y-3">
                  {COMMUNAUTE.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-[15px] leading-[1.6] text-[#cdd8e4]">
                      <span aria-hidden="true" className="mt-[9px] h-[6px] w-[6px] shrink-0 bg-wahm-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-sans text-[15.5px] font-semibold leading-[1.6] text-wahm-goldLight">Ne vous formez plus seul. Avancez avec les meilleurs.</p>
                <div className="mt-8">
                  <Action to="#marketplace" variant="filled" arrow>Rejoindre la communauté WAHM</Action>
                </div>
              </div>
              <div className="relative h-[180px] w-full max-w-xl">
                <Globe className="absolute -bottom-20 -right-40 scale-150" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section className="bg-wahm-navy py-20 md:py-[120px]">
        <div className={WRAP}>
          <Reveal className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">Appel à action final</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                Votre évolution commence maintenant<span className="text-white">.</span>
              </h2>
              <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">Les meilleurs experts du monde vous attendent. Devenez un professionnel recherché et reconnu.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to="#marketplace" variant="dark" arrow>Explorez les formations</Action>
                <Action to="#communaute" variant="outlineDark">Rejoignez la communauté WAHM</Action>
              </div>
            </div>
            <div className="relative hidden items-center justify-center border-l border-wahm-navy/15 p-10 md:flex">
              <Motif color="#0A1A2F" fill={false} cols={8} rows={8} size={40} gap={18} />
            </div>
          </Reveal>
        </div>
      </section>

    </Page>
  )
}
