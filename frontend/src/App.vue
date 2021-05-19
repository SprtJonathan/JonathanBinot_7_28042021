<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link v-if="isUserConnected" to="/">Accueil</router-link> |
        <router-link v-if="!isUserConnected" to="/Auth"
          >Authentification</router-link
        >
        |
        <router-link v-if="isUserConnected" to="/Profile">Profile</router-link>
      </div>
      <div id="userStatus" v-if="isUserConnected">
        <div>{{ user.username }}</div>
        <button @click="logout">LOGOUT</button>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
//import userStatus from '@/components/userStatus.vue'
export default {
  data() {
    return {
      user: "",
    };
  },

  computed: {
    isUserConnected() {
      return this.$store.getters["user/isUserConnected"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/Auth");
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/modules/_variables";
body {
  background-image: url("./assets/images/background/1.jpg");
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
      color: $primary-color;
    }
  }
}
</style>
