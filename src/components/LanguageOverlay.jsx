import { motion } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { useLanguage, LANGS } from '../context/LanguageContext'
import Flag from './ui/Flag'

// Overlay de sélection de langue : accessible (focus trap, Escape, clic extérieur),
// fondu d'entrée/sortie. Le contenu reste FR (sélecteur cosmétique pour l'instant).
export default function LanguageOverlay() {
  const { chooseLang, closeOverlay } = useLanguage()

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-[radial-gradient(120%_90%_at_50%_-10%,#143456_0%,#0A1A2F_60%)]"
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
          aria-label="Choisissez votre langue"
          className="relative flex min-h-full flex-col items-center justify-center p-10"
        >
          <div className="pointer-events-none absolute inset-9 rounded-xl border border-[rgba(212,160,24,0.14)]" aria-hidden="true" />

          <img src="/assets/wahm-logo.png" alt="WAHM" className="block h-[118px] w-auto" />
          <div className="my-[30px] mb-[22px] h-px w-[34px] bg-[rgba(212,160,24,0.5)]" aria-hidden="true" />
          <h2 className="m-0 text-center font-display text-[22px] font-bold text-white">Choisissez votre langue</h2>
          <p className="mt-[9px] font-sans text-[13px] tracking-[0.05em] text-[#9fb1c6]">Select your language to continue</p>

          <div className="mt-9 grid grid-cols-2 gap-[14px] sm:grid-cols-3">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => chooseLang(l.code)}
                className="flex w-full items-center gap-[13px] rounded-xl border border-white/10 bg-white/[0.045] px-[17px] py-[15px] text-left transition-all duration-150 hover:border-[rgba(233,177,74,0.7)] hover:bg-[rgba(233,177,74,0.08)] sm:w-[200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight"
              >
                <Flag code={l.code} className="h-[24px] w-[34px]" />
                <span>
                  <span className="block font-display text-[15px] font-semibold text-white">{l.name}</span>
                  <span className="block text-[11px] text-[#8fa1b6]">{l.code}</span>
                </span>
              </button>
            ))}
          </div>

          <p className="mt-8 font-sans text-[11.5px] tracking-[0.04em] text-[#6f8197]">
            Vous pourrez changer de langue à tout moment depuis le menu.
          </p>
        </div>
      </FocusTrap>
    </motion.div>
  )
}
