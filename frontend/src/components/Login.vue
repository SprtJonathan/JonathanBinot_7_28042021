<template>
  <section>
    <article id="form-block" class="form-block container card">
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
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      userCredentials: {
        credentials: null,
        password: null,
      },
      msg: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  components: {},
  methods: {
    login() {
      /*let existingUser = {
        credentials: this.credentials,
        password: this.password,
      };*/
      if (this.userCredentials.credentials !== null || this.userCredentials.password !== null) {
        axios
          .post(apiUrl + "auth/login", this.userCredentials)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            location.replace(location.origin);
          })
          .catch((error) => console.log(error));
      } else {
        console.log("Erreur est survenue !");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../modules/_variables";
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: $primary-color;
}

.form-block {
  background-color: $block-background-semitransparent;
  padding: 2%;
  border-radius: 25px 25px 0px 0px;
  margin: auto;
  margin-top: 2%;
}
section {
  position: relative;
  z-index: 15;
}
.button {
  margin-top: 0.5rem;
}
</style>
