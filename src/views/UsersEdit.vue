<script>
import axios from "axios";
import GoBack from "@/components/GoBack";
export default {
  components: {
    GoBack,
  },
  data: function () {
    return {
      editUserParams: {},
      errors: [],
    };
  },
  created: function () {
    // need this to be automatically run to fetch current user info
    axios.get("/users/me").then((response) => {
      console.log("Status:", response.status, "- Current user successfully loaded");
      this.editUserParams = response.data;
    });
  },
  methods: {
    submit: function () {
      axios
        .patch("/users/me", this.editUserParams)
        .then((response) => {
          this.editUserParams = response.data;
          console.log("Status:", response.status, "- User info updated!");
          this.$router.push("/me");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="users-edit">
    <GoBack />
    <form v-on:submit.prevent="submit()">
      <h1>Edit Account</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="text" v-model="editUserParams.email" />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" v-model="editUserParams.username" />
      </div>
      <div>
        <label>Phone number:</label>
        <input type="text" v-model="editUserParams.phone_number" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="editUserParams.password" />
      </div>
      <div>
        <label>Confirm password:</label>
        <input type="password" v-model="editUserParams.password_confirmation" />
      </div>
      <br />
      <input type="submit" value="Update" />
    </form>
  </div>
</template>

<style></style>
