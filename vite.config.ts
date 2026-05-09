/**
 * @fileoverview Vite configuration for the Architecture AI application.
 * Manages build settings, development server configuration, environment variables,
 * and path aliases for the React environment.
 */

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Defines the Vite configuration object.
 * @param {Object} context - The Vite execution context.
 * @param {string} context.mode - The current build mode (e.g., 'development', 'production').
 * @returns {import('vite').UserConfig} The completed Vite configuration.
 */
export default defineConfig(({ mode }) => {
    /**
     * Loads environment variables from the root directory based on the current mode.
     */
    const env = loadEnv(mode, '.', '');

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
