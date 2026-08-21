import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, Action } from '../components/ui/Frame'

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Style des champs — bord fin, coins carrés, focus orange (langage « technical / severe »).
const inputClass =
  'w-full bg-surface border border-line/[0.14] px-4 py-3 font-sans text-[15px] text-fg placeholder:text-subtle outline-none transition-colors focus:border-wahm-orange'

const labelClass = 'font-mono text-[11px] uppercase tracking-[0.14em] text-fg-soft mb-2 block'

// Le select natif garde son menu system (accessible, localisé) mais perd son
// habillage par défaut, incohérent avec les autres champs — d'où le chevron dessiné.
const selectClass = `${inputClass} appearance-none cursor-pointer pr-10`

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
  const sujetOptions = t('contact:form.sujetOptions', { returnObjects: true })
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
      // Le SDK n'est utile qu'à l'envoi : le charger ici évite de le livrer à
      // l'affichage de la page.
      const { send } = await import('@emailjs/browser')
      await send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT,
        {
          from_name: nom,
          from_email: email,
          phone: (formData.get('telephone') || '').toString().trim() || '(non renseigné)',
          subject: formData.get('sujet') || '(sans sujet)',
          message: message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg(t('contact:form.errors.network'))
    }
  }

  return (
    <Page title={t('contact:meta.title')} description={t('contact:meta.description')} path="/contact">

      {/* ===== HERO — bandeau photo, titre centré (cf. template de référence) ===== */}
      {/* pt = hauteur exacte du header fixe : le bandeau vient le coller, comme le template. */}
      <Reveal as="section" eager className={`${SECTION} overflow-x-clip pt-[72px]`}>
        {/* Bandeau pleine largeur d'écran — posé HORS du conteneur, contrairement aux
            autres sections du site : c'est le parti pris du template. */}
        <div className="relative">
          <div className="relative h-[320px] overflow-hidden bg-surface-2 md:h-[420px] lg:h-[500px]">
            <img
              src="/assets/media/contact-hero.webp"
              alt=""
              aria-hidden="true"
              width={2400}
              height={840}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            {/* Voile bleu nuit : la photo passe au second plan, le titre reste lisible */}
            <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgb(var(--c-scrim) / 0.52) 0%, rgb(var(--c-scrim) / 0.72) 100%)' }} />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
              <Label>{t('contact:hero.label')}</Label>
              <h1 className="mt-6 max-w-[900px] font-display text-[38px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
                {t('contact:hero.title')}<span className="text-wahm-orange">.</span>
              </h1>
            </div>
          </div>
          {/* Les verticales du conteneur se prolongent sur le bandeau, un carré au pied
              de chacune — comme le template. Posées hors du cadre, dont l'overflow-hidden
              les rognerait. Trait blanc et non bg-line : sur une photo, le liseré de
              section serait invisible. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
            <div className="mx-auto h-full max-w-[1440px] px-5 md:px-10">
              <div className="relative h-full">
                <span className="absolute inset-y-0 left-0 w-px bg-white/20" />
                <span className="absolute inset-y-0 right-0 w-px bg-white/20" />
                <span className="absolute bottom-0 left-0 h-[5px] w-[5px] -translate-x-1/2 translate-y-1/2 bg-wahm-orange" />
                <span className="absolute bottom-0 right-0 h-[5px] w-[5px] translate-x-1/2 translate-y-1/2 bg-wahm-orange" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== CONTACT — colonne info à gauche, formulaire à droite ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={`${WRAP} grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>

          {/* ----- Colonne gauche : accroche, coordonnées, réseaux ----- */}
          <div className="flex h-full flex-col">
            <h2 className="m-0 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-fg sm:text-[36px] md:text-[40px]">
              {t('contact:info.writeToUs')}<span className="text-wahm-orange">.</span>
            </h2>
            <p className="mt-6 max-w-[460px] font-sans text-[16px] leading-[1.7] text-muted">
              {t('contact:hero.subtitle')}
            </p>

            {/* Réseaux — ancrés en bas de colonne sur grand écran, comme le template */}
            <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{t('common:footer.tagline')}</span>
              <div className="flex gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center border border-line/[0.14] text-fg-soft no-underline transition-colors hover:border-wahm-orange hover:bg-wahm-orange hover:text-white"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ----- Colonne droite : carte formulaire ----- */}
          <div className="relative">
            {status === 'success' ? (
              <div className="relative border border-line/[0.1] bg-surface-2 p-10 text-center md:p-14" role="status" aria-live="polite">
                <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-wahm-orange text-white">
                  <Check className="h-7 w-7" strokeWidth={2.6} aria-hidden="true" />
                </span>
                <h3 ref={successRef} tabIndex={-1} className="m-0 font-display text-[24px] font-extrabold uppercase tracking-[-0.01em] text-fg focus:outline-none">{t('contact:form.success.title')}<span className="text-wahm-orange">.</span></h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.6] text-muted">
                  {t('contact:form.success.text')}
                </p>
              </div>
            ) : (
              <div className="relative border border-line/[0.1] bg-surface-2 p-7 md:p-10">
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
                      <input id="f-nom" name="nom" autoComplete="name" className={inputClass} placeholder={t('contact:form.placeholders.nom')} required />
                    </div>
                    <div>
                      <label htmlFor="f-telephone" className={labelClass}>{t('contact:form.fields.telephone')}</label>
                      <input id="f-telephone" name="telephone" type="tel" autoComplete="tel" className={inputClass} placeholder={t('contact:form.placeholders.telephone')} />
                    </div>
                    <div>
                      <label htmlFor="f-email" className={labelClass}>{t('contact:form.fields.email')}</label>
                      <input id="f-email" name="email" type="email" autoComplete="email" className={inputClass} placeholder={t('contact:form.placeholders.email')} required />
                    </div>
                    <div>
                      <label htmlFor="f-sujet" className={labelClass}>{t('contact:form.fields.sujet')}</label>
                      <div className="relative">
                        <select id="f-sujet" name="sujet" defaultValue="" className={selectClass}>
                          <option value="" disabled>{t('contact:form.sujetChoose')}</option>
                          {sujetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-subtle">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="f-message" className={labelClass}>{t('contact:form.fields.message')}</label>
                    <textarea
                      id="f-message"
                      name="message"
                      className={`${inputClass} min-h-[180px] resize-y`}
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
              </div>
            )}
          </div>

        </div>
      </Reveal>

    </Page>
  )
}
