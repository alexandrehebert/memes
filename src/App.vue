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
          ></v-img>
          <router-link to="/" style="color: var(--v-primary-base); text-decoration: none;">Memes</router-link>
        </div>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-theme-light-dark" @click="themeStore.toggleTheme"></v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useThemeStore } from './store';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useTheme } from 'vuetify';

export default defineComponent({
  name: 'App',
  setup() {
    const themeStore = useThemeStore();
    const { isDark } = storeToRefs(themeStore);
    const theme = useTheme();

    watch(isDark, (newValue) => {
      theme.global.name.value = newValue ? 'customDarkTheme' : 'customLightTheme';
    });

    return {
      themeStore
    };
  }
});
</script>

<style scoped>
</style>