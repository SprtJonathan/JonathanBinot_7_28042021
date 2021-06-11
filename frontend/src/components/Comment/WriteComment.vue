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

let toolbarOptions = {
  handlers: {
    // handlers object will be merged with default handlers object
    link: function(value) {
      if (value) {
        var href = prompt("Enter the URL");
        this.quill.format("link", href);
      } else {
        this.quill.format("link", false);
      }
    },
  },
};

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
          toolbar: toolbarOptions,
        },
        theme: "bubble",
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

<style lang="scss" scoped></style>
