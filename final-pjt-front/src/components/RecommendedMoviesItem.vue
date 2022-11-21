<template>
  <div class="movie-item" @click="toDetail(), $emit('addMovie')" :data-moviePK="movie.id">
    <div class="movie-item__poster" :style="`background-image: url(https://image.tmdb.org/t/p/w400/${movie.poster_path})`">
    </div>
    <div class="movie-item__info">
      <h3 class="movie-item__info__title">{{ movie.title }}</h3>
      <div class="movie-item__info__subinfo">
        <span>{{ movie.released_date | getYear }}・</span><span>{{ movie.genres[0]["name"] }}・</span><span>{{ movie.countries[0]["name"] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RecommendedMoviesItem",
	props: {
		movieId: Number
	},

  data() {
    return {
			movie: {}
		};
  },
	created() {
    const API_URL = this.$store.state.API_URL;
    axios({
      method: "get",
      url: `${API_URL}/api/movies/${this.movieId}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        this.movie = res.data;
      })
      .catch((err) => console.log(err));
  },
  
  methods: {
    // 한 영화 클릭 > clicked 클래스 추가
    // clickMovie(event) {
    //   // console.log('clicked!')
    //   if (['first-addMovie', 'addMovie'].includes(this.$route.name)) {
    //     return
    //   }
    //   const target = event.currentTarget.children[0];
    //   target.classList.toggle('clicked');
    //   return
    // },
    toDetail() {
      // 영화 디테일 페이지로 이동하면 안되는 라우터
      this.$router.push({ name: 'movieDetail', params: { movieId: this.movieId}})
      console.log('clicked', this.movieId)
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(from, next)
  //   this.movieId = to.params.movieId
  //   console.log('guard', to.params.movieId)
  //   // Vue.forceUpdate();
  //   next()
  // },
  filters: {
    getYear(date) {
      const y = date.slice(0, 4)
      return y
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/MovieItem.scss';
</style>
