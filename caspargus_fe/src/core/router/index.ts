import { createRouter, createWebHistory } from "vue-router";
import LiveView from "../views/LiveView.vue";
import CommanderView from "../views/CommanderView.vue";
import EventsView from "../views/EventsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: EventsView,
    },
    {
      path: "/live",
      name: "live",
      component: LiveView,
    },
    {
      path: "/commander/:id",
      name: "commander",
      component: CommanderView,
      props: true,
    },
  ],
});

export default router;
