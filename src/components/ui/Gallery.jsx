import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Label } from './Frame'

// Carousel horizontal (drag + flèches) de cartes image/titre/résumé.
// Adapté de Gallery6 (shadcn) en JSX + embla, DA WAHM (sombre, accent orange, carré).
export function Gallery({ label, heading, items = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }
    update()
    emblaApi.on('select', update)
    emblaApi.on('reInit', update)
    return () => {
      emblaApi.off('select', update)
      emblaApi.off('reInit', update)
    }
  }, [emblaApi])

  const navBtn = 'flex h-11 w-11 items-center justify-center border border-line/20 text-fg transition-colors duration-200 hover:border-wahm-orange hover:text-wahm-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line/20 disabled:hover:text-fg'

  return (
    <div>
      {/* En-tête + navigation */}
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 md:flex-row md:items-end md:px-10">
        <div>
          {label && <Label className="mb-4">{label}</Label>}
          <h2 className="m-0 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-fg sm:text-[36px] md:text-[44px]">
            {heading}<span className="text-wahm-orange">.</span>
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" aria-label="Précédent" onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev} className={navBtn}>
            <ArrowLeft className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Suivant" onClick={() => emblaApi?.scrollNext()} disabled={!canNext} className={navBtn}>
            <ArrowRight className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="mt-10 overflow-hidden md:mt-14" ref={emblaRef}>
        <div className="-ml-4 flex pl-5 md:pl-10">
          {items.map((item) => (
            <div key={item.id} className="min-w-0 shrink-0 grow-0 basis-[86%] pl-4 sm:basis-[58%] lg:basis-[34%]">
              <div className="flex flex-col">
                <div className="relative overflow-hidden border border-line/[0.12]">
                  <img src={item.image} alt={item.title} loading="lazy" className="aspect-[3/2] w-full object-cover grayscale-[22%]" />
                  <span aria-hidden="true" className="img-fade pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg,rgb(var(--c-surface) / 0.06),rgb(var(--c-surface) / 0.45))' }} />
                </div>
                <h3 className="mt-5 flex items-center gap-2.5 font-display text-[18px] font-extrabold uppercase leading-[1.15] tracking-[-0.005em] text-fg md:text-[20px]">
                  <Check className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={3} aria-hidden="true" />
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-[14.5px] leading-[1.55] text-muted">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
