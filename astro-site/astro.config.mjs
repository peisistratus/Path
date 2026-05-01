// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

// GitHub Pages: base should be "/" when using a custom domain (peisistratus.com).
// If you ever deploy under https://<user>.github.io/<repo>/, set base to "/<repo>/".
export default defineConfig({
  site: 'https://peisistratus.com',
  base: '/',
  trailingSlash: 'never',
  integrations: [mdx()],
})
