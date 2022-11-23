<template>
    <div class="UserItem" @click="goUserDetail">
        <div class="user-profile"
        :style="`background-image: url(${this.$store.state.API_URL}${this.user.avatar})`">

        </div>
        <h2>{{ this.user.username }}</h2>
        <div class="follow" @click="follow">
            <!-- icon check gradient -->
            <svg  v-if="this.following" width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M470.6 105.4C483.1 117.9 483.1 138.2 470.6 150.7L214.6 406.7C202.1 419.2 181.8 419.2 169.3 406.7L41.3 278.7C28.8 266.2 28.8 245.9 41.3 233.4C53.8 220.9 74.1 220.9 86.6 233.4L192 338.7L425.4 105.4C437.9 92.8999 458.2 92.8999 470.7 105.4H470.6Z" fill="url(#paint0_radial_241_126)"/>
                <defs>
                <radialGradient id="paint0_radial_241_126" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(163.389 192.807) rotate(37.3311) scale(448.762 433.706)">
                <stop stop-color="#FFB3F3"/>
                <stop offset="1" stop-color="#BA63FF"/>
                </radialGradient>
                </defs>
            </svg>
            <!-- icon plus white -->
            <svg v-else width="448" height="512" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M256 80C256 62.3 241.7 48 224 48C206.3 48 192 62.3 192 80V224H48C30.3 224 16 238.3 16 256C16 273.7 30.3 288 48 288H192V432C192 449.7 206.3 464 224 464C241.7 464 256 449.7 256 432V288H400C417.7 288 432 273.7 432 256C432 238.3 417.7 224 400 224H256V80Z" fill="white"/>
            </svg>
            <h2 v-if="checkFollow" class="follow__text">팔로우</h2>
            <h2 v-else class="follow__text">언팔로우</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserItem',

    props: {
        user: Object,
    },

    data() {
        return {
            following: null,
        };
    },

    computed: {
        checkFollow() {
            return false
        }
    },

    mounted() {
        
    },

    methods: {
        // follow 요청
        follow() {
            const API_URL = this.$store.state.API_URL
            const FOLLOW_URL = `${API_URL}/api/accounts/follow/${this.user.id}/`
            
            axios({
            method: 'post',
            url: FOLLOW_URL,
            headers: {
                // Authorization: `Token 6023611848bfca271b0de4cb5db50064289b791d` //임시 토큰
                Authorization: `Token ${ this.$store.state.token }`
            }
            })
            // 이하 then() 부분의 변수명 등은 로직에 맞게 수정해주세요
            .then(res => {
                this.following = res.data
            })
        },
        goUserDetail() {
            this.$router.push({ name: 'userDetail', params: { userId: this.user.id }})
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/UserItem.scss'
</style>