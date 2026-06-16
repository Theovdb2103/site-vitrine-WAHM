import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LanguageProvider, useLanguage } from '../context/LanguageContext'
import Header from './Header'
import Footer from './Footer'
import LanguageOverlay from './LanguageOverlay'
import ScrollManager from './ScrollManager'
import { ScrollProgress } from './ui/Kinetic'

function OverlayHost() {
  const { showOverlay } = useLanguage()
  return <AnimatePresence>{showOverlay && <LanguageOverlay />}</AnimatePresence>
}

function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Layout() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <ScrollProgress />
      <Header />
      <OverlayHost />
      <PageTransition />
      <Footer />
    </LanguageProvider>
  )
}
