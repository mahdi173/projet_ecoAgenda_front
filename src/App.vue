<script setup lang="ts">
import { ref, onMounted, provide, computed } from 'vue';
import moment from 'moment';
import EventFrom from './components/Events/EventForm.vue';

interface Event {
  id: number;
  title: string;
  lieu: string;
  date: string;
}
const events = ref<Event[]>([]);
const currentPage = ref(1);
const itemsPerPage = 5;

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

provide('events', events);

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return events.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(events.value.length / itemsPerPage));

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const addEvent = (newEvent: Event) => {
  events.value.unshift(newEvent);
  sessionStorage.setItem('events', JSON.stringify(events.value));
};

const formatDate = (date: string) => {
  return moment(date).format('DD/MM/YYYY [at] HH[h]');
};

onMounted(() => {
  fetchEvents();
});

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="app">
    <header>
      <div class="container">
        <h1 class="logo">EcoAgenda</h1>
        <button class="menu-toggle" @click="toggleMenu">
          ☰
        </button>
        <nav :class="{ open: isMenuOpen }">
          <a href="/">Accueil</a>
          <a href="#about">À propos</a>
        </nav>
      </div>
    </header>
    <main>
      <section class="banner">
        <h2>Bienvenue sur EcoAgenda</h2>
        <p>Planifiez vos événements pour un avenir durable.</p>
      </section>
      <section id="events" class="events-section">
        <section id="about" class="about">
        <h2>À propos</h2>
        <p>EcoAgenda est une plateforme dédiée à la planification d'événements écoresponsables.</p>
      </section>
      <EventFrom  @add-event="addEvent" />
      <h2>Événements</h2>
      <div class="events-container">
        <div v-if="paginatedEvents.length > 0" class="events">
          <div v-for="event in paginatedEvents" :key="event.id" class="event">
            <h3 class="title">{{ event.title }}</h3>
            <p class="address">{{ event.lieu }}</p>
            <p class="date">{{formatDate(event.date)}}</p>
          </div>
        </div>
        <div v-else>
          <p>Aucun événement disponible.</p>
        </div>
        <div class="pagination">
          <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Précédent</button>
          <span>Page {{ currentPage }} sur {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Suivant</button>
        </div>
      </div>
      </section>

    </main>
    <footer>
      <div class="container">
        <p>&copy; 2023 EcoAgenda. Tous droits réservés.</p>
        <p>Conçu avec soin pour un avenir durable.</p>
        <p>Réalisé par Hugo Gaudre et Mehdi.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: slideDown 0.5s ease-in-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 2rem; /* Ajout d'un espace entre le titre et la navigation */
}

header nav {
  display: flex;
  gap: 1rem; /* Espace entre les liens de navigation */
}

header .logo {
  font-size: 1.8rem;
  font-weight: bold;
}

header .menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

header nav {
  display: flex;
  gap: 1rem;
}

header nav a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

header nav a:hover {
  color: #1abc9c;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  header .menu-toggle {
    display: block;
  }

  header nav {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #2c3e50;
    width: 100%;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  header nav.open {
    display: flex;
  }

  header nav a {
    padding: 0.5rem 0;
    text-align: center;
  }
}

.banner {
  background: linear-gradient(to right, #1abc9c, #16a085);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  border-radius: 10px;
  animation: zoomIn 1s ease-in-out;
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.banner h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.banner p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.banner .cta-button {
  background-color: #ffffff;
  color: #1abc9c;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.banner .cta-button:hover {
  background-color: #16a085;
  color: white;
  transform: scale(1.1);
}

.about {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp 1s ease-in-out;
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.about h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
  animation: fadeIn 1s ease-in-out;
}

footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

footer p {
  margin: 0.5rem 0;
}

.events-section {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.events-container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.events {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.event .title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.event .address,
.event .date {
  font-size: 1rem;
  color: #555;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #16a085;
}

.pagination span {
  font-size: 1rem;
  color: #333;
}
</style>
