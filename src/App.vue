<script>
export default {
  data: function () {
    return {
      // set a variable on page load
      isLoggedIn: !!localStorage.jwt,
      flashMessage: null,
    };
  },
  watch: {
    // watching for route changes. as soon as the route changes, execute a function
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.flashMessage = localStorage.flashMessage;
      localStorage.removeItem("flashMessage");
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-inverse bg-black">
    <div class="container-fluid">
      <div class="ml-auto">
        <router-link class="navbar-brand" to="/">wakuwaku</router-link>
      </div>

      <button
        class="navbar-toggler collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-toggle-nav-center"
        aria-controls="navbar-toggle-nav-center"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="icon-bar top-bar"></span>
        <span class="icon-bar middle-bar"></span>
        <span class="icon-bar bottom-bar"></span>
        <span class="sr-only">Toggle navigation</span>
      </button>
      <!-- / navbar-toggler -->

      <div class="collapse navbar-collapse" id="navbar-toggle-nav-center">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link last-menu-item" to="/">SEARCH</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link last-menu-item" v-if="isLoggedIn" to="/favorites">FAVORITES</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link last-menu-item" v-if="isLoggedIn" to="/calendar">CALENDAR</router-link>
          </li>
        </ul>
        <!-- / navbar-nav -->
        <div class="collapse navbar-collapse flex-grow-1 text-right">
          <ul class="navbar-nav ms-auto" v-if="!isLoggedIn">
            <li class="navbar-button nav-right-need-space">
              <router-link class="btn btn-sm btn-white btn-primary pill" to="/SIGNUP">
                <i class="far fs-16 mr-5 va-middle"></i>
                <span class="va-middle">SIGNUP</span>
              </router-link>
            </li>
            <li class="navbar-button">
              <router-link class="btn btn-sm btn-white btn-primary pill" to="/login">
                <i class="far fs-16 mr-5 va-middle"></i>
                <span class="va-middle">LOGIN</span>
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto" v-if="isLoggedIn">
            <li class="navbar-button nav-right-need-space">
              <router-link class="btn btn-sm btn-white btn-primary pill" to="/me">
                <i class="far fa-heart fs-16 mr-5 va-middle"></i>
                <span class="va-middle">ACCOUNT</span>
              </router-link>
            </li>
            <li class="navbar-button">
              <router-link class="btn btn-sm btn-white btn-primary pill" to="/logout">
                <i class="far fs-16 mr-5 va-middle"></i>
                <span class="va-middle">LOGOUT</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- / navbar-button -->
      </div>
      <!-- / navbar-collapse -->
    </div>
    <!-- / container-fluid -->
  </nav>

  <!-- START FLASH MESSAGE  -->
  <!-- <div v-if="flashMessage">
    {{ flashMessage }}
    <button v-on:click="flashMessage = null">Dismiss</button>
  </div> -->
  <!-- END FLASH MESSAGE -->
  <body>
    <router-view />
  </body>

  <!-- START FOOTER-WRAPPER -->
  <div class="footer-wrapper bg-body-dark dark">
    <div class="footer-widget-area bg-transparent">
      <div class="container">
        <div class="row">
          <div class="col-xl-3">
            <div class="widget text-center">
              <ul class="list-unstyled list-has-link menu-list mb-0">
                <li class="mb-20 fs-14 title-color fw-medium"></li>
                <li><a href="#x"></a></li>
                <li><a href="#x"></a></li>
                <li class="mb-0"><a href="#x"></a></li>
              </ul>
              <!-- / list-unstyled -->
            </div>
            <!-- / widget -->
          </div>
          <!-- / column -->

          <div class="col-xl-6">
            <div class="widget text-center">
              <h6 class="widget-title mb-20 fs-14 title-color fw-medium">GET IN TOUCH :)</h6>
              <a href="https://rookim.github.io/" class="d-block mb-20 fs-26 fw-bold text-white opc-100">
                rookim.github.io
              </a>
              <p>
                <a href="https://github.com/rookim" class="ext-link mr-20"><i class="fs-20 fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/rookim/" class="text-link mr-20">
                  <i class="fs-20 fab fa-linkedin"></i>
                </a>
                <a href="https://gist.github.com/rookim" class="text-link mr-20">
                  <i class="fs-20 fab fa-dribbble"></i>
                </a>
                <a href="mailto:rookim4@gmail.com" class="text-link mr-20">
                  <i class="fs-20 far fa-envelope"></i>
                </a>
              </p>
            </div>
            <!-- / widget -->
          </div>
          <!-- / column -->

          <div class="col-xl-3">
            <div class="widget text-center">
              <ul class="list-unstyled list-has-link menu-list mb-0">
                <li class="mb-20 fs-14 title-color fw-medium"></li>
                <li><a href="#x"></a></li>
                <li><a href="#x"></a></li>
                <li class="mb-0"><a href="#x"></a></li>
              </ul>
              <!-- / list-unstyled -->
            </div>
            <!-- / widget -->
          </div>
          <!-- / column -->
        </div>
        <!-- / row -->
      </div>
      <!-- / container -->
    </div>
    <!-- / footer-widget-area -->
  </div>
  <!-- END FOOTER-WRAPPER -->

  <!-- START FOOTER -->
  <footer class="bg-body-dark dark text-center">
    <div class="container">
      <p class="fs-16">
        © 2022 MIPO by
        <a href="https://kingstudio.ro" target="_blank">KingStudio</a>
      </p>
    </div>
    <!-- / container -->
  </footer>
  <!-- END -->
</template>
