<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <div  class="d-flex flex-row align-center" style="justify-self: start; gap: 1rem;">
          <v-img
            src="/android-chrome-192x192.png"
            alt="Logo"
            width="40"
            height="40"
          />
          <a style="color: var(--v-primary-base); text-decoration: none;" href="/">Memes</a>
        </div>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-theme-light-dark" @click="themeStore.toggleTheme"></v-btn>
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useThemeStore } from './store/theme';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useTheme } from 'vuetify';

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
const theme = useTheme();

watch(isDark, (newValue) => {
  theme.global.name.value = newValue ? 'customDarkTheme' : 'customLightTheme';
});
</script>

<style scoped>
</style>