<template>
  <v-btn
    :icon="currentIcon"
    variant="text"
    @click="handleThemeChange"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useThemeStore } from '../store/theme';

const themeStore = useThemeStore();

const currentIcon = computed(() => {
  return themeStore.isDark ? 'mdi-weather-night' : 'mdi-weather-sunny';
});

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const handleSystemThemeChange = () => {
  themeStore.syncWithSystem();
};

onMounted(() => {
  mediaQuery.addEventListener('change', handleSystemThemeChange);
});

onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleSystemThemeChange);
});

const handleThemeChange = () => {
  themeStore.toggleTheme();
};
</script>