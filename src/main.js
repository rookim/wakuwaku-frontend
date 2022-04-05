import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import GAuth from "vue3-google-oauth2";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://waku-waku.herokuapp.com";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}
const gAuthOptions = {
  clientId: "997534777916-v61411mc9t2ukk3p8rc6opmui1veqq2o.apps.googleusercontent.com",
  scope: "profile email https://www.googleapis.com/auth/calendar.events",
  prompt: "consent",
  fetch_basic_profile: true,
};

const app = createApp(App);
app.use(router);
app.use(GAuth, gAuthOptions);
app.mount("#app");
// App.config.globalProperties.isLoggedIn = !!localStorage.jwt;
