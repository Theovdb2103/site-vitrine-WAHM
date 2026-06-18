import { useState } from 'react'
import { Plus } from 'lucide-react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, Action, CornerTicks, Motif } from '../components/ui/Frame'
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

      {/* ===== HERO ===== */}
      <Reveal as="section" className={`${SECTION} pt-[120px] md:pt-[150px]`}>
        <div className={`${WRAP} relative py-12 md:py-20`}>
          <Motif color="rgba(255,123,44,0.9)" cols={6} rows={5} className="pointer-events-none absolute right-5 top-1/2 hidden w-[210px] -translate-y-1/2 md:right-10 lg:grid" />
          <Label>FAQ Formateurs</Label>
          <h1 className="mt-7 max-w-[640px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[60px]">
            Toutes les réponses<br />pour devenir formateur<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-6 max-w-[560px] font-sans text-[15.5px] leading-[1.65] text-[#aebccd]">
            Candidature, sélection, langues, rémunération, délais… Tout ce que vous devez savoir avant de rejoindre WAHM.
          </p>
        </div>
      </Reveal>

      {/* ===== ACCORDÉON ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <ul className="m-0 list-none border-t border-white/[0.08] p-0">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i
              const panelId = `faq-panel-${i}`
              const btnId = `faq-button-${i}`
              return (
                <li
                  key={item.question}
                  className={`relative ${isOpen ? 'bg-wahm-navyDark' : ''}`}
                >
                  {isOpen && <CornerTicks className="text-wahm-orange/70" />}
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                      className="flex w-full items-start justify-between gap-5 px-1 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight md:gap-8 md:py-7"
                    >
                      <span className="flex items-start gap-4 md:gap-6">
                        <span className="mt-[3px] shrink-0 font-mono text-[12px] text-wahm-goldLight">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-[16px] font-bold uppercase leading-[1.25] tracking-[-0.005em] text-white md:text-[18px]">
                          {item.question}
                        </span>
                      </span>
                      <Plus
                        className={`mt-[2px] h-6 w-6 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-45 text-wahm-goldLight' : 'text-[#7f93a8]'
                        }`}
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="m-0 whitespace-pre-line pb-7 pl-[36px] pr-1 font-sans text-[15px] leading-[1.7] text-[#9fb1c6] md:pl-[52px]">
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
      <section className={`${SECTION} py-16 md:py-[88px]`}>
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
              <Motif color="#0A1A2F" />
            </div>
          </div>
        </div>
      </section>

    </Page>
  )
}
