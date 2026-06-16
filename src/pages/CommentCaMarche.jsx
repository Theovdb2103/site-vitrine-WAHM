import { Award } from 'lucide-react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { GhostNumber } from '../components/ui/Kinetic'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif, Shot } from '../components/ui/Frame'
import { getRouteConfig } from '../lib/site'

// Domaines proposés à l'étape 2 (puces).
const DOMAINES = [
  'Coaching sportif',
  'Santé & Rééducation',
  'Préparation physique',
  'Yoga & Pilates',
  'Neurotraining',
  'Mental Coaching',
]

// Parcours apprenant — 8 étapes, verbatim du contenu de référence.
// `tags` : puces optionnelles ; `gold` : pastille dorée (étape pivot = certificat).
const ETAPES = [
  {
    title: 'Choisissez votre langue',
    desc: (
      <>
        Pour chaque formation : la langue d'origine du formateur, les sous-titres disponibles, les versions traduites.{' '}
        <strong className="font-semibold text-white">Votre apprentissage s'adapte à vous, pas l'inverse.</strong>
      </>
    ),
  },
  {
    title: 'Choisissez votre domaine',
    desc: 'Les meilleures formations du monde, réunies dans six domaines. Un moteur de recherche intelligent vous aide à trouver la formation adaptée à votre niveau et à vos objectifs.',
    tags: DOMAINES,
  },
  {
    title: 'Accédez à votre formation en un clic',
    desc: 'Après paiement sécurisé : accès immédiat, à vie (sauf cas particuliers), sur tous vos appareils. Interrompu ? Vous reprenez exactement là où vous étiez.',
  },
  {
    title: 'Apprenez à votre rythme',
    desc: 'Des modules courts, pratiques et applicables. Mettez en pause, revenez sur un module, téléchargez des fiches PDF, prenez des notes depuis votre espace.',
  },
  {
    title: 'Profitez de contenus premium',
    desc: 'Vidéos HD, démonstrations pratiques, progrès mesurés, contenus rédigés par des experts internationaux et mis à jour selon les avancées scientifiques.',
  },
  {
    title: 'Obtenez votre certificat WAHM',
    desc: 'À la fin de certaines formations : un certificat digital reconnu sur la plateforme, valorisable sur votre CV et vos réseaux, preuve de votre montée en compétence.',
    gold: true,
  },
  {
    title: 'Rejoignez la communauté mondiale WAHM',
    desc: "En devenant apprenant, vous accédez à des groupes d'échange privés, des conférences exclusives, des conseils d'experts et des opportunités de networking international. Vous n'apprenez plus seul : vous devenez membre d'un écosystème mondial.",
  },
  {
    title: 'Continuez à évoluer avec nous',
    desc: 'Formations complémentaires, parcours personnalisés, nouveaux contenus adaptés à votre progression. Un apprentissage continu, structuré et intelligent.',
  },
]

const SECTION = 'border-b border-white/[0.08] bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1240px] px-5 md:px-10'

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

      {/* ===== PARCOURS — ETAPES (lignes numérotées) ===== */}
      <Reveal as="section" id="parcours" className={`scroll-mt-[80px] ${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead
            label="Le parcours apprenant"
            action={<Action to="#cta" variant="pill" size="sm" arrow>Commencer</Action>}
          >
            Un parcours fluide, étape par étape
          </SectionHead>

          <div className="mt-12 border-t border-white/[0.08]">
            {ETAPES.map((etape, i) => (
              <div
                key={etape.title}
                className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-white/[0.08] py-8 md:grid-cols-[auto_1fr] md:py-10"
              >
                <div className="flex items-start gap-4 md:w-[120px]">
                  <span
                    className={`font-mono text-[40px] font-black leading-none md:text-[52px] ${
                      etape.gold ? 'text-wahm-goldLight' : 'text-wahm-orange'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="m-0 font-display text-[20px] font-extrabold uppercase leading-[1.1] tracking-[-0.005em] text-white md:text-[24px]">
                      {etape.title}
                    </h3>
                    {etape.gold && (
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-wahm-gold/50 text-wahm-goldLight">
                        <Award className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-[680px] font-sans text-[15px] leading-[1.65] text-[#9fb1c6] md:text-[15.5px]">
                    {etape.desc}
                  </p>
                  {etape.tags && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {etape.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/[0.14] px-3 py-[7px] font-mono text-[11px] uppercase tracking-[0.12em] text-[#cdd8e4]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

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
