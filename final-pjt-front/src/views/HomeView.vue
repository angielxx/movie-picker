<template>

  <div class="home">
    <SearchBar/>
    <div class="home__main-container">
      <div class="home-wrapper" :style="`background-image: linear-gradient(to bottom, rgba(20, 18, 23, 1), rgba(20, 18, 23, 0.8)), url(https://image.tmdb.org/t/p/original/${this.best_movie.movie.backdrop_path}`">
        <div class="main-info__wrapper">
          <h2 class="home-title">
            내 인생영화
          </h2>
          <div class="main-info">
            <div class="main-info__poster"
            @click="goMovieDetail(best_movie.movie.id)"
            :style="`background-image: url(https://image.tmdb.org/t/p/w400/${this.best_movie.movie.poster_path})`">
            </div>
            <div class="main-info__info">
              <h2 class="main-info__info__date">{{this.best_movie.created_at | formatDate }}</h2>
              <h3 class="main-info__info__title">{{ this.best_movie.movie.title }}</h3>
              <div class="main-info__info__subinfo">
                <span>{{ this.best_movie.movie.released_date | formatYear }}・</span
                ><span>{{ this.best_movie.movie.genres[0]["name"] }}・</span
                ><span>{{ this.best_movie.movie.countries[0]["name"] }}</span>
              </div>
              <p>{{ this.best_movie.movie.overview}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar';
// import BestMovieItem from '@/components/BestMovieItem';
import _ from 'lodash';
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    // BestMovieItem,
  },
  data() {
    return {
      watched_movies: this.$store.state.watched_movies,
      myRecommendations: [],
    }
  },
  created() {
    this.$store.dispatch('getUser')
  },
  mounted() {
    this.clearSearchBar();
    this.getMyRecommendations()
  },
  methods: {
    clearSearchBar() {
      const searchInput = document.querySelector('.search-bar__form input[type="text"]')
      searchInput.value = null;
    },
    // 영화 디테일 페이지로 이동
    goMovieDetail(movieId) {
      this.$router.push({ name: 'movieDetail', params: { movieId: movieId }})
    },
    // 인생영화 월드컵 페이지로 이동
    goGame(event) {
      const gameName = event.target.dataset.gamename
      this.$router.push({ name: 'game', params: { gameName: gameName } })
    },

    // 내 추천 영화(랜덤)을 API GET 요청으로 불러오는 메서드입니다.(mounted에 실행됩니다.)
    getMyRecommendations() {
      const API_URL = this.$store.state.API_URL;
      axios({
        method: "GET",
        url: `${API_URL}/api/accounts/get_my_recommendations/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.myRecommendations = res.data;
        })
        .catch((err) => console.log(err));
    }
  },
  computed: {
    // 인생영화
    best_movie() {
      return this.$store.state.best_movie
    },

    // 인생영화 포스터 이미지 url
    bestMovie_imgSrc() {
      const IMG_SIZE = 'w200';
      const poster_path = this.best_movie.movie.poster_path;
      const img_url = `https://image.tmdb.org/t/p/${IMG_SIZE}/${poster_path}`
      return img_url
    },
    // 명예의 전당 리스트
    best_Movie_records() {
      return this.$store.state.all_best_movies
    },
    // 인생영화 월드컵 배경 사진 고르기
    allMoviePosterPath() {
      return `https://image.tmdb.org/t/p/w400/${_.sample(this.$store.state.watched_movies).poster_path}`
    },

    // 장르별 인생영화 월드컵 포스터
    genreComedyPosterPath() {
      const movies = this.$store.state.watched_movies.filter((movie) => Object.values(Object.values(movie.genres)).includes("코미디"))
      if (movies.length) {
        return _.sample(movies).poster_path
      } else {
        return null;
      }
    },
    genreActionPosterPath() {
      const movies = this.$store.state.watched_movies.filter((movie) => {
        const genresObj = Object.values(Object.values(movie.genres))
        console.log(Object.entries(genresObj))
        // Object.values(Object.values(movie.genres)).filter((genre) => genre.name )
        Object.values(Object.values(movie.genres)).includes("액션")
      })
      if (movies.length) {
        return _.sample(movies).poster_path
      } else {
        return null;
      }
    },
  },
  filters: {
    formatDate(date) {
      const y = date.slice(0, 4)
      const m = date.slice(5, 7)
      const d = date.slice(8, 10)
      const result = `${y}.${m}.${d}`
      return result
    },
    formatYear(date) {
      const y = date.slice(0, 4)
      return y
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/HomeView.scss';
// @import '../assets/scss/MovieDetail.scss';
</style>