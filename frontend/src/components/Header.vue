<template>
  <header>
    <nav id="nav" class="navbar navbar-dark justify-content-around">
      <router-link to="/">
        <img
          alt="Groupomania logo"
          src="../assets/images/icon-left-font-monochrome-white.svg"
          class="logo"
      /></router-link>
      <router-link v-if="isUserConnected" to="/">Accueil</router-link>
      <router-link v-if="!isUserConnected" to="/"
        >Connexion | Inscription</router-link
      >

      <div class="theme-switch-wrapper">
        <button class="already-button--button" @click="toggleTheme" aria-label="Toggle themes">
          <span class="dark-mode-button" v-if="this.theme == 'darkMode'"
            ><b-icon icon="sun"></b-icon
          ></span>
          <span class="dark-mode-button" v-else
            ><b-icon icon="moon"></b-icon
          ></span>
        </button>
      </div>

      <b-dropdown size="sm" v-if="isUserConnected" class="user-dropdown">
        <template #button-content class="user-dropdown--content">
          Bienvenue {{ user.username }}
          <img
            class="profile-picture-menu--image shadow-sm"
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
    </nav>
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
      theme: "",
    };
  },
  async created() {
    await axios
      .get(apiUrl + "auth/users/" + this.$store.state.user.user.userId, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data;
      })
      .catch((err) => console.log(err));
  },
  computed: {
    isUserConnected() {
      return this.$store.getters["user/isUserConnected"];
    },
  },
  mounted() {
    let localTheme = localStorage.getItem("theme"); //gets stored theme value if any
    document.documentElement.setAttribute("data-theme", localTheme); // updates the data-theme attribute
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme == "darkMode" ? "" : "darkMode"; //toggles theme value
      document.documentElement.setAttribute("data-theme", this.theme); // sets the data-theme attribute
      localStorage.setItem("theme", this.theme); // stores theme value on local storage
    },
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/modules/main";
</style>
