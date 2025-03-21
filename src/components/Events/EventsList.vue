<template>
   <div class="event-list">
        <div class="events">
            <div v-for="event in events" :key="event.id" class="event">
                <h2 class="title">{{ event.title }}</h2>
                <p class="address">{{ event.date }}</p>
                <p class="address">{{ event.lieu }}</p>
            </div>
        </div>
  </div>
</template>
  
<script>
  export default {
    props: {
      events: {
        required: true,
      },
    },
  };
</script>
  
<style scoped>
  .event-list {
    min-width: 500px;
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