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
      errors: [],
    };
  },
  validations: function () {
    return {
      newUserParams: {
        username: { required, minLength: minLength(3) },
        // sameAs validation did not work for some reason. using backend validation to catch mismatched passwords
        password: { required, requiredChars },
        password_confirmation: { required },
        email: { required, email },
      },
    };
  },
  methods: {
    submit: function () {
      // when users enter mismatched passwords, but then fix it without refreshing their page. it'll come back if it's still mismatched when they click the button
      this.errors = [];
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
        alert("Failed to submit. Please make sure account information includes requirements.");
      }
    },
  },
};
</script>

<template>
  <body>
    <div class="main-container p-0">
      <section id="contact" class="lg">
        <div class="container">
          <div class="row v-center">
            <div class="col-lg-8 mx-auto">
              <h1>Signup</h1>
              <div class="promo-box">
                <form
                  class="needs-validation"
                  id="form-validation5"
                  novalidate="novalidate"
                  v-on:submit.prevent="submit()"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          v-model="newUserParams.username"
                          type="text"
                          class="form-control"
                          id="contact-name5"
                          name="inputName5"
                          placeholder="&#xf2bd;  Username"
                          required=""
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                        <!-- ERROR HANDLING -->
                        <div v-if="v$.newUserParams.username.$error">
                          {{ v$.newUserParams.username.required.$message }}
                        </div>
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->

                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          v-model="newUserParams.email"
                          type="email"
                          class="form-control"
                          id="contact-email5"
                          name="inputEmail5"
                          placeholder="&#xf0e0; Email"
                          required=""
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                        <!-- ERROR HANDLING -->
                        <div v-if="v$.newUserParams.email.$error">
                          {{ v$.newUserParams.email.email.$message }}
                        </div>
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->

                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          v-model="newUserParams.phone_number"
                          type="text"
                          class="form-control"
                          id="contact-subject5"
                          name="inputSubject5"
                          placeholder="&#xf4ad; Phone Number (optional)"
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          v-model="newUserParams.password"
                          type="password"
                          class="form-control"
                          id="contact-subject5"
                          name="inputSubject5"
                          placeholder="&#xf059; Password"
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
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
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          v-model="newUserParams.password_confirmation"
                          type="password"
                          class="form-control"
                          id="contact-subject5"
                          name="inputSubject5"
                          placeholder="&#xf059; Confirm Password"
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                        <!-- ERROR HANDLING not by Vuelidate -->
                        <small
                          v-if="
                            newUserParams.password_confirmation &&
                            newUserParams.password !== newUserParams.password_confirmation
                          "
                        >
                          Passwords must match!
                        </small>
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->
                  </div>
                  <!-- / row -->

                  <input type="submit" class="btn btn-primary btn-submit" value="Submit" />
                </form>
                <!-- / form-group -->
              </div>
              <!-- / promo-box -->
            </div>
            <!-- / column -->
          </div>
          <!-- / row -->
        </div>
        <!-- / container -->
      </section>
      <!-- / contact -->
    </div>
    <!-- main-container -->
  </body>

  <!-- OLD CODE -->
  <!-- <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <div>
        <label>Email:</label>
        <input type="text" v-model="newUserParams.email" />
        <div v-if="v$.newUserParams.email.$error">
          {{ v$.newUserParams.email.email.$message }}
        </div>
      </div>
      <div>
        <label>Username:</label>
        <input type="text" v-model="newUserParams.username" />

        <div v-if="v$.newUserParams.username.$error">{{ v$.newUserParams.username.required.$message }}</div>
      </div>
      <div>
        <label>Phone number (optional):</label>
        <input type="text" v-model="newUserParams.phone_number" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
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
      <div>
        <label>Confirm password:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
        <small
          v-if="newUserParams.password_confirmation && newUserParams.password !== newUserParams.password_confirmation"
        >
          Passwords must match!
        </small>
      </div>
      <ul>
        <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
      </ul>
      <input type="submit" value="Create Account" />
    </form>
  </div> -->
</template>
