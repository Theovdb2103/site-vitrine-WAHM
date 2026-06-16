import { Label, Action, Framed, CornerTicks } from '../ui/Frame'
import { RevealStagger, RevealItem } from '../Reveal'

const CHIPS = ['Coaching sportif', 'Santé & Rééducation', 'Préparation physique', 'Yoga & Pilates', 'Neurotraining', 'Mental Coaching']

export default function HomeHero() {
  return (
    <section id="top" className="relative border-b border-white/[0.08] bg-wahm-navy pt-[104px] md:pt-[120px]">
      <RevealStagger className="mx-auto grid max-w-[1240px] grid-cols-1 gap-0 px-5 md:px-10 lg:grid-cols-[1.06fr_0.94fr]">
        {/* Colonne texte */}
        <div className="relative flex flex-col justify-center border-white/[0.08] py-12 lg:border-r lg:py-20 lg:pr-12">
          <CornerTicks />
          <RevealItem><Label>La plateforme mondiale du mouvement humain</Label></RevealItem>
          <RevealItem as="h1" className="mt-7 font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[64px]">
            Formez-vous<br />auprès des<br />meilleurs<span className="text-wahm-orange">.</span>
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[440px] font-display text-[17px] font-semibold uppercase tracking-[0.01em] text-wahm-goldLight sm:text-[19px]">
            Depuis n'importe où. Dans la langue de votre choix.
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[470px] font-sans text-[15.5px] leading-[1.65] text-[#aebccd]">
            Accédez aux formations les plus innovantes du monde en coaching sportif, santé, rééducation, Pilates, yoga et performance humaine. Une seule plateforme. Une qualité d'expertise unique. Une communauté mondiale de passionnés.
          </RevealItem>
          <RevealItem as="div" className="mt-9 flex flex-wrap items-center gap-3">
            <Action to="#marketplace" variant="filled" arrow>Découvrir les formations</Action>
            <Action to="#communaute" variant="outline">Rejoindre la communauté</Action>
          </RevealItem>
          <RevealItem as="div" className="mt-10 flex flex-wrap gap-2 border-t border-white/[0.08] pt-7">
            {CHIPS.map((c) => (
              <span key={c} className="border border-white/[0.14] px-3 py-[7px] font-mono text-[11px] uppercase tracking-[0.12em] text-[#cdd8e4]">{c}</span>
            ))}
          </RevealItem>
        </div>

        {/* Colonne image encadrée */}
        <RevealItem as="div" className="relative flex items-stretch py-12 lg:py-20 lg:pl-12">
          <Framed className="relative w-full">
            <div className="relative h-[320px] overflow-hidden sm:h-[420px] lg:h-full lg:min-h-[440px]">
              <img src="/assets/hero-home.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover object-[60%_center] grayscale-[35%]" />
              <span className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(10,26,47,0.15),rgba(10,26,47,0.55))' }} />
              <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-wahm-goldLight" />
              <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-wahm-goldLight" />
              <div className="absolute bottom-0 left-0 right-0 flex items-center border-t border-white/15 bg-wahm-navy/80 px-5 py-3 backdrop-blur-sm">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-wahm-goldLight">Performance · Santé · Mouvement</span>
              </div>
            </div>
          </Framed>
        </RevealItem>
      </RevealStagger>
    </section>
  )
}
