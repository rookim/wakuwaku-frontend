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
      <!-- only one of the 2 buttons below show up! -->
      <!-- button to add to favorites -->
      <button v-if="anime.favorited == false" v-on:click="addToFavorites(anime.show.id)">♡</button>
      <!-- button to remove from favorites -->
      <button v-if="anime.favorited == true" v-on:click="removeFromFavorites()">♥</button>
      <br />
      <img :src="anime.show.image.medium" alt="" />
      <h3>{{ anime.show.name }}</h3>
    </div>
  </div>
</template>

<style></style>
