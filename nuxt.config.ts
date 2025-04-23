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
    screens: {
      xs: 260,
      sm: 260,
      md: 260,
      lg: 260,
      xl: 260,
      xxl: 260,
    },
    presets: {
      seo: {
        modifiers: {
          width: 260,
          height: 260,
          quality: 70
        }
      }
    },
    format: ['png'],
    provider: 'ipx',
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