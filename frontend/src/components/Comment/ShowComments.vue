<template>
  <div class="comments">
    <div v-if="allComments.length == 0">
      <p class="text-center text">Aucun commentaire</p>
    </div>
    <div
      class="comment--content"
      v-for="comment in allComments"
      :key="comment.commentId"
    >
      <div class="content">
        <div class="comment--info">
          <div class="comment--info--creation">
            <p>
              Posté par
              <RouterLink :to="`/user/${post.userId}`">
                <span v-show="comment.roleId != 1" class="regular">{{
                  comment.username
                }}</span>
                <span v-show="comment.roleId == 1" class="admin">{{
                  comment.username
                }}</span>
              </RouterLink>
              le <em>{{ comment.writtenOn | formatDate }}</em> <br />
            </p>
          </div>
          <div
            class="comment--info--update"
            v-if="comment.writtenOn != comment.lastUpdated"
          >
            <p>
              Dernière modification le
              <em>{{ comment.lastUpdated | formatDate }}</em>
            </p>
          </div>
        </div>
        <div v-html="comment.comment" class="comment--comment lead"></div>
        <div class="comment--footer">
          <RouterLink
            class="comment--btn--button"
            v-if="
              $store.state.user.user.userId == comment.userId ||
                $store.state.user.user.roleId == 1
            "
            :to="`/comment/${comment.commentId}/edit`"
            ><b-icon icon="pencil-square"></b-icon
          ></RouterLink>
          <button
            type="submit"
            class="comment--btn--button"
            v-if="
              $store.state.user.user.userId == comment.userId ||
                $store.state.user.user.roleId == 1
            "
            @click="deleteComment(comment.commentId)"
          >
            <b-icon icon="trash"></b-icon>
          </button>
          <hr />
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
      commentsNumber: "",
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
          //console.log("Commentaires : ", response.data);
          this.allComments = response.data;
          this.commentsNumber = this.allComments.length;
          console.log("Le nombre : " + this.commentsNumber)
          this.$emit("commentsNumber", this.commentsNumber);
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
          this.$toast("Commentaire supprimé", {
            timeout: 2000,
          });
          this.loadComments();
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
@import "@/modules/main";
</style>
