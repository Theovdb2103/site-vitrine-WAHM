import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Languages, LayoutGrid, MousePointerClick, Clock, Sparkles, Award, Users, TrendingUp, Plus } from 'lucide-react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif, Shot } from '../components/ui/Frame'
import { getRouteConfig } from '../lib/site'

// Domaines proposés à l'étape 2 (puces) — noms complets, verbatim.
const DOMAINES = [
  'Coaching sportif & Personal Training',
  'Santé & Rééducation – biomécanique',
  'Préparation Physique multisports',
  'Yoga & Pilates – Zen training',
  'Neurotraining & sciences du mouvement',
  'Développement personnel & Mental Coaching',
]

// Parcours apprenant — 8 étapes (contenu de référence, verbatim).
// intro = phrase d'accroche ; points = puces ; chips = domaines ; note = phrase d'accent.
const ETAPES = [
  {
    Icon: Languages,
    img: '/assets/media/ccm-langue.webp',
    title: 'Choisissez votre langue',
    intro: 'Pour chaque formation, vous pouvez sélectionner :',
    points: ["La langue d'origine du formateur", 'Les sous-titres disponibles', 'Les versions traduites'],
    note: "Votre apprentissage s'adapte à vous, pas l'inverse.",
  },
  {
    Icon: LayoutGrid,
    img: '/assets/media/ccm-domaine.webp',
    title: 'Choisissez votre domaine',
    intro: 'WAHM regroupe les meilleures formations du monde dans :',
    chips: DOMAINES,
    note: 'Un moteur de recherche intelligent vous aide à trouver la formation adaptée à votre niveau et à vos objectifs.',
  },
  {
    Icon: MousePointerClick,
    img: '/assets/media/ccm-acces.webp',
    title: 'Accédez à votre formation en un clic',
    intro: 'Après paiement sécurisé, vous avez :',
    points: ['Un accès immédiat', 'À vie (sauf cas particuliers)', 'Sur tous vos appareils (mobile, tablette, ordinateur)'],
    note: 'Si vous êtes interrompu, vous reprenez exactement là où vous étiez.',
  },
  {
    Icon: Clock,
    img: '/assets/media/ccm-rythme.webp',
    title: 'Apprenez à votre rythme',
    intro: 'Chaque formation est découpée en modules courts, pratiques et applicables immédiatement. Vous pouvez :',
    points: ['Mettre en pause', 'Revenir sur un module', 'Télécharger des fiches PDF', 'Prendre des notes directement depuis votre espace'],
    note: "L'apprentissage devient fluide, clair et efficace.",
  },
  {
    Icon: Sparkles,
    img: '/assets/media/ccm-premium.webp',
    title: 'Profitez de contenus premium',
    intro: 'Toutes nos formations respectent les standards WAHM :',
    points: ['Vidéos HD', 'Démonstrations pratiques', 'Progrès mesurés', 'Contenus rédigés par des experts internationaux', 'Mise à jour régulière selon les avancées scientifiques'],
  },
  {
    Icon: Award,
    img: '/assets/media/ccm-certificat.webp',
    title: 'Obtenez votre certificat WAHM',
    intro: 'À la fin de certaines formations, vous recevez un :',
    points: ['Certificat digital', 'Reconnu sur la plateforme WAHM', 'Valorisable sur votre CV et vos réseaux sociaux', 'Preuve de votre montée en compétence'],
  },
  {
    Icon: Users,
    img: '/assets/media/ccm-communaute.webp',
    title: 'Rejoignez la communauté mondiale WAHM',
    intro: 'En devenant apprenant, vous accédez à :',
    points: ["Des groupes d'échange privés", 'Des conférences exclusives', "Des conseils d'experts", 'Des opportunités de networking international'],
    note: "Vous n'apprenez plus seul : vous devenez membre d'un écosystème mondial.",
  },
  {
    Icon: TrendingUp,
    img: '/assets/media/ccm-evolution.webp',
    title: 'Continuez à évoluer avec nous',
    intro: 'WAHM vous recommande automatiquement :',
    points: ['Formations complémentaires', 'Parcours personnalisés', 'Nouveaux contenus adaptés à votre progression'],
    note: 'Votre apprentissage devient continu, structuré et intelligent.',
  },
]

const SECTION = 'bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Apparition en cascade des éléments du panneau ouvert.
const PANEL_ITEM = {
  closed: { opacity: 0, y: 10, filter: 'blur(5px)' },
  open: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

// Accordéon des 8 étapes : ouverture animée (déploiement + cascade des contenus),
// bascule ＋ → ✕, numéro/icône qui passent à l'orange, barre d'accent latérale. DA WAHM.
function ParcoursAccordion({ etapes }) {
  const [open, setOpen] = useState(0)
  const reduce = useReducedMotion()

  return (
    <div className="mt-12 border-t border-white/[0.1]">
      {etapes.map((etape, i) => {
        const isOpen = open === i
        const Icon = etape.Icon
        return (
          <div key={etape.title} className={`relative border-b border-white/[0.1] transition-colors duration-300 ${isOpen ? 'bg-wahm-navyDark' : 'hover:bg-wahm-navyDark/40'}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-4 px-3 py-6 text-left md:gap-7 md:px-5 md:py-7"
            >
              <span className={`w-[40px] shrink-0 font-display text-[30px] font-black leading-none transition-colors duration-300 md:w-[58px] md:text-[44px] ${isOpen ? 'text-wahm-orange' : 'text-wahm-goldLight'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`hidden h-11 w-11 shrink-0 items-center justify-center border transition-colors duration-300 sm:flex ${isOpen ? 'border-wahm-orange/60 bg-wahm-orange/10 text-wahm-orange' : 'border-white/[0.12] text-wahm-goldLight'}`}>
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="flex-1 font-display text-[16px] font-extrabold uppercase leading-[1.15] tracking-[-0.005em] text-white md:text-[22px]">{etape.title}</h3>
              <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${isOpen ? 'rotate-45 border-wahm-orange bg-wahm-orange text-white' : 'border-white/20 text-wahm-goldLight group-hover:border-wahm-orange/50'}`}>
                <Plus className="h-[18px] w-[18px]" strokeWidth={2.4} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={reduce ? false : 'closed'}
                    animate="open"
                    variants={{ open: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.12 } } }}
                    className="mb-9 ml-3 mr-3 border-l-2 border-wahm-orange/70 pl-5 md:ml-5 md:pl-8 lg:ml-[70px]"
                  >
                    <motion.p variants={PANEL_ITEM} className="max-w-[760px] font-sans text-[15px] leading-[1.65] text-[#9fb1c6] md:text-[15.5px]">{etape.intro}</motion.p>

                    {etape.points && (
                      <ul className="mt-5 grid max-w-[760px] grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
                        {etape.points.map((pt) => (
                          <motion.li key={pt} variants={PANEL_ITEM} className="flex items-start gap-3 font-sans text-[14.5px] leading-[1.5] text-[#cdd8e4]">
                            <span aria-hidden="true" className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-wahm-orange" />
                            <span>{pt}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {etape.chips && (
                      <motion.div variants={PANEL_ITEM} className="mt-5 flex flex-wrap gap-2">
                        {etape.chips.map((c) => (
                          <span key={c} className="border border-white/[0.14] px-3 py-[6px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#cdd8e4]">{c}</span>
                        ))}
                      </motion.div>
                    )}

                    {etape.note && <motion.p variants={PANEL_ITEM} className="mt-6 font-sans text-[14px] font-semibold leading-[1.5] text-wahm-goldLight">{etape.note}</motion.p>}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// Section parcours : accordéon des 8 étapes.
function ParcoursSection({ etapes }) {
  return (
    <Reveal as="section" id="parcours" className={`scroll-mt-[80px] ${SECTION} py-16 md:py-[88px]`}>
      <div className={WRAP}>
        <SectionHead label="Le parcours apprenant" action={<Action to="#cta" variant="pill" size="sm" arrow>Commencer</Action>}>
          Un parcours fluide, étape par étape
        </SectionHead>
        <ParcoursAccordion etapes={etapes} />
      </div>
    </Reveal>
  )
}

export default function CommentCaMarche() {
  const meta = getRouteConfig('/comment-ca-marche')
  return (
    <Page title={meta.title} description={meta.description} path="/comment-ca-marche">

      {/* ===== HERO ===== */}
      <Reveal as="section" id="top" className={`relative ${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={`${WRAP} grid grid-cols-1 gap-0 lg:grid-cols-[1.06fr_0.94fr]`}>
          {/* Colonne texte */}
          <div className="relative flex flex-col justify-center border-white/[0.08] py-12 lg:border-r lg:py-20 lg:pr-12">
            <CornerTicks />
            <Label>Comment ça marche · Apprenants</Label>
            <h1 className="mt-7 font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[60px]">
              Votre expertise,<br />décuplée en<br />quelques clics<span className="text-wahm-orange">.</span>
            </h1>
            <p className="mt-6 max-w-[470px] font-sans text-[15.5px] leading-[1.65] text-[#aebccd] md:text-[17px]">
              De votre langue au certificat WAHM : un parcours fluide, clair et pensé pour votre progression.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Action to="#parcours" variant="filled" arrow>Découvrir le parcours</Action>
              <Action to="#marketplace" variant="outline">Explorer les formations</Action>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-7">
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#9fb1c6]">8 étapes</span>
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#9fb1c6]">De la langue au certificat</span>
            </div>
          </div>

          {/* Colonne visuel encadré */}
          <div className="relative flex items-stretch py-12 lg:py-20 lg:pl-12">
            <Framed className="relative flex w-full items-center justify-center bg-wahm-navyDark p-6 md:p-10">
              <Shot src="/assets/media/international-2.webp" alt="Le parcours apprenant WAHM" className="aspect-[3/2] w-full max-w-[340px]" corners />
              <Motif color="rgba(255,123,44,0.95)" cols={4} rows={3} className="pointer-events-none absolute bottom-5 left-5 hidden w-[110px] lg:grid" />
            </Framed>
          </div>
        </div>
      </Reveal>

      {/* ===== PARCOURS — scroll horizontal cinématique ===== */}
      <ParcoursSection etapes={ETAPES} />

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section id="cta" className={`scroll-mt-[80px] ${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">Prêt à commencer ?</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                Prêt à commencer<span className="text-white">.</span>
              </h2>
              <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">
                Explorez les formations et débloquez votre potentiel.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to="#marketplace" variant="dark" arrow>Explorer les formations</Action>
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
