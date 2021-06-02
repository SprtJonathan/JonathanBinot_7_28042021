<template>
  <div class="">
    <div
      class="post container card"
      v-for="post in allPosts"
      :key="post.postId"
    >
      <div class="content">
        <section class="post-section">
          <h2 class="post--title display-4">{{ post.title }}</h2>
          <div v-html="post.content" class="post--content card lead"></div>
          <hr />
        </section>
        <section class="footer-section">
          <RouterLink
            class="btn btn-secondary button"
            v-if="$store.state.user.user.userId == post.userId"
            :to="`/post/${post.postId}/edit`"
            ><b-icon icon="pencil-square"></b-icon
          ></RouterLink>
          <button
            type="submit"
            class="btn btn-danger button"
            v-if="
              $store.state.user.user.userId == post.userId ||
                $store.state.user.user.roleId == 1
            "
            @click="deletePost(post.postId)"
          >
            <b-icon icon="trash"></b-icon>
          </button>
          <div class="post--info">
            <hr />

            <span>
              Publié par
              <RouterLink :to="`/user/${post.userId}`">
                <em>{{ post.username }}</em>
              </RouterLink>
              le <em>{{ post.creationDate | formatDate }}</em> <br />
            </span>
            <span v-if="post.creationDate != post.modificationDate">
              Dernière modification le
              <em>{{ post.modificationDate | formatDate }}</em>
            </span>
          </div>
          <hr />
        </section>
        <section class="comments-section">
          <CommentPost :post="post" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentPost from "./CommentPost";

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  name: "ShowPosts",
  data() {
    return {
      user: "",
      post: {
        User: [],
        postId: "",
        userId: "",
        title: "",
        content: "",
        creationDate: "",
        modificationDate: "",
      },
      allPosts: [],
      allUsers: [],
      isAuthorUser: false,
    };
  },
  components: {
    CommentPost,
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
      .catch((err) => {
        console.log(err);

        localStorage.clear();
        this.$store.dispatch("user/logout").then(() => {});
      });
  },
  methods: {
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(postId) {
      let errorString = [];
      console.log("id du post : " + postId);
      axios
        .delete(apiUrl + "posts/" + postId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((result) => {
          console.log(result);
          alert("Post supprimé");
          location.replace(location.origin);
        })
        .catch((error) => {
          let errorMessage = error.toString();
          errorString.push(errorMessage);
          console.log(errorMessage);
          this.formError = errorString.toString();
          console.log(this.formError);
          this.hasError = true;
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
.post-section {
}
.footer-section {
}
.comments-section {
  background-color: whitesmoke;
  border-radius: 25px;
  padding: 2rem;
  margin-bottom: 2rem;
}
</style>
