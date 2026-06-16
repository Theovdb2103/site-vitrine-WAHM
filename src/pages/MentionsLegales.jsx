import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { Label, Action, Framed, Motif } from '../components/ui/Frame'
import { getRouteConfig } from '../lib/site'

const SECTION = 'border-b border-white/[0.08] bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1240px] px-5 md:px-10'

// Sommaire (table des matières) — navigation interne vers chaque section légale.
const SECTIONS = [
  { id: 'mentions', label: 'Mentions légales' },
  { id: 'cgu', label: "Conditions d'utilisation" },
  { id: 'cgv', label: 'Conditions de vente' },
  { id: 'confidentialite', label: 'Confidentialité (RGPD)' },
  { id: 'cookies', label: 'Cookies' },
]

// Petits composants de mise en forme du corps légal (lecture longue, fond sombre).
function H2({ index, children }) {
  return (
    <div className="mb-7">
      {index && <span className="font-mono text-[12px] tracking-[0.2em] text-wahm-orange">{index}</span>}
      <h2 className="m-0 mt-3 font-display text-[26px] font-extrabold uppercase leading-[1.06] tracking-[-0.01em] text-white md:text-[30px]">
        {children}<span className="text-wahm-orange">.</span>
      </h2>
      <div className="mt-5 h-[3px] w-11 bg-wahm-orange" aria-hidden="true" />
    </div>
  )
}

function H3({ children }) {
  return <h3 className="mb-[10px] mt-7 font-display text-[16px] font-bold text-[#cdd8e4] md:text-[17px]">{children}</h3>
}

function P({ children, className = '' }) {
  return <p className={`m-0 font-sans text-[15px] leading-relaxed text-[#9fb1c6] ${className}`}>{children}</p>
}

// Mention « à compléter / à préciser » — valeur juridique non encore renseignée.
function TBD({ children }) {
  return <em className="not-italic font-medium text-wahm-goldLight">{children}</em>
}

// Lien mailto sur fond sombre.
function Mail({ href, children }) {
  return (
    <a href={href} className="font-semibold text-wahm-goldLight no-underline transition-colors hover:text-wahm-orange">
      {children}
    </a>
  )
}

export default function MentionsLegales() {
  const meta = getRouteConfig('/mentions-legales')
  return (
    <Page title={meta.title} description={meta.description} path="/mentions-legales">

      {/* ===== HERO ===== */}
      <Reveal as="section" className={`${SECTION} pb-14 pt-[120px] md:pt-[150px]`}>
        <div className={`${WRAP} relative`}>
          <Motif color="rgba(255,123,44,0.9)" cols={5} rows={4} className="pointer-events-none absolute right-5 top-1/2 hidden w-[180px] -translate-y-1/2 md:right-10 lg:grid" />
          <Label>Informations légales</Label>
          <h1 className="m-0 mt-5 font-display text-[32px] font-extrabold uppercase leading-[1.04] tracking-[-0.015em] text-white sm:text-[40px] md:text-[48px]">
            Mentions légales<span className="text-wahm-orange">.</span>
          </h1>
          <p className="mt-5 max-w-[680px] font-sans text-[15px] italic leading-relaxed text-[#7f93a8]">
            Version modèle — à valider juridiquement. Les mentions « à compléter » doivent être renseignées avant mise en ligne.
          </p>
        </div>
      </Reveal>

      {/* ===== CORPS ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={`${WRAP} grid grid-cols-1 items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-16`}>

          {/* SOMMAIRE */}
          <nav aria-label="Sommaire" className="lg:sticky lg:top-[120px]">
            <Framed className="bg-wahm-navyDark p-6">
              <Label className="mb-5">Sommaire</Label>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-baseline gap-3 py-[7px] font-mono text-[12px] uppercase tracking-[0.12em] text-[#9fb1c6] no-underline transition-colors hover:text-wahm-goldLight"
                    >
                      <span className="text-wahm-orange">{String(i + 1).padStart(2, '0')}</span>
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
              <H2 index="01">Mentions légales</H2>
              <H3>Éditeur du site</H3>
              <P>
                World Academy of Human Movement (WAHM).<br />
                Forme juridique : <TBD>à préciser (ex. SRL / SAS / LTD)</TBD>.<br />
                Siège social : <TBD>adresse à compléter</TBD>.<br />
                Numéro d'entreprise / RCS / BCE : <TBD>à compléter</TBD>.<br />
                TVA intracommunautaire : <TBD>à compléter</TBD>.<br />
                Email : contact@wahm.com.<br />
                Responsable de la publication : <TBD>nom du fondateur ou directeur légal</TBD>.
              </P>
              <H3>Hébergement</H3>
              <P>
                Le site est hébergé par : <TBD>nom de l'hébergeur (ex. AWS, OVH, Cloudflare…)</TBD>.<br />
                Adresse : <TBD>à compléter</TBD>.<br />
                Site web : <TBD>URL de l'hébergeur</TBD>.
              </P>
              <H3>Propriété intellectuelle</H3>
              <P>
                L'ensemble du contenu du site (textes, vidéos, images, logos, formations, documents) est protégé par le droit
                d'auteur et reste la propriété de WAHM ou des formateurs partenaires. Toute reproduction, diffusion ou
                exploitation sans autorisation est strictement interdite.
              </P>
            </div>

            {/* CGU */}
            <div id="cgu" className="mt-14 scroll-mt-[120px] border-t border-white/[0.08] pt-12">
              <H2 index="02">Conditions Générales d'Utilisation (CGU)</H2>
              <H3>Article 1 — Objet du site</H3>
              <P>
                WAHM est une plateforme e-learning permettant d'acheter et suivre des formations en ligne, de proposer des
                formations en tant que formateur, d'accéder à des ressources pédagogiques et d'interagir avec la communauté
                WAHM.
              </P>
              <H3>Article 2 — Création de compte</H3>
              <P>
                Pour accéder aux formations, l'utilisateur doit créer un compte avec des informations exactes. L'utilisateur
                est responsable de la confidentialité de ses identifiants.
              </P>
              <H3>Article 3 — Utilisation de la plateforme</H3>
              <P>
                Il est interdit de copier, transférer ou revendre une formation, de partager un accès personnel, de
                télécharger illégalement les contenus, ou de détourner la plateforme à des fins commerciales non autorisées.
                WAHM peut suspendre un compte en cas de non-respect.
              </P>
              <H3>Article 4 — Certifications</H3>
              <P>
                Les certificats délivrés par WAHM attestent d'un suivi, mais ne remplacent aucune certification
                professionnelle officielle, sauf cas mentionné.
              </P>
              <H3>Article 5 — Responsabilités</H3>
              <P>
                WAHM ne garantit pas la réussite professionnelle de l'utilisateur, l'exactitude absolue des contenus des
                formateurs partenaires, ni l'absence d'interruption temporaire de service. WAHM met tout en œuvre pour
                assurer la qualité du service.
              </P>
            </div>

            {/* CGV */}
            <div id="cgv" className="mt-14 scroll-mt-[120px] border-t border-white/[0.08] pt-12">
              <H2 index="03">Conditions Générales de Vente (CGV)</H2>
              <H3>Article 1 — Prix</H3>
              <P>
                Les prix sont indiqués en € TTC, sauf indication contraire. WAHM se réserve le droit de modifier les tarifs.
              </P>
              <H3>Article 2 — Paiement</H3>
              <P>
                Les paiements sont sécurisés via Stripe, PayPal ou tout autre prestataire. Aucun numéro de carte n'est stocké
                par WAHM.
              </P>
              <H3>Article 3 — Accès aux formations</H3>
              <P>
                L'accès est immédiat après paiement, personnel et non cessible, illimité dans le temps sauf indication
                contraire.
              </P>
              <H3>Article 4 — Politique de remboursement</H3>
              <P>
                Conformément à la loi sur les contenus numériques, le droit de rétractation ne s'applique plus après l'accès
                au contenu. WAHM peut proposer un remboursement exceptionnel au cas par cas.
              </P>
              <H3>Article 5 — Responsabilités du formateur</H3>
              <P>
                Les formateurs garantissent l'originalité de leurs contenus, le respect de la loi, et l'absence de plagiat ou
                d'informations dangereuses.
              </P>
              <H3>Article 6 — Résiliation</H3>
              <P>
                WAHM peut suspendre un compte en cas d'usage frauduleux, de non-respect des CGU, ou de comportement contraire
                à l'intérêt de la plateforme.
              </P>
              <H3>Article 7 — Loi applicable</H3>
              <P>
                Les présentes conditions sont soumises au droit du pays où la société est enregistrée (<TBD>à compléter</TBD>).
              </P>
            </div>

            {/* CONFIDENTIALITÉ (RGPD) */}
            <div id="confidentialite" className="mt-14 scroll-mt-[120px] border-t border-white/[0.08] pt-12">
              <H2 index="04">Politique de confidentialité (RGPD)</H2>
              <P className="mb-[14px]">
                WAHM collecte uniquement les données nécessaires : nom et prénom, email, informations de paiement, historique
                d'achat, progression pédagogique.
              </P>
              <P className="mb-[14px]">
                Ces données sont utilisées pour gérer votre compte, suivre vos formations, assurer le support, envoyer des
                communications liées à vos achats et améliorer le service.
              </P>
              <P>
                Conformément au RGPD, vous pouvez demander l'accès, la modification ou la suppression de vos données, la
                portabilité et la limitation du traitement. Demande :{' '}
                <Mail href="mailto:privacy@wahm.com">privacy@wahm.com</Mail>.
              </P>
            </div>

            {/* COOKIES */}
            <div id="cookies" className="mt-14 scroll-mt-[120px] border-t border-white/[0.08] pt-12">
              <H2 index="05">Cookies</H2>
              <P className="mb-[14px]">
                Le site utilise des cookies pour améliorer votre expérience, mémoriser vos préférences (dont la langue) et
                analyser l'audience. Vous pouvez accepter ou refuser les cookies non essentiels lors de votre première
                visite, et modifier votre choix à tout moment.
              </P>
              <P>
                Pour toute question relative aux cookies ou à vos données :{' '}
                <Mail href="mailto:privacy@wahm.com">privacy@wahm.com</Mail>.
              </P>
            </div>

            {/* RETOUR */}
            <div className="mt-14 border-t border-white/[0.08] pt-12">
              <Action to="/" variant="outline" arrow>Retour à l'accueil</Action>
            </div>

          </div>
        </div>
      </Reveal>

    </Page>
  )
}
