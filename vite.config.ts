import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Automatically set correct base for GitHub Pages
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
})
