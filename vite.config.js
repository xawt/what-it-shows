import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

// Only to render the kb pages to static HTML; the kb itself is the export in src/.
export default defineConfig({
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'], layout: { runbook: fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url)) } })],
      adapter: adapter({ pages: 'build', assets: 'build', strict: false }),
      alias: { '#lib': 'src/lib' },
      inlineStyleThreshold: Infinity,
      prerender: { entries: ['/kb'], handleHttpError: 'warn' },
    }),
  ],
});
