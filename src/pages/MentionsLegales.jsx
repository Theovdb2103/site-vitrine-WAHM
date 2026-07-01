import { useTranslation } from 'react-i18next'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, Action, CornerTicks, Framed, Motif } from '../components/ui/Frame'
import { useLanguage } from '../context/LanguageContext'
import { localizedPath } from '../lib/site'

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// IDs des sections légales — non traduisibles (ancres HTML stables).
const SECTION_IDS = ['mentions', 'cgu', 'cgv', 'confidentialite', 'cookies']

// Petits composants de mise en forme du corps légal (lecture longue, fond sombre).
function H2({ index, children }) {
  return (
    <div className="mb-7">
      {index && <span className="font-mono text-[12px] tracking-[0.2em] text-gold">{index}</span>}
      <h2 className="m-0 mt-3 font-display text-[26px] font-extrabold uppercase leading-[1.06] tracking-[-0.01em] text-fg md:text-[30px]">
        {children}<span className="text-wahm-orange">.</span>
      </h2>
      <div className="mt-5 h-[3px] w-11 bg-wahm-orange" aria-hidden="true" />
    </div>
  )
}

function H3({ children }) {
  return <h3 className="mb-[10px] mt-7 font-display text-[16px] font-bold text-fg-soft md:text-[17px]">{children}</h3>
}

function P({ children, className = '' }) {
  return <p className={`m-0 font-sans text-[15px] leading-relaxed text-muted ${className}`}>{children}</p>
}

// Mention « à compléter / à préciser » — valeur juridique non encore renseignée.
function TBD({ children }) {
  return <em className="not-italic font-medium text-gold">{children}</em>
}

// Lien mailto sur fond sombre.
function Mail({ href, children }) {
  return (
    <a href={href} className="font-semibold text-gold no-underline transition-colors hover:text-wahm-orange">
      {children}
    </a>
  )
}

export default function MentionsLegales() {
  const { t } = useTranslation(['common', 'mentionsLegales'])
  const { locale } = useLanguage()

  const sections = t('mentionsLegales:sections', { returnObjects: true })
  const cguArticles = t('mentionsLegales:cgu.articles', { returnObjects: true })
  const cgvArticles = t('mentionsLegales:cgv.articles', { returnObjects: true })

  return (
    <Page title={t('mentionsLegales:meta.title')} description={t('mentionsLegales:meta.description')} pathKey="/mentions-legales">

      {/* ===== HERO ===== */}
      <Reveal as="section" className={`${SECTION} pb-14 pt-[120px] md:pt-[150px]`}>
        <div className={`${WRAP} relative`}>
          <CornerTicks />
          <Motif color="#D4A018" cols={5} rows={4} className="pointer-events-none absolute right-5 top-1/2 hidden w-[180px] -translate-y-1/2 md:right-10 lg:grid" />
          <Label>{t('mentionsLegales:hero.label')}</Label>
          <h1 className="m-0 mt-5 font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
            {t('mentionsLegales:hero.title')}<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-5 max-w-[680px] font-sans text-[15px] italic leading-relaxed text-subtle">
            {t('mentionsLegales:hero.subtitle')}
          </p>
        </div>
      </Reveal>

      {/* ===== CORPS ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={`${WRAP} grid grid-cols-1 items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-16`}>

          {/* SOMMAIRE */}
          <nav aria-label={t('mentionsLegales:sommaire.ariaLabel')} className="lg:sticky lg:top-[120px]">
            <Framed className="bg-surface-2 p-6">
              <Label className="mb-5">{t('mentionsLegales:sommaire.label')}</Label>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {sections.map((s, i) => (
                  <li key={SECTION_IDS[i]}>
                    <a
                      href={`#${SECTION_IDS[i]}`}
                      className="flex items-baseline gap-3 py-[7px] font-mono text-[12px] uppercase tracking-[0.12em] text-muted no-underline transition-colors hover:text-gold"
                    >
                      <span className="text-gold">{String(i + 1).padStart(2, '0')}</span>
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Framed>
          </nav>

          {/* CONTENU */}
          <div className="min-w-0 max-w-[820px]">

            {/* MENTIONS LÉGALES */}
            <div id="mentions" className="scroll-mt-[120px]">
              <H2 index="01">{t('mentionsLegales:mentions.title')}</H2>
              <H3>{t('mentionsLegales:mentions.editeur.title')}</H3>
              <P>
                World Academy of Human Movement (WAHM).<br />
                {t('mentionsLegales:mentions.editeur.formeJuridiqueLabel')} <TBD>{t('mentionsLegales:mentions.editeur.formeJuridiqueTbd')}</TBD>.<br />
                {t('mentionsLegales:mentions.editeur.siegeSocialLabel')} <TBD>{t('mentionsLegales:mentions.editeur.siegeSocialTbd')}</TBD>.<br />
                {t('mentionsLegales:mentions.editeur.numeroEntrepriseLabel')} <TBD>{t('mentionsLegales:mentions.editeur.numeroEntrepriseTbd')}</TBD>.<br />
                {t('mentionsLegales:mentions.editeur.tvaLabel')} <TBD>{t('mentionsLegales:mentions.editeur.tvaTbd')}</TBD>.<br />
                {t('mentionsLegales:mentions.editeur.emailLabel')} contact@wahm.com.<br />
                {t('mentionsLegales:mentions.editeur.responsablePublicationLabel')} <TBD>{t('mentionsLegales:mentions.editeur.responsablePublicationTbd')}</TBD>.
              </P>
              <H3>{t('mentionsLegales:mentions.hebergement.title')}</H3>
              <P>
                {t('mentionsLegales:mentions.hebergement.hebergeurLabel')} <TBD>{t('mentionsLegales:mentions.hebergement.hebergeurTbd')}</TBD>.<br />
                {t('mentionsLegales:mentions.hebergement.adresseLabel')} <TBD>{t('mentionsLegales:mentions.hebergement.adresseTbd')}</TBD>.<br />
                {t('mentionsLegales:mentions.hebergement.siteWebLabel')} <TBD>{t('mentionsLegales:mentions.hebergement.siteWebTbd')}</TBD>.
              </P>
              <H3>{t('mentionsLegales:mentions.propriete.title')}</H3>
              <P>{t('mentionsLegales:mentions.propriete.text')}</P>
            </div>

            {/* CGU */}
            <div id="cgu" className="mt-14 scroll-mt-[120px] border-t border-line/[0.08] pt-12">
              <H2 index="02">{t('mentionsLegales:cgu.title')}</H2>
              {cguArticles.map((a) => (
                <div key={a.title}>
                  <H3>{a.title}</H3>
                  <P>{a.text}</P>
                </div>
              ))}
            </div>

            {/* CGV */}
            <div id="cgv" className="mt-14 scroll-mt-[120px] border-t border-line/[0.08] pt-12">
              <H2 index="03">{t('mentionsLegales:cgv.title')}</H2>
              {cgvArticles.map((a, i) => (
                <div key={a.title}>
                  <H3>{a.title}</H3>
                  {a.text ? (
                    <P>{a.text}</P>
                  ) : (
                    <P>
                      {a.textPrefix}<TBD>{a.tbd}</TBD>{a.textSuffix}
                    </P>
                  )}
                </div>
              ))}
            </div>

            {/* CONFIDENTIALITÉ (RGPD) */}
            <div id="confidentialite" className="mt-14 scroll-mt-[120px] border-t border-line/[0.08] pt-12">
              <H2 index="04">{t('mentionsLegales:confidentialite.title')}</H2>
              <P className="mb-[14px]">{t('mentionsLegales:confidentialite.paragraphe1')}</P>
              <P className="mb-[14px]">{t('mentionsLegales:confidentialite.paragraphe2')}</P>
              <P>
                {t('mentionsLegales:confidentialite.paragraphe3Prefix')}{' '}
                <Mail href="mailto:privacy@wahm.com">{t('mentionsLegales:confidentialite.emailLink')}</Mail>.
              </P>
            </div>

            {/* COOKIES */}
            <div id="cookies" className="mt-14 scroll-mt-[120px] border-t border-line/[0.08] pt-12">
              <H2 index="05">{t('mentionsLegales:cookies.title')}</H2>
              <P className="mb-[14px]">{t('mentionsLegales:cookies.paragraphe1')}</P>
              <P>
                {t('mentionsLegales:cookies.paragraphe2Prefix')}{' '}
                <Mail href="mailto:privacy@wahm.com">{t('mentionsLegales:cookies.emailLink')}</Mail>.
              </P>
            </div>

            {/* RETOUR */}
            <div className="mt-14 border-t border-line/[0.08] pt-12">
              <Action to={localizedPath('/', locale)} variant="outline" arrow>{t('mentionsLegales:retour')}</Action>
            </div>

          </div>
        </div>
      </Reveal>

    </Page>
  )
}
