<script>
// @ is an alias to /src
const dayjs = require("dayjs");
var weekOfYear = require("dayjs/plugin/weekOfYear");
import CustomTable from "@/components/CustomTable.vue";

import axios from "axios";

export default {
  name: "MonitoringView",
  components: { CustomTable },
  data() {
    return {
      selected_week: { week: 0 },
      weeks: [],
      services: [],
      selected_service: {},
      selected_service_details: {},
      users: [],
    };
  },
  mounted() {
    this.loadServices();
    this.loadUsers();
  },
  methods: {
    loadServices() {
      axios
        .get("http://127.0.0.1:3000/monitoring_services")
        .then((response) => {
          this.services = response.data.monitoring_services;
          this.selected_service = this.services[0];
          this.weeks = response.data.weeks;
          this.setWeek();
        });
    },
    loadServiceDetail() {
      axios
        .get(
          `http://127.0.0.1:3000/monitoring_services/${this.selected_service.id}`
        )
        .then((response) => {
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
            this.$router.push({ name: "monitoring" });
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
      this.loadServiceDetail();
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
      <div v-if="selected_service">
        <div class="columns is-multiline">
          <div class="column is-half">
            <div class="has-background-info-light">
              <p class="title">Lunes</p>
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
              <p class="title">Martes</p>
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
              <p class="title">Miercoles</p>
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
              <p class="title">Jueves</p>
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
              <p class="title">Viernes</p>
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
              <p class="title">Sabado</p>
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
              <p class="title">Domingo</p>
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
