<template>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div class="container mt-3">
        <h2 class="text-left mb-4">POST</h2>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Select a User</h5>
            <select v-model="selectedUser" class="form-select" @change="fetchUserData">
              <option value="" selected>Pilih user</option>
              <option v-for="user in users" :key="user.id" :value="user.username">{{ user.username }}</option>
            </select>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import anime from 'animejs/lib/anime.es.js';
  
  const users = ref([]);
  const selectedUser = ref('');
  
  async function fetchUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    users.value = response.data.slice(0, 10);
  }
  
  async function fetchUserData() {
    if (selectedUser.value) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const selectedUserData = response.data.find(user => user.username === selectedUser.value);
      if (selectedUserData) {
        Swal.fire({
          title: selectedUserData.name,
          html: `
            <p><strong>Email:</strong> ${selectedUserData.email}</p>
            <p><strong>Phone:</strong> ${selectedUserData.phone}</p>
            <p><strong>Website:</strong> ${selectedUserData.website}</p>
          `,
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    }
  }
  
  onMounted(fetchUsers);
  
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
    left: 25%;
    top: 20%;
    width: 50%;
  }
  
  .card {
    background-color: transparent;
    backdrop-filter: blur(8px);
    border-color: lightcyan;
    filter: drop-shadow(0 0 30px rgb(127, 206, 255));
    box-shadow: 0 0 30px lightcyan;
  }
  
  .card-title {
    color: rgb(63, 113, 230);
    text-shadow: 0 0 10px lightskyblue,
                 0 0 20px lightskyblue,
                 0 0 40px lightskyblue,
                 0 0 80px lightskyblue;
  }
  
  .form-select {
    background-color: transparent;
    backdrop-filter: blur(5px);
    color: black;
  }
  .mb-4 {
  color: aqua;
  text-shadow:   0 0 1PX black,
                 0 0 10px lightskyblue,
                 0 0 20px lightskyblue,
                 0 0 40px lightskyblue,
                 0 0 80px lightskyblue;
  text-align: left;
  font-weight: bold;
  font-family: "Pacifico", cursive;
}
  </style>
  