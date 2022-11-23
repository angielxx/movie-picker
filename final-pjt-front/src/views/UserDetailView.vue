<template>
  <div class="UserDetail">
    <div class="modal hidden">
      <div class="modal__box">
        <div class="modal__box__close" >
          <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
        </div>
        <div class="modal__box__content">
          <input type="file" ref="avatarImage" @change="uploadAvatar">
          <button type="submit" @click.prevent="submitAvatar"> Submit</button>
        </div>
      </div>
    </div>
    <div class="header">
      <div class="user-info">
        <div class="user-info__img" :style="`background-image: url(${this.$store.state.API_URL}${this.avatar})`">
          <svg v-if="this.user_pk == this.$store.state.user_pk" @click="showModal" width="484" height="512" viewBox="0 0 484 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M481.9 166.6C485.1 175.3 482.4 185 475.5 191.2L432.2 230.6C433.3 238.9 433.9 247.4 433.9 256C433.9 264.6 433.3 273.1 432.2 281.4L475.5 320.8C482.4 327 485.1 336.7 481.9 345.4C477.5 357.3 472.2 368.7 466.1 379.7L461.4 387.8C454.8 398.8 447.4 409.2 439.3 419C433.4 426.2 423.6 428.6 414.8 425.8L359.1 408.1C345.7 418.4 330.9 427 315.1 433.5L302.6 490.6C300.6 499.7 293.6 506.9 284.4 508.4C270.6 510.7 256.4 511.9 241.9 511.9C227.4 511.9 213.2 510.7 199.4 508.4C190.2 506.9 183.2 499.7 181.2 490.6L168.7 433.5C152.9 427 138.1 418.4 124.7 408.1L69.0999 425.9C60.2999 428.7 50.4999 426.2 44.5999 419.1C36.4999 409.3 29.0999 398.9 22.4999 387.9L17.7999 379.8C11.6999 368.8 6.39987 357.4 1.99987 345.5C-1.20013 336.8 1.49987 327.1 8.39987 320.9L51.6999 281.5C50.5999 273.1 49.9999 264.6 49.9999 256C49.9999 247.4 50.5999 238.9 51.6999 230.6L8.39987 191.2C1.49987 185 -1.20013 175.3 1.99987 166.6C6.39987 154.7 11.6999 143.3 17.7999 132.3L22.4999 124.2C29.0999 113.2 36.4999 102.8 44.5999 93C50.4999 85.8 60.2999 83.4 69.0999 86.2L124.8 103.9C138.2 93.6 153 85 168.8 78.5L181.3 21.4C183.3 12.3 190.3 5.1 199.5 3.6C213.3 1.2 227.5 0 242 0C256.5 0 270.7 1.2 284.5 3.5C293.7 5 300.7 12.2 302.7 21.3L315.2 78.4C331 84.9 345.8 93.5 359.2 103.8L414.9 86.1C423.7 83.3 433.5 85.8 439.4 92.9C447.5 102.7 454.9 113.1 461.5 124.1L466.2 132.2C472.3 143.2 477.6 154.6 482 166.5L481.9 166.6ZM242 336C286.2 336 322 300.2 322 256C322 211.8 286.2 176 242 176C197.8 176 162 211.8 162 256C162 300.2 197.8 336 242 336Z" fill="url(#paint0_radial_264_147)"/>
            <defs>
            <radialGradient id="paint0_radial_264_147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(142.256 154.796) rotate(48.5566) scale(580.659 577.426)">
            <stop stop-color="#FFB3F3"/>
            <stop offset="1" stop-color="#BA63FF"/>
            </radialGradient>
            </defs>
          </svg>
        </div>
          <div class="user-info__main">
            <h1 class="user-info__main__username">{{ this.username }}
              <svg v-if="this.user_pk == this.$store.state.user_pk" @click="editMessage" width="266" height="266" viewBox="0 0 266 266" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M188.636 9.75106L163.463 34.9218L231.075 102.529L256.248 77.3584C269.251 64.357 269.251 43.2947 256.248 30.2933L235.756 9.75106C222.754 -3.25035 201.69 -3.25035 188.688 9.75106H188.636ZM151.709 46.6751L30.4741 167.952C25.0651 173.361 21.1123 180.07 18.9279 187.402L0.516492 249.965C-0.78375 254.386 0.412473 259.118 3.63707 262.343C6.86168 265.567 11.5946 266.763 15.9634 265.515L78.531 247.105C85.8644 244.921 92.5737 240.968 97.9827 235.56L219.321 114.282L151.709 46.6751Z" fill="url(#paint0_radial_263_144)"/>
              <defs>
              <radialGradient id="paint0_radial_263_144" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(78.0479 80.4371) rotate(46.8745) scale(309.896)">
              <stop stop-color="#FFB3F3"/>
              <stop offset="1" stop-color="#BA63FF"/>
              </radialGradient>
              </defs>
              </svg>
            </h1>
            <h1 v-if="this.message" class="user-info__main__message">{{ this.message }}</h1>
            <p v-else class="user-info__main__message">상태 메세지가 없습니다.</p>
          </div>
          <div class="user-info__sub">
            <div class="user-info__sub__follow">
              <h2>{{ this.followers.length }}</h2>
              <h2>팔로워</h2>
            </div>
            <div class="user-info__sub__follow">
              <h2>{{ this.followings.length }}</h2>
              <h2>팔로잉</h2>
            </div>
          </div>
        </div>
    </div>
    <div class="wrapper">
      <div class="movies">
        <div class="link">
          <div @click.prevent="switchTab($event)" id="tab_button" class="link__button active" data-tab="watched">
            <h3 data-tab="watched">봤어요</h3>
            <div id="link-active" class="link__button__line active-line"></div>
          </div>
          <div @click.prevent="switchTab($event)" id="tab_button" class="link__button" data-tab="toWatch">
            <h3 data-tab="toWatch">보고싶어요</h3>
            <div id="link-active" class="link__button__line"></div>
          </div>
        </div>
        <div class="movies__list">
          <MovieItem v-for="(movie, key) in this.movies" :key="key" :movie="movie"/>
        </div>
      </div>
      <div class="records">
        <div class="records__title">
          <h3>내가 쓴 코멘트</h3>
        </div>
        <div class="records__list">
          <UserReviewItem v-for="(review, key) in reviews" :key="key" :review="review"/>
        </div>
      </div>
    </div>
    <!-- <MovieItem/> -->
  </div>
</template>

<script>
import axios from "axios";
import MovieItem from '@/components/MovieItem.vue';
import UserReviewItem from '@/components/UserReviewItem.vue';


export default {
  name: "UserDetailView",
  components: {
    MovieItem,
    UserReviewItem,
  },
  data() {
    return {
      user_pk: this.$route.params.userId,
      username: null,
      followings: null,
      followers: null,
      message: null,
      avatar: null,

      watched_movies: [],
      to_watch_movies: [],
      best_movie: null,

      // tab에 보여질 영화들
      movies: [],

      reviews: [],

      selectedFile: null,

    };
  },

  created() {
    this.getMovies()
    this.getReviews()
    this.getUserInfo()
  },
  
  mounted() {
    // this.setHeaderImg()
  },

  methods: {
    setHeaderImg() {
      
      if (this.best_movie) {
        document.querySelector('.header').style.backgroundImage = `linear-gradient(to bottom, rgba(20, 18, 23, 1), rgba(20, 18, 23, 0.8)), url(https://image.tmdb.org/t/p/original/${this.best_movie.movie.backdrop_path})`
      } else {
        document.querySelector('.header').style.backgroundImage = `linear-gradient(to bottom, rgba(20, 18, 23, 1), rgba(20, 18, 23, 0.8)), url(${'@/assets/img/default_user_backdrop.jpg'})`

      }
    },
    getMovies() {
      const API_URL = this.$store.state.API_URL;
      // watched
      axios({
        method: "get",
        url: `${API_URL}/api/accounts/${this.user_pk}/watched/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        this.watched_movies = res.data.watched_movies
        this.movies = this.watched_movies
      })
      // .catch((err) => console.log(err))
      
      // to watch
      axios({
        method: "get",
        url: `${API_URL}/api/accounts/${this.user_pk}/to_watch/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        this.to_watch_movies = res.data.to_watch_movies
      })
      // .catch((err) => console.log(err))
      
      // best movie
      axios({
        method: "get",
        url: `${API_URL}/api/accounts/${this.user_pk}/best/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        // console.log('best_movie', res.data)
        const all_best_movies = res.data
        this.best_movie = all_best_movies[all_best_movies.length - 1]
        this.setHeaderImg()
      })
      .catch((err) => console.log('best movie',err))
    },

    // 내가 쓴 리뷰 받아오기
    getReviews() {
      const API_URL = this.$store.state.API_URL;
      axios({
        method: "get",
        url: `${API_URL}/api/articles/${this.user_pk}/review_user/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        this.reviews = res.data;
        // console.log(res.data)
      })
      .catch((err) => console.log(err))
    },

    // tab 바꾸기
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

      // movies 바꾸기
      if (tabId === 'watched') this.movies = this.watched_movies
      else this.movies = this.to_watch_movies
    },

    // 다른 유저의 정보 가져오기(id, username, message, avatar, followings, followers)
    getUserInfo() {
      const API_URL = this.$store.state.API_URL;
      const userId = this.user_pk // 임시로 설정한 다른 유저의 pk 값입니다. 이후 적절한 데이터로 수정해주세요
      axios({
        method: "get",
        url: `${API_URL}/api/accounts/get_profile/${userId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        const data = res.data
        // console.log(data)
        this.followers = data.followers
        this.followings = data.followings
        this.message = data.message
        this.username = data.username
        this.avatar = data.avatar
      })
      .catch((err) => console.log(err))
    },

    // 프사 업로드
    uploadAvatar() {
      this.selectedFile = this.$refs.avatarImage.files
      // console.log(this.selectedFile)
    },

    // 서버에 전송
    submitAvatar() {
      const API_URL = this.$store.state.API_URL;
      const formdata = new FormData()

      formdata.append('avatar', this.selectedFile[0])
      // console.log(formdata)

      axios({
        method: "PATCH",
        url: `${API_URL}/api/accounts/update_avatar/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formdata
      })
        .then(() => {
          this.$store.dispatch('getUser')
        })
        .catch((err) => console.log(err))
    },

    // 프로필 사진 수정 모달 띄우기
    showModal() {
      const modal = document.querySelector('.modal')
      modal.classList.remove('hidden')
      //  console.log('modal show')
    },
    // 프로필 수정 모달 숨기기
    closeModal() {
      const modal = document.querySelector('.modal')
      modal.classList.add('hidden')
      // console.log('modal hide')
    },
    editMessage() {
      
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/UserDetailView.scss';
</style>
