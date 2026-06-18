import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Effet « scramble » : le texte se décode lettre par lettre depuis des
// caractères aléatoires. Adapté en JSX (sans TS/shadcn). Respecte reduced-motion.
const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function TextScramble({
  children,
  duration = 0.9,
  speed = 0.035,
  characterSet = defaultChars,
  className,
  as = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}) {
  const MotionComponent = motion[as] || motion.p
  const reduce = useReducedMotion()
  const [displayText, setDisplayText] = useState(children)
  const animatingRef = useRef(false)
  const text = children

  useEffect(() => {
    if (!trigger) return undefined
    if (reduce) {
      setDisplayText(text)
      return undefined
    }
    if (animatingRef.current) return undefined
    animatingRef.current = true

    const steps = duration / speed
    let step = 0
    const interval = setInterval(() => {
      let scrambled = ''
      const progress = step / steps
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' '
          continue
        }
        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }
      setDisplayText(scrambled)
      step++
      if (step > steps) {
        clearInterval(interval)
        setDisplayText(text)
        animatingRef.current = false
        if (onScrambleComplete) onScrambleComplete()
      }
    }, speed * 1000)

    return () => {
      clearInterval(interval)
      animatingRef.current = false
    }
  }, [trigger, text, reduce, duration, speed, characterSet, onScrambleComplete])

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  )
}
