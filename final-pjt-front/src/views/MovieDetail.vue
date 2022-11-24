<template>
  <div class="movie-detail">
    <SearchBar/>
    <div class="movie-detail__container">
      <div class="wrapper" :style="`background-image: linear-gradient(to bottom, rgba(20, 18, 23, 1), rgba(20, 18, 23, 0.8)), url(https://image.tmdb.org/t/p/original/${this.movie_detail.backdrop_path}`">
        <div class="main-info">
          <div
          class="main-info__poster"
          :style="`background-image: url(https://image.tmdb.org/t/p/w400/${movie_detail.poster_path})`">
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
              <div class="addToWatch" @click="toggleToWatch">
                <svg v-if="!checkToWatch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                <h3>보고싶어요</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-wrapper">
        
        <div class="left">
          <div class="link">
            <div id="tab_button" class="link__button active" data-tab="comments">
              <h3 @click.prevent="switchTab($event)" data-tab="comments">사용자 코멘트</h3>
              <div id="link-active" class="link__button__line active-line"></div>
            </div>
            <div id="tab_button" class="link__button" data-tab="recommends">
              <h3 @click.prevent="switchTab($event)" data-tab="recommends">관련 추천 영화</h3>
              <div id="link-active" class="link__button__line"></div>
            </div>
          </div>
    
          <div class="area">
            <div class="area__reviews">
              <!-- 하위컴포넌트인 리뷰를 보여줍니다. -->
              <div id="tab_content" class="area__reviews__my-review" data-tab="comments">
                <h3 class="heading">내 코멘트</h3>
                <form
                class="review-form"
                v-if="!checkMyReview"
                @submit.prevent="reviewCreate"
                >
                  <label for="content" class="hidden">내용 : </label>
                  <textarea id="content" cols="30" rows="1" v-model="content"></textarea><br/>
                    <input type="submit" id="submit" value="코멘트 작성"/>
                </form>
                <MovieReviewItem
                v-else
                class="my-review"
                :review="myReview"/>
                <div class="area__reviews__all-reviews">
                  <h3 class="heading">사용자 코멘트</h3>
                  <MovieReviewItem v-for="(review, key) in userReviews.slice().reverse()" :key="key" :review="review"/>
                  <!-- <MovieReview :movieId="this.movieId"/> -->
                </div>
              </div>
              <div
              v-if="this.recommendedMovies.length"
              id="tab_content"  class="area__reviews__recommends hidden" data-tab="recommends">
                  <RecommendedMoviesItem v-for="(movieId, key) in this.recommendedMovies" :key="key" :movie-id="movieId"/>
              </div>
            </div>
          </div>
        </div>
        <div class="pickedUser" v-if="this.pickedUsers.length">
          <div class="pickedUser__title">
            <h2>이 영화가 인생영화인 사람들</h2>
            <span>{{ this.pickedUsersNumber }}</span>
          </div>
          <div class="pickedUser__window">
            <!-- <div class="pickedUser__window__list"> -->
              <MovieDetailUserItem v-for="(user, key) in pickedUsers" :key="key" :user="user"/>
            <!-- </div> -->
          </div>
        </div>
      </div>

    </div>
    </div>
</template>

<script>
import axios from "axios";
import MovieReviewItem from '@/components/MovieReviewItem.vue';
import RecommendedMoviesItem from "@/components/RecommendedMoviesItem.vue";
import SearchBar from "@/components/SearchBar.vue";
import MovieDetailUserItem from '@/components/MovieDetailUserItem.vue';

export default {
  name: "MovieDetail",
  components: {
    RecommendedMoviesItem,
    MovieReviewItem,
    SearchBar,
    MovieDetailUserItem,
  },
  data() {
    return {
      movieId: this.$route.params.movieId,
      movie_detail: {},
      content: null,
      allPickedUsers: [],

      reviews: [],
    };
  },

  mounted() {
    this.getMovie()
    this.getReviews()
    this.getPickedUsers()
  },

  beforeRouteUpdate(to, from, next) {
    this.movieId = to.params.movieId
    next()
    // 강제 새로고침 하는 방법으로 임시로 해결
    this.$router.go()
  },
  
  computed: {
    // 해당 영화에 대한 추천 영화 리스트 저장
    recommendedMovies(){
      return this.movie_detail.recommended
    },
    // watched 포함 여부
    // 있으면 true 반환
    checkWatched() {
      const movies = this.$store.state.watched_movies
      const flag = movies.some((movie) => movie.id === this.movie_detail.id)
      return flag
    },
    
    // to watch 포함 여부
    // 있으면 true 반환
    checkToWatch() {
      const movies = this.$store.state.to_watch_movies
      const flag = movies.some((movie) => movie.id === this.movie_detail.id)
      return flag
    },
    pickedUsers() {
      let allPickedUsers = this.allPickedUsers
      allPickedUsers = allPickedUsers.filter((userObj) => userObj.user.id !== this.$store.state.user_pk)
      return allPickedUsers
    },

    // 해당 영화에 내가 쓴 리뷰가 있는지 확인
    checkMyReview() {
      return this.reviews.some((review) => review.username === this.$store.state.username)
    },

    // 나의 리뷰
    myReview() {
      return this.reviews.find((review) => review.username === this.$store.state.username)
    },

    // 나를 제외한 사용자들 리뷰
    userReviews() {
      return this.reviews.filter((review) => review.username !== this.$store.state.username)
    },

    // 이 영화가 인생영화인 사람들 수
    pickedUsersNumber() {
      return this.pickedUsers.length
    }
  },
  
  methods: {
    // 영화 가져오기
    getMovie() {
      const API_URL = this.$store.state.API_URL;
      axios({
        method: "get",
        url: `${API_URL}/api/movies/${this.movieId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        this.movie_detail = res.data;

      })
      .catch((err) => console.log(err));
    },

    // 리뷰들 가져오기
    getReviews() {
      const API_URL = this.$store.state.API_URL;
      axios({
        method: "get",
        url: `${API_URL}/api/articles/${this.movieId}/review_movie`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.reviews = res.data;
        })
        .catch((err) => console.log(err));
    },

    // watched 추가 혹은 삭제
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
        // .then((res) => console.log(res))
        .catch((err) => console.log(err))
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
        // .then((res) => console.log(res))
        .catch((err) => console.log(err))
      }
      this.$store.dispatch('getUser')
      
    },
    // toWatch 추가 혹은 삭제
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
        // .then((res) => console.log(res))
        .catch((err) => console.log(err))
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
        // .then((res) => console.log(res))
        .catch((err) => console.log(err))
      }
      this.$store.dispatch('getUser')

    },

    // 사용자 코멘트, 추천 영화 보이기
    switchTab(event) {
      const tabId = event.currentTarget.dataset.tab
      const tab_contents = document.querySelectorAll('#tab_content')
      const tab_buttons = document.querySelectorAll('#tab_button')
      tab_contents.forEach((tab) => {
        if (tab.dataset.tab === tabId) {
          tab.classList.remove('hidden')
        } else {
          tab.classList.add('hidden')
        }
      })
      tab_buttons.forEach((btn) => {
        const line = btn.querySelector('div')
        if (btn.dataset.tab === tabId) {
          btn.classList.add('active')
          line.classList.add('active-line')
        } else {
          btn.classList.remove('active')
          line.classList.remove('active-line')
        }
      })
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
          this.getReviews()
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 해당 영화를 인생 영화로 고른 유저들을 API GET 요청으로 불러오는 메서드입니다.(mounted에 실행됩니다.)
    getPickedUsers() {
      const API_URL = this.$store.state.API_URL;

      axios({
        method: "GET",
        url: `${API_URL}/api/movies/picked_users/${this.movieId}/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
      })
        .then((res) => {
          // data의 pickedUsers에 불러온 데이터를 할당합니다.
          this.allPickedUsers = res.data
        })
        .catch((err) => {
          console.log(err);
        });
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
    getYear(date) {
      const y = date.slice(0, 4)
      return y
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/reset.scss';
@import '../assets/scss/MovieItem.scss';
@import '../assets/scss/MovieDetail.scss';
</style>
