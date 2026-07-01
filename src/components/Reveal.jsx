import { motion, useReducedMotion } from 'framer-motion'

// Apparition au scroll, sobre : fondu + légère translation Y, une seule fois.
// `as` permet de choisir la balise (section, div, etc.). Respecte prefers-reduced-motion.
export default function Reveal({ as = 'div', children, delay = 0, y = 24, className, style, ...rest }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return <Tag className={className} style={style} {...rest}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

const EASE = [0.22, 1, 0.36, 1]

// Conteneur orchestrant l'apparition en cascade (stagger) de ses enfants <RevealItem>.
// Sobre : chaque enfant monte en fondu, légèrement décalé. Une seule fois, au scroll.
export function RevealStagger({ as = 'div', children, className, style, stagger = 0.14, delayChildren = 0.05, amount = 0.2, ...rest }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  if (reduce) {
    const Tag = as
    return <Tag className={className} style={style} {...rest}>{children}</Tag>
  }
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

// Élément animé (fade-in-up) à placer DANS un <RevealStagger>.
export function RevealItem({ as = 'div', children, className, style, y = 20, ...rest }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  if (reduce) {
    const Tag = as
    return <Tag className={className} style={style} {...rest}>{children}</Tag>
  }
  return (
    <MotionTag
      className={className}
      style={style}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
