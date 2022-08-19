<script>
export default {
  name: "ListTable",
  props: {
    hours: Array,
    day: String,
  },
  methods: {
    userColor(color) {
      return `background-color: ${color};`;
    },
  },
};
</script>

<template>
  <table class="table">
    <tbody>
      <tr v-for="(hour, index) in hours" :key="'hour_' + index">
        <th :class="hour.line_class">
          <p class="has-text-black is-size-6 m-auto">{{ hour.hour_range }}</p>
        </th>
        <th :style="userColor(hour.user_color)">
          <p v-if="hour.user_name" class="has-text-black is-size-6 m-auto">
            {{ hour.user_name }}
          </p>
          <img v-else src="../assets//alert.png" width="28" height="28" />
        </th>
      </tr>
    </tbody>
  </table>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
tr {
  th {
    vertical-align: middle;
    text-align: center;
  }
}
</style>
