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
          id="login-password"
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
        // Objet qui sera envoyé à l'API pour la connexion
        credentials: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      // Fonction de login
      if (
        this.userCredentials.credentials !== null ||
        this.userCredentials.password !== null
      ) {
        // Si les champs de connexion ne sont pas vides, on envoie les informations
        axios
          .post(this.$store.state.apiUrl + "auth/login", this.userCredentials)
          .then((response) => {
            // Si la requête aboutit et donne des résultats, on stocke le token et l'objet user dans le localStorage afin de permettre une authentification rapide de l'utilisateur
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(localStorage.getItem("token"));
            location.replace(location.origin); // Une fois connecté, on rafraîchit la page.
          })
          .catch((error) => {
            let errorMessage = error.response.data.error; // Si une erreur se produit, on la retourne
            console.log(
              "erreur: " + error + " test " + error.response.data.error
            );
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
