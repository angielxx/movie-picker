<template>
  <div class="movie-item"  @click="goDetail()" :data-moviePK="movie.id">
    <div class="movie-item__poster" @mouseover="showBtns" @mouseout="hideBtns" :style="`background-image: url(https://image.tmdb.org/t/p/w400/${movie.poster_path})`">
    </div>
    <div class="movie-item__info">
      <h3 class="movie-item__info__title">{{ movie.title }}</h3>
      <div class="movie-item__info__subinfo">
        <span>{{ movie.released_date | getYear }}・</span><span>{{ movie.genres[0]["name"] }}・</span><span>{{ movie.countries[0]["name"] }}</span>
      </div>
    </div>
    <div class="buttons" @mouseover="showBtns" v-if="!this.DoNotShowBtns.includes(this.$route.name)">
      <div class="buttons__watched" @click="toggleWatched">
        
        <svg v-if="checkWatched" width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M470.6 105.4C483.1 117.9 483.1 138.2 470.6 150.7L214.6 406.7C202.1 419.2 181.8 419.2 169.3 406.7L41.3 278.7C28.8 266.2 28.8 245.9 41.3 233.4C53.8 220.9 74.1 220.9 86.6 233.4L192 338.7L425.4 105.4C437.9 92.8999 458.2 92.8999 470.7 105.4H470.6Z" fill="url(#paint0_radial_241_126)"/>
          <defs>
            <radialGradient id="paint0_radial_241_126" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(163.389 192.807) rotate(37.3311) scale(448.762 433.706)">
              <stop stop-color="#FFB3F3"/>
              <stop offset="1" stop-color="#BA63FF"/>
            </radialGradient>
          </defs>
        </svg>
        <svg v-else width="448" height="512" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 80C256 62.3 241.7 48 224 48C206.3 48 192 62.3 192 80V224H48C30.3 224 16 238.3 16 256C16 273.7 30.3 288 48 288H192V432C192 449.7 206.3 464 224 464C241.7 464 256 449.7 256 432V288H400C417.7 288 432 273.7 432 256C432 238.3 417.7 224 400 224H256V80Z" fill="white"/>
        </svg>
        <h2 class="buttons__watched__text">봤어요</h2>
      </div>
      <div class="buttons__toWatch" @click="toggleToWatch">
        <svg v-if="checkToWatch" width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M470.6 105.4C483.1 117.9 483.1 138.2 470.6 150.7L214.6 406.7C202.1 419.2 181.8 419.2 169.3 406.7L41.3 278.7C28.8 266.2 28.8 245.9 41.3 233.4C53.8 220.9 74.1 220.9 86.6 233.4L192 338.7L425.4 105.4C437.9 92.8999 458.2 92.8999 470.7 105.4H470.6Z" fill="url(#paint0_radial_241_126)"/>
          <defs>
            <radialGradient id="paint0_radial_241_126" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(163.389 192.807) rotate(37.3311) scale(448.762 433.706)">
              <stop stop-color="#FFB3F3"/>
              <stop offset="1" stop-color="#BA63FF"/>
            </radialGradient>
          </defs>
        </svg>
        <svg v-else width="448" height="512" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 80C256 62.3 241.7 48 224 48C206.3 48 192 62.3 192 80V224H48C30.3 224 16 238.3 16 256C16 273.7 30.3 288 48 288H192V432C192 449.7 206.3 464 224 464C241.7 464 256 449.7 256 432V288H400C417.7 288 432 273.7 432 256C432 238.3 417.7 224 400 224H256V80Z" fill="white"/>
        </svg>
        <h2 class="buttons__toWatch__text">보고싶어요</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'MovieItem',
  props: {
    movie: Object,
  },

  data() {
    return {
      DoNotShowBtns: ['userDetail', 'home']
    };
  },

  computed: {
    checkWatched() {
      const movies = this.$store.state.watched_movies
      const flag = movies.some((movie) => movie.id === this.movie.id)
      return flag
    },
    checkToWatch() {
      const movies = this.$store.state.to_watch_movies
      const flag = movies.some((movie) => movie.id === this.movie.id)
      return flag
    },
  },

  methods: {
    // 한 영화 클릭 > clicked 클래스 추가
    // clickMovie(event) {
    //   // console.log('clicked!')
    //   if (!['userDetail'].includes(this.$route.name)) {
    //     const target = event.currentTarget.children[0];
    //     target.classList.toggle('clicked');
    //   }
    //   return
    // },

    // 영화 디테일 페이지로 이동
    goDetail() {
      // 영화 디테일 페이지로 이동하면 안되는 라우터
      if (!['first-addMovie', 'addMovie', ].includes(this.$route.name)) {
        this.$router.push({name: 'movieDetail', params: {movieId: this.movie.id}})
      }
    },

    // watched 추가 혹은 삭제
    toggleWatched() {
      console.log('watched clicked')
      const url = `${this.$store.state.API_URL}/api/accounts/${this.$store.state.user_pk}/${this.movie.id}/watched/`
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
        .catch((err) => console.log('watched err', err))
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
        .catch((err) => console.log('watched err', err))
      }
      this.$store.dispatch('getUser')
      
    },

    // toWatch 추가 혹은 삭제
    toggleToWatch() {
      const url = `${this.$store.state.API_URL}/api/accounts/${this.$store.state.user_pk}/${this.movie.id}/to_watch/`
      // 있을 때 > delete 요청
      if (this.checkToWatch) {
        axios({
          method: 'delete',
          url: url,
          headers: {
            Authorization: `Token ${ this.$store.state.token }`
        }
        })
        .then((res) => console.log('towatch delete', res))
        .catch((err) => console.log('towatch err', err))
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
        .catch((err) => console.log('watched err', err))
      }
      this.$store.dispatch('getUser')
    },

    // 버튼 보이기
    showBtns(event) {
      if (!this.DoNotShowBtns.includes(this.$route.name)) {
        event.currentTarget.parentNode.querySelector('.buttons').style.opacity = '1'
      }
    },
    
    // 버튼 숨기기
    hideBtns(event) {
      if (!this.DoNotShowBtns.includes(this.$route.name)) {
        event.currentTarget.parentNode.querySelector('.buttons').style.opacity = '0'
      }
    }
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
@import '../assets/scss/MovieItem.scss'
</style>