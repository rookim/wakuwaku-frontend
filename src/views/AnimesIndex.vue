<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Search anime :D",
      searchParams: {},
      animes: [],
      empty: false,
      newFavoriteParams: {},
      removeFavoriteParams: {},
      seeAnime: {},
    };
  },
  created: function () {},
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
    addToFavorites: function (id) {
      this.newFavoriteParams["tvmaze_id"] = id;
      console.log(this.newFavoriteParams);
      axios.post("/favorites", this.newFavoriteParams).then((response) => {
        console.log("Successfully added to Favorites:", response.data.tvmaze_anime.name);
      });
    },
    removeFromFavorites: function () {},
    showAnime: function (anime) {
      // for some reason, i cannot access the anime object in the template using dot notation, so i manually set it in the method
      this.seeAnime["name"] = anime.show.name;
      this.seeAnime["summary"] = anime.show.summary;
      this.seeAnime["summary"] = this.seeAnime["summary"].replace("<p>", "");
      this.seeAnime["summary"] = this.seeAnime["summary"].replace("</p>", "");
      this.seeAnime["image"] = anime.show.image.medium;
      console.log("Anime:", this.seeAnime);
      document.querySelector("#anime-details").showModal();
    },
  },
};
</script>

<template>
  <div class="animes-index">
    <h1>{{ message }}</h1>
    <input type="text" v-model="searchParams.title" />
    <button v-on:click="submit()">Search</button>
    <br />
    <br />
    <div v-if="empty">No anime found :(</div>
    <div v-for="anime in animes" v-bind:key="anime.id">
      <p>{{ anime.show.id }}</p>
      <!-- only one of the 2 buttons below show up! -->
      <!-- button to add to favorites -->
      <button v-if="anime.favorited == false" v-on:click="addToFavorites(anime.show.id)">♡</button>
      <!-- button to remove from favorites -->
      <button v-if="anime.favorited == true" v-on:click="removeFromFavorites()">♥</button>
      <br />
      <!-- make a modal  -->
      <img v-on:click="showAnime(anime)" :src="anime.show.image.medium" alt="" />
      <h3>{{ anime.show.name }}</h3>
    </div>
    <dialog id="anime-details">
      <form method="dialog">
        <h2>{{ seeAnime.name }}</h2>
        <img :src="seeAnime.image" alt="" />
        <p>{{ seeAnime.summary }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
