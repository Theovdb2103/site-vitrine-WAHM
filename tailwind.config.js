/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wahm: {
          navy: '#0A1A2F',
          navyDark: '#06121f',
          cookie: '#0d2138',
          cream: '#F7F6F2',
          gold: '#D4A018',
          goldLight: '#E9B14A',
          goldDark: '#9a7a1e',
          orange: '#FF7B2C',
          steel: '#1F4C73',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['General Sans', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'orange-glow': '0 16px 34px -12px rgba(255,123,44,.65)',
        'orange-glow-sm': '0 16px 34px -12px rgba(255,123,44,.6)',
      },
      backgroundImage: {
        // Grille de carrés fine (texture de fond des cartes) — ton WAHM (blanc très léger,
        // accordé aux hairlines white/[0.08] du site).
        'square-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cg stroke-width='3.5' stroke='hsla(0, 0%25, 100%25, 0.09)' fill='none'%3E%3Crect width='400' height='400' x='0' y='0'%3E%3C/rect%3E%3Crect width='400' height='400' x='400' y='0'%3E%3C/rect%3E%3Crect width='400' height='400' x='0' y='400'%3E%3C/rect%3E%3Crect width='400' height='400' x='400' y='400'%3E%3C/rect%3E%3C/g%3E%3C/svg%3E\")",
        // Variante orange (accent) pour usages ponctuels.
        'square-pattern-orange': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cg stroke-width='3.5' stroke='hsla(24, 100%25, 58%25, 0.16)' fill='none'%3E%3Crect width='400' height='400' x='0' y='0'%3E%3C/rect%3E%3Crect width='400' height='400' x='400' y='0'%3E%3C/rect%3E%3Crect width='400' height='400' x='0' y='400'%3E%3C/rect%3E%3Crect width='400' height='400' x='400' y='400'%3E%3C/rect%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
