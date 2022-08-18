<script>
// @ is an alias to /src
import MainNav from "@/components/MainNav.vue";

export default {
  components: {
    MainNav,
  },
  data() {
    return { week_selected: null };
  },
  methods: {
    setWeek(value) {
      this.week_selected = value;
    },
  },
};
</script>

<template>
  <MainNav />
  <router-view :week_selected="week_selected" @set-week="setWeek" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .container {
    margin-top: 70px;
  }
}
</style>
