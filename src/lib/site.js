// Configuration centrale du site WAHM.
//
// SITE_URL : laissé VIDE tant que l'orthographe exacte du domaine n'est pas confirmée.
// Tant qu'il est vide, <Seo> n'émet ni canonical ni og:url absolus, et le sitemap
// final n'est pas généré. À renseigner avant la mise en production (ex. "https://worldacademyofhumanmovement.com").
export const SITE_URL = ''

// Liens de navigation principaux (ordre du header).
// key = identifiant pour surligner l'onglet actif ; to = destination.
export const NAV = [
  { key: 'formations', label: 'Formations', to: '#marketplace' },
  { key: 'devenir-formateur', label: 'Devenir formateur', to: '/devenir-formateur' },
  { key: 'comment-ca-marche', label: 'Comment ça marche', to: '/comment-ca-marche' },
  { key: 'communaute', label: 'Communauté', to: '/communaute' },
  { key: 'a-propos', label: 'À propos', to: '/a-propos' },
  { key: 'faq', label: 'FAQ', to: '/faq' },
  { key: 'contact', label: 'Contact', to: '/contact' },
]

// Configuration par route : métadonnées SEO + variante de header (onglet actif + CTA orange).
// navKey = quel lien du header est doré (null = aucun). cta = bouton orange à droite.
export const ROUTE_CONFIG = {
  '/': {
    title: 'WAHM — Formez-vous auprès des meilleurs',
    description: "World Academy of Human Movement : la marketplace mondiale de formations en santé, sport, bien-être et performance, dans la langue de votre choix.",
    navKey: null,
    cta: { label: 'Découvrir les formations', to: '#marketplace' },
  },
  '/devenir-formateur': {
    title: 'Devenir formateur — WAHM',
    description: "Partagez votre expertise avec le monde. Rejoignez WAHM : audience internationale, revenus récurrents, accompagnement complet. Déposez votre candidature.",
    navKey: 'devenir-formateur',
    cta: { label: 'Déposer ma candidature', to: '#candidature' },
  },
  '/a-propos': {
    title: 'À propos — WAHM',
    description: "World Academy of Human Movement : notre vision, notre mission et la communauté mondiale d'experts du mouvement humain.",
    navKey: 'a-propos',
    cta: { label: 'Découvrir les formations', to: '#marketplace' },
  },
  '/comment-ca-marche': {
    title: 'Comment ça marche — WAHM',
    description: "Le parcours apprenant WAHM, étape par étape : de la découverte des formations à votre place dans un écosystème mondial.",
    navKey: 'comment-ca-marche',
    cta: { label: 'Découvrir les formations', to: '#marketplace' },
  },
  '/communaute': {
    title: 'Communauté — WAHM',
    description: "Rejoignez la communauté mondiale WAHM : réseau international, webinaires exclusifs, échanges entre passionnés et experts.",
    navKey: 'communaute',
    cta: { label: 'Rejoindre WAHM', to: '#adhesion' },
  },
  '/contact': {
    title: 'Contact — WAHM',
    description: "Une question, un projet, un partenariat ? Contactez l'équipe World Academy of Human Movement.",
    navKey: 'contact',
    cta: { label: 'Découvrir les formations', to: '#marketplace' },
  },
  '/faq': {
    title: 'FAQ formateurs — WAHM',
    description: "Toutes les réponses aux questions des formateurs WAHM : candidature, rémunération, production, exclusivité, délais.",
    navKey: 'faq',
    cta: { label: 'Déposer ma candidature', to: '/devenir-formateur#candidature' },
  },
  '/mentions-legales': {
    title: 'Mentions légales — WAHM',
    description: "Mentions légales, CGU, CGV, politique de confidentialité (RGPD) et cookies de World Academy of Human Movement.",
    navKey: null,
    cta: { label: 'Découvrir les formations', to: '#marketplace' },
  },
}

export const DEFAULT_META = {
  title: 'WAHM — World Academy of Human Movement',
  description: "World Academy of Human Movement : la marketplace mondiale de formations en santé, sport, bien-être et performance.",
}

export function getRouteConfig(pathname) {
  return ROUTE_CONFIG[pathname] || { ...DEFAULT_META, navKey: null, cta: { label: 'Découvrir les formations', to: '#marketplace' } }
}
