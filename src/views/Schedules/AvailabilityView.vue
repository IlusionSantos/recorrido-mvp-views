<script>
// @ is an alias to /src
const dayjs = require("dayjs");
var weekOfYear = require("dayjs/plugin/weekOfYear");
import CustomTable from "@/components/CustomTable.vue";

import axios from "axios";

export default {
  name: "AvailabilityView",
  components: { CustomTable },
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
          `http://127.0.0.1:3000/monitoring_services/${this.selected_service.id}/?week=${this.selected_week.week}`
        )
        .then((response) => {
          this.loading = false;
          this.selected_service_details = response.data;
        });
    },
    saveSchedule() {
      let monitoring_schedule = {
        week: this.selected_week.week,
        monitoring_services_id: this.selected_service.id,
      };
      axios
        .post("http://127.0.0.1:3000/monitoring_schedules", {
          monitoring_schedule: monitoring_schedule,
        })
        .then((response) => {
          if (response.data) {
            location.href = "/";
          }
        });
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
    hoursList(day) {
      if (
        this.selected_service_details &&
        this.selected_service_details.contrats
      ) {
        return this.selected_service_details.contrats[day].hours;
      }
      return [];
    },
    getDate(day) {
      let start_date = new Date(
        2022,
        0,
        (this.selected_week.week - 1) * 7 + day
      );
      return `${start_date.toLocaleDateString("es-GT")}`;
    },
  },
  computed: {
    getDayFromWeekNum() {
      let start_date = new Date(2022, 0, (this.selected_week.week - 1) * 7 - 4);
      let end_date = new Date(2022, 0, (this.selected_week.week - 1) * 7 + 2);
      return `${start_date.toLocaleDateString(
        "es-GT"
      )} al ${end_date.toLocaleDateString("es-GT")}`;
    },
  },
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
              <button class="button is-primary" @click="saveSchedule">
                Actualizar Horario
              </button>
            </div>
          </div>
        </div>
        <div class="tile is-child is-4">
          <p class="is-size-4 has-text-left">Selecciona la compa??ia</p>
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
                {{ "Semana " + week.week }}
              </option>
            </select>
          </div>

          <p class="is-size-6 has-text-left mt-3">
            {{ "del " + getDayFromWeekNum }}
          </p>
        </div>
      </div>
      <div v-if="selected_service">
        <div class="columns is-multiline">
          <div class="column is-half">
            <div class="has-background-info-light">
              <p class="title">{{ "Lunes " + getDate(-4) }}</p>
              <custom-table
                :hours="hoursList(0)"
                :users="users"
                :week="selected_week.week"
                :monitoring_services_id="selected_service.id"
                day="1"
              />
            </div>
          </div>
          <div class="column is-half">
            <div class="has-background-info-light">
              <p class="title">{{ "Martes " + getDate(-3) }}</p>
              <custom-table
                :hours="hoursList(1)"
                :users="users"
                :week="selected_week.week"
                :monitoring_services_id="selected_service.id"
                day="2"
              />
            </div>
          </div>
          <div class="column is-half">
            <div class="has-background-info-light">
              <p class="title">{{ "Miercoles " + getDate(-2) }}</p>
              <custom-table
                :hours="hoursList(2)"
                :users="users"
                :week="selected_week.week"
                :monitoring_services_id="selected_service.id"
                day="3"
              />
            </div>
          </div>
          <div class="column is-half">
            <div class="notification has-background-info-light">
              <p class="title">{{ "Jueves " + getDate(-1) }}</p>
              <custom-table
                :hours="hoursList(3)"
                :users="users"
                :week="selected_week.week"
                :monitoring_services_id="selected_service.id"
                day="4"
              />
            </div>
          </div>
          <div class="column is-half">
            <div class="notification has-background-info-light">
              <p class="title">{{ "Viernes " + getDate(0) }}</p>
              <custom-table
                :hours="hoursList(4)"
                :users="users"
                :week="selected_week.week"
                :monitoring_services_id="selected_service.id"
                day="5"
              />
            </div>
          </div>
          <div class="column is-half">
            <div class="notification has-background-info-light">
              <p class="title">{{ "Sabado " + getDate(1) }}</p>
              <custom-table
                :hours="hoursList(5)"
                :users="users"
                :week="selected_week.week"
                :monitoring_services_id="selected_service.id"
                day="6"
              />
            </div>
          </div>
          <div class="column is-half">
            <div class="notification has-background-info-light">
              <p class="title">{{ "Domingo " + getDate(2) }}</p>
              <custom-table
                :hours="hoursList(6)"
                :users="users"
                :week="selected_week.week"
                :monitoring_services_id="selected_service.id"
                day="7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.column {
  div {
    padding: 10px;
  }
}
</style>
