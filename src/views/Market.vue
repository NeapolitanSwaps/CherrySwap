<template>
  <div class="page-container">
    <div class="inner-container">
      <!-- <lottie :options="defaultOptions" :height="100" :width="100" v-on:animCreated="handleAnimation"/> -->
      <market-box :dataObj="boxMarketData"></market-box>
      <market-box :dataObj="boxStatusData"></market-box>
    </div>

    <div class="footer-container">
      <swap-plot id="plot-swap" />
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from "vue-lottie";
import * as animationData from "../assets/icecream.json";
import MarketBox from "@/components/MarketBox";
import SwapPlot from "@/components/SwapPlot";

import { mapActions, mapState } from "vuex";

export default {
  name: "market",
  components: {
    Lottie,
    MarketBox,
    SwapPlot
  },
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["GENERATE_RANDOM_DATA"]),
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    goToCreate() {
      router.push({ name: "create" });
    },
    stop: function() {
      this.anim.stop();
    },

    play: function() {
      console.log("Hello");
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    }
  },
  computed: {
    ...mapState(["interestRateOverTime", "volumeOverTime"]),
    boxMarketData() {
      let locksInString =
        this.interestRateOverTime.y.length < 60
          ? Math.floor(15 - this.interestRateOverTime.y.length / 4) +
            " days " +
            (
              24 -
              ((this.interestRateOverTime.y.length / 4).toFixed(4) -
                Math.floor(this.interestRateOverTime.y.length / 4)) *
                24
            ).toFixed(0) +
            " hours"
          : "Locked";
      let unlocksInString =
        this.interestRateOverTime.y.length > 60
          ? Math.floor(45 - this.interestRateOverTime.y.length / 4) +
            " days " +
            (
              180 -
              ((this.interestRateOverTime.y.length / 4).toFixed(4) -
                Math.floor(this.interestRateOverTime.y.length / 4)) *
                24
            ).toFixed(0) +
            " hours"
          : "Not Started";
      if (this.interestRateOverTime.y.length > 180) {
        unlocksInString = "Unlocked and paid";
      }
      return {
        title: "Market Overview",
        items: [
          [
            { title: "Market", content: "DAI" },
            {
              title: "Current APR",
              content:
                this.interestRateOverTime.y[
                  this.interestRateOverTime.y.length - 1
                ].toFixed(2) + "%"
            }
          ],
          [
            {
              title: "Locks in",
              content: locksInString
            },
            { title: "Unlocks in", content: unlocksInString },
            { title: "Lock duration", content: "30 days" }
          ]
        ]
      };
    },
    boxStatusData() {
      let longDai = this.volumeOverTime.yLong.reduce((a, b) => a + b, 0);
      let shortDai = -1 * this.volumeOverTime.yShort.reduce((a, b) => a + b, 0);
      let totalDai = longDai + shortDai;
      let shortRatio = (shortDai / totalDai) * 100;
      return {
        title: "Current Status",
        items: [
          [
            {
              title: "Phase",
              content:
                this.interestRateOverTime.y.length < 60
                  ? "Pre-Lock"
                  : this.interestRateOverTime.y.length < 180
                  ? "Locked"
                  : "Unlocked and paid"
            },
            { title: "Funds committed", content: totalDai.toFixed(2) + " DAI" },
            {
              title: "Locked fixed APR",
              content:
                this.interestRateOverTime.y.length < 60
                  ? "Not set yet"
                  : +this.interestRateOverTime.y[59].toFixed(2) + "% "
            }
          ],
          null
        ],
        short: +shortRatio.toFixed(2),
        shortDai: +shortDai.toFixed(2),
        longDai: +longDai.toFixed(2)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.page-container {
  background: #fffbfb;
}
.page-container img {
  width: 75vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.inner-container {
  display: flex;
  //   width: 50vw;
  text-align: "center";
  justify-content: center;
  margin-top: 100px;
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
  background: url("../assets/demo-large.svg") no-repeat center;
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
  margin-top: 25px;
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>

