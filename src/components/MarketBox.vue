<template>
  <md-card>
      <md-card-header>
          <div class="md-title">{{data.title}}</div>
      </md-card-header>
      <md-card-content>
        <div id="row-1" class="row">
            <market-cell v-for="item in data.items[0]" :item="item" />
        </div>
        <div id="row-2" class="row">
            <market-progress v-if="!data.items[1]" :short="data.short"/>
            <market-cell v-for="item in data.items[1]" :item="item" />
        </div>
      </md-card-content>
    </md-card>
</template>

<script>
import MarketCell from "./MarketCell";
import MarketProgress from "./MarketProgress";
export default {
  name: "MarketBox",
  props: {
    data: {
        type: Object
    }
  },
  components: { 
      MarketCell,
      MarketProgress
  },
  data() {
      
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
