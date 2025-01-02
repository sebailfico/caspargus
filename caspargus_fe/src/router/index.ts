import { createRouter, createWebHistory } from "vue-router";
import LiveView from "../views/LiveView.vue";
import CommanderView from "../views/CommanderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: CommanderView,
    },
    {
      path: "/live",
      name: "live",
      component: LiveView,
    },
  ],
});

export default router;
