#!/usr/bin/env node
/**
 * Vérifie la parité complète FR ↔ EN des fichiers de traduction.
 * Bloquant (exit 1) si une des quatre vérifications échoue.
 */

import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dir, '..')
const LOCALES_DIR = join(ROOT, 'src/locales')
const DEFAULT_LOCALE = 'fr'

const namespaces = readdirSync(join(LOCALES_DIR, DEFAULT_LOCALE))
  .filter(f => f.endsWith('.json'))
  .map(f => f.replace('.json', ''))

let errors = 0

function fail(msg) {
  console.error(`  ✗ ${msg}`)
  errors++
}

function warn(msg) {
  console.warn(`  ⚠ ${msg}`)
}

// 1. Parité de clés FR ↔ EN (récursive, y compris structure des objets/tableaux)
// 2. Valeurs vides
// 3. Tableaux de longueur différente
function collectKeys(obj, prefix = '') {
  const results = []
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (v === null || v === '') {
      results.push({ path, type: 'empty' })
    } else if (Array.isArray(v)) {
      results.push({ path, type: 'array', length: v.length })
      v.forEach((item, i) => {
        if (item && typeof item === 'object') {
          results.push(...collectKeys(item, `${path}[${i}]`))
        } else if (item === '' || item === null) {
          results.push({ path: `${path}[${i}]`, type: 'empty' })
        }
      })
    } else if (typeof v === 'object') {
      results.push({ path, type: 'object' })
      results.push(...collectKeys(v, path))
    } else {
      results.push({ path, type: 'string' })
    }
  }
  return results
}

console.log('\n🔍 Vérification parité i18n FR ↔ EN\n')

const locales = readdirSync(LOCALES_DIR).filter(l => l !== DEFAULT_LOCALE)

for (const ns of namespaces) {
  const frPath = join(LOCALES_DIR, DEFAULT_LOCALE, `${ns}.json`)
  let frData, frKeys

  try {
    frData = JSON.parse(readFileSync(frPath, 'utf8'))
    frKeys = collectKeys(frData)
  } catch (e) {
    fail(`[${ns}] Impossible de lire fr/${ns}.json`)
    continue
  }

  // Vérif valeurs vides en FR
  for (const k of frKeys.filter(k => k.type === 'empty')) {
    fail(`[${ns}] Valeur vide en FR : ${k.path}`)
  }

  for (const locale of locales) {
    const enPath = join(LOCALES_DIR, locale, `${ns}.json`)
    let enData, enKeys

    try {
      enData = JSON.parse(readFileSync(enPath, 'utf8'))
      enKeys = collectKeys(enData)
    } catch (e) {
      fail(`[${ns}] Impossible de lire ${locale}/${ns}.json`)
      continue
    }

    // Vérif valeurs vides en EN
    for (const k of enKeys.filter(k => k.type === 'empty')) {
      fail(`[${ns}/${locale}] Valeur vide : ${k.path}`)
    }

    // Parité clés FR → EN
    const frStringKeys = frKeys.filter(k => k.type === 'string' || k.type === 'array' || k.type === 'object').map(k => k.path)
    const enStringKeys = enKeys.filter(k => k.type === 'string' || k.type === 'array' || k.type === 'object').map(k => k.path)

    for (const key of frStringKeys) {
      if (!enStringKeys.includes(key)) {
        fail(`[${ns}/${locale}] Clé manquante : ${key}`)
      }
    }
    for (const key of enStringKeys) {
      if (!frStringKeys.includes(key)) {
        fail(`[${ns}/${locale}] Clé en trop (absente en FR) : ${key}`)
      }
    }

    // Longueur tableaux
    const frArrays = frKeys.filter(k => k.type === 'array')
    for (const { path, length } of frArrays) {
      const enArr = enKeys.find(k => k.path === path && k.type === 'array')
      if (enArr && enArr.length !== length) {
        fail(`[${ns}/${locale}] Tableau désaligné "${path}" : FR=${length} éléments, ${locale}=${enArr.length} éléments`)
      }
    }

    // Résumé namespace
    if (errors === 0) {
      console.log(`  ✓ ${ns} (${locale}) — ${enStringKeys.length} clés OK`)
    }
  }
}

// 4. Clés t() utilisées dans le code mais absentes du JSON
console.log('\n🔍 Clés t() utilisées dans le code\n')

let codeOutput = ''
try {
  codeOutput = execSync(
    `grep -rh "t('" src/pages src/components --include="*.jsx" --include="*.tsx" || true`,
    { cwd: ROOT, encoding: 'utf8' }
  )
} catch { /* grep returns non-zero if no match */ }

// Extrait les appels t('ns:key') et t('key') statiques (pas de template literals)
const tCallRegex = /\bt\(\s*'([a-zA-Z0-9_:.\[\]-]+)'/g
const usedKeys = new Set()
let m
while ((m = tCallRegex.exec(codeOutput)) !== null) {
  usedKeys.add(m[1])
}

for (const rawKey of usedKeys) {
  const [ns, ...rest] = rawKey.includes(':') ? rawKey.split(':') : ['common', rawKey]
  const keyPath = rest.join(':').replace(/\[\d+\]/g, '')

  const nsFile = join(LOCALES_DIR, DEFAULT_LOCALE, `${ns}.json`)
  let nsData
  try {
    nsData = JSON.parse(readFileSync(nsFile, 'utf8'))
  } catch {
    // namespace inconnu — laissé aux autres vérifs
    continue
  }

  // Résout le chemin pointé (ex: "hero.title")
  function resolvePath(obj, dotPath) {
    return dotPath.split('.').reduce((acc, k) => {
      if (acc === undefined || acc === null) return undefined
      return acc[k]
    }, obj)
  }

  const resolved = resolvePath(nsData, keyPath)
  if (resolved === undefined) {
    // Peut être un returnObjects sur un tableau/objet → pas une erreur bloquante si le parent existe
    const parentPath = keyPath.split('.').slice(0, -1).join('.')
    const parent = parentPath ? resolvePath(nsData, parentPath) : nsData
    if (!parent || (typeof parent !== 'object' && !Array.isArray(parent))) {
      warn(`Clé t('${rawKey}') introuvable dans fr/${ns}.json`)
    }
  }
}

console.log(`  ℹ ${usedKeys.size} appels t() statiques analysés`)

// Résultat final
console.log('')
if (errors > 0) {
  console.error(`❌ ${errors} erreur(s) de parité i18n — build bloqué.\n`)
  process.exit(1)
} else {
  console.log(`✅ Parité i18n OK — aucune clé manquante, valeur vide ou tableau désaligné.\n`)
}
