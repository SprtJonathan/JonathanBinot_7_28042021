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
@import "@/modules/main";
</style>
