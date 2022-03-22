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
  <body>
    <div class="main-container p-0">
      <section id="blog" class="lg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 tablet-lg-top-45 page-content">
              <!-- START SEARCH BAR -->
              <div class="widget mt-0">
                <div class="input-group input-w-overlap-btn mb-0">
                  <input
                    type="text"
                    class="form-control rounded"
                    v-model="searchParams.title"
                    placeholder="Search anime..."
                  />
                  <span class="input-group-btn">
                    <button
                      class="btn btn-sm btn-primary btn-icon overlapping-btn rounded"
                      type="button"
                      v-on:click="submit()"
                    >
                      <i class="fas fa-search"></i>
                    </button>
                  </span>
                  <!-- / input-group-btn -->
                </div>
                <!-- / input-group -->
              </div>
              <!-- END SEARCH BAR -->
              <div class="row">
                <!-- START COLUMN -->
                <div class="col-md-6 mb-30" v-for="anime in animes" v-bind:key="anime.id">
                  <div class="hover-card">
                    <!-- START CARD -->
                    <div class="card mb-0">
                      <img class="card-img-top" @click="showAnime(anime)" :src="anime.show.image.medium" alt="" />
                      <!-- START CARD BODY -->
                      <div class="card-body text-left">
                        <h4 class="card-title fs-24 mb-10">{{ anime.show.name }}</h4>
                        <!-- / post-meta -->
                        <p class="fs-14 mb-20">
                          Coming up: Episode {{ currentAnime.episode }} - "{{ currentAnime.episode_name }} in
                          {{ relativeTime(currentAnime) }}"
                        </p>
                        <p class="fs-14 mb-20">
                          {{ currentAnime.summary }}
                        </p>
                        <a
                          class="btn btn-sm btn-primary"
                          v-if="isUser && anime.favorited == false"
                          v-on:click="addToFavorites(anime)"
                        >
                          ♡
                        </a>
                        <a
                          class="btn btn-sm btn-primary"
                          v-if="isUser && anime.favorited == true"
                          v-on:click="removeFromFavorites(anime)"
                        >
                          ♥
                        </a>
                      </div>
                      <!-- END CARD BODY -->
                    </div>
                    <!-- / END CARD -->
                  </div>
                </div>
                <!-- END COLMUN -->
              </div>
              <!-- / row -->
            </div>
            <!-- / page-content -->
          </div>
          <!-- / row -->
        </div>
        <!-- / container -->
      </section>
      <!-- / blog -->
    </div>
    <!-- main-container -->
  </body>

  <!-- <div class="animes-index">
    <h1>{{ message }}</h1>
    <input type="text" v-model="searchParams.title" />
    <button v-on:click="submit()">Search</button>
    <div v-if="empty">No anime found :(</div>
    <div v-for="anime in animes" v-bind:key="anime.id">
      <button v-if="isUser && anime.favorited == false" v-on:click="addToFavorites(anime)">♡</button>
      <button v-if="isUser && anime.favorited == true" v-on:click="removeFromFavorites(anime)">♥</button>
      <img @click="showAnime(anime)" :src="anime.show.image.medium" alt="" />
      <h3>{{ anime.show.name }}</h3>
    </div>
  </div> -->
</template>
