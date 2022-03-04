import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "devel˝opment" ? "http://localhost:3000" : "/";
createApp(App).use(router).mount("#app");
