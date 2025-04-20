import { defineStore } from 'pinia';
import { Meme } from '../types';
import { useTheme } from 'vuetify';
import { BASE_URL } from '../constants';

export const useMemeStore = defineStore('memes', {
  state: () => {
    return {
      memes: [] as Array<Meme>,
    };
  },
  actions: {
    async loadData() {
      try {
        const response = await fetch(BASE_URL + '/memes.json');
        const data = await response.json();
        this.memes = data.memes.map((meme: any): Meme => ({
          name: meme.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: meme.name,
          category: meme.category,
          image: BASE_URL + meme.image,
          tags: meme.tags,
        }));
        console.log('Memes loaded:', this.memes);
      } catch (error) {
        console.error('Error loading memes:', error);
      }
    },
    getMemeByNameAndCategory(name: string, category: string) {
      return this.memes.find(meme => meme.name === name && meme.category === category);
    }
  },
});

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: Boolean(window.matchMedia('(prefers-color-scheme: dark)').matches),
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
