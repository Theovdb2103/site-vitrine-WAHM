import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { TextScramble } from './ui/TextScramble'

// Phrase de conclusion de section : layout UNIQUE, minimaliste.
// Un simple trait orange court, puis l'énoncé en grand display, avec effet
// « scramble » déclenché une fois à l'entrée dans le viewport.
export default function SectionOutro({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className={`mt-12 ${className}`}>
      <span aria-hidden="true" className="mb-3 block h-px w-7 bg-wahm-orange/70" />
      <TextScramble
        as="p"
        trigger={inView}
        speed={0.028}
        className="m-0 inline-block max-w-[760px] font-display text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.01em] text-[#9fb1c6] sm:text-[11.5px] md:text-[12.5px]"
      >
        {children}
      </TextScramble>
    </div>
  )
}
