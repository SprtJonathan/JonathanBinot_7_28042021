<template>
  <div class="create-comment">
    <button
      class="btn button-collapse btn-pill"
      :v-for="post in allPosts"
      v-b-toggle="'comments' + post.postId"
    >
      <h2 @commentsNumber="updateCommentsNumber">
        Commentaires <span class="comments-number">{{ numberOfComments }}</span>
      </h2>
    </button>
    <b-collapse
      class="collapsible"
      :v-for="post in allPosts"
      :id="'comments' + post.postId"
    >
      <WriteComment :post="post" />
      <hr />
      <ShowComments :post="post" @commentsNumber="updateCommentsNumber" />
    </b-collapse>
  </div>
</template>

<script>
import axios from "axios";
import WriteComment from "@/components/Comment/WriteComment";
import ShowComments from "@/components/Comment/ShowComments.vue";

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
      numberOfComments: "",
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
      .get(this.$store.state.apiUrl + "auth/users/" + userData.user.userId, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(response.data.user);
      })
      .catch((error) => {
        let errorMessage = error.response.data.error;
        console.log(errorMessage);
        this.$toast.error(errorMessage, {
          timeout: 2000,
        });
      });
  },
  methods: {
    updateCommentsNumber(value) {
      console.log("Onmbre doné : " + value);
      this.numberOfComments = value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
