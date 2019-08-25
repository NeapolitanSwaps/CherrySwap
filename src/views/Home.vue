<template>
  <div class="page-container">
     <!-- v-bind:style="'height: '+windowHeight*2+' !important'" -->
    <div class="inner-container" v-bind:style="{height: (windowHeight*.5) + 'px'}">
      <h1 style="text-align: center">Interest rate swaps with a cherry on top</h1>
      <h3>Cherry Swap is an autonomous, open-source platform for interest rate swaps on Compound Finance markets</h3>
    </div>
    <div class="landing-container">
      <!-- <img :src="demoLarge" alt="Demo logo"/> -->
      <div class="landing-back"></div>
      <lottie
        :options="defaultOptions"
        :height="'auto'"
        :width="'100%'"
        v-bind:style="{marginTop: 2*(-windowHeight/3) + 'px', maxWidth: '1000px'}"
        v-on:animCreated="handleAnimation"
      />
    </div>
    <div class="middle-container">
      <p class="box">
        Every market on
        <span style="text-decoration: underline">Compound</span> has an interest rate, which fluctuates according to supply and demand of credit and debt within that market.
      </p>
      <p class="box">
        With
        <img :src="logo" id="logo" alt="Demo logo" />, you can hedge against these fluctuations - or speculate on them - by participating in pooled interest rate swaps.
      </p>
    </div>
    <div class="md-layout" id="how-it-works">
      <div class="md-layout-item">
        <h1>How it works</h1>
      </div>
    </div>
    <div class="footer-container md-layout">
      <div class="md-layout-item md-size-10" style="background: #E8868E" />
      <home-info-box
        class="md-layout-item"
        :icon="0"
        :title="'1. Commit Phase'"
        :description="description0"
      />
      <home-info-box
        class="md-layout-item"
        :icon="1"
        :title="'2. Lock Phase'"
        :description="description1"
      />
      <home-info-box
        class="md-layout-item"
        :icon="2"
        :title="'3. Payout Phase'"
        :description="description2"
      />
      <div class="md-layout-item md-size-10" style="background: #E8868E" />
    </div>
    <div class="call-to-action" style="text-align:center">
      <md-button class="call-Button" style="margin-top:50px" @click="goToCreate">Swap my Cherry</md-button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from "vue-lottie";
import demoLarge from "@/assets/demo-large.svg";
import logo from "@/assets/logo.svg";
import * as animationData from "../assets/demo-logo.json";
import HomeInfoBox from "../components/HomeInfoBox";

export default {
  name: "home",
  components: {
    Lottie,
    HomeInfoBox
  },
  data() {
    return {
      windowHeight: window.innerHeight,
      demoLarge: demoLarge,
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
      logo,
      description0:
        "During this phase, participants commit tokens to either a short or long position on the future interest rate of a given Compound market. Long positions gamble on the interest rate increasing, while short positions anticipate a decrease.",
      description1:
        "At the beginning of the preset lock phase, the fixed (base) interest rate is set at the current market rate. Any interest accrued during this phase is pooled to be returned to participants at the end of the lock-up.",
      description2:
        "The accrued interest is divided among participants in the pool. Participants who predicted the correct trend in interest rates will earn more than they would have if they had invested directly into the Compound market."
    };
  },
  watch: {
    windowHeight(newHeight, oldHeight) {
     this.txt = `it changed to ${newHeight} from ${oldHeight}`;
     console.log("abc")
    }
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
      this.anim.stop();
    },
    goToCreate() {
      router.push({ name: "market" });
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight
      });
    })
  },
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
  width: 600px;
  text-align: "center";
  height: 400px;
}
.inner-container h1 {
  color: $cherry;
  line-height: 1.25em;
  text-align: center;
  font-size: 4em;
  max-width: 600px;
}
.inner-container h3 {
  line-height: 1.5em;
  font-size: 1.3em;
  text-align: center;
}
.landing-container {
  width: 100%;
  height: 100px;
}
.landing-image {
  background: url("../assets/demo-large.svg") no-repeat center;
  width: 100%;
  height: 100%;
}
.landing-back {
  background: #fff;
  width: 100%;
  height: 50vh;
  // margin-top: -200px;
}
.middle-container {
  background: #fff;
  height: 250px;
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
  justify-content: center;
}

.footer-container h1 {
  // width: 100%;
}

.call-to-action {
  height: 200px;
  background: $lightcherry;
  display: flex;
  justify-content: center;
}

.call-Button {
  background-color: #d81e5b; /* Green */
  border-radius: 15px;
  border: none;
  color: #473144;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 28px;
  height: 70px;
  font-weight: 500;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#logo {
  height: 24px;
  width: auto;
  display: inline;
}
#how-it-works {
  text-align: center;
  background: $lightcherry;
  padding: 2.5% 0;
}
#how-it-works h1 {
  color: $brown;
}
</style>

