<template>
  <div class="profile-block container card">
    <div class="content">
      <h1>Bienvenue {{ user.username }} !</h1>
      <hr />
      <a class="button is-light" v-if="user.isAdmin == true">
        <RouterLink to="/users">Tous les utilisateurs</RouterLink>
      </a>
      <hr />
      <a class="button is-light" v-if="user.isAdmin == true">
        <RouterLink to="/publicationsAdmin"
          >Toutes les publications utilisateurs</RouterLink
        >
      </a>
      <hr />

      <div class="user">
        <h3>Informations sur votre compte :</h3>

        <p>Username : {{ user.username }}</p>
        <p>Prénom : {{ user.fname }}</p>
        <p>Nom de famille : {{ user.lname }}</p>
        <p>URL photo : {{ user.profilePictureUrl }}</p>
        <img :src="user.profilePictureUrl" alt="test" />

        <p>Email : {{ user.email }}</p>
        <p>Compte créé le : {{ user.createdOn }}</p>
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
    </div>
  </div>
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
    axios
      .get(apiUrl + "auth/", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(response.data.user);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/Auth");
      });
    },
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
<style scoped lang="scss">
@import "../modules/_variables";

.field {
  display: flex;
  justify-content: center;
}
h3 {
  font-size: 1em;
  color: #d1515a;
}
.user {
  font-size: 1.1em;
  color: #122442;
  font-weight: bold;
}
.btnD {
  background-color: #122442;
  color: #ffff;
  margin-top: 10px;
  width: 120px;
  height: 50px;
  font-size: 1.1em;
}

.profile-block {
  background-color: $block-background-semitransparent;
  padding: 2%;
  border-radius: 25px;
  margin: auto;
  margin-top: 2%;
}
</style>
