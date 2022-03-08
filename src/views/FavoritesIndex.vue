<script>
import axios from "axios";
import SeeFavoritesAnime from "@/components/SeeFavoritesAnime.vue";

export default {
  components: {
    SeeFavoritesAnime,
  },
  data: function () {
    return {
      message: "You're currently watching...",
      msgLoading: "",
      message2: "Loading... (Unless you need to log in)",
      favorites: [],
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
    <h1 v-if="favorites.length != 0">{{ message }}</h1>
    <h1 v-if="favorites.length == 0">{{ message2 }}</h1>
    <SeeFavoritesAnime :tacocat="favorites" @edit-list="removeAnime" />
  </div>
</template>

<style></style>
