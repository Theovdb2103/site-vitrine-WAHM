import { useState, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Globe, Coins, Star, Settings, Users, Check } from 'lucide-react'
import Page from '../components/Page'
import Reveal, { RevealStagger, RevealItem } from '../components/Reveal'
import { Label, SectionHead, Action, Framed, CornerTicks, Shot, Motif, TiltCard } from '../components/ui/Frame'
import { Marquee } from '../components/ui/Marquee'
import { Gallery } from '../components/ui/Gallery'
import { getRouteConfig } from '../lib/site'

// ===== Données « Pourquoi nous rejoindre » =====
const AVANTAGES = [
  {
    Icon: Globe,
    title: 'Touchez un public international',
    desc: "Votre formation devient accessible en plusieurs langues à des milliers d'apprenants dans +50 pays.",
  },
  {
    Icon: Coins,
    title: 'Générez des revenus récurrents',
    desc: 'Chaque formation devient un actif digital qui vous rapporte chaque mois, sans limite géographique.',
  },
  {
    Icon: Star,
    title: 'Renforcez votre notoriété',
    desc: 'Être sélectionné par WAHM est un gage de prestige. Votre crédibilité augmente, votre visibilité explose.',
  },
  {
    Icon: Settings,
    title: 'Créez sans contraintes techniques',
    desc: "Vous fournissez le contenu. Nous nous chargeons de l'hébergement, de la diffusion mondiale, de la traduction et des sous-titres, du marketing et de l'accompagnement pédagogique.",
  },
  {
    Icon: Users,
    title: "Intégrez un collectif d'experts",
    desc: 'Rejoignez une élite pédagogique partageant les mêmes valeurs : excellence, innovation, transmission.',
  },
]

// ===== Disciplines recherchées =====
const DISCIPLINES = [
  'Préparation physique & performance sportive',
  'Coaching sportif & personal training',
  'Yoga, Pilates, mobilité',
  'Santé, rééducation, biomécanique',
  'Neurosciences appliquées au mouvement',
  'Préférences motrices, méthodes innovantes',
  'Bien-être, respiration, récupération',
  'Coaching mental & préparation psychologique',
]

// ===== Critères de sélection (carousel) =====
const CRITERES = [
  { id: 'experts', title: 'Experts reconnus', summary: 'Des formateurs légitimes, référents reconnus dans leur domaine.', image: '/assets/media/crit-experts.webp' },
  { id: 'pedagogie', title: 'Pédagogie impactante', summary: 'Des contenus clairs, structurés et pensés pour transmettre efficacement.', image: '/assets/media/crit-pedagogie.webp' },
  { id: 'valeur', title: 'Réelle valeur ajoutée', summary: 'Des formations qui font concrètement progresser les apprenants.', image: '/assets/media/crit-valeur.webp' },
  { id: 'science', title: 'Justifié scientifiquement', summary: 'Un contenu unique, fondé sur les données et la recherche.', image: '/assets/media/crit-science.webp' },
  { id: 'international', title: 'Vision internationale', summary: 'Motivés pour transmettre leur expertise au-delà des frontières.', image: '/assets/media/crit-transmettre.webp' },
]

// ===== Les cinq étapes =====
const ETAPES = [
  {
    title: 'Vous soumettez votre candidature',
    desc: 'Présentation, expertise, thématique, échantillon de contenu.',
  },
  {
    title: 'Notre comité évalue votre proposition',
    desc: 'Qualité pédagogique, pertinence, originalité, valeur ajoutée.',
  },
  {
    title: 'Nous vous accompagnons pour structurer la formation',
    desc: 'Storyboard, modules, supports, tournage si nécessaire.',
  },
  {
    title: "WAHM s'occupe de tout",
    desc: 'Mise en ligne, marketing, diffusion mondiale, support utilisateur.',
  },
  {
    title: 'Vous êtes rémunéré chaque mois',
    desc: 'Revenus transparents, croissants, sans plafond.',
  },
]

const SECTION = 'border-b border-white/[0.08] bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1240px] px-5 md:px-10'

// Style d'input « technical / severe » : coins carrés, focus orange.
const INPUT_CLASS =
  'w-full bg-wahm-navy border border-white/[0.14] px-4 py-3 font-sans text-[15px] text-white placeholder:text-[#6f8197] outline-none transition-colors focus:border-wahm-orange'

const LABEL_CLASS = 'font-mono text-[11px] uppercase tracking-[0.14em] text-[#cdd8e4] mb-2 block'

// Variante claire (panneau crème du formulaire candidature) : inputs blancs, focus orange.
const INPUT_LIGHT =
  'w-full rounded-lg border border-[#d9d8cf] bg-white px-4 py-3 font-sans text-[15px] text-wahm-navy placeholder:text-[#9aa6b2] outline-none transition-colors focus:border-wahm-orange focus:ring-2 focus:ring-wahm-orange/25'
const LABEL_LIGHT = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a6a7e]'

export default function DevenirFormateur() {
  const meta = getRouteConfig('/devenir-formateur')

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
    formData.append('_type', 'candidature')

    // Validation client minimale (le backend revalide).
    const nom = (formData.get('nom') || '').toString().trim()
    const email = (formData.get('email') || '').toString().trim()
    const domaine = (formData.get('domaine') || '').toString().trim()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!nom || !email || !domaine || !emailOk) {
      setErrorMsg("Merci de remplir au minimum votre nom, un email valide et votre domaine d'expertise.")
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/form-handler.php', { method: 'POST', body: formData })
      const json = await res.json().catch(() => ({ ok: false }))
      if (res.ok && json.ok) {
        setStatus('success')
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (err) {
          /* noop */
        }
      } else {
        setErrorMsg(json.error || "L'envoi a échoué. Réessayez plus tard ou écrivez-nous directement.")
        setStatus('error')
      }
    } catch (err) {
      setErrorMsg("L'envoi a échoué. Vérifiez votre connexion et réessayez.")
      setStatus('error')
    }
  }

  return (
    <Page title={meta.title} description={meta.description} path="/devenir-formateur">

      {/* ===== HERO ===== */}
      <Reveal as="section" className={`${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={WRAP}>
          <div className="relative grid border-l border-t border-white/[0.08] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative border-b border-r border-white/[0.08] p-7 py-12 md:p-12 md:py-16">
              <CornerTicks />
              <Label>Devenir formateur WAHM</Label>
              <h1 className="mt-7 max-w-[900px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[58px]">
                Partagez votre expertise avec le monde<span className="text-wahm-orange">.</span>
              </h1>
              <p className="mt-7 max-w-[600px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
                Donnons ensemble une nouvelle dimension à la formation en ligne. Votre savoir mérite une audience mondiale.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Action to="#candidature" variant="filled" arrow>Déposer ma candidature</Action>
                <Action to="/contact" variant="outline">Discuter avec un chargé de partenariat</Action>
              </div>
            </div>
            <div className="relative border-b border-r border-white/[0.08]">
              <CornerTicks />
              <Shot src="/assets/media/formateur-portrait.webp" alt="Devenez formateur WAHM" className="h-full min-h-[280px] w-full" position="top" corners />
              <Motif color="rgba(255,123,44,0.95)" cols={5} rows={3} className="pointer-events-none absolute bottom-5 left-5 hidden w-[150px] md:grid" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== POURQUOI NOUS REJOINDRE ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Pourquoi nous rejoindre">
            Devenez un acteur clé d'une plateforme mondiale
          </SectionHead>
          <p className="mt-6 max-w-[780px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            En rejoignant World Academy of Human Movement, vous devenez un acteur clé d'une plateforme mondiale qui réunit les meilleurs formateurs en santé, bien-être, coaching et performance. WAHM vous permet de :
          </p>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {AVANTAGES.map((a) => (
              <TiltCard key={a.title} className="border-b border-r border-white/[0.08] p-7 md:p-8">
                <span className="flex h-12 w-12 items-center justify-center border border-white/[0.12] text-wahm-orange">
                  <a.Icon className="h-[24px] w-[24px]" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-white">{a.title}</h3>
                <p className="mt-3 font-sans text-[14px] leading-[1.6] text-[#9fb1c6]">{a.desc}</p>
              </TiltCard>
            ))}
            {/* Carte de mise en avant */}
            <TiltCard className="flex flex-col justify-center border-b border-r border-white/[0.08] bg-wahm-navyDark p-7 md:p-8">
              <p className="m-0 font-display text-[16px] font-bold uppercase leading-[1.3] tracking-[0.01em] text-wahm-goldLight">
                Enseignez au monde entier. Laissez une trace durable.
              </p>
              <p className="mt-4 font-sans text-[14px] leading-[1.6] text-[#9fb1c6]">
                WAHM n'est pas une simple plateforme : c'est un écosystème d'experts où les meilleurs transmettent au plus grand nombre.
              </p>
              <p className="mt-3 font-sans text-[14px] leading-[1.6] text-[#9fb1c6]">
                Vous avez un savoir unique ? Donnez-lui la portée qu'il mérite.
              </p>
            </TiltCard>
          </div>
        </div>
      </Reveal>

      {/* ===== DISCIPLINES (marquee) ===== */}
      <Reveal as="section" className={`${SECTION} overflow-hidden py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <Label>À qui s'adresse WAHM</Label>
          <h2 className="mt-5 font-display text-[28px] font-extrabold uppercase leading-[1.04] tracking-[-0.015em] text-white sm:text-[38px]">
            Disciplines recherchées<span className="text-wahm-orange">.</span>
          </h2>
          <p className="mt-5 max-w-[640px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            Si vous faites évoluer votre discipline, WAHM veut travailler avec vous.
          </p>
        </div>

        {/* Bandeaux défilants (sens opposés) — pause au survol */}
        <div className="relative mt-12 flex flex-col gap-3">
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12%] bg-gradient-to-r from-wahm-navy to-transparent" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%] bg-gradient-to-l from-wahm-navy to-transparent" />
          {[false, true].map((rev) => (
            <Marquee key={rev ? 'r' : 'n'} reverse={rev} duration={rev ? 42 : 36}>
              {DISCIPLINES.map((d) => (
                <span key={d} className="flex items-center gap-3 whitespace-nowrap border border-white/[0.14] bg-wahm-navyDark px-5 py-3 font-display text-[15px] font-bold uppercase tracking-[-0.005em] text-white transition-colors duration-300 hover:border-wahm-orange/50 md:text-[17px]">
                  <span className="h-[7px] w-[7px] shrink-0 bg-wahm-orange" aria-hidden="true" />
                  {d}
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </Reveal>

      {/* ===== CRITERES (carousel) ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <Gallery label="Nos critères de sélection" heading="Pour garantir l'excellence" items={CRITERES} />
      </Reveal>

      {/* ===== CINQ ETAPES ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Comment ça fonctionne">
            Cinq étapes, accompagnées de bout en bout
          </SectionHead>
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,780px)_1fr] lg:items-stretch lg:gap-14">
          <div ref={timelineRef} className="relative">
            {/* Rail statique */}
            <span aria-hidden="true" className="absolute left-[21px] top-3 bottom-3 w-px bg-white/[0.1] md:left-[25px]" />
            {/* Rail de progression (se remplit au scroll) */}
            <motion.span aria-hidden="true" style={{ scaleY: railScaleY }} className="absolute left-[21px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-wahm-orange to-wahm-gold md:left-[25px]" />
            {/* Point lumineux qui descend au scroll */}
            <motion.span aria-hidden="true" style={{ top: dotTop }} className="absolute left-[21px] z-0 -ml-[5px] mt-3 h-[11px] w-[11px] -translate-y-1/2 rounded-full bg-wahm-orange shadow-[0_0_16px_4px_rgba(255,123,44,0.7)] md:left-[25px]" />

            <RevealStagger as="ol" className="relative m-0 list-none p-0">
              {ETAPES.map((step, i) => (
                <RevealItem as="li" key={step.title} className="relative flex gap-5 pb-10 last:pb-0 md:gap-8">
                  {/* Nœud numéroté */}
                  <span className="relative z-[1] flex h-[44px] w-[44px] shrink-0 items-center justify-center border border-wahm-orange/40 bg-wahm-navy font-display text-[15px] font-black text-wahm-orange md:h-[52px] md:w-[52px] md:text-[18px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1.5 md:pt-2.5">
                    <h3 className="font-display text-[18px] font-extrabold uppercase leading-[1.15] tracking-[-0.005em] text-white md:text-[22px]">{step.title}</h3>
                    <p className="mt-2 max-w-[620px] font-sans text-[15px] leading-[1.6] text-[#9fb1c6]">{step.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
            {/* Visuel : studio d'enregistrement (comble l'espace à droite) */}
            <Framed className="relative hidden bg-wahm-navyDark lg:block">
              <Shot src="/assets/media/etapes-visual.webp" alt="L'expertise du mouvement et de la performance" className="h-full min-h-[460px] w-full" position="top" corners />
            </Framed>
          </div>
          <p className="mt-12 font-display text-[16px] font-bold uppercase tracking-[0.02em] text-white">Accompagnés de bout en bout, sans plafond de revenus<span className="text-wahm-orange">.</span></p>
        </div>
      </Reveal>

      {/* ===== CANDIDATURE — FORMULAIRE (2 colonnes) ===== */}
      <section id="candidature" className={`${SECTION} scroll-mt-[80px] py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden border border-white/[0.08] lg:grid-cols-2">
            <CornerTicks className="pointer-events-none absolute inset-0 z-20" />

            {/* Panneau gauche : accroche (sombre, dégradé nuit → orange) */}
            <div className="relative flex flex-col justify-center overflow-hidden p-10 md:p-14" style={{ background: 'linear-gradient(135deg,#0b1a30 0%,#0A1A2F 46%,#5a2a0a 100%)' }}>
              <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-wahm-orange/20 blur-3xl" />
              <div className="relative">
                <Label>Candidature formateur</Label>
                <h2 className="mt-7 font-display text-[34px] font-extrabold uppercase leading-[1.03] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[46px]">
                  Votre expertise mérite une audience mondiale<span className="text-wahm-orange">.</span>
                </h2>
                <p className="mt-6 max-w-[420px] font-sans text-[15.5px] leading-[1.7] text-[#aebccd]">
                  Rejoignez les meilleurs experts du mouvement humain. Audience internationale, revenus récurrents, accompagnement complet.
                </p>
                <ul className="mt-9 space-y-4">
                  {['Une audience internationale', 'Des revenus récurrents', 'Un accompagnement complet'].map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center border border-wahm-orange/40 bg-wahm-orange/10 text-wahm-orange"><Check className="h-[14px] w-[14px]" strokeWidth={3} /></span>
                      <span className="font-display text-[13.5px] font-bold uppercase tracking-[0.01em] text-white">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne droite : panneau clair, formulaire / succès */}
            <div className="bg-wahm-cream p-8 md:p-11">
              <h3 className="font-display text-[22px] font-extrabold uppercase tracking-[-0.01em] text-wahm-navy sm:text-[24px]">Déposez votre candidature</h3>
              <p className="mt-2 font-sans text-[14px] leading-[1.6] text-[#5a6a7e]">Nous analysons votre profil et vous recontactons sous 7 jours.</p>

              <div className="mt-7">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-wahm-orange text-white">
                  <Check className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
                </span>
                <h3 className="m-0 font-display text-[24px] font-extrabold uppercase tracking-[-0.01em] text-wahm-navy">Candidature envoyée !</h3>
                <p className="mx-auto mt-3 max-w-[480px] font-sans text-[15px] leading-[1.7] text-[#5a6a7e]">
                  Merci. Notre comité étudie votre profil et vous recontacte sous 7 jours à l'adresse indiquée.
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
                      <label htmlFor="f-nom" className={LABEL_LIGHT}>Nom complet *</label>
                      <input id="f-nom" name="nom" type="text" required autoComplete="name" placeholder="Jean Dupont" className={INPUT_LIGHT} />
                    </div>
                    <div>
                      <label htmlFor="f-email" className={LABEL_LIGHT}>Email *</label>
                      <input id="f-email" name="email" type="email" required autoComplete="email" placeholder="jean@exemple.com" className={INPUT_LIGHT} />
                    </div>
                  </div>

                  <div className="mt-[18px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
                    <div>
                      <label htmlFor="f-domaine" className={LABEL_LIGHT}>Domaine d'expertise *</label>
                      <input id="f-domaine" name="domaine" type="text" required placeholder="Préparation physique, Pilates…" className={INPUT_LIGHT} />
                    </div>
                    <div>
                      <label htmlFor="f-theme" className={LABEL_LIGHT}>Thématique de la formation</label>
                      <input id="f-theme" name="theme" type="text" placeholder="Ex : Réathlétisation du genou" className={INPUT_LIGHT} />
                    </div>
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-echantillon" className={LABEL_LIGHT}>Lien vers un échantillon de contenu</label>
                    <input id="f-echantillon" name="echantillon" type="text" placeholder="https://…  (vidéo, PDF, chaîne…)" className={INPUT_LIGHT} />
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-refs" className={LABEL_LIGHT}>Réseaux sociaux / références</label>
                    <input id="f-refs" name="refs" type="text" placeholder="Instagram, LinkedIn, site web…" className={INPUT_LIGHT} />
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-bio" className={LABEL_LIGHT}>Présentation (CV / biographie)</label>
                    <textarea
                      id="f-bio"
                      name="bio"
                      placeholder="Quelques lignes sur votre parcours et votre approche…"
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
                      {status === 'submitting' ? 'Envoi en cours…' : 'Déposer ma candidature'}
                    </Action>
                  </div>

                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-[#7a8699]">
                    En soumettant, vous acceptez d'être recontacté par l'équipe WAHM.
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
