<template>
  <div class="home">
    <Auth v-show="!isUserConnected" />
    <CreatePost v-show="isUserConnected" />
    <hr />
    <ShowPosts v-show="isUserConnected" />
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";
import CreatePost from "@/components/Post/CreatePost.vue";
import ShowPosts from "@/components/Post/ShowPosts.vue";

export default {
  name: "Home",
  computed: {
    isUserConnected() { // On vérifie si l'uilisateur est connecté
      return this.$store.getters["user/isUserConnected"];
    },
  },
  components: {
    Auth,
    CreatePost,
    ShowPosts,
  },
};
</script>

<style scoped lang="scss">
@import "@/modules/main";
</style>
