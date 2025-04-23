<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="searchQuery"
          label="Search memes"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Filter by category"
          variant="outlined"
          hide-details
          clearable
        ></v-select>
      </v-col>
    </v-row>

    <template v-if="memes.length > 0">
      <template v-for="category in groupedMemes" :key="category.name">
        <v-row v-if="category.memes.length > 0" class="mt-4">
          <v-col cols="12" class="text-capitalize">
            {{ category.name }}
          </v-col>
          <v-col v-for="meme in category.memes" :key="meme.name" cols="12" sm="6" md="4" lg="3">
            <NuxtLink :to="{ name: 'category-name', params: { name: meme.name, category: meme.category } }">
              <v-card height="100%" elevation="2" variant="elevated">
                <div class="position-relative">
                    <v-img :src="'/memes/' + meme.image" :aspect-ratio="1" cover></v-img>
                    <v-tooltip location="left">
                        <template #activator="{ props }">
                            <v-btn
                                icon
                                v-bind="props"
                                size="small"
                                class="copy-btn"
                                @click.stop="copyMemeLink(meme)"
                            >
                                <v-icon size="small">mdi-content-copy</v-icon>
                            </v-btn>
                        </template>
                        {{ tooltipText }}
                    </v-tooltip>
                </div>
                <v-card-item>
                  <v-card-title>{{ meme.description }}</v-card-title>
                  <v-card-subtitle>
                      <div class="mt-2">
                      <v-chip
                          v-for="tag in meme.tags"
                          :key="tag"
                          size="small"
                          class="mr-1 mb-1"
                          variant="tonal"
                      >
                          {{ tag }}
                      </v-chip>
                      </div>
                  </v-card-subtitle>
                </v-card-item>
              </v-card>
            </NuxtLink>
          </v-col>
        </v-row>
      </template>
    </template>
    <v-row v-else>
      <v-col v-for="i in 8" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-card height="100%">
          <v-skeleton-loader
            type="image, article"
            height="300"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useMemeStore } from '../store/memes';
import type { Meme } from '../types';

const runtimeConfig = useRuntimeConfig();
const HOST = runtimeConfig.public.host;

const router = useRouter();

const fuzzyMatch = (text: string, search: string): boolean => {
  text = text.toLowerCase();
  search = search.toLowerCase();
  let searchIndex = 0;
  
  for (let i = 0; i < text.length && searchIndex < search.length; i++) {
    if (text[i] === search[searchIndex]) {
      searchIndex++;
    }
  }
  
  return searchIndex === search.length;
};

const { memes, categories } = useMemeStore();
const searchQuery = ref<string | null>(null);
const selectedCategory = ref<string | null>(null);
const tooltipText = ref('Copy link');
const filteredMemes = ref<Meme[]>(memes);
const groupedMemes = ref<{ name: string; memes: Meme[] }[]>(
  categories.map(category => ({
    name: category,
    memes: memes.filter(meme => meme.category === category)
  }))
);

watch(searchQuery, () => {
  let filtered = memes;
  
  if (selectedCategory.value) {
    filtered = filtered.filter(meme => meme.category === selectedCategory.value);
  }
  
  if (searchQuery.value) {
    filtered = filtered.filter(meme => 
      searchQuery.value && (
        fuzzyMatch(meme.name, searchQuery.value) ||
        fuzzyMatch(meme.category, searchQuery.value) ||
        meme.tags.find((tag) => searchQuery.value && fuzzyMatch(tag, searchQuery.value))
      )
    );
  }
  
  filteredMemes.value = filtered;
  groupedMemes.value = categories.map(category => ({
    name: category,
    memes: filteredMemes.value.filter(meme => meme.category === category)
  }));
});

const goToMeme = (meme: Meme) => {
  router.push({ params: { name: meme.name, category: meme.category } });
};

const copyMemeLink = (meme: Meme) => {
  const url = `${HOST}${meme.category}/${meme.name}`;
  navigator.clipboard.writeText(url);
  tooltipText.value = 'Copied!';
  setTimeout(() => tooltipText.value = 'Copy link', 2000);
};
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease;
}
.v-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--v-shadow-elevation-4);
}
.position-relative {
  position: relative;
}
.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>