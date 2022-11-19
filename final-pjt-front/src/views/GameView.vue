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
            <div class="round__left">
                <div class="round__left__poster">

                </div>
            </div>
            <div class="round__right">
                <div class="round__right__poster">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { showRounds, startGame, getCandidates } from '@/assets/js/game';
import _ from 'lodash';

export default {
    name: 'GameView',

    data() {
        return {
            watched_movies: [],
            candidates: [],
            round: null,
            candidates_for_round: [],
        };
    },

    created() {
        const gameName = this.$route.params.gameName
        console.log(gameName)
        switch (gameName) {
            case 'all-movie':
                this.watched_movies = this.$store.state.watched_movies
                break;
        
            default:
                break;
        }
    },
    mounted() {
        showRounds(this.rounds_arr)
        // showRounds([4,8,16,32]) // 임시 라운드 갯수
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
            const roundPage = document.querySelector('.round')
            const modal = document.querySelector('.modal')
            roundPage.classList.remove('hidden')
            modal.classList.add('hidden')
            
            // 선택한 총 라운드 갯수 저장
            this.round = startGame();
            console.log(this.round)
            // 라운드에 맞는 후보군 저장
            this.candidates = getCandidates(this.watched_movies, this.round);
            
            let candidates = this.candidates;
            let i = 0;
            while (candidates.length > 1) {
                // 라운드 시작
                while (candidates.length > candidates.length / 2) {
                    const candidates_for_round = _.sampleSize(candidates, 2)
                    candidates = candidates.filter((movie) => !candidates_for_round.includes(movie))
                    this.startRound(candidates_for_round);
                    console.log(i, candidates)
                    i++
                }
            }
        },
        startRound(movies) {
            const left = document.querySelector('.round__left__poster')
            const right = document.querySelector('.round__right__poster')
            console.log('left', movies[0], left)
            console.log('right', movies[1], right)
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/GameView.scss';
</style>