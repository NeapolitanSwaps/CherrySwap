<template>
  <div>
    <md-card style="background:white" v-if="mode=='commit'">
      <md-card-header>
        <div class="md-title" style="padding-left:15px">Commit Funds</div>
      </md-card-header>
      <div class="md-layout">
        <div class="md-layout-item" style="text-align:center; padding: 20px">
          <span class="md-title ">
            Choose a position
          </span>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item side-text left">
          Interest rate will increase
        </div>
        <div class="md-layout-item" style="text-align:center">
          <toggle-button
            id="changed-font"
            :width="112"
            :height="40"
            :speed="500"
            :color="{checked: '#D81E5B', unchecked: '#2DC4B6'}"
            :labels="{checked: 'Short', unchecked: 'Long'}"
            @change="position = $event.value"
          />
        </div>
        <div class="md-layout-item side-text right">Interest rate will decrease</div>
      </div>
      <div class="md-layout" style="padding-top:50px">
        <div class="md-layout-item" style="text-align:center" />
        <div class="md-layout-item" style="text-align:center">
          <span class="md-title">
            Choose Dai to commit
          </span>
          <md-field>
            <md-input id="number-input" min="0" v-model="amount" type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item" style="text-align:center" />
      </div>
      <div class="md-layout" style="text-align:center; padding:25px;">
        <div class="md-layout-item md-size-20" style="padding-top:40px;" />
        <div class="md-layout-item" style="padding-top:40px;padding-bottom:20px" id="endBox">
          <span>
            You will commit
            <span style="color:#E4717A">{{amount}} Dai</span> to the current
            <br />market under a
            <b
              :style="position? 'color:#DA366D':'color:#60D0C5' "
            >{{position ? "SHORT" : "LONG"}}</b> position
          </span>
          <br />
          <br />
          <md-button class="md-raised" id="commitButton">Commit</md-button>
        </div>
        <div class="md-layout-item md-size-20" style="padding:40px;" />
      </div>
    </md-card>
    <md-card style="background:white; margin-top:50px">
      <md-card-header>
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="md-title" style="padding-left:15px">
              <b>Market View</b>
            </div>
          </div>
          <div class="md-layout-item text-right" style="text-align:right">
            <div class="md-title">
              <b>Current APR:</b>
              <span
                style="color:#2DC4B6"
              >{{(interestPlotData[0].y[interestPlotData[0].y.length-1]).toFixed(4)}}% APR</span>
            </div>
          </div>
        </div>

        <hr />
      </md-card-header>
      <div class="md-layout">
        <div class="md-layout-item md-size-30">
          <vue-plotly :data="depthPlotData" :layout="depthPlotLayout" :options="plotOptions" />
        </div>
        <div class="md-layout-item md-size-70">
          <vue-plotly :data="interestPlotData" :layout="interestPlotLayout" :options="plotOptions" />
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import VuePlotly from "@statnett/vue-plotly";

import { mapGetters, mapState } from "vuex";

export default {
  name: "SwapPlot",
  components: { VuePlotly },
  data() {
    return {
      mode: "commit",
      position: "false",
      amount: 0,
      interestRate: [],
      interestPlotData: [
        {
          x: [0],
          y: [20],
          mode: "line",
          line: { shape: "spline", color: "rgb(128, 0, 128)" }
        }
      ],
      depthPlotData: [
        {
          x: [0],
          y: [0],
          fill: "tozeroy",
          mode: "line",
          line: { shape: "linear", color: "#2DC4B6" },
          name: "LONG Volume"
        },
        {
          x: [0],
          y: [0],
          mode: "line",
          fill: "tozeroy",
          line: { shape: "linear", color: "#D81E5B" },
          name: "SHORT Volume"
        }
      ],
      plotOptions: {
        responsive: false,
        showLink: false,
        displayModeBar: false
      }
    };
  },
  methods: {},
  mounted() {
    this.interestPlotData[0].x = Array.from(Array(200).keys());
    this.depthPlotData[0].x = Array.from(Array(60).keys());
    this.depthPlotData[1].x = Array.from(Array(60).keys());
    setInterval(() => {
      if (this.interestPlotData[0].y.length < 200) {
        this.interestPlotData[0].y.push(
          Math.random() * 4 -
            1.9 +
            this.interestPlotData[0].y[this.interestPlotData[0].y.length - 1]
        );
        if (Math.random() > 0.7) {
          this.depthPlotData[0].y.push(
            this.depthPlotData[0].y[this.depthPlotData[0].y.length - 1] +
              Math.random() * 25
          );
        } else {
          this.depthPlotData[0].y.push(
            this.depthPlotData[0].y[this.depthPlotData[0].y.length - 1]
          );
        }
        if (Math.random() > 0.7) {
          this.depthPlotData[1].y.push(
            this.depthPlotData[1].y[this.depthPlotData[1].y.length - 1] -
              Math.random() * 25
          );
        } else {
          this.depthPlotData[1].y.push(
            this.depthPlotData[1].y[this.depthPlotData[1].y.length - 1]
          );
        }
      }
    }, 100);
  },

  computed: {
    // ...mapState(["etherscanBase"]),
    depthPlotLayout() {
      return {
        xaxis: {
          title: "Time",
          gridcolor: "#bdbdbd",
          dtick: 10
        },
        yaxis: {
          title: "Volume Traded Dai",
          showline: false
        },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        shapes: [
          {
            type: "line",
            x0: 0,
            y0: 0,
            y1: 0,
            x1: 60,
            line: {
              color: "#D6D6D6",
              width: 2,
              dash: "dot"
            }
          }
        ],
        legend: {
          x: 0.5,
          y: 0.5,
          font: {
            family: "sans-serif",
            size: 12,
            color: "#000"
          },
          bgcolor: "#E9E8E6",
          bordercolor: "#E9E8E6",
          borderwidth: 2
        },
        margin: {
          l: 55,
          r: 20,
          b: 55,
          t: 10,
          pad: 5
        }
      };
    },
    interestPlotLayout() {
      return {
        xaxis: {
          title: "Time",
          gridcolor: "#bdbdbd",
          dtick: 10
        },
        yaxis: {
          title: "% APR",
          showline: false
        },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        shapes: [
          {
            type: "line",
            x0: 0,
            y0:
              this.interestPlotData[0].y.length >= 60
                ? this.interestPlotData[0].y[60]
                : 20,
            x1: 200,
            y1:
              this.interestPlotData[0].y.length >= 60
                ? this.interestPlotData[0].y[60]
                : 20,
            line: {
              color: "#D6D6D6",
              width: this.interestPlotData[0].y.length >= 60 ? 2 : 0,
              dash: "dot"
            }
          },
          {
            type: "line",
            x0: 60,
            y0:
              Math.min(...this.interestPlotData[0].y) < 10
                ? Math.min(...this.interestPlotData[0].y)
                : 10,
            x1: 60,
            y1:
              Math.max(...this.interestPlotData[0].y) > 30
                ? Math.max(...this.interestPlotData[0].y)
                : 30,
            line: {
              color: "#D6D6D6",
              width: 2,
              dash: "dot"
            }
          },
          {
            type: "line",
            x0: 180,
            y0:
              Math.min(...this.interestPlotData[0].y) < 10
                ? Math.min(...this.interestPlotData[0].y)
                : 10,
            x1: 180,
            y1:
              Math.max(...this.interestPlotData[0].y) > 30
                ? Math.max(...this.interestPlotData[0].y)
                : 30,
            line: {
              color: "#D6D6D6",
              width: 2,
              dash: "dot"
            }
          }
        ],
        annotations: [
          {
            x: 58,
            y: 10,
            text: "Swap Start (t1)",
            ax: 0,
            ay: -40,
            textangle: "-90"
          },
          {
            x: 178,
            y: 10,
            text: "Swap End (t2)",
            ax: 0,
            ay: -40,
            textangle: "-90"
          },
          {
            x: 180,
            y:
              this.interestPlotData[0].y.length >= 60
                ? this.interestPlotData[0].y[60] + 2
                : 20,
            text:
              this.interestPlotData[0].y.length >= 60
                ? "Fixed Rate(long pays, short recives)"
                : "",
            ax: 0,
            ay: -40,
            showarrow: false
          }
        ],
        margin: {
          l: 50,
          r: 50,
          b: 55,
          t: 10,
          pad: 5
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.vue-js-switch#changed-font {
  font-size: 18px !important;
}

#number-input {
  background-color: #e9e8e6;
  border-radius: 25px;
  padding: 10px;
  border: 1px solid $cherry;
}

#endBox {
  border: 3px dotted #e9e8e6;
  border-radius: 15px;
}

#commitButton {
  background-color: $cherry;
  border-radius: 15px;
  font-size: 18px;
  padding: 0px 30px;
  display: inline-block;
  text-decoration: none;
  text-transform: none;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
//
.md-card {
    background: #fff;
    width: 62vw;
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
.side-text {
  padding-top: 10px;
}
.side-text.left {
  text-align: right;
}
.side-text.right {
  text-align: left;
}
</style>
