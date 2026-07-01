import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Glyphe chevron « ❯ » signature WAHM : caractère Unicode U+276F (HEAVY RIGHT-POINTING
// ANGLE QUOTATION MARK ORNAMENT), exactement la forme voulue. `size` pilote la taille
// (font-size en px), `currentColor` la teinte.
function ChevronGlyph({ className = '', size = 20, weight = 0.07, style }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        fontSize: size,
        fontWeight: 900,
        // Contour assorti à la teinte → épaissit le trait du glyphe, proportionnel à la taille.
        WebkitTextStroke: `${weight}em currentColor`,
        ...style,
      }}
    >
      ❯
    </span>
  )
}

// === Vocabulaire visuel « technical / severe » (inspiration sport editorial) ===
// Base sombre plate, fines bordures formant une grille, croix de repère « + » aux
// angles, gros titres terminés par un point orange, libellés monospace tracés.
// On conserve les couleurs WAHM (navy/orange/or) et la typo (Montserrat/Inter).

// Petit carré plein orange WAHM posé sur un angle d'un conteneur `relative`.
function Mark({ className = '' }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute h-[5px] w-[5px] bg-wahm-orange ${className}`} />
}

// Les quatre marques d'angle (signature technique). Parent doit être `relative`.
export function CornerTicks({ className = '' }) {
  return (
    <span className={className} aria-hidden="true">
      <Mark className="-left-[2.5px] -top-[2.5px]" />
      <Mark className="-right-[2.5px] -top-[2.5px]" />
      <Mark className="-bottom-[2.5px] -left-[2.5px]" />
      <Mark className="-bottom-[2.5px] -right-[2.5px]" />
    </span>
  )
}

// Boîte encadrée à liseré fin + croix d'angle.
export function Framed({ as: Tag = 'div', className = '', ticks = true, tickColor, children, ...rest }) {
  return (
    <Tag className={`relative border border-line/[0.1] ${className}`} {...rest}>
      {ticks && <CornerTicks className={tickColor || 'text-wahm-orange/60'} />}
      {children}
    </Tag>
  )
}

// Carte interactive « verre dépoli » : au survol, légère inclinaison 3D suivant le
// curseur + reflet orange qui suit la souris. Conserve le liseré fin + les marques
// d'angle WAHM. Rendu <a> si `href`, sinon <div>. Respecte prefers-reduced-motion.
export function TiltCard({ as = 'div', href, className = '', children, max = 7, ticks = true, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const onMove = (e) => {
    const el = ref.current
    if (!el || reduce) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
    el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const Tag = href ? 'a' : as
  const tagProps = href ? { href } : {}
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative transition-transform duration-200 ease-out will-change-transform hover:z-10 ${className}`}
      style={reduce ? undefined : { transform: 'perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))' }}
      {...tagProps}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,123,44,0.16), transparent 60%)' }}
      />
      {ticks && <CornerTicks />}
    </Tag>
  )
}

// Calque de texture : grille de carrés fine, fondue en diagonale (coin bas-gauche
// solide pour la lisibilité du contenu, motif visible en haut à droite). À placer
// dans un conteneur `relative`, derrière un contenu en `relative z-[1]`.
export function GridPattern({ variant = 'light', className = '' }) {
  const pattern = variant === 'orange' ? 'bg-square-pattern-orange' : 'bg-square-pattern'
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <span className={`absolute inset-0 ${pattern} bg-[length:42px_42px]`} />
      <span className="absolute inset-0 bg-gradient-to-tr from-surface via-surface/65 to-transparent" />
    </span>
  )
}

// Libellé technique : petit carré orange + texte tracé majuscule (mono).
export function Label({ children, className = '' }) {
  return (
    <span className={`inline-flex w-fit items-center bg-wahm-gold/15 px-3.5 py-1.5 font-grotesk text-[11.5px] font-semibold uppercase tracking-[0.14em] text-wahm-gold ${className}`}>
      {children}
    </span>
  )
}

// Titre de section : gros, gras, terminé par un point orange. Action optionnelle à droite.
export function SectionHead({ label, children, action, align = 'between', className = '' }) {
  const isCenter = align === 'center'
  return (
    <div className={`flex flex-wrap items-end gap-5 ${isCenter ? 'flex-col items-center text-center' : 'justify-between'} ${className}`}>
      <div className={isCenter ? 'flex flex-col items-center' : ''}>
        {label && <Label className={`mb-4 ${isCenter ? 'justify-center' : ''}`}>{label}</Label>}
        <h2 className="m-0 font-display text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-fg sm:text-[36px] md:text-[44px]">
          {children}<span className="text-wahm-orange">.</span>
        </h2>
      </div>
      {action}
    </div>
  )
}

// Bouton « slide-up reveal » (structure button-6) en couleurs WAHM.
// Au survol, le libellé glisse vers le haut tandis qu'un balayage biseauté de la
// couleur de révélation monte par le bas. Rendu <Link>, <a> ou <button> selon `to`.
// border = liseré ; rest = état repos (fond+texte) ; revBg/revText = balayage révélé.
const VARIANTS = {
  filled: { border: 'border-wahm-orange', rest: 'bg-wahm-orange text-white', revBg: 'bg-wahm-navy', revText: 'text-white' },
  outline: { border: 'border-line/30', rest: 'bg-transparent text-fg', revBg: 'bg-wahm-orange', revText: 'text-white' },
  outlineDark: { border: 'border-wahm-navy/45', rest: 'bg-transparent text-wahm-navy', revBg: 'bg-wahm-navy', revText: 'text-white' },
  pill: { border: 'border-line/20', rest: 'bg-transparent text-gold', revBg: 'bg-wahm-orange', revText: 'text-white' },
  dark: { border: 'border-wahm-navy', rest: 'bg-wahm-navy text-white', revBg: 'bg-wahm-goldLight', revText: 'text-wahm-navy' },
}
const ACT_SIZE = {
  md: { h: 'h-12 text-[13px]', px: 'px-6' },
  sm: { h: 'h-10 text-[12px]', px: 'px-5' },
}

export function Action({ to, onClick, type = 'button', variant = 'filled', size = 'md', arrow = false, className = '', children, ...rest }) {
  const v = VARIANTS[variant] || VARIANTS.filled
  const s = ACT_SIZE[size] || ACT_SIZE.md
  const radius = 'rounded-md'
  const base = `group relative inline-flex items-center justify-center overflow-hidden border-2 font-display font-bold uppercase tracking-[0.08em] no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-wahm-goldLight disabled:cursor-not-allowed disabled:opacity-60 ${radius} ${s.h} ${v.border} ${className}`

  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.4} aria-hidden="true" />}
    </>
  )
  const inner = (
    <>
      <span className={`inline-flex h-full w-full translate-y-0 items-center justify-center gap-2 whitespace-nowrap transition duration-500 group-hover:-translate-y-[150%] ${s.px} ${v.rest}`}>
        {content}
      </span>
      <span aria-hidden="true" className={`absolute inset-0 inline-flex h-full w-full translate-y-[105%] items-center justify-center gap-2 whitespace-nowrap transition duration-500 ease-out group-hover:translate-y-0 ${s.px} ${v.revBg} ${v.revText}`}>
        {content}
      </span>
    </>
  )

  // Lien externe http(s) → nouvel onglet (ne quitte jamais le site vitrine, évite
  // la perte d'état du thème au retour en arrière). Ancre interne / mailto / tel → <a>
  // même onglet. Route interne → <Link>.
  if (to && /^https?:/.test(to)) return <a href={to} onClick={onClick} target="_blank" rel="noopener noreferrer" className={base} {...rest}>{inner}</a>
  if (to && /^(mailto:|tel:|#)/.test(to)) return <a href={to} onClick={onClick} className={base} {...rest}>{inner}</a>
  if (to) return <Link to={to} onClick={onClick} className={base} {...rest}>{inner}</Link>
  return <button type={type} onClick={onClick} className={base} {...rest}>{inner}</button>
}

// Photo habillée selon la DA WAHM : object-cover, léger désaturé + voile bleu nuit
// pour fondre l'image dans la base sombre. À placer DANS un <Framed> (qui porte les
// marques d'angle) — le `overflow-hidden` interne ne rogne donc pas les marques.
export function Shot({ src, alt = '', className = '', imgClassName = '', overlay = true, position = 'center', corners = false }) {
  return (
    <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover grayscale-[18%] ${imgClassName}`} style={{ objectPosition: position }} />
      {overlay && <span aria-hidden="true" className="img-fade pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg,rgb(var(--c-surface) / 0.08),rgb(var(--c-surface) / 0.42))' }} />}
      {/* Équerres dorées (jaune WAHM) — accent autour des images seules */}
      {corners && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-7 w-7 border-l-2 border-t-2 border-wahm-goldLight" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 border-b-2 border-r-2 border-wahm-goldLight" />
        </>
      )}
    </div>
  )
}

// Motif signature WAHM : grille de chevrons « ❯ » (avance / mouvement / progression)
// répétés. Glyphe assuré par ChevronGlyph. `color` pilote la teinte. cols/rows ajustent
// la densité. Deux modes :
//   • fill (défaut) : colonnes en 1fr → la grille remplit la largeur du conteneur
//     (usage décoratif en fond, positionné en absolu avec une largeur fixe).
//   • fill=false : colonnes de largeur fixe = size → grille parfaitement carrée et
//     régulière (espacement égal H/V), centrée. Pour les blocs CTA façon « damier ».
export function Motif({ className = '', color = 'rgba(10,26,47,0.22)', cols = 7, rows = 8, size = 40, gap = 8, fill = true }) {
  const cells = Array.from({ length: cols * rows })
  return (
    <div
      aria-hidden="true"
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: fill ? `repeat(${cols}, minmax(0, 1fr))` : `repeat(${cols}, ${size}px)`,
        justifyContent: fill ? undefined : 'center',
        color,
        gap,
      }}
    >
      {cells.map((_, i) => (
        <ChevronGlyph key={i} className="w-full" size={size} />
      ))}
    </div>
  )
}

// Séparateur décoratif : rangée de chevrons WAHM centrée, pour rythmer les
// transitions entre sections (remplace les fins traits horizontaux).
export function ChevronDivider({ className = '', count = 7, color = '#D4A018', size = 26 }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center bg-surface ${className}`} style={{ color, gap: 7 }}>
      {Array.from({ length: count }).map((_, i) => (
        <ChevronGlyph key={i} size={size} />
      ))}
    </div>
  )
}
