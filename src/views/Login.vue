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
          localStorage.setItem("flashMessage", "Successfully logged in!");
          console.log("User successfully logged in!");
          this.$router.push("/");
          // do another axios request to grab user info in order to display username
          axios
            .get("/users/me")
            .then((response) => {
              console.log(response.data);
              localStorage.setItem("username", response.data.username);
            })
            .catch((error) => {
              console.log(error.response.data.errors);
              this.errors = error.response;
            });
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
        <input type="password" v-model="newSessionParams.password" />
      </div>
      <input type="submit" value="Login!" />
    </form>
  </div>
</template>
