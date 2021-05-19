<template>
  <div>
    <button
      type="submit"
      class="btn btn-danger button"
      @click="deleteAccount(user.userId)"
    >
      <h2 class="">
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
        Supprimer le compte {{ user.username }}
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
      </h2>
    </button>
    <button type="submit" class="btn btn-warning button" @click="disconnect()">
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

import { mapState } from "vuex";

import Login from "@/components/Login.vue";

export default {
  name: "user",
  mounted: function() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "user",
      userInfos: "userInfos",
      token: "token",
    }),
  },
  data() {
    return {
      user: {
        userId: "",
        username: "",
        fname: "",
        lname: "",
        email: "",
        roleId: "",
      },
    };
  },
  components: {
    Login,
  },
  methods: {
    deleteAccount(userId) {
      axios
        .delete(apiUrl + "auth/" + userId)
        .then((result) => {
          console.log(result);
          alert("Utilisateur supprimé");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    disconnect() {
      this.$store.commit("LOG_OUT");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss"></style>
