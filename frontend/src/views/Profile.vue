<template>
  <div>
    <UserProfile />
  </div>
</template>

<script>
import UserProfile from "@/components/User/UserProfile.vue";

export default {
  data() {
    return {
      user: "",
    };
  },
  components: {
    UserProfile,
  },
};
</script>
