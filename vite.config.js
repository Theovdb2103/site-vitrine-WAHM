import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base '/' : déploiement à la racine du domaine (O2switch public_html).
export default defineConfig({
  plugins: [react()],
  base: '/',
})
