// Drapeau affiché en image SVG (et non en emoji) : les emojis-drapeaux ne s'affichent
// pas sur Windows/Chrome (rendus en lettres « FR »). On utilise donc des SVG de drapeaux
// servis par flagcdn — nets, légers, cohérents sur toutes les plateformes.
const CC = { FR: 'fr', EN: 'gb', ES: 'es', DE: 'de', PT: 'pt', IT: 'it' }

export default function Flag({ code = 'FR', className = '' }) {
  const cc = CC[code] || 'fr'
  return (
    <img
      src={`https://flagcdn.com/${cc}.svg`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`inline-block shrink-0 rounded-[2px] object-cover ${className}`}
    />
  )
}
