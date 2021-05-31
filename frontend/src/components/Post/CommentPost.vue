<template>
  <div class="create-post container card">
    <h3>Commentaires</h3>
    <WriteComment :post="post" />
    <ShowComments :post="post" />
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
  props: ["post"],
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
@import "@/modules/_variables";
</style>
