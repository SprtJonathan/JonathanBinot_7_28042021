<template>
  <div class="profile-block container card">
    <div class="profile-block--content">
      <h1>Profil de {{ userPage.username }} !</h1>
      <a class="button is-light" v-if="user.roleId == 1">
        <hr />
        <RouterLink class="ext-links" to="/users"
          >Liste des utilisateurs</RouterLink
        >
      </a>

      <a class="button is-light">
        <hr />
        <RouterLink class="ext-links" :to="`/user/${routeUserId}/posts/`"
          >Publications de l'utilisateur</RouterLink
        >
      </a>
      <hr />

      <div class="profile-block--informations">
        <UserCard />
        <EditUserCard v-show="isProfileFromUser || this.user.roleId == 1" />
      </div>
      <div class="profile-block--delete">
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
    let userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData.userId);
    axios
      .get(this.$store.state.apiUrl + "auth/users/" + userData.userId, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data;

        if (this.routeUserId == this.user.userId) {
          this.isProfileFromUser = true;
        } else {
          this.isProfileFromUser = false;
        }
        console.log(this.routeUserId);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        this.$store.state.apiUrl + "auth/users/" + this.routeUserId,
        {
          headers: { Authorization: "Bearer " + localStorage.token },
        }
      )
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
@import "@/modules/main";
</style>
