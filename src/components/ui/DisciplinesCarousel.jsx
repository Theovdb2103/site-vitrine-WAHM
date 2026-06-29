import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Carrousel de cartes verticales (3 visibles) : photo plein cadre de la profession +
// titre en gros, flèches latérales pour swiper. Boucle infinie. DA WAHM.
export function DisciplinesCarousel({ items = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true })
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const arrow =
    'flex h-12 w-12 items-center justify-center border border-white/25 bg-wahm-navy/80 text-white backdrop-blur-sm transition-colors duration-200 hover:border-wahm-orange hover:bg-wahm-orange hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight md:h-14 md:w-14'

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {items.map((d, i) => (
            <div key={d.img} className="min-w-0 shrink-0 grow-0 basis-[82%] pl-4 sm:basis-[55%] lg:basis-1/3">
              <article className="group relative aspect-[3/4] overflow-hidden border border-white/[0.12] bg-wahm-navyDark">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  draggable="false"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[16%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  style={{ objectPosition: d.pos || 'center' }}
                />
                <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(6,18,31,0.95) 0%, rgba(10,26,47,0.30) 52%, rgba(10,26,47,0.04) 100%)' }} />
                <span aria-hidden="true" className="absolute left-5 top-5 font-mono text-[12px] tracking-[0.16em] text-wahm-goldLight">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span aria-hidden="true" className="mb-4 block h-[2px] w-10 bg-wahm-orange transition-all duration-300 group-hover:w-16" />
                  <h3 className="font-display text-[22px] font-extrabold uppercase leading-[1.06] tracking-[-0.01em] text-white md:text-[27px]">
                    {d.name}
                  </h3>
                  {d.tag && <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9fb1c6]">{d.tag}</p>}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Flèches latérales */}
      <button type="button" aria-label="Précédent" onClick={scrollPrev} className={`${arrow} absolute left-2 top-1/2 z-10 -translate-y-1/2 md:-left-6`}>
        <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.2} aria-hidden="true" />
      </button>
      <button type="button" aria-label="Suivant" onClick={scrollNext} className={`${arrow} absolute right-2 top-1/2 z-10 -translate-y-1/2 md:-right-6`}>
        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.2} aria-hidden="true" />
      </button>
    </div>
  )
}
