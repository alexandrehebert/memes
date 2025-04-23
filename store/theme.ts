import { useTheme } from "vuetify";
import { useRequestHeaders } from "#app";

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      if (import.meta.client) {
        localStorage.setItem('theme-preference', this.isDark ? 'dark' : 'light');
      }
    },
    initTheme() {
      if (import.meta.server) {
        const headers = useRequestHeaders(['sec-ch-prefers-color-scheme']);
        this.isDark = headers['sec-ch-prefers-color-scheme'] === 'dark';
      } else if (import.meta.client) {
        const storedTheme = localStorage.getItem('theme-preference');
        if (storedTheme) {
          this.isDark = storedTheme === 'dark';
        } else {
          const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          this.isDark = isDarkMode;
        }
      }
    }
  }
});