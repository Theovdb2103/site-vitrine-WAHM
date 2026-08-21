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

// Teinte des traits de la grille de repères — même valeur que les liserés de section
// du reste du site, pour rester discret.
const RULE = 'bg-line/[0.08]'

// Petit carré orange posé sur une intersection de la grille (même vocabulaire que les
// CornerTicks du reste du site). Le positionnement — y compris le centrage sur le
// point d'intersection — est entièrement passé par `className`.
function GuideMark({ className = '' }) {
  return <span aria-hidden="true" className={`absolute h-[5px] w-[5px] bg-wahm-orange ${className}`} />
}

// Repères verticaux courant sur TOUTE la hauteur du héros : les deux bords du
// conteneur et la césure entre les colonnes texte / image. Calque au-dessus de la
// photo (z-[2]) pour que les traits et les carrés restent lisibles par-dessus elle.
// Masqué sous lg, où les colonnes sont empilées et la grille n'aurait aucun sens.
function HeroGuides() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
      <div className="mx-auto h-full max-w-[1440px] px-5 md:px-10">
        <div className="relative h-full">
          <span className={`absolute inset-y-0 left-0 w-px ${RULE}`} />
          <span className={`absolute inset-y-0 left-1/2 w-px ${RULE}`} />
          <span className={`absolute inset-y-0 right-0 w-px ${RULE}`} />
          {/* Pas de carrés de pied : le liseré du bas est partagé avec la bande de
              statistiques qui suit, dont les propres repères couvrent déjà ces
              positions (et deux de plus). En poser ici les dupliquerait. */}
        </div>
      </div>
    </div>
  )
}

export default function HomeHero() {
  const { t } = useTranslation(['common', 'accueil'])
  const { locale } = useLanguage()
  const marketplaceUrl = getMarketplaceUrl(locale)

  return (
    // overflow-x-clip : la barre traversante se prolonge de 100vw de chaque côté pour
    // rejoindre les bords de l'écran — on rogne donc l'horizontale pour éviter tout
    // débordement. Surtout pas overflow-hidden, qui rognerait AUSSI la verticale et
    // couperait en deux les repères posés à cheval sur les bords de la section.
    <section id="top" className="relative overflow-x-clip bg-surface pt-[104px] md:pt-[120px]">
      <HeroGuides />
      <RevealStagger eager className="mx-auto grid max-w-[1440px] grid-cols-1 gap-0 px-5 md:px-10 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr]">
        {/* Colonne texte, rangée 1 : accroche + titre. À partir de lg le texte est mis
            en retrait des traits de la grille (pl/pr/pt/pb) pour ne jamais les toucher —
            retrait plus serré à lg, où la colonne est la plus étroite. */}
        <div className="relative flex flex-col justify-start pb-3 pt-12 lg:col-start-1 lg:row-start-1 lg:pb-14 lg:pl-8 lg:pr-8 lg:pt-14 xl:pl-12 xl:pr-12">
          <RevealItem eager><Label>{t('accueil:hero.label')}</Label></RevealItem>
          <RevealItem as="h1" eager className="mt-7 font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
            {t('accueil:hero.title1')}<br />{t('accueil:hero.title2')}<br />{t('accueil:hero.title3')}<span className="text-wahm-orange">.</span>
          </RevealItem>
        </div>

        {/* Colonne texte, rangée 3 : tagline + texte + boutons */}
        <div className="relative flex flex-col justify-start pb-12 pt-3 lg:col-start-1 lg:row-start-3 lg:pb-16 lg:pl-8 lg:pr-8 lg:pt-14 xl:pl-12 xl:pr-12">
          <RevealItem as="p" eager className="max-w-[440px] font-display text-[17px] font-semibold uppercase tracking-[0.01em] text-gold sm:text-[19px]">
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

        {/* Colonne image — s'étend sur les trois rangées et vient coller le header
            (la marge négative annule l'écart restant sous la barre fixe de 72px). */}
        <RevealItem as="div" eager className="relative flex items-stretch pb-12 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:-mt-12 lg:pb-0">
          <Framed className="relative w-full" ticks={false}>
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
            </div>
          </Framed>
        </RevealItem>

        {/* Barre de séparation traversante (rangée 2). Dernière du DOM pour passer
            AU-DESSUS de l'image, et prolongée jusqu'aux bords de l'écran. */}
        <div className={`relative hidden h-px lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:block ${RULE}`}>
          <span aria-hidden="true" className={`absolute right-full top-0 h-px w-screen ${RULE}`} />
          <span aria-hidden="true" className={`absolute left-full top-0 h-px w-screen ${RULE}`} />
          <GuideMark className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <GuideMark className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <GuideMark className="right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
        </div>
      </RevealStagger>
    </section>
  )
}
