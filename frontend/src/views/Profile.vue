<template>
  <div>
    <button
      type="submit"
      class="btn btn-danger button"
      @click="deleteAccount(user)"
    >
      <h2 class="">
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
        Supprimer le compte {{ user.username }}
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
      </h2>
    </button>
    <button type="submit" class="btn btn-warning button" @click="logout()">
      <h2 class="">
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
        Se déconnecter {{ user.username }}
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
      </h2>
    </button>
    <Login />
  </div>
</template>

<script>
import axios from "axios";
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

import Login from "@/components/Login.vue";

export default {
  data() {
    return {
      user: "",
    };
  },
  components: {
    Login,
  },
  created() {
    axios
      .get(apiUrl + "auth/", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => (this.user = response.data.user))
      .catch((err) => console.log(err));
  },
  methods: {
    deleteAccount(user) {
      console.log("User : " + this.user);
      axios
        .delete(apiUrl + "auth/users/" + user.userId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => {
          console.log(response);
          localStorage.clear();
          this.$store.dispatch("user/logout").then(() => {
            this.$router.push("/Auth");
          });
        })
        .catch((err) => console.log(err));
    },
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/Auth");
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
