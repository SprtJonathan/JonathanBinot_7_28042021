<template>
  <div>
    <section>
      <article id="form-block" class="form-block container card">
        <h2>Informations utilisateur</h2>
        <label for="username">Nom d'utilisateur</label>
        <div id="username-block" class="username-block">
          <input
            class="form-control"
            id="username"
            type="text"
            autocomplete="username"
            v-model="username"
            :placeholder="user.username"
            required
          />
        </div>

        <label for="fname">Prénom</label>
        <input
          class="form-control"
          id="fname"
          type="text"
          autocomplete="given-name"
          v-model="fname"
          :placeholder="user.fname"
          required
        />

        <label for="lname">Nom de famille</label>
        <input
          class="form-control"
          id="lname"
          type="text"
          autocomplete="family-name"
          v-model="lname"
          :placeholder="user.lname"
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
          :placeholder="user.email"
          required
        />

        <label for="password">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="old-password"
          autocomplete="new-password"
          v-model="password"
          placeholder="Ancien mot de passe"
          required
        />
        <label for="password">Confirmation du mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="password"
          autocomplete="new-password"
          v-model="passwordConfirmation"
          placeholder="Nouveau mot de passe"
          required
        />
        <button type="submit" class="btn btn-primary button" @click="register">
          S'inscrire
        </button>
      </article>
      <div
        v-show="hasError"
        id="errorAlert"
        title="BootstrapVue"
        class="container alert-danger"
        static
        no-auto-hide
      >
        {{ formError }}
      </div>
    </section>
    <!--<article class="account-info card">
      <p>Email : {{ user.email }}</p>
      <p>Compte créé le : {{ user.createdOn }}</p>

      <div class="edit-username">
        <input class="edit-username--input" />
      </div>
    </article>-->
  </div>
</template>

<script>
import axios from "axios";

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

export default {
  data() {
    return {
      user: "",
      selectedImage: null,
    };
  },
  created() {
    axios
      .get(apiUrl + "auth/", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
        //console.log(response.data.user);
      })
      .catch((err) => console.log(err));
  },
};
</script>
