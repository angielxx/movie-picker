<template>
  <div class="RecordItem" @click="goMovieDetail">
    <div class="feed-info">
      <div class="feed-info__poster"
      :style="`background-image: url(https://image.tmdb.org/t/p/w400/${this.feedItem.movie.poster_path})`"
      >
      
    </div>
    <div class="feed-info__text">
        <h2 class="feed-info__text__date">{{ this.feedItem.created_at | formatDate}}</h2>
        <h2 class="feed-info__text__title">{{this.feedItem.movie.title}}</h2>
        <div class="feed-info__text__sub">
          <span>{{this.feedItem.movie.released_date | formatYear}}・</span><span>{{ this.feedItem.movie.genres[0]["name"] }}・</span><span>{{ this.feedItem.movie.countries[0]["name"] }}</span>
        </div>
        <!-- <p>{{this.feedItem.movie.overview}}</p> -->
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
    goUserDetail() {
      const userId = this.feedItem.user.id
      this.$router.push({ name: 'userDetail', params: { userId: userId}})
    },
    // follow 요청
    follow() {
      const payload = { userId: this.user.id}
      this.$store.dispatch('follow', payload);
    },
    // 영화 디테일 페이지로 이동
    goMovieDetail() {
      const movieId = this.feedItem.movie.id
      this.$router.push({ name: 'movieDetail', params: { movieId: movieId}})
    }
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
@import '@/assets/scss/MyRecordItem.scss';
</style>