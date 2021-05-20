<template>
  <div>
    <UserProfile />

    <button type="submit" class="btn btn-warning button" @click="logout()">
      <h2 class="">
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
        Se déconnecter {{ user.username }}
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
      </h2>
    </button>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";

export default {
  data() {
    return {
      user: "",
    };
  },
  components: {
    UserProfile,
  },
  methods: {},
};
</script>

<style scoped lang="scss"></style>
