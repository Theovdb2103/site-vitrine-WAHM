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
      <span aria-hidden="true" className="mb-5 block h-[2px] w-10 bg-wahm-orange" />
      <TextScramble
        as="p"
        trigger={inView}
        speed={0.028}
        className="m-0 inline-block max-w-[820px] bg-gradient-to-r from-white via-wahm-goldLight to-wahm-gold bg-clip-text font-display text-[20px] font-bold uppercase leading-[1.22] tracking-[-0.01em] text-transparent sm:text-[23px] md:text-[27px]"
      >
        {children}
      </TextScramble>
    </div>
  )
}
