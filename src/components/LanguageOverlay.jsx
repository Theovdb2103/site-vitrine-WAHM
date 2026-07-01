import { motion } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../context/LanguageContext'
import { LOCALES, LOCALE_LABELS } from '../i18n/locales'
import Flag from './ui/Flag'

// Overlay de sélection de langue : accessible (focus trap, Escape, clic extérieur),
// fondu d'entrée/sortie. Liste des langues = LOCALES (src/i18n/locales.js) — ajouter
// une langue future suffit à l'y faire apparaître.
export default function LanguageOverlay() {
  const { t } = useTranslation('common')
  const { chooseLang, closeOverlay } = useLanguage()

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-[radial-gradient(120%_90%_at_50%_-10%,rgb(var(--c-surface-3))_0%,rgb(var(--c-surface))_60%)]"
      initial={{ opacity: 0 }}
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
          <div className="pointer-events-none absolute inset-9 border border-[rgba(212,160,24,0.14)]" aria-hidden="true" />

          <img src="/assets/wahm-logo.png" alt="WAHM" className="block h-[118px] w-auto" />
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
                    <span className="block font-display text-[15px] font-semibold text-fg">{meta.name}</span>
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
