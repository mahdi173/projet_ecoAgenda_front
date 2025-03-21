import { createRouter, createWebHistory } from 'vue-router'
import EventsList from '../components/Events/EventsList.vue';
import EventForm from '../components/Events/EventForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: EventsList,
    },
    {
      path: '/add',
      component: EventForm,
    },
  ],
})

export default router