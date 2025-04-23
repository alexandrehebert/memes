import { defineStore } from 'pinia';
import type { Meme } from '../types';

import { memes } from '~/static/memes.json'

export const useMemeStore = defineStore('memes', {
  state: () => {
    const allMemes = memes.map((meme: any): Meme => ({
      name: meme.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .replace(/--+/g, '-'),
      description: meme.name,
      category: meme.category,
      image: meme.image,
      tags: meme.tags,
    }))
    const uniqueCategories = [...new Set(memes.map(meme => meme.category))];
    const categories = uniqueCategories.sort();

    return {
      memes: allMemes,
      categories,
    };
  },
  actions: {
    getMemeByNameAndCategory(name: string, category: string) {
      return this.memes.find(meme => meme.name === name && meme.category === category);
    }
  },
});
