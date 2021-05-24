<template>
  <div class="auth">
    <Login v-show="!isHidden" msg="Connexion" />
    <div class="already-button container" v-show="!isHidden">
      <p>
        Pas encore inscrit?
        <button class="link" href="" @click="isHidden = true">
          S'inscrire
        </button>
      </p>
    </div>
    <Register v-show="isHidden" msg="Inscription" />
    <div class="already-button container" v-show="isHidden">
      <p>
        Déjà inscrit?
        <button class="link" href="" @click="isHidden = false">
          Se connecter
        </button>
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

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
@import "../modules/_variables";
img {
  width: 320px;
}
button {
  text-decoration: wavy;
  background: $secondary-color;
  border: 0;
  border-radius: 50px;
  padding: 0.25rem 0.5rem;
  color: $primary-color;
  transition: 0.3s;
  &:hover {
    background: $primary-color;
    color: $secondary-color;
    transition: 0.3s;
  }
}
.already-button {
  background-color: $primary-color;
  padding: 0.5rem;
  position: relative;
  z-index: 14;
  border-radius: 0px 0px 15px 15px;
  p {
    margin: auto;
    color: white;
  }
}
</style>
