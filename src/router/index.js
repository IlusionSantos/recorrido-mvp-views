import { createRouter, createWebHistory } from "vue-router";

import MonitoringView from "../views/Schedules/MonitoringView.vue";
import AvailabilityView from "../views/Schedules/AvailabilityView.vue";
import MonitoringHome from "../views/MonitoringServices/MainView.vue";
import EngineersHome from "../views/Enginners/MainView.vue";

const routes = [
  {
    path: "/",
    name: "monitoring",
    component: MonitoringView,
  },
  {
    path: "/availiability",
    name: "availiability",
    component: AvailabilityView,
  },
  {
    path: "/monitoring_services",
    name: "monitoring_services",
    component: MonitoringHome,
  },
  {
    path: "/engineers",
    name: "engineers",
    component: EngineersHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
