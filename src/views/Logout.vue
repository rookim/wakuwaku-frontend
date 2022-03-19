<script>
import axios from "axios";
export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    // log out of google
    try {
      this.$gAuth.signOut();
      // when signing out of google account, it's filtering out all google events to only display anime events
    } catch (error) {
      console.error(error);
    }
    localStorage.setItem("flashMessage", "You're logged out. Come back soon! :D");
    this.$router.push("/login");
  },
};
</script>

<template>
  <div class="logout"></div>
</template>
