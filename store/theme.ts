import { useTheme } from "vuetify";

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,// Boolean(window.matchMedia('(prefers-color-scheme: dark)').matches),
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
    syncWithSystem() {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark = isDarkMode;
      const theme = useTheme();
      theme.global.name.value = isDarkMode ? 'customDarkTheme' : 'customLightTheme';
    },
  }
});
