<template>
  <div>
    <h2 class="card container display-4">Utilisateur inscrits</h2>
    <div class="card container">
      <div
        class="user container card"
        v-for="user in allUsers"
        :key="user.userId"
      >
        <div class="content">
          <h2 class="user--title">{{user.fname}} "{{ user.username }}" {{user.lname}}</h2>
          <router-link :to="`/user/${user.userId}`"
            >Accéder au profil</router-link
          >
          <hr />
          <div class="headerPost">
            ID : <em>{{ user.userId }}</em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  name: "ShowPosts",
  data() {
    return {
      user: "",
      allUsers: [],
    };
  },
  created() {
    axios
      .get(apiUrl + "auth/users", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.allUsers = response.data;
        console.log(this.user);
        this.loadPosts();
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
.titre {
  color: #122442;
  font-size: 2em;
  @media screen and (max-width: 1000px) {
    font-size: 1em;
  }
}
.post {
  margin-top: 5rem;
}
</style>
