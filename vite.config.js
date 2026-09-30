import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifestFilename: 'manifest.json',
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: 'Tally My Words — Reading Time & Keyword Density Analyzer',
        short_name: 'TallyMyWords',
        description: 'Instant, privacy-first reading time, word count, character count, and keyword density analyzer.',
        theme_color: '#4f46e5',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/icons.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // Google Fonts stylesheets: CacheFirst
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Google Fonts webfont binaries: CacheFirst
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-webfonts-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Page navigation: NetworkFirst with offline cache fallback
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-pages-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Static assets (scripts, styles, translations, images, fonts): CacheFirst
            urlPattern: ({ request }) =>
              request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'image' ||
              request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'app-assets-cache',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 60 // 60 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  esbuild: {
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
  },
})
