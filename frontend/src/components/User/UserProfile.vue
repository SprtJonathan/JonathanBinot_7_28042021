<template>
  <div class="profile-block container card">
    <div class="profile-block--content">
      <h1>Bienvenue {{ user.username }} !</h1>
      <hr />
      <a class="button is-light" v-if="user.isAdmin == true">
        <RouterLink to="/users">Tous les utilisateurs</RouterLink>
      </a>
      <hr />
      <a class="button is-light" v-if="user.isAdmin == true">
        <RouterLink to="/publicationsAdmin"
          >Toutes les publications utilisateurs</RouterLink
        >
      </a>
      <hr />
      <h3>Informations sur votre compte :</h3>
      <div class="profile-block--informations container">
        <UserCard />
        <EditUserCard />
      </div>

      <DeleteUser />
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
    };
  },
  created() {
    axios
      .get(apiUrl + "auth/", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(response.data.user);
      })
      .catch((err) => console.log(err));
  },

  components: {
    UserCard,
    EditUserCard,
    DeleteUser,
  },
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
  }
  &--informations {
    display: flex;
    flex-direction: column;
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
    &--informations {
      display: flex;
      flex-direction: row;
    }
  }
  .profile-card {
    width: 20vw;
  }
}
</style>
