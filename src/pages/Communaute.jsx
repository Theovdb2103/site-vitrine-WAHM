import { Globe2, PlayCircle, Percent, Users, Sparkles } from 'lucide-react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif, Shot, TiltCard } from '../components/ui/Frame'
import { getRouteConfig } from '../lib/site'

const AVANTAGES = [
  {
    Icon: Globe2,
    title: 'Réseau international',
    desc: 'Coachs, thérapeutes, préparateurs et instructeurs du monde entier.',
  },
  {
    Icon: PlayCircle,
    title: 'Webinaires exclusifs',
    desc: 'Des sessions privées avec les meilleurs experts internationaux.',
  },
  {
    Icon: Percent,
    title: 'Réductions sur les formations',
    desc: 'Des tarifs préférentiels réservés aux membres de la communauté.',
  },
  {
    Icon: Users,
    title: "Groupes d'échange privés",
    desc: 'Partagez, questionnez, collaborez dans des espaces dédiés.',
  },
  {
    Icon: Sparkles,
    title: 'Veille scientifique continue',
    desc: 'Restez à jour sur les dernières avancées du mouvement humain.',
  },
]

const SECTION = 'border-b border-white/[0.08] bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1240px] px-5 md:px-10'

export default function Communaute() {
  const meta = getRouteConfig('/communaute')
  return (
    <Page title={meta.title} description={meta.description} path="/communaute">

      {/* ===== HERO ===== */}
      <Reveal as="section" className={`${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={`${WRAP} relative py-16 md:py-[88px]`}>
          <Motif color="rgba(255,123,44,0.9)" cols={5} rows={5} className="pointer-events-none absolute right-5 top-1/2 hidden w-[180px] -translate-y-1/2 md:right-10 lg:grid" />
          <Label>Communauté WAHM</Label>
          <h1 className="mt-7 max-w-[760px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[64px]">
            La seule communauté mondiale dédiée au mouvement humain<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-6 max-w-[580px] font-sans text-[15.5px] leading-[1.65] text-[#aebccd]">
            Ne vous formez plus seul. Avancez avec les meilleurs coachs, thérapeutes, préparateurs et instructeurs du monde entier.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Action to="#adhesion" variant="filled" arrow>Rejoindre la communauté</Action>
          </div>
        </div>
      </Reveal>

      {/* ===== INTRO + IMAGE ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={`${WRAP} grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <Framed className="relative flex items-center justify-center bg-wahm-navyDark p-6 md:p-10">
            <Shot src="/assets/media/communaute-2.webp" alt="Le réseau international WAHM" className="aspect-[3/2] w-full max-w-[340px]" corners />
          </Framed>
          <div>
            <Label>Un écosystème mondial</Label>
            <h2 className="mt-5 font-display text-[28px] font-extrabold uppercase leading-[1.04] tracking-[-0.015em] text-white sm:text-[36px]">Un réseau international, uni par les mêmes valeurs<span className="text-wahm-orange">.</span></h2>
            <p className="mt-6 max-w-[560px] font-sans text-[15.5px] leading-[1.7] text-[#9fb1c6]">WAHM fédère coachs sportifs, thérapeutes, préparateurs physiques, instructeurs Pilates &amp; Yoga, étudiants en sciences du sport et experts du développement humain. Tous animés par une même ambition : progresser, transmettre, exceller.</p>
            <p className="mt-7 font-display text-[16px] font-bold uppercase tracking-[0.02em] text-wahm-goldLight">Le savoir international, enfin accessible.</p>
          </div>
        </div>
      </Reveal>

      {/* ===== AVANTAGES ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Avantages membres">Ce que vous débloquez en devenant membre</SectionHead>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {AVANTAGES.map((a) => (
              <TiltCard key={a.title} className="border-b border-r border-white/[0.08] p-7 md:p-8">
                <span className="flex h-12 w-12 items-center justify-center border border-white/[0.12] text-wahm-orange"><a.Icon className="h-[24px] w-[24px]" strokeWidth={1.8} aria-hidden="true" /></span>
                <h3 className="mt-6 font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-white">{a.title}</h3>
                <p className="mt-3 font-sans text-[14px] leading-[1.6] text-[#9fb1c6]">{a.desc}</p>
              </TiltCard>
            ))}
            <TiltCard className="flex flex-col justify-center border-b border-r border-white/[0.08] bg-wahm-navyDark p-7 md:p-8">
              <p className="m-0 font-display text-[20px] font-extrabold uppercase leading-[1.2] tracking-[-0.01em] text-wahm-goldLight">Ne vous formez plus seul<span className="text-wahm-orange">.</span></p>
              <p className="mt-3 font-sans text-[14px] leading-[1.6] text-[#cdd8e4]">Avancez avec les meilleurs, partout dans le monde.</p>
            </TiltCard>
          </div>
        </div>
      </Reveal>

      {/* ===== CTA ADHESION (bloc accent) ===== */}
      <section id="adhesion" className="scroll-mt-[80px] border-b border-white/[0.08] bg-wahm-navy py-16 md:py-[88px]">
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">Adhésion</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                Rejoignez la communauté WAHM<span className="text-white">.</span>
              </h2>
              <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">Formez-vous auprès des meilleurs experts du monde. WAHM : là où se forment les professionnels d'élite.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to="#marketplace" variant="dark" arrow>Rejoindre la communauté WAHM</Action>
                <Action to="/contact" variant="outlineDark">Nous contacter</Action>
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
