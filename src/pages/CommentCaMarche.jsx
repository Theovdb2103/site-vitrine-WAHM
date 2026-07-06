import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Languages, LayoutGrid, MousePointerClick, Clock, Sparkles, Award, Users, TrendingUp } from 'lucide-react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif, Shot } from '../components/ui/Frame'
import { useLanguage } from '../context/LanguageContext'
import { getMarketplaceUrl, localizedPath } from '../lib/site'

// Photos Unsplash (nouvelles, hors bibliothèque locale) — nettes de bout en bout.
const UN = (id) => `https://images.unsplash.com/${id}?w=1000&h=900&fit=crop&q=80&auto=format`

// Icônes / images non traduisibles — zippées par index avec les textes de
// commentCaMarche:etapes. chipsKey signale l'étape dont les puces viennent de
// commentCaMarche:domaines (traduit séparément, même tableau réutilisé tel quel).
const ETAPES_META = [
  { Icon: Languages, img: UN('photo-1759156771079-6fef5b8d66c9') },
  { Icon: LayoutGrid, img: UN('photo-1487611278922-eecef627bcd2'), chips: true },
  { Icon: MousePointerClick, img: UN('photo-1745872708309-98f3f13bb842') },
  { Icon: Clock, img: UN('photo-1545014171-35a4a2cfaedb') },
  { Icon: Sparkles, img: UN('photo-1681137063068-081072cf04b4') },
  { Icon: Award, img: UN('photo-1638636241638-aef5120c5153') },
  { Icon: Users, img: UN('photo-1582213782179-e0d53f98f2ca') },
  { Icon: TrendingUp, img: UN('photo-1502904550040-7534597429ae') },
]

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Carte d'étape « empilée » : pinnée en haut (sticky) ; quand l'étape suivante remonte
// par-dessus, celle-ci passe derrière en fondant et en rétrécissant légèrement (scroll-link).
// Layout alterné carte-texte / photo (façon référence), DA WAHM (navy + accents or/orange).
function StepCard({ etape, index, total, isLast, progress, stepLabel }) {
  const reduce = useReducedMotion()
  // Fenêtre de scroll de cette carte (sur la progression du conteneur global). Elle reste
  // pleine, puis s'efface + rétrécit depuis le haut quand la carte suivante remonte par-dessus.
  const w = 1 / total
  const start = index * w
  const opacity = useTransform(progress, [start, start + w * 0.2, start + w], [1, 1, isLast ? 1 : 0])
  const scale = useTransform(progress, [start, start + w], [1, isLast ? 1 : 0.9])
  const style = reduce ? undefined : { opacity, scale, transformOrigin: 'top center' }
  // Décalage de pin croissant : la carte figée « dépasse » un peu en haut → on la voit rétrécir/s'effacer.
  const stickyTop = 88 + index * 14
  const imageLeft = index % 2 === 1
  const Icon = etape.Icon

  return (
    <div className="sticky mb-5 md:mb-6" style={{ top: stickyTop }}>
      <motion.article
        style={style}
        className={`grid grid-cols-1 gap-3 overflow-hidden bg-surface-2 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.85)] md:gap-4 ${imageLeft ? 'md:grid-cols-[0.82fr_1.18fr]' : 'md:grid-cols-[1.18fr_0.82fr]'}`}
      >
        {/* Panneau texte */}
        <div className={`flex flex-col justify-between gap-10 bg-surface-2 p-8 md:gap-16 md:p-12 ${imageLeft ? 'md:order-2' : ''}`}>
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-[26px] font-black uppercase leading-none tracking-[-0.01em] text-wahm-orange md:text-[36px]">{stepLabel} {index + 1}</span>
            <Icon className="mt-1 h-6 w-6 shrink-0 text-gold/55 md:h-7 md:w-7" strokeWidth={1.8} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-[22px] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-fg md:text-[28px]">{etape.title}</h3>
            <p className="mt-5 max-w-[520px] font-sans text-[15px] leading-[1.65] text-muted md:text-[15.5px]">{etape.intro}</p>

            {etape.points && (
              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {etape.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 font-sans text-[14px] leading-[1.5] text-fg-soft">
                    <span aria-hidden="true" className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-wahm-orange" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}

            {etape.chips && (
              <div className="mt-5 flex flex-wrap gap-2">
                {etape.chips.map((c) => (
                  <span key={c} className="border border-line/[0.14] px-3 py-1.5 font-grotesk text-[10.5px] font-semibold uppercase tracking-[0.06em] text-fg-soft">{c}</span>
                ))}
              </div>
            )}

            {etape.note && <p className="mt-6 font-sans text-[14px] font-semibold leading-[1.5] text-gold">{etape.note}</p>}
          </div>
        </div>

        {/* Photo */}
        <div className={`relative min-h-[260px] overflow-hidden bg-surface-2 md:min-h-[440px] ${imageLeft ? 'md:order-1' : ''}`}>
          <img src={etape.img} alt={etape.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[25%]" />
          <span aria-hidden="true" className="img-fade pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgb(var(--c-surface) / 0.06), rgb(var(--c-surface) / 0.45))' }} />
          <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 h-7 w-7 border-r-2 border-t-2 border-wahm-goldLight/70" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 border-b-2 border-l-2 border-wahm-goldLight/70" />
        </div>
      </motion.article>
    </div>
  )
}

// Pile d'étapes : chaque carte est sticky au même offset → elles s'empilent au scroll.
function ParcoursStack({ etapes, stepLabel }) {
  // Scroll mesuré sur le conteneur (qui défile normalement) → la progression avance
  // même quand les cartes sont figées en sticky. Chaque carte en dérive son anim.
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  return (
    <div ref={ref} className="mt-14 md:mt-16">
      {etapes.map((etape, i) => (
        <StepCard key={etape.title} etape={etape} index={i} total={etapes.length} isLast={i === etapes.length - 1} progress={scrollYProgress} stepLabel={stepLabel} />
      ))}
    </div>
  )
}

// Section parcours : pile de cartes-étapes empilées au scroll.
// <section> simple (pas de Reveal) pour ne pas casser le position: sticky.
function ParcoursSection({ etapes, stepLabel, label, title, cta }) {
  return (
    <section id="parcours" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
      <div className={WRAP}>
        <SectionHead label={label} action={<Action to="#cta" variant="pill" size="sm" arrow>{cta}</Action>}>
          {title}
        </SectionHead>
        <ParcoursStack etapes={etapes} stepLabel={stepLabel} />
      </div>
    </section>
  )
}

export default function CommentCaMarche() {
  const { t } = useTranslation(['common', 'commentCaMarche'])
  const { locale } = useLanguage()
  const marketplaceUrl = getMarketplaceUrl(locale)

  const domaines = t('commentCaMarche:domaines', { returnObjects: true })
  const etapesText = t('commentCaMarche:etapes', { returnObjects: true })
  // Zip texte traduit + structure (icône, image) ; injection des chips « domaines »
  // sur l'étape marquée `chips: true` dans ETAPES_META.
  const etapes = etapesText.map((e, i) => {
    const meta = ETAPES_META[i]
    return { ...e, Icon: meta.Icon, img: meta.img, ...(meta.chips ? { chips: domaines } : {}) }
  })

  return (
    <Page title={t('commentCaMarche:meta.title')} description={t('commentCaMarche:meta.description')} pathKey="/comment-ca-marche">

      {/* ===== HERO ===== */}
      <Reveal as="section" id="top" className={`${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={WRAP}>
          <div className="relative grid border-l border-t border-line/[0.08] lg:grid-cols-[1.1fr_0.9fr]">
            {/* Colonne texte */}
            <div className="relative min-w-0 border-b border-r border-line/[0.08] p-7 py-12 md:p-12 md:py-16">
              <CornerTicks />
              <Label>{t('commentCaMarche:hero.label')}</Label>
              <h1 className="mt-7 max-w-[900px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
                {t('commentCaMarche:hero.title')}<span className="text-wahm-orange">.</span>
              </h1>
              <p className="mt-7 max-w-[600px] font-sans text-[16px] leading-[1.7] text-muted">
                {t('commentCaMarche:hero.subtitle')}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Action to="#parcours" variant="filled" arrow>{t('commentCaMarche:hero.ctaDiscoverParcours')}</Action>
                <Action to={marketplaceUrl} variant="outline">{t('commentCaMarche:hero.ctaExploreFormations')}</Action>
              </div>
            </div>

            {/* Colonne visuel — ratio carré (le portrait est recadré, comme sur Devenir formateur) */}
            <div className="relative min-w-0 border-b border-r border-line/[0.08]">
              <CornerTicks />
              <Shot src="/assets/media/ccm-etudiant.webp" alt={t('commentCaMarche:hero.imageAlt')} className="aspect-square w-full" position="center" corners />
              <Motif color="#D4A018" cols={5} rows={3} className="pointer-events-none absolute bottom-5 left-5 z-10 hidden w-[150px] md:grid" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== PARCOURS — scroll horizontal cinématique ===== */}
      <ParcoursSection
        etapes={etapes}
        stepLabel={t('commentCaMarche:parcours.stepLabel')}
        label={t('commentCaMarche:parcours.label')}
        title={t('commentCaMarche:parcours.title')}
        cta={t('commentCaMarche:parcours.cta')}
      />

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section id="cta" className={`scroll-mt-[80px] ${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">{t('commentCaMarche:cta.kicker')}</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                {t('commentCaMarche:cta.title')}<span className="text-white">.</span>
              </h2>
              <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">
                {t('commentCaMarche:cta.text')}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to={marketplaceUrl} variant="dark" arrow>{t('commentCaMarche:cta.ctaExploreFormations')}</Action>
                <Action to={localizedPath('/communaute', locale)} variant="outlineDark">{t('commentCaMarche:cta.ctaJoinCommunity')}</Action>
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
