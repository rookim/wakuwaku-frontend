import { createRouter, createWebHistory } from "vue-router";
import FavoritesIndex from "../views/FavoritesIndex.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import AnimesIndex from "../views/AnimesIndex.vue";
import UsersEdit from "../views/UsersEdit.vue";
import Calendar from "../views/Calendar.vue";

const routes = [
  {
    path: "/",
    name: "AnimesIndex",
    component: AnimesIndex,
  },
  {
    path: "/favorites",
    name: "FavoritesIndex",
    component: FavoritesIndex,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/me",
    name: "UsersShow",
    component: UsersShow,
  },
  {
    path: "/me/edit",
    name: "UsersEdit",
    component: UsersEdit,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
