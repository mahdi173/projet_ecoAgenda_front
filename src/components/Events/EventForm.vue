<template>
    <div class="event-form">
      <h2>Ajouter un nouveau evenment</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required />
        </div>
  
        <div class="form-group">
          <label for="lieu">Location:</label>
          <input type="text" id="lieu" v-model="lieu" required />
        </div>
  
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="date" required />
        </div>
  
        <button type="submit">Add Event</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Form data
  const title = ref('');
  const lieu = ref('');
  const date = ref('');
  
  // Emit event to parent component
  const emit = defineEmits(['add-event']);
  
  // Submit form
  const submitForm =  async  () => {
    const newEvent = {
      title: title.value,
      lieu: lieu.value,
      date: date.value,
    };
  
    try {
        // Send the event data to the API
        const response = await fetch('http://localhost:3000/events/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
        });

        if (!response.ok) {
        throw new Error('Failed to send event data');
        }

        const data = await response.json();
        console.log('Event created:', data);

        // Emit the new event to the parent component
        emit('add-event', data);

        // Reset form
        title.value = '';
        lieu.value = '';
        date.value = '';
    } catch (error) {
        console.error('Error sending event data:', error);
    }
  };
  </script>
  
  <style scoped>
  .event-form {
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369f6e;
  }
  </style>