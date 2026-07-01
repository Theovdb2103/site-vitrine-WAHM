// Configuration centrale du site WAHM.
//
// SITE_URL : laissé VIDE tant que l'orthographe exacte du domaine n'est pas confirmée.
// Tant qu'il est vide, <Seo> n'émet ni canonical ni og:url absolus, et le sitemap
// final n'est pas généré. À renseigner avant la mise en production (ex. "https://worldacademyofhumanmovement.com").
export const SITE_URL = ''

// Marketplace WAHM : application externe (sous-domaine). Toutes les destinations
// « Découvrir / Explorer les formations » pointent ici. Centralisé pour une seule
// source de vérité — les composants de lien détectent l'URL http(s) et rendent un <a>.
export const MARKETPLACE_URL = 'https://marketplace.worldacademyofhumanmovement.com/fr/'

// Liens de navigation principaux (ordre du header).
// key = identifiant pour surligner l'onglet actif ; to = destination.
export const NAV = [
  { key: 'formations', label: 'Formations', to: MARKETPLACE_URL },
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
    cta: { label: 'Découvrir les formations', to: MARKETPLACE_URL },
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
    cta: { label: 'Découvrir les formations', to: MARKETPLACE_URL },
  },
  '/comment-ca-marche': {
    title: 'Comment ça marche — WAHM',
    description: "Le parcours apprenant WAHM, étape par étape : de la découverte des formations à votre place dans un écosystème mondial.",
    navKey: 'comment-ca-marche',
    cta: { label: 'Découvrir les formations', to: MARKETPLACE_URL },
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
    cta: { label: 'Découvrir les formations', to: MARKETPLACE_URL },
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
    cta: { label: 'Découvrir les formations', to: MARKETPLACE_URL },
  },
}

export const DEFAULT_META = {
  title: 'WAHM — World Academy of Human Movement',
  description: "World Academy of Human Movement : la marketplace mondiale de formations en santé, sport, bien-être et performance.",
}

export function getRouteConfig(pathname) {
  return ROUTE_CONFIG[pathname] || { ...DEFAULT_META, navKey: null, cta: { label: 'Découvrir les formations', to: MARKETPLACE_URL } }
}

// ===== i18n : helpers ajoutés pour le routage et les liens multilingues =====
// (le bloc ci-dessus — SITE_URL, MARKETPLACE_URL, NAV, ROUTE_CONFIG, DEFAULT_META,
// getRouteConfig — reste inchangé et continue d'alimenter les pages pas encore migrées)
import { DEFAULT_LOCALE } from '../i18n/locales'

// Toutes les langues du site vitrine n'ont pas forcément un équivalent sur la marketplace
// externe (notamment au-delà de 20 langues) — table explicite + repli plutôt qu'une
// supposition que le slug locale existe toujours.
const MARKETPLACE_LOCALES = { fr: 'fr', en: 'en' }
const MARKETPLACE_FALLBACK_LOCALE = 'en'

export function getMarketplaceUrl(locale) {
  const slug = MARKETPLACE_LOCALES[locale] ?? MARKETPLACE_FALLBACK_LOCALE
  return `https://marketplace.worldacademyofhumanmovement.com/${slug}/`
}

// Préfixe un chemin interne avec la locale (sauf locale par défaut, non préfixée).
// N'a de sens que pour les chemins internes commençant par "/" — ne pas l'appliquer
// aux URLs http(s) externes, ancres seules ("#..."), mailto: ou tel:.
export function localizedPath(path, locale, defaultLocale = DEFAULT_LOCALE) {
  const clean = path.startsWith('/') ? path : `/${path}`
  return locale === defaultLocale ? clean : `/${locale}${clean === '/' ? '' : clean}`
}

// Inverse de localizedPath : retire le préfixe de langue d'un pathname (ex. "/en/contact"
// → "/contact"), pour retrouver la clé "par défaut" utilisée dans ROUTE_CONFIG.
export function toDefaultPath(pathname, locale, defaultLocale = DEFAULT_LOCALE) {
  if (locale === defaultLocale) return pathname
  const prefix = `/${locale}`
  if (pathname === prefix) return '/'
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length)
  return pathname
}

// Liens de navigation du header, sans libellé en dur — le libellé vient de
// common.json (clé nav.<key>), traduit par locale. `marketplace: true` signale un
// lien vers la marketplace externe (URL résolue via getMarketplaceUrl(locale)).
export const NAV_KEYS = [
  { key: 'formations', marketplace: true },
  { key: 'devenir-formateur', to: '/devenir-formateur' },
  { key: 'comment-ca-marche', to: '/comment-ca-marche' },
  { key: 'communaute', to: '/communaute' },
  { key: 'a-propos', to: '/a-propos' },
  { key: 'faq', to: '/faq' },
  { key: 'contact', to: '/contact' },
]

// CTA orange du header par route — ctaKey pointe vers common.json (cta.<ctaKey>),
// `to` reste une destination brute (URL marketplace, ancre ou route interne).
export const ROUTE_CTA = {
  '/': { ctaKey: 'discover', to: MARKETPLACE_URL },
  '/devenir-formateur': { ctaKey: 'apply', to: '#candidature' },
  '/a-propos': { ctaKey: 'discover', to: MARKETPLACE_URL },
  '/comment-ca-marche': { ctaKey: 'discover', to: MARKETPLACE_URL },
  '/communaute': { ctaKey: 'join', to: '#adhesion' },
  '/contact': { ctaKey: 'discover', to: MARKETPLACE_URL },
  '/faq': { ctaKey: 'apply', to: '/devenir-formateur#candidature' },
  '/mentions-legales': { ctaKey: 'discover', to: MARKETPLACE_URL },
}
