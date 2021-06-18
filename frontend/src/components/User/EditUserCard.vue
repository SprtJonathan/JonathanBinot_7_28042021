<template>
  <div>
    <article id="form-block" class="profile-card card">
      <h2>Informations sur le compte</h2>
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
          accept="image/x-png,image/gif,image/jpeg"
          @change="addImage"
          id="upload-photo"
          class="upload-photo"
        />
        <!-- Boite de dialogue affichant un potentiel message d'erreur -->
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

      <div
        class="passwords"
        v-if="
          adminConnected != 1 ||
            (this.$store.state.user.user.userId == routeUserId &&
              adminConnected == 1)
        "
      >
        <label for="password">Mot de passe actuel</label>
        <input
          type="password"
          class="form-control"
          id="old-password"
          autocomplete="password"
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
      </div>
      <button type="submit" class="btn btn-secondary button" @click="editUser">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      adminConnected: this.$store.state.user.user.roleId,
      user: "",
      file: "",
      password: "",
      newPassword: "",
      formError: "",
      hasError: false,
      routeUserId: this.$route.params.userId,
      errorDialog: null,
      errorText: "",
      maxSize: 2000000,
    };
  },
  created() {
    axios
      .get(
        this.$store.state.apiUrl + "auth/users/" + this.routeUserId,
        {
          headers: { Authorization: "Bearer " + localStorage.token },
        }
      )
      .then((response) => {
        this.user = response.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    addImage() { // Fonction permettant d'ajouter une image de profil
      const file = this.$refs.file.files[0];
      this.file = file;
      this.modifyPicture(); 
    },
    modifyPicture() { // Modification de la photo
      if (this.file.size > this.maxSize) { // Vérification de la taille du fichier
        alert( // On revoie une erreur si le fichier est trop lourd
          "Attention : fichier trop lourd, veuillez changer votre sélection." +
            " Taille du fichier: " +
            this.file.size
        );
      } else { // Sinon on l'envoie à l'API.
        const formData = new FormData();
        formData.append("image", this.file);
        console.log(formData);
        axios
          .put(
            this.$store.state.apiUrl +
              "auth/users/profilepicture/" +
              this.user.userId,
            formData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
                "Content-Type": "image",
              },
            }
          )
          .then((response) => {
            console.log("image upload response > ", response);
            this.$toast.warning("Photo de profil modifiée", {
              timeout: 2000,
            });
            setTimeout(function() {
              location.reload();
            }, 1000);
          })
          .catch((error) => {
            this.$toast.error(error, {
              timeout: 2000,
            });
          });
      }
    },

    errorMessages(testedInput, errorMsg) {
      if (testedInput == true) {
        this.$toast.error(errorMsg, {
          timeout: 8000,
        });
      }
    },

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

      this.errorMessages(
        usernameError,
        "Nom d'utilisateur incorrect " + badValueChar
      );
      this.errorMessages(
        fnameError,
        "Format du prénom incorrect " + badValueChar
      );
      this.errorMessages(
        lnameError,
        "Format du nom de famille incorrect " + badValueChar
      );
      this.errorMessages(
        emailError,
        "Format d'email incorrect " + badValueChar
      );

      if (!this.newPassword && !this.adminConnected) {
        this.$toast.error(
          "Veuillez entrer un nouveau mot de passe ou votre mot de passe actuel",
          {
            timeout: 4000,
          }
        );
      } else {
        if (errorCount != 0) {
          formBoolean = false; // Si des erreurs sont retournées alors on définit la variable comme fausse pour que le formulaire ne puisse pas être envoyé
          console.log(errorString);
          this.formError = errorString.toString();
          this.hasError = true;
        } else {
          let userEdited;
          if (
            this.routeUserId != this.$store.state.user.user.userId &&
            this.adminConnected == 1
          ) {
            // Construction de l'objet contenant les infos utilisateur
            userEdited = {
              username: this.user.username,
              fname: this.user.fname,
              lname: this.user.lname,
              email: this.user.email,
            };
          } else if (this.routeUserId == this.$store.state.user.user.userId) {
            userEdited = {
              username: this.user.username,
              fname: this.user.fname,
              lname: this.user.lname,
              email: this.user.email,
              password: this.password,
              newPassword: this.newPassword,
            };
          }
          console.log(userEdited);

          formBoolean = true; // Si aucune erreur n'est retournée alors on définit la variable comme vraie pour que le formulaire puisse être envoyé

          if (formBoolean == true) {
            let routeUrl;
            if (
              this.adminConnected == 1 &&
              this.routeUserId != this.$store.state.user.user.userId
            ) {
              routeUrl = "auth/users/admin/";
            } else {
              routeUrl = "auth/users/";
            }
            console.log(userEdited);
            axios
              .put(
                this.$store.state.apiUrl + routeUrl + this.user.userId,
                userEdited,
                {
                  headers: { Authorization: "Bearer " + localStorage.token },
                }
              )
              .then((result) => {
                console.log(result);
                this.$toast.warning("Utilisateur modifié", {
                  timeout: 1000,
                });
                setTimeout(function() {
                  location.reload();
                }, 1000);
              })
              .catch((error) => {
                let errorMessage = error.response.data.error;
                console.log(errorMessage);
                this.hasError = true;
                this.$toast.error(errorMessage, {
                  timeout: 2000,
                });
              });
          } else {
            this.$toast.error("Erreur : Nouveau mot de passe erroné", {
              timeout: 2000,
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/modules/main";
</style>
