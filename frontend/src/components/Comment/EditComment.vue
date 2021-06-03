<template>
  <div class="page-edit">
    <div
      v-if="
        comment.userId == this.$store.state.user.user.userId ||
          this.$store.state.user.user.roleId == 1
      "
      class="create-post container card"
    >
      <h2>
        Editer le commentaire
        <h2
          v-if="
            this.$store.state.user.user.roleId == 1 &&
              this.$store.state.user.user.userId != comment.userId
          "
        >
          de {{ comment.username }}
        </h2>
      </h2>
      <div class="post-creation--block">
        <form @submit.prevent="sumbitComment" class="">
          <div class="control">
            <quill-editor
              ref="myQuillEditor"
              class="post--content"
              placeholder="Contenu du post"
              v-model="comment.comment"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              required
            />
            <input
              type="submit"
              class="sumbit-post btn-primary form-control"
              value="Éditer le commentaire"
            />
          </div>
        </form>
        <button
          type="submit"
          class="btn btn-danger button form-control"
          @click="deleteComment()"
        >
          Supprimer le commentaire
        </button>
      </div>
    </div>
    <div
      v-if="
        comment.userId != this.$store.state.user.user.userId &&
          this.$store.state.user.user.roleId != 1
      "
    >
      <div class="card container">
        Erreur, vous n'êtes pas l'auteur du commentaire, veuillez revenir à
        l'accueil
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
      comment: "",
      user: "",
      formError: "",
      hasError: false,
      editorOption: {
        // Some Quill options...
      },
      routeCommentId: this.$route.params.commentId,
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
        this.user = response.data;
        this.loadComment();
      })
      .catch((err) => console.log(err));
  },
  props: ["post"],
  methods: {
    loadComment() {
      axios
        .get(apiUrl + "comments/comment/" + this.routeCommentId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("commentaire : ", response.data[0]);
          this.comment = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sumbitComment() {
      let comment = {
        comment: this.comment.comment,
      };
      console.log("edit du com " + comment);
      let errorString = [];
      if (!this.comment.comment) {
        console.log("Erreur commentaire vide");
        errorString.push("Erreur commentaire vide");
      } else {
        axios
          .put(apiUrl + "comments/" + this.routeCommentId, comment, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            alert("Commentaire édité");
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
    deleteComment() {
      let errorString = [];
      axios
        .delete(apiUrl + "comments/" + this.routeCommentId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((result) => {
          console.log(result);
          alert("Commentaire supprimé");
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
