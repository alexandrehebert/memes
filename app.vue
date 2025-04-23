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
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';
import { useThemeStore } from './store/theme';

const themeStore = useThemeStore();
const theme = useTheme();

const toggleTheme = () => {
  themeStore.toggleTheme();
};

watch(
  () => themeStore.isDark,
  (isDark) => {
    theme.global.name.value = isDark ? 'customDarkTheme' : 'customLightTheme';
  },
  { immediate: true }
);

onMounted(() => {
  themeStore.initTheme();
});
</script>
