<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'; // Import  API functions

interface Event {
  id: number,
  title: string;
  lieu: string;
  date: string;
}
const events = ref<Event[]>([]);

  const fetchEvents = async (page = 1) => {
    try {
      const cachedData = sessionStorage.getItem('events');
      if (cachedData) {
        events.value = JSON.parse(cachedData);
        return;
      }

      const response = await fetch('http://localhost:3000/events/pagination/' + page, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      });

      const data = await response.json();
      events.value = data;

      sessionStorage.setItem('events', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  provide("events", events);

  const addEvent = (newEvent: Event) => {
    events.value.unshift(newEvent);
    sessionStorage.setItem('events', JSON.stringify(events.value)); 
  };

  onMounted(() => {
    fetchEvents();
  });
</script>

<template>
  <router-view @add-event="addEvent"></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
