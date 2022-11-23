<template>
  <div class="movieReviewItem">
    <div class="profile"
    :style="`background-image: url(${this.$store.state.API_URL}${this.$store.state.avatar})`"
    >

    </div>
    <div class="content">
      <h2 class="content__username">{{ review.username }}</h2>
      <h2 class="content__content">{{ review.content }}</h2>
    </div>
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
