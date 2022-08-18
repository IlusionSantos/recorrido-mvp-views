<script>
// @ is an alias to /src
import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";

export default {
  name: "NewView",
  components: {
    Datepicker,
  },
  data() {
    return {
      selected_service: {
        company_name: "",
        total_hours: 0,
      },
      contracts: [
        { day: "Lunes", start_hour: "00:00", end_hour: "00:00" },
        { day: "Martes", start_hour: "00:00", end_hour: "00:00" },
        { day: "Miercoles", start_hour: "00:00", end_hour: "00:00" },
        { day: "Jueves", start_hour: "00:00", end_hour: "00:00" },
        { day: "Viernes", start_hour: "00:00", end_hour: "00:00" },
        { day: "Sabado", start_hour: "00:00", end_hour: "00:00" },
        { day: "Domingo", start_hour: "00:00", end_hour: "00:00" },
      ],
    };
  },
  mounted() {},
  methods: {
    loadService() {
      axios
        .get("http://127.0.0.1:3000/monitoring_services")
        .then((response) => {
          this.selected_service = response.data;
        });
    },
    createService() {
      axios
        .post("http://127.0.0.1:3000/monitoring_services", {
          monitoring_service: this.selected_service,
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
  watch: {},
};
</script>
<template>
  <div class="container availability">
    <div class="tile is-ancestor notification has-text-info-light is-vertical">
      <div class="tile is-parent">
        <p class="title has-text-black">Crea tu Servicio</p>
      </div>
      <div class="columns">
        <div class="column is-3">
          <p class="has-text-black">Nombre</p>
        </div>
        <div class="column">
          <input
            class="input"
            type="text"
            v-model="selected_service.company_name"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column is-3">
          <p class="has-text-black">Total de Horas</p>
        </div>
        <div class="column">
          <input
            class="input"
            type="number"
            v-model="selected_service.total_hours"
          />
        </div>
      </div>
      <div
        class="columns"
        v-for="(contract, index) in contracts"
        :key="'contract_day' + index"
      >
        <div class="column is-3">
          <p class="has-text-black">{{ contract.day }}</p>
        </div>
        <div class="column">
          <p class="has-text-black">Inicia</p>
          <Datepicker
            v-model="contract.start_hour"
            locale="es"
            timePicker
          ></Datepicker>
        </div>
        <div class="column">
          <p class="has-text-black">Termina</p>
          <Datepicker
            v-model="contract.end_hour"
            locale="es"
            timePicker
          ></Datepicker>
        </div>
      </div>
      <button class="button is-success" @click="createService">Guardar</button>
    </div>
  </div>
</template>
