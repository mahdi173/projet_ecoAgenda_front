<template>
  <div class="event-list">
    <div>
      <button @click="goToForm">Ajouter un nouveau evenment</button>
    </div>
    <div v-if="events && events.length > 0" class="events">
      <div v-for="event in events" :key="event.id" class="event">
        <h2 class="title">{{ event.title }}</h2>
        <p class="address">{{ event.date }}</p>
        <p class="address">{{ event.lieu }}</p>
      </div>
    </div>
    <div v-else>
      <p>No events available.</p>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { inject } from "vue";
  import { useRouter } from "vue-router";

  const events = inject<Array<{ id: number, title: string; lieu: string; date: string }>>("events");
  const router = useRouter();

  const goToForm = () => {
    router.push("/add");
  };
</script>
  
<style scoped>
  button {
    padding: 10px 20px;
    margin-bottom: 40px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369f6e;
  }

  .event-list {
    min-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .events {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .event {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .address {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
  }
</style>