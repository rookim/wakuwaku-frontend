<script>
export default {
  props: ["tacocat"],
  data: function () {
    return {
      currentAnime: {},
    };
  },
  methods: {
    showAnime: function (anime) {
      this.currentAnime["name"] = anime.show.name;
      this.currentAnime["summary"] = anime.show.summary;
      // IT SMELLS WET IN HERE
      this.currentAnime["summary"] = this.currentAnime["summary"].replace("<p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replace("</p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replace("<br />", "");
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
  <div v-for="favorite in tacocat" v-bind:key="favorite.id">
    <img v-on:click="showAnime(favorite)" :src="favorite.show.image.medium" alt="" />
    <p>{{ favorite.show.name }}</p>
    <button @click="$emit('editList', favorite.id, favorite)">Remove</button>
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
</template>
