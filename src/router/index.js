import { createRouter, createWebHistory } from "vue-router";

import MonitoringView from "../views/Schedules/MonitoringView.vue";
import AvailabilityView from "../views/Schedules/AvailabilityView.vue";
import MonitoringHome from "../views/MonitoringServices/MainView.vue";
import MonitoringNew from "../views/MonitoringServices/NewView.vue";
import EngineersHome from "../views/Enginners/MainView.vue";

const routes = [
  {
    path: "/",
    name: "monitoring",
    component: AvailabilityView,
  },
  {
    path: "/availiability",
    name: "availiability",
    component: MonitoringView,
  },
  {
    path: "/monitoring_services",
    name: "monitoring_services",
    component: MonitoringHome,
  },
  {
    path: "/monitoring_services/new",
    name: "monitoring_services_new",
    component: MonitoringNew,
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
