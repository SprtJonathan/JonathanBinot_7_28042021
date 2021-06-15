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

          <div class="create-post--content">
            <button class="btn-warning form-control" @click="embedReddit">
              Partager un post Reddit
            </button>
            <div class="selected-url" :v-show="url != ''">
              <p v-if="(url != '')">URL sélectionné</p>{{ url }}
            </div>
            <quill-editor
              ref="myQuillEditor"
              class="create-post--editor"
              placeholder="Contenu du post"
              v-model="post.content"
              :options="editorOption"
              @change="onMaxChar($event)"
              required
            >
            </quill-editor>
          </div>

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

export default {
  name: "CreatePost",
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      link: "",
      url: "",
      user: "",
      formError: "",
      hasError: false,
      editorOption: {
        modules: {
          toolbar: this.$store.state.toolbarOptions,
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
        content: this.post.content + this.link,
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
        console.log("test concluant " + post.content);
      }
    },
    onMaxChar(quill) {
      const limit = 10208;
      console.log(quill.text.length);
      console.log(this.post.content);
      if (quill.text.length > limit) {
        this.post.content = this.post.content.substring(0, limit + 32);
        //console.log(this.post.content);
      }
      return quill;
    },
    embedReddit() {
      event.preventDefault();
      this.url = window.prompt("Insérer l'URL d'un post reddit");
      let redditSubString = "www.reddit.com/";
      console.log(this.url.includes(redditSubString));
      if (this.url.includes(redditSubString)) {
        this.url = this.url.replace(redditSubString, "www.redditmedia.com/");
        this.url = this.url + "?ref_source=embed&amp;ref=share&amp;embed=true";
        console.log(this.url);
        this.link =
          `<iframe class="ql-video" id="reddit-embed" src=` +
          this.url +
          ` sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`;
      } else {
        this.url = "";
        this.$toast.error("Erreur: le lien entré n'est pas un lien reddit", {
          timeout: 2000,
        });
      }
      console.log(this.link);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
