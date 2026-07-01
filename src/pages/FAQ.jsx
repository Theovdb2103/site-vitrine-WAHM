import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, Action, CornerTicks, Motif } from '../components/ui/Frame'
import { useLanguage } from '../context/LanguageContext'
import { localizedPath } from '../lib/site'

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

export default function FAQ() {
  const { t } = useTranslation(['common', 'faq'])
  const { locale } = useLanguage()
  const FAQ_ITEMS = t('faq:faqItems', { returnObjects: true })
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i))

  return (
    <Page title={t('faq:meta.title')} description={t('faq:meta.description')} pathKey="/faq">

      {/* ===== HERO — image plein écran + texte par-dessus ===== */}
      <section className="relative isolate flex min-h-[580px] items-end overflow-hidden bg-surface md:min-h-[720px]">
        <img
          src="https://images.unsplash.com/photo-1604233098531-90b71b1b17a6?w=2200&h=1240&fit=crop&q=80&auto=format"
          alt="L'expertise et l'engagement, au cœur de WAHM"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center grayscale-[15%]"
        />
        {/* Voiles navy : assombrit la gauche (lisibilité du texte) + le bas */}
        <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(90deg, rgb(var(--c-scrim) / 0.92) 0%, rgb(var(--c-scrim) / 0.72) 48%, rgb(var(--c-scrim) / 0.35) 100%)' }} />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3" style={{ background: 'linear-gradient(180deg, rgb(var(--c-scrim) / 0) 0%, rgb(var(--c-scrim) / 0.85) 100%)' }} />
        <div className={`${WRAP} relative w-full pb-14 pt-[150px] md:pb-20 md:pt-[200px]`}>
          <CornerTicks />
          <Label>{t('faq:hero.label')}</Label>
          <h1 className="mt-7 max-w-[1000px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[58px]">
            {t('faq:hero.title')}<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-6 max-w-[720px] font-sans text-[16px] leading-[1.7] text-white/85">
            {t('faq:hero.subtitle')}
          </p>
        </div>
      </section>

      {/* ===== ACCORDÉON ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <ul className="m-0 mx-auto max-w-[940px] list-none border-t border-line/[0.1] p-0">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i
              const panelId = `faq-panel-${i}`
              const btnId = `faq-button-${i}`
              return (
                <li key={item.question} className="group border-b border-line/[0.1]">
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-wahm-goldLight/50 md:gap-10 md:py-8"
                    >
                      <span className="flex items-baseline gap-5 md:gap-7">
                        <span className={`shrink-0 font-mono text-[12px] tracking-[0.12em] tabular-nums transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-gold/55'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-display text-[16px] font-bold uppercase leading-[1.3] tracking-[-0.005em] transition-colors duration-300 md:text-[18px] ${isOpen ? 'text-fg' : 'text-fg-soft group-hover:text-fg'}`}>
                          {item.question}
                        </span>
                      </span>
                      {/* Toggle minimaliste : + qui se mue en − dans un cercle fin */}
                      <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-300 ${isOpen ? 'border-wahm-orange/70 text-wahm-orange' : 'border-line/15 text-muted group-hover:border-line/35 group-hover:text-fg'}`}>
                        <span aria-hidden="true" className="absolute h-px w-[13px] bg-current" />
                        <span aria-hidden="true" className={`absolute h-[13px] w-px bg-current transition-transform duration-300 ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="m-0 max-w-[760px] whitespace-pre-line pb-8 pl-[33px] pr-1 font-sans text-[15px] leading-[1.75] text-muted md:pl-[52px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">{t('faq:cta.label')}</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                {t('faq:cta.title')}<span className="text-white">.</span>
              </h2>
              <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">
                {t('faq:cta.text')}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to={localizedPath('/devenir-formateur#candidature', locale)} variant="dark" arrow>{t('faq:cta.apply')}</Action>
                <Action to={localizedPath('/contact', locale)} variant="outlineDark">{t('faq:cta.discuss')}</Action>
              </div>
            </div>
            <div className="relative hidden items-center justify-center border-l border-wahm-navy/15 p-10 md:flex">
              <Motif color="#0A1A2F" fill={false} cols={8} rows={8} size={40} gap={18} />
            </div>
          </div>
        </div>
      </section>

    </Page>
  )
}
