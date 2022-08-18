<script>
// @ is an alias to /src
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";

export default {
  name: "AvailabilityView",
  components: { Datepicker },
  data() {
    return { week: null, services: [], selected_service: {} };
  },
  mounted() {
    this.loadServices();
  },
  methods: {
    loadServices() {
      axios
        .get("http://127.0.0.1:3000/monitoring_services")
        .then((response) => {
          this.services = response.data;
        });
    },
    setService(object) {
      this.selected_service = object;
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
          <div class="dropdown">
            <div
              class="dropdown-item"
              v-for="(service, index) in services"
              :key="'servive_' + index"
            >
              {{ service.name }}
            </div>
          </div>
        </div>
        <div class="tile is-child is-4">
          <p class="is-size-4 has-text-left">Selecciona la semana</p>
          <Datepicker v-model="week" weekPicker locale="es"></Datepicker>
        </div>
      </div>
      <div class="tabs is-centered">
        <ul>
          <li><a>Lunes</a></li>
          <li><a>Martes</a></li>
          <li><a>Miercoles</a></li>
          <li><a>Jueves</a></li>
          <li><a>Viernes</a></li>
          <li><a>Sabado</a></li>
          <li><a>Domingo</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
