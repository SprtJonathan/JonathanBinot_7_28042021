<template>
  <div class="create-comment">
    <button
      class="btn button-collapse btn-pill"
      :v-for="post in allPosts"
      v-b-toggle="'comments' + post.postId"
    >
      <h2>Commentaires</h2>
    </button>
    <b-collapse class="collapsible" :v-for="post in allPosts" :id="'comments' + post.postId">
      <WriteComment :post="post" />
      <hr />
      <ShowComments :post="post" />
    </b-collapse>
  </div>
</template>

<script>
import axios from "axios";
import WriteComment from "@/components/Comment/WriteComment";
import ShowComments from "@/components/Comment/ShowComments.vue";
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  name: "CreatePost",
  data() {
    return {
      user: "",
      formError: "",
      hasError: false,
      editorOption: {
        // Some Quill options...
      },
    };
  },
  props: ["post", "allPosts"],
  components: {
    WriteComment,
    ShowComments,
  },
  created() {
    let userData = this.$store.state.user;
    console.log("Le poste est" + this.post.postId);
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
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
