// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [icon()],
  vite: {
    plugins: [tailwind()],
  },
});
