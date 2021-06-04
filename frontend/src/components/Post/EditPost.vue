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
              class="post--title form-control"
              :placeholder="post.title"
              required
            />

            <quill-editor
              ref="myQuillEditor"
              class="post--content"
              placeholder="Contenu du post"
              v-model="post.content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
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
      post: "",
      user: "",
      formError: "",
      hasError: false,
      editorOption: {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "bubble",
      },
      routePostId: this.$route.params.postId,
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
        this.loadPost();
      })
      .catch((err) => console.log(err));
  },
  methods: {
    loadPost() {
      axios
        .get(apiUrl + "posts/" + this.routePostId, {
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
          .put(apiUrl + "posts/" + this.routePostId, post, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            alert("Post édité");
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
    deletePost() {
      let errorString = [];
      axios
        .delete(apiUrl + "posts/" + this.routePostId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((result) => {
          console.log(result);
          alert("Post supprimé");
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
.create-post {
  padding: 1rem;
}
.back-button {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  height: fit-content;
  width: fit-content;
  &--icon {
    height: 1rem;
    width: 1rem;
  }
}
.post {
  &--title {
    width: 50%;
    margin: auto;
  }
  &--content {
    margin: 1rem;
    border: 1px solid $primary-color;
  }
  &--button {
    margin: 1rem;
  }
}
</style>
