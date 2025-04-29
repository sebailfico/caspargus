import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./core/router";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
