<script>
export default {
  data: function () {
    return {
      // set a variable on page load
      isLoggedIn: !!localStorage.jwt,
      flashMessage: null,
    };
  },
  watch: {
    // watching for route changes. as soon as the route changes, execute a function
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.flashMessage = localStorage.flashMessage;
      localStorage.removeItem("flashMessage");
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
    <router-link v-if="isLoggedIn" to="/favorites">Favorites</router-link>
    |
    <router-link v-if="isLoggedIn" to="/calendar">Calendar</router-link>
    |
    <router-link v-if="isLoggedIn" to="/me">Account</router-link>
    |
    <router-link v-if="isLoggedIn" to="/logout">Logout</router-link>
  </div>
  <div v-if="flashMessage">
    {{ flashMessage }}
    <button v-on:click="flashMessage = ''">Dismiss</button>
  </div>
  <router-view />
</template>
