<template>
  <section>
    Inscription
    <article>
      <input type="text" v-model="username" placeholder="Nom d'utilisateur" />
      <input type="text" v-model="fname" placeholder="Prénom" />
      <input type="text" v-model="lname" placeholder="Nom" />
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Mot de passe" />
      <button @click="register">S'inscrire</button>
    </article>
  </section>
</template>

<script>
import axios from 'axios';
let apiPort = "3000"
let apiUrl = 'http://localhost:'+ apiPort + '/api/';

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
        }
        axios.post(apiUrl + 'auth/register', newUser)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  color: #42b983;
}
input {
  display: block;
}
</style>
