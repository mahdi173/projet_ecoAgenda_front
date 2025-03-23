import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/Events/EventsList.vue'),
    },
    {
      path: '/add',
      component: () => import('../components/Events/EventForm.vue'),
    },
  ],
})

export default router