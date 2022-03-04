<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          console.log("User successfully logged in!", response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password!"];
        });
    },
  },
};
</script>

<template>
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="text" v-model="newSessionParams.email" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="newSessionParams.password" />
      </div>
      <input type="submit" value="Login!" />
    </form>
  </div>
</template>

<style></style>
