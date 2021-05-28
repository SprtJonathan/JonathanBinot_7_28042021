<template>
  <div class="page-edit">
    <div
      v-if="post.userId == this.$store.state.user.user.userId"
      class="create-post container card"
    >
      <h2>Editer le post</h2>
      <div class="post-creation--block">
        <form @submit.prevent="sumbitPost" class="">
          <div class="control">
            <input
              v-model="post.title"
              type="text"
              class="post--title form-control"
              :placeholder="post.title"
              required
            />

            <quill-editor
              ref="myQuillEditor"
              class="post--content"
              placeholder="Contenu du post"
              v-model="post.content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              required
            />
            <input
              type="submit"
              class="sumbit-post btn-primary form-control"
              value="Éditer le post"
            />
          </div>
        </form>
        <button
            type="submit"
            class="btn btn-danger button form-control"
            @click="deletePost()"
          >
            Supprimer le post
          </button>
      </div>
    </div>
    <div v-if="post.userId != this.$store.state.user.user.userId">
      <div class="card container">
        Erreur, vous n'êtes pas l'auteur du post, veuillez revenir à l'accueil
        <RouterLink to="/">Revenir à l'accueil</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  name: "CreatePost",
  data() {
    return {
      post: {
        User: [],
        postId: "",
        userId: "",
        title: "",
        content: "",
      },
      user: "",
      formError: "",
      hasError: false,
      editorOption: {
        // Some Quill options...
      },
      routePostId: this.$route.params.postId,
    };
  },
  created() {
    let userData = this.$store.state.user;
    console.log(userData.user.userId);
    axios
      .get(apiUrl + "auth/users/" + userData.user.userId, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(response.data.user);
        this.loadPost();
      })
      .catch((err) => console.log(err));
  },
  methods: {
    loadPost() {
      axios
        .get(apiUrl + "posts/" + this.routePostId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("publication", response.data[0]);
          this.post = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sumbitPost() {
      let post = {
        userId: this.user.userId,
        title: this.post.title,
        content: this.post.content,
      };
      console.log(post);
      let errorString = [];
      if (!this.post.title || !this.post.content) {
        console.log("Erreur titre ou contenu vide");
        errorString.push("Erreur titre ou contenu vide");
      } else {
        axios
          .put(apiUrl + "posts/" + this.routePostId, post, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            alert("Post édité");
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
      }
    },
    deletePost() {
      let errorString = [];
      axios
        .delete(apiUrl + "posts/" + this.routePostId, {
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

    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/_variables";
</style>
