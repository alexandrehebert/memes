import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import Catalog from '../views/Catalog.vue';
import { BASE_URL, IS_GH_PAGES } from '../constants';

const routes: RouteRecordRaw[] = [
  { 
    path: '/',
    name: 'catalog',
    component: Catalog 
  },
  { 
    path: '/meme/:slug',
    name: 'meme-detail',
    component: () => import('../views/MemeDetail.vue')
  }
];

const router = createRouter({
  history: IS_GH_PAGES
  ? createWebHashHistory(BASE_URL)
  : createWebHistory(BASE_URL),
  routes,
});

export default router;
