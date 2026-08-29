// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Injected at build time via Cloudflare Pages build environment variable SITE_URL.
  // .env files are not loaded inside astro.config.mjs, so we read process.env directly.
  site: process.env.SITE_URL,
  vite: {
    plugins: [tailwindcss()],
  },
});
