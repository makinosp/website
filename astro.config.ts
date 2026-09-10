import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // Injected at build time via Cloudflare Pages build environment variable SITE_URL.
  // .env files are not loaded inside astro.config.ts, so we read process.env directly.
  site: process.env.SITE_URL,
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
