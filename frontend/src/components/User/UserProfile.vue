<template>
  <div class="profile-block container card">
    <div class="profile-block--content">
      <h1>Bienvenue {{ user.username }} !</h1>
      <hr />
      <a class="button is-light" v-if="user.roleId == 1">
        <RouterLink to="/users">Liste des utilisateurs</RouterLink>
        <hr />
      </a>

      <a class="button is-light" v-if="user.roleId == 1">
        <RouterLink :to="`/user/${routeUserId}/posts/`"
          >Publications de l'utilisateur</RouterLink
        >
        <hr />
      </a>
      <h3>Informations sur le compte :</h3>
      <div class="profile-block--informations container">
        <UserCard />
      </div>
      <div class="profile-block--informations container">
        <EditUserCard v-show="isProfileFromUser || this.user.roleId == 1" />
      </div>

      <b-button v-b-modal.delete-account-modal class="btn btn-danger" href="#confirmation-text">Supprimer le compte</b-button>

      <b-modal hide-footer id="delete-account-modal" title="Supression du compte">
        <p id="confirmation-text">En cliquant sur "supprimer", le compte et toutes les informations relatives au compte seront supprimées. Souhaitez-vous vraiment continuer?</p>
        <DeleteUser v-show="isProfileFromUser || this.user.roleId == 1" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserCard from "@/components/User/UserCard.vue";
import EditUserCard from "@/components/User/EditUserCard.vue";
import DeleteUser from "@/components/User/DeleteUser.vue";

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
      userPage: {
        username: null,
        fname: null,
        lname: null,
        createdOn: null,
        lastUpdated: null,
        roleId: null,
      },
      isProfileFromUser: false,
      routeUserId: this.$route.params.userId,
    };
  },
  created() {
    /*let sentData = {
      id: this.routeUserId,
    };*/
    //console.log(sentData);
    let userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData.userId);
    axios
      .get(apiUrl + "auth/users/" + userData.userId, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(this.user);

        if (this.routeUserId == this.user.userId) {
          this.isProfileFromUser = true;
          console.log(
            this.isProfileFromUser +
              " est la réponse quant à est-ce que l'ID est le même et " +
              this.routeUserId +
              " est l'id du lien et " +
              this.user.userId +
              " est l'id utilisateur"
          );
        } else {
          this.isProfileFromUser = false;
        }
        console.log(this.routeUserId);
      })
      .catch((err) => console.log(err));
  },

  components: {
    UserCard,
    EditUserCard,
    DeleteUser,
  },

  methods: {},
};
</script>
<style scoped lang="scss">
@import "../../modules/_variables";

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
  display: flex;
  flex-direction: column;
  background-color: $block-background-semitransparent;
  padding: 2%;
  border-radius: 25px;
  margin: auto;
  margin-top: 2%;
  &--content {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  &--informations {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
}

.account-info {
  display: flex;
  margin: auto;
  width: 90%;
  border-radius: 25px;
}

@media (min-width: 1280px) {
  .profile-block {
    &--content {
      margin: auto;
    }
    margin: auto;
    &--informations {
      margin: auto;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
