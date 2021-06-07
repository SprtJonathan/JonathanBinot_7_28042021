<template>
  <div>
    <h2 class="">Utilisateur inscrits</h2>
    <div class="container user--container">
      <div
        class="user container card"
        v-for="user in allUsers"
        :key="user.userId"
      >
        <router-link class="ext-links" :to="`/user/${user.userId}`">
          <div class="user--content">
            <div class="profile-picture--block shadow-sm">
              <img
                class="profile-picture--image"
                :src="user.profilePictureUrl"
                alt="Image de profil"
              />
            </div>
            <h2 class="user--title">
              {{ user.fname }} "{{ user.username }}" {{ user.lname }}
            </h2>
            <hr />
            <div class="headerPost">
              ID : <em>{{ user.userId }}</em>
            </div>
          </div>
        </router-link>
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
        console.log(this.allUsers);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
.user {
  margin: 1rem;
}
.titre {
  color: #122442;
  font-size: 2em;
}
.profile-picture {
  &--block {
    position: relative;
    width: 40%;
    margin: 1.5rem auto;
    border-radius: 50%;
  }
  &--image {
    width: 100%;
    border-radius: 50%;
  }
}
.post {
  margin-top: 5rem;
}
@media (min-width: 1000px) {
  .titre {
    font-size: 1em;
  }
  .profile-picture {
    &--block {
      position: relative;
      width: 10%;
      margin: 1.5rem auto;
      border-radius: 50%;
    }
    &--image {
      width: 100%;
      border-radius: 50%;
    }
  }
}
</style>
