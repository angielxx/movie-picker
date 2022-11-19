<template>
    <div class="GameView">
        <div class="modal">
            <h2>총 라운드를 선택하세요</h2>
            <form action="" class="modal__form" @submit.prevent="chooseRound($event)">
                <select name="round" id="round" class=" modal__form__select" required>
                    <!-- add options here -->
                    <!-- <option value="라운드 숫자">라운드 숫자</option> -->
                </select>
                <input type="submit" value="월드컵 시작">
            </form>
        </div>
    </div>
</template>

<script>
import { showRounds } from '@/assets/js/game';

export default {
    name: 'GameView',

    data() {
        return {
            movies: [],
        };
    },

    created() {
        const gameName = this.$route.params.gameName
        console.log(gameName)
        switch (gameName) {
            case 'all-movie':
                this.movies = this.$store.state.watched_omvies
                break;
        
            default:
                break;
        }
    },
    mounted() {
        // showRounds(this.rounds_arr)
        showRounds([4,8,16,32]) // 임시 라운드 갯수
    },
    
    computed: {
        rounds_arr() {
            const movieNumbers = this.movies.length;
            let rounds_arr = [];
            let i = 0;
            let round = 2 ** i;
            while (round <= movieNumbers) {
                rounds_arr.push(round)
                round = 2 ** i;
                i++;
            }
            return rounds_arr
        }
    },

    methods: {
        chooseRound(event) {
            console.log(event)
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/GameView.scss';
</style>