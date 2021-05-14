<template>
 <section>
    Connexion
    <article>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Mot de passe" />
      <button @click="login">Connexion</button>
    </article>
  </section>
</template>

<script>
import axios from 'axios';
let apiPort = "3000"
let apiUrl = 'http://localhost:'+ apiPort + '/api/';

export default {
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
        let existingUser = {
            email: this.email,
            password: this.password,
        }
        axios.post(apiUrl + 'auth/login', existingUser)
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
</style>
