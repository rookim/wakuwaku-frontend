<script>
import { inject, toRefs } from "vue";
import axios from "axios";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// NOTE TO SELF: FullCalendar does have a way of integrating Google Calendar with it, but it requires making your Google Calendar public. By making your calendar public, it makes all the events on calendar searchable by anyone on Google. For privacy reasons, I did not want to force my users to make their calendar public. And instead, I'm making calls to the Google Calendar API with a user's access token.

export default {
  setup(props) {
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const handleClickLogin = () => {};
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
  components: {
    FullCalendar,
  },
  created: function () {
    // this is to make sure events persist upon page reload if a user is logged in
    // updateCalendar method only runs when there is a change to the accessToken variable
    if (this.accessToken) {
      this.updateCalendar();
    }
    // make a call to favorites user's favorites index and have it automatically added to events list
    // EXTREMELY SLOW!!
    axios.get("/favorites").then((response) => {
      console.log(response.data);
      response.data.forEach((event) => {
        var eventObject = {};
        eventObject.title = event.show.name;
        eventObject.start = event.show.next_ep.airstamp;
        this.calendarOptions.events.push(eventObject);
      });
    });
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        aspectRatio: 2.2,
        initialView: "dayGridMonth",
        events: [],
        // this function allows for the user to click on an event which results in an alert popup window with full information
        eventClick: function (info) {
          alert(info.event.title + " at " + info.event.start);
        },
      },
      user: "",
      loggedInUser: localStorage.username,
      accessToken: localStorage.accessToken,
      googleCalendarEvents: [],
    };
  },
  methods: {
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        this.accessToken = googleUser.getAuthResponse()["access_token"];
        // save access token in local storage for now
        localStorage.setItem("accessToken", this.accessToken);
        console.log("getAuthResponse", this.$gAuth.instance.currentUser.get().getAuthResponse());
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    // need to figure out how to log out of google account because it stays logged in even though i log out of wakuwaku account
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        localStorage.removeItem("accessToken");
        this.user = "";
        // when signing out of google account, it's filtering out all google events to only display anime events
        this.calendarOptions.events = this.calendarOptions.events.filter((element) => {
          return !this.googleCalendarEvents.includes(element);
        });
        this.accessToken = "";
      } catch (error) {
        console.error(error);
      }
    },
    updateCalendar: function () {
      if (localStorage.accessToken) {
        axios
          .get("https://www.googleapis.com/calendar/v3/calendars/primary/events/", {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          })
          .then((response) => {
            // console log info first to make sure of my output
            console.log("User's calendar events", response.data.items);
            // do a for loop through response to format events in a way that allows FullCalendar to read it and add it to the calendar
            response.data.items.forEach((event) => {
              var eventObject = {};
              eventObject.title = event.summary;
              eventObject.start = event.start.dateTime;
              eventObject.end = event.end.dateTime;
              this.calendarOptions.events.push(eventObject);
              // separate array in order to remove events when a user logs out of google account
              this.googleCalendarEvents.push(eventObject);
            });
            console.log(this.calendarOptions.events);
          });
      }
    },
  },
  // app needs to be watching whether someone is logged in and who's logged in
  watch: {
    // localStorage is not reactive, therefore the watch property cannot track it
    accessToken() {
      // depending on whether there is an accesstoken or not, it will update the calendar in real time
      this.updateCalendar();
    },
  },
};
</script>

<template>
  <body>
    <!-- START HEADER -->
    <header class="lg bg-black v-center">
      <div class="container">
        <div class="header-content text-center">
          <h2 class="page-title mb-40 text-white">{{ loggedInUser }}'s Calendar</h2>
        </div>
        <!-- / header-content -->
      </div>
      <!-- / container -->
    </header>
    <!-- END HEADER -->
    <br />
    <br />
    <!-- START GOOGLE LOGIN/LOGOUT -->
    <div id="google-buttons">
      <a class="btn btn-primary pill btn-outline-primary" @click="handleClickSignIn" v-if="!accessToken">
        Google Sign In
      </a>
      <a class="btn btn-primary pill btn-outline-primary" @click="handleClickSignOut" v-if="accessToken">
        Google Sign Out
      </a>
    </div>
    <!-- END GOOGLE LOGIN/LOGOUT -->
  </body>
  <div class="google-calendar">
    <FullCalendar :options="calendarOptions" />
  </div>

  <!-- ORIGINAL CODE -->
  <!-- <div>
    <h1>{{ loggedInUser }}'s Calendar</h1>
    <div>
      <button @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">
        sign in
      </button>
      <button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button>
    </div>
    <FullCalendar :options="calendarOptions" />
  </div> -->
</template>
