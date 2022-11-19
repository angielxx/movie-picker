<template>
  <div class="searchView">
    <div class="home__search-container">
        <SearchBar autofocus v-on:getResults="showResult"/>
      </div>
    <div class="search-result">
      <MovieItem v-for="(movie, key) in movies" :key="key" :movie="movie"/>
    </div>
  </div>
</template>

<script>
import MovieItem from '../components/MovieItem.vue';
import SearchBar from '@/components/SearchBar';

export default {
  name: 'searchView',
  components: {
    MovieItem,
    SearchBar,
  },

  data() {
    return {
      movies: [],
    };
  },

  created() {
    
  },

  methods: {
    showResult(data) {
      console.log('data!') 
      console.log(data)
      this.movies = data
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/SearchView.scss';
</style>