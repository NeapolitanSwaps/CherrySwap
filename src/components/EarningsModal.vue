<template>
  <div class="info-box-container">
    <div class="md-layout-item row">
      <div class="md-title" id="header" style="text-align:center">
        <b>Market Closed</b>
        </div>
    </div>
    <div class="md-layout row">
        <div class="md-layout-item">
        <div class="md-title" style="text-align:center">
            <b>Leading Position: </b>
            <span v-bind:class="{ shorter: !short, longer: short}" class="bullet">{{data.position}}</span>
        </div>
        </div>
        <div class="md-layout-item">
        <div class="md-title" style="text-align:center">
            <b>Your Position: </b> 
            <span v-bind:class="{ shorter: short, longer: !short}" class="bullet">{{data.leadingPosition}}</span>
        </div>
        </div>
    </div>
    <div class="md-layout row">
        <div class="md-layout-item">
        <div class="md-title" style="text-align:center">
            <b>Average IR: </b> 
            <span v-bind:class="{ shorter: short, longer: !short}" class="highlight">{{data.averageIR}}% APR</span>
            
        </div>
        </div>
        <div class="md-layout-item">
        <div class="md-title" style="text-align:center">
            <b>Your Investment: </b> 
            <span v-bind:class="{ shorter: !short, longer: short}" class="highlight">{{data.investment}} cDAI</span>
        </div>
        </div>
    </div>
    <div class="md-layout-row box" id="wrapper">
        <div class="md-title" id="header" style="text-align:center">
            <b>Your Earnings</b>
        </div>
        <div class="md-layout-item row">
            <div>
                <div class="md-title" style="text-align:center">
                    Your interest earned
                </div>
                <div class="md-layout-item">
                    <div class="md-title" style="text-align:center">
                        <b>{{data.investProfit}} cDAI</b>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-layout-item row">
            <div>
                <div class="md-title" style="text-align:center">
                    A direct investment into Compound would have netted you:
                </div>
                <div class="md-layout-item">
                    <div class="md-title" style="text-align:center">
                        <b>{{data.hodlProfit}}  cDAI</b>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-layout-item row">
            <div>
                <div class="md-title" style="text-align:center">
                    A long position on Cherry Swap would have netted you:
                </div>
                <div class="md-layout-item">
                    <div class="md-title" style="text-align:center">
                        <b>{{data.reversePositionProfit}} cDAI</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EarningsModal",
  props: {
    data: {
      type: Object
    }
  },
  components: {},
  data() {
      short: isShort()
  },
  methods: {}
};

const isShort = () => {
    return data.position === 'short' 
}

</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
#header {
    border-bottom: 1px solid $greylight;
    vertical-align: center;
    padding: 20px 0;
}
#wrapper {
    width: 75%;
    margin-bottom: 20px;
}
div.row {
    margin: 30px 0;
}
#header.row {
    margin: 0;
}
div.box {
    margin: 0px auto;
    border: 2px dotted $greylight;
    border-radius: 12px;
}
span.bullet {
    color: #473144;
    text-align: center;
    border-radius: 12px;
    padding: 5px 20px;
    text-transform: capitalize;
}
.bullet.longer {
    background: $green;
}
.bullet.shorter {
    background: $cherry;
}
span.highlight.shorter {
    color: $cherry;
}
span.highlight.longer {
    color: $green;
}
</style>
