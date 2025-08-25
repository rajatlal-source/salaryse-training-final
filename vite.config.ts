
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''

export default defineConfig({
  base: `/${repo}/`,
  plugins: [react()],
})
