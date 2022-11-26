<template>
  <div class="movieReviewItem">
    <div class="profile"
    :style="`background-image: url(${this.$store.state.API_URL}${this.review.avatar})`"
    @click="goUserDetail"
    >

    </div>
    <div class="content">
      <h2 class="content__username">{{ review.username }}</h2>
      <h2 class="content__content">{{ review.content }}</h2>
    </div>
    <div class="menu" v-if="this.review.author == this.$store.state.user_pk" >
      <svg @click="showBtns" width="112" height="432" viewBox="0 0 112 432" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M56 320C86.9 320 112 345.1 112 376C112 406.9 86.9 432 56 432C25.1 432 0 406.9 0 376C0 345.1 25.1 320 56 320ZM56 160C86.9 160 112 185.1 112 216C112 246.9 86.9 272 56 272C25.1 272 0 246.9 0 216C0 185.1 25.1 160 56 160ZM112 56C112 86.9 86.9 112 56 112C25.1 112 0 86.9 0 56C0 25.1 25.1 0 56 0C86.9 0 112 25.1 112 56Z" fill="url(#paint0_radial_273_152)"/>
      <defs>
      <radialGradient id="paint0_radial_273_152" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.8623 130.635) rotate(76.3512) scale(378.004 173.729)">
      <stop stop-color="#FFB3F3"/>
      <stop offset="1" stop-color="#BA63FF"/>
      </radialGradient>
      </defs>
      </svg>
      <div id="btns" class="menu__btns hidden">
        <div class="menu__btns__edit">
          <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M410.3 231L421.6 219.7L387.7 185.8L325.6 123.7L291.7 89.8002L280.4 101.1L257.8 123.7L58.6 322.9C48.2 333.3 40.6 346.2 36.4 360.3L1.00002 480.7C-1.49998 489.1 0.800022 498.2 7.10002 504.4C13.4 510.6 22.4 512.9 30.8 510.5L151.1 475.1C165.2 470.9 178.1 463.3 188.5 452.9L387.7 253.7L410.3 231ZM160 399.4L150.9 422.1C146.9 425.2 142.4 427.5 137.6 429L59.4 452L82.4 373.9C83.8 369 86.2 364.5 89.3 360.6L112 351.5V383.5C112 392.3 119.2 399.5 128 399.5H160V399.4ZM362.7 18.7002L348.3 33.2002L325.7 55.8002L314.3 67.1002L348.2 101L410.3 163.1L444.2 197L455.5 185.7L478.1 163.1L492.6 148.6C517.6 123.6 517.6 83.1002 492.6 58.1002L453.3 18.7002C428.3 -6.2998 387.8 -6.2998 362.8 18.7002H362.7ZM315.3 186.7L171.3 330.7C165.1 336.9 154.9 336.9 148.7 330.7C142.5 324.5 142.5 314.3 148.7 308.1L292.7 164.1C298.9 157.9 309.1 157.9 315.3 164.1C321.5 170.3 321.5 180.5 315.3 186.7V186.7Z" fill="black"/>
          </svg>
          <h2>수정하기</h2>
        </div>
        <div class="menu__btns__delete">
          <svg width="448" height="512" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_277_155)">
          <path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400ZM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400ZM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400ZM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94ZM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80ZM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432Z" fill="black"/>
          </g>
          <defs>
          <clipPath id="clip0_277_155">
          <rect width="448" height="512" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <h2>삭제하기</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieReviewItem",
  props: {
    review: Object,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    goUserDetail() {
      this.$router.push({ name: 'userDetail', params: { userId: this.review.author }})
    },
    showBtns() {
      document.querySelector('#btns').classList.toggle('hidden')

    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/MovieReviewItem.scss';
</style>
