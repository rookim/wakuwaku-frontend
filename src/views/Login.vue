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
  <body>
    <div class="main-container p-0">
      <section id="contact" class="lg">
        <div class="container">
          <div class="row v-center">
            <!-- / column -->
            <div class="col-lg-5 mx-auto">
              <h1>Login</h1>
              <div class="promo-box">
                <form
                  class="needs-validation"
                  id="form-validation5"
                  novalidate="novalidate"
                  v-on:submit.prevent="submit()"
                >
                  <div class="row">
                    <ul>
                      <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
                    </ul>
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          v-model="newSessionParams.email"
                          type="text"
                          class="form-control"
                          id="contact-subject5"
                          name="inputSubject5"
                          placeholder="&#xf2bd; Email"
                          style="font-family: 'Font Awesome 5 Free', sans-serif !important; font-weight: 400"
                        />
                      </div>
                      <!-- / form-group -->
                    </div>
                    <!-- / column -->
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          v-model="newSessionParams.password"
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
                  </div>
                  <!-- / row -->

                  <input v-on:click="submit()" type="submit" class="btn btn-primary btn-submit" value="Submit" />
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
  </body>

  <!-- OLD CODE -->
  <!-- <div class="login">
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
  </div> -->
</template>
