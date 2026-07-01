import { motion, useReducedMotion } from 'framer-motion'

// === Identité « Kinetic / Athletic » ===
// Quelques primitives de mouvement réutilisables (chiffres filigranes, arc qui se
// dessine, barre de progression de lecture).

// Lame orange signature : barre épaisse inclinée avec lueur.
export function Blade({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`block -skew-x-[12deg] bg-gradient-to-b from-wahm-orange to-[#ff9a4d] shadow-[0_0_44px_rgba(255,123,44,0.55)] ${className}`}
    />
  )
}

// Chiffre géant en filigrane (contour), rythme éditorial athlétique.
export function GhostNumber({ children, className = '', stroke = 'rgba(255,123,44,0.16)' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-display font-black leading-none ${className}`}
      style={{ color: 'transparent', WebkitTextStroke: `2px ${stroke}` }}
    >
      {children}
    </span>
  )
}

// Arc « trajectoire » qui se dessine — réservé aux usages volontaires (anneau autour d'un visuel).
export function MotionArc({ className = '', thin = 4, glow = 16 }) {
  const reduce = useReducedMotion()
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
      }
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" className={className}>
      <path d="M16 384 A368 368 0 0 1 384 16" stroke="#FF7B2C" strokeWidth={glow} strokeLinecap="round" opacity="0.12" />
      <motion.path d="M16 384 A368 368 0 0 1 384 16" stroke="#FF7B2C" strokeWidth={thin} strokeLinecap="round" {...draw} />
    </svg>
  )
}
