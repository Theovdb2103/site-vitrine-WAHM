import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { Globe, Coins, Star, Settings, Users, Check, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Page from '../components/Page'
import Reveal, { RevealStagger, RevealItem } from '../components/Reveal'
import { Label, SectionHead, Action, Framed, CellTicks, BlockGuides, GridRowRules, Shot, TiltCard } from '../components/ui/Frame'
import { DisciplinesCarousel } from '../components/ui/DisciplinesCarousel'
import SectionOutro from '../components/SectionOutro'
import { localizedPath } from '../lib/site'
import { useLanguage } from '../context/LanguageContext'

// ===== Données « Pourquoi nous rejoindre » (icônes non traduisibles, zippées par
// index avec devenirFormateur:avantages.items) =====
const AVANTAGES_META = [
  { Icon: Globe },
  { Icon: Coins },
  { Icon: Star },
  { Icon: Settings },
  { Icon: Users },
]

// ===== Disciplines recherchées =====
// Photos Unsplash (nouvelles, hors bibliothèque) choisies selon chaque discipline.
// Zippées par index avec devenirFormateur:disciplines.items (name/tag traduits).
// `fp` (optionnel) : point focal [x, y], en fractions de l'image SOURCE. Sans lui,
// Unsplash recadre au centre — ce qui décentre le sujet quand il est excentré dans une
// source paysage. Et `pos` (objectPosition) ne peut alors plus rattraper le cadrage :
// le recadrage serveur a déjà jeté les pixels, et le résultat a déjà le ratio de la
// carte, donc object-cover n'a plus rien à rogner.
const UN = (id, fp) =>
  `https://images.unsplash.com/${id}?w=560&h=740&fit=crop&q=80&auto=format` +
  (fp ? `&crop=focalpoint&fp-x=${fp[0]}&fp-y=${fp[1]}` : '')
const DISCIPLINES_META = [
  { img: UN('photo-1591741543032-bf439b4fd46c'), pos: '50% 40%' },
  { img: UN('photo-1616279969722-d81a5a3944ef'), pos: '50% 28%' },
  { img: UN('photo-1767611094402-2b28863b834f'), pos: '50% 55%' },
  { img: UN('photo-1649751361457-01d3a696c7e6'), pos: '55% 35%' },
  { img: UN('photo-1547941126-3d5322b218b0'), pos: '50% 45%' },
  { img: UN('photo-1727463389191-22d60aa1f1ca'), pos: '50% 28%' },
  // 07 — source nativement en portrait, donc pas de point focal nécessaire : le
  // recadrage serveur ne coupe presque rien et le sujet reste centré.
  { img: UN('photo-1492288991661-058aa541ff43'), pos: '50% 50%' },
  { img: UN('photo-1577344718665-3e7c0c1ecf6b'), pos: '50% 22%' },
]

// ===== Critères de sélection =====
// Photo Unsplash (nouvelle, hors bibliothèque) illustrant l'évaluation des candidats.
const CRIT_IMAGE = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&h=1000&fit=crop&q=80&auto=format'

// ===== Hero =====
// Photo Unsplash (nouvelle, hors bibliothèque) : un coach en t-shirt encadrant une
// séance, ses élèves visibles derrière lui — il se lit comme un FORMATEUR au travail,
// pas comme une démonstration de physique (les essais précédents versaient dans le
// portrait de bodybuilder, hors sujet pour une académie du mouvement qui couvre aussi
// santé, rééducation, Pilates et yoga).
// crop=faces : recadrage piloté par la détection de visage, qui garde le sujet dégagé
// en haut au lieu de lui couper le crâne dans ce format très vertical.
const HERO_IMAGE = 'https://images.unsplash.com/photo-1682531023937-918848f2ce96?w=1200&h=1364&fit=crop&crop=faces&q=80&auto=format'

const SECTION = 'bg-surface'
const WRAP = 'mx-auto max-w-[1440px] px-5 md:px-10'

// Teinte des traits de repère du hero — même valeur que le reste du site.
const HERO_RULE = 'bg-line/[0.08]'

// Petit carré orange sur une intersection de la grille (même vocabulaire que les
// CornerTicks du reste du site — voir Frame.jsx).
function HeroGuideMark({ className = '' }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute h-[5px] w-[5px] bg-wahm-orange ${className}`} />
}

// Centrage horizontal d'une marque sur un trait d'1px, selon qu'elle est ancrée par sa
// gauche ou par sa droite.
//
// `-translate-x-1/2` (2,5px) centrerait la marque sur le BORD du trait, pas sur son
// milieu : `left-[x]` donne le bord gauche du trait, dont le centre est à x+0,5. D'où
// un décalage d'un demi-pixel — invisible en soi, mais qui étale la marque sur six
// pixels physiques au lieu de cinq et la rend floue. 2px au lieu de 2,5px la recentrent
// ET la calent sur des bords entiers, donc nette.
const MARK_X_LEFT = 'translate-x-[-2px]'
const MARK_X_RIGHT = 'translate-x-[2px]'

// Écart entre les colonnes texte / photo, et retrait de la photo par rapport au
// liseré droit — mêmes valeurs que le hero de l'accueil (HomeHero.jsx), pour un
// vocabulaire visuel cohérent sur tout le site : la photo ne touche jamais
// directement un trait de la grille, il y a toujours un vide.
const HERO_GAP_LEFT = 'left-[calc(50%-0.5rem)] xl:left-[calc(50%-0.75rem)]'
const HERO_GAP_RIGHT = 'left-[calc(50%+0.5rem)] xl:left-[calc(50%+0.75rem)]'
const HERO_RIGHT_INNER = 'right-4 xl:right-6'

// Repères verticaux courant sur toute la hauteur de la SECTION (donc jusque sous le
// header fixe — invisible à cet endroit, recouvert par son fond opaque), avec un
// carré orange au pied de chacun. Pas de carré en haut : il serait caché sous le
// header. Ceux du milieu sont posés par la barre de séparation horizontale, dans le
// flux de la grille (voir le JSX du hero). Masqués sous lg, colonnes empilées.
function HeroGuides() {
  return (
    // z-10 : les marques du bas sont à cheval sur la limite de section, et la section
    // suivante porte une animation d'apparition — donc un `transform`, qui crée un
    // contexte d'empilement et la fait peindre par-dessus elles. Sans z-index, leur
    // moitié basse disparaissait sous son fond.
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      <div className={`${WRAP} h-full`}>
        <div className="relative h-full">
          <span className={`absolute inset-y-0 left-0 w-px ${HERO_RULE}`} />
          <span className={`absolute inset-y-0 w-px ${HERO_GAP_LEFT} ${HERO_RULE}`} />
          <span className={`absolute inset-y-0 w-px ${HERO_GAP_RIGHT} ${HERO_RULE}`} />
          <span className={`absolute inset-y-0 w-px ${HERO_RIGHT_INNER} ${HERO_RULE}`} />
          <span className={`absolute inset-y-0 right-0 w-px ${HERO_RULE}`} />
          {/* translate-y-[2px] et non translate-y-1/2 (2,5px) : le demi-pixel étalait la
              marque sur six rangées de pixels au lieu de cinq et la rendait floue. */}
          <HeroGuideMark className={`bottom-0 left-0 translate-y-[2px] ${MARK_X_LEFT}`} />
          <HeroGuideMark className={`bottom-0 translate-y-[2px] ${HERO_GAP_LEFT} ${MARK_X_LEFT}`} />
          <HeroGuideMark className={`bottom-0 translate-y-[2px] ${HERO_GAP_RIGHT} ${MARK_X_LEFT}`} />
          {/* Ancrée par la droite (HERO_RIGHT_INNER) : elle doit donc être décalée vers
              la droite. Un -translate-x la posait 5px à côté de son trait. */}
          <HeroGuideMark className={`bottom-0 translate-y-[2px] ${HERO_RIGHT_INNER} ${MARK_X_RIGHT}`} />
          <HeroGuideMark className={`bottom-0 right-0 translate-y-[2px] ${MARK_X_RIGHT}`} />
        </div>
      </div>
    </div>
  )
}

// Style d'input « technical / severe » : coins carrés, focus orange.
const INPUT_CLASS =
  'w-full bg-surface border border-line/[0.14] px-4 py-3 font-sans text-[15px] text-fg placeholder:text-subtle outline-none transition-colors focus:border-wahm-orange'

const LABEL_CLASS = 'font-mono text-[11px] uppercase tracking-[0.14em] text-fg-soft mb-2 block'

// Variante claire (panneau crème du formulaire candidature) : inputs blancs, focus jaune WAHM.
const INPUT_LIGHT =
  'w-full rounded-lg border-[1.5px] border-[#c9c2ae] bg-white px-4 py-3 font-sans text-[15px] text-wahm-navy placeholder:text-[#8a8475] outline-none transition-colors focus:border-wahm-gold focus:bg-white focus:ring-2 focus:ring-wahm-gold/25'
const LABEL_LIGHT = 'mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5c5546]'

export default function DevenirFormateur() {
  const { t } = useTranslation(['common', 'devenirFormateur'])
  const { locale } = useLanguage()

  const avantagesItems = t('devenirFormateur:avantages.items', { returnObjects: true })
  const disciplinesItems = t('devenirFormateur:disciplines.items', { returnObjects: true })
  const criteresItems = t('devenirFormateur:criteres.items', { returnObjects: true })
  const etapesItems = t('devenirFormateur:etapes.items', { returnObjects: true })
  const candidatureBenefits = t('devenirFormateur:candidature.benefits', { returnObjects: true })
  const domaineOptions = t('devenirFormateur:candidature.form.domaineOptions', { returnObjects: true })

  // Zip texte traduit + icônes/images structurelles (par index).
  const avantages = avantagesItems.map((a, i) => ({ ...a, Icon: AVANTAGES_META[i].Icon }))
  const disciplines = disciplinesItems.map((d, i) => ({ ...d, ...DISCIPLINES_META[i] }))

  // Grille des avantages : mesurée par GridRowRules pour prolonger ses séparations
  // internes jusqu'aux bords de l'écran (leur position dépend du contenu, donc du
  // point de rupture — elle ne se déduit pas en CSS).
  const avantagesGridRef = useRef(null)

  // Progression de la timeline liée au scroll (le rail se remplit + point lumineux).
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.78', 'end 0.55'] })
  const railScaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Le point descend via `transform` plutôt que `top` : `top` force un calcul de mise
  // en page à chaque frame de scroll, contrairement à la barre voisine qui anime déjà
  // scaleY. Il faut donc la hauteur réelle du rail en pixels, remesurée si elle change.
  const [timelineHeight, setTimelineHeight] = useState(0)
  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const measure = () => setTimelineHeight(el.offsetHeight)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  // Le rail est posé en top-3/bottom-3 : il court donc de 12 px à (hauteur - 12) px.
  // Le point est positionné en top-0 sans marge, son centre étant à 5,5 px de son bord
  // haut ; la translation vise ces deux bornes pour que le centre coïncide exactement
  // avec le début et la fin du rail. (`y` de Framer Motion écrasant tout transform de
  // classe, le centrage ne peut pas passer par -translate-y-1/2.)
  const RAIL_INSET = 12
  const DOT_RADIUS = 5.5
  const dotY = useTransform(
    scrollYProgress,
    [0, 1],
    [RAIL_INSET - DOT_RADIUS, Math.max(0, timelineHeight - RAIL_INSET) - DOT_RADIUS],
  )

  // 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const successRef = useRef(null)

  // Au succès, on déplace le focus sur la confirmation pour que le navigateur scrolle
  // automatiquement jusqu'à elle et que les lecteurs d'écran l'annoncent.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  // Échantillon de contenu : upload direct du fichier choisi vers Cloudinary (pas de
  // backend ici), on n'envoie par email que le lien public renvoyé — les vidéos ne
  // peuvent pas être jointes à un email (limites EmailJS bien trop basses).
  const MAX_ECHANTILLON_SIZE = 100 * 1024 * 1024 // 100 Mo — plafond du plan gratuit Cloudinary
  const [fileState, setFileState] = useState({ status: 'idle', url: '', name: '' }) // 'idle' | 'uploading' | 'done' | 'error'

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_ECHANTILLON_SIZE) {
      setFileState({ status: 'idle', url: '', name: '' })
      setErrorMsg(t('devenirFormateur:candidature.form.errors.fileTooLarge'))
      setStatus('error')
      e.target.value = ''
      return
    }

    setFileState({ status: 'uploading', url: '', name: file.name })
    setErrorMsg('')
    setStatus('idle')

    try {
      const body = new FormData()
      body.append('file', file)
      body.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: 'POST', body },
      )
      if (!res.ok) throw new Error('Cloudinary upload failed')
      const data = await res.json()
      setFileState({ status: 'done', url: data.secure_url, name: file.name })
    } catch (err) {
      console.error(err)
      setFileState({ status: 'error', url: '', name: file.name })
      setErrorMsg(t('devenirFormateur:candidature.form.errors.uploadFailed'))
      setStatus('error')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Validation client minimale.
    const nom = (formData.get('nom') || '').toString().trim()
    const email = (formData.get('email') || '').toString().trim()
    const domaine = (formData.get('domaine') || '').toString().trim()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!nom || !email || !domaine || !emailOk) {
      setErrorMsg(t('devenirFormateur:candidature.form.errors.invalid'))
      setStatus('error')
      return
    }

    if (fileState.status === 'uploading') {
      setErrorMsg(t('devenirFormateur:candidature.form.errors.uploadFailed'))
      setStatus('error')
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
        import.meta.env.VITE_EMAILJS_TEMPLATE_CANDIDATURE,
        {
          from_name: nom,
          from_email: email,
          domaine,
          theme: (formData.get('theme') || '').toString().trim(),
          echantillon: fileState.url,
          refs: (formData.get('refs') || '').toString().trim(),
          bio: (formData.get('bio') || '').toString().trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
    } catch (err) {
      console.error(err)
      setErrorMsg(t('devenirFormateur:candidature.form.errors.network'))
      setStatus('error')
    }
  }

  return (
    <Page title={t('devenirFormateur:meta.title')} description={t('devenirFormateur:meta.description')} pathKey="/devenir-formateur">

      {/* ===== HERO ===== */}
      {/* Décalque de HomeHero.jsx, à la même échelle : grille sans cadre fermé, traits
          verticaux flottant en calque, texte coupé en deux rangées par une barre de
          séparation horizontale traversante (rangée 2), et colonne photo étalée sur les
          trois rangées avec une marge négative qui la colle au header.
          overflow-x-clip : la barre se prolonge de 100vw de chaque côté pour rejoindre
          les bords de l'écran. Surtout pas overflow-hidden, qui rognerait la verticale
          et couperait en deux les carrés posés à cheval sur la barre. */}
      <Reveal as="section" eager className={`relative overflow-x-clip ${SECTION} pt-[104px] md:pt-[120px]`}>
        <HeroGuides />
        <div className={`${WRAP} grid lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-4 xl:gap-x-6`}>
          {/* Rangée 1 : accroche + titre */}
          <div className="relative min-w-0 pb-3 pt-12 lg:col-start-1 lg:row-start-1 lg:p-4 xl:p-6">
            <Label>{t('devenirFormateur:hero.label')}</Label>
            <h1 className="mt-7 max-w-[900px] font-display text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-fg sm:text-[54px] lg:text-[58px]">
              {t('devenirFormateur:hero.title')}<span className="text-wahm-orange">.</span>
            </h1>
          </div>

          {/* Rangée 3 : accroche secondaire + boutons */}
          <div className="relative min-w-0 pb-12 pt-3 lg:col-start-1 lg:row-start-3 lg:p-4 xl:p-6">
            <p className="max-w-[600px] font-sans text-[16px] leading-[1.7] text-muted">
              {t('devenirFormateur:hero.subtitle')}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Action to="#candidature" variant="filled" arrow>{t('devenirFormateur:hero.ctaApply')}</Action>
              <Action to={localizedPath('/contact', locale)} variant="outline" className="!h-auto !min-h-12 [&>span]:!whitespace-normal [&>span]:!py-3 [&>span]:text-center">{t('devenirFormateur:hero.ctaContact')}</Action>
            </div>
          </div>

          {/* Colonne photo, étalée sur les trois rangées. lg:-mt-12 annule l'écart
              restant sous le header fixe de 72px (pt-[120px] - 48px = 72px) — même
              calcul que dans HomeHero.jsx. */}
          <div className="relative flex min-w-0 items-stretch pb-12 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:-mt-12 lg:pb-0 lg:pr-4 xl:pr-6">
            {/* Pas de Motif en surimpression : le hero d'accueil n'en a pas, et les
                chevrons tombaient en travers du sujet. */}
            {/* Hauteur calée sur la photo du hero d'accueil (732px mesurés de 1280 à
                1920). Là-bas elle est dictée par la hauteur du texte, plus abondant ;
                ici le texte est court, donc on la fixe en min-h.
                width/height comptent autant que le min-h : `lg:h-full` est indéfini (la
                hauteur de la grille dépend elle-même de cette photo), donc l'image se
                dimensionne sur son ratio intrinsèque. 1200/1364 donne exactement 732px
                pour une colonne de 644px — les deux voies concordent au lieu de se
                contredire. */}
            <Shot src={HERO_IMAGE} alt={t('devenirFormateur:hero.imageAlt')} className="h-[380px] w-full sm:h-[480px] lg:h-full lg:min-h-[732px]" priority width={1200} height={1364} />
          </div>

          {/* Barre de séparation (rangée 2), prolongée jusqu'aux bords de l'écran.
              Elle n'a PAS de fond propre : elle est tracée en segments qui s'arrêtent de
              part et d'autre de la photo, pour ne pas la barrer en travers. Les carrés,
              eux, restent posés sur toutes les intersections, photo comprise. */}
          <div className="relative hidden h-px lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:block">
            <span aria-hidden="true" className={`absolute right-full top-0 h-px w-screen ${HERO_RULE}`} />
            <span aria-hidden="true" className={`absolute left-full top-0 h-px w-screen ${HERO_RULE}`} />
            {/* Du bord gauche du cadre jusqu'au bord gauche de la photo */}
            <span aria-hidden="true" className={`absolute left-0 top-0 h-px right-[calc(50%-0.5rem)] xl:right-[calc(50%-0.75rem)] ${HERO_RULE}`} />
            {/* Du bord droit de la photo jusqu'au bord droit du cadre */}
            <span aria-hidden="true" className={`absolute right-0 top-0 h-px w-4 xl:w-6 ${HERO_RULE}`} />
            <HeroGuideMark className={`left-0 top-1/2 -translate-y-1/2 ${MARK_X_LEFT}`} />
            <HeroGuideMark className={`top-1/2 -translate-y-1/2 ${HERO_GAP_LEFT} ${MARK_X_LEFT}`} />
            <HeroGuideMark className={`top-1/2 -translate-y-1/2 ${HERO_GAP_RIGHT} ${MARK_X_LEFT}`} />
            <HeroGuideMark className={`top-1/2 -translate-y-1/2 ${HERO_RIGHT_INNER} ${MARK_X_RIGHT}`} />
            <HeroGuideMark className={`right-0 top-1/2 -translate-y-1/2 ${MARK_X_RIGHT}`} />
          </div>
        </div>
      </Reveal>

      {/* ===== POURQUOI NOUS REJOINDRE ===== */}
      {/* overflow-x-clip : les liserés filent jusqu'aux bords de l'écran, on rogne donc
          l'horizontale. Surtout pas overflow-hidden, qui rognerait aussi la verticale et
          couperait en deux les carrés posés à cheval sur les liserés. */}
      <Reveal as="section" className={`${SECTION} overflow-x-clip py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label={t('devenirFormateur:avantages.label')}>
            {t('devenirFormateur:avantages.title')}
          </SectionHead>
          <p className="mt-6 max-w-[780px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('devenirFormateur:avantages.intro')}
          </p>
          <div className="relative mt-12">
            <div ref={avantagesGridRef} className="grid grid-cols-1 border-l border-t border-line/[0.08] sm:grid-cols-2 lg:grid-cols-3">
              {/* tilt={false} : la carte ne s'incline plus au survol, seul le reflet
                  orange qui suit le curseur est conservé.
                  ticks={false} + CellTicks : les marques d'angle d'une CELLULE de grille
                  se centrent sur la boîte de bordure, sinon deux marques voisines
                  tombent à 1px l'une de l'autre et épaississent la jointure. */}
              {avantages.map((a) => (
                <TiltCard key={a.title} ticks={false} tilt={false} className="border-b border-r border-line/[0.08] p-7 md:p-8">
                  <CellTicks />
                  <span className="flex h-12 w-12 items-center justify-center border border-line/[0.12] text-gold">
                    <a.Icon className="h-[24px] w-[24px]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-fg md:text-[20px]">{a.title}</h3>
                  <p className="mt-3 font-sans text-[14px] leading-[1.6] text-muted">{a.desc}</p>
                </TiltCard>
              ))}
              {/* Carte de mise en avant */}
              <TiltCard ticks={false} tilt={false} className="flex flex-col justify-center border-b border-r border-line/[0.08] bg-surface-2 p-7 md:p-8">
                <CellTicks />
                <p className="m-0 font-display text-[16px] font-bold uppercase leading-[1.3] tracking-[0.01em] text-gold">
                  {t('devenirFormateur:avantages.highlight.title')}
                </p>
                <p className="mt-4 font-sans text-[14px] leading-[1.6] text-muted">
                  {t('devenirFormateur:avantages.highlight.text1')}
                </p>
                <p className="mt-3 font-sans text-[14px] leading-[1.6] text-muted">
                  {t('devenirFormateur:avantages.highlight.text2')}
                </p>
              </TiltCard>
            </div>
            {/* Liserés haut/bas prolongés jusqu'aux bords de l'écran ; ticks={false} car
                les angles sont déjà marqués par les CellTicks des cellules. */}
            <BlockGuides ticks={false} />
            {/* Séparations internes entre rangées, prolongées de même */}
            <GridRowRules gridRef={avantagesGridRef} />
          </div>
        </div>
      </Reveal>

      {/* ===== DISCIPLINES (grille) ===== */}
      {/* overflow-x-clip : les liserés filent jusqu'aux bords de l'écran, on rogne donc
          l'horizontale. Surtout pas overflow-hidden, qui rognerait aussi la verticale et
          couperait en deux les carrés posés à cheval sur les liserés. */}
      <Reveal as="section" className={`${SECTION} overflow-x-clip py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <Label>{t('devenirFormateur:disciplines.label')}</Label>
          <h2 className="mt-5 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-fg sm:text-[36px] md:text-[44px]">
            {t('devenirFormateur:disciplines.title')}<span className="text-wahm-orange">.</span>
          </h2>
          <p className="mt-5 max-w-[640px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('devenirFormateur:disciplines.subtitle')}
          </p>

          {/* Carrousel de cartes verticales (3 visibles) — flèches latérales */}
          <div className="relative mt-12 md:mt-14">
            <DisciplinesCarousel items={disciplines} />
            <BlockGuides />
            {/* Angles de la carte du MILIEU. Posés sur le bloc et non sur les cartes :
                ils restent fixes quand le carrousel défile, comme les quatre angles du
                bloc. Uniquement à partir de lg, seul palier où trois cartes sont
                visibles (basis-1/3) et où une « carte du milieu » existe donc.
                Positions déduites de la géométrie du carrousel : conteneur décalé de
                -1rem, chaque volet large de (100%+1rem)/3 et rentré de 1rem à gauche. */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
              <HeroGuideMark className="-top-[2.5px] left-[calc((100%+1rem)/3)] -translate-x-1/2" />
              <HeroGuideMark className="-bottom-[2.5px] left-[calc((100%+1rem)/3)] -translate-x-1/2" />
              <HeroGuideMark className="-top-[2.5px] right-[calc((100%-2rem)/3+1rem)] translate-x-1/2" />
              <HeroGuideMark className="-bottom-[2.5px] right-[calc((100%-2rem)/3+1rem)] translate-x-1/2" />
            </span>
          </div>

          <SectionOutro>{t('devenirFormateur:disciplines.outro')}</SectionOutro>
        </div>
      </Reveal>

      {/* ===== CRITERES (image + fiche d'évaluation façon feuille) ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label={t('devenirFormateur:criteres.label')}>{t('devenirFormateur:criteres.title')}</SectionHead>
          <p className="mt-6 max-w-[640px] font-sans text-[16px] leading-[1.7] text-muted">
            {t('devenirFormateur:criteres.subtitle')}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-16 md:mt-14">
            {/* Image : pas de carrés orange sur une photo seule — seules les équerres
                dorées du Shot (`corners`) l'habillent. */}
            <div className="relative border border-line/[0.08]">
              <Shot src={CRIT_IMAGE} alt={t('devenirFormateur:criteres.imageAlt')} className="aspect-square w-full" position="50% 30%" corners />
            </div>

            {/* Fiche d'évaluation — effet feuille posée, légèrement inclinée */}
            <div className="relative mx-auto w-full max-w-[540px] -rotate-1 bg-wahm-cream p-10 shadow-2xl shadow-black/50 md:p-12">
              <span aria-hidden="true" className="absolute right-0 top-0 border-b-[34px] border-l-[34px] border-b-transparent border-l-[#e7e1d2]" />
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-wahm-gold via-wahm-orange to-wahm-gold" />

              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-wahm-goldDark">{t('devenirFormateur:criteres.cardKicker')}</span>
                <span className="shrink-0 -rotate-6 border-[1.5px] border-wahm-orange/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-wahm-orange">
                  {t('devenirFormateur:criteres.cardBadge')}
                </span>
              </div>

              <h3 className="mt-4 font-display text-[26px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-wahm-navy md:text-[30px]">
                {t('devenirFormateur:criteres.cardTitle')}
              </h3>
              <span aria-hidden="true" className="mt-4 block h-px w-full bg-[#dcd6c8]" />

              <ul className="mt-7 space-y-5">
                {criteresItems.map((c) => (
                  <li key={c} className="flex items-start gap-4 border-b border-dashed border-[#dcd6c8] pb-5 last:border-b-0 last:pb-0">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-wahm-goldDark text-white">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="font-sans text-[16px] font-semibold leading-[1.45] text-wahm-navy md:text-[16.5px]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== CINQ ETAPES ===== */}
      <Reveal as="section" className={`${SECTION} py-20 md:py-[120px]`}>
        <div className={WRAP}>
          <SectionHead label={t('devenirFormateur:etapes.label')}>
            {t('devenirFormateur:etapes.title')}
          </SectionHead>
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,780px)_1fr] lg:items-stretch lg:gap-14">
          <div ref={timelineRef} className="relative">
            {/* Rail statique */}
            <span aria-hidden="true" className="absolute left-[21px] top-3 bottom-3 w-px bg-line/[0.1] md:left-[25px]" />
            {/* Rail de progression (se remplit au scroll) */}
            <motion.span aria-hidden="true" style={{ scaleY: railScaleY }} className="absolute left-[21px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-wahm-orange to-wahm-gold md:left-[25px]" />
            {/* Point lumineux qui descend au scroll */}
            <motion.span aria-hidden="true" style={{ y: dotY }} className="absolute left-[21px] top-0 z-0 -ml-[5px] h-[11px] w-[11px] rounded-full bg-wahm-orange shadow-[0_0_16px_4px_rgba(255,123,44,0.7)] md:left-[25px]" />

            <RevealStagger as="ol" className="relative m-0 list-none p-0">
              {etapesItems.map((step, i) => (
                <RevealItem as="li" key={step.title} className="relative flex gap-5 pb-12 last:pb-0 md:gap-8 md:pb-[68px]">
                  {/* Nœud numéroté */}
                  <span className="relative z-[1] flex h-[44px] w-[44px] shrink-0 items-center justify-center border border-wahm-orange/40 bg-surface font-display text-[15px] font-black text-gold md:h-[52px] md:w-[52px] md:text-[18px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1.5 md:pt-2.5">
                    <h3 className="font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-fg md:text-[20px]">{step.title}</h3>
                    <p className="mt-2 max-w-[620px] font-sans text-[15px] leading-[1.6] text-muted">{step.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
            {/* Visuel : épouse exactement la hauteur des étapes (image en absolu). */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0">
                {/* ticks={false} : pas de carrés orange sur une photo seule — seules les
                    équerres dorées du Shot (`corners`) l'habillent. */}
                <Framed className="h-full bg-surface-2" ticks={false}>
                  <Shot src="/assets/media/etapes-visual.webp" alt={t('devenirFormateur:etapes.imageAlt')} className="h-full w-full" position="50% 46%" corners />
                </Framed>
              </div>
            </div>
          </div>
          <SectionOutro>{t('devenirFormateur:etapes.outro')}</SectionOutro>
        </div>
      </Reveal>

      {/* ===== CANDIDATURE — FORMULAIRE (2 colonnes) ===== */}
      {/* overflow-x-clip : les liserés filent jusqu'aux bords de l'écran, on rogne donc
          l'horizontale. Surtout pas overflow-hidden, qui rognerait aussi la verticale et
          couperait en deux les carrés posés à cheval sur les liserés. */}
      <section id="candidature" className={`${SECTION} overflow-x-clip scroll-mt-[80px] py-20 md:py-[120px]`}>
        <div className={WRAP}>
          {/* Les repères vivent dans ce conteneur SANS overflow, et non dans la grille :
              celle-ci est en overflow-hidden (elle détoure les panneaux sur la bordure),
              ce qui rognait les carrés d'un quart. */}
          <div className="relative">
          <div className="grid grid-cols-1 overflow-hidden border border-line/[0.08] lg:grid-cols-2">

            {/* Panneau gauche : accroche (sombre, dégradé nuit → orange) */}
            <div className="relative flex flex-col justify-center overflow-hidden p-10 md:p-14" style={{ background: 'linear-gradient(135deg,#0b1a30 0%,#0A1A2F 46%,#5a2a0a 100%)' }}>
              <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-wahm-orange/20 blur-3xl" />
              <div className="relative">
                <Label>{t('devenirFormateur:candidature.label')}</Label>
                <h2 className="mt-7 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-white sm:text-[36px] md:text-[44px]">
                  {t('devenirFormateur:candidature.title')}<span className="text-wahm-orange">.</span>
                </h2>
                <p className="mt-6 max-w-[420px] font-sans text-[15.5px] leading-[1.7] text-white/70">
                  {t('devenirFormateur:candidature.text')}
                </p>
                <ul className="mt-9 space-y-4">
                  {candidatureBenefits.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center border border-wahm-orange/40 bg-wahm-orange/10 text-wahm-goldLight"><Check className="h-[14px] w-[14px]" strokeWidth={3} /></span>
                      <span className="font-display text-[13.5px] font-bold uppercase tracking-[0.01em] text-white">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne droite : panneau clair, formulaire / succès */}
            <div className="bg-wahm-cream p-8 md:p-11">
              <h3 className="font-display text-[22px] font-extrabold uppercase tracking-[-0.01em] text-wahm-navy sm:text-[24px]">{t('devenirFormateur:candidature.formTitle')}</h3>
              <p className="mt-2 font-sans text-[14px] leading-[1.6] text-subtle">{t('devenirFormateur:candidature.formSubtitle')}</p>

              <div className="mt-7">
            {status === 'success' ? (
              <div ref={successRef} tabIndex={-1} className="flex flex-col items-center justify-center py-10 text-center outline-none">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-wahm-orange text-white">
                  <Check className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
                </span>
                <h3 className="m-0 font-display text-[24px] font-extrabold uppercase tracking-[-0.01em] text-wahm-navy">{t('devenirFormateur:candidature.success.title')}</h3>
                <p className="mx-auto mt-3 max-w-[480px] font-sans text-[15px] leading-[1.7] text-subtle">
                  {t('devenirFormateur:candidature.success.text')}
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
                      <label htmlFor="f-nom" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.nom')}</label>
                      <input id="f-nom" name="nom" type="text" required autoComplete="name" placeholder={t('devenirFormateur:candidature.form.placeholders.nom')} className={INPUT_LIGHT} />
                    </div>
                    <div>
                      <label htmlFor="f-email" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.email')}</label>
                      <input id="f-email" name="email" type="email" required autoComplete="email" placeholder={t('devenirFormateur:candidature.form.placeholders.email')} className={INPUT_LIGHT} />
                    </div>
                  </div>

                  <div className="mt-[18px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
                    <div>
                      <label htmlFor="f-domaine" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.domaine')}</label>
                      <div className="relative">
                        <select
                          id="f-domaine"
                          name="domaine"
                          required
                          defaultValue=""
                          className={`${INPUT_LIGHT} appearance-none pr-10`}
                        >
                          <option value="" disabled>{t('devenirFormateur:candidature.form.domainePlaceholder')}</option>
                          {domaineOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8475]" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="f-theme" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.theme')}</label>
                      <input id="f-theme" name="theme" type="text" placeholder={t('devenirFormateur:candidature.form.placeholders.theme')} className={INPUT_LIGHT} />
                    </div>
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-echantillon" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.echantillon')}</label>
                    <input
                      id="f-echantillon"
                      type="file"
                      accept="video/*,application/pdf,image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="f-echantillon"
                      className={`${INPUT_LIGHT} flex cursor-pointer items-center justify-between gap-3`}
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-2.5">
                        <span className="truncate">
                          {fileState.status === 'uploading'
                            ? t('devenirFormateur:candidature.form.echantillonUploading')
                            : fileState.name || t('devenirFormateur:candidature.form.echantillonNone')}
                        </span>
                        {fileState.status === 'uploading' && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-wahm-gold/15"
                            aria-hidden="true"
                          >
                            {/* Fond « jauge liquide » qui monte puis redescend en boucle */}
                            <motion.span
                              className="absolute inset-x-0 bottom-0 bg-wahm-gold/40"
                              initial={{ height: '0%' }}
                              animate={{ height: ['0%', '100%', '100%', '0%'] }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.45, 0.55, 1] }}
                            />
                            {/* Chevron fixe par-dessus, ne se déforme jamais */}
                            <ChevronDown className="relative z-10 h-5 w-5 text-wahm-gold" strokeWidth={3.5} />
                          </motion.span>
                        )}
                      </span>
                      <span className="flex h-6 w-[92px] shrink-0 items-center justify-end">
                        <AnimatePresence mode="wait" initial={false}>
                          {fileState.status === 'done' ? (
                            <motion.span
                              key="done"
                              initial={{ scale: 0, opacity: 0, rotate: -45 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500"
                            >
                              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                            </motion.span>
                          ) : fileState.status !== 'uploading' ? (
                            <motion.span
                              key="browse"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-wahm-orange"
                            >
                              {t('devenirFormateur:candidature.form.echantillonBrowse')}
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </span>
                    </label>
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-refs" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.refs')}</label>
                    <input id="f-refs" name="refs" type="text" placeholder={t('devenirFormateur:candidature.form.placeholders.refs')} className={INPUT_LIGHT} />
                  </div>

                  <div className="mt-[18px]">
                    <label htmlFor="f-bio" className={LABEL_LIGHT}>{t('devenirFormateur:candidature.form.fields.bio')}</label>
                    <textarea
                      id="f-bio"
                      name="bio"
                      placeholder={t('devenirFormateur:candidature.form.placeholders.bio')}
                      className={`${INPUT_LIGHT} min-h-[110px] resize-y`}
                    />
                  </div>

                  {status === 'error' && errorMsg && (
                    <p role="alert" className="mt-4 rounded-lg border border-wahm-orange/40 bg-wahm-orange/10 px-4 py-3 font-sans text-[14px] text-[#9a3412]">
                      {errorMsg}
                    </p>
                  )}

                  <div className="mt-[26px]">
                    <Action type="submit" variant="filled" arrow disabled={status === 'submitting' || fileState.status === 'uploading'} className="w-full disabled:cursor-not-allowed disabled:opacity-60">
                      {status === 'submitting' ? t('devenirFormateur:candidature.form.submitting') : t('devenirFormateur:candidature.form.submit')}
                    </Action>
                  </div>

                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">
                    {t('devenirFormateur:candidature.form.consent')}
                  </p>
                </form>
            )}
              </div>
            </div>
          </div>
            {/* Liserés haut/bas prolongés jusqu'aux bords de l'écran + carrés aux quatre
                angles du bloc */}
            <BlockGuides />
            {/* Jointure verticale des deux panneaux, à mi-largeur. Uniquement à partir
                de lg : en dessous ils sont empilés et cette jointure n'existe pas. */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
              <HeroGuideMark className="-top-[2.5px] left-1/2 -translate-x-1/2" />
              <HeroGuideMark className="-bottom-[2.5px] left-1/2 -translate-x-1/2" />
            </span>
          </div>
        </div>
      </section>

    </Page>
  )
}
