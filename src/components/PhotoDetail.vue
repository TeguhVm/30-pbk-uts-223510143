<template>
    <div class="photo-detail">
      <h2>Photo Detail</h2>
      <img v-if="selectedPhoto" :src="selectedPhoto.url" :alt="selectedPhoto.title">
      <p><strong>Album ID:</strong> {{ albumId }}</p>
      <p><strong>Photo ID:</strong> {{ photoId }}</p>
      <button @click="goBack">Back to Album</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const router = useRouter();
  
  const albumId = ref('');
  const photoId = ref('');
  const selectedPhoto = ref(null);
  
  // Parse albumId and photoId from route params
  albumId.value = route.params.albumId;
  photoId.value = route.params.photoId;
  
  // Fetch photo details
  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId.value}`);
      selectedPhoto.value = response.data;
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };
  
  onMounted(fetchPhotos);
  
  function goBack() {
    router.push('/album');
  }
  </script>
  
  <style scoped>
  .photo-detail {
    margin-top: 20px;
    text-align: center;
    position: fixed;
    left: 30%;
  }
  
  .photo-detail h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .photo-detail img {
    max-width: 50%;
    margin-bottom: 10px;
  }
  
  .photo-detail p {
    font-size: 18px;
  }
  
  .photo-detail button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  </style>
  