<template>
    <div class="wrapper">
        <div class="greeting">
            <h2 class="greeting__line1">안녕하세요, <span><strong>username</strong></span>! </h2>
            <h2 class="greeting__line2">본 영화를 선택해주세요 </h2>
        </div>
        <div class="movie-container">
            <div class="movie-container__btns">
                <button>목록 새로고침</button>
                <button @click="postUserMovies">선택 완료</button>
            </div>
            <div class="movie-container__list">
                <MovieItem v-on:addMovie="addMovie" v-for="(movie, key) in movies" :key="key" :movie="movie"/>
            </div>
        </div>
    </div>
</template>

<script>
import MovieItem from '@/components/MovieItem.vue';
// import axios from 'axios';
// import movies from './@/../../assets/movie_data.json';
import axios from 'axios';

export default {
    name: 'FirstAddMovieView',
    components: {
        MovieItem
    },

    data() {
        return {
            movies: null,
            clickedMoviesPk: [],
        };
    },

    // greeting 나오는 동안 로딩되게 할 수 있을까?
    created() {
        this.getMovies();
        this.clickedMoviesPk = [];
    },

    methods: {
        getMovies() {
            const API_URL = this.$store.state.API_URL;
            axios({
                method: 'get',
                url: `${API_URL}/api/movies/`,
                headers: {
                    Authorization: `Token 6023611848bfca271b0de4cb5db50064289b791d` //임시 토큰
                    // Authorization: `Token ${ this.$store.state.token }`
                }
            })
            .then(res => {
                console.log(res)
                const movies = res.data;
                this.movies = movies;
                console.log(movies)
            })
            .catch(err => console.log('err', err))

            // 임시 데이터 가져오기
            // this.movies = movies;
        },
        addMovie() {
            const clickedMovies = document.querySelectorAll('.clicked');
            let clickedMoviesPk = [];
            clickedMovies.forEach((movie) => {
                clickedMoviesPk.push(movie.parentNode.dataset.moviepk)});
            this.clickedMoviesPk = clickedMoviesPk;
            return
        },
        postUserMovies() {
            // 유저의 watched_movie POST 요청 보내기
            const API_URL = this.$store.state.API_URL;
            const user_pk = 1; // 임시 유저 pk 값
            this.clickedMoviesPk.forEach((movie_pk) => {
                axios({
                    method: 'post',
                    url: `${API_URL}/${user_pk}/${movie_pk}/watched/`
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            })
        }
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/FirstAddMovieView.scss';
</style>