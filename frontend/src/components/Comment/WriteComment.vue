<template>
  <div class="comment-creation--block">
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
</template>

<script>
import axios from "axios";
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  name: "WriteComment",
  data() {
    return {
      user: "",
      comment: {
        userId: "",
        comment: "",
      },
      hasError: false,
      editorOption: {
        modules: {
          toolbar: false,
        },
        // Some Quill options...
      },
    };
  },
  props: ["post"],
  created() {
    axios
      .get(apiUrl + "auth/users", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    postComment() {
      let comment = {
        postId: this.post.postId,
        userId: this.$store.state.user.user.userId,
        comment: this.comment.comment,
      };
      console.log(comment);
      let errorString = [];
      if (!this.comment.comment) {
        console.log("Erreur commentaire vide");
        errorString.push("Erreur commentaire vide");
      } else {
        axios
          .post(apiUrl + "comments/", comment, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            alert("Commentaire posté");
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
.comment--content {
  background-color: white;
}
</style>
