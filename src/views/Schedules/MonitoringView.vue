<script>
// @ is an alias to /src
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "AvailabilityView",
  components: { Datepicker },
  data() {
    return { week: null };
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
      <div class="tile is-parent">
        <div class="tile is-child is-4">
          <p class="is-size-4 has-text-left">Selecciona la semana</p>
          <Datepicker v-model="week" weekPicker locale="es"></Datepicker>
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
