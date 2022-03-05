<script>
import axios from "axios";
export default {
  data: function () {
    return {
      currentUser: {},
    };
  },
  created: function () {
    axios
      .get("/users/me")
      .then((response) => {
        console.log(response.data);
        this.currentUser = response.data;
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response;
      });
  },
};
</script>

<template>
  <!-- class names in kebab case or no? YES-->
  <div class="users-show">
    <h1>Account</h1>
    <!-- v-if logic to not show all this information if user not logged in (for now) -->
    <p v-if="currentUser.email">Email: {{ currentUser.email }}</p>
    <p v-if="currentUser.username">Username: {{ currentUser.username }}</p>
    <p v-if="currentUser.phone_number">Phone number: {{ currentUser.phone_number }}</p>
    <router-link to="/me/edit">Edit</router-link>
  </div>
</template>
