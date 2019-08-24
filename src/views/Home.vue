<template>
  <div class="page-container">
    <p>Hello</p>
    <div class="inner-container">
      <!-- <lottie :options="defaultOptions" :height="100" :width="100" v-on:animCreated="handleAnimation"/> -->
      <h1>Interest rate swaps with a cherry on top</h1>
      <h3>Cherry Swap is an autonomous, open-source platform for interest rate swaps on Compound Finance markets</h3>
    </div>
    <div class="landing-image overlay">
      <!-- <div class="landing-back"></div> -->
    </div>
    <!-- <img src="../assets/demo-large.svg" alt="Kiwi standing on oval"/> -->
    
  </div>
</template>

<script>
import router from "@/router";
import Lottie from 'vue-lottie';
import * as animationData from '../assets/icecream.json';

export default {
  name: "home",
  components: {
    'lottie': Lottie
  },
  data() {
    return {
      defaultOptions: {animationData: animationData.default},
      animationSpeed: 1
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    goToCreate() {
      router.push({ name: "create" });
    },
    stop: function () {
      this.anim.stop();
    },

    play: function () {
      console.log("Hello");
      this.anim.play();
    },

    pause: function () {
      this.anim.pause();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.page-container {
  background: rgba($vanilla, 1);
}
.page-container img {
  width: 75vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.inner-container {
  margin: 0px auto;
  width: 50vw;
  text-align: 'center';
}
.inner-container h1 {
  color: $cherry;
  line-height: 1.5em;
  text-align: center;
}
.inner-container h3 {
  line-height: 1.5em;
  text-align: center;
}
.landing-image {
  background: url('../assets/demo-large.svg') no-repeat center;
  z-index: 2;
  width: 100%;
  height: 500px;
  display: flex;
}
.landing-image::after {
  background: #fff;
  width: 100%;
  height: 100%;
}
// .landing-back {
//   background: #fff;
//   align-self: flex-end;
//   width: 100%;
//   height: 60%;
//   z-index: 0;
// }
</style>

