<template>
  <div>
    <div class="container" id="short-long">
      <span class="short">Short</span>
      <span class="long">Long</span>
    </div>
    <div class="container" id="progress-bar" v-bind:class="{ active: short == 0 }">
      <span class="short">{{short}}%</span>
      <span class="long">{{+(100-short).toFixed(2)}}%</span>
      <div class="bullet" id="red" v-bind:style="{ width: +((short/100)*90).toFixed(2) + '%' }"></div>
      <!-- <div class="bullet" id="green"></div> -->
    </div>
    <div class="container" id="dai-count">
      <span class="short">{{shortDai}} DAI</span>
      <span class="long">{{longDai}} DAI</span>
    </div>
  </div>
</template> 

<script>
export default {
  name: "MarketProgress",
  props: {
    short: {
      type: Number
    },
    shortDai: {
      type: Number
    },
    longDai: {
      type: Number
    }
  },
  //   components: { },
  data() {return {}},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.container {
  display: flex;
}
.container span {
  padding: 4px 8px;
}
div span {
  width: 50%;
  font-weight: bolder;
  z-index: 2;
}
div span.short {
  justify-self: flex-start;
  text-align: left;
}
div span.long {
  justify-self: flex-end;
  text-align: right;
}
#short-long {
  padding: 0px 8px;
}
#progress-bar {
  background: $green;
  border-radius: 12px;
  width: 100%;
}
#progress-bar.active {
  background: $greylight;
}
#dai-count span.short {
  color: $cherry;
}
#dai-count span.long {
  color: $green;
}
div .bullet {
  height: 30px;
  // width: 30px;
  position: absolute;
  background: $cherry;
  padding: inherit;
}
div #red.bullet {
  // background: $cherry;
  // width: 40%;
  border-radius: 12px;
}
</style>
