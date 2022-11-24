<template>
  <div class="searchView">
    <UserSearchBar v-on:getResults="showResult"/>
    <div class="search-result">
      <UserItem v-for="(user, key) in users" :key="key" :user="user"/>
    </div>
  </div>
</template>

<script>
import UserItem from '@/components/SearchUserItem.vue';
import UserSearchBar from '@/components/UserSearchBar';

export default {
  name: 'UserSearchView',
  
  components: {
    UserItem,
    UserSearchBar,
  },

  data() {
    return {
      users: [],
    };
  },

  mounted() {
    // search로 올때 input에 autofocus
    document.querySelector('#app > div > div.searchView > div.search-bar > form > input[type=text]:nth-child(1)').focus()
  },

  methods: {
    showResult(data) {
      this.users = data
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/UserSearchView.scss';
</style>