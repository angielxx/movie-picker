<template>
    <div class="wrapper">
        <div class="greeting">
            <h2 class="greeting__line1">안녕하세요, <span><strong>{{ this.$store.state.username }}</strong></span>! </h2>
            <h2 class="greeting__line2">본 영화를 선택해주세요 </h2>
        </div>
        <div class="movie-container">
            <div class="movie-container__btns">
                <button @click="refreshMovieList">목록 새로고침</button>
                <button @click="postUserMovies">선택 완료</button>
            </div>
            <div class="movie-container__list">
                <MovieItem v-on:addMovie="addMovie" v-for="(movie, key) in all_movies.slice(0, 20)" :key="key" :movie="movie"/>
            </div>
        </div>
    </div>
</template>

<script>
import MovieItem from '@/components/MovieItem.vue';
// import axios from 'axios';
// import movies from './@/../../assets/movie_data.json';
import axios from 'axios';
// import Vue from 'vue';

// Vue.forceUpdate();

export default {
    name: 'FirstAddMovieView',
    components: {
        MovieItem
    },

    data() {
        return {
            all_movies: [],
            movies: [],
            clickedMoviesPk: [],
            page: 1,
        };
    },
    watch: {
        page: function() {
            this.movies = this.all_movies.slice(20 * this.page - 20, 20 * this.page)
        }
        // movies: {
        //     // computed 속성 v-model로 쓰려면 setters가 필요
        //     get: function() {
        //         return this.all_movies.slice(20 * this.page - 20, 20 * this.page)
        //     },
        //     set: function(newMovies) {
        //         return this.newMovies.slice(20 * this.page - 20, 20 * this.page)
        //     }
        // }
        // // function() {
        // //     return this.all_movies.slice(20 * this.page - 20, 20 * this.page);
        // // }
    },

    // greeting 나오는 동안 로딩되게 할 수 있을까?
    created() {
        this.getMovies();
        this.clickedMoviesPk = [];
    },

    methods: {
        // 모든 영화 데이터 가져오기
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
                const all_movies = res.data;
                this.all_movies = all_movies;
            })
            // .catch(err => console.log('err', err))

            // 임시 데이터 가져오기
            // this.movies = movies;
        },

        // 클릭한 영화 data에 추가
        addMovie() {
            const clickedMovies = document.querySelectorAll('.clicked');
            let clickedMoviesPk = [];
            clickedMovies.forEach((movie) => {
                clickedMoviesPk.push(movie.parentNode.dataset.moviepk)});
            this.clickedMoviesPk = clickedMoviesPk;
            return
        },

        // 영화 목록 새로고침
        refreshMovieList() {
            this.page++;
            // const movieList = document.querySelector('.movie-container__list');
            // movieList.innerHTML = `<MovieItem v-on:addMovie="addMovie" v-for="(movie, key) in movies.slice(20 * ${this.page} - 20, 20 * ${this.page})" :key="key" :movie="movie"/>`
        },
        
        // 유저의 watched_movie POST 요청 보내기
        postUserMovies() {
            const API_URL = this.$store.state.API_URL;
            const user_pk = 1; // 임시 유저 pk 값
            this.clickedMoviesPk.forEach((movie_pk) => {
                axios({
                    method: 'post',
                    url: `${API_URL}/api/accounts/${user_pk}/${movie_pk}/watched/`,
                    headers: {
                    Authorization: `Token 6023611848bfca271b0de4cb5db50064289b791d` //임시 토큰
                    // Authorization: `Token ${ this.$store.state.token }`
                    }
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            })
            this.$router.push({ name: 'home' })
        }
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/FirstAddMovieView.scss';
</style>