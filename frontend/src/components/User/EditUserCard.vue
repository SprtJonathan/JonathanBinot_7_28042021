<template>
  <div>
    <section>
      <article id="form-block" class="form-block container card">
        <h2>Informations utilisateur</h2>
        <div class="profile-picture--block shadow-sm">
          <img
            class="profile-picture--image"
            :src="user.profilePictureUrl"
            alt="Image de profil"
          />
          <label for="upload-photo"
            ><b-icon icon="upload" class="profile-picture--upload"></b-icon
          ></label>
          <input
            type="file"
            ref="file"
            accept="image/*"
            @change="uploadPicture()"
            id="upload-photo"
            class="upload-photo"
          />
        </div>
        <label for="username">Nom d'utilisateur</label>
        <div id="username-block" class="username-block">
          <input
            class="form-control"
            id="username"
            type="text"
            autocomplete="username"
            v-model="user.username"
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
          v-model="user.fname"
          :placeholder="user.fname"
          required
        />

        <label for="lname">Nom de famille</label>
        <input
          class="form-control"
          id="lname"
          type="text"
          autocomplete="family-name"
          v-model="user.lname"
          :placeholder="user.lname"
          required
        />

        <label for="email">Adresse email</label>
        <input
          type="email"
          v-model="user.email"
          class="form-control"
          id="email"
          autocomplete="email"
          aria-describedby="emailHelp"
          :placeholder="user.email"
          required
        />

        <label for="password">Mot de passe actuel</label>
        <input
          type="password"
          class="form-control"
          id="old-password"
          autocomplete="new-password"
          v-model="password"
          placeholder="Ancien mot de passe"
          required
        />
        <label for="password">Nouveau mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="password"
          autocomplete="new-password"
          v-model="newPassword"
          placeholder="Nouveau mot de passe"
          required
        />
        <button
          type="submit"
          class="btn btn-secondary button"
          @click="editUser"
        >
          Modifier les informations
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
    <article class="account-info card">
      <p>Compte créé le : {{ user.createdOn }}</p>
      <p v-show="wasAccountUpdated">
        Dernière modification le : {{ user.lastUpdated }}
      </p>
    </article>
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
      wasAccountUpdated: false,
      password: "",
      newPassword: "",
      formError: "",
      hasError: false,
    };
  },
  created() {
    let userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData.userId);
    axios
      .get(apiUrl + "auth/users/" + userData.userId, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(response.data.user);
        if (this.user.createdOn == this.user.lastUpdated) {
          this.wasAccountUpdated = false;
        } else {
          this.wasAccountUpdated = true;
        }
      })
      .catch((err) => console.log(err));
  },
  methods: {
    editUser() {
      /* Vérifications */
      this.formError = "";
      let formBoolean = false;
      // Vérification des caractères via des regex
      let verifyNumbers = /[0-9]/; // Vérification des chiffres uniquement
      let verifyEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Vérification de l'email
      let verifyCharacters = /[*?":{}|<>]/; // Vérification des caractères spéciaux

      // Création de variables pour l'affichage des erreurs
      let usernameError = false;
      let fnameError = false;
      let lnameError = false;
      let emailError = false;

      let badValue = "Format incorrect:";
      let badValueFigure = " - Chiffres interdits";
      let badValueChar = " - Caractères spéciaux interdits";
      let badValueEmail = " Format d'email non autorisé:";

      // Création des variables des champs
      let usernameId = document.getElementById("username");
      let usernameBlock = document.getElementById("username-block");
      let fnameId = document.getElementById("fname");
      let lnameId = document.getElementById("lname");
      let emailId = document.getElementById("email");

      // Récupération des inputs
      let username = usernameId.value;
      let fname = fnameId.value;
      let lname = lnameId.value;
      let email = emailId.value;

      // Fonction permettant de vérifier la validité des différents inputs du formulaire de contact
      function checkFormInput(
        checkedRegex,
        expextedValue,
        inputName,
        inputId,
        errorType
      ) {
        // Variable comptant le nombre d'erreurs
        let errorCount = 0;
        if (checkedRegex == expextedValue) {
          console.log(errorType);
          console.log("Erreur: " + inputName);
          errorCount = 1;
        } else {
          console.log("Champ " + inputId.id + " validé: " + inputName);
        }
        return errorCount;
      }

      // Vérification de la validité des différents inputs
      // Nom d'utilisateur
      let usernameCheck = checkFormInput(
        verifyCharacters.test(username),
        true,
        username,
        usernameBlock,
        badValue + badValueChar
      );

      // Prénom
      let fnameCheck = checkFormInput(
        verifyNumbers.test(fname) | verifyCharacters.test(fname),
        true,
        fname,
        fnameId,
        badValue + badValueFigure + badValueChar
      );

      // Nom de famille
      let lnameCheck = checkFormInput(
        verifyNumbers.test(lname) | verifyCharacters.test(lname),
        true,
        lname,
        lnameId,
        badValue + badValueFigure + badValueChar
      );

      // Email
      let emailCheck = checkFormInput(
        verifyEmail.test(email),
        false,
        email,
        emailId,
        badValueEmail + badValueChar
      );

      // Variable comptant le nombre d'erreurs
      let errorCount = usernameCheck + fnameCheck + lnameCheck + emailCheck;

      function checkError(inputCheck, errorParam) {
        if (inputCheck != 0) {
          errorParam = true;
        }
        console.log("test: " + errorParam);
        return errorParam;
      }

      let errorString = [];

      usernameError = checkError(usernameCheck, usernameError);
      fnameError = checkError(fnameCheck, fnameError);
      lnameError = checkError(lnameCheck, lnameError);
      emailError = checkError(emailCheck, emailError);
      console.log(usernameError);
      console.log(fnameError);
      console.log(lnameError);
      console.log(emailError);

      function errorMessages(testedInput, errorMsg) {
        if (testedInput == true) {
          errorString.push(errorMsg);
        }
      }
      errorMessages(
        usernameError,
        "Nom d'utilisateur incorrect " + badValueChar
      );
      errorMessages(fnameError, "Format du prénom incorrect " + badValueChar);
      errorMessages(
        lnameError,
        "Format du nom de famille incorrect " + badValueChar
      );
      errorMessages(emailError, "Format d'email incorrect " + badValueChar);

      if (errorCount != 0) {
        formBoolean = false; // Si des erreurs sont retournées alors on définit la variable comme fausse pour que le formulaire ne puisse pas être envoyé
        console.log(errorString);
        this.formError = errorString.toString();
        this.hasError = true;
      } else {
        // Construction de l'objet contenant les infos utilisateur
        let userEdited = {
          username: this.user.username,
          fname: this.user.fname,
          lname: this.user.lname,
          email: this.user.email,
          password: this.password,
          newPassword: this.newPassword,
          //profilePictureUrl: this.selectedImage,
        };
        formBoolean = true; // Si aucune erreur n'est retournée alors on définit la variable comme vraie pour que le formulaire puisse être envoyé

        if (formBoolean == true) {
          axios
            .put(apiUrl + "auth/users/" + this.user.userId, userEdited, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((result) => {
              console.log(result);
              alert("Utilisateur modifié");
              location.replace(location.origin);
            })
            .catch((error) => {
              let errorMessage = error.toString();
              errorString.push(errorMessage);
              console.log(errorMessage);
              this.formError = errorString.toString();
              console.log(this.formError);
              this.hasError = true;
              alert("Mot de passe erroné");
            });
        } else {
          alert("Mot de passe erroné");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../modules/_variables";
.upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.form-block {
  display: flex;
  margin: auto;
  width: 80%;
  border-radius: 25px;
  padding: 2rem;
}
.profile-picture {
  &--block {
    position: relative;
    width: 40%;
    margin: 1.5rem auto;
    border-radius: 50%;
  }
  &--image {
    width: 100%;
    border-radius: 50%;
  }

  &--upload {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 15;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    padding: 2rem;
    color: $secondary-color;
    backdrop-filter: blur(2px);
    transition: 500ms ease;
    &:hover {
      cursor: pointer;
      opacity: 1;
      transition: 500ms ease;
    }
  }
}
</style>
