<template>
  <div class="page-edit">
    <div
      v-if="
        post.userId == this.$store.state.user.user.userId ||
          this.$store.state.user.user.roleId == 1
      "
      class="create-post container card"
    >
      <button
        aria-label="Retour"
        class="back-button btn shadow-sm"
        @click="$router.go(-1)"
      >
        <b-icon class="back-button--icon" icon="arrow-left"></b-icon>
      </button>
      <h3>
        Editer le post
        <span
          v-if="
            this.$store.state.user.user.roleId == 1 &&
              this.$store.state.user.user.userId != post.userId
          "
        >
          de {{ post.username }}
        </span>
      </h3>
      <div class="post-creation--block">
        <form id="edit-post" @submit.prevent="sumbitPost" class="">
          <div class="control">
            <input
              v-model="post.title"
              type="text"
              class="create-post--title form-control"
              :placeholder="post.title"
              required
            />

            <quill-editor
              ref="myQuillEditor"
              class="post--content"
              placeholder="Contenu du post"
              v-model="post.content"
              :options="editorOption"
              @change="onMaxChar($event)"
              required
            />
          </div>
        </form>
        <div class="button-block">
          <button
            type="submit"
            form="edit-post"
            title="Éditer le  post"
            class="sumbit-post btn btn-primary post--button rounded-pill"
            value="Éditer le post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-save"
              viewBox="0 0 16 16"
              aria-label="Éditer"
            >
              <path
                d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
              />
            </svg>
          </button>
          <button
            type="submit"
            title="Supprimer le  post"
            class="btn btn-danger post--button rounded-pill"
            @click="deletePost()"
          >
            <b-icon aria-label="Supprimer" icon="trash"></b-icon>
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="
        post.userId != this.$store.state.user.user.userId &&
          this.$store.state.user.user.roleId != 1
      "
    >
      <div class="card container">
        <!-- Si l'utilisateur connecté n'est pas admin ou l'auteur du post, alors on renvoie une erreur et on n'affiche pas le post -->
        Erreur, vous n'êtes pas l'auteur du post, veuillez revenir à l'accueil
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
      },
      routePostId: this.$route.params.postId,
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
        this.loadPost();
      })
      .catch((err) => console.log(err));
  },
  methods: {
    loadPost() {
      // Chargement du post d'après l'url
      axios
        .get(this.$store.state.apiUrl + "posts/" + this.routePostId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("publication", response.data[0]);
          this.post = response.data[0];
          this.findIframe(this.post.content);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sumbitPost() {
      this.detectRedditLink(this.post.content);
      let post = {
        userId: this.user.userId,
        title: this.post.title,
        content: this.post.content + this.link,
      };
      console.log(post);
      if (!this.post.title || !this.post.content) {
        console.log("Erreur titre ou contenu vide");
        this.$toast.error("Erreur titre ou contenu vide", {
          timeout: 2000,
        });
      } else {
        axios
          .put(this.$store.state.apiUrl + "posts/" + this.routePostId, post, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            this.$toast.warning("Post modifié", {
              timeout: 1000,
            }); // Si tout fonctionne, alors on envoie un message de succès et on retourne à l'accueil
            setTimeout(function() {
              location.replace(location.origin);
            }, 1000);
          })
          .catch((error) => {
            let errorMessage = error.response.data.error;
            console.log(errorMessage); // On renvoie une erreur sinon
            this.$toast.error(errorMessage, {
              timeout: 2000,
            });
          });
      }
    },
    deletePost() {
      axios
        .delete(this.$store.state.apiUrl + "posts/" + this.routePostId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((result) => {
          console.log(result);
          this.$toast("Post supprimé", {
            timeout: 1000,
          });
          setTimeout(function() {
            location.replace(location.origin);
          }, 1000);
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
      console.log(quill.text.length);
      //console.log(this.post.content);
      if (quill.text.length > limit) {
        this.post.content = this.post.content.substring(0, limit + 32);
        //console.log(this.post.content);
      }
      return quill;
    },
    findIframe(post) {
      // Cette fonction permet de vérifier si le post contient un iframe afin de le supprimer. Ceci de manière à ce qu'il soit régénéré
      // Si l'utilisateur laisse le lien reddit dans le post. S'il n'y en a pas, aucune action n'est requise
      let parser = new DOMParser();
      let element = parser.parseFromString(post, "text/html"); // Le texte du post
      if (
        post.includes("<iframe") &&
        !(
          post.includes('src="https://youtube.com') ||
          post.includes('src="https://youtu.be"')
        ) // Si le post inclut la chaîne de caractères <iframe, et qu'il ne contient pas les caractères youtube
      ) {
        let iframeContainer = element.getElementsByClassName("ql-reddit"); // Alors on cherche l'élément dont la classe est ql-reddit
        let iframeToRemove = iframeContainer[0].outerHTML; // On crée une variable contenant les caractères de l'élément à supprimer
        iframeToRemove = iframeToRemove.replace(/&amp;/g, "&"); // On remplace si besoin les caractères traduits "&amp;" par leur équivalent non traduit "&"
        post = post.replace(/&amp;/g, "&"); // On fait de même pour le post
        post = post.replace(`e sandbox=`, `" sandbox=`); // Dans le cas où le lien reddit (se terminant par true) ne soit pas entouré par des "", alors on en rajoute.
        post = post.replace(`src=h`, `src="h`); // Même chose

        console.log("le iframe" + iframeToRemove); // On peut comparer les deux valeurs
        console.log("le post " + post);

        this.post.content = post.replace(iframeToRemove, ""); // On supprime la chaîne de caractère (donc le block iframe) du post afin que le bloc soit reformé ou non à la fin de la modification
        //console.log(this.post.content);
      } else {
        console.log("Pas d'iframe");
      }
    },
    detectRedditLink(post) {
      // On reprend la fonction permettant de vérifier si un URL de post reddit se trouve dans le post
      console.log("le post " + post);
      let parser = new DOMParser();
      let element = parser.parseFromString(post, "text/html");
      console.log("post " + element);

      if (post.includes('<a href="')) {
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
