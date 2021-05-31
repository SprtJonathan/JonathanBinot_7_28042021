<template>
  <div class="">
    <div v-if="allComments.length == 0">Aucun commentaire</div>
    <div
      class="comment container card"
      v-for="comment in allComments"
      :key="comment.commentId"
    >
      <div class="content">
        <div class="comment--info">
          <span
            >Posté par <em>{{ comment.username }}</em> le
            <em>{{ comment.writtenOn | formatDate }}</em> <br
          /></span>
          <span v-if="comment.writtenOn != comment.lastUpdated"
            >Dernière modification le
            <em>{{ comment.lastUpdated | formatDate }}</em></span
          >
        </div>
        <div v-html="comment.comment" class="comment--comment card lead"></div>
        <hr />
        <div class="comment--footer">
          <RouterLink
            class="btn btn-secondary button"
            v-if="$store.state.user.user.userId == comment.userId"
            :to="`/comment/${comment.commentId}/edit`"
            >Editer le commentaire</RouterLink
          >
          <button
            type="submit"
            class="btn btn-danger button"
            v-if="
              $store.state.user.user.userId == comment.userId ||
                $store.state.user.user.roleId == 1
            "
            @click="deleteComment(comment.commentId)"
          >
            Supprimer le commentaire
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import EditComment from "./EditComment";

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  name: "ShowComments",
  data() {
    return {
      user: "",
      comment: {
        userId: "",
        postId: "",
        comment: "",
      },
      allComments: [],
      isAuthorUser: false,
    };
  },
  components: {
    //EditComment,
  },
  props: ["post"],
  created() {
    axios
      .get(apiUrl + "auth/users", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
        this.loadComments();
      })
      .catch((err) => console.log(err));
  },
  methods: {
    loadComments() {
      axios
        .get(apiUrl + "comments/" + this.post.postId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("Commentaires : ", response.data);
          this.allComments = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComment(commentId) {
      let errorString = [];
      axios
        .delete(apiUrl + "comments/" + commentId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((result) => {
          console.log(result);
          alert("Commentaire supprimé");
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
  },
};
</script>

<style lang="scss">
.titre {
  color: #122442;
  font-size: 2em;
  @media screen and (max-width: 1000px) {
    font-size: 1em;
  }
}
.post {
  margin-top: 5rem;
}
</style>
