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
  ],

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