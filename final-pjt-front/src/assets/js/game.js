// 월드컵의 종류들
// 1. 모든 영화

export const showRounds = (rounds_arr) => {
    console.log('hi worldcup', rounds_arr)
    const selectBox = document.querySelector('.modal__form__select')
    for (let i = 0; i < rounds_arr.length; i++) {
        const option = document.createElement('option')
        option.innerText = rounds_arr[i]
        option.setAttribute('value', rounds_arr[i])
        selectBox.appendChild(option)
    }
}

export const playGame = (MovieIdList) => {
    if (MovieIdList.length === 1) return MovieIdList[0];
}

export const verse = (a, b) => {
    console.log(a, b)
}