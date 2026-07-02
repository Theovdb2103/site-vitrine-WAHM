import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base '/' : déploiement sur Vercel (racine du domaine).
export default defineConfig({
  plugins: [react()],
  base: '/',
})
