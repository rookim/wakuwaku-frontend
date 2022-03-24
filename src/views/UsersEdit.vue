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
          localStorage.setItem("flashMessage", "User info updated ^___^");
          this.$router.push("/me");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    deleteUser: function () {
      if (confirm("Are you sure you want to delete your account? This can't be undone!")) {
        axios
          .delete("/users/me")
          .then((response) => {
            console.log(response.data);
            this.$router.push("/signup");
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            localStorage.removeItem("accessToken");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
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
            <!-- / column -->
            <div class="col-lg-5 mx-auto">
              <GoBack />
              <a @click="deleteUser()" class="btn btn-xs btn-danger pill go-back-button float-end">
                <span class="fas mx-auto"></span>
                <span>DELETE</span>
              </a>
              <div class="promo-box">
                <form
                  class="needs-validation"
                  id="form-validation5"
                  novalidate="novalidate"
                  v-on:submit.prevent="submit()"
                >
                  <ul>
                    <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
                  </ul>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          v-model="editUserParams.username"
                          type="text"
                          class="form-control"
                          id="contact-name5"
                          name="inputName5"
                          placeholder="&#xf2bd;  Username"
                          required=""
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->

                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          v-model="editUserParams.email"
                          type="email"
                          class="form-control"
                          id="contact-email5"
                          name="inputEmail5"
                          placeholder="&#xf0e0; Email"
                          required=""
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->

                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          v-model="editUserParams.phone_number"
                          type="text"
                          class="form-control"
                          id="contact-subject5"
                          name="inputSubject5"
                          placeholder="&#xf4ad; Phone Number"
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->

                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          v-model="editUserParams.password"
                          type="password"
                          class="form-control"
                          id="contact-subject5"
                          name="inputSubject5"
                          placeholder="&#xf059; Password"
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->

                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          v-model="editUserParams.password_confirmation"
                          type="password"
                          class="form-control"
                          id="contact-subject5"
                          name="inputSubject5"
                          placeholder="&#xf059; Confirm Password"
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->
                  </div>
                  <!-- / row -->
                  <input type="submit" class="btn btn-primary pill btn-submit" value="Submit" />
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
  <!-- <div class="users-edit">
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
  </div> -->
</template>
