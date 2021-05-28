<template>
  <div class="create-post container card">
    <h3>Commentaires</h3>
    <div class="post-creation--block">
      <form @submit.prevent="postComment" class="">
        <div class="control">
          <quill-editor
            ref="commentEditor"
            class="comment--content"
            placeholder="Commentaire"
            v-model="comment.comment"
            :options="editorOption"
            required
          />
          <input
            type="submit"
            class="btn-primary"
            value="Poster le commentaire"
          />
        </div>
      </form>
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
        title: "",
        content: "",
      },
      user: "",
      formError: "",
      hasError: false,
      editorOption: {
        // Some Quill options...
      },
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
      })
      .catch((err) => console.log(err));
  },
  methods: {
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
          .post(apiUrl + "posts/", post, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            alert("Post publié");
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
