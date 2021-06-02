<template>
  <header>
    <div id="nav" class="navbar navbar-dark justify-content-around">
      <router-link to="/">
        <img
          alt="Groupomania logo"
          src="../assets/images/icon-left-font-monochrome-white.svg"
          class="logo"
      /></router-link>
      <router-link v-if="isUserConnected" to="/">Accueil</router-link>
      |
      <router-link v-if="!isUserConnected" to="/"
        >Connexion | Inscription</router-link
      >

      <b-dropdown size="lg" v-if="isUserConnected" class="user-dropdown">
        <template #button-content class="user-dropdown--content">
          Bienvenue {{ user.username }}
          <img
            class="profile-picture--image shadow-sm"
            :src="user.profilePictureUrl"
            alt="Image de profil"
          />
        </template>
        <b-dropdown-item href="#">
          <router-link :to="`/user/${user.userId}`">Mon Profil </router-link>
        </b-dropdown-item>
        <div class="dropdown-divider"></div>
        <b-dropdown-item href="#"
          ><a @click="logout">Déconnexion </a></b-dropdown-item
        >
      </b-dropdown>
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
    let userData = this.$store.state.user;
    console.log(userData.user.userId);
    axios
      .get(apiUrl + "auth/users/" + userData.user.userId, {
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
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/modules/_variables";
#nav {
  display: flex;
  flex-direction: column;
  background-color: $primary-color;
  color: $secondary-color;
  margin-bottom: 50px;
}

.logo {
  width: 50vw;
}
.user-dropdown {
  width: auto;
}
.profile-picture {
  &--image {
    width: 15%;
    border-radius: 50%;
    margin: auto;
  }
}
@media (min-width: 1024px) {
  #nav {
    flex-direction: row;
  }
  .logo {
    width: 10vw;
  }
  .user-dropdown {
    width: 10vw;
  }
}
</style>
