<template>
  <v-container v-if="meme">
    <v-row>
      <v-col cols="12" md="6">
        <div class="position-relative rounded-img">
          <v-img :src="meme.image" :aspect-ratio="1" cover></v-img>
          <v-btn
            icon
            size="small"
            variant="tonal"
            class="copy-btn"
            @click="copyCurrentLink"
          >
            <v-icon size="small">mdi-content-copy</v-icon>
            <v-tooltip activator="parent" location="left">
              {{ tooltipText }}
            </v-tooltip>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="flat">
          <v-card-item>
            <v-card-title class="text-h4">{{ meme.name }}</v-card-title>
            <v-card-subtitle class="text-subtitle-1">{{ meme.category }}</v-card-subtitle>
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
            <v-text-field
              class="mt-4"
              readonly
              variant="outlined"
              density="compact"
              :model-value="currentUrl"
            ></v-text-field>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" sm="6">
        <v-skeleton-loader
          type="image"
          height="400"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="6">
        <v-skeleton-loader
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { useMemeStore } from '../store';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MemeDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup() {
    const route = useRoute();
    const memeStore = useMemeStore();
    const tooltipText = ref('Copy link');

    onMounted(async () => {
      await memeStore.loadData();
    });

    const meme = computed(() => {
      const m = memeStore.getMemeBySlug(route.params.slug as string);
      if (m) {
        return {
          ...m,
          image: `${window.location.origin}${m.image}`
        };
      }
      return null;
    });

    const currentUrl = computed(() => window.location.href);

    useHead(() => ({
      meta: meme.value ? [
        { property: 'og:title', content: meme.value.name },
        { property: 'og:image', content: meme.value.image },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: meme.value.name },
        { name: 'twitter:image', content: meme.value.image }
      ] : []
    }));

    const copyCurrentLink = () => {
      navigator.clipboard.writeText(window.location.href);
      tooltipText.value = 'Link copied!';
      setTimeout(() => tooltipText.value = 'Copy link', 2000);
    };

    return {
      meme,
      copyCurrentLink,
      tooltipText,
      currentUrl
    };
  }
});
</script>

<style scoped>
.position-relative {
  position: relative;
}
.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--v-primary-base);
}
.rounded-img {
  border-radius: 12px;
  overflow: hidden;
}
</style>