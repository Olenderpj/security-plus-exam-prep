import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // The Vercel ↔ Supabase integration provides NEXT_PUBLIC_SUPABASE_* variables.
  // Only these public (browser-safe) prefixes are exposed — never SUPABASE_SERVICE_ROLE_KEY etc.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_']
})
