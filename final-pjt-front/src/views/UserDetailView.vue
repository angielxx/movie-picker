<template>
  <div class="UserDetail">
    <div class="user-info">
      <div class="user-info__img">

      </div>
      <div class="user-info__text">
        <h1 class="user-info__text">{{ this.$store.state.username}}</h1>
        <div>
          <span>541</span>
          <span>팔로워</span>
        </div>
        <div>
          <span>128</span>
          <span>팔로잉</span>
        </div>
      </div>
    </div>
    <div class="user-movies">
      <div class="user-movies__tab">
        <div class="user-movies__tab__watched">
          <h3 @click="swtichTab($event)" data-tab="watched">봤어요</h3>
          <div class="user-movies__tab__watched__line"></div>
        </div>
        <div class="user-movies__tab__toWatch" data-tab="toWatch">
          <h3 @click="swtichTab($event)" data-tab="toWatch">보고싶어요</h3>
          <div class="user-movies__tab__watched__line"></div>
        </div>
      </div>
      <div class="user-movies__list">
        <MovieItem v-for="(movie, key) in movies" :key="key"/>
      </div>
    </div>
    <div class="records">
      <h3>인생영화 기록</h3>
    </div>
    <!-- <hr /> -->
    <!-- 보고 싶은 영화 컴포넌트입니다. 유저 피케이로 접근해서 해당 유저의 보고 싶은 영화를 보여줍니다. -->
    <!-- <ToWatchMovies :user_pk="this.user_pk" /> -->
    <!-- <hr /> -->
    <!-- 본 영화 컴포넌트입니다. 유저 피케이로 접근해서 해당 유저의 본 영화를 보여줍니다. -->
    <!-- <WatchedMovies :user_pk="this.user_pk" /> -->
    <MovieItem/>
  </div>
</template>

<script>
import MovieItem from '@/components/MovieItem.vue';
import axios from "axios";
// import ToWatchMovies from "@/components/ToWatchMovies.vue";
// import WatchedMovies from "@/components/WatchedMovies.vue";

export default {
  name: "UserDetailView",
  components: {
    MovieItem,
    // ToWatchMovies,
    // WatchedMovies,
    
  },
  data() {
    return {
      user_pk: this.$route.params.userId,
      watchedMovies: [],
      toWatchMovies: [],
      movies: [],
    };
  },
  created() {
    this.getWatchedMovies()
    this.getToWatchMovies()
  },
  mounted() {
    
  },
  methods: {
    // watched 받아오기
    getWatchedMovies() {
      const API_URL = this.$store.state.API_URL;
      axios({
        method: "get",
        url: `${API_URL}/api/accounts/${this.user_pk}/watched/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        this.watchedMovies = res.data.watched_movies;
        this.movies = this.watchedMovies
      })
      .catch((err) => console.log(err))
    },

    // toWatch 받아오기
    getToWatchMovies() {
      const API_URL = this.$store.state.API_URL;
    axios({
      method: "get",
      url: `${API_URL}/api/accounts/${this.user_pk}/to_watch/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        this.toWatchMovies = res.data.to_watch_movies;
      })
      .catch((err) => console.log(err))
    },

    // tab 바꾸기
    swtichTab() {

    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/UserDetailView.scss';
</style>
