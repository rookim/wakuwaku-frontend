<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { helpers, required, email, minLength } from "@vuelidate/validators";

const requiredChars = helpers.regex(
  /(?=.*[A-Z])/, // at least one uppercase letter
  /^(?=.*[a-z])/, // at least one lowercase letter
  /^(?=.*[0-9])/, // at least one digit
  /^(?=.*[!@$?])/, // at least one special character
  /^.{6,}$/ // at least 6 characters
);

export default {
  setup: function () {
    return {
      v$: useVuelidate(),
    };
  },
  data: function () {
    return {
      newUserParams: { username: "", password: "", password_confirmation: "", email: "" },
      // errors: [],
    };
  },
  validations: function () {
    return {
      newUserParams: {
        username: { required, minLength: minLength(3) },
        password: { required, requiredChars },
        password_confirmation: { required },
        email: { required, email },
      },
    };
  },
  methods: {
    submit: function () {
      // need to validate form before submitting
      this.v$.$validate();
      console.log(this.v$);
      if (!this.v$.newUserParams.$error) {
        axios
          .post("/users", this.newUserParams)
          .then((response) => {
            console.log("Status:", response.status, "- New user created!");
            localStorage.setItem("flashMessage", "Thanks for signing up :)");
            this.$router.push("/login");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      } else {
        alert("Failed to submit. Please make sure information includes requirements.");
      }
    },
  },
};
</script>

<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <!-- <ul>
        <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
      </ul> -->
      <div>
        <label>Email:</label>
        <input type="text" v-model="newUserParams.email" />
        <!-- ERROR HANDLING -->
        <!-- checks for validity of email address entered -->
        <div v-if="v$.newUserParams.email.$error">
          {{ v$.newUserParams.email.email.$message }}
        </div>
      </div>
      <br />
      <div>
        <label>Username:</label>
        <input type="text" v-model="newUserParams.username" />
        <!-- ERROR HANDLING -->
        <div v-if="v$.newUserParams.username.$error">{{ v$.newUserParams.username.required.$message }}</div>
      </div>
      <br />
      <div>
        <label>Phone number (optional):</label>
        <input type="text" v-model="newUserParams.phone_number" />
      </div>
      <br />
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
        <!-- ERROR HANDLING -->
        <div v-if="v$.newUserParams.password.$error">
          <small>Password must contain:</small>
          <br />
          <small>6 characters minimum</small>
          <br />
          <small>At least 1 special character: ! ? @ $</small>
          <br />
          <small>At least 1 uppercase letter</small>
          <br />
          <small>At least 1 lowercase letter</small>
          <br />
          <small>At least 1 number</small>
        </div>
      </div>
      <br />
      <div>
        <label>Confirm password:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
        <br />
        <small
          v-if="newUserParams.password_confirmation && newUserParams.password !== newUserParams.password_confirmation"
        >
          Passwords must match!
        </small>
      </div>
      <br />
      <input type="submit" value="Create Account" />
    </form>
  </div>
</template>

<style>
.is_valid {
  color: rgba(136, 152, 170, 0.8);
}
.is_valid:before {
  width: 100%;
}
</style>
