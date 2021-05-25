<template>
  <div class="create-post container card">
    <h2>Quoi de neuf aujourd'hui?</h2>
    <div class="post-creation--block">
      <form @submit.prevent="sumbitPost" class="">
        <div class="control">
          <input
            v-model="post.title"
            type="text"
            class="post--title form-control"
            placeholder="Titre du post"
            required
          />
          <textarea
            v-model="post.content"
            id=""
            cols="30"
            rows="10"
            class="post--content form-control"
            placeholder="Contenu du post"
            required
          >
          </textarea>
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
        this.user = response.data.user;
        console.log(response.data.user);
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
          .post(apiUrl + "posts/", post, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((result) => {
            console.log(result);
            alert("Post publié");
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/_variables";
</style>
