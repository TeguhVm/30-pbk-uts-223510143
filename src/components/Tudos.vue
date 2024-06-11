<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div class="container mt-3">
      <h2 class="text-left mb-4">{{ title }}</h2>
      <button v-if="!showOnlyUnfinished" class="btn btn-info" @click="toggleFilter" style="margin-bottom: 5px;">Tampilkan Belum Selesai</button>
      <button v-else class="btn btn-warning" @click="toggleFilter">Remove Filter</button>
      <table class="table">
        <thead>
          <tr>
            <th>Kegiatan</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredActivities" :key="item.id">
            <td :class="{ 'text-decoration-line-through': item.status === 'Selesai' }">{{ item.name }}</td>
            <td>{{ item.status }}</td>
            <td>
              <button v-if="item.status === 'Belum Selesai'" class="btn btn-success" @click="markAsDone(item)">Selesai</button>
              <button v-else class="btn btn-danger" @click="cancel(item)" style="background-color: orange;margin-right: 8px;">Batal</button>
              <button class="btn btn-danger" @click="removeActivity(item)" style="margin-left: 8px;">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mb-3">
        <input v-model="newActivity" class="form-control" placeholder="Add new activity">
        <button class="btn btn-primary mt-2" @click="addActivity">Add Activity</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import anime from 'animejs/lib/anime.es.js';
import { useMainStore } from '../store'; 

const store = useMainStore();
const title = ref('TUDOS');

const activities = ref([
  { id: 1, name: 'Main Mobile legend', status: 'Belum Selesai' },
  { id: 2, name: 'Kuliah satu minggu', status: 'Selesai' },
  { id: 3, name: 'Kepanam', status: 'Belum Selesai' },
  { id: 4, name: 'Antar teman', status: 'Selesai' }
]);
const newActivity = ref('');
const showOnlyUnfinished = ref(false);

const filteredActivities = computed(() => {
  return showOnlyUnfinished.value ? activities.value.filter(a => a.status === 'Belum Selesai') : activities.value;
});

onMounted(() => {
  store.setTitle(title.value);
});

function addActivity() {
  if (newActivity.value.trim()) {
    activities.value.push({ id: Date.now(), name: newActivity.value, status: 'Belum Selesai' });
    newActivity.value = '';
  }
}

function markAsDone(activity) {
  activity.status = 'Selesai';
}

function cancel(activity) {
  activity.status = 'Belum Selesai';
}

function removeActivity(activity) {
  activities.value = activities.value.filter(a => a !== activity);
}

function toggleFilter() {
  showOnlyUnfinished.value = !showOnlyUnfinished.value;
}

function beforeEnter(el) {
  el.style.opacity = 0;
  el.style.transform = 'translateX(100%)';
}

function enter(el, done) {
  anime({
    targets: el,
    opacity: [0, 1],
    translateX: ['0%', '100%'],
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

tr td {
  background-color: transparent;
  backdrop-filter: blur(8px);
  color: rgb(56, 49, 36);
  font-weight: bold;
}

tr th {
  background-color: gray;
  font-weight: bolder;
}

.form-control {
  background-color: transparent;
  backdrop-filter: blur(5px);
}

.mb-4{
  color: lightsalmon;
  text-shadow: 0 0 1px black,
               0 0 10px orange,
               0 0 20px orange,
               0 0 40px orange,
               0 0 80px orange;
  font-weight: bold;
  font-family: "Pacifico", cursive;
}
</style>
