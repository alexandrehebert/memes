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
    dir: 'public',
    screens: {
      xs: 300,
      sm: 300,
      md: 300,
      lg: 300,
      xl: 300,
      xxl: 300,
    },
    presets: {
      seo: {
        modifiers: {
          width: 300,
          height: 300,
          quality: 70
        }
      }
    },
    format: ['png'],
    provider: 'ipx',
    domains: [process.env.HOST || 'localhost'],
    staticFilename: '[name]-[hash][ext]'
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