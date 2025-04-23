<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <NuxtLink class="d-flex flex-row align-center" style="justify-self: start; gap: 1rem; color: var(--v-primary-base); text-decoration: none;" to="/">
          <v-img
            src="/android-chrome-192x192.png"
            alt="Logo"
            width="40"
            height="40"
          />
          Memes
        </NuxtLink>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn :icon="themeStore.isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'" @click="toggleTheme"></v-btn>
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
