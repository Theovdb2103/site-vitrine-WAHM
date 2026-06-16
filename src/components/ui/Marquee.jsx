// Bandeau défilant infini (marquee). Le contenu est dupliqué pour une boucle continue ;
// défilement en CSS (perf), pause au survol, sens réversible. Respecte reduced-motion
// (le défilement est désactivé via .wahm-marquee-track dans index.css).
export function Marquee({ children, reverse = false, duration = 34, className = '' }) {
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className="wahm-marquee-track flex shrink-0 group-hover:[animation-play-state:paused]"
        style={{ animation: `${reverse ? 'wahm-marquee-rev' : 'wahm-marquee'} ${duration}s linear infinite` }}
      >
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
      </div>
    </div>
  )
}
