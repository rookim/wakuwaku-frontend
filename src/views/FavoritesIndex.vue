<script>
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

export default {
  data: function () {
    return {
      message: "You're currently watching...",
      msgLoading: "",
      message2: "Loading...",
      favorites: [],
      currentAnime: {},
      favoritesFilter: "",
    };
  },
  created: function () {
    axios
      .get("/favorites")
      .then((response) => {
        console.log(response.data);
        this.favorites = response.data;
        // convert date strings under airstamp key to Date objects
        this.favorites = this.favorites.map((favorite) => {
          if (favorite.show.next_ep.airstamp) {
            favorite.show.next_ep.airstamp = dayjs(favorite.show.next_ep.airstamp);
          }
          return favorite;
        });
        // and then sort by the airstamp key!
        // in order for the sort method to work (sort by date), the strings need to be converted into Date objects first, which is what I did above
        this.favorites = this.favorites.sort(function (a, b) {
          return a.show.next_ep.airstamp - b.show.next_ep.airstamp;
        });
        // print results to console for testing purposes
        console.log(this.favorites);
      })
      .catch((error) => {
        console.log(error.response);
        this.errors = error.response.status;
      });
  },
  methods: {
    removeAnime: function (favorite) {
      console.log(favorite.id);
      axios.delete(`/favorites/${favorite.id}`).then((response) => {
        console.log(response.data);
        // this code makes the list dynamic, but is there a shorter way to do this?
        this.favorites = this.favorites.filter((item) => item !== favorite);
      });
    },
    showAnime: function (anime) {
      this.currentAnime["name"] = anime.show.name;
      this.currentAnime["summary"] = anime.show.summary;
      // IT SMELLS WET IN HERE
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</p>", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<br />", "");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<br />", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<b>", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</b>", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("<i>", " ");
      this.currentAnime["summary"] = this.currentAnime["summary"].replaceAll("</i>", " ");
      this.currentAnime["image"] = anime.show.image.medium;
      console.log("Anime:", this.currentAnime);
      // document.querySelector("#anime-details").showModal();
    },
    relativeTime: function (anime) {
      return dayjs(anime.show.next_ep.airstamp).from(dayjs());
    },
    filteredFavorites: function () {
      return this.favorites.filter((anime) => {
        return anime.show.name.toLowerCase().includes(this.favoritesFilter.toLowerCase());
      });
    },
  },
};
</script>

<template>
  <div class="favorites-index">
    <body>
      <!-- START MAIN CONTAINER -->
      <div class="main-container p-0">
        <section id="blog" class="lg">
          <div class="container">
            <h1 v-if="favorites.length != 0">{{ message }}</h1>
            <h1 v-if="favorites.length == 0">{{ message2 }}</h1>
            <!-- START SEARCH BAR -->
            <div class="widget mt-0">
              <div class="input-group input-w-overlap-btn mb-0">
                <input
                  type="text"
                  class="form-control rounded"
                  v-model="favoritesFilter"
                  placeholder="Search your favorites..."
                />
                <span class="input-group-btn">
                  <button class="btn btn-sm btn-primary pill btn-icon overlapping-btn rounded" type="button">
                    <i class="fas fa-search"></i>
                  </button>
                </span>
                <!-- / input-group-btn -->
              </div>
              <!-- / input-group -->
            </div>
            <!-- END SEARCH BAR -->
            <div class="row">
              <div class="col-lg-12 tablet-lg-top-45 page-content">
                <!-- START ROW -->
                <div class="row">
                  <!-- START COLUMN -->
                  <div class="col-md-3" v-for="favorite in filteredFavorites()" v-bind:key="favorite.id">
                    <div class="hover-card">
                      <div class="card mb-0">
                        <img
                          class="card-img-top"
                          v-on:click="showAnime(favorite)"
                          :src="favorite.show.image.medium"
                          alt=""
                        />
                        <div class="card-body text-left">
                          <h4 class="card-title fs-24 mb-10">
                            {{ favorite.show.name }}
                          </h4>
                          <!-- / post-meta -->
                          <div v-if="favorite.show.next_ep">
                            <h5 class="card-title fs-24 mb-10">Season {{ favorite.show.next_ep.season }}</h5>
                            <p>
                              Coming up: Episode {{ favorite.show.next_ep.number }} - "{{ favorite.show.next_ep.name }}"
                            </p>
                            <p>Airing {{ relativeTime(favorite) }}</p>
                          </div>
                          <div v-else>
                            <small>Next episode information unavailable. Sorry for the inconvenience :(</small>
                          </div>
                          <a
                            v-on:click="showAnime(favorite)"
                            class="btn btn-xs btn-primary pill mb-5 mr-10"
                            data-bs-toggle="modal"
                            data-bs-target=".default-modal"
                          >
                            Info
                          </a>
                          <!-- modal -->
                          <a class="btn btn-xs btn-danger pill mb-5 mr-10" @click="removeAnime(favorite)">Remove</a>
                        </div>
                        <!-- / card-body -->
                      </div>
                      <!-- / card -->
                    </div>
                    <!-- / hover-card -->
                  </div>
                  <!-- END COLUMN -->
                </div>
                <!-- END ROW -->
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
      <!-- START MODAL -->
      <div class="modal fade default-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center">
            <div class="modal-header">
              <h5 class="modal-title">{{ currentAnime.name }}</h5>
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
      <!-- END MODAL -->
    </body>
  </div>

  <!-- OLD CODE BEFORE STYLING -->
  <!-- <div class="favorites-index">
    <h1 v-if="favorites.length != 0">{{ message }}</h1>
    <h1 v-if="favorites.length == 0">{{ message2 }}</h1>
    <p>
      Search:
      <input type="text" v-model="favoritesFilter" />
    </p>
    <div v-for="favorite in filteredFavorites()" v-bind:key="favorite.id">
      <img v-on:click="showAnime(favorite)" :src="favorite.show.image.medium" alt="" />
      <h2>{{ favorite.show.name }}</h2>
      <div v-if="favorite.show.next_ep">
        <h3>Season {{ favorite.show.next_ep.season }}</h3>
        <p>Coming up: Episode {{ favorite.show.next_ep.number }} - "{{ favorite.show.next_ep.name }}"</p>
        <p>Airing {{ relativeTime(favorite) }}</p>
      </div>
      <div v-else>
        <small>Next episode information unavailable. Sorry for the inconvenience :(</small>
      </div>
      <button @click="removeAnime(favorite)">Remove</button>
    </div>
    <dialog id="anime-details">
      <form method="dialog">
        <h2>{{ currentAnime.name }}</h2>
        <img :src="currentAnime.image" alt="" />
        <p>{{ currentAnime.summary }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div> -->
</template>
