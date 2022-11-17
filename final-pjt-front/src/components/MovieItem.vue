<template>
  <div class="movie-item" @click="movieDetail">
    <div class="movie-item__poster">
      <img src="" alt="">
    </div>
    <div class="motie-item__info">
      <h3>movie title</h3>
      <div class="movie-item__info__subinfo">
        <span>year・</span><span>country</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {

  },

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/MovieItem.scss'
</style>