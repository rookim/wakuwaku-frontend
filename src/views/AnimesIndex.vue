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
      currentAnime: {},
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
      this.currentAnime["name"] = anime.show.name;
      this.currentAnime["summary"] = anime.show.summary;
      this.currentAnime["summary"] = this.currentAnime["summary"].replace("<p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replace("</p>", "");
      this.currentAnime["image"] = anime.show.image.medium;
      console.log("Anime:", this.currentAnime);
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
    <br />
    <div v-if="empty">No anime found :(</div>
    <div v-for="anime in animes" v-bind:key="anime.id">
      <!-- only one of the 2 buttons below show up! -->
      <!-- button to add to favorites -->
      <button v-if="anime.favorited == false" v-on:click="addToFavorites(anime.show.id)">♡</button>
      <button v-if="anime.favorited == true" v-on:click="removeFromFavorites()">♥</button>
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
        <img :src="currentAnime.image" alt="" />
        <p>{{ currentAnime.summary }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
