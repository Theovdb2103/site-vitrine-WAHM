import fr from '../../assets/flags/fr.svg'
import gb from '../../assets/flags/gb.svg'
import nl from '../../assets/flags/nl.svg'
import de from '../../assets/flags/de.svg'
import es from '../../assets/flags/es.webp'
import it from '../../assets/flags/it.svg'
import ru from '../../assets/flags/ru.svg'

// Drapeau affiché en image (et non en emoji) : les emojis-drapeaux ne s'affichent pas
// sur Windows/Chrome (rendus en lettres « FR »).
//
// Les fichiers sont auto-hébergés et importés, sans dépendance à un CDN tiers.
// Auparavant servis par flagcdn, dont le drapeau espagnol pèse à lui seul 153 Ko
// (armoiries en tracés) : mesuré, il coûtait ~1,4 s de LCP sur mobile à l'ouverture de
// la modale de langue, et expliquait à lui seul l'instabilité des mesures.
//
// Tous pèsent moins que la limite d'inlining de Vite : aucun n'est émis en fichier
// séparé. Les sept sont intégrés en data URI directement dans le chunk JS (lui-même
// haché et mis en cache définitivement), et ne provoquent donc aucune requête réseau
// distincte. Le drapeau de la langue courante, rendu par l'en-tête au prérendu, se
// retrouve pour la même raison en data URI dans le HTML SSG lui-même.
//
// Chaque fichier reprend le ratio officiel de son drapeau (identique à flagcdn), pour
// que le recadrage `object-cover` reste exactement celui d'avant.
// L'Espagne est un WebP de 120×80 plutôt qu'un SVG : ses armoiries sont indessinables
// en tracés légers, et cette définition couvre le plus grand affichage (34×24) en 3x.
const FLAGS = { FR: fr, EN: gb, NL: nl, DE: de, ES: es, IT: it, RU: ru }

export default function Flag({ code = 'FR', className = '' }) {
  const src = FLAGS[code] || FLAGS.FR
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width="30"
      height="20"
      className={`inline-block shrink-0 rounded-[2px] object-cover ${className}`}
    />
  )
}
