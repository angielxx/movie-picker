import _ from 'lodash';

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

export const startGame = () => {
    const roundSelect = document.querySelector('#round')
    const value = roundSelect.options[roundSelect.options.selectedIndex].value

    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    return value
}

export const getCandidates = (movies, round) => {
    const candidates = _.sampleSize(movies, round)
    return candidates
}

export const playGame = (movies) => {
    if (movies.length === 1) return movies[0];
    const candidates = movies

    let candidates_for_NextRound = [];
    while (candidates_for_NextRound.length < movies.length / 2 ) {
        const candidates_for_round = _.sampleSize(candidates, 2)
        console.log(candidates_for_round)
        break;
        // candidates_for_NextRound.push(startRound(candidates_for_round))
    }

}

// export const startRound = (movies) => {
//     const movie_left = movies[0]
//     const movie_right = movies[1]
//     const winner = ''
//     return winner
// }