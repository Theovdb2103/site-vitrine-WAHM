import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { LOCALES } from './locales'

// Une instance dédiée par rendu de page — aucun état partagé entre locales/rendus concurrents
// (vite-react-ssg peut rendre plusieurs pages/langues dans le même process Node : un singleton
// i18next.changeLanguage() partagé créerait un risque de fuite de langue entre rendus).
//
// ns: ['common'] uniquement à l'init — les namespaces de page (`accueil`, `contact`, …) sont
// demandés à la demande par chaque page via useTranslation(['common', 'contact']), pas
// préchargés tous ensemble : c'est ce qui garantit que visiter /en/contact ne charge que
// en/common.json + en/contact.json, jamais les 8 autres namespaces de page.
export function createI18nInstance(locale) {
  const instance = i18next.createInstance()
  instance
    .use(resourcesToBackend((language, namespace) =>
      import(`../locales/${language}/${namespace}.json`)
    ))
    .use(initReactI18next)
    .init({
      lng: locale,
      fallbackLng: false, // aucune tolérance : pas de repli FR pour une clé EN manquante
      supportedLngs: LOCALES,
      ns: ['common'],
      defaultNS: 'common',
      interpolation: { escapeValue: false },
      react: { useSuspense: true }, // mécanisme officiel react-i18next, attend les namespaces avant rendu
    })
  return instance
}
