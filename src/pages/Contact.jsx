import { useEffect, useRef, useState } from 'react'
import { Mail, Clock, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif } from '../components/ui/Frame'
import { useLanguage } from '../context/LanguageContext'
import { localizedPath } from '../lib/site'

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Style des champs — bord fin, coins carrés, focus orange (langage « technical / severe »).
const inputClass =
  'w-full bg-surface border border-line/[0.14] px-4 py-3 font-sans text-[15px] text-fg placeholder:text-subtle outline-none transition-colors focus:border-wahm-orange'

const labelClass = 'font-mono text-[11px] uppercase tracking-[0.14em] text-fg-soft mb-2 block'

// Icônes / href non traduisibles — zippées par index avec les textes de contact.coordonnees.
const COORDONNEES_META = [
  { Icon: Mail, href: 'mailto:contact@wahm.com' },
  { Icon: Clock },
]

// Réseaux sociaux — icônes SVG inline (lucide n'inclut plus les marques) + noms de
// marque non traduisibles (utilisés aussi comme aria-label).
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[19px] w-[19px]">
        <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h4v12H3zM10 9h3.8v1.6h.05c.53-.95 1.8-1.95 3.7-1.95 3.96 0 4.45 2.45 4.45 5.65V21h-4v-5.1c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.96 1.3-1.96 2.66V21h-4z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[19px] w-[19px]">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[19px] w-[19px]">
        <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const { t } = useTranslation(['common', 'contact'])
  const { locale } = useLanguage()
  const coordonnees = t('contact:coordonnees', { returnObjects: true })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const successRef = useRef(null)

  // Au succès, on déplace le focus sur la confirmation pour que les lecteurs d'écran
  // l'annoncent et que la navigation clavier ne reparte pas du haut de page.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append('_type', 'contact')

    // Validation client minimale (le backend revalide de toute façon).
    const nom = (formData.get('nom') || '').toString().trim()
    const email = (formData.get('email') || '').toString().trim()
    const message = (formData.get('message') || '').toString().trim()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!nom || !emailOk || !message) {
      setStatus('error')
      setErrorMsg(t('contact:form.errors.invalid'))
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/form-handler.php', { method: 'POST', body: formData })
      const data = await res.json()
      if (data && data.ok) {
        setStatus('success')
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch {
          /* noop */
        }
      } else {
        setStatus('error')
        setErrorMsg((data && data.error) || t('contact:form.errors.failed'))
      }
    } catch {
      setStatus('error')
      setErrorMsg(t('contact:form.errors.network'))
    }
  }

  return (
    <Page title={t('contact:meta.title')} description={t('contact:meta.description')} path="/contact">

      {/* ===== HERO ===== */}
      <Reveal as="section" className={`${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={`${WRAP} relative py-12 md:py-16`}>
          <CornerTicks />
          <Motif color="#D4A018" cols={6} rows={5} className="pointer-events-none absolute right-5 top-1/2 hidden w-[210px] -translate-y-1/2 md:right-10 lg:grid" />
          <Label>{t('contact:hero.label')}</Label>
          <h1 className="mt-7 max-w-[620px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
            {t('contact:hero.title')}<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-6 max-w-[560px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('contact:hero.subtitle')}
          </p>
        </div>
      </Reveal>

      {/* ===== CONTACT (info + formulaire) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={`${WRAP} grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14`}>

          {/* ----- Colonne info / coordonnées ----- */}
          <div>
            <Framed className="relative bg-surface-2 p-7 md:p-9">
              <Label>{t('contact:info.writeToUs')}</Label>
              <a
                href="mailto:contact@wahm.com"
                className="mt-5 block font-display text-[22px] font-extrabold text-fg no-underline transition-colors hover:text-gold"
              >
                contact@wahm.com
              </a>
              <p className="mt-3 font-sans text-[14px] leading-[1.6] text-muted">
                {t('contact:info.responseNote')}
              </p>

              <div className="my-7 h-px bg-line/[0.08]" />

              {/* Détails de contact avec icônes lucide en carrés bordés */}
              <div className="flex flex-col gap-5">
                {coordonnees.map((c, i) => {
                  const meta = COORDONNEES_META[i]
                  return (
                    <div key={c.title} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line/[0.12] text-gold">
                        <meta.Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{c.title}</div>
                        {meta.href ? (
                          <a href={meta.href} className="mt-1 block font-display text-[16px] font-bold text-fg no-underline transition-colors hover:text-wahm-orange">{c.value}</a>
                        ) : (
                          <div className="mt-1 font-display text-[16px] font-bold text-fg">{c.value}</div>
                        )}
                        <p className="mt-1 font-sans text-[13.5px] leading-[1.55] text-muted">{c.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="my-7 h-px bg-line/[0.08]" />

              <div className="font-display text-[16px] font-bold uppercase tracking-[0.01em] text-fg">{t('contact:info.partnership.title')}</div>
              <p className="mb-6 mt-3 font-sans text-[14px] leading-[1.6] text-muted">
                {t('contact:info.partnership.text')}
              </p>
              <Action to={localizedPath('/devenir-formateur', locale)} variant="outline" size="sm" arrow>{t('contact:info.partnership.cta')}</Action>
            </Framed>

            {/* Réseaux sociaux */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center border border-line/[0.14] py-3.5 text-fg-soft no-underline transition-colors hover:border-wahm-orange hover:text-wahm-orange"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* ----- Colonne formulaire ----- */}
          <div>
            {status === 'success' ? (
              <Framed className="relative bg-surface-2 p-10 text-center md:p-12" role="status" aria-live="polite">
                <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-wahm-orange text-white">
                  <Check className="h-7 w-7" strokeWidth={2.6} aria-hidden="true" />
                </span>
                <h3 ref={successRef} tabIndex={-1} className="m-0 font-display text-[24px] font-extrabold uppercase tracking-[-0.01em] text-fg focus:outline-none">{t('contact:form.success.title')}<span className="text-wahm-orange">.</span></h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.6] text-muted">
                  {t('contact:form.success.text')}
                </p>
              </Framed>
            ) : (
              <Framed className="relative bg-surface-2 p-7 md:p-9">
                <SectionHead label={t('contact:form.label')} className="mb-8">{t('contact:form.title')}</SectionHead>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot anti-spam — doit rester vide (caché visuellement). */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
                  />

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-nom" className={labelClass}>{t('contact:form.fields.nom')}</label>
                      <input id="f-nom" name="nom" className={inputClass} placeholder={t('contact:form.placeholders.nom')} required />
                    </div>
                    <div>
                      <label htmlFor="f-email" className={labelClass}>{t('contact:form.fields.email')}</label>
                      <input id="f-email" name="email" type="email" className={inputClass} placeholder={t('contact:form.placeholders.email')} required />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="f-sujet" className={labelClass}>{t('contact:form.fields.sujet')}</label>
                    <input id="f-sujet" name="sujet" className={inputClass} placeholder={t('contact:form.placeholders.sujet')} />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="f-message" className={labelClass}>{t('contact:form.fields.message')}</label>
                    <textarea
                      id="f-message"
                      name="message"
                      className={`${inputClass} min-h-[150px] resize-y`}
                      placeholder={t('contact:form.placeholders.message')}
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="mt-4 font-sans text-[14px] font-medium text-wahm-orange">{errorMsg}</p>
                  )}

                  <div className="mt-7">
                    <Action type="submit" variant="filled" arrow disabled={status === 'submitting'} className="w-full disabled:cursor-not-allowed disabled:opacity-60">
                      {status === 'submitting' ? t('contact:form.submitting') : t('contact:form.submit')}
                    </Action>
                  </div>

                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">
                    {t('contact:form.consent')}
                  </p>
                </form>
              </Framed>
            )}
          </div>

        </div>
      </Reveal>

    </Page>
  )
}
