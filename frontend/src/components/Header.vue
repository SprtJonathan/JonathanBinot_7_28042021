<template>
  <header>
    <div id="nav">
      <router-link v-if="isUserConnected" to="/">Accueil</router-link> |
      <router-link v-if="!isUserConnected" to="/Auth"
        >Authentification</router-link
      >
      |
      <router-link :to="`/user/${user.userId}`">Profil</router-link>
    </div>
    <div id="userStatus" v-if="isUserConnected">
      <div>{{ user.username }}</div>
      <button @click="logout">LOGOUT</button>
    </div>
  </header>
</template>

<script>
import axios from "axios";
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  data() {
    return {
      user: "",
    };
  },
  created() {
    let userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData.userId);
    axios
      .get(apiUrl + "auth/users/" + userData.userId, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(response.data.user);
      })
      .catch((err) => console.log(err));
  },
  computed: {
    isUserConnected() {
      return this.$store.getters["user/isUserConnected"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("@/views/Auth");
      });
    },
  },
};
</script>
