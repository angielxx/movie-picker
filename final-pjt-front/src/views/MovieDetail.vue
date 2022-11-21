<template>
  <div class="movie-detail">
    <!-- <SearchBar/> -->
    <div class="movie-detail__container">
      <div class="wrapper" :style="`background-image: linear-gradient(to bottom, rgba(20, 18, 23, 1), rgba(20, 18, 23, 0.8)), url(https://image.tmdb.org/t/p/original/${this.backdrop_path}`">
        <div class="main-info">
          <div class="main-info__poster"
            :style="`background-image: url(https://image.tmdb.org/t/p/w400/${movie_detail.poster_path})`">
            <!-- <img :src="`https://image.tmdb.org/t/p/w400/${movie.fields.poster_path}`" alt=""> -->
          </div>
          <div class="main-info__info">
            <h3 class="main-info__info__title">{{ movie_detail.title }}</h3>
            <div class="main-info__info__subinfo">
              <span>{{ movie_detail.released_date | getYear }}・</span
              ><span>{{ movie_detail.genres[0]["name"] }}・</span
              ><span>{{ movie_detail.countries[0]["name"] }}</span>
            </div>
            <p>{{ movie_detail.overview}}</p>
            <div class="main-info__info__btns">
              <div class="addWatched" @click="toggleWatched">
                <svg v-if="!checkWatched" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                <h3>봤어요</h3>
              </div>
              <div class="addToWatch" @click.prevent="toggleToWatch">
                <svg v-if="!checkToWatch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                <h3>보고싶어요</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="link">
        <div class="link__button active">
          <h3>사용자 코멘트</h3>
          <div id="link-active" class="link__button__line active-line"></div>
        </div>
        <div class="link__button">
          <h3>관련 추천 영화</h3>
          <div id="link-active" class="link__button__line"></div>
        </div>
      </div>
      <div class="area">
        <div class="area__reviews">
          <!-- 하위컴포넌트인 리뷰를 보여줍니다. -->
          <div class="area__reviews__my-review">
            <h3>내 코멘트</h3>
            <form @submit.prevent="reviewCreate" class="review-form">
              <!-- <label for="content">내용 : </label> -->
              <textarea id="content" cols="30" rows="10" v-model="content"></textarea
              ><br />
              <input type="submit" id="submit" />
            </form>
          </div>
          <div class="area__reviews__all-reviews">
            <MovieReview :movieId="this.movieId"/>
          </div>
        </div>

        <!-- 하위컴포넌트인 추천 영화를 보여줍니다. -->
        <div class="area__recommends hidden">
          <div class="recommended-movies">
            <RecommendedMovies :recommended-movies="this.movie_detail.recommended"/> 
          </div>
        </div>
      </div>

    </div>
    </div>
</template>

<script>
import axios from "axios";
import MovieReview from "@/components/MovieReview.vue";
import RecommendedMovies from "@/components/RecommendedMovies.vue";
// import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "MovieDetail",
  components: {
    MovieReview,
    RecommendedMovies,
    // SearchBar,
  },
  data() {
    return {
      movieId: this.$route.params.movieId,
      movie_detail: {},
      content: null,
      trailer: 'NHA69lCd1ZM', //임시 트레일러 영상 주소
      backdrop_path: '/sPPsR9f4K0movWVQ99u4uMqFzEL.jpg', // 임시 배경
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
        this.movie_detail = res.data;
        console.log(this.movie_detail);
      })
      .catch((err) => console.log(err));
  },

  computed: {
    // watched 포함 여부
    // 있으면 true 반환
    checkWatched() {
      const movies = this.$store.state.watched_movies
      const flag = movies.some((movie) => movie.id === this.movie_detail.id)
      console.log('watched', flag)
      return flag
    },
    
    // to watch 포함 여부
    // 있으면 true 반환
    checkToWatch() {
      const movies = this.$store.state.to_watch_movies
      const flag = movies.some((movie) => movie.id === this.movie_detail.id)
      console.log('to watch', flag)
      return flag
    }

  },
  
  methods: {
    toCreateReview() {
      // console.log(this.movieId)
      this.$router.push({name: 'reviewCreate', params: {movieId: this.movieId}})
    },

    // watched toggle
    toggleWatched() {
      const url = `${this.$store.state.API_URL}/api/accounts/${this.$store.state.user_pk}/${this.movie_detail.id}/watched/`
      // 있을 때 > delete 요청
      if (this.checkWatched) {
        axios({
          method: 'delete',
          url: url,
          headers: {
            Authorization: `Token ${ this.$store.state.token }`
        }
        })
        .then((res) => console.log('watched delete', res))
        .catch((err) => console.log('watched', err))
      } 
      // 없을 때 post 요청 
      else {
        axios({
          method: 'post',
          url: url,
          headers: {
            Authorization: `Token ${ this.$store.state.token }`
        }
        })
        .then((res) => console.log('watched post', res))
        .catch((err) => console.log('watched', err))
      }
      this.$store.dispatch('getUser')
      
    },
    // toWatch toggle
    toggleToWatch() {
      const url = `${this.$store.state.API_URL}/api/accounts/${this.$store.state.user_pk}/${this.movie_detail.id}/to_watch/`
      // 있을 때 > delete 요청
      if (this.checkToWatch) {
        axios({
          method: 'delete',
          url: url,
          headers: {
            Authorization: `Token ${ this.$store.state.token }`
        }
        })
        .then((res) => console.log('watched delete', res))
        .catch((err) => console.log('watched', err))
      } 
      // 없을 때 post 요청 
      else {
        axios({
          method: 'post',
          url: url,
          headers: {
            Authorization: `Token ${ this.$store.state.token }`
        }
        })
        .then((res) => console.log('watched post', res))
        .catch((err) => console.log('watched', err))
      }
      this.$store.dispatch('getUser')

    },

    // 사용자 코멘트, 추천 영화 보이기
    showComponents() {

    },

    // 리뷰 작성
    reviewCreate() {
      const content = this.content;
      if (!content) {
        alert("내용을 입력해주세요");
        return;
      }

			const API_URL = this.$store.state.API_URL;

      axios({
        method: "post",
        url: `${API_URL}/api/articles/${this.movieId}/review_create/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
        data: {
          content,
        },
      })
        .then(() => {
					this.$router.push({name: 'movieDetail', params: {movieId: this.movieId}})
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  filters: {
    getYear(date) {
      const y = date.slice(0, 4)
      return y
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/reset.scss';
@import '../assets/scss/MovieItem.scss';
@import '../assets/scss/MovieDetail.scss';
</style>
