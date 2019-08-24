<template>
  <div class="page-container">
    <div class="inner-container">
      
      <h1>Interest rate swaps with a cherry on top</h1>
      <h3>Cherry Swap is an autonomous, open-source platform for interest rate swaps on Compound Finance markets</h3>
    </div>
    <div class="landing-container">
      <img :src="demoLarge" alt="Demo logo"/>
      <!-- <lottie :options="defaultOptions" :height="500" :width="500" v-on:animCreated="handleAnimation"/> -->
      <div class="landing-back"></div>
    </div>    
    <div class="footer-container"></div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from 'vue-lottie';
import demoLarge from '@/assets/demo-large.svg';
import * as animationData from '../assets/demo-logo.json';

export default {
  name: "home",
  components: {
    Lottie
  },
  data() {
    return {
      demoLarge: demoLarge,
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
  font-size: 2.5em;
}
.inner-container h3 {
  line-height: 1.5em;
  font-size: 1.3em;
  text-align: center;
}
.landing-container {
  width: 100%;
  height: 300px;
  
}
.landing-image {
  background: url('../assets/demo-large.svg') no-repeat center;
  width: 100%;
  height: 100%;
}
.landing-back {
  background: #fff;
  width: 100%;
  height: 50vh;
  margin-top: -33.3%;
}
.footer-container {
  background: #fff;
  height: 100%;
  width: 100%;
  flex-grow: 1;
}
</style>

