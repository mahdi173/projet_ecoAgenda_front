<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Import  API functions
import EventList from './components/Events/EventsList.vue';
import EventForm from './components/Events/EventForm.vue';

// Reactive data
const events = ref([]); // Use `ref` to create a reactive array

// Fetch events function
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events/pagination/1', {
        headers: {
          'Content-Type': 'application/json', // Correct content type
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      console.log(data);
      events.value = data; // Update the reactive data
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addEvent = (newEvent) => {
    events.value.push(newEvent);
  };

  // Fetch events when the component is mounted
  onMounted(() => {
    fetchEvents();
  });
</script>

<template>
  <div id="app">
    <EventForm @add-event="addEvent" />
    <EventList :events="events" />
  </div>
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
