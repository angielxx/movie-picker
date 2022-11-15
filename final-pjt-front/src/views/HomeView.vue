<template>
  <div class="home">
    <SearchBar/>
    <div class="home__left">
      <div class="best-movie">
        <h1>내 인생영화</h1>
        <div class="best-movie__container">
          <div class="best-movie__container__poster">
  
          </div>
          <div class="best-movie__container__info">
            
          </div>
        </div>
      </div>
    </div>
    <div class="home__right"></div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
  }
}
</script>

<style lang="scss">
@import '../assets/scss/HomeView.scss';
</style>