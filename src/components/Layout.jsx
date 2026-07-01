import { Suspense, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { I18nextProvider } from 'react-i18next'
import { createI18nInstance } from '../i18n/createI18nInstance'
import { LanguageProvider, useLanguage } from '../context/LanguageContext'
import { ThemeProvider } from '../context/ThemeContext'
import Header from './Header'
import Footer from './Footer'
import LanguageOverlay from './LanguageOverlay'
import ScrollManager from './ScrollManager'

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
      <motion.main
        id="main"
        tabIndex={-1}
        key={location.pathname}
        className="scroll-mt-[80px] focus:outline-none"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {outlet}
      </motion.main>
    </AnimatePresence>
  )
}

export default function Layout({ locale }) {
  // Une instance i18next par montage de Layout — jamais le singleton global, jamais
  // recréée à chaque re-render (cf. src/i18n/createI18nInstance.js).
  const [i18nInstance] = useState(() => createI18nInstance(locale))

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18nInstance}>
        <LanguageProvider locale={locale}>
          {/* Lien d'évitement clavier : invisible jusqu'au focus (Tab à l'ouverture de page). */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:border-2 focus:border-wahm-orange focus:bg-surface focus:px-4 focus:py-2.5 focus:font-display focus:text-[13px] focus:font-bold focus:uppercase focus:tracking-[0.06em] focus:text-fg focus:no-underline"
          >
            Aller au contenu
          </a>
          {/* Suspense : react-i18next suspend le rendu tant que le namespace demandé
              (common à l'init, puis le namespace de chaque page) n'est pas chargé.
              Jamais vu côté SSG (le HTML n'est figé qu'après onAllReady()) ; côté
              navigation client, fallback discret plutôt que null pour éviter un flash vide. */}
          <Suspense fallback={<div className="min-h-screen bg-surface" />}>
            <ScrollManager />
            <Header />
            <OverlayHost />
            <PageTransition />
            <Footer />
          </Suspense>
        </LanguageProvider>
      </I18nextProvider>
    </ThemeProvider>
  )
}
