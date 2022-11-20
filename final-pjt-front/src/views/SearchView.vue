<template>
  <div class="searchView">
    <SearchBar v-on:getResults="showResult"/>
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

  mounted() {
    document.querySelector('input[type="text"]').focus()
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