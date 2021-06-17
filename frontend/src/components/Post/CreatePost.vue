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
            <quill-editor
              ref="myQuillEditor"
              id="post"
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
        theme: "snow",
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
      this.detectRedditLink(this.post.content);
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
      // Fonction permettant de limiter le nombre maximal de caractères pour un poste
      const limit = 10208;
      console.log(quill.text.length);
      console.log(this.post.content);
      if (quill.text.length > limit) {
        this.post.content = this.post.content.substring(0, limit + 32);
        //console.log(this.post.content);
      }
      return quill;
    },
    detectRedditLink(post) {
      // Fonction permettant de détecter si un lien reddit est entré dans le post
      console.log("le post " + post);
      let parser = new DOMParser();
      let element = parser.parseFromString(post, "text/html");
      console.log("post " + element);

      if (post.includes('<a href="')) {
        // Si le texte inclut un lien, alors on récupère son HREF et on appelle la fonction embedReddit()
        let isLink = element.getElementsByTagName("a");
        console.log(isLink + " si y a lien");
        let href = isLink[0].getAttribute("href");
        console.log("HREF?" + href);
        this.embedReddit(href);
      } else {
        console.log("Pas de lien");
      }
    },
    embedReddit(param) {
      // Fonction permettant de transformer un lien reddit en un bloc iframe permettant ainsi d'afficher l'article sous forme de page web intégrée
      event.preventDefault();
      let url = param; // Le paramètre est le lien récupéré grâce à l'attribut href
      console.log("Le param URL est " + url);
      let redditSubString = "https://www.reddit.com/";
      let redditPostSubString = "/comments/";
      console.log(url.includes(redditSubString));
      if (url.includes(redditSubString) && url.includes(redditPostSubString)) {
        // Si le lien inclut la chaîne de caractères redditSubString, alors on la remplace par le lien permettant d'intégrer le post
        url = url.replace(redditSubString, "https://www.redditmedia.com/");
        url = url + "?ref_source=embed&amp;ref=share&amp;embed=true"; // On ajoute à la fin du lien les options d'intégration
        console.log(url);
        this.link =
          `<iframe title="Post reddit partagé" class="ql-reddit" id="reddit-embed" src="` +
          url +
          `" sandbox="allow-scripts allow-same-origin allow-popups" scrolling="yes" frameborder="0" width="100%" height="528"></iframe>`; // On transforme le lien en code iframe
      } else {
        url = param; // Sinon on assigne une valeur nulle à URL
      }
      console.log(this.link);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
