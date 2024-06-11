<template>
  <router-view v-slot="{ Component }">
  <div class="background">
    <img src="https://wallpaperwaifu.com/wp-content/uploads/2023/12/retro-tropical-synthwave-thumb.jpg"/>
  </div>
  <q-layout view="hHh lpR fFf">
    <q-header style="background-color: transparent; z-index: 1; backdrop-filter: blur(5px); padding-top: 10px; padding-bottom: 10px;">
      <q-toolbar>
        <div class="nav-buttons">
          <q-btn 
            class="q-ma-sm" 
            label="TUDOS" 
            @click="navigateTo('/tudos')" 
            :class="{ active: $route.path === '/tudos' }"
            style="background-color: lightskyblue;"
          />
          <q-btn 
            class="q-ma-sm" 
            label="POST" 
            @click="navigateTo('/post')" 
            :class="{ active: $route.path === '/post' }"
            style="background-color: lightseagreen;"
          />
          <q-btn 
            class="q-ma-sm" 
            label="ALBUM" 
            @click="navigateTo('/album')" 
            :class="{ active: $route.path === '/album' }"
            style="background-color: lightcoral;"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
      <component :is="Component" />
        
      </transition>
    
    </q-page-container>
  </q-layout>
</router-view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import anime from 'animejs/lib/anime.es.js';

const router = useRouter();


function navigateTo(route) {
  router.push(route);
}

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

<style>
body {
  background-color: #1e1e1e;
  color: white;
}

.nav-buttons {
  display: inline-flex;
  justify-content: center;
  margin-bottom: 20px;
}

.text {
  margin-top: 20px;
  margin-left: 715px;
  font-weight: bold;
  color: white;
}

.background img {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  object-fit: cover;
  -webkit-background-size: cover; 
  -moz-background-size: cover; 
  -o-background-size: cover; 
  background-size: cover;
  filter: brightness(0.8);
}

.active {
  background-color: #007bff; 
  color: white;
}
</style>
