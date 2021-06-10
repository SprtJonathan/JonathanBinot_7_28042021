<template>
  <div class="modal--delete">
    <b-button v-b-modal.delete-account-modal class="btn btn-danger button"
      >Supprimer le compte</b-button
    >

    <b-modal
      class="modal position-fixed"
      hide-footer
      id="delete-account-modal"
      title="Supression du compte"
    >
      <p id="confirmation-text">
        En cliquant sur "supprimer", le compte et toutes les informations
        relatives au compte seront supprimées. Souhaitez-vous vraiment
        continuer?
      </p>
      <button
        type="submit"
        class="btn btn-danger button"
        @click="deleteAccount()"
      >
        <h2 class="">
          <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
          Supprimer le compte {{ userPage.username }}
          <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
        </h2>
      </button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  data() {
    return {
      routeUserId: this.$route.params.userId,
      userIsAdmin: false,
      userIsOwner: false,
    };
  },
  props: ["user", "userPage"],
  methods: {
    deleteAccount() {
      console.log("User : " + this.routeUserId);
      axios
        .delete(apiUrl + "auth/users/" + this.routeUserId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => {
          console.log(response);
          if (this.userIsAdmin && !this.userIsOwner) {
            // Si l'utilisateur est admin mais pas propriétaire de la page, alors on le redirige vers la homepage du site après la suppression
            this.$router.push("/");
          } else if (
            (this.userIsOwner && this.userIsAdmin) ||
            (this.userIsOwner && !this.userIsAdmin)
          ) {
            // Si l'utilisateur est admin et propriétaire de la page ou pas admin mais propriétaire de la page, alors on le redirige vers la page de connexion après avoir supprimé le localStorage et les informations de connexion
            localStorage.clear();
            this.$store.dispatch("user/logout");
            this.$router.push("/");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
