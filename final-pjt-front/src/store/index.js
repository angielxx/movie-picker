import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000';

const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    // API_URL
    API_URL: 'http://127.0.0.1:8000',
    // auth
    token: null,
    username: null,
    // user_pk: 1, // 임시 유저 번호

    // 인생영화
    best_movie: {},
    // 모든 인생영화 기록들
    all_best_movies: [],

    watched_movies: [],

    to_watch_movies: [],


    // 영화 검색 기록
    search_result: [],
  },
  getters: {
    // 로그인 여부 확인
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    // auth
    SAVE_TOKEN(state, token) {
      state.token = token

      // 저장한 영화가 없는 경우 (여기서 하는 게 아니라 actions에서 해야됨)
      // if (!state.best_movie) {
      //   router.push({ name: 'first-addMovie'})
      // } else {
      //   router.push({ name: 'home'})
      // }
    },

    // best_movie(인생영화), all_best_movies(명에의 전당) 저장
    GET_USER(state, data) {
      console.log(data)

      // 유저 정보 받아오기
      state.username = data['username']
      state.user_pk = data['id']

      // 본 영화랑 볼 영화 받아오기
      state.to_watch_movies = data['to_watch_movies'],
      state.watched_movies = data['watched_movies']
      
      // watched_movies 없으면 first_adddMovie로 보냄
      if (!state.watched_movies.length) {
        router.push({ name: 'first-addMovie'})
      } else {
        // watched_movies가 있으면 best_movie를 저장하고 홈으로 보낸다.
        state.all_best_movies = data['best_movies']

        const idx = state.all_best_movies.map((best_movie) => best_movie.best_of_best === true).lastIndexOf(true)
        state.best_movie = state.all_best_movies[idx]
        
        router.push({name: 'home'})
      }
    },
    SAVE_SEARCH_RESULT(state, data) {
      state.search_result = data
    }
  },
  actions: {
    // 회원가입
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: `${API_URL}/dj-rest-auth/registration/`,
        data: {
          username, password1, password2
        }
      })
      .then(res => {
        context.commit('SAVE_TOKEN', res.data.key)
        this.dispatch('getUser')
      })
      .catch(err => console.log(err))
    },
    // 로그인
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: `${API_URL}/dj-rest-auth/login/`,
        data: {
          username, password
        }
      })
      .then(res => {
        // console.log(res.data)
        context.commit('SAVE_TOKEN', res.data.key)
        this.dispatch('getUser')
      })
      .catch(err => console.log(err))
      
      // this.state.username = username
      // this.state.password = password
      
    },


    test() {
      console.log('hi')
    },


    // 유저 정보
    getUser(context) {
      // console.log('here')
      // console.log(context.state)
      axios({
        method: 'get',
        // url: `${API_URL}/api/accounts/${context.state.user_pk}`,
        url: `${API_URL}/api/accounts/profile/`,
        headers: {
          // Authorization: `Token 6023611848bfca271b0de4cb5db50064289b791d`
          Authorization: `Token ${ context.state.token }`
        }
      })
      .then(res => {
        // console.log(res)
        context.commit('GET_USER', res.data)
      })
    },
  },
  modules: {
  }
})

export default store