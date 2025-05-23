<template>
  <v-container v-if="meme">
    <v-row>
      <v-col cols="12" md="6">
        <div class="position-relative rounded-img">
          <v-img :src="'/memes/' + meme.image" :aspect-ratio="1" cover></v-img>
          <v-btn
            icon
            size="small"
            variant="tonal"
            class="copy-btn"
            @click="copyCurrentLink"
          >
            <v-icon size="small">mdi-content-copy</v-icon>
            <client-only>
              <v-tooltip activator="parent" location="left">
                {{ tooltipText }}
              </v-tooltip>
            </client-only>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="flat">
          <v-card-item>
            <v-card-title class="text-h4">{{ meme.description }}</v-card-title>
            <v-card-subtitle class="text-subtitle-1 text-capitalize">{{ meme.category }}</v-card-subtitle>
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
              dirty
              :model-value="currentUrl"
              @click="selectAndCopyUrl"
            ></v-text-field>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" sm="6">
        No meme found
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMemeStore } from '../../store/memes';

const runtimeConfig = useRuntimeConfig();
const HOST = runtimeConfig.public.host;

const memeStore = useMemeStore();

const route = useRoute();
const tooltipText = ref('Copy link');

const meme = memeStore.getMemeByNameAndCategory(
  route.params.name as string,
  route.params.category as string
);

const currentUrl = meme ? `${HOST}/${route.params.category}/${route.params.name}` : '';

if (meme) {
  const img = useImage();
  const src = img('/memes/' + meme.image, {}, { preset: 'seo' });

  useSeoMeta({
    title: meme.description,
    ogTitle: meme.description,
    ogDescription: meme.category + '/' + meme.name,
    ogImage: `${HOST}${src}`,
    ogUrl: currentUrl,
    twitterTitle: meme.description,
    twitterDescription: meme.category + '/' + meme.name,
    twitterCard: 'summary_large_image',
    twitterImage: `${HOST}${src}`,
  });
}

const copyCurrentLink = () => {
  navigator.clipboard.writeText(currentUrl);
  tooltipText.value = 'Link copied!';
  setTimeout(() => tooltipText.value = 'Copy link', 2000);
};

const selectAndCopyUrl = (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.select();
  navigator.clipboard.writeText(currentUrl);
  tooltipText.value = 'Link copied!';
  setTimeout(() => tooltipText.value = 'Copy link', 2000);
};
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