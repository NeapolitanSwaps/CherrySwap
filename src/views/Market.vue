<template>
  <div class="page-container">
    <div class="inner-container">
        <lottie :options="defaultOptions" :height="100" :width="100" v-on:animCreated="handleAnimation"/>
        <market-box :data="boxMarketData"></market-box>    
        <market-box :data="boxStatusData"></market-box>   
    </div>
     
    <div class="footer-container"></div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from 'vue-lottie';
import * as animationData from '../assets/icecream.json';
import MarketBox from '../components/MarketBox';

export default {
  name: "market",
  components: {
      Lottie,
      MarketBox
  },
  data() {
    return {
      defaultOptions: {animationData: animationData.default},
      animationSpeed: 1,
      boxMarketData: {
          title: "Market Overview",
          items: [
            [ 
                { title: 'Market', content: 'DAI' },
                { title: 'Current IR', content: '13.7% APR' }
            ],
            [
                { title: 'Locks in', content: '00d 05h 12m 37s'},
                { title: 'Unlocks in', content: '21d 01h 12m 37s' },
                { title: 'Lock duration', content: '90 days' }
            ]
          ]
      },
      boxStatusData: {
          title: "Current Status",
          items: [
            [ 
                { title: 'Phase', content: 'Pre-Lock' },
                { title: 'Funds committed', content: '1,804 DAI' }
            ],
            null
          ]
      }
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
//   width: 50vw;
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
  margin-top: -30%;
}
.footer-container {
  background: #fff;
  height: 100%;
  width: 100%;
  flex-grow: 1;
}
</style>

