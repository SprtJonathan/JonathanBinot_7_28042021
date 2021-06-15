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
        <p class="current--username--text  text-center">{{ user.username }}</p>
      </div>
      <div class="current--fname">
        <h5>Prénom :</h5>
        <p class="current--fname--text  text-center">{{ user.fname }}</p>
      </div>
      <div class="current--lname">
        <h5>Nom de famille :</h5>
        <p class="current--lname--text  text-center">{{ user.lname }}</p>
      </div>
      <article class="account-info card">
        <p class="text-center">Compte créé le : {{ user.createdOn | formatDate }}</p>
        <p class="text-center" v-show="wasAccountUpdated">
          Dernière modification le : {{ user.lastUpdated | formatDate }}
        </p>
      </article>
    </article>
  </div>
</template>

<script>
import axios from "axios";

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
      .get(this.$store.state.apiUrl + "auth/users/visitor/" + this.routeUserId)
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
