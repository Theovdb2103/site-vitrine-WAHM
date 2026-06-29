import { useState } from 'react'
import { Mail, Clock, Check } from 'lucide-react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif } from '../components/ui/Frame'
import { getRouteConfig } from '../lib/site'

const SECTION = 'bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Style des champs — bord fin, coins carrés, focus orange (langage « technical / severe »).
const inputClass =
  'w-full bg-wahm-navy border border-white/[0.14] px-4 py-3 font-sans text-[15px] text-white placeholder:text-[#6f8197] outline-none transition-colors focus:border-wahm-orange'

const labelClass = 'font-mono text-[11px] uppercase tracking-[0.14em] text-[#cdd8e4] mb-2 block'

const COORDONNEES = [
  {
    Icon: Mail,
    title: 'Écrivez-nous',
    value: 'contact@wahm.com',
    href: 'mailto:contact@wahm.com',
    desc: 'Nous répondons généralement sous 48h ouvrées.',
  },
  {
    Icon: Clock,
    title: 'Temps de réponse',
    value: 'Sous 48h ouvrées',
    desc: 'Notre équipe traite chaque demande avec attention.',
  },
]

export default function Contact() {
  const meta = getRouteConfig('/contact')
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

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
      setErrorMsg('Merci de remplir votre nom, un email valide et votre message.')
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
        setErrorMsg((data && data.error) || "L'envoi a échoué. Réessayez plus tard.")
      }
    } catch {
      setStatus('error')
      setErrorMsg("L'envoi a échoué. Vérifiez votre connexion et réessayez.")
    }
  }

  return (
    <Page title={meta.title} description={meta.description} path="/contact">

      {/* ===== HERO ===== */}
      <Reveal as="section" className={`${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={`${WRAP} relative py-12 md:py-16`}>
          <Motif color="#D4A018" cols={6} rows={5} className="pointer-events-none absolute right-5 top-1/2 hidden w-[210px] -translate-y-1/2 md:right-10 lg:grid" />
          <Label>Contact</Label>
          <h1 className="mt-7 max-w-[620px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[58px]">
            Parlons de votre projet<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-6 max-w-[560px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            Une question, un partenariat, une candidature formateur ? Notre équipe vous répond.
          </p>
        </div>
      </Reveal>

      {/* ===== CONTACT (info + formulaire) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={`${WRAP} grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14`}>

          {/* ----- Colonne info / coordonnées ----- */}
          <div>
            <Framed className="relative bg-wahm-navyDark p-7 md:p-9">
              <Label>Écrivez-nous</Label>
              <a
                href="mailto:contact@wahm.com"
                className="mt-5 block font-display text-[22px] font-extrabold text-white no-underline transition-colors hover:text-wahm-goldLight"
              >
                contact@wahm.com
              </a>
              <p className="mt-3 font-sans text-[14px] leading-[1.6] text-[#9fb1c6]">
                Nous répondons généralement sous 48h ouvrées.
              </p>

              <div className="my-7 h-px bg-white/[0.08]" />

              {/* Détails de contact avec icônes lucide en carrés bordés */}
              <div className="flex flex-col gap-5">
                {COORDONNEES.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/[0.12] text-wahm-goldLight">
                      <c.Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-wahm-goldLight">{c.title}</div>
                      {c.href ? (
                        <a href={c.href} className="mt-1 block font-display text-[16px] font-bold text-white no-underline transition-colors hover:text-wahm-orange">{c.value}</a>
                      ) : (
                        <div className="mt-1 font-display text-[16px] font-bold text-white">{c.value}</div>
                      )}
                      <p className="mt-1 font-sans text-[13.5px] leading-[1.55] text-[#9fb1c6]">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-7 h-px bg-white/[0.08]" />

              <div className="font-display text-[16px] font-bold uppercase tracking-[0.01em] text-white">Discuter avec un chargé de partenariat</div>
              <p className="mb-6 mt-3 font-sans text-[14px] leading-[1.6] text-[#9fb1c6]">
                Vous êtes formateur, école ou institution ? Construisons ensemble votre présence sur WAHM.
              </p>
              <Action to="/devenir-formateur" variant="outline" size="sm" arrow>Devenir formateur</Action>
            </Framed>

            {/* Réseaux sociaux */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {['LinkedIn', 'Instagram', 'YouTube'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="border border-white/[0.14] py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#cdd8e4] no-underline transition-colors hover:border-wahm-orange hover:text-wahm-orange"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ----- Colonne formulaire ----- */}
          <div>
            {status === 'success' ? (
              <Framed className="relative bg-wahm-navyDark p-10 text-center md:p-12">
                <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-wahm-orange text-white">
                  <Check className="h-7 w-7" strokeWidth={2.6} aria-hidden="true" />
                </span>
                <h3 className="m-0 font-display text-[24px] font-extrabold uppercase tracking-[-0.01em] text-white">Message envoyé<span className="text-wahm-orange">.</span></h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.6] text-[#9fb1c6]">
                  Merci de nous avoir contactés. Notre équipe vous répond sous 48h ouvrées.
                </p>
              </Framed>
            ) : (
              <Framed className="relative bg-wahm-navyDark p-7 md:p-9">
                <SectionHead label="Formulaire" className="mb-8">Envoyez-nous un message</SectionHead>

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
                      <label htmlFor="f-nom" className={labelClass}>Nom complet *</label>
                      <input id="f-nom" name="nom" className={inputClass} placeholder="Jean Dupont" required />
                    </div>
                    <div>
                      <label htmlFor="f-email" className={labelClass}>Email *</label>
                      <input id="f-email" name="email" type="email" className={inputClass} placeholder="jean@exemple.com" required />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="f-sujet" className={labelClass}>Sujet</label>
                    <input id="f-sujet" name="sujet" className={inputClass} placeholder="Objet de votre message" />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="f-message" className={labelClass}>Message *</label>
                    <textarea
                      id="f-message"
                      name="message"
                      className={`${inputClass} min-h-[150px] resize-y`}
                      placeholder="Votre message…"
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="mt-4 font-sans text-[14px] font-medium text-wahm-orange">{errorMsg}</p>
                  )}

                  <div className="mt-7">
                    <Action type="submit" variant="filled" arrow disabled={status === 'submitting'} className="w-full disabled:cursor-not-allowed disabled:opacity-60">
                      {status === 'submitting' ? 'Envoi en cours…' : 'Envoyer le message'}
                    </Action>
                  </div>

                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-[#7f93a8]">
                    En envoyant ce message, vous acceptez que vos données soient utilisées pour traiter votre demande.
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
