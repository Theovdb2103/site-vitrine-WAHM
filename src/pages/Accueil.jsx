import { Dumbbell, HeartPulse, Activity, Wind, Brain, Target, Check, Award, Sparkles, Languages, Globe2, Users } from 'lucide-react'
import Page from '../components/Page'
import Reveal, { RevealStagger, RevealItem } from '../components/Reveal'
import HomeHero from '../components/sections/HomeHero'
import { GhostNumber } from '../components/ui/Kinetic'
import { Label, SectionHead, Action, Framed, CornerTicks, Motif, Shot, TiltCard, GridPattern } from '../components/ui/Frame'
import { ExpandingCards } from '../components/ui/ExpandingCards'
import { WorldMap } from '../components/ui/WorldMap'
import { getRouteConfig } from '../lib/site'

const POURQUOI_CARDS = [
  { id: 'experts', title: 'Experts mondiaux', description: 'Experts renommés à travers le monde en sciences du mouvement, performance et santé.', imgSrc: '/assets/media/pq-experts.webp', icon: <Award size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'exclusifs', title: 'Contenus exclusifs', description: 'Formations originales et introuvables ailleurs.', imgSrc: '/assets/media/pq-exclusifs.webp', icon: <Sparkles size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'multilingue', title: 'Multilingue', description: 'Traduction vocale instantanée conservant la voix originale, dans plusieurs langues.', imgSrc: '/assets/media/pq-multilingue.webp', icon: <Languages size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'acces', title: 'Accès mondial', description: "Un accès immédiat depuis n'importe quel pays et sur tous supports.", imgSrc: '/assets/media/pq-acces.webp', icon: <Globe2 size={24} strokeWidth={2} aria-hidden="true" /> },
  { id: 'communaute', title: 'Communauté', description: 'Une communauté de coachs, thérapeutes et passionnés partageant les mêmes valeurs.', imgSrc: '/assets/media/pq-communaute.webp', icon: <Users size={24} strokeWidth={2} aria-hidden="true" /> },
]

const PROMESSE = [
  'Certifiantes ou reconnues dans leur domaine',
  'Créées par des leaders internationaux (préparation physique, santé, Pilates, yoga, neurotraining…)',
  'Pédagogiques, pratiques et immédiatement applicables',
  'Mises à jour régulièrement selon les dernières recherches scientifiques',
  'Adaptées tous niveaux : débutants, confirmés, experts',
]

const CATEGORIES = [
  { Icon: Dumbbell, title: 'Coaching sportif & Personal Training', desc: 'Méthodologies modernes, planification, gestion clients, business du coaching.' },
  { Icon: HeartPulse, title: 'Santé & Rééducation – biomécanique', desc: 'Réhabilitation, biomécanique, mouvement fonctionnel, réathlétisation.' },
  { Icon: Activity, title: 'Préparation physique multisports', desc: 'Sports spécifiques, performance, puissance, vitesse, prévention des blessures.' },
  { Icon: Wind, title: 'Yoga & Pilates – Zen training', desc: 'Flow, mobilité, respiration, optimisation du mouvement.' },
  { Icon: Brain, title: 'Neurotraining & sciences du mouvement', desc: 'Réflexes archaïques, préférences motrices, boucle sensorimotrice.' },
  { Icon: Target, title: 'Développement personnel & Mental Coaching', desc: 'Imagerie mentale, mindset, motivation, gestion du stress.' },
]

// Bento « plateforme » : tuiles asymétriques (image plein cadre + accent orange).
const PLATEFORME = [
  { id: 'videos', tag: 'Vidéo', title: 'Des vidéos HD multilingues', desc: 'Cours filmés en haute définition, doublés dans plusieurs langues.', img: '/assets/media/plat-videos.webp', span: 'lg:col-span-3', h: 'min-h-[300px] md:min-h-[340px]' },
  { id: 'espace', tag: 'Suivi', title: 'Un espace personnel', desc: 'Votre tableau de bord : formations, certificats et progression en un coup d’œil.', img: '/assets/media/plat-espace.webp', span: 'lg:col-span-3', h: 'min-h-[300px] md:min-h-[340px]' },
  { id: 'soustitres', tag: 'Langues', title: 'Des sous-titres intelligents', desc: 'Synchronisés FR / EN / ES et plus encore.', img: '/assets/media/plat-soustitres.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
  { id: 'supports', tag: 'Ressources', title: 'Des supports téléchargeables', desc: 'Fiches, PDF et ressources à emporter partout.', img: '/assets/media/plat-supports.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
  { id: '247', tag: 'Disponibilité', title: 'Une accessibilité 24/7', desc: 'Apprenez quand vous voulez, où vous voulez.', img: '/assets/media/plat-247.webp', span: 'lg:col-span-2', h: 'min-h-[240px]' },
]

// Arcs du réseau mondial (Paris → grandes villes) pour la carte communauté.
const COMMUNAUTE_DOTS = [
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: 40.7128, lng: -74.006 } },
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: -23.5505, lng: -46.6333 } },
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: 35.6762, lng: 139.6503 } },
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: -33.8688, lng: 151.2093 } },
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: -1.2921, lng: 36.8219 } },
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: 25.2048, lng: 55.2708 } },
]

// Frise « trajectoire » de la communauté (titre court + détail).
const COMMUNAUTE = [
  { title: 'Réseau international', desc: 'Coachs, thérapeutes, préparateurs physiques et instructeurs.' },
  { title: 'Webinaires exclusifs', desc: 'Des sessions privées avec les meilleurs experts.' },
  { title: 'Réductions', desc: 'Des tarifs avantageux sur les formations.' },
  { title: "Groupes d'échange", desc: 'Des espaces privés dédiés entre membres.' },
  { title: 'Veille scientifique', desc: 'Une mise à jour continue des connaissances.' },
]

const STATS = [
  { value: '10', suffix: '+', label: 'Langues disponibles' },
  { value: '24/7', suffix: '', label: 'Accès illimité' },
  { value: '6', suffix: '', label: "Domaines d'expertise" },
  { value: '100', suffix: '%', label: 'Formations vérifiées' },
]

const SECTION = 'border-b border-white/[0.08] bg-wahm-navy'
const WRAP = 'mx-auto max-w-[1240px] px-5 md:px-10'

export default function Accueil() {
  const meta = getRouteConfig('/')
  return (
    <Page title={meta.title} description={meta.description} path="/">

      {/* ===== HERO ===== */}
      <HomeHero />

      {/* ===== STATS ===== */}
      <section className={SECTION}>
        <div className={WRAP}>
          <RevealStagger className="grid grid-cols-2 border-l border-t border-white/[0.08] lg:grid-cols-4" stagger={0.12}>
            {STATS.map((s, i) => (
              <RevealItem as="div" key={s.label} className="relative border-b border-r border-white/[0.08] p-7 md:p-8">
                <CornerTicks />
                <span className="font-mono text-[11px] text-wahm-orange">{String(i + 1).padStart(2, '0')}</span>
                <div className="mt-3 font-display text-[44px] font-black leading-none text-white md:text-[56px]">{s.value}<span className="text-wahm-orange">{s.suffix}</span></div>
                <div className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[#9fb1c6]">{s.label}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===== POURQUOI WAHM (grands numéros) ===== */}
      <Reveal as="section" id="pourquoi" className={`scroll-mt-[80px] ${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Pourquoi WAHM ?" action={<Action to="#marketplace" variant="pill" size="sm" arrow>Découvrir</Action>}>
            L'excellence mondiale, accessible à tous
          </SectionHead>
          <p className="mt-6 max-w-[680px] font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">
            WAHM n'est pas une marketplace comme les autres : c'est le point de convergence international du savoir vérifié, structuré et pensé pour votre évolution professionnelle.
          </p>
          <ExpandingCards items={POURQUOI_CARDS} className="mt-12" />
          <p className="mt-8 font-display text-[16px] font-bold italic text-wahm-goldLight">« La connaissance n'a plus de frontières. Votre expertise non plus. »</p>
        </div>
      </Reveal>

      {/* ===== NOTRE PROMESSE ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead label="Notre promesse">Vous former au meilleur, sans frontières</SectionHead>
          <p className="mt-6 font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">Nous nous engageons à proposer des formations :</p>
          <div className="mt-10 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {PROMESSE.map((txt, i) => (
              <TiltCard key={i} className="border-b border-r border-white/[0.08] p-7 md:p-8">
                <GridPattern />
                <div className="relative z-[1] flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-wahm-orange/30 bg-wahm-orange/10 text-wahm-orange"><Check className="h-[20px] w-[20px]" strokeWidth={2.6} aria-hidden="true" /></span>
                  <span className="self-center font-sans text-[15px] leading-[1.55] text-[#cdd8e4]">{txt}</span>
                </div>
              </TiltCard>
            ))}
            <TiltCard className="border-b border-r border-white/[0.08] bg-wahm-navyDark p-7 md:p-8">
              <GridPattern variant="orange" />
              <div className="relative z-[1] flex h-full items-center justify-center">
                <p className="m-0 text-center font-display text-[18px] font-bold uppercase leading-[1.2] tracking-[0.02em] text-white">Votre progression<br />devient illimitée<span className="text-wahm-orange">.</span></p>
              </div>
            </TiltCard>
          </div>
        </div>
      </Reveal>

      {/* ===== CATEGORIES ===== */}
      <Reveal as="section" id="categories" className={`scroll-mt-[80px] ${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <SectionHead
            label="Trouvez votre formation idéale"
            action={<Action to="#marketplace" variant="pill" size="sm" arrow>Tout explorer</Action>}
          >
            Des catégories pensées pour vous guider
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <TiltCard key={cat.title} href="#marketplace" className="block border-b border-r border-white/[0.08] no-underline transition-colors duration-200 hover:bg-wahm-navyDark" max={5}>
                <div className="relative">
                  <Shot src={`/assets/media/formation-${i + 1}.webp`} alt={cat.title} className="h-[160px] w-full" />
                  <span className="absolute right-4 top-4 font-mono text-[11px] tracking-[0.1em] text-wahm-goldLight">{String(i + 1).padStart(2, '0')}</span>
                  <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center border border-white/15 bg-wahm-navy text-wahm-orange transition-colors group-hover:border-wahm-orange"><cat.Icon className="h-[24px] w-[24px]" strokeWidth={1.8} aria-hidden="true" /></span>
                </div>
                <div className="p-7 pt-10 md:px-8 md:pb-8">
                  <h3 className="font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-white">{cat.title}</h3>
                  <p className="mt-3 font-sans text-[14px] leading-[1.6] text-[#9fb1c6]">{cat.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-wahm-orange">Explorer <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span></span>
                </div>
              </TiltCard>
            ))}
          </div>
          <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.1em] text-[#7f93a8]">Chaque formation est un investissement sécurisé dans votre expertise.</p>
        </div>
      </Reveal>

      {/* ===== BANNIERE CITATION ===== */}
      <Reveal as="section" className={`${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <Framed className="relative bg-wahm-navyDark px-6 py-16 md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <GhostNumber className="absolute -right-4 bottom-0 text-[120px] md:text-[200px]" stroke="rgba(255,123,44,0.1)">WAHM</GhostNumber>
            </div>
            <Motif color="rgba(255,123,44,0.9)" cols={8} rows={4} className="pointer-events-none absolute right-10 top-10 hidden w-[300px] md:grid" />
            <div className="relative max-w-[760px]">
              <Label>Notre conviction</Label>
              <p className="mt-6 font-display text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.015em] text-white sm:text-[40px] md:text-[48px]">
                Ne vous formez plus seul.<br />Avancez avec les meilleurs<span className="text-wahm-orange">.</span>
              </p>
              <div className="mt-9">
                <Action to="#marketplace" variant="filled" arrow>Explorer les formations</Action>
              </div>
            </div>
          </Framed>
        </div>
      </Reveal>

      {/* ===== PLATEFORME INTERNATIONALE ===== */}
      <Reveal as="section" id="plateforme" className={`scroll-mt-[80px] ${SECTION} py-16 md:py-[88px]`}>
        <div className={WRAP}>
          <Label>Pensée pour l'international</Label>
          <h2 className="mt-5 max-w-[760px] font-display text-[28px] font-extrabold uppercase leading-[1.04] tracking-[-0.015em] text-white sm:text-[38px]">Apprenez dans votre langue. À votre rythme. Partout<span className="text-wahm-orange">.</span></h2>

          {/* Bento : tuiles asymétriques, images plein cadre */}
          <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-6">
            {PLATEFORME.map((f, i) => (
              <div key={f.id} className={`group relative overflow-hidden border border-white/[0.1] bg-wahm-navyDark transition-colors duration-300 hover:border-wahm-orange/40 ${f.span} ${f.h}`}>
                <img src={f.img} alt={f.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[20%] transition-transform duration-700 ease-out group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,26,47,0.96), rgba(10,26,47,0.55) 48%, rgba(10,26,47,0.12))' }} />
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-wahm-orange transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-wahm-orange">{String(i + 1).padStart(2, '0')} · {f.tag}</span>
                  <h3 className="mt-2 font-display text-[18px] font-extrabold uppercase leading-[1.12] tracking-[-0.005em] text-white md:text-[21px]">{f.title}</h3>
                  <p className="mt-1.5 max-w-[440px] font-sans text-[13.5px] leading-[1.5] text-[#cdd8e4]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 font-display text-[16px] font-bold uppercase tracking-[0.02em] text-white">Vous choisissez où, quand et comment vous formez.</p>
        </div>
      </Reveal>

      {/* ===== COMMUNAUTE (frise « trajectoire ») ===== */}
      <Reveal as="section" id="communaute" className={`scroll-mt-[80px] ${SECTION} py-16 md:py-[88px]`}>
        <div className={`${WRAP} max-w-[760px]`}>
          <Label>Communauté WAHM</Label>
          <h2 className="mt-5 font-display text-[28px] font-extrabold uppercase leading-[1.04] tracking-[-0.015em] text-white sm:text-[38px]">La seule communauté mondiale dédiée au mouvement humain<span className="text-wahm-orange">.</span></h2>
          <p className="mt-6 font-sans text-[16px] leading-[1.7] text-[#9fb1c6]">En devenant membre, vous rejoignez un écosystème mondial pensé pour avancer ensemble — de la première formation à votre place parmi les meilleurs.</p>
        </div>

        {/* Carte du monde : le réseau international WAHM */}
        <div className={`${WRAP} mt-10`}>
          <WorldMap dots={COMMUNAUTE_DOTS} />
        </div>

        {/* Bénéfices + CTA */}
        <div className={`${WRAP} mt-12`}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-7 border-t border-white/[0.08] pt-10 sm:grid-cols-2 lg:grid-cols-5">
            {COMMUNAUTE.map((item, i) => (
              <div key={item.title}>
                <span className="font-mono text-[11px] text-wahm-orange">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-[14.5px] font-extrabold uppercase leading-[1.2] tracking-[-0.005em] text-white">{item.title}</h3>
                <p className="mt-1.5 font-sans text-[13.5px] leading-[1.5] text-[#9fb1c6]">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Action to="#marketplace" variant="filled" arrow>Rejoindre la communauté WAHM</Action>
          </div>
        </div>
      </Reveal>

      {/* ===== CTA FINAL (bloc accent) ===== */}
      <section className="border-b border-white/[0.08] bg-wahm-navy py-16 md:py-[88px]">
        <div className={WRAP}>
          <Reveal className="relative grid grid-cols-1 overflow-hidden bg-wahm-orange md:grid-cols-[1.4fr_1fr]">
            <div className="px-7 py-12 md:px-12 md:py-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-wahm-navy/70">Appel à action final</span>
              <h2 className="mt-5 font-display text-[32px] font-black uppercase leading-[0.98] tracking-[-0.02em] text-wahm-navy sm:text-[44px] md:text-[52px]">
                Votre évolution commence maintenant<span className="text-white">.</span>
              </h2>
              <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-[1.6] text-wahm-navy/85">Les meilleurs experts du monde vous attendent. Devenez un professionnel recherché et reconnu.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action to="#marketplace" variant="dark" arrow>Explorer les formations</Action>
                <Action to="/devenir-formateur" variant="outlineDark">Devenir formateur</Action>
              </div>
            </div>
            <div className="relative hidden items-center justify-center border-l border-wahm-navy/15 p-10 md:flex">
              <Motif color="#0A1A2F" />
            </div>
          </Reveal>
        </div>
      </section>

    </Page>
  )
}
