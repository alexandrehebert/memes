import { defineStore } from 'pinia';
import type { Meme } from '../types';

import { memes } from '~/static/memes.json'

export const useMemeStore = defineStore('memes', {
  state: () => {
    return {
      memes: memes.map((meme: any): Meme => ({
        name: meme.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: meme.name,
        category: meme.category,
        image: meme.image,
        tags: meme.tags,
      }))
    };
  },
  actions: {
    getMemeByNameAndCategory(name: string, category: string) {
      return this.memes.find(meme => meme.name === name && meme.category === category);
    }
  },
});
