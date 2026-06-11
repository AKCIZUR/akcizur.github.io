import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
  const isGithubPages = process.env.GITHUB_PAGES === 'true' || mode === 'github-pages'
  const basePath = process.env.VITE_BASE_PATH || (isGithubPages && repoName ? `/${repoName}/` : '/')

  return {
    base: basePath,
    plugins: [vue()],
  }
})
