<template>
  <md-card>
      <md-card-header>
          <div class="md-title">{{data.title}}</div>
      </md-card-header>
      <md-card-content>
        <div id="row-1">
            <market-cell v-for="item in data.items[0]" :item="item" />
        </div>
        <div id="row-2">
            <div v-if="!data.items[1]" id="short-long-container">
                <span class="short">Short</span>
                <span class="long">Long</span>
            </div>
            <market-cell v-for="item in data.items[1]" :item="item" />
        </div>
      </md-card-content>
    </md-card>
</template>

<script>
import MarketCell from "./MarketCell";
export default {
  name: "MarketBox",
  props: {
    data: {
        type: Object
    }
  },
  components: { 
      MarketCell
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
    width: 30vw;
    display: inline-block;
    vertical-align: top;
    height: 300px;
}
.md-card-header {
    border-bottom: 1px solid $greylight; 
}
#row-1 {
    border-bottom: 1px solid $greylight;
    margin-bottom: 20px;
}
#short-long-container {
    display: flex;
}
#short-long-container span {
    width: 50%;
    font-weight: bolder;
}
#short-long-container span.short {
    justify-self: flex-start;
    text-align: left;
}
#short-long-container span.long {
    justify-self: flex-end;
    text-align: right;
}
</style>
