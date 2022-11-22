<template>
  <div class="search-bar">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg>
    <form action="" class="search-bar__form">
      <input type="text" placeholder="유저 바로 검색하기" @click="goSearch" @focus="goSearch" @input="searchUser($event)">
      <input type="submit" value="">
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserSearchBar',

  data() {
    return {
      results: null,
    };
  },

  methods: {
    // search로 이동
    goSearch() {
      // route에 따라 클릭시 이동
      if(['feed'].includes(this.$route.name)) {
        this.$router.push({ name: 'userSearch'})
      }
    },
    // // UserSearch로 이동
    // goUserSearch() {
    //   if (this.$route.name !== 'search') {
    //     this.$router.push({ name: 'search'})
    //   }

    // },
    // index로 돌아가기
    goBackHome() {
      this.$router.push({ name: 'home'})
    },
    // input 이벤트 핸들러 : 영화 검색 api 요청
    searchMovie(event) {
      const query = event.target.value
      const API_URL = this.$store.state.API_URL
      const SEARCH_URL = `${API_URL}/api/movies/search_movie/${query}/`
      axios({
        method: 'get',
        url: SEARCH_URL,
        headers: {
            // Authorization: `Token 6023611848bfca271b0de4cb5db50064289b791d` //임시 토큰
            Authorization: `Token ${ this.$store.state.token }`
        }
      })
      .then(res => {
        const movies = res.data
        this.results = movies
        console.log(this.results)
      })
      .then(() => {
        this.$emit('getResults', this.results)
      })
    },
    // 유저를 검색하는 axios 요청입니다.(메서드만 작성, 이후 프론트 작업 시 필요한 컴포넌트에 등록해주세요)
    searchUser(event) {
      const query = event.target.value
      const API_URL = this.$store.state.API_URL
      const SEARCH_URL = `${API_URL}/api/accounts/search_user/${query}/`
      axios({
        method: 'get',
        url: SEARCH_URL,
        headers: {
            // Authorization: `Token 6023611848bfca271b0de4cb5db50064289b791d` //임시 토큰
            Authorization: `Token ${ this.$store.state.token }`
        }
      })
      // 이하 then() 부분의 변수명 등은 로직에 맞게 수정해주세요
      .then(res => {
        const users = res.data
        this.results = users
        console.log(this.results)
      })
      .then(() => {
        this.$emit('getResults', this.results)
      })
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/SearchBar.scss';
</style>