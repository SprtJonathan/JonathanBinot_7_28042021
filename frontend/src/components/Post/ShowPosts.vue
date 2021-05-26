<template>
  <div class="">
    <div
      class="post container card"
      v-for="post in allPosts"
      :key="post.postId"
    >
      <div class="content">
        <h2 class="post--title display-4">{{ post.title }}</h2>
        <div v-html="post.content" class="post--content card lead"></div>
        <hr />
        <div class="headerPost">
          Publié par <em>{{ post.userId }}</em> le
          <em>{{ post.creationDate }}</em>
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
      post: {
        user: "",
        postId: "",
        userId: "",
        title: "",
        content: "",
      },
      allPosts: [],
    };
  },
  created() {
    axios
      .get(apiUrl + "auth/users", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
        this.loadPosts();
      })
      .catch((err) => console.log(err));
  },
  methods: {
    setInfos(payload) {
      this.post = payload.post;
    },
    loadPosts() {
      axios
        .get(apiUrl + "posts/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("publication", response.data);
          this.allPosts = response.data;
          this.getAuthor();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAuthor() {
      axios
        .get(apiUrl + "auth/users/" + this.post.userId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("publication", response.data[0]);
          this.user = response.data;
          console.log(this.user.user.username);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
