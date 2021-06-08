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
            required
          />

          <quill-editor
            ref="myQuillEditor"
            class="create-post--content"
            placeholder="Contenu du post"
            v-model="post.content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
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
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

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
      console.log(post);
      let errorString = [];
      if (!this.post.title || !this.post.content) {
        console.log("Erreur titre ou contenu vide");
        errorString.push("Erreur titre ou contenu vide");
      } else {
        axios
          .post(apiUrl + "posts/", /*post,*/ {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            this.$toast.success("Post publié", {
              timeout: 2000,
            });
            setTimeout(function() {
              location.reload();
            }, 2000);
          })
          .catch((error) => {
            this.$toast.error("Une erreur est survenue: " + error, {
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
    onMaxChar(quill) {
      const limit = 100;
      console.log(quill.text.length);
      if (quill.text.length > limit) {
        quill.text = quill.text.slice(0, limit + 1);
        console.log(quill.text);
      }
      return quill;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
