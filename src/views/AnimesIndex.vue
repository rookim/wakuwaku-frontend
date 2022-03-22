<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data: function () {
    return {
      message: "Search anime :D",
      searchParams: {},
      animes: [],
      empty: false,
      newFavoriteParams: {},
      removeFavoriteParams: {},
      currentAnime: {},
      isUser: !!localStorage.jwt,
    };
  },
  methods: {
    submit: function () {
      axios.get("/animes", { params: this.searchParams }).then((response) => {
        console.log("Anime list:", response.data);
        this.animes = response.data;
        if (this.animes.length == 0) {
          this.empty = true;
        } else {
          this.empty = false;
        }
      });
    },
    addToFavorites: function (anime) {
      this.newFavoriteParams["tvmaze_id"] = anime.show.id;
      axios.post("/favorites", this.newFavoriteParams).then((response) => {
        console.log(anime.favorited);
        console.log("Successfully added to Favorites:", response.data);
        anime.favorited = true;
        anime.favoritesId = response.data.id;
      });
    },
    removeFromFavorites: function (anime) {
      axios.delete(`/favorites/${anime.favoritesId}`).then((response) => {
        console.log(response.data);
        anime.favorited = false;
      });
    },
    showAnime: function (anime) {
      console.log(anime);
      this.currentAnime["name"] = anime.show.name;
      this.currentAnime["summary"] = anime.show.summary;
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<br />", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<br />", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<b>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</b>", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<i>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</i>", "");
      this.currentAnime["image"] = anime.show.image.medium;
      this.currentAnime["airstamp"] = anime.next_ep.airstamp;
      this.currentAnime["airdate"] = anime.next_ep.airdate;
      this.currentAnime["airtime"] = anime.next_ep.airtime;
      this.currentAnime["season"] = anime.next_ep.season;
      this.currentAnime["episode"] = anime.next_ep.number;
      this.currentAnime["episode_name"] = anime.next_ep.name;
      console.log("Anime:", this.currentAnime);
      document.querySelector("#anime-details").showModal();
    },
    relativeTime: function (anime) {
      return dayjs(anime.airstamp).from(dayjs());
    },
  },
};
</script>

<template>
  <div class="animes-index">
    <h1>{{ message }}</h1>
    <input type="text" v-model="searchParams.title" />
    <button v-on:click="submit()">Search</button>
    <div v-if="empty">No anime found :(</div>
    <div v-for="anime in animes" v-bind:key="anime.id">
      <!-- only one of the 2 buttons below show up! -->
      <!-- button to add to favorites -->
      <button v-if="isUser && anime.favorited == false" v-on:click="addToFavorites(anime)">♡</button>
      <button v-if="isUser && anime.favorited == true" v-on:click="removeFromFavorites(anime)">♥</button>
      <!-- button to remove from favorites -->
      <br />
      <br />
      <img @click="showAnime(anime)" :src="anime.show.image.medium" alt="" />
      <br />
      <h3>{{ anime.show.name }}</h3>
      <br />
    </div>

    <dialog id="anime-details">
      <form method="dialog">
        <h2>{{ currentAnime.name }}</h2>
        <h3>Season {{ currentAnime.season }}</h3>
        <img :src="currentAnime.image" alt="" />
        <p>{{ currentAnime.summary }}</p>
        <p>Coming up: Episode {{ currentAnime.episode }} - "{{ currentAnime.episode_name }}"</p>
        <p>Airing {{ relativeTime(currentAnime) }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
