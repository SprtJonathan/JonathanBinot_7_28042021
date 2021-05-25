<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {

  components: { Header },

  computed: {
    isUserConnected() {
      return this.$store.getters["user/isUserConnected"];
    },
  },
};
</script>

<style lang="scss">
@import "@/modules/_variables";
body {
  background-image: url("./assets/images/background/1.jpg");
  backdrop-filter: blur(5px);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $secondary-color;

    &.router-link-exact-active {
      color: $secondary-color;
    }
  }
}
</style>
