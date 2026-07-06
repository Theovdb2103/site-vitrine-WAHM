import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Dumbbell, HeartPulse, Activity, Wind, Brain, Target, Check, Award, Sparkles, Languages, Globe2, Users, BadgeCheck, FlaskConical, Layers } from 'lucide-react'
import Page from '../components/Page'
import Reveal, { RevealStagger, RevealItem } from '../components/Reveal'
import HomeHero from '../components/sections/HomeHero'
import { GhostNumber } from '../components/ui/Kinetic'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif, Shot, TiltCard, GridPattern, ChevronDivider } from '../components/ui/Frame'
import { ExpandingCards } from '../components/ui/ExpandingCards'
import SectionOutro from '../components/SectionOutro'
import Globe from '../components/Globe'
import { getMarketplaceUrl } from '../lib/site'
import { useLanguage } from '../context/LanguageContext'

// Icônes / images non traduisibles — zippées par index avec les textes de accueil.pourquoiCards.
const POURQUOI_CARDS_META = [
  { id: 'experts', imgSrc: '/assets/media/pq-experts.webp', icon: <Award size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'exclusifs', imgSrc: '/assets/media/pq-exclusifs.webp', icon: <Sparkles size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'multilingue', imgSrc: '/assets/media/pq-multilingue.webp', icon: <Languages size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'acces', imgSrc: '/assets/media/pq-acces.webp', icon: <Globe2 size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'communaute', imgSrc: '/assets/media/pq-communaute.webp', icon: <Users size={24} strokeWidth={2} aria-hidden="true" /> },
]

// Icônes / images non traduisibles — zippées par index avec les textes de accueil.promesse.
const PROMESSE_META = [
  { Icon: BadgeCheck, img: '/assets/media/prom-certif.webp' },
  { Icon: Globe2, img: '/assets/media/prom-monde.webp' },
  { Icon: Target, img: '/assets/media/prom-applic.webp' },
  { Icon: FlaskConical, img: '/assets/media/prom-science.webp' },
  { Icon: Layers, img: '/assets/media/prom-niveaux.webp' },
]

// Icônes / images non traduisibles — zippées par index avec les textes de accueil.categories.
const CATEGORIES_META = [
  { Icon: Dumbbell, img: '/assets/media/cat-coaching.webp' },
  { Icon: HeartPulse, img: '/assets/media/cat-sante.webp' },
  { Icon: Activity, img: '/assets/media/cat-prepa.webp' },
  { Icon: Wind, img: '/assets/media/cat-yoga.webp' },
  { Icon: Brain, img: '/assets/media/cat-neuro.webp' },
  { Icon: Target, img: '/assets/media/cat-mental.webp' },
]

// Bento « plateforme » : tuiles asymétriques (image plein cadre + accent orange).
// Structure (id, image, gabarit) non traduisible — zippée par index avec accueil.plateforme.
const PLATEFORME_META = [
  { id: 'videos', img: '/assets/media/plat-videos.webp', span: 'lg:col-span-3', h: 'min-h-[300px] md:min-h-[340px]' },
  { id: 'espace', img: '/assets/media/plat-espace.webp', span: 'lg:col-span-3', h: 'min-h-[300px] md:min-h-[340px]' },
  { id: 'soustitres', img: '/assets/media/plat-soustitres.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
  { id: 'supports', img: '/assets/media/plat-supports.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
  { id: '247', img: '/assets/media/plat-247.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
]

// Valeurs/suffixes non traduisibles — zippées par index avec les labels de accueil.stats.
const STATS_META = [
  { value: '10', suffix: '+' },
  { value: '24/7', suffix: '' },
  { value: '6', suffix: '' },
  { value: '100', suffix: '%' },
]

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Spotlight « Notre promesse » : un grand panneau qui défile automatiquement
// entre les engagements, piloté par des onglets + une barre de progression.
const SPOTLIGHT_MS = 4800
function PromesseSpotlight({ items }) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  // Sur mobile, l'utilisateur choisit l'étape lui-même : pas de défilement auto.
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (reduce || !isDesktop) return undefined
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), SPOTLIGHT_MS)
    return () => clearTimeout(t)
  }, [active, items.length, reduce, isDesktop])

  const cur = items[active]
  const CurIcon = cur.Icon

  return (
    <div className="mt-12">
      {/* Panneau vedette */}
      <div className="relative min-h-[300px] overflow-hidden border border-line/[0.1] bg-surface-2 md:min-h-[340px]">
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
                <span aria-hidden="true" className="font-display text-[64px] font-black leading-[0.8] text-gold md:text-[92px]">{String(active + 1).padStart(2, '0')}</span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-wahm-orange/30 bg-wahm-orange/10 text-gold">
                  <CurIcon className="h-[24px] w-[24px]" strokeWidth={1.85} aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-6 font-display text-[24px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-fg sm:text-[30px] md:text-[34px]">
                {cur.title}<span className="text-wahm-orange">.</span>
              </h3>
              <p className="mt-4 max-w-[520px] font-sans text-[16px] leading-[1.7] text-muted md:text-[17px]">{cur.text}</p>
            </div>

            {/* Image cadrée (équerres dorées, façon hero) */}
            <div className="relative">
              <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 z-[2] h-8 w-8 border-l-2 border-t-2 border-wahm-goldLight" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 z-[2] h-8 w-8 border-b-2 border-r-2 border-wahm-goldLight" />
              <div className="relative h-[210px] w-full overflow-hidden border border-line/10 sm:h-[240px] md:h-[260px] lg:h-[280px]">
                <img src={cur.img} alt={cur.title} className="h-full w-full object-cover grayscale-[30%]" />
                <span aria-hidden="true" className="img-fade absolute inset-0" style={{ background: 'linear-gradient(180deg, rgb(var(--c-surface) / 0.18) 0%, rgb(var(--c-surface) / 0.52) 100%)' }} />
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
              className={`group relative overflow-hidden border p-4 text-left transition-colors duration-200 ${on ? 'border-wahm-orange/50 bg-surface-2' : 'border-line/[0.08] hover:bg-surface-2/60'}`}
            >
              <span className={`font-mono text-[11px] tracking-[0.12em] ${on ? 'text-gold' : 'text-subtle'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`mt-1.5 block font-display text-[13px] font-bold uppercase leading-[1.15] tracking-[0.01em] ${on ? 'text-fg' : 'text-muted'}`}>{p.title}</span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-line/[0.06]" />
              {on && !reduce && isDesktop && (
                <motion.span
                  key={active}
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] bg-wahm-orange"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: SPOTLIGHT_MS / 1000, ease: 'linear' }}
                />
              )}
              {on && (reduce || !isDesktop) && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-wahm-orange" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Accueil() {
  const { t } = useTranslation(['common', 'accueil'])
  const { locale } = useLanguage()
  const marketplaceUrl = getMarketplaceUrl(locale)

  const stats = t('accueil:stats', { returnObjects: true })
  const pourquoiCards = t('accueil:pourquoiCards', { returnObjects: true })
  const promesse = t('accueil:promesse', { returnObjects: true })
  const categories = t('accueil:categories', { returnObjects: true })
  const plateforme = t('accueil:plateforme', { returnObjects: true })
  const communaute = t('accueil:communaute', { returnObjects: true })

  // Zip des textes traduits avec les icônes/images/gabarits structurels (par index).
  const pourquoiItems = pourquoiCards.map((c, i) => ({ ...POURQUOI_CARDS_META[i], ...c }))
  const promesseItems = promesse.map((p, i) => ({ ...PROMESSE_META[i], ...p }))

  return (
    <Page title={t('accueil:meta.title')} description={t('accueil:meta.description')} pathKey="/">

      {/* ===== HERO ===== */}
      <HomeHero />

      {/* ===== STATS ===== */}
      <section className={`${SECTION} pb-20 md:pb-[120px]`}>
        <div className={WRAP}>
          <RevealStagger className="grid grid-cols-2 border-l border-t border-line/[0.08] lg:grid-cols-4" stagger={0.12}>
            {stats.map((s, i) => (
              <RevealItem as="div" key={s.label} className="relative border-b border-r border-line/[0.08] p-7 md:p-8">
                <CornerTicks />
                <span className="font-mono text-[11px] text-gold">{String(i + 1).padStart(2, '0')}</span>
                <div className="mt-3 font-display text-[44px] font-black leading-none text-fg md:text-[56px]">{STATS_META[i].value}<span className="text-gold">{STATS_META[i].suffix}</span></div>
                <div className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">{s.label}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===== POURQUOI WAHM (grands numéros) ===== */}
      <Reveal as="section" id="pourquoi" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label={t('accueil:pourquoi.label')} action={<Action to={marketplaceUrl} variant="pill" size="sm" arrow>{t('accueil:pourquoi.discover')}</Action>}>
            {t('accueil:pourquoi.title')}
          </SectionHead>
          <p className="mt-6 max-w-[760px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('accueil:pourquoi.intro')}
          </p>
          <ExpandingCards items={pourquoiItems} className="mt-12" />
          <SectionOutro>{t('accueil:pourquoi.outro')}</SectionOutro>
        </div>
      </Reveal>

      <ChevronDivider className="py-2" />

      {/* ===== NOTRE PROMESSE (spotlight auto-rotatif) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label={t('accueil:promesseSection.label')}>{t('accueil:promesseSection.title')}</SectionHead>
          <p className="mt-6 max-w-[560px] font-sans text-[16px] leading-[1.7] text-muted">{t('accueil:promesseSection.intro')}</p>

          <PromesseSpotlight items={promesseItems} />

          <SectionOutro>{t('accueil:promesseSection.outro')}</SectionOutro>
        </div>
      </Reveal>

      {/* ===== CATEGORIES ===== */}
      <Reveal as="section" id="categories" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead
            label={t('accueil:categoriesSection.label')}
            action={<Action to={marketplaceUrl} variant="pill" size="sm" arrow>{t('accueil:categoriesSection.explore')}</Action>}
          >
            {t('accueil:categoriesSection.title')}
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-line/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => {
              const meta = CATEGORIES_META[i]
              return (
              <TiltCard key={cat.title} href={marketplaceUrl} className="block border-b border-r border-line/[0.08] no-underline transition-colors duration-200 hover:bg-surface-2" max={5}>
                {/* Visuel : image plein cadre + zoom au survol + dégradé navy */}
                <div className="relative">
                  <div className="relative h-[208px] w-full overflow-hidden">
                    <img src={meta.img} alt={cat.title} loading="lazy" className="h-full w-full object-cover grayscale-[25%] transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                    <span aria-hidden="true" className="img-fade absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(var(--c-surface) / 0.96) 0%, rgb(var(--c-surface) / 0.30) 55%, rgb(var(--c-surface) / 0.05) 100%)' }} />
                  </div>
                  {/* Accent orange qui se déploie au survol */}
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-wahm-orange transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  {/* Numéro */}
                  <span className="absolute right-4 top-4 font-mono text-[12px] font-semibold tracking-[0.1em] text-wahm-goldLight">{String(i + 1).padStart(2, '0')}</span>
                  {/* Pastille icône, chevauchant le bas du visuel */}
                  <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center border border-line/15 bg-surface text-gold"><meta.Icon className="h-[24px] w-[24px]" strokeWidth={1.8} aria-hidden="true" /></span>
                </div>
                <div className="p-7 pt-10 md:px-8 md:pb-8">
                  <h3 className="font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-fg md:text-[20px]">{cat.title}</h3>
                  <p className="mt-3 font-sans text-[14px] leading-[1.6] text-muted">{cat.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{t('accueil:categoriesSection.exploreCard')} <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span></span>
                </div>
              </TiltCard>
              )
            })}
          </div>
          <SectionOutro>{t('accueil:categoriesSection.outro')}</SectionOutro>
        </div>
      </Reveal>

      {/* ===== BANNIERE CITATION (photo plein cadre + fondu navy) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <Framed ticks={false} className="relative bg-surface-2">
            {/* Photo de fond, déborde à droite, en N&B */}
            <img
              src="/assets/media/conviction.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[68%_center] grayscale"
            />
            {/* Fondu navy : opaque à gauche → transparent à droite (lisibilité du texte) */}
            <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgb(var(--c-scrim)) 0%, rgb(var(--c-scrim)) 26%, rgb(var(--c-scrim) / 0.72) 52%, rgb(var(--c-scrim) / 0.30) 80%, rgb(var(--c-scrim) / 0.12) 100%)' }} />
            <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgb(var(--c-scrim) / 0.55) 0%, transparent 42%)' }} />

            {/* Contenu */}
            <div className="relative z-10 max-w-[620px] px-6 py-16 md:px-14 md:py-28">
              <Label>{t('accueil:conviction.label')}</Label>
              <p className="mt-6 font-display text-[30px] font-extrabold uppercase leading-[1.04] tracking-[-0.015em] text-white sm:text-[42px] md:text-[52px]">
                {t('accueil:conviction.title1')}<br />{t('accueil:conviction.title2')}<span className="text-wahm-orange">.</span>
              </p>
              <div className="mt-9">
                <Action to={marketplaceUrl} variant="filled" arrow>{t('accueil:conviction.cta')}</Action>
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
          <Label>{t('accueil:plateformeSection.label')}</Label>
          <h2 className="mt-5 max-w-[760px] font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-fg sm:text-[36px] md:text-[44px]">{t('accueil:plateformeSection.title1')}<span className="text-wahm-orange">.</span></h2>

          {/* Bento : tuiles asymétriques, images plein cadre */}
          <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-6">
            {plateforme.map((f, i) => {
              const meta = PLATEFORME_META[i]
              return (
              <div key={meta.id} className={`group relative overflow-hidden border border-line/[0.1] bg-surface-2 ${meta.span} ${meta.h}`}>
                <img src={meta.img} alt={f.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[20%] transition-transform duration-700 ease-out group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(var(--c-scrim) / 0.96), rgb(var(--c-scrim) / 0.55) 48%, rgb(var(--c-scrim) / 0.12))' }} />
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-wahm-orange transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-wahm-goldLight">{String(i + 1).padStart(2, '0')} · {f.tag}</span>
                  <h3 className="mt-2 font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-white md:text-[20px]">{f.title}</h3>
                  <p className="mt-1.5 max-w-[440px] font-sans text-[13.5px] leading-[1.5] text-white/80">{f.desc}</p>
                </div>
              </div>
              )
            })}
          </div>

          <SectionOutro>{t('accueil:plateformeSection.outro')}</SectionOutro>
        </div>
      </Reveal>

      <ChevronDivider className="py-2" />

      {/* ===== COMMUNAUTE (frise « trajectoire ») ===== */}
      <Reveal as="section" id="communaute" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
        {/* Panneau arrondi · texte à gauche, globe qui déborde du coin (cf. Featured_05) */}
        <div className={WRAP}>
          <div className="relative mx-auto w-full overflow-hidden border border-line/[0.08] bg-surface-2 px-6 py-16 shadow-md md:px-16 md:py-20">
            <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
              <div className="z-10 w-full min-w-0 max-w-xl text-left">
                <Label>{t('accueil:communauteSection.label')}</Label>
                <h2 className="mt-5 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-fg sm:text-[36px] md:text-[44px]">{t('accueil:communauteSection.title')}<span className="text-wahm-orange">.</span></h2>
                <p className="mt-6 font-sans text-[16px] leading-[1.7] text-muted">{t('accueil:communauteSection.intro')}</p>
                <ul className="mt-5 space-y-3">
                  {communaute.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-[15px] leading-[1.6] text-fg-soft">
                      <span aria-hidden="true" className="mt-[9px] h-[6px] w-[6px] shrink-0 bg-wahm-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-sans text-[15.5px] font-semibold leading-[1.6] text-gold">{t('accueil:communauteSection.tagline')}</p>
                <div className="mt-8">
                  <Action to={marketplaceUrl} variant="filled" arrow className="!h-auto !min-h-12 [&>span]:!whitespace-normal [&>span]:!py-3 [&>span]:text-center">{t('accueil:communauteSection.cta')}</Action>
                </div>
              </div>
              {/* Mobile : globe centré, entièrement visible. md+ : déborde du coin (DA). */}
              <div className="relative mx-auto h-[260px] w-full max-w-[260px] md:mx-0 md:h-[180px] md:max-w-xl">
                <Globe className="scale-110 md:-bottom-20 md:-right-40 md:scale-150" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section className="bg-surface py-20 md:py-[120px]">
        <div className={WRAP}>
          <Reveal className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">{t('accueil:ctaFinal.eyebrow')}</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                {t('accueil:ctaFinal.title1')}<span className="text-white">.</span>
              </h2>
              <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">{t('accueil:ctaFinal.text')}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to={marketplaceUrl} variant="dark" arrow>{t('accueil:ctaFinal.exploreCta')}</Action>
                <Action to="#communaute" variant="outlineDark">{t('accueil:ctaFinal.joinCta')}</Action>
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
