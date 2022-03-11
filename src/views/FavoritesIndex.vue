<script>
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default {
  data: function () {
    return {
      message: "You're currently watching...",
      msgLoading: "",
      message2: "Loading...",
      favorites: [],
      currentAnime: {},
    };
  },
  created: function () {
    axios
      .get("/favorites")
      .then((response) => {
        console.log(response.data);
        this.favorites = response.data;
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
      return dayjs(anime.show.next_ep.airdate, anime.show.next_ep.airtime).from(dayjs());
    },
  },
};
</script>

<template>
  <div class="favorites-index">
    <h1 v-if="favorites.length != 0">{{ message }}</h1>
    <h1 v-if="favorites.length == 0">{{ message2 }}</h1>
    <br />
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <img v-on:click="showAnime(favorite)" :src="favorite.show.image.medium" alt="" />
      <h2>{{ favorite.show.name }}</h2>
      <h3>Season {{ favorite.show.next_ep.season }}</h3>
      <p>Coming up: Episode {{ favorite.show.next_ep.number }} - {{ favorite.show.next_ep.name }}</p>
      <p>Airing {{ relativeTime(favorite) }}</p>
      <button @click="removeAnime(favorite)">Remove</button>
      <br />
      <br />
      <br />
      <br />
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

<style></style>
