<template>
  <div class="auth">
    <Login v-show="!isHidden" msg="Connexion" :isHidden="isHidden" />
    <div class="already-button container" v-show="!isHidden">
      <p>
        Pas encore inscrit?
        <button class="already-button--button" href="" @click="isHidden = true">
          S'inscrire
        </button>
      </p>
    </div>
    <Register v-show="isHidden" msg="Inscription" :isHidden="isHidden" />
    <div class="already-button container" v-show="isHidden">
      <p>
        Déjà inscrit?
        <button class="already-button--button" href="" @click="isHidden = false">
          Se connecter
        </button>
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Auth/Login.vue";
import Register from "@/components/Auth/Register.vue";

export default {
  name: "auth",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      isHidden: false,
    };
  },
  methods: {
    hideForm() {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/modules/main";
</style>
