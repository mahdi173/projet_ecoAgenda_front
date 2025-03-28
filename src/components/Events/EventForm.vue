<template>
  <div class="event-form">
    <h2>Ajouter un nouvel événement</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Titre :</label>
        <input type="text" id="title" v-model="title" placeholder="Entrez le titre de l'événement" required />
      </div>

      <div class="form-group">
        <label for="lieu">Lieu :</label>
        <input type="text" id="lieu" v-model="lieu" placeholder="Entrez le lieu de l'événement" required />
      </div>

      <div class="form-group">
        <label for="date">Date :</label>
        <input type="date" id="date" v-model="date" required />
        <input type="time" id="time" v-model="time" required />
      </div>

      <button type="submit">Ajouter l'événement</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const lieu = ref('');
const date = ref('');
const time = ref('');

const emit = defineEmits(['add-event']);

const submitForm = async () => {
  if (!title.value || !lieu.value || !date.value) {
    return;
  }

  const newEvent = {
    title: title.value,
    lieu: lieu.value,
    date:  `${date.value}T${time.value}`,
  };

  try {
    const response = await fetch('http://localhost:3000/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add event');
    }

    const data = await response.json();
    emit('add-event', data);

    title.value = '';
    lieu.value = '';
    date.value = '';
    time.value = '';

  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<style scoped>
.event-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #1abc9c;
  outline: none;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #16a085;
  transform: scale(1.05);
}

button:active {
  transform: scale(1);
}
</style>