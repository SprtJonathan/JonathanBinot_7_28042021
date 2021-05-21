<template>
  <div>
    <article class="profile-card card">
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
      <div class="current-username">
        <h5>Nom d'utilisateur</h5>
        <p class="current-username--text">{{ user.username }}</p>
      </div>
      <div class="current-fname">
        <h5>Prénom :</h5>
        <p>{{ user.fname }}</p>
      </div>
      <div class="current-lname">
        <h5>Nom de famille :</h5>
        <p>{{ user.lname }}</p>
      </div>
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
  methods: {
    uploadPicture() {
      /*const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webm",
      ];
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(file.name);
      if (!allowedTypes.includes(file.type)) {
        this.message = "Seul les images sont autorisées!";
      }
      if (file.size > 5000000) {
        this.message = "Fichier trop volumineux. Taille max : 5Mb";
      }*/
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage);
      const formData = new FormData();
      formData.append("image", this.selectedImage);
      console.log(this.selectedImage.name);
      axios
        .put(apiUrl + "auth/users/" + this.user.userId, FormData, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => {
          console.log("image upload response > ", response);
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
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
.profile-card {
  display: flex;
  margin: auto;
  width: 40%;
  border-radius: 25px;
  .profile-picture {
    &--block {
      position: relative;
      width: 30%;
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
}
</style>
