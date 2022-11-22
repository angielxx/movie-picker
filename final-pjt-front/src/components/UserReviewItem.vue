<template>
  <div class="UserReviewItem">
    <div class="info">
      <h2 class="info__title">{{ this.movie.title }}</h2>
      <h2 class="info__date">{{ this.review.created_at | formatDate }}</h2>
    </div>
    <p>{{this.review.content}}</p>
  </div>
</template>

<script>
export default {
  name: "UserReviewItem",
  props: {
    review: Object,
  },

  data() {
    return {
      movie: this.review.movie
    };
  },

  mounted() {},

  methods: {},

  filters: {
    formatDate(date) {
      const y = date.slice(0, 4)
      const m = date.slice(5, 7)
      const d = date.slice(8, 10)
      const result = `${y}.${m}.${d}`
      return result
    },
    formatYear(date) {
      const y = date.slice(0, 4)
      return y
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/UserReviewItem.scss';
</style>
