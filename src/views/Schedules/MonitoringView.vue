<script>
// @ is an alias to /src
const dayjs = require("dayjs");
var weekOfYear = require("dayjs/plugin/weekOfYear");
var weekYear = require("dayjs/plugin/weekYear");
import axios from "axios";

export default {
  name: "MonitoringView",
  components: {},
  data() {
    return {
      week: 0,
      weeks: [],
      services: [],
      selected_service: {},
      is_active: false,
    };
  },
  mounted() {
    this.loadServices();
    this.addMoreWeeks();
  },
  methods: {
    loadServices() {
      axios
        .get("http://127.0.0.1:3000/monitoring_services")
        .then((response) => {
          console.log(response.data);
          this.services = response.data;
        });
    },
    addMoreWeeks() {
      let today = dayjs().format();
      console.log(today);
      dayjs.extend(weekOfYear);
      dayjs.extend(weekYear);
      console.log(dayjs().day());
      console.log(dayjs().weekYear());
      console.log(dayjs(today).week());
    },
    setService(object) {
      console.log(object);
      this.selected_service = object;
    },
    activeChange() {
      this.is_active = !this.is_active;
    },
    getDayFromWeekNum(week, year, day) {
      var day_date = new Date(year, 0, day + (week - 1) * 7);
      while (day_date.getDay() !== 0) {
        day_date.setDate(day_date.getDate() - 1);
      }
      return day_date;
    },
  },
  computed: {
    activeDropdown() {
      return this.is_active ? "is-active" : "";
    },
  },
  watch: {
    week() {
      this.$emit("set-week", this.week);
    },
  },
};
</script>
<template>
  <div class="container availability">
    <div class="title is-ancestor">
      <div class="tile is-parent is-vertical">
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
        </div>
      </div>
      <div class="tile is-parent is-justify-content-space-between">
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Lunes</p>
        </div>
        <div class="tile is-child is-3 notification is-info">
          <p class="title">Martes</p>
        </div>
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Miercoles</p>
        </div>
      </div>
      <div class="tile is-parent is-justify-content-space-between">
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Jueves</p>
        </div>
        <div class="tile is-child is-3 notification is-info">
          <p class="title">Viernes</p>
        </div>
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Sabado</p>
        </div>
      </div>
      <div class="tile is-parent is-justify-content-space-between">
        <div class="tile is-child is-3 notification is-primary">
          <p class="title">Domingo</p>
        </div>
      </div>
    </div>
  </div>
</template>
