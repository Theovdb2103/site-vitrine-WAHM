import { useState } from 'react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, Action, Motif } from '../components/ui/Frame'
import { getRouteConfig } from '../lib/site'

const FAQ_ITEMS = [
  {
    question: 'Qui peut devenir formateur sur WAHM ?',
    answer:
      "WAHM sélectionne des experts reconnus dans les domaines du coaching sportif, de la santé, de la rééducation, du Pilates, du yoga, de la préparation physique, du neurotraining, de la performance humaine et du bien-être.\nSi vous avez une expertise solide, une pédagogie claire et un contenu unique, vous pouvez postuler.",
  },
  {
    question: 'Comment soumettre ma candidature ?',
    answer:
      'Il vous suffit de remplir le formulaire de candidature en ligne. Nous vous demanderons :\n•  Votre CV ou biographie professionnelle\n•  Une description de votre formation ou concept\n•  Un exemple de contenu vidéo ou pédagogique\n•  Vos réseaux sociaux ou références',
  },
  {
    question: 'Quels sont vos critères de sélection ?',
    answer:
      "WAHM évalue :\n•  La crédibilité et l'expérience du formateur\n•  La pertinence scientifique ou méthodologique\n•  La qualité pédagogique\n•  L'originalité du contenu\n•  La faisabilité en e-learning\n•  L'intérêt international du sujet",
  },
  {
    question: 'Dois-je créer toute la formation moi-même ?',
    answer:
      'Non. Vous pouvez proposer une formation complète OU une idée structurée. WAHM peut vous accompagner pour structurer les modules, optimiser la pédagogie, améliorer la progression pédagogique, et tourner et monter vos vidéos si besoin.',
  },
  {
    question: 'Dans quelles langues les formations sont-elles proposées ?',
    answer:
      "Vous pouvez enregistrer dans votre langue. WAHM se charge de la traduction, des sous-titres, de la traduction de vos fichiers PDF et de l'adaptation au marché international. Votre formation devient immédiatement accessible au monde entier.",
  },
  {
    question: 'Combien puis-je gagner en tant que formateur ?',
    answer:
      'Les gains varient selon le nombre de ventes, votre notoriété, la thématique et les mises en avant marketing. Le modèle est transparent et basé sur les royalties : vous gagnez chaque mois sur toutes les ventes, sans limite.',
  },
  {
    question: 'Qui fixe le prix de la formation ?',
    answer:
      'Le prix est défini en collaboration : vous proposez un prix cible, WAHM analyse le marché international, puis nous ajustons ensemble pour maximiser vos revenus.',
  },
  {
    question: 'Puis-je mettre ma formation ailleurs ?',
    answer:
      'Oui, sauf si vous choisissez le programme exclusif WAHM, réservé à certains formateurs (avec une rémunération plus élevée et un marketing premium).',
  },
  {
    question: 'Qui gère les aspects techniques, administratifs et marketing ?',
    answer:
      "WAHM s'occupe de tout : hébergement, interface e-learning, sécurité, paiements, support client, marketing international, promotion du formateur. Vous vous concentrez sur l'essentiel : votre expertise.",
  },
  {
    question: 'Combien de temps faut-il pour mettre ma formation en ligne ?',
    answer: 'En moyenne, 2 à 6 semaines si la formation est prête.',
  },
  {
    question: 'Puis-je mettre à jour ma formation ?',
    answer:
      'Oui. Vous pouvez ajouter des vidéos, actualiser des modules, intégrer des fichiers, ajouter des bonus. WAHM vous accompagne dans la mise à jour si nécessaire.',
  },
  {
    question: 'Comment maximiser mes ventes ?',
    answer:
      "WAHM vous conseille sur le format optimal de votre formation, le storytelling et le positionnement, les bonnes pratiques de tournage, la construction d'une audience et les stratégies marketing. Plus vous êtes impliqué, plus vos gains grandissent.",
  },
  {
    question: 'Comment commencer ?',
    answer:
      'Très simple : déposez votre candidature, nous analysons votre profil, et nous vous recontactons sous 7 jours.',
  },
]

const SECTION = 'bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

export default function FAQ() {
  const meta = getRouteConfig('/faq')
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i))

  return (
    <Page title={meta.title} description={meta.description} path="/faq">

      {/* ===== HERO — image plein écran + texte par-dessus ===== */}
      <section className="relative isolate flex min-h-[580px] items-end overflow-hidden bg-wahm-navy md:min-h-[720px]">
        <img
          src="https://images.unsplash.com/photo-1604233098531-90b71b1b17a6?w=2200&h=1240&fit=crop&q=80&auto=format"
          alt="L'expertise et l'engagement, au cœur de WAHM"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center grayscale-[15%]"
        />
        {/* Voiles navy : assombrit la gauche (lisibilité du texte) + le bas */}
        <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(90deg, rgba(6,18,31,0.92) 0%, rgba(8,20,33,0.72) 48%, rgba(10,26,47,0.35) 100%)' }} />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3" style={{ background: 'linear-gradient(180deg, rgba(6,18,31,0) 0%, rgba(6,18,31,0.85) 100%)' }} />
        <div className={`${WRAP} relative w-full pb-14 pt-[150px] md:pb-20 md:pt-[200px]`}>
          <Label>FAQ Formateurs</Label>
          <h1 className="mt-7 max-w-[1000px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[58px]">
            Toutes les réponses pour devenir formateur<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-6 max-w-[720px] font-sans text-[16px] leading-[1.7] text-[#cdd8e4]">
            Candidature, sélection, langues, rémunération, délais… Tout ce que vous devez savoir avant de rejoindre WAHM.
          </p>
        </div>
      </section>

      {/* ===== ACCORDÉON ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <ul className="m-0 mx-auto max-w-[940px] list-none border-t border-white/[0.1] p-0">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i
              const panelId = `faq-panel-${i}`
              const btnId = `faq-button-${i}`
              return (
                <li key={item.question} className="group border-b border-white/[0.1]">
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-wahm-goldLight/50 md:gap-10 md:py-8"
                    >
                      <span className="flex items-baseline gap-5 md:gap-7">
                        <span className={`shrink-0 font-mono text-[12px] tracking-[0.12em] tabular-nums transition-colors duration-300 ${isOpen ? 'text-wahm-goldLight' : 'text-wahm-goldLight/55'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-display text-[16px] font-bold uppercase leading-[1.3] tracking-[-0.005em] transition-colors duration-300 md:text-[18px] ${isOpen ? 'text-white' : 'text-[#dbe4ee] group-hover:text-white'}`}>
                          {item.question}
                        </span>
                      </span>
                      {/* Toggle minimaliste : + qui se mue en − dans un cercle fin */}
                      <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-300 ${isOpen ? 'border-wahm-orange/70 text-wahm-orange' : 'border-white/15 text-[#8499ab] group-hover:border-white/35 group-hover:text-white'}`}>
                        <span aria-hidden="true" className="absolute h-px w-[13px] bg-current" />
                        <span aria-hidden="true" className={`absolute h-[13px] w-px bg-current transition-transform duration-300 ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="m-0 max-w-[760px] whitespace-pre-line pb-8 pl-[33px] pr-1 font-sans text-[15px] leading-[1.75] text-[#9fb1c6] md:pl-[52px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <div className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">Une question sans réponse ?</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                Parlons de votre projet<span className="text-white">.</span>
              </h2>
              <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">
                Déposez votre candidature ou discutez avec un chargé de partenariat. Nous vous recontactons sous 7 jours.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to="/devenir-formateur#candidature" variant="dark" arrow>Déposer ma candidature</Action>
                <Action to="/contact" variant="outlineDark">Discuter avec un chargé de partenariat</Action>
              </div>
            </div>
            <div className="relative hidden items-center justify-center border-l border-wahm-navy/15 p-10 md:flex">
              <Motif color="#0A1A2F" fill={false} cols={8} rows={8} size={40} gap={18} />
            </div>
          </div>
        </div>
      </section>

    </Page>
  )
}
