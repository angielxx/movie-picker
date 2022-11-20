import _ from 'lodash';

// 모달에 가능한 라운드 보여주기
export const showRounds = (rounds_arr) => {
    // console.log('hi worldcup', rounds_arr)
    const selectBox = document.querySelector('.modal__form__select')
    for (let i = 0; i < rounds_arr.length; i++) {
        const option = document.createElement('option')
        option.innerText = rounds_arr[i]
        option.setAttribute('name', 'round')
        option.setAttribute('value', rounds_arr[i])
        selectBox.appendChild(option)
    }
}

// 유저가 사용한 라운드 저장
export const getRound = () => {
    const roundSelect = document.querySelector('#round')
    const value = roundSelect.options[roundSelect.options.selectedIndex].value

    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    return value
}

// 총 라운드에 맞는 후보군 선택
export const getCandidates = (movies, round) => {
    const candidates = _.sampleSize(movies, round)
    return candidates
}





// export const playGame = (movies) => {
//     if (movies.length === 1) return movies[0];
//     const candidates = movies

//     let candidates_for_NextRound = [];
//     while (candidates_for_NextRound.length < movies.length / 2 ) {
//         const candidates_for_round = _.sampleSize(candidates, 2)
//         console.log(candidates_for_round)
//         break;
//         // candidates_for_NextRound.push(startRound(candidates_for_round))
//     }

// }

// export const startRound = (movies) => {
//     const movie_left = movies[0]
//     const movie_right = movies[1]
//     const winner = ''
//     return winner
// }



// // 선택한 총 라운드 갯수 저장
// this.round = startGame();
// console.log(this.round)
// // 라운드에 맞는 후보군 저장
// this.candidates = getCandidates(this.watched_movies, this.round);

// // 초기 후보군
// let candidates = this.candidates;
// let rounds = candidates.length
// while (candidates.length > 1) {
//     // 라운드 시작

//     console.log('round!!!!', candidates.length)
//     // 각 게임의 우승자들을 다음 라운드의 후보군으로 저장
//     const candidates_for_nextRound = [];
//     // 8강 > 4강으로 될때까지 우승자 받기
//     while (candidates_for_nextRound.length !== rounds / 2) {
//         const candidates_for_round = _.sampleSize(candidates, 2)
//         this.candidates_for_round = candidates_for_round
//         candidates = candidates.filter((movie) => !candidates_for_round.includes(movie))
//         candidates_for_round.forEach((movie) => console.log(movie.title))
//         candidates_for_nextRound.push(this.startRound(candidates_for_round));
//     }
//     candidates = candidates_for_nextRound
//     rounds = candidates.length
// }