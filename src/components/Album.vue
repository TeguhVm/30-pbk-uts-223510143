<!-- src/components/Album.vue -->
<template>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div class="container mt-3">
        <h2 class="text-left mb-4">ALBUM</h2>
        <div class="gallery">
          <div v-for="photo in photos" :key="photo.id" class="gallery-item">
            <img :src="photo.thumbnailUrl" :alt="photo.title" @click="showPhoto(photo)">
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import router from '../router';
  
  const photos = ref([]);
  
  async function fetchPhotos() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    photos.value = response.data.slice(0, 24);
  }
  
  function showPhoto(photo) {
    router.push(`/albums/${photo.albumId}/photos/${photo.id}`);
  }
  
  onMounted(fetchPhotos);
  
  function beforeEnter(el) {
    el.style.opacity = 0;
    el.style.transform = 'translateX(100%)';
  }
  
  function enter(el, done) {
    anime({
      targets: el,
      opacity: [0, 1],
      translateX: ['100%', '0%'],
      duration: 500,
      easing: 'easeInOutQuad',
      complete: done,
    });
  }
  
  function leave(el, done) {
    anime({
      targets: el,
      opacity: [1, 0],
      translateX: ['0%', '-100%'],
      duration: 500,
      easing: 'easeInOutQuad',
      complete: done,
    });
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  
  .container {
    height: 100%;
    position: fixed;
    display: inline-block;
    left: 28%;
    top: 15%;
    width: 50%;
  }
  
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .gallery-item img {
    max-width: 100px;
    cursor: pointer;
  }
  
  .mb-4 {
    color: aquamarine;
    font-weight: bold;
    font-family: "Pacifico", cursive;
    text-shadow: 0 0 1px black,
                 0 0 10px lightgreen,
                 0 0 20px limegreen,
                 0 0 40px lightgreen,
                 0 0 80px lightgreen;
  }
  </style>
  