<template>
  <div class="home">
    <CreatePost />
    <ShowPosts />
  </div>
</template>

<script>
import CreatePost from "@/components/Post/CreatePost.vue";
import ShowPosts from "@/components/Post/ShowPosts.vue";

export default {
  //v-show="isUserConnected"

  name: "Home",
  isUserConnected() {
    return this.$store.getters["user/isUserConnected"];
  },
  components: {
    CreatePost,
    ShowPosts,
  },
};
</script>

<style scoped lang="scss">
@import "../modules/_variables";
.home {
  margin: 1em;
}
</style>
