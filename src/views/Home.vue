<template>
  <div class="page-container">
    <div class="inner-container">
      
      <h1>Interest rate swaps with a cherry on top</h1>
      <h3>Cherry Swap is an autonomous, open-source platform for interest rate swaps on Compound Finance markets</h3>
    </div>
    <div class="landing-container">
      <!-- <img :src="demoLarge" alt="Demo logo"/> -->
      <lottie :options="defaultOptions" :height="'auto'" :width="'100%'" v-on:animCreated="handleAnimation"/>
      <div class="landing-back"></div>
    </div>    
    <div class="middle-container">
      <p class="box">Every market on <span style="text-decoration: underline">Compound</span> has an interest rate, which fluctuates according to supply and demand of credit and debt within that market.</p>
      <p class="box">With <img :src="logo" id="logo" alt="Demo logo"/>, you can hedge against these fluctuations - or speculate on them - by participating in pooled interest rate swaps.</p>
    </div>
    <div class="footer-container">
      <h1>How it works</h1>
      <p class="box">Every market on <span style="text-decoration: underline">Compound</span> has an interest rate, which fluctuates according to supply and demand of credit and debt within that market.</p>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from 'vue-lottie';
import demoLarge from '@/assets/demo-large.svg';
import logo from "@/assets/logo.svg";
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
      animationSpeed: 1,
      logo
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
      this.anim.stop();
    },
    goToCreate() {
      router.push({ name: "create" });
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
  line-height: 1.25em;
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
  height: 250px;
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
  margin-top: -25%;
}
.middle-container {
  background: #fff;
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.middle-container p.box {
  width: 25vw;
  font-size: 16px;
  line-height: 1.5em;
}
.footer-container {
  background: $cherry;
  height: 100px;
  display: flex;
  justify-content: center;
}

.footer-container h1{
  // width: 100%;
}

#logo {
  height: 24px;
  width: auto;
  display: inline;
}
</style>

