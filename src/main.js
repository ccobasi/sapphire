import { createApp } from 'vue'
import router from './router';
import './style.css'
import App from './App.vue';
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);

app.use(router);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.mount('#app');
