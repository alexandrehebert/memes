export default defineNuxtConfig({  
  features: {
    inlineStyles: false,
  },

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
    screens: {
      'whatsapp': 600
    },
    presets: {
      seo: {
        modifiers: {
          width: 600,
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
  },

  compatibilityDate: '2025-04-22',

  runtimeConfig: {
    public: {
      host: process.env.HOST || 'http://localhost:3000',
    },
  },
});