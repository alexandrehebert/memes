export default defineNuxtConfig({
  pages: true,
  ssr: true,
  devtools: { enabled: false },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  plugins: [
    '~/plugins/vuetify.js',
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
  ],

  image: {
    dir: 'public/memes',
    provider: 'ipx',
    screens: {
      'whatsapp': 300
    },
    presets: {
      seo: {
        modifiers: {
          width: 300,
          height: 300,
          format: 'jpeg',
          quality: 80
        }
      }
    },
  },

  components: true,

  build: {
    transpile: ['vuetify'],
  },

  routeRules: {
    '/': { prerender: true },
    '/**': { prerender: true },
  },

  compatibilityDate: '2025-04-22',

  runtimeConfig: {
    public: {
      host: process.env.HOST || 'http://localhost:3000',
    },
  },
});