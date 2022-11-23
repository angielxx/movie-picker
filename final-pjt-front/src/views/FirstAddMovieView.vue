<template>
    <div class="wrapper">
        <div class="greeting">
            <div v-if="this.$route.name === 'first-addMovie'">
                <h2 class="greeting__line1">안녕하세요, <span><strong>{{ this.$store.state.username }}</strong></span>님! </h2>
                <h2 class="greeting__line2"><span><strong>{{ this.$store.state.username }}</strong></span>님의 영화를 선택해주세요</h2>
            </div>
            <div v-if="this.$route.name === 'addMovie'">
                <h2 class="greeting__line1"><span><strong>{{ this.$store.state.username }}</strong></span>님의 영화를</h2>
                <h2 class="greeting__line2">새롭게 발견해보세요!</h2>
            </div>
        </div>
        <div class="movie-container">
            <div class="movie-container__btns">
                <button class="movie-container__btns__refresh" @click="refreshMovieList">
                    <svg width="465" height="450" viewBox="0 0 465 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M432.5 193H441C454.3 193 465 182.3 465 169V40.9998C465 31.2998 459.2 22.4998 450.2 18.7998C441.2 15.0998 430.9 17.0998 424 23.9998L382.4 65.5998C294.8 -20.9002 153.7 -20.6002 66.6001 66.5998C-20.8999 154.1 -20.8999 295.9 66.6001 383.4C154.1 470.9 295.9 470.9 383.4 383.4C395.9 370.9 395.9 350.6 383.4 338.1C370.9 325.6 350.6 325.6 338.1 338.1C275.6 400.6 174.3 400.6 111.8 338.1C49.3001 275.6 49.3001 174.3 111.8 111.8C174 49.5998 274.5 49.2998 337.1 110.8L296 152C289.1 158.9 287.1 169.2 290.8 178.2C294.5 187.2 303.3 193 313 193H432.5Z" fill="url(#paint0_radial_205_138)"/>
                    <defs>
                    <radialGradient id="paint0_radial_205_138" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(137.126 136.454) rotate(45.8729) scale(530.774 531.665)">
                    <stop stop-color="#FFB3F3"/>
                    <stop offset="1" stop-color="#BA63FF"/>
                    </radialGradient>
                    </defs>
                    </svg>
                    목록 새로고침</button>
                <button class="movie-container__btns__save" @click="goHome">
                    <svg width="449" height="321" viewBox="0 0 449 321" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M439.6 9.3999C452.1 21.8999 452.1 42.1999 439.6 54.6999L183.6 310.7C171.1 323.2 150.8 323.2 138.3 310.7L10.2998 182.7C-2.2002 170.2 -2.2002 149.9 10.2998 137.4C22.7998 124.9 43.0998 124.9 55.5998 137.4L161 242.7L394.4 9.3999C406.9 -3.1001 427.2 -3.1001 439.7 9.3999H439.6Z" fill="url(#paint0_radial_205_140)"/>
                    <defs>
                    <radialGradient id="paint0_radial_205_140" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(132.389 96.8065) rotate(37.3311) scale(448.762 433.706)">
                    <stop stop-color="#FFB3F3"/>
                    <stop offset="1" stop-color="#BA63FF"/>
                    </radialGradient>
                    </defs>
                    </svg>
                    홈 화면으로</button>
            </div>
            <div class="movie-container__list">
                <MovieItem v-on:addMovie="addMovie" v-for="(movie, key) in movies" :key="key" :movie="movie"/>
            </div>
        </div>
    </div>
</template>

<script>
import MovieItem from '@/components/MovieItem.vue';
import axios from 'axios';

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
        };
    },
    watch: {
        movies: {
        },
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

    created() {
        this.getMovies();
        this.clickedMoviesPk = [];
    },

    methods: {
        // 영화 데이터 20개씩 가져오기
        getMovies() {
            const API_URL = this.$store.state.API_URL;
            axios({
                method: 'get',
                url: `${API_URL}/api/movies/movie_list_small/`,
                headers: {
                    // Authorization: `Token 6023611848bfca271b0de4cb5db50064289b791d` //임시 토큰
                    Authorization: `Token ${ this.$store.state.token }`
                }
            })
            .then(res => {
                console.log(res.data)
                this.movies = res.data;
                document.querySelector('.movie-container__list').scrollTop = 0;
            })
            // .catch(err => console.log('err', err))

            // 임시 데이터 가져오기
            // this.movies = movies;
        },

        // 클릭한 영화 data에 추가
        addMovie() {
            const clickedMovies = document.querySelectorAll('.clicked');
            // let clickedMoviesPk = [];
            clickedMovies.forEach((movie) => {
                const moviepk = movie.parentNode.dataset.moviepk
                if (!this.clickedMoviesPk.includes(moviepk)) this.clickedMoviesPk.push(movie.parentNode.dataset.moviepk)});
            return
        },

        // 영화 목록 새로고침
        refreshMovieList() {
            this.getMovies();
            const clickedMovies = document.querySelectorAll('.clicked');
            clickedMovies.forEach((movie) => movie.classList.remove('clicked'));
        },
        
        // 홈으로
        goHome() {
            this.$router.push({ name: 'home' })
        },

        // watchedmovies를 state에 반영해주는 메서드
        refreshWatchedMovies(){
            const API_URL = this.$store.state.API_URL;
            const user_pk = this.$store.state.user_pk; 
            axios({
                method: 'GET',
                url: `${API_URL}/api/accounts/${user_pk}/watched/`,
                headers: {
                Authorization: `Token ${ this.$store.state.token }`
                }
            })
            .then((res) => {
                this.$store.commit('REFRESH_WATCHED_MOVIES', res.data)
            })
        }
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/FirstAddMovieView.scss';
</style>