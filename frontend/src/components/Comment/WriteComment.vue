<template>
  <div class="comment-creation--block">
    <form @submit.prevent="postComment" class="">
      <div class="control">
        <quill-editor
          ref="commentEditor"
          class="comment--write"
          placeholder="Commentaire"
          v-model="comment.comment"
          :options="editorOption"
          @change="onMaxChar($event)"
          required
        />
        <input
          type="submit"
          class="btn btn-dark rounded-pill"
          value="Commenter"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

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
          toolbar: this.$store.state.toolbarOptions,
        },
        theme: "bubble",
        placeholder: "Commentaire...",
      },
    };
  },
  props: ["post"],
  created() {
    axios
      .get(this.$store.state.apiUrl + "auth/users", {
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
      if (!this.comment.comment) {
        console.log("Erreur commentaire vide");
        this.$toast.error("Erreur : Commentaire vide", {
          timeout: 2000,
        });
      } else {
        axios
          .post(this.$store.state.apiUrl + "comments/", comment, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            this.$toast.success("Commentaire posté", {
              timeout: 2000,
            });
            setTimeout(function() {
              location.reload();
            }, 2000);
          })
          .catch((error) => {
            let errorMessage = error.response.data.error;
            console.log(errorMessage);
            this.hasError = true;
            //this.formError = errorString.toString();
            this.$toast.error(errorMessage, {
              timeout: 2000,
            });
          });
      }
    },

    onMaxChar(quill) {
      const limit = 10208;
      console.log(quill.text.length);
      if (quill.text.length > limit) {
        this.comment.comment = this.comment.comment.substring(0, limit + 32);
        console.log(this.comment.comment);
      }
      return quill;
    },
  },
};
</script>

<style lang="scss" scoped></style>
