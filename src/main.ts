import { createApp } from 'vue';
import App from './App.vue';
import './assets/globle.css';
import router from './route';
import * as THREE from 'three';

declare global {
    interface Window {
        THREE: any,
        app: any
    }
}

window.THREE = THREE;

const app = createApp(App);
app.use(router);
app.mount('#app');
