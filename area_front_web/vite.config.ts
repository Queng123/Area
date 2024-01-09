/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_BASE_URL': JSON.stringify(env.REACT_APP_BASE_URL),
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify(env.GOOGLE_CLIENT_ID),
      'process.env.GOOGLE_CLIENT_SCOPE': JSON.stringify(env.GOOGLE_CLIENT_SCOPE),
      'process.env.DISCORD_CLIENT_ID': JSON.stringify(env.DISCORD_CLIENT_ID),
      'process.env.DISCORD_CLIENT_SCOPE': JSON.stringify(env.DISCORD_CLIENT_SCOPE),
      'process.env.GITHUB_CLIENT_ID': JSON.stringify(env.GITHUB_CLIENT_ID),
      'process.env.GITHUB_CLIENT_SCOPE': JSON.stringify(env.GITHUB_CLIENT_SCOPE),
      'process.env.MSTEAMS_CLIENT_ID': JSON.stringify(env.MSTEAMS_CLIENT_ID),
      'process.env.MSTEAMS_CLIENT_SECRET': JSON.stringify(env.MSTEAMS_CLIENT_SECRET),
      'process.env.MSTEAMS_CLIENT_SCOPE': JSON.stringify(env.MSTEAMS_CLIENT_SCOPE),
      'process.env.SPOTIFY_CLIENT_ID': JSON.stringify(env.SPOTIFY_CLIENT_ID),
      'process.env.SPOTIFY_CLIENT_SCOPE': JSON.stringify(env.SPOTIFY_CLIENT_SCOPE),
    },

    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },
    server: {
      port: 8081,
      host: true,
    }
  }
})

