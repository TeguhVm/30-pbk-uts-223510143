import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'quasar/src/css/index.sass';

const app = createApp(App);
app.use(Quasar, { plugins: {} });
app.use(router);
app.use(createPinia());
app.mount('#app');