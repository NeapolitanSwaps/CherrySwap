<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{dataObj.title}}</div>
    </md-card-header>
    <md-card-content v-if="interestRateOverTime.y.length>1">
      <div id="row-1" class="row">
        <market-cell v-for="item in dataObj.items[0]" :item="item" />
      </div>
      <div id="row-2" class="row">
        <market-progress
          v-if="!dataObj.items[1]"
          :short="dataObj.short"
          :shortDai="dataObj.shortDai"
          :longDai="dataObj.longDai"
        />
        <market-cell v-for="item in dataObj.items[1]" :item="item" />
      </div>
    </md-card-content>
    <md-card-content
      v-if="interestRateOverTime.y.length==1 && dataObj.items[1] !=null"
      style="text-align:center"
    >
      <img :src="cone1" class="svg-image" alt="Demo logo" style="width:85px; padding:15px" />
      <p class="md-subheading">No market is running yet! Market overview data will apear here when you start one.</p>
    </md-card-content>
    <md-card-content
      v-if="interestRateOverTime.y.length==1 && dataObj.items[1] ==null"
      style="text-align:center"
    >
      <img :src="cone2" class="svg-image" alt="Demo logo" style="width:85px; padding:15px" />
      <p class="md-subheading">No market is running yet! Market statistics and data will apear here when you start one.</p>
    </md-card-content>
  </md-card>
</template>

<script>
import MarketCell from "./MarketCell";
import MarketProgress from "./MarketProgress";

import cone1 from "@/assets/cone-1.svg";
import cone2 from "@/assets/cone-2.svg";

import { mapActions, mapState } from "vuex";
export default {
  name: "MarketBox",
  props: {
    dataObj: {
      type: Object
    }
  },
  components: {
    MarketCell,
    MarketProgress
  },
  data() {
    return {
      cone1,
      cone2
    };
  },
  methods: {},
  computed: {
    ...mapState(["interestRateOverTime", "volumeOverTime"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.md-card {
  background: #fff;
  width: 30%;
  display: inline-block;
  vertical-align: top;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  margin-top: -75px;
}
.md-card-content {
  padding: 5%;
}
.md-card-header {
  border-bottom: 1px solid $greylight;
  height: 75px;
}
.row {
  padding: 25px 0;
}
#row-1 {
  border-bottom: 1px solid $greylight;
}

.md-app-content .md-card {
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>
