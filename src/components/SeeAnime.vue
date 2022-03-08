<script>
export default {
  props: ["tacocat"],
  data: function () {
    return {
      viewAnime: {},
    };
  },
  methods: {
    showAnime: function (anime) {
      this.viewAnime["name"] = anime.show.name;
      this.viewAnime["summary"] = anime.show.summary;
      this.viewAnime["summary"] = this.viewAnime["summary"].replace("<p>", "");
      this.viewAnime["summary"] = this.viewAnime["summary"].replace("</p>", "");
      this.viewAnime["image"] = anime.show.image.medium;
      console.log("Anime:", this.viewAnime);
      document.querySelector("#anime-details").showModal();
    },
  },
};
</script>

<template>
  <img v-on:click="showAnime(tacocat)" :src="tacocat.show.image.medium" alt="" />
  <dialog id="anime-details">
    <form method="dialog">
      <h2>{{ viewAnime.name }}</h2>
      <img :src="viewAnime.image" alt="" />
      <p>{{ viewAnime.summary }}</p>
      <button>Close</button>
    </form>
  </dialog>
</template>
