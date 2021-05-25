<template>
  <div>
    <article class="profile-card card">
      <div class="profile-picture--block shadow-sm">
        <img
          class="profile-picture--image"
          :src="user.profilePictureUrl"
          alt="Image de profil"
        />
      </div>
      <div class="current-username">
        <h5>Nom d'utilisateur</h5>
        <p class="current-username--text">{{ user.username }}</p>
      </div>
      <div class="current-fname">
        <h5>Prénom :</h5>
        <p>{{ user.fname }}</p>
      </div>
      <div class="current-lname">
        <h5>Nom de famille :</h5>
        <p>{{ user.lname }}</p>
      </div>
      <article class="account-info card">
        <p>Compte créé le : {{ user.createdOn }}</p>
        <p v-show="wasAccountUpdated">
          Dernière modification le : {{ user.lastUpdated  }}
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
      user: "",
      selectedImage: null,
      routeUserId: this.$route.params.userId,
      wasAccountUpdated: false,
    };
  },
  created() {
    axios
      .get(apiUrl + "auth/users/visitor/" + this.routeUserId, {})
      .then((response) => {
        this.user = response.data.user;
        console.log(this.routeUserId);
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

<style lang="scss" scoped>
@import "../../modules/_variables";
.profile-card {
  display: flex;
  margin: auto;
  width: 70%;
  border-radius: 25px;
  padding: 2rem;
}
.profile-picture {
  &--block {
    position: relative;
    width: 30%;
    margin: 1.5rem auto;
    border-radius: 50%;
  }
  &--image {
    width: 100%;
    border-radius: 50%;
  }

  &--upload {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 15;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    padding: 2rem;
    color: $secondary-color;
    backdrop-filter: blur(2px);
    transition: 500ms ease;
    &:hover {
      cursor: pointer;
      opacity: 1;
      transition: 500ms ease;
    }
  }
}
</style>
