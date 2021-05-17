<template>
  <div>
    <button type="submit" class="btn btn-primary button" @click="Delete">
      Delete User
    </button>
  </div>
</template>

<script>
import axios from "axios";
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

import { mapState } from "vuex";

export default {
  name: "Delete",
  data() {
    return {
      userId: "",
      email: "",
      password: "",
    };
  },
  mounted: function() {
    this.$store.dispatch("getUserProfile", {
      userProfile: this.$route.params.userId,
    });
  },
  computed: {
    ...mapState({
      userInfos: "userInfos",
      userProfile: "userProfile",
    }),
  },
  methods: {
    Delete() {
      let userToDelete = {
        userId: this.userProfile.userId,
        password: this.userProfile.password,
      };
      axios
        .delete(apiUrl + "auth/deleteAccount", userToDelete)
        .then((result) => {
          console.log(result);
          alert("Utilisateur enregistré");
        });
    },
  },
};
</script>

<style scoped lang="scss"></style>
