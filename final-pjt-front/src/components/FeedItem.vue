<template>
  <div class="FeedItem">
    <div class="info">
      <div class="info__profile"
        @click="goUserDetail"
        :style="`background-image: url(${this.$store.state.API_URL}${this.feedItem.user.avatar})`">

      </div>
      <div class="info__text">
        <h2><span>{{ this.feedItem.user.username }}</span>님의 인생영화가 새롭게 업데이트되었습니다.</h2>
      </div>
      <div class="button hidden" @click="follow">
        <!-- icon check gradient -->
        <svg v-if="checkFollow" width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M470.6 105.4C483.1 117.9 483.1 138.2 470.6 150.7L214.6 406.7C202.1 419.2 181.8 419.2 169.3 406.7L41.3 278.7C28.8 266.2 28.8 245.9 41.3 233.4C53.8 220.9 74.1 220.9 86.6 233.4L192 338.7L425.4 105.4C437.9 92.8999 458.2 92.8999 470.7 105.4H470.6Z" fill="url(#paint0_radial_241_126)"/>
          <defs>
          <radialGradient id="paint0_radial_241_126" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(163.389 192.807) rotate(37.3311) scale(448.762 433.706)">
          <stop stop-color="#FFB3F3"/>
          <stop offset="1" stop-color="#BA63FF"/>
          </radialGradient>
          </defs>
        </svg>
        <!-- icon plus white -->
        <svg v-else width="448" height="512" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M256 80C256 62.3 241.7 48 224 48C206.3 48 192 62.3 192 80V224H48C30.3 224 16 238.3 16 256C16 273.7 30.3 288 48 288H192V432C192 449.7 206.3 464 224 464C241.7 464 256 449.7 256 432V288H400C417.7 288 432 273.7 432 256C432 238.3 417.7 224 400 224H256V80Z" fill="white"/>
        </svg>
        <h3 v-if="checkFollow" class="button__text">언팔로우</h3>
        <h3 v-else class="button__text">팔로우</h3>
      </div>
    </div>
    <div class="movie-info">
      <div class="movie-info__poster"
      @click="goMovieDetail"
      :style="`background-image: url(https://image.tmdb.org/t/p/w400/${this.feedItem.movie.poster_path})`"
      >
      
    </div>
    <div class="movie-info__text">
        <h2 class="movie-info__text__date">{{ this.feedItem.created_at | formatDate}}</h2>
        <h2 class="movie-info__text__title">{{this.feedItem.movie.title}}</h2>
        <div class="movie-info__text__sub">
          <span>{{this.feedItem.movie.released_date | formatYear}}・</span><span>{{ this.feedItem.movie.genres[0]["name"] }}・</span><span>{{ this.feedItem.movie.countries[0]["name"] }}</span>
        </div>
        <p>{{this.feedItem.movie.overview}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: 'FeedItem',
  props: {
    feedItem: Object,
  },

  computed: {
    checkFollow() {
      if (this.$store.state.followings.includes(this.feedItem.user.id)) return true
      return false
    }
  },

  methods: {
    // 유저 디테일 페이지로 이동
    goUserDetail() {
      const userId = this.feedItem.user.id
      this.$router.push({ name: 'userDetail', params: { userId: userId}})
    },
    // follow 요청
    follow() {
      const payload = { userId: this.feedItem.user.id}
      this.$store.dispatch('follow', payload);
    },
    // 영화 디테일 페이지로 이동
    goMovieDetail() {
      const movieId = this.feedItem.movie.id
      this.$router.push({ name: 'movieDetail', params: { movieId: movieId }})
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

<style lang="scss" scoped>
@import '@/assets/scss/FeedItem.scss';
</style>