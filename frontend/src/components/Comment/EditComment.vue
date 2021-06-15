<template>
  <div class="page-edit">
    <div
      v-if="
        comment.userId == this.$store.state.user.user.userId ||
          this.$store.state.user.user.roleId == 1
      "
      class="create-post container card"
    >
      <button class="back-button btn shadow-sm" @click="$router.go(-1)">
        <b-icon class="back-button--icon" icon="arrow-left"></b-icon>
      </button>
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
      <div class="post--creation--block">
        <form id="edit-form" @submit.prevent="sumbitComment" class="">
          <div class="control">
            <quill-editor
              ref="myQuillEditor"
              class="post--content"
              placeholder="Contenu du post"
              v-model="comment.comment"
              :options="editorOption"
              @change="onMaxChar($event)"
              required
            />
          </div>
        </form>
        <div class="button-block">
          <button
            type="submit"
            form="edit-form"
            class="sumbit-post btn btn-primary post--button rounded-pill"
            value="Éditer le commentaire"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-save"
              viewBox="0 0 16 16"
            >
              <path
                d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
              />
            </svg>
          </button>
          <button
            type="submit"
            class="btn btn-danger post--button rounded-pill"
            @click="deleteComment()"
          >
            <b-icon icon="trash"></b-icon>
          </button>
        </div>
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

export default {
  name: "CreatePost",
  data() {
    return {
      comment: "",
      user: "",
      formError: "",
      hasError: false,
      editorOption: {
        modules: {
          toolbar: this.$store.state.toolbarOptions,
        },
        theme: "bubble",
      },
      routeCommentId: this.$route.params.commentId,
    };
  },
  created() {
    let userData = this.$store.state.user;
    console.log(userData.user.userId);
    axios
      .get(this.$store.state.apiUrl + "auth/users/" + userData.user.userId, {
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
        .get(
          this.$store.state.apiUrl + "comments/comment/" + this.routeCommentId,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
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
        this.$toast.error("Erreur : Commentaire vide", {
          timeout: 2000,
        });
      } else {
        axios
          .put(
            this.$store.state.apiUrl + "comments/" + this.routeCommentId,
            comment,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((result) => {
            console.log(result);
            this.$toast.warning("Commentaire modifié", {
              timeout: 2000,
            });
            setTimeout(function() {
              location.replace(location.origin);
            }, 2000);
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
      axios
        .delete(this.$store.state.apiUrl + "comments/" + this.routeCommentId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((result) => {
          console.log(result);
          this.$toast("Commentaire supprimé", {
            timeout: 2000,
          });
          setTimeout(function() {
            location.replace(location.origin);
          }, 2000);
        })
        .catch((error) => {
          let errorMessage = error.response.data.error;
          console.log(errorMessage);
          this.$toast.error(errorMessage, {
            timeout: 2000,
          });
        });
    },

    onMaxChar(quill) {
      const limit = 10208;
      if (quill.text.length > limit) {
        this.comment.comment = this.comment.comment.substring(0, limit + 32);
        console.log(this.comment.comment);
      }
      return quill;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
