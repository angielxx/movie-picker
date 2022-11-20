<template>
    <div class="GameView">
        <div class="modal">
            <h2>총 라운드를 선택하세요</h2>
            <form action="" class="modal__form"
                @submit.prevent="startGame">
                <select
                    name="round" id="round" 
                    class=" modal__form__select" required>
                    <!-- add options here -->
                    <!-- <option value="라운드 숫자">라운드 숫자</option> -->
                </select>
                <input type="submit" value="월드컵 시작">
            </form>
        </div>
        <div class="round hidden">
            <div id="background" class="round__left" @click.prevent="change(0)" @mouseover="changeColor($event)">
                <div id="left" class="round__left__poster">

                </div>
            </div>
            <div id="background" class="round__right" @click.prevent="change(1)" @mouseover="changeColor($event)">
                <div id="right" class="round__right__poster">

                </div>
            </div>
        </div>
        <div class="result hidden">
            <h2>{{ this.$store.state.username}}의 인생영화는</h2>
            <div class="result__poster">

            </div>
        </div>
    </div>
</template>

<script>
import { showRounds, getRound, getCandidates } from '@/assets/js/game';
import axios from 'axios';
// import _ from 'lodash';

export default {
    name: 'GameView',

    data() {
        return {
            watched_movies: [],
            candidates: [],
            round: null,
            best_of_best: false,
            // candidates_for_round: [],

            // 라운드 진행시 사용할 변수
            winners: [],
            cnt: 0, // 게임횟수
            num: 0,
            sNum: 0,
            cnt2: 0,
            final_winner: null,
        };
    },

    created() {
        const gameName = this.$route.params.gameName
        // console.log(gameName)
        switch (gameName) {
            case 'all-movie':
                this.watched_movies = this.$store.state.watched_movies
                this.best_of_best = true
                break;
        
            default:
                break;
        }
    },
    mounted() {
        showRounds(this.rounds_arr)
        // showRounds([4,8,16,32]) // 임시 라운드 갯수
        this.candidates = []
        this.winners = []
    },
    
    computed: {
        rounds_arr() {
            // const movieNumbers = this.watched_movies.length;
            const movieNumbers = 15; // 임시
            let rounds_arr = [];
            let i = 1;
            let round = 2 ** i;
            while (round <= movieNumbers) {
                round = 2 ** i;
                rounds_arr.push(round)
                i++;
            }
            return rounds_arr
        }
    },

    methods: {
        // 게임 시작 버튼 누르면 라운드 설정하고 게임 시작
        startGame() {
            // 모달 숨기고 게임 화면 보이기
            const roundPage = document.querySelector('.round')
            const modal = document.querySelector('.modal')
            roundPage.classList.remove('hidden')
            roundPage.style.zindex = '3'
            modal.classList.add('hidden')
            
            // 선택한 총 라운드 갯수 저장
            this.round = getRound();
            console.log(this.round)

            // 라운드에 맞는 후보군 저장
            this.candidates = getCandidates(this.watched_movies, this.round);
            this.candidates.sort(function(){return 0.5 - Math.random()})
            this.showImg(this.num);
        },
        showImg(num) {
            document.getElementById('left').style.backgroundImage = `url(https://image.tmdb.org/t/p/w400/${this.candidates[num].poster_path})`
            document.getElementById('right').style.backgroundImage = `url(https://image.tmdb.org/t/p/w400/${this.candidates[num+1].poster_path})`
            this.cnt2++
        },
        change(n) {
            console.log('clicked!', n)
            if (this.candidates.length == 2) {
                if (n == 0) {
                    this.final_winner = this.candidates[0]
                } else {
                    this.final_winner = this.candidates[1]
                }
                this.showResult();
            } else {
                // 사용자가 선택한 횟수
                this.cnt++
                if (n == 0) {
                    this.winners.push(this.candidates[this.num])
                } else {
                    this.winners.push(this.candidates[this.num + 1])
                }
                this.num += 2

                if (this.cnt == this.candidates.length / 2 ){
                    console.log('round done')
                    this.candidates = this.winners
                    this.winners = []
                    
                    this.cnt = 0
                    this.num = 0
                    this.sNum = 0
                    this.showImg(this.num)
                    
                } else {
                    this.showImg(this.num)
                }

            }
        },

        // 게임 결과
        showResult() {
            console.log('the winner is', this.final_winner)
            const roundPage = document.querySelector('.round')
            roundPage.classList.add('hidden')

            const result = document.querySelector('.result')
            result.classList.remove('hidden')

            const poster = document.querySelector('.result__poster')
            poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w400/${this.final_winner.poster_path})`

            const movieId = this.final_winner.id
            this.sendGameResult(movieId, this.best_of_best)
            setTimeout(() => { 
                this.candidates = []
                this.winners = []
                this.final_winner = null
                
                this.$router.push({ name: 'movieDetail', params: { movieId : movieId} }) 
            }, 3000)
        },

        // 게임 결과 post 요청 보내기
        sendGameResult(movieId, best_of_best) {
            console.log('api', this.$store.state.API_URL)
            axios({
                method: 'post',
                url: `${this.$store.state.API_URL}/api/accounts/${this.$store.state.user_pk}/${movieId}/add_best/`,
                headers: {
                    Authorization: `Token ${ this.$store.state.token }`
                },
                data: {
                    best_of_best: best_of_best
                }

            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        },

        // hover시 배경 색 바꾸기
        changeColor(event) {
            const backgrounds = document.querySelectorAll('#background')
            backgrounds.forEach((background) => {
                if (background === event.currentTarget) {
                    background.classList.add('hover')
                } else {
                    background.classList.remove('hover')
                }
            })
        },




        // // 각 라운드를 화면에 쏴서 유저가 고른 우승자를 리턴
        // startRound(movies) {
        //     const left = document.querySelector('.round__left__poster')
        //     const right = document.querySelector('.round__right__poster')

        //     left.style.backgroundImage = `url(https://image.tmdb.org/t/p/w400/${movies[0].poster_path})`
        //     right.style.backgroundImage = `url(https://image.tmdb.org/t/p/w400/${movies[1].poster_path})`
        //     return this.winner
        // },

        // // 사용자가 클릭한 영화 감지하여 클래스 추가
        // clickMovie(event) {
        //     if(event.currentTarget.id === 'left') {
        //         console.log(this.candidates_for_round[0])
        //         this.winner = this.candidates_for_round[0]
        //         return 
        //     } else {
        //         console.log(this.candidates_for_round[1])
        //         this.winner = this.candidates_for_round[1]
        //         return 
        //     }
        // }
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/GameView.scss';
</style>