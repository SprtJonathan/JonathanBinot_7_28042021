<template>
  <div>
    <article class="profile-card card">
      <h2>Informations utilisateur</h2>
      <div v-show="user.roleId == 1" class="user-role">
        <h5><mark>Administrateur</mark></h5>
      </div>
      <div class="profile-picture--block shadow-sm">
        <img
          class="profile-picture--image"
          :src="user.profilePictureUrl"
          alt="Image de profil"
        />
      </div>
      <div class="current--username">
        <h5>Nom d'utilisateur</h5>
        <p class="current--username--text">{{ user.username }}</p>
      </div>
      <div class="current--fname">
        <h5>Prénom :</h5>
        <p>{{ user.fname }}</p>
      </div>
      <div class="current--lname">
        <h5>Nom de famille :</h5>
        <p>{{ user.lname }}</p>
      </div>
      <article class="account-info card">
        <p>Compte créé le : {{ user.createdOn | formatDate }}</p>
        <p v-show="wasAccountUpdated">
          Dernière modification le : {{ user.lastUpdated | formatDate }}
        </p>
      </article>
    </article>
  </div>
</template>

<script>
import axios from "axios";

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  data() {
    return {
      user: {
        username: null,
        fname: null,
        lname: null,
        createdOn: null,
        lastUpdated: null,
        roleId: null,
      },
      selectedImage: null,
      routeUserId: this.$route.params.userId,
      wasAccountUpdated: false,
    };
  },
  async created() {
    axios
      .get(apiUrl + "auth/users/visitor/" + this.routeUserId)
      .then((response) => {
        this.user = response.data;
        if (this.user.createdOn == this.user.lastUpdated) {
          this.wasAccountUpdated = false;
        } else {
          this.wasAccountUpdated = true;
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(this.routeUserId);
      });
  },
  methods: {},
};
</script>

<style lang="scss">
@import "@/modules/main";
</style>
