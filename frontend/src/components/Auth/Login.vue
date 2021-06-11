<template>
  <section>
    <article id="form-block" class="form-block-auth container card">
      <h2>Connexion</h2>
      <div class="form-group">
        <label for="credentials">Adresse email ou nom d'utilisateur</label>
        <input
          type="text"
          autocomplete="username"
          v-model="userCredentials.credentials"
          class="form-control"
          id="credentials"
          aria-describedby="emailHelp"
          placeholder="Email ou nom d'utilisateur"
          required
        />

        <label for="password">Mot de passe</label>

        <input
          type="password"
          class="form-control"
          id="password"
          autocomplete="current-password"
          v-model="userCredentials.password"
          placeholder="Mot de passe"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary button" @click="login()">
        Connexion
      </button>
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      userCredentials: {
        credentials: null,
        password: null,
      },
    };
  },
  components: {},
  methods: {
    login() {
      if (
        this.userCredentials.credentials !== null ||
        this.userCredentials.password !== null
      ) {
        axios
          .post(this.$store.state.apiUrl + "auth/login", this.userCredentials)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(localStorage.getItem("token"));
            location.replace(location.origin);
          })
          .catch((error) => {
            let errorMessage = error.response.data.error;
            console.log("erreur: " + error + " test " + error.response.data.error);
            if (errorMessage == undefined) {
              this.$toast.error(
                "Une erreur s'est produite, veuillez réessayer ultérieurement",
                {
                  timeout: 2000,
                }
              );
            } else {
              this.$toast.error(errorMessage, {
                timeout: 2000,
              });
            }
          });
      } else {
        this.$toast.error("Erreur: Les champs sont vides", {
          timeout: 2000,
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/modules/main";
</style>
