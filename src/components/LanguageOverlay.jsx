import { motion } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../context/LanguageContext'
import { LOCALES, LOCALE_LABELS } from '../i18n/locales'
import Flag from './ui/Flag'
import wahmLogo from '../assets/wahm-logo.webp'

// Overlay de sélection de langue : accessible (focus trap, Escape, clic extérieur),
// fondu de sortie seulement. Liste des langues = LOCALES (src/i18n/locales.js) —
// ajouter une langue future suffit à l'y faire apparaître.
export default function LanguageOverlay() {
  const { t } = useTranslation('common')
  const { chooseLang, closeOverlay } = useLanguage()

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-[radial-gradient(120%_90%_at_50%_-10%,rgb(var(--c-surface-3))_0%,rgb(var(--c-surface))_60%)]"
      // initial={false} : pas de fondu à l'OUVERTURE — sinon, pendant ses 250ms
      // d'opacité montante, la page en dessous (accueil) reste visible par
      // transparence, d'où ce flash au tap du sélecteur mobile. La fermeture, elle,
      // garde son fondu (exit, piloté par AnimatePresence dans Layout.jsx).
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <FocusTrap
        focusTrapOptions={{
          escapeDeactivates: true,
          clickOutsideDeactivates: true,
          returnFocusOnDeactivate: true,
          onDeactivate: closeOverlay,
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('languageOverlay.ariaLabel')}
          className="relative flex min-h-full flex-col items-center justify-center p-10"
        >
          <img src={wahmLogo} alt="WAHM" width="544" height="311" className="block h-[118px] w-auto" />
          <div className="my-[30px] mb-[22px] h-px w-[34px] bg-[rgba(212,160,24,0.5)]" aria-hidden="true" />
          <h2 className="m-0 text-center font-display text-[22px] font-bold text-fg">{t('languageOverlay.title')}</h2>
          <p className="mt-[9px] font-sans text-[13px] tracking-[0.05em] text-muted">{t('languageOverlay.subtitle')}</p>

          <div className="mt-9 grid grid-cols-2 gap-[14px] sm:grid-cols-3">
            {LOCALES.map((code) => {
              const meta = LOCALE_LABELS[code]
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => chooseLang(code)}
                  className="flex w-full items-center gap-[13px] border border-line/10 bg-line/[0.045] px-[17px] py-[15px] text-left transition-all duration-150 hover:border-wahm-orange hover:bg-[rgba(255,123,44,0.1)] sm:w-[200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight"
                >
                  <Flag code={meta.flag} className="h-[24px] w-[34px]" />
                  <span>
                    <span className={`block text-[15px] font-semibold text-fg ${meta.nonLatin ? 'font-[system-ui]' : 'font-display'}`}>{meta.name}</span>
                    <span className="block text-[11px] text-muted">{code.toUpperCase()}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <p className="mt-8 font-sans text-[11.5px] tracking-[0.04em] text-subtle">
            {t('languageOverlay.hint')}
          </p>
        </div>
      </FocusTrap>
    </motion.div>
  )
}
