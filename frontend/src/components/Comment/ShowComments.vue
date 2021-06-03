<template>
  <div class="comments">
    <div v-if="allComments.length == 0">Aucun commentaire</div>
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
                <em>{{ comment.username }}</em>
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
            class="comment--btn btn"
            v-if="
              $store.state.user.user.userId == comment.userId ||
                $store.state.user.user.roleId == 1
            "
            :to="`/comment/${comment.commentId}/edit`"
            ><b-icon icon="pencil-square"></b-icon
          ></RouterLink>
          <button
            type="submit"
            class="comment--btn btn"
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
@import "@/modules/_variables";
.comment {
  &--content {
    margin: 1rem;
    background-color: white;
  }
  &--comment {
    border: 0.5px $secondary-color solid;
    padding: 1rem;
  }
  &--info {
    display: flex;
    flex-direction: row;
    color: $primary-color;
    font-size: 0.7em;
    border: 0.5px $primary-color solid;
    border-radius: .5rem .5rem 0rem 0rem;
    border-bottom: 0px transparent;
    &--creation {
      padding: 0.5rem;
    }
    &--update {
      padding: 0.5rem;
    }
  }
  &--footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: rgb(199, 199, 199);
    height: 2rem;
  }
  &--btn {
    margin: 0 2rem;
    align-items: center;
    justify-items: center;
    align-content: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    background-color: white;
  }
}

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
