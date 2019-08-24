<template>
    <div class="md-layout-item" style="background">
        <div class="md-layout">
        <div class="md-layout-item">
            <img v-if="icon == 0" :src="cone1" alt="Demo logo"/> 
            <img v-if="icon == 1" :src="cone2" alt="Demo logo"/> 
            <img v-if="icon == 2" :src="cone3" alt="Demo logo"/> 
        </div>
        </div>
        <div class="md-layout">
        <div class="md-layout-item">
            <h1>How it works</h1>
        </div>
        </div>
    </div>
  <!-- <md-card>
    <md-card-header>
      <div class="md-title">{{data.title}}</div>
    </md-card-header>
    <md-card-content>
      <div id="row-1" class="row">
        <market-cell v-for="item in data.items[0]" :item="item" />
      </div>
      <div id="row-2" class="row">
        <market-progress
          v-if="!data.items[1]"
          :short="data.short"
          :shortDai="data.shortDai"
          :longDai="data.longDai"
        />
        <market-cell v-for="item in data.items[1]" :item="item" />
      </div>
    </md-card-content> -->
  <!-- </md-card> -->
</template>

<script>
import cone1 from '@/assets/cone-1.svg';
import cone2 from '@/assets/cone-2.svg';
import cone3 from '@/assets/cone-3.svg';
export default {
  name: "MarketBox",
  props: {
      icon: {
          type: Number
      }
  },
  components: {
  },
  data() {
      return {
          cone1,
          cone2,
          cone3
      }
  },
  methods: {}
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
