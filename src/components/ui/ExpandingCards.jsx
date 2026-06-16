import { useState, useEffect, useMemo } from 'react'

// Cartes expansibles : au survol/clic, la carte active s'élargit (5fr) et révèle
// icône + titre + description ; les autres se réduisent (1fr). Colonnes sur desktop,
// lignes sur mobile. Habillage DA WAHM : bleu nuit, accent orange, photos désaturées
// qui reprennent leurs couleurs à l'ouverture.
export function ExpandingCards({ items, defaultActiveIndex = 0, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const gridStyle = useMemo(() => {
    const tracks = items.map((_, i) => (i === activeIndex ? '5fr' : '1fr')).join(' ')
    return isDesktop ? { gridTemplateColumns: tracks } : { gridTemplateRows: tracks }
  }, [activeIndex, items, isDesktop])

  return (
    <ul
      className={`grid h-[600px] w-full list-none gap-2 p-0 transition-[grid-template-columns,grid-template-rows] duration-500 ease-out md:h-[460px] ${className}`}
      style={{ ...gridStyle, ...(isDesktop ? { gridTemplateRows: '1fr' } : { gridTemplateColumns: '1fr' }) }}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden border border-white/[0.1] bg-wahm-navyDark transition-colors duration-300 hover:border-white/25 md:min-w-[60px]"
          onMouseEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          onClick={() => setActiveIndex(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-110 object-cover grayscale transition-all duration-500 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(10,26,47,0.94), rgba(10,26,47,0.5) 45%, rgba(10,26,47,0.12))' }}
          />
          {/* Liseré orange signature sur la carte active */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-wahm-orange transition-transform duration-500 ease-out group-data-[active=true]:scale-x-100" />

          <article className="absolute inset-0 flex flex-col justify-end gap-2 p-5 md:p-6">
            {/* Titre vertical quand la carte est réduite (desktop) */}
            <h3 className="hidden origin-left translate-y-[-4px] rotate-90 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 transition-opacity duration-300 ease-out md:block group-data-[active=true]:opacity-0">
              {item.title}
            </h3>
            <div className="text-wahm-orange opacity-0 transition-all delay-75 duration-300 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>
            <h3 className="font-display text-[20px] font-extrabold uppercase leading-[1.1] tracking-[-0.005em] text-white opacity-0 transition-all delay-150 duration-300 ease-out group-data-[active=true]:opacity-100">
              {item.title}
            </h3>
            <p className="max-w-xs font-sans text-[14px] leading-[1.55] text-[#cdd8e4] opacity-0 transition-all duration-300 ease-out group-data-[active=true]:opacity-100" style={{ transitionDelay: '225ms' }}>
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  )
}
