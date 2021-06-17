<template>
  <div class="">
    <div v-if="allPosts.length == 0">
      <p class="text-center text">Aucun post</p>
    </div>
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
            title="Modifier le post"
            v-if="
              $store.state.user.user.userId == post.userId ||
                $store.state.user.user.roleId == 1
            "
            :to="`/post/${post.postId}/edit`"
            ><b-icon aria-label="Modifier le post" icon="pencil-square"></b-icon
          ></RouterLink>
          <button
            type="submit"
            title="Supprimer le post"
            class="footer-section--btn btn "
            v-if="
              $store.state.user.user.userId == post.userId ||
                $store.state.user.user.roleId == 1
            "
            @click="deletePost(post.postId)"
          >
            <b-icon aria-label="Supprimer le post" icon="trash"></b-icon>
          </button>
          <div class="post--info">
            <hr />

            <span>
              Publié par
              <RouterLink :to="`/user/${post.userId}`">
                <span v-show="post.roleId != 1" class="regular">{{
                  post.username
                }}</span>
                <!-- Affichage de l'auteur du post en couleur normale -->
                <span v-show="post.roleId == 1" class="admin">{{
                  post.username
                }}</span>
                <!-- Affichage de l'auteur du post dans un code couleur admin afin de le différencier des utilisateurs réguliers -->
              </RouterLink>
              le <em>{{ post.creationDate | formatDate }}</em> <br />
            </span>
            <span v-if="post.creationDate != post.modificationDate">
              Dernière modification le
              <em>{{ post.modificationDate | formatDate }}</em>
              <!-- Affichage de la date de dernière modification si le commentaire a été modifié -->
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
</template>

<script>
import axios from "axios";
import CommentPost from "./CommentPost";

export default {
  name: "ShowPosts",
  data() {
    return {
      user: "",
      post: "",
      allPosts: [],
      allUsers: [],
      isAuthorUser: false,
    };
  },
  components: {
    CommentPost,
  },
  async created() {
    await axios
      .get(this.$store.state.apiUrl + "auth/users", {
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
        .get(this.$store.state.apiUrl + "posts/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("publication", response.data);
          this.allPosts = response.data; // Récupération des posts
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(postId) {
      console.log("id du post : " + postId);
      axios
        .delete(this.$store.state.apiUrl + "posts/" + postId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((result) => {
          console.log(result);
          this.$toast("Post supprimé", {
            timeout: 2000,
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
