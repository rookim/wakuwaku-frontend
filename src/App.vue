<script>
export default {
  data: function () {
    return {
      // set a variable on page load
      isLoggedIn: !!localStorage.jwt,
    };
  },
  watch: {
    // watching for route changes. as soon as the route changes, execute a function
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<template>
  <div id="nav">
    <router-link to="/">Search Anime</router-link>
    |
    <router-link v-if="!isLoggedIn" to="/signup">Signup</router-link>
    |
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    |
    <router-link v-if="isLoggedIn" to="/logout">Logout</router-link>
    |
    <router-link v-if="isLoggedIn" to="/favorites">Favorites</router-link>
    |
    <router-link v-if="isLoggedIn" to="/me">Account</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
