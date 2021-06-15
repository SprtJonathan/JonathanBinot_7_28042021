<template>
  <div class="create-post container card">
    <h2 class="post--title test">Quoi de neuf aujourd'hui?</h2>
    <div class="post-creation--block">
      <form @submit.prevent="sumbitPost" class="">
        <div class="control">
          <input
            v-model="post.title"
            type="text"
            class="create-post--title form-control"
            placeholder="Titre du post"
            maxlength="50"
            required
          />

          <quill-editor
            ref="myQuillEditor"
            class="create-post--content"
            placeholder="Contenu du post"
            :options="editorOption"
            @change="onMaxChar($event)"
            required
          />
          <input
            type="submit"
            class="sumbit-post btn-primary form-control"
            value="Envoyer"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

let toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  ["link"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  ["clean"], // remove formatting button
];

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
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "bubble",
        placeholder: "Insérez du texte...",
      },
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
        console.log(response.data);
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
      console.log(this.post.content);
      if (!this.post.title || !this.post.content) {
        console.log("Erreur Contenu vide");
        this.$toast.error("Erreur : Contenu du post vide", {
          timeout: 2000,
        });
      } else {
        axios
          .post(this.$store.state.apiUrl + "posts/", post, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            this.$toast.success("Post publié", {
              timeout: 2000,
            });
            location.reload();
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
      this.post.content = quill.html;
      this.post.content = this.post.content
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
      console.log(this.post.content);
      console.log(quill.text.length);
      if (quill.text.length > limit) {
        this.post.content = this.post.content.substring(0, limit + 32);
        console.log(this.post.content);
      }
      return quill;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
