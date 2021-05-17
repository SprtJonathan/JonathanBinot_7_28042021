<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/Auth">Authentification</router-link>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "@/modules/_variables";
body {
  background-image: url('./assets/images/background/1.jpg');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $secondary-color;

    &.router-link-exact-active {
      color: $primary-color;
    }
  }
}
</style>
