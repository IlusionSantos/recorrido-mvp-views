<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "MonitoringMainView",
  components: {},
  data() {
    return { services: {} };
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
    editService() {},
  },
  watch: {},
};
</script>
<template>
  <div class="container availability">
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <a class="button is-primary" href="/monitoring_services/new"
          >Nuevo Servicio</a
        >
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <table class="table">
          <thead>
            <th>Nombre Compañia</th>
            <th>Total de Horas</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="(service, index) in services" :key="'service' + index">
              <th>{{ service.company_name }}</th>
              <th>{{ service.total_hours }}</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
