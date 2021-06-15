<template>
  <div class="modal--delete">
    <div class="profile-card card">
      <h2>Gestion du compte</h2>
      <b-button v-b-modal.delete-account-modal class="btn btn-danger button"
        >Supprimer le compte</b-button
      >
    </div>

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
        <span>
          <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
          Supprimer le compte {{ userPage.username }}
          <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
        </span>
      </button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

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
        .delete(this.$store.state.apiUrl + "auth/users/" + this.routeUserId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => {
          console.log(response);
          if (this.userIsAdmin && !this.userIsOwner) {
            // Si l'utilisateur est admin mais pas propriétaire de la page, alors on le redirige vers la homepage du site après la suppression

            this.$toast.info("Utilisateur sélectionné supprimé", {
              timeout: 2000,
            });
            setTimeout(function() {
              this.$router.push("/");
            }, 1000);
          } else {
            // Si l'utilisateur est admin et propriétaire de la page ou pas admin mais propriétaire de la page, alors on le redirige vers la page de connexion après avoir supprimé le localStorage et les informations de connexion
            this.$toast("Utilisateur supprimé", {
              timeout: 2000,
            });
            setTimeout(function() {
              localStorage.clear();
              location.replace("/");
            }, 1000);
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
