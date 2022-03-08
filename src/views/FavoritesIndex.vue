<script>
import axios from "axios";
import SeeAnime from "@/components/SeeAnime.vue";

export default {
  components: {
    SeeAnime,
  },
  data: function () {
    return {
      message: "You're currently watching...",
      favorites: [],
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      console.log(response.data);
      this.favorites = response.data;
    });
  },
  methods: {
    removeAnime: function (id, favorite) {
      console.log(id);
      axios.delete(`/favorites/${id}`).then((response) => {
        console.log(response.data);
        // this code makes the list dynamic, but is there a shorter way to do this?
        this.favorites = this.favorites.filter((item) => item !== favorite);
      });
    },
  },
};
</script>

<template>
  <div class="favorites-index">
    <h1>{{ message }}</h1>
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <SeeAnime :tacocat="favorite" />
      <p>{{ favorite.show.name }}</p>
      <!-- button to remove anime from favorites -->
      <button v-on:click="removeAnime(favorite.id, favorite)">Remove</button>
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<style></style>
