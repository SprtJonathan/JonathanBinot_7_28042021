<template>
  <section>
    <article id="form-block" class="form-block-auth container card">
      <h2>Inscription</h2>
      <label for="username">Nom d'utilisateur</label>
      <div id="username-block" class="username-block">
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
</template>

<script>
import axios from "axios";
import randomWords from "@/assets/text/randomWords.json";

export default {
  name: "Register",
  data() {
    return {
      username: null,
      fname: null,
      lname: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      formError: "",
      hasError: false,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
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

    register() {
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
        console.log(errorString.toString());
        this.$toast.error(errorString.toString(), {
          timeout: 2000,
        });
        //this.formError = errorString.toString();
        this.hasError = true;
      } else {
        // Construction de l'objet contenant les infos utilisateur
        let newUser = {
          username: this.username,
          fname: this.fname,
          lname: this.lname,
          email: this.email,
          password: this.password,
        };
        console.log("Formulaire validé");
        formBoolean = true; // Si aucune erreur n'est retournée alors on définit la variable comme vraie pour que le formulaire puisse être envoyé

        if (this.password == this.passwordConfirmation && formBoolean == true) {
          axios
            .post(this.$store.state.apiUrl + "auth/register", newUser)
            .then((result) => {
              console.log(result);
              this.isHidden = true;
              this.$toast.success("Utilisateur créé", {
                timeout: 2000,
              });
              setTimeout(function() {
                location.reload();
              }, 1000);
            })
            .catch((error) => {
              let errorMessage = error.response.data.error;
              console.log(errorMessage);
              this.hasError = true;
              //this.formError = errorString.toString();
              if (!errorMessage) {
                this.$toast.error("Une erreur s'est produite, veuillez réessayer ultérieurement", {
                  timeout: 2000,
                });
              } else {
                this.$toast.error(errorMessage, {
                  timeout: 2000,
                });
              }
            });
        } else {
          this.$toast.error("Les mots de passe ne correspondent pas", {
            timeout: 2000,
          });
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/modules/main";
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
