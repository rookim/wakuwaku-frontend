<script>
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

export default {
  data: function () {
    return {
      message: "You're currently watching...",
      msgLoading: "",
      message2: "Loading...",
      favorites: [],
      currentAnime: {},
      favoritesFilter: "",
    };
  },
  created: function () {
    axios
      .get("/favorites")
      .then((response) => {
        console.log(response.data);
        this.favorites = response.data;
        // convert date strings under airstamp key to Date objects
        this.favorites = this.favorites.map((favorite) => {
          if (favorite.show.next_ep.airstamp) {
            favorite.show.next_ep.airstamp = dayjs(favorite.show.next_ep.airstamp);
          }
          return favorite;
        });
        // and then sort by the airstamp key!
        // in order for the sort method to work (sort by date), the strings need to be converted into Date objects first, which is what I did above
        this.favorites = this.favorites.sort(function (a, b) {
          return a.show.next_ep.airstamp - b.show.next_ep.airstamp;
        });
        // print results to console for testing purposes
        console.log(this.favorites);
      })
      .catch((error) => {
        console.log(error.response);
        this.errors = error.response.status;
      });
  },
  methods: {
    removeAnime: function (favorite) {
      console.log(favorite.id);
      axios.delete(`/favorites/${favorite.id}`).then((response) => {
        console.log(response.data);
        // this code makes the list dynamic, but is there a shorter way to do this?
        this.favorites = this.favorites.filter((item) => item !== favorite);
      });
    },
    showAnime: function (anime) {
      this.currentAnime["name"] = anime.show.name;
      this.currentAnime["summary"] = anime.show.summary;
      // IT SMELLS WET IN HERE
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<br />", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<br />", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<b>", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</b>", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<i>", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</i>", " ");
      this.currentAnime["image"] = anime.show.image.medium;
      console.log("Anime:", this.currentAnime);
      document.querySelector("#anime-details").showModal();
    },
    relativeTime: function (anime) {
      return dayjs(anime.show.next_ep.airstamp).from(dayjs());
    },
    filteredFavorites: function () {
      return this.favorites.filter((anime) => {
        return anime.show.name.toLowerCase().includes(this.favoritesFilter.toLowerCase());
      });
    },
  },
};
</script>

<template>
  <div class="favorites-index">
    <h1 v-if="favorites.length != 0">{{ message }}</h1>
    <h1 v-if="favorites.length == 0">{{ message2 }}</h1>
    <p>
      Search:
      <input type="text" v-model="favoritesFilter" />
    </p>
    <div v-for="favorite in filteredFavorites()" v-bind:key="favorite.id">
      <img v-on:click="showAnime(favorite)" :src="favorite.show.image.medium" alt="" />
      <h2>{{ favorite.show.name }}</h2>
      <!-- need to make sure there is a next episode. anime could be finished -->
      <div v-if="favorite.show.next_ep">
        <h3>Season {{ favorite.show.next_ep.season }}</h3>
        <p>Coming up: Episode {{ favorite.show.next_ep.number }} - "{{ favorite.show.next_ep.name }}"</p>
        <p>Airing {{ relativeTime(favorite) }}</p>
      </div>
      <div v-else>
        <small>Next episode information unavailable. Sorry for the inconvenience :(</small>
      </div>
      <button @click="removeAnime(favorite)">Remove</button>
    </div>
    <dialog id="anime-details">
      <form method="dialog">
        <h2>{{ currentAnime.name }}</h2>
        <img :src="currentAnime.image" alt="" />
        <p>{{ currentAnime.summary }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
