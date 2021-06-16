<template>
  <div class="page-edit">
    <div
      v-if="
        post.userId == this.$store.state.user.user.userId ||
          this.$store.state.user.user.roleId == 1
      "
      class="create-post container card"
    >
      <button class="back-button btn shadow-sm" @click="$router.go(-1)">
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
            @click="deletePost()"
          >
            <b-icon icon="trash"></b-icon>
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
      post: "",
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
      axios
        .get(this.$store.state.apiUrl + "posts/" + this.routePostId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("publication", response.data[0]);
          this.post = response.data[0];
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
      let errorString = [];
      if (!this.post.title || !this.post.content) {
        console.log("Erreur titre ou contenu vide");
        errorString.push("Erreur titre ou contenu vide");
      } else {
        axios
          .put(this.$store.state.apiUrl + "posts/" + this.routePostId, post, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            this.$toast.warning("Post modifié", {
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
      console.log(quill.text.length);
      console.log(this.post.content);
      if (quill.text.length > limit) {
        this.post.content = this.post.content.substring(0, limit + 32);
        //console.log(this.post.content);
      }
      return quill;
    },
    detectRedditLink(post) {
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
      event.preventDefault();
      let url = param; //window.prompt("Insérer l'URL d'un post reddit");
      console.log("Le param URL est " + url);
      let redditSubString = "https://www.reddit.com/";
      let redditPostSubString = "/comments/";
      console.log(url.includes(redditSubString));
      if (url.includes(redditSubString) && url.includes(redditPostSubString)) {
        url = url.replace(redditSubString, "https://www.redditmedia.com/");
        url = url + "?ref_source=embed&amp;ref=share&amp;embed=true";
        console.log(url);
        this.link =
          `<div class="embedded-post">
          <iframe class="ql-video" id="reddit-embed" src=` +
          url +
          ` sandbox="allow-scripts allow-same-origin allow-popups" scrolling="yes" frameborder="0" width="100%" height="528"></iframe></div>`;
      } else {
        url = "";
        /*this.$toast.error("Erreur: le lien entré n'est pas un lien reddit", {
          timeout: 2000,
        });*/
      }
      console.log(this.link);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
