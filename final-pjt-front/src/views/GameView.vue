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
            <div id="left" class="round__left" @click.prevent="clickMovie($event)">
                <div class="round__left__poster">

                </div>
            </div>
            <div id="right" class="round__right" @click.prevent="clickMovie($event)">
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
            winner: null,
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
            
            // 초기 후보군
            let candidates = this.candidates;
            let rounds = candidates.length
            while (candidates.length > 1) {
                // 라운드 시작

                console.log('round!!!!', candidates.length)
                // 각 게임의 우승자들을 다음 라운드의 후보군으로 저장
                const candidates_for_nextRound = [];
                // 8강 > 4강으로 될때까지 우승자 받기
                while (candidates_for_nextRound.length !== rounds / 2) {
                    const candidates_for_round = _.sampleSize(candidates, 2)
                    this.candidates_for_round = candidates_for_round
                    candidates = candidates.filter((movie) => !candidates_for_round.includes(movie))
                    candidates_for_round.forEach((movie) => console.log(movie.title))
                    candidates_for_nextRound.push(this.startRound(candidates_for_round));
                }
                candidates = candidates_for_nextRound
                rounds = candidates.length
            }
            return
        },
        // 각 라운드를 화면에 쏴서 유저가 고른 우승자를 리턴
        startRound(movies) {
            const left = document.querySelector('.round__left__poster')
            const right = document.querySelector('.round__right__poster')

            left.style.backgroundImage = `url(https://image.tmdb.org/t/p/w400/${movies[0].poster_path})`
            right.style.backgroundImage = `url(https://image.tmdb.org/t/p/w400/${movies[1].poster_path})`
            return this.winner
        },

        // 사용자가 클릭한 영화 감지하여 클래스 추가
        clickMovie(event) {
            if(event.currentTarget.id === 'left') {
                console.log(this.candidates_for_round[0])
                this.winner = this.candidates_for_round[0]
                return 
            } else {
                console.log(this.candidates_for_round[1])
                this.winner = this.candidates_for_round[1]
                return 
            }
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/GameView.scss';
</style>