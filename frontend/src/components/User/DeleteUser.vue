<template>
  <div class="modal--delete">
    <div class="profile-card card">
      <h2>Gestion du compte</h2>
      <button
        class="btn btn-danger button delete--button"
        @click="showConfirmation = !showConfirmation"
        v-show="showConfirmation == false"
      >
        <div class="delete--pre-button--div">
          <div>
            <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
          </div>
          <div class="delete--pre-button--text">
            Supprimer le compte <i>{{ userPage.username }}</i>
          </div>
          <div>
            <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
          </div>
        </div>
      </button>
      <div
        class="card confirmation"
        title="Supression du compte"
        v-show="showConfirmation == true"
      >
        <!-- Message de confirmation pour la suppression du compte -->
        <p id="confirmation-text">
          En cliquant sur "Oui, supprimer", le compte et toutes les informations
          relatives au compte seront supprimées. Souhaitez-vous vraiment
          continuer?
        </p>
        <div class="delete--button-div">
          <button
            type="submit"
            class="btn btn-danger button"
            @click="deleteAccount()"
          >
            Oui, supprimer
          </button>
          <button
            type="submit"
            class="btn btn-primary button"
            @click="showConfirmation = !showConfirmation"
          >
            Non, retour
          </button>
        </div>
      </div>
    </div>
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
      showConfirmation: false,
    };
  },
  props: ["user", "userPage"], // Informations de l'utilisateur connecté et de l'utilisateur associé à la page de profil
  methods: {
    deleteAccount() {
      // Suppression du compte utilisateur associé à la page
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
