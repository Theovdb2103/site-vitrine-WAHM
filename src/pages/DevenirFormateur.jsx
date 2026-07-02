import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Globe, Coins, Star, Settings, Users, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Page from '../components/Page'
import Reveal, { RevealStagger, RevealItem } from '../components/Reveal'
import { Label, SectionHead, Action, Framed, CornerTicks, Shot, Motif, TiltCard } from '../components/ui/Frame'
import { DisciplinesCarousel } from '../components/ui/DisciplinesCarousel'
import SectionOutro from '../components/SectionOutro'
import { localizedPath } from '../lib/site'
import { useLanguage } from '../context/LanguageContext'

// ===== Données « Pourquoi nous rejoindre » (icônes non traduisibles, zippées par
// index avec devenirFormateur:avantages.items) =====
const AVANTAGES_META = [
  { Icon: Globe },
  { Icon: Coins },
  { Icon: Star },
  { Icon: Settings },
  { Icon: Users },
]

// ===== Disciplines recherchées =====
// Photos Unsplash (nouvelles, hors bibliothèque) choisies selon chaque discipline.
// Zippées par index avec devenirFormateur:disciplines.items (name/tag traduits).
const UN = (id) => `https://images.unsplash.com/${id}?w=560&h=740&fit=crop&q=80&auto=format`
const DISCIPLINES_META = [
  { img: UN('photo-1591741543032-bf439b4fd46c'), pos: '50% 40%' },
  { img: UN('photo-1616279969722-d81a5a3944ef'), pos: '50% 28%' },
  { img: UN('photo-1767611094402-2b28863b834f'), pos: '50% 55%' },
  { img: UN('photo-1649751361457-01d3a696c7e6'), pos: '55% 35%' },
  { img: UN('photo-1547941126-3d5322b218b0'), pos: '50% 45%' },
  { img: UN('photo-1727463389191-22d60aa1f1ca'), pos: '50% 28%' },
  { img: UN('photo-1461468611824-46457c0e11fd'), pos: '62% 45%' },
  { img: UN('photo-1577344718665-3e7c0c1ecf6b'), pos: '50% 22%' },
]

// ===== Critères de sélection =====
// Photo Unsplash (nouvelle, hors bibliothèque) illustrant l'évaluation des candidats.
const CRIT_IMAGE = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&h=1000&fit=crop&q=80&auto=format'

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Style d'input « technical / severe » : coins carrés, focus orange.
const INPUT_CLASS =
  'w-full bg-surface border border-line/[0.14] px-4 py-3 font-sans text-[15px] text-fg placeholder:text-subtle outline-none transition-colors focus:border-wahm-orange'

const LABEL_CLASS = 'font-mono text-[11px] uppercase tracking-[0.14em] text-fg-soft mb-2 block'

// Variante claire (panneau crème du formulaire candidature) : inputs blancs, focus jaune WAHM.
const INPUT_LIGHT =
  'w-full rounded-lg border-[1.5px] border-[#c9c2ae] bg-white px-4 py-3 font-sans text-[15px] text-wahm-navy placeholder:text-[#8a8475] outline-none transition-colors focus:border-wahm-gold focus:bg-white focus:ring-2 focus:ring-wahm-gold/25'
const LABEL_LIGHT = 'mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5c5546]'

export default function DevenirFormateur() {
  const { t } = useTranslation(['common', 'devenirFormateur'])
  const { locale } = useLanguage()

  const avantagesItems = t('devenirFormateur:avantages.items', { returnObjects: true })
  const disciplinesItems = t('devenirFormateur:disciplines.items', { returnObjects: true })
  const criteresItems = t('devenirFormateur:criteres.items', { returnObjects: true })
  const etapesItems = t('devenirFormateur:etapes.items', { returnObjects: true })
  const candidatureBenefits = t('devenirFormateur:candidature.benefits', { returnObjects: true })

  // Zip texte traduit + icônes/images structurelles (par index).
  const avantages = avantagesItems.map((a, i) => ({ ...a, Icon: AVANTAGES_META[i].Icon }))
  const disciplines = disciplinesItems.map((d, i) => ({ ...d, ...DISCIPLINES_META[i] }))

  // Progression de la timeline liée au scroll (le rail se remplit + point lumineux).
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.78', 'end 0.55'] })
  const railScaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const dotTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Validation client minimale.
    const nom = (formData.get('nom') || '').toString().trim()
    const email = (formData.get('email') || '').toString().trim()
    const domaine = (formData.get('domaine') || '').toString().trim()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!nom || !email || !domaine || !emailOk) {
      setErrorMsg(t('devenirFormateur:candidature.form.errors.invalid'))
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMsg('')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_CANDIDATURE,
        {
          from_name: nom,
          from_email: email,
          domaine,
          theme: (formData.get('theme') || '').toString().trim(),
          echantillon: (formData.get('echantillon') || '').toString().trim(),
          refs: (formData.get('refs') || '').toString().trim(),
          bio: (formData.get('bio') || '').toString().trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
    } catch (err) {
      console.error(err)
      setErrorMsg(t('devenirFormateur:candidature.form.errors.network'))
      setStatus('error')
    }
  }

  return (
    <Page title={t('devenirFormateur:meta.title')} description={t('devenirFormateur:meta.description')} pathKey="/devenir-formateur">

      {/* ===== HERO ===== */}
      <Reveal as="section" className={`${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={WRAP}>
          <div className="relative grid border-l border-t border-line/[0.08] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative border-b border-r border-line/[0.08] p-7 py-12 md:p-12 md:py-16">
              <CornerTicks />
              <Label>{t('devenirFormateur:hero.label')}</Label>
              <h1 className="mt-7 max-w-[900px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
                {t('devenirFormateur:hero.title')}<span className="text-wahm-orange">.</span>
              </h1>
              <p className="mt-7 max-w-[600px] font-sans text-[16px] leading-[1.7] text-muted">
                {t('devenirFormateur:hero.subtitle')}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Action to="#candidature" variant="filled" arrow>{t('devenirFormateur:hero.ctaApply')}</Action>
                <Action to={localizedPath('/contact', locale)} variant="outline">{t('devenirFormateur:hero.ctaContact')}</Action>
              </div>
            </div>
            <div className="relative border-b border-r border-line/[0.08]">
              <CornerTicks />
              <Shot src="/assets/media/formateur-portrait.webp" alt={t('devenirFormateur:hero.imageAlt')} className="h-full min-h-[280px] w-full" position="top" corners />
              <Motif color="#D4A018" cols={5} rows={3} className="pointer-events-none absolute bottom-5 left-5 hidden w-[150px] md:grid" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== POURQUOI NOUS REJOINDRE ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label={t('devenirFormateur:avantages.label')}>
            {t('devenirFormateur:avantages.title')}
          </SectionHead>
          <p className="mt-6 max-w-[780px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('devenirFormateur:avantages.intro')}
          </p>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-line/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {avantages.map((a) => (
              <TiltCard key={a.title} className="border-b border-r border-line/[0.08] p-7 md:p-8">
                <span className="flex h-12 w-12 items-center justify-center border border-line/[0.12] text-gold">
                  <a.Icon className="h-[24px] w-[24px]" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-fg md:text-[20px]">{a.title}</h3>
                <p className="mt-3 font-sans text-[14px] leading-[1.6] text-muted">{a.desc}</p>
              </TiltCard>
            ))}
            {/* Carte de mise en avant */}
            <TiltCard className="flex flex-col justify-center border-b border-r border-line/[0.08] bg-surface-2 p-7 md:p-8">
              <p className="m-0 font-display text-[16px] font-bold uppercase leading-[1.3] tracking-[0.01em] text-gold">
                {t('devenirFormateur:avantages.highlight.title')}
              </p>
              <p className="mt-4 font-sans text-[14px] leading-[1.6] text-muted">
                {t('devenirFormateur:avantages.highlight.text1')}
              </p>
              <p className="mt-3 font-sans text-[14px] leading-[1.6] text-muted">
                {t('devenirFormateur:avantages.highlight.text2')}
              </p>
            </TiltCard>
          </div>
        </div>
      </Reveal>

      {/* ===== DISCIPLINES (grille) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <Label>{t('devenirFormateur:disciplines.label')}</Label>
          <h2 className="mt-5 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-fg sm:text-[36px] md:text-[44px]">
            {t('devenirFormateur:disciplines.title')}<span className="text-wahm-orange">.</span>
          </h2>
          <p className="mt-5 max-w-[640px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('devenirFormateur:disciplines.subtitle')}
          </p>

          {/* Carrousel de cartes verticales (3 visibles) — flèches latérales */}
          <div className="mt-12 md:mt-14">
            <DisciplinesCarousel items={disciplines} />
          </div>

          <SectionOutro>{t('devenirFormateur:disciplines.outro')}</SectionOutro>
        </div>
      </Reveal>

      {/* ===== CRITERES (image + fiche d'évaluation façon feuille) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label={t('devenirFormateur:criteres.label')}>{t('devenirFormateur:criteres.title')}</SectionHead>
          <p className="mt-6 max-w-[640px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('devenirFormateur:criteres.subtitle')}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-16 md:mt-14">
            {/* Image */}
            <div className="relative border border-line/[0.08]">
              <CornerTicks />
              <Shot src={CRIT_IMAGE} alt={t('devenirFormateur:criteres.imageAlt')} className="aspect-square w-full" position="50% 30%" corners />
            </div>

            {/* Fiche d'évaluation — effet feuille posée, légèrement inclinée */}
            <div className="relative mx-auto w-full max-w-[540px] -rotate-1 bg-wahm-cream p-10 shadow-2xl shadow-black/50 md:p-12">
              <span aria-hidden="true" className="absolute right-0 top-0 border-b-[34px] border-l-[34px] border-b-transparent border-l-[#e7e1d2]" />
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-wahm-gold via-wahm-orange to-wahm-gold" />

              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-wahm-goldDark">{t('devenirFormateur:criteres.cardKicker')}</span>
                <span className="shrink-0 -rotate-6 border-[1.5px] border-wahm-orange/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-wahm-orange">
                  {t('devenirFormateur:criteres.cardBadge')}
                </span>
              </div>

              <h3 className="mt-4 font-display text-[26px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-wahm-navy md:text-[30px]">
                {t('devenirFormateur:criteres.cardTitle')}
              </h3>
              <span aria-hidden="true" className="mt-4 block h-px w-full bg-[#dcd6c8]" />

              <ul className="mt-7 space-y-5">
                {criteresItems.map((c) => (
                  <li key={c} className="flex items-start gap-4 border-b border-dashed border-[#dcd6c8] pb-5 last:border-b-0 last:pb-0">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-wahm-goldDark text-white">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="font-sans text-[16px] font-semibold leading-[1.45] text-wahm-navy md:text-[16.5px]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== CINQ ETAPES ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label={t('devenirFormateur:etapes.label')}>
            {t('devenirFormateur:etapes.title')}
          </SectionHead>
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,780px)_1fr] lg:items-stretch lg:gap-14">
          <div ref={timelineRef} className="relative">
            {/* Rail statique */}
            <span aria-hidden="true" className="absolute left-[21px] top-3 bottom-3 w-px bg-line/[0.1] md:left-[25px]" />
            {/* Rail de progression (se remplit au scroll) */}
            <motion.span aria-hidden="true" style={{ scaleY: railScaleY }} className="absolute left-[21px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-wahm-orange to-wahm-gold md:left-[25px]" />
            {/* Point lumineux qui descend au scroll */}
            <motion.span aria-hidden="true" style={{ top: dotTop }} className="absolute left-[21px] z-0 -ml-[5px] mt-3 h-[11px] w-[11px] -translate-y-1/2 rounded-full bg-wahm-orange shadow-[0_0_16px_4px_rgba(255,123,44,0.7)] md:left-[25px]" />

            <RevealStagger as="ol" className="relative m-0 list-none p-0">
              {etapesItems.map((step, i) => (
                <RevealItem as="li" key={step.title} className="relative flex gap-5 pb-12 last:pb-0 md:gap-8 md:pb-[68px]">
                  {/* Nœud numéroté */}
                  <span className="relative z-[1] flex h-[44px] w-[44px] shrink-0 items-center justify-center border border-wahm-orange/40 bg-surface font-display text-[15px] font-black text-gold md:h-[52px] md:w-[52px] md:text-[18px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1.5 md:pt-2.5">
                    <h3 className="font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-fg md:text-[20px]">{step.title}</h3>
                    <p className="mt-2 max-w-[620px] font-sans text-[15px] leading-[1.6] text-muted">{step.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
            {/* Visuel : épouse exactement la hauteur des étapes (image en absolu). */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0">
                <Framed className="h-full bg-surface-2">
                  <Shot src="/assets/media/etapes-visual.webp" alt={t('devenirFormateur:etapes.imageAlt')} className="h-full w-full" position="50% 46%" corners />
                </Framed>
              </div>
            </div>
          </div>
          <SectionOutro>{t('devenirFormateur:etapes.outro')}</SectionOutro>
        </div>
      </Reveal>

      {/* ===== CANDIDATURE — FORMULAIRE (2 colonnes) ===== */}
      <section id="candidature" className={`${SECTION} scroll-mt-[80px] py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden border border-line/[0.08] lg:grid-cols-2">
            <CornerTicks className="pointer-events-none absolute inset-0 z-20" />

            {/* Panneau gauche : accroche (sombre, dégradé nuit → orange) */}
            <div className="relative flex flex-col justify-center overflow-hidden p-10 md:p-14" style={{ background: 'linear-gradient(135deg,#0b1a30 0%,#0A1A2F 46%,#5a2a0a 100%)' }}>
              <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-wahm-orange/20 blur-3xl" />
              <div className="relative">
                <Label>{t('devenirFormateur:candidature.label')}</Label>
                <h2 className="mt-7 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-white sm:text-[36px] md:text-[44px]">
                  {t('devenirFormateur:candidature.title')}<span className="text-wahm-orange">.</span>
                </h2>
                <p className="mt-6 max-w-[420px] font-sans text-[15.5px] leading-[1.7] text-white/70">
                  {t('devenirFormateur:candidature.text')}
                </p>
                <ul className="mt-9 space-y-4">
                  {candidatureBenefits.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center border border-wahm-orange/40 bg-wahm-orange/10 text-wahm-goldLight"><Check className="h-[14px] w-[14px]" strokeWidth={3} /></span>
                      <span className="font-display text-[13.5px] font-bold uppercase tracking-[0.01em] text-white">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne droite : panneau clair, formulaire / succès */}
            <div className="bg-wahm-cream p-8 md:p-11">
              <h3 className="font-display text-[22px] font-extrabold uppercase tracking-[-0.01em] text-wahm-navy sm:text-[24px]">{t('devenirFormateur:candidature.formTitle')}</h3>
              <p className="mt-2 font-sans text-[14px] leading-[1.6] text-subtle">{t('devenirFormateur:candidature.formSubtitle')}</p>

              <div className="mt-7">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-wahm-orange text-white">
                  <Check className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
                </span>
                <h3 className="m-0 font-display text-[24px] font-extrabold uppercase tracking-[-0.01em] text-wahm-navy">{t('devenirFormateur:candidature.success.title')}</h3>
                <p className="mx-auto mt-3 max-w-[480px] font-sans text-[15px] leading-[1.7] text-subtle">
                  {t('devenirFormateur:candidature.success.text')}
                </p>
              </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot anti-spam — doit rester vide */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
                    style={{ position: 'absolute', left: '-9999px' }}
                  />

                  <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
                    <div>
                      <label htmlFor="f-nom" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.nom')}</label>
                      <input id="f-nom" name="nom" type="text" required autoComplete="name" placeholder={t('devenirFormateur:candidature.form.placeholders.nom')} className={INPUT_LIGHT} />
                    </div>
                    <div>
                      <label htmlFor="f-email" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.email')}</label>
                      <input id="f-email" name="email" type="email" required autoComplete="email" placeholder={t('devenirFormateur:candidature.form.placeholders.email')} className={INPUT_LIGHT} />
                    </div>
                  </div>

                  <div className="mt-[18px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
                    <div>
                      <label htmlFor="f-domaine" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.domaine')}</label>
                      <input id="f-domaine" name="domaine" type="text" required placeholder={t('devenirFormateur:candidature.form.placeholders.domaine')} className={INPUT_LIGHT} />
                    </div>
                    <div>
                      <label htmlFor="f-theme" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.theme')}</label>
                      <input id="f-theme" name="theme" type="text" placeholder={t('devenirFormateur:candidature.form.placeholders.theme')} className={INPUT_LIGHT} />
                    </div>
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-echantillon" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.echantillon')}</label>
                    <input id="f-echantillon" name="echantillon" type="text" placeholder={t('devenirFormateur:candidature.form.placeholders.echantillon')} className={INPUT_LIGHT} />
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-refs" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.refs')}</label>
                    <input id="f-refs" name="refs" type="text" placeholder={t('devenirFormateur:candidature.form.placeholders.refs')} className={INPUT_LIGHT} />
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-bio" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.bio')}</label>
                    <textarea
                      id="f-bio"
                      name="bio"
                      placeholder={t('devenirFormateur:candidature.form.placeholders.bio')}
                      className={`${INPUT_LIGHT} min-h-[110px] resize-y`}
                    />
                  </div>

                  {status === 'error' && errorMsg && (
                    <p role="alert" className="mt-4 rounded-lg border border-wahm-orange/40 bg-wahm-orange/10 px-4 py-3 font-sans text-[14px] text-[#9a3412]">
                      {errorMsg}
                    </p>
                  )}

                  <div className="mt-[26px]">
                    <Action type="submit" variant="filled" arrow disabled={status === 'submitting'} className="w-full disabled:cursor-not-allowed disabled:opacity-60">
                      {status === 'submitting' ? t('devenirFormateur:candidature.form.submitting') : t('devenirFormateur:candidature.form.submit')}
                    </Action>
                  </div>

                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">
                    {t('devenirFormateur:candidature.form.consent')}
                  </p>
                </form>
            )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </Page>
  )
}
