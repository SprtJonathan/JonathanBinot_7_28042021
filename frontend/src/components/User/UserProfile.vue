<template>
  <div class="profile-block container card">
    <div class="profile-block--content">
      <h1>Profil de {{ userPage.username }} !</h1>
      <a class="button is-light" v-if="user.roleId == 1">
        <hr />
        <RouterLink to="/users">Liste des utilisateurs</RouterLink>
      </a>

      <a class="button is-light">
        <hr />
        <RouterLink :to="`/user/${routeUserId}/posts/`"
          >Publications de l'utilisateur</RouterLink
        >
      </a>
      <hr />
      <h3>Informations sur le compte :</h3>
      <div class="profile-block--informations container">
        <UserCard />
      </div>
      <div class="profile-block--informations container">
        <EditUserCard v-show="isProfileFromUser || this.user.roleId == 1" />
      </div>
      <div class="profile-block--delete container">
        <DeleteUser
          :user="user"
          :userPage="userPage"
          v-show="isProfileFromUser || this.user.roleId == 1"
        />
      </div>
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
      user: "",
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
        this.user = response.data;

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

    axios
      .get(apiUrl + "auth/users/visitor/" + this.routeUserId)
      .then((response) => {
        this.userPage = response.data;
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
  padding: 1rem;
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
