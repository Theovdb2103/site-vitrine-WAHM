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
          className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden border border-line/[0.1] bg-surface-2 transition-colors duration-300 hover:border-line/25 md:min-w-[60px]"
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
            style={{ background: 'linear-gradient(to top, rgb(var(--c-scrim) / 0.94), rgb(var(--c-scrim) / 0.5) 45%, rgb(var(--c-scrim) / 0.12))' }}
          />
          <article className="absolute inset-0 flex flex-col justify-end gap-2 p-5 md:p-6">
            {/* Titre vertical quand la carte est réduite (desktop) */}
            <h3 className="hidden origin-left translate-y-[-4px] rotate-90 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 transition-opacity duration-300 ease-out md:block group-data-[active=true]:opacity-0">
              {item.title}
            </h3>
            {/* Sous md, une carte réduite ne fait que ~67px de haut (1fr d'une pile de
                600px) : bien trop peu pour icône + titre + description, même invisibles
                — `opacity-0` les laisse quand même occuper leur place dans le flex, ce
                qui poussait le titre hors du cadre visible (rogné par l'overflow-hidden
                du li). `hidden` (display:none) leur retire tout encombrement tant que la
                carte n'est pas active ; `md:block` restaure le comportement d'origine à
                partir de md, où la carte réduite garde ses 460px de haut et la place ne
                manque pas — le fondu (opacity) y reste donc intact. */}
            <div className="hidden text-gold group-data-[active=true]:block md:block md:opacity-0 md:transition-all md:delay-75 md:duration-300 md:ease-out md:group-data-[active=true]:opacity-100">
              {item.icon}
            </div>
            {/* Titre horizontal : toujours affiché sous md (accordéon fermé ou ouvert),
                pour que la carte réduite garde un intitulé visible — sans lui, une carte
                réduite en ligne n'affichait plus aucun titre, seule la photo désaturée.
                Le pli habituel « masqué jusqu'à activation » n'est repris qu'à partir de
                md, où le titre vertical (ci-dessus) prend le relais en carte réduite. */}
            <h3 className="font-display text-[20px] font-extrabold uppercase leading-[1.1] tracking-[-0.005em] text-white opacity-100 transition-all delay-150 duration-300 ease-out md:opacity-0 md:group-data-[active=true]:opacity-100">
              {item.title}
            </h3>
            <p className="hidden max-w-xs font-sans text-[14px] leading-[1.55] text-white/80 group-data-[active=true]:block md:block md:opacity-0 md:transition-all md:duration-300 md:ease-out md:group-data-[active=true]:opacity-100" style={{ transitionDelay: '225ms' }}>
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  )
}
