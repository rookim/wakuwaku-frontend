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
  <body>
    <header class="lg bg-black v-center">
      <div class="container">
        <div class="header-content text-center">
          <h2 class="page-title mb-40 text-white">MY ACCOUNT</h2>
        </div>
        <!-- / header-content -->
      </div>
      <!-- / container -->
    </header>
    <div class="main-container p-0">
      <section id="project-info" class="lg">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 mx-auto">
              <div class="promo-box project-info sticky-top top-30">
                <h2 class="mb-15">Account Details</h2>

                <div class="spacer spacer-line-fw border-faded">&nbsp;</div>

                <ul class="list-unstyled">
                  <li class="fs-16 mb-15 title-color">
                    <span class="fw-medium" v-if="currentUser.email">Email:</span>
                    {{ currentUser.email }}
                  </li>
                  <li class="fs-16 mb-15 title-color">
                    <span class="fw-medium" v-if="currentUser.username">Username:</span>
                    {{ currentUser.username }}
                  </li>
                  <li class="fs-16 mb-15 title-color">
                    <span class="fw-medium" v-if="currentUser.phone_number">Phone number:</span>
                    {{ currentUser.phone_number }}
                  </li>
                </ul>

                <div class="spacer spacer-line-fw border-faded">&nbsp;</div>

                <router-link to="/me/edit" class="btn btn-lg btn-primary ml-0 m-5">Edit</router-link>
              </div>
              <!-- / promo-box -->
            </div>
            <!-- / column -->
          </div>
          <!-- / row -->
        </div>
        <!-- / container -->
      </section>
      <!-- / project-info -->
    </div>
    <!-- main-container -->
  </body>

  <!-- OLD CODE
  class names in kebab case or no? YES
  <div class="users-show">
    <h1>Account</h1>
    <p v-if="currentUser.email">Email: {{ currentUser.email }}</p>
    <p v-if="currentUser.username">Username: {{ currentUser.username }}</p>
    <p v-if="currentUser.phone_number">Phone number: {{ currentUser.phone_number }}</p>
    <router-link to="/me/edit">Edit</router-link>
  </div> -->
</template>
