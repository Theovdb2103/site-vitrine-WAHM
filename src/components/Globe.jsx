import { useCallback, useEffect, useRef } from 'react'
import createGlobe from 'cobe'

// Globe interactif (cobe) habillé selon la DA WAHM : sphère bleu nuit, marqueurs
// orange WAHM, halo discret. Villes = réseau international WAHM (hub Paris).
const WAHM_GLOBE = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 0.86,
  diffuse: 1.3,
  mapSamples: 22000,
  mapBrightness: 9,
  mapBaseBrightness: 0.16, // révèle les continents même côté ombre
  baseColor: [0.34, 0.49, 0.7], // bleu acier (continents)
  markerColor: [255 / 255, 123 / 255, 44 / 255], // orange WAHM
  glowColor: [0.24, 0.36, 0.54], // halo bleu nuit
  markers: [
    { location: [48.8566, 2.3522], size: 0.11 }, // Paris (hub)
    { location: [40.7128, -74.006], size: 0.08 }, // New York
    { location: [-23.5505, -46.6333], size: 0.07 }, // São Paulo
    { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    { location: [-1.2921, 36.8219], size: 0.05 }, // Nairobi
    { location: [25.2048, 55.2708], size: 0.06 }, // Dubaï
    { location: [51.5074, -0.1278], size: 0.06 }, // Londres
    { location: [1.3521, 103.8198], size: 0.05 }, // Singapour
    { location: [34.0522, -118.2437], size: 0.06 }, // Los Angeles
  ],
}

export default function Globe({ className = '', config = WAHM_GLOBE }) {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const rRef = useRef(0)
  const widthRef = useRef(0)

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value
    if (canvasRef.current) canvasRef.current.style.cursor = value ? 'grabbing' : 'grab'
  }

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      rRef.current = delta / 200
    }
  }

  // Closure stable (deps []) : rotation auto continue + amortissement de l'inertie au drag.
  const onRender = useCallback((state) => {
    if (!pointerInteracting.current) phiRef.current += 0.006
    rRef.current *= 0.92
    state.phi = phiRef.current + rRef.current
    state.width = widthRef.current * 2
    state.height = widthRef.current * 2
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    })

    // Le rendu WebGL tourne en continu à 60fps tant qu'il n'est pas mis en pause :
    // on le coupe quand le globe sort de l'écran pour ne pas grignoter le budget
    // de fluidité du scroll ailleurs sur la page (aucun changement visuel).
    const io = new IntersectionObserver(([entry]) => {
      globe.toggle(entry.isIntersecting)
    })
    if (canvasRef.current) io.observe(canvasRef.current)

    const t = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    })
    return () => {
      clearTimeout(t)
      io.disconnect()
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`absolute inset-0 mx-auto aspect-square w-full max-w-[600px] ${className}`}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerInteractionMovement.current)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  )
}
