import { useTranslation } from 'react-i18next'
import { Label, Action, Framed } from '../ui/Frame'
import { RevealStagger, RevealItem } from '../Reveal'
import { useLanguage } from '../../context/LanguageContext'
import { getMarketplaceUrl } from '../../lib/site'

// Variantes responsives du visuel de héros — importées (et non référencées depuis
// public/) pour que Vite les serve sous un nom hashé, donc invalidables par le cache.
import heroAvif480 from '../../assets/hero/hero-home-480.avif'
import heroAvif768 from '../../assets/hero/hero-home-768.avif'
import heroAvif1200 from '../../assets/hero/hero-home-1200.avif'
import heroAvif1600 from '../../assets/hero/hero-home-1600.avif'
import heroWebp480 from '../../assets/hero/hero-home-480.webp'
import heroWebp768 from '../../assets/hero/hero-home-768.webp'
import heroWebp1200 from '../../assets/hero/hero-home-1200.webp'
import heroWebp1600 from '../../assets/hero/hero-home-1600.webp'
import heroJpg1200 from '../../assets/hero/hero-home-1200.jpg'

const HERO_AVIF = `${heroAvif480} 480w, ${heroAvif768} 768w, ${heroAvif1200} 1200w, ${heroAvif1600} 1600w`
const HERO_WEBP = `${heroWebp480} 480w, ${heroWebp768} 768w, ${heroWebp1200} 1200w, ${heroWebp1600} 1600w`
// Colonne pleine largeur sur mobile, ~moitié du conteneur 1440px à partir de lg.
const HERO_SIZES = '(min-width: 1024px) 700px, 100vw'

export default function HomeHero() {
  const { t } = useTranslation(['common', 'accueil'])
  const { locale } = useLanguage()
  const marketplaceUrl = getMarketplaceUrl(locale)

  return (
    <section id="top" className="relative bg-surface pt-[104px] md:pt-[120px]">
      <RevealStagger eager className="mx-auto grid max-w-[1440px] grid-cols-1 gap-0 px-5 md:px-10 lg:grid-cols-2">
        {/* Colonne texte */}
        <div className="relative flex flex-col justify-start border-line/[0.08] py-12 lg:border-r lg:py-16 lg:pr-12">
          <RevealItem eager><Label>{t('accueil:hero.label')}</Label></RevealItem>
          <RevealItem as="h1" eager className="mt-7 font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
            {t('accueil:hero.title1')}<br />{t('accueil:hero.title2')}<br />{t('accueil:hero.title3')}<span className="text-wahm-orange">.</span>
          </RevealItem>
          <RevealItem as="p" eager className="mt-6 max-w-[440px] font-display text-[17px] font-semibold uppercase tracking-[0.01em] text-gold sm:text-[19px]">
            {t('accueil:hero.tagline')}
          </RevealItem>
          <RevealItem as="p" eager className="mt-6 max-w-[470px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('accueil:hero.text')}
          </RevealItem>
          <RevealItem as="div" eager className="mt-9 flex flex-wrap items-center gap-3">
            <Action to={marketplaceUrl} variant="filled" arrow>{t('accueil:hero.ctaDiscover')}</Action>
            <Action to="#communaute" variant="outline">{t('accueil:hero.ctaCommunity')}</Action>
          </RevealItem>
        </div>

        {/* Colonne image encadrée */}
        <RevealItem as="div" eager className="relative flex items-stretch pb-12 lg:pb-0 lg:pl-0 lg:pt-8">
          <Framed className="relative w-full">
            <div className="relative h-[380px] overflow-hidden sm:h-[480px] lg:h-full lg:min-h-[580px]">
              <picture>
                <source type="image/avif" srcSet={HERO_AVIF} sizes={HERO_SIZES} />
                <source type="image/webp" srcSet={HERO_WEBP} sizes={HERO_SIZES} />
                <img
                  src={heroJpg1200}
                  alt=""
                  aria-hidden="true"
                  width={1200}
                  height={800}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[60%_center] grayscale-[35%]"
                />
              </picture>
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
