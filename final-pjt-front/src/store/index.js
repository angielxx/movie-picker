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
    user_pk: 1, // 임시 유저 번호

    // 인생영화
    best_movie: {
      "movie": {
          "id": 27,
          "genres": [
              {
                  "id": 18,
                  "name": "드라마"
              },
              {
                  "id": 10402,
                  "name": "음악"
              },
              {
                  "id": 10749,
                  "name": "로맨스"
              }
          ],
          "countries": [
              {
                  "id": 3,
                  "name": "영국"
              }
          ],
          "title": "나인 송즈",
          "released_date": "2004-05-16",
          "popularity": 36.295,
          "vote_count": 421,
          "vote_avg": 5.7,
          "overview": "미국에서 온 교환 학생 리사와 영국인 매트는 한눈에 서로 사랑에 빠진다. 21살 리사의 매트에 대한 사랑은 격정적이며 정열적이다. 9번의 공연 실황 장면과 그들이 나누는 아홉 번의 사랑. 흔히 젊은 연인들이 그러하듯이, 이들은 사랑하지만, 미래를 이야기 하지 않는다. 9번의 공연이 끝난 후, 리사는 크리스마스를 앞두고 미국으로 돌아가겠다며 매트에게 기약없는 작별을 고하는데...",
          "poster_path": "/tWkyDY78MAtemlCLJNQmlXUo1Iu.jpg"
      },
      "created_at": "2022-11-16T15:48:26.171909",
      "best_of_best": true
  },
    // 모든 인생영화 기록들
    all_best_movies: [
      {
          "movie": {
              "id": 12,
              "genres": [
                  {
                      "id": 16,
                      "name": "애니메이션"
                  },
                  {
                      "id": 10751,
                      "name": "가족"
                  }
              ],
              "countries": [
                  {
                      "id": 2,
                      "name": "미국"
                  }
              ],
              "title": "니모를 찾아서",
              "released_date": "2003-05-30",
              "popularity": 111.492,
              "vote_count": 16994,
              "vote_avg": 7.8,
              "overview": "광대어 말린은 아내 코랄과 2세들의 부화를 기다리던 중 상어의 습격을 받는다. 알을 보호하려던 아내는 행방불명되고, 유일하게 살아남은 아기에게 말린은 니모라는 이름을 붙인다. 사건 이후 큰 바다를 무조건 겁내게 된 말린은 니모를 과보호한다. 하지만 니모는 등교 첫날 잠수부에게 납치돼 시드니에 있는 치과의사의 수족관에 끌려가고, 슬픔으로 혼비백산한 아빠 말린은 평소의 심약함을 잊고니모를 찾아나선다. 단기기억상실증을 지닌 명랑한 물고기 도리의 도움으로 상어, 심해어, 해파리의 위협을 뚫고 동호주 해류로 향하는 동안, 니모는 수족관의 새 친구들과 탈출을 모의한다.",
              "poster_path": "/9ViCYfZ0whpwtKbM2WJP5PfsG2x.jpg"
          },
          "created_at": "2022-11-16T14:52:44.511746",
          "best_of_best": false
      },
      {
          "movie": {
              "id": 27,
              "genres": [
                  {
                      "id": 18,
                      "name": "드라마"
                  },
                  {
                      "id": 10402,
                      "name": "음악"
                  },
                  {
                      "id": 10749,
                      "name": "로맨스"
                  }
              ],
              "countries": [
                  {
                      "id": 3,
                      "name": "영국"
                  }
              ],
              "title": "나인 송즈",
              "released_date": "2004-05-16",
              "popularity": 36.295,
              "vote_count": 421,
              "vote_avg": 5.7,
              "overview": "미국에서 온 교환 학생 리사와 영국인 매트는 한눈에 서로 사랑에 빠진다. 21살 리사의 매트에 대한 사랑은 격정적이며 정열적이다. 9번의 공연 실황 장면과 그들이 나누는 아홉 번의 사랑. 흔히 젊은 연인들이 그러하듯이, 이들은 사랑하지만, 미래를 이야기 하지 않는다. 9번의 공연이 끝난 후, 리사는 크리스마스를 앞두고 미국으로 돌아가겠다며 매트에게 기약없는 작별을 고하는데...",
              "poster_path": "/tWkyDY78MAtemlCLJNQmlXUo1Iu.jpg"
          },
          "created_at": "2022-11-16T15:48:26.171909",
          "best_of_best": true
      },
      {
          "movie": {
              "id": 95,
              "genres": [
                  {
                      "id": 12,
                      "name": "모험"
                  },
                  {
                      "id": 28,
                      "name": "액션"
                  },
                  {
                      "id": 53,
                      "name": "스릴러"
                  },
                  {
                      "id": 878,
                      "name": "SF"
                  }
              ],
              "countries": [
                  {
                      "id": 2,
                      "name": "미국"
                  }
              ],
              "title": "아마겟돈",
              "released_date": "1998-07-01",
              "popularity": 63.464,
              "vote_count": 6855,
              "vote_avg": 6.8,
              "overview": "미국 동부에 운석이 떨어진다. 이는 뉴욕 크기의 소행성이 지구를 향해 돌진하고 있는 증거임을 미국 우주 항공국이 밝힌다. 텍사스 크기의 소행성이 시속 2만 3천 마일의 속도로 지구로 돌진한다는 사실을 알게 되자 나사(미국 항공 우주국)는 대책을 세운다. 남은 시간은 18일. 지구를 구할 유일한 방법은 돌진하는 소행성에 구멍을 뚫어 핵폭탄을 장착, 궤도를 바꾸는 것이다.  지구 최고의 유정 굴착 기술자들이 파견된다. 해리(브루스 윌리스)는 굴착 기술의 전문가로 지구를 구하기 위해 짧은 시간 동안 우주 비행에 대한 교육을 받고 그의 동료들과 소행성으로 떠난다. 프리덤호와 인디펜던스호는 소행성에 접근하지만 인디펜던스호는 유성의 파편을 맞고 추락한다.  해리 일행은 어쩔 수 없이 도착한 인원으로 폭탄 장치를 하기 위해 최선을 다하지만 무선 폭파 장치가 고장나 누군가 그곳에 남아야 하는데...  임무를 무사히 마친 후 지구로 돌아가서 해리의 딸인 그레이스(리브 타일러)와 결혼하기로 한 A.J(벤 애플렉)는 해리와 지구를 구하기 위해 자신이 소행성에 남기로 하나 결정적인 순간 해리는 딸을 위해서 자신이 소행성에 남는데...",
              "poster_path": "/8T9xKzzSZij7dxy3ybkingQvoIZ.jpg"
          },
          "created_at": "2022-11-16T15:48:47.485650",
          "best_of_best": false
      }
  ],
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
      // 유저정보 불러오기
      // this.$store.actions.getUser()

      // 저장한 영화가 없는 경우
      if (!state.best_movie) {
        router.push({ name: 'first-addMovie'})
      } else {
        router.push({ name: 'home'})
      }
    },

    // best_movie(인생영화), all_best_movies(명에의 전당) 저장
    GET_USER(state, data) {
      state.all_best_movies = data['best_movies']
      const idx = state.all_best_movies.findLastIndex((record) => {record.best_of_best === true})
      state.best_movie = state.all_best_movies[idx]
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
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
      .then(res => {
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch(err => console.log(err))
    },
    // 로그인
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      // axios({
      //   method: 'post',
      //   url: `${API_URL}/accounts/login/`,
      //   data: {
      //     email, password
      //   }
      // })
      // .then(res => {
      //   context.commit('SAVE_TOKEN', res.data.key)
      // })
      // .catch(err => console.log(err))
      
      this.state.username = username
      this.state.password = password
      
    },
    // 유저 정보
    getUser(context) {
      console.log('here')
      axios({
        method: 'get',
        url: `${API_URL}/api/accounts/${context.state.user_pk}`,
        headers: {
          Authorization: `Token 6023611848bfca271b0de4cb5db50064289b791d`
          // Authorization: `Token ${ context.state.token }`
        }
      })
      .then(res => {
        console.log(res)
        context.commit('GET_USER', res.data)
      })
    },
  },
  modules: {
  }
})

export default store