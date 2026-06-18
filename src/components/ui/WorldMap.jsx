import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import DottedMap from 'dotted-map'

// Carte du monde en pointillés + arcs animés entre villes (réseau mondial).
// Adapté en JSX, DA WAHM : fond bleu nuit transparent, points acier, arcs orange.
export function WorldMap({ dots = [], lineColor = '#FF7B2C', animationDuration = 2.2, loop = true }) {
  const svgRef = useRef(null)
  const map = useMemo(() => new DottedMap({ height: 100, grid: 'diagonal' }), [])
  const svgMap = useMemo(
    () => map.getSVG({ radius: 0.22, color: 'rgba(159,177,198,0.35)', shape: 'circle', backgroundColor: 'transparent' }),
    [map],
  )

  const projectPoint = (lat, lng) => ({ x: (lng + 180) * (800 / 360), y: (90 - lat) * (400 / 180) })
  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  const staggerDelay = 0.3
  const totalAnimationTime = dots.length * staggerDelay + animationDuration
  const pauseTime = 2
  const fullCycleDuration = totalAnimationTime + pauseTime

  // Points uniques (origine + destinations) avec leur libellé de ville.
  const seen = new Set()
  const points = []
  dots.forEach((dot) => {
    ;[{ p: dot.start, origin: true }, { p: dot.end, origin: false }].forEach(({ p, origin }) => {
      const key = `${p.lat},${p.lng}`
      if (seen.has(key)) return
      seen.add(key)
      points.push({ ...projectPoint(p.lat, p.lng), label: p.label, origin })
    })
  })

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none object-cover [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)]"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <svg ref={svgRef} viewBox="0 0 800 400" className="pointer-events-none absolute inset-0 h-full w-full select-none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="wahm-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)
          const startTime = (i * staggerDelay) / fullCycleDuration
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration
          const resetTime = totalAnimationTime / fullCycleDuration
          const path = createCurvedPath(startPoint, endPoint)
          return (
            <g key={`path-${i}`}>
              <motion.path
                d={path}
                fill="none"
                stroke="url(#wahm-path-gradient)"
                strokeWidth="1.1"
                initial={{ pathLength: 0 }}
                animate={loop ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
                transition={loop
                  ? { duration: fullCycleDuration, times: [0, startTime, endTime, resetTime, 1], ease: 'easeInOut', repeat: Infinity }
                  : { duration: animationDuration, delay: i * staggerDelay, ease: 'easeInOut' }}
              />
              {loop && (
                <motion.circle
                  r="3.5"
                  fill={lineColor}
                  initial={{ offsetDistance: '0%', opacity: 0 }}
                  animate={{ offsetDistance: [null, '0%', '100%', '100%', '100%'], opacity: [0, 0, 1, 0, 0] }}
                  transition={{ duration: fullCycleDuration, times: [0, startTime, endTime, resetTime, 1], ease: 'easeInOut', repeat: Infinity }}
                  style={{ offsetPath: `path('${path}')` }}
                />
              )}
            </g>
          )
        })}

        {points.map((p, i) => {
          const r = p.origin ? 4 : 3
          const labelRight = p.x < 660
          return (
            <g key={`pt-${i}`}>
              <circle cx={p.x} cy={p.y} r={r} fill={lineColor} />
              <circle cx={p.x} cy={p.y} r={r} fill={lineColor} opacity="0.5">
                <animate attributeName="r" from={r} to={p.origin ? 18 : 12} dur="2.4s" begin={`${(i % 3) * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2.4s" begin={`${(i % 3) * 0.4}s`} repeatCount="indefinite" />
              </circle>
              {p.label && (
                <text
                  x={labelRight ? p.x + 9 : p.x - 9}
                  y={p.y - 8}
                  textAnchor={labelRight ? 'start' : 'end'}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontSize={p.origin ? 11 : 9.5}
                  fontWeight={p.origin ? 700 : 500}
                  letterSpacing="0.6"
                  fill={p.origin ? '#FF7B2C' : '#E9B14A'}
                >
                  {p.label.toUpperCase()}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
