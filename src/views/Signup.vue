<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log("New user created!", response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="text" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" v-model="newUserParams.username" />
      </div>
      <div>
        <label>Phone number:</label>
        <input type="text" v-model="newUserParams.phone_number" />
      </div>
      <div>
        <label>Password:</label>
        <input type="text" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Confirm password:</label>
        <input type="text" v-model="newUserParams.password_confirmation" />
      </div>
      <input type="submit" value="Create Account" />
    </form>
  </div>
</template>

<style></style>
