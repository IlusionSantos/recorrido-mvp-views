<script>
import axios from "axios";

export default {
  name: "CustomTable",
  props: {
    users: Array,
    hours: Array,
    day: String,
    week: Number,
    monitoring_services_id: Number,
  },
  methods: {
    getAvailable(user, hour) {
      let availability_schedule = {
        week: this.week,
        monitoring_services_id: this.monitoring_services_id,
        hour: `${hour}:00`,
        day: this.day,
        users_id: user,
      };
      axios
        .get("http://127.0.0.1:3000/availability_schedules", {
          availability_schedule: availability_schedule,
        })
        .then((response) => {
          console.log(response);
        });
    },
    setTime(user, hour, value) {
      let availability_schedule = {
        week: this.week,
        monitoring_services_id: this.monitoring_services_id,
        hour: `${hour.hour}:00`,
        day: this.day,
        users_id: user,
      };
      axios
        .post("http://127.0.0.1:3000/availability_schedules", {
          availability_schedule: availability_schedule,
          value: value,
        })
        .then((response) => {
          hour.line_class = response.data.line_class;
        });
    },
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <th></th>
      <th v-for="(user, index) in users" :key="'user_' + index">
        <p class="has-text-black is-size-6">{{ user.first_name }}</p>
      </th>
    </thead>
    <tbody>
      <tr
        v-for="(hour, index) in hours"
        :key="'hour_' + index"
        :class="hour.line_class"
      >
        <th>
          <p class="has-text-black is-size-6 m-auto">{{ hour.hour_range }}</p>
        </th>
        <th
          v-for="(user, user_index) in hour.users"
          :key="'user_' + index + '_' + user_index"
        >
          <input
            type="checkbox"
            :checked="user.value"
            v-model="user.value"
            @change="setTime(user.id, hour, user.value)"
          />
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

    input[type="checkbox"] {
      vertical-align: middle;
    }
  }
}
</style>
