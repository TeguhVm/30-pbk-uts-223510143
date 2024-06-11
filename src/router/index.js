// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Tudos from '../components/Tudos.vue';
import Post from '../components/Post.vue';
import Album from '../components/Album.vue';
import PhotoDetail from '../components/PhotoDetail.vue';

const routes = [
  { path: '/', redirect: '/tudos' },
  { path: '/tudos', component: Tudos },
  { path: '/post', component: Post },
  { path: '/album', component: Album },
  { path: '/albums/:albumId/photos/:photoId', component: PhotoDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
