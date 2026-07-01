import { Construction } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, Action, CornerTicks, Motif } from '../components/ui/Frame'
import { useLanguage } from '../context/LanguageContext'
import { localizedPath } from '../lib/site'

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Page Communauté — en cours de construction (pas encore de contenu de référence officiel).
export default function Communaute() {
  const { t } = useTranslation(['common', 'communaute'])
  const { locale } = useLanguage()
  return (
    <Page title={t('communaute:meta.title')} description={t('communaute:meta.description')} path="/communaute">

      <Reveal as="section" className={`${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={`${WRAP} relative py-12 md:py-16`}>
          <CornerTicks />
          {/* Motifs symétriques en arrière-plan */}
          <Motif color="#D4A018" cols={5} rows={5} className="pointer-events-none absolute left-6 top-1/2 hidden w-[170px] -translate-y-1/2 md:left-10 lg:grid" />
          <Motif color="#D4A018" cols={5} rows={5} className="pointer-events-none absolute right-6 top-1/2 hidden w-[170px] -translate-y-1/2 md:right-10 lg:grid" />

          <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center px-4 py-20 text-center md:py-28">
            <span className="flex h-16 w-16 items-center justify-center border border-wahm-orange/40 bg-wahm-orange/10 text-wahm-orange">
              <Construction className="h-8 w-8" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <Label className="mt-8 justify-center">{t('communaute:hero.label')}</Label>
            <h1 className="mt-5 font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
              {t('communaute:hero.title')}<span className="text-wahm-orange">.</span>
            </h1>
            <p className="mt-6 max-w-[520px] font-sans text-[16px] leading-[1.7] text-muted">
              {t('communaute:hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Action to={localizedPath('/', locale)} variant="filled" arrow>{t('communaute:actions.home')}</Action>
              <Action to={localizedPath('/contact', locale)} variant="outline">{t('communaute:actions.contact')}</Action>
            </div>
          </div>
        </div>
      </Reveal>

    </Page>
  )
}
