<script>
// @ is an alias to /src
const dayjs = require("dayjs");
var weekOfYear = require("dayjs/plugin/weekOfYear");
import ListTable from "@/components/ListTable.vue";
import axios from "axios";

export default {
  name: "MonitoringView",
  components: { ListTable },
  data() {
    return {
      selected_week: { week: 0 },
      weeks: [],
      services: [],
      selected_service: {},
      selected_service_details: {},
      users: [],
      loading: false,
    };
  },
  mounted() {
    this.loadServices();
    this.loadUsers();
  },
  methods: {
    setDefaultByLocal() {
      if (localStorage.getItem("service")) {
        this.selected_service = JSON.parse(localStorage.getItem("service"));
        this.selected_week = JSON.parse(localStorage.getItem("week"));
      } else {
        this.selected_service = this.services[0];
        this.setWeek();
      }
    },
    loadServices() {
      axios
        .get("http://127.0.0.1:3000/monitoring_services")
        .then((response) => {
          this.services = response.data.monitoring_services;

          this.weeks = response.data.weeks;
          this.setDefaultByLocal();
        });
    },
    loadServiceDetail() {
      axios
        .get(
          `http://127.0.0.1:3000/monitoring_schedules/${this.selected_service.id}/?week=${this.selected_week.week}`
        )
        .then((response) => {
          this.loading = false;
          this.selected_service_details = response.data;
        });
    },
    editSchedule() {
      localStorage.setItem("service", JSON.stringify(this.selected_service));
      localStorage.setItem("week", JSON.stringify(this.selected_week));
      location.href = "/availiability";
    },
    loadUsers() {
      axios.get("http://127.0.0.1:3000/users").then((response) => {
        this.users = response.data;
      });
    },
    setWeek() {
      let today = dayjs().format();
      dayjs.extend(weekOfYear);
      this.selected_week = { week: dayjs(today).week() };
    },
    getDayFromWeekNum(week, year, day) {
      var day_date = new Date(year, 0, day + (week - 1) * 7);
      while (day_date.getDay() !== 0) {
        day_date.setDate(day_date.getDate() - 1);
      }
      return day_date;
    },
    hoursList(day) {
      if (
        this.selected_service_details &&
        this.selected_service_details.contrats
      ) {
        return this.selected_service_details.contrats[day].hours;
      }
      return [];
    },
  },
  computed: {},
  watch: {
    selected_service() {
      this.loading = true;
      this.loadServiceDetail();
    },
    selected_week() {
      if (!this.loading) {
        this.loadServiceDetail();
      }
    },
  },
};
</script>
<template>
  <div class="container availability">
    <div class="title is-ancestor">
      <div class="tile is-parent is-vertical">
        <div class="tile is-child is-fullwidth">
          <div class="columns is-fullwidth">
            <div class="column has-text-right">
              <button class="button is-primary" @click="editSchedule">
                Editar Disponibilidad
              </button>
            </div>
          </div>
        </div>
        <div class="tile is-child is-4">
          <p class="is-size-4 has-text-left">Selecciona la compañia</p>
          <div class="select is-size-6 is-fullwidth">
            <select v-model="selected_service">
              <option
                v-for="(service, index) in services"
                :key="'service_' + index"
                :value="service"
              >
                {{ service.company_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="tile is-child is-4">
          <p class="is-size-4 has-text-left">Selecciona la semana</p>
          <div class="select is-size-6 is-fullwidth">
            <select v-model="selected_week">
              <option
                v-for="(week, index) in weeks"
                :key="'week_' + index"
                :value="week"
              >
                {{ week.week }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="tile is-parent is-justify-content-space-between">
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Lunes</p>
          <ListTable :hours="hoursList(0)" />
        </div>
        <div class="tile is-child is-3 notification is-info">
          <p class="title">Martes</p>
          <ListTable :hours="hoursList(1)" />
        </div>
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Miercoles</p>
          <ListTable :hours="hoursList(2)" />
        </div>
      </div>
      <div class="tile is-parent is-justify-content-space-between">
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Jueves</p>
          <ListTable :hours="hoursList(3)" />
        </div>
        <div class="tile is-child is-3 notification is-info">
          <p class="title">Viernes</p>
          <ListTable :hours="hoursList(4)" />
        </div>
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Sabado</p>
          <ListTable :hours="hoursList(5)" />
        </div>
      </div>
      <div class="tile is-parent is-justify-content-space-between">
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Domingo</p>
          <ListTable :hours="hoursList(6)" />
        </div>
      </div>
    </div>
  </div>
</template>
