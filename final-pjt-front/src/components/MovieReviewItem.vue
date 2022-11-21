<template>
  <div class="movieReviewItem">
    <!-- <h1>title: {{ review.title }}</h1> -->
    <div class="profile">

    </div>
    <div class="content">
      <h2 class="content__username">{{ review.username }}</h2>
      <h2 class="content__content">{{ review.content }}</h2>
    </div>
    <!-- <h1>{{review.movie}}</h1> -->
  </div>
</template>

<script>
export default {
  name: "MovieReviewItem",
  props: {
    review: Object,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/MovieReviewItem.scss';
</style>
