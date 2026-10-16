import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  integrations: [react()],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      GEMINI_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
});
