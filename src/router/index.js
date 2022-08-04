import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
// no furthur routing is requierd for this project
const routes = [
  {
    path: '/',
    name: 'home',
    component: App,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
