<template>
  <div class="">
    <div v-show="!hasPublished">
      <h2>Cet utilisateur n'a encore rien publié</h2>
    </div>
    <div class="">
      <div
        class="post container card"
        v-for="post in allPosts"
        :key="post.postId"
      >
        <div class="content">
          <section class="post--section">
            <h2 class="post--title display-4">{{ post.title }}</h2>
            <div v-html="post.content" class="post--content card lead"></div>
            <hr />
          </section>
          <section class="footer-section">
            <RouterLink
              class="footer-section--btn btn"
              v-if="
                $store.state.user.user.userId == post.userId ||
                  $store.state.user.user.roleId == 1
              "
              :to="`/post/${post.postId}/edit`"
              ><b-icon icon="pencil-square"></b-icon
            ></RouterLink>
            <button
              type="submit"
              class="footer-section--btn btn"
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
                  <span v-show="post.roleId != 1" class="regular">{{
                    post.username
                  }}</span>
                  <span v-show="post.roleId == 1" class="admin">{{
                    post.username
                  }}</span>
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
          <section class="comment--section shadow-sm">
            <CommentPost :post="post" :allPosts="allPosts" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentPost from "./CommentPost";

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
      hasPublished: false,
      routeUserId: this.$route.params.userId,
    };
  },
  components: {
    CommentPost,
  },
  created() {
    axios
      .get(
        this.$store.state.apiUrl + "auth/users/" + this.routeUserId, // Récupération des informations utilisateurs via l'ID passé dans l'URL de la page
        {
          headers: { Authorization: "Bearer " + localStorage.token },
        }
      )
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
        .get(this.$store.state.apiUrl + "posts/from/" + this.routeUserId, {
          // Chargement des informations des posts en utilisant l'ID de leur auteur passé dans l'URL
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.allPosts = response.data;
          if (this.allPosts.length > 0) {
            this.hasPublished = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(postId) {
      axios
        .delete(this.$store.state.apiUrl + "posts/" + postId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((result) => {
          console.log(result);
          this.$toast("Post supprimé", {
            timeout: 1000,
          });
          this.loadPosts();
        })
        .catch((error) => {
          let errorMessage = error.response.data.error;
          console.log(errorMessage);
          this.$toast.error(errorMessage, {
            timeout: 2000,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
