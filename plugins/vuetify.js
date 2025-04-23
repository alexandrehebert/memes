import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const customLightTheme = {
    dark: false,
    colors: {
      primary: '#2c3e50',
      'primary-dark': '#1a2634',
      'primary-light': '#3e5771',
      secondary: '#34495e',
      'secondary-dark': '#2c3e50',
      'secondary-light': '#486683',
      tertiary: '#95a5a6',
      'tertiary-dark': '#7f8c8d',
      'tertiary-light': '#b3c1c2',
      'neutral-black-100': '#000',
      'neutral-black-80': '#333',
      'neutral-black-75': '#404040',
      'neutral-black-55': '#757575',
      'neutral-black-40': '#999',
      'neutral-black-15': '#d6d6d6',
      'neutral-black-5': '#f1f1f1',
      'neutral-black-3': '#fafafa',
      'neutral-black-0': '#fff',
      'medal-gold': '#f39c12',
      'medal-silver': '#bdc3c7',
      'medal-bronze': '#d35400'
    },
  };

  const customDarkTheme = {
    dark: true,
    colors: {
      primary: '#455a64',
      'primary-dark': '#37474f',
      'primary-light': '#546e7a',
      secondary: '#607d8b',
      'secondary-dark': '#455a64',
      'secondary-light': '#78909c',
      tertiary: '#90a4ae',
      'tertiary-dark': '#78909c',
      'tertiary-light': '#b0bec5',
      'neutral-black-100': '#fff',
      'neutral-black-80': '#fafafa',
      'neutral-black-75': '#f1f1f1',
      'neutral-black-55': '#d6d6d6',
      'neutral-black-40': '#999',
      'neutral-black-15': '#757575',
      'neutral-black-5': '#333',
      'neutral-black-3': '#404040',
      'neutral-black-0': '#000',
      'medal-gold': '#ffd54f',
      'medal-silver': '#cfd8dc',
      'medal-bronze': '#ff8a65'
    },
  };

  const vuetify = createVuetify({
    defaults: {
      global: {
        useUtilityClasses: true,
        ripple: false,
      },
    },
    theme: {
      defaultTheme: 'customLightTheme',
      themes: {
        customLightTheme,
        customDarkTheme,
      },
    },
    components,
  }); 

  // Update theme based on system preference
  // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //   vuetify.theme.global.name.value = 'customDarkTheme';
  // }

  // Listen for system theme changes
  // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  //   vuetify.theme.global.name.value = e.matches ? 'customDarkTheme' : 'customLightTheme';
  // });

  nuxtApp.vueApp.use(vuetify)
});