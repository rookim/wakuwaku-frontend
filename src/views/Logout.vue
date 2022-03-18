<script>
import axios from "axios";
export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.setItem("flashMessage", "You're logged out. Come back soon! :D");
    this.$router.push("/login");
  },
};
</script>

<template>
  <div class="logout"></div>
</template>
