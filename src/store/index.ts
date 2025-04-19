import { defineStore } from 'pinia';
import { Meme } from '../types';
import { useTheme } from 'vuetify';

export const useMemeStore = defineStore('memes', {
  state: () => {
    return {
      memes: [] as Array<Meme>,
    };
  },
  actions: {
    async loadData() {
      try {
        const response = await fetch('/memes.json');
        const data = await response.json();
        this.memes = data.memes.map((meme: any, index: number): Meme => ({
          id: index + 1,
          name: meme.name,
          category: meme.category,
          image: meme.image,
          tags: meme.tags,
          slug: meme.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        }));
      } catch (error) {
        console.error('Error loading memes:', error);
      }
    },
    getMemeBySlug(slug: string) {
      return this.memes.find(meme => meme.slug === slug);
    }
  },
  getters: {
    getMemeById: (state) => (id: number) => {
      return state.memes.find(meme => meme.id === id);
    }
  }
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
