<template>
  <section>
    <article class="form-block container card">
      <h2>Inscription</h2>
      <label for="username">Nom d'utilisateur</label>
      <div class="username-block">
        <input
          class="form-control"
          id="username"
          type="text"
          autocomplete="username"
          v-model="username"
          placeholder="Nom d'utilisateur"
          required
        />
        <button
          class="btn btn-secondary"
          alt="Générer un pseudonyme aléatoire"
          @click="readRandLine()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-counterclockwise"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
            />
            <path
              d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
            />
          </svg>
        </button>
      </div>

      <label for="fname">Prénom</label>
      <input
        class="form-control"
        id="fname"
        type="text"
        autocomplete="given-name"
        v-model="fname"
        placeholder="Prénom"
        required
      />

      <label for="lname">Nom de famille</label>
      <input
        class="form-control"
        id="lname"
        type="text"
        autocomplete="family-name"        
        v-model="lname"
        placeholder="Nom"
        required
      />

      <label for="email">Adresse email</label>
      <input
        type="email"
        v-model="email"
        class="form-control"
        id="email"
        autocomplete="email"
        aria-describedby="emailHelp"
        placeholder="Email"
        required
      />

      <label for="password">Mot de passe</label>
      <input
        type="password"
        class="form-control"
        id="password"
        autocomplete="new-password"
        v-model="password"
        placeholder="Mot de passe"
        required
      />
      <label for="password">Confirmation du mot de passe</label>
      <input
        type="password"
        class="form-control"
        id="password"
        autocomplete="new-password"
        v-model="passwordConfirmation"
        placeholder="Confirmez le mot de passe"
        required
      />
      <button type="submit" class="btn btn-primary button" @click="register">
        S'inscrire
      </button>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import randomWords from "@/assets/text/randomWords.json";
let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  name: "Register",
  props: {
    msg: String,
  },
  data() {
    return {
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  methods: {
    register() {
      let newUser = {
        username: this.username,
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
      };

      if (this.password == this.passwordConfirmation) {
        axios.post(apiUrl + "auth/register", newUser).then((result) => {
          console.log(result);
          alert("Utilisateur enregistré");
        });
      } else {
        alert("Les mots de passe ne correspondent pas");
      }
    },

    readRandLine() {
      let randIntAdjectives =
        Math.floor(Math.random() * randomWords.adjectives.length) + 0;
      let randIntNames =
        Math.floor(Math.random() * randomWords.names.length) + 0;
      let randIntNumber = JSON.stringify(Math.floor(Math.random() * 999) + 0);
      this.username =
        randomWords.adjectives[randIntAdjectives] +
        randomWords.names[randIntNames] +
        randIntNumber;
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
input {
  display: block;
}
.form-block {
  background-color: $block-background-semitransparent;
  padding: 2%;
  border-radius: 25px 25px 0px 0px;
  margin: auto;
  margin-top: 2%;
}
.username-block {
  display: flex;
  flex-direction: row;
}
.button {
  margin-top: 0.5rem;
}
</style>
