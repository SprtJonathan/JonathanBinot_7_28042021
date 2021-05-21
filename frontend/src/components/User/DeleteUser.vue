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
  </div>
</template>

<script>
import axios from "axios";

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
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
  },
};
</script>
