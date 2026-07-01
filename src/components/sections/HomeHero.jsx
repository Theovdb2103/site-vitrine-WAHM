import { useTranslation } from 'react-i18next'
import { Label, Action, Framed } from '../ui/Frame'
import { RevealStagger, RevealItem } from '../Reveal'
import { useLanguage } from '../../context/LanguageContext'
import { getMarketplaceUrl } from '../../lib/site'

export default function HomeHero() {
  const { t } = useTranslation(['common', 'accueil'])
  const { locale } = useLanguage()
  const marketplaceUrl = getMarketplaceUrl(locale)

  return (
    <section id="top" className="relative bg-surface pt-[104px] md:pt-[120px]">
      <RevealStagger className="mx-auto grid max-w-[1440px] grid-cols-1 gap-0 px-5 md:px-10 lg:grid-cols-2">
        {/* Colonne texte */}
        <div className="relative flex flex-col justify-start border-line/[0.08] py-12 lg:border-r lg:py-16 lg:pr-12">
          <RevealItem><Label>{t('accueil:hero.label')}</Label></RevealItem>
          <RevealItem as="h1" className="mt-7 font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
            {t('accueil:hero.title1')}<br />{t('accueil:hero.title2')}<br />{t('accueil:hero.title3')}<span className="text-wahm-orange">.</span>
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[440px] font-display text-[17px] font-semibold uppercase tracking-[0.01em] text-gold sm:text-[19px]">
            {t('accueil:hero.tagline')}
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[470px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('accueil:hero.text')}
          </RevealItem>
          <RevealItem as="div" className="mt-9 flex flex-wrap items-center gap-3">
            <Action to={marketplaceUrl} variant="filled" arrow>{t('accueil:hero.ctaDiscover')}</Action>
            <Action to="#communaute" variant="outline">{t('accueil:hero.ctaCommunity')}</Action>
          </RevealItem>
        </div>

        {/* Colonne image encadrée */}
        <RevealItem as="div" className="relative flex items-stretch pb-12 lg:pb-0 lg:pl-0 lg:pt-8">
          <Framed className="relative w-full">
            <div className="relative h-[380px] overflow-hidden sm:h-[480px] lg:h-full lg:min-h-[580px]">
              <img src="/assets/hero-home.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover object-[60%_center] grayscale-[35%]" />
              <span className="img-fade pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg,rgb(var(--c-surface) / 0.15),rgb(var(--c-surface) / 0.55))' }} />
              <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-wahm-goldLight" />
              <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-wahm-goldLight" />
            </div>
          </Framed>
        </RevealItem>
      </RevealStagger>
    </section>
  )
}
