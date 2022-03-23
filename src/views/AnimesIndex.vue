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
      // document.querySelector("#anime-details").showModal();
    },
    relativeTime: function (anime) {
      return dayjs(anime.airstamp).from(dayjs());
    },
  },
};
</script>

<template>
  <body>
    <!-- START MAIN CONTAINER -->
    <div class="main-container p-0">
      <section id="blog" class="lg">
        <div class="container">
          <h1>It's never too late to start a new anime...</h1>
          <div class="row">
            <div class="col-lg-12 tablet-lg-top-45 page-content">
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
                      class="btn btn-sm btn-primary pill btn-icon overlapping-btn rounded"
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
              <div v-if="empty">No anime found :(</div>
              <div class="row">
                <!-- START COLUMN -->
                <div class="col-md-4 mb-30" v-for="anime in animes" v-bind:key="anime.id">
                  <div class="hover-card">
                    <!-- START CARD -->
                    <div class="card mb-0">
                      <img
                        v-on:click="showAnime(anime)"
                        class="card-img-top"
                        :src="anime.show.image.medium"
                        alt=""
                        data-bs-toggle="modal"
                        data-bs-target=".default-modal"
                      />
                      <!-- START CARD BODY -->
                      <div class="card-body">
                        <h4 class="card-title fs-24 mb-10">{{ anime.show.name }}</h4>
                        <!-- / post-meta -->
                        <p class="fs-14 mb-20">
                          Coming up: Episode {{ anime.next_ep.number }} - "{{ anime.next_ep.name }} in
                          {{ relativeTime(anime.next_ep) }}"
                        </p>
                        <p class="fs-14 mb-20">
                          {{ anime.summary }}
                        </p>
                        <div class="favorites-button">
                          <a
                            class="btn btn-sm btn-primary pill"
                            v-if="isUser && anime.favorited == false"
                            v-on:click="addToFavorites(anime)"
                          >
                            ♡
                          </a>
                          <a
                            class="btn btn-sm btn-primary pill"
                            v-if="isUser && anime.favorited == true"
                            v-on:click="removeFromFavorites(anime)"
                          >
                            ♥
                          </a>
                        </div>
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
    <!-- END MAIN CONTAINER -->
    <!-- modal -->
    <div class="modal fade default-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-header">
            <h5 class="modal-title">{{ currentAnime.name }} (Season {{ currentAnime.season }})</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <!-- / modal-header -->
          <div class="modal-body">
            <img :src="currentAnime.image" alt="" />
            <br />
            <br />
            <p>
              {{ currentAnime.summary }}
            </p>
          </div>
          <!-- / modal-body -->
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal">
              <i class="fas fa-times fs-14 mr-5"></i>
              <span>Close</span>
            </button>
          </div>
          <!-- / modal-footer -->
        </div>
        <!-- / modal-content -->
      </div>
      <!-- / modal-dialog -->
    </div>
    <!-- / modal -->
    <!-- / default-modal -->
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
