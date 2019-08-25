<template>
  <div style="background:#FFFBFB; text-align:center">
    <md-card style="background:white" v-if="mode=='commit'">
      <md-card-header>
        <div class="md-title" style="text-align:left">Commit Funds</div>
      </md-card-header>
      <div class="md-layout">
        <div class="md-layout-item" style="text-align:center; padding: 20px">
          <span class="md-title">Choose a position</span>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item side-text left md-subheading">Interest rate will increase</div>
        <div class="md-layout-item" style="text-align:center">
          <toggle-button
            id="changed-font"
            :width="112"
            :height="40"
            :speed="500"
            :color="{checked: '#D81E5B', unchecked: '#2DC4B6'}"
            :labels="{checked: 'Short', unchecked: 'Long'}"
            @change="position = $event.value"
            :disabled="interestRateOverTime.y.length > 60"
          />
        </div>
        <div class="md-layout-item side-text right md-subheading">Interest rate will decrease</div>
      </div>
      <div class="md-layout" style="padding-top:50px">
        <div class="md-layout-item" style="text-align:center" />
        <div class="md-layout-item" style="text-align:center">
          <span class="md-title">Choose Dai to commit</span>
          <md-field>
            <md-input :step="25" id="number-input" min="0" v-model="amount" type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item" style="text-align:center" />
      </div>
      <div class="md-layout" style="text-align:center; padding:25px;">
        <div class="md-layout-item md-size-20" style="padding-top:40px;" />
        <div class="md-layout-item" style="padding-top:40px;padding-bottom:20px" id="endBox">
          <span class="md-subheading">
            You will commit
            <span style="color:#E4717A">{{amount}} Dai</span> to the current
            <br />market under a
            <b
              :style="position? 'color:#DA366D':'color:#60D0C5' "
            >{{position ? "Short" : "Long"}}</b> position
          </span>
          <br />
          <br />
          <md-button
            class="md-raised"
            id="commitButton"
            :disabled="interestRateOverTime.y.length > 60"
          >Commit</md-button>
        </div>
        <div class="md-layout-item md-size-20" style="padding:40px;" />
      </div>
    </md-card>
    <md-card style="background:white; margin-top:50px" v-if="beginSimulation==true">
      <md-card-header>
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="md-title" style="text-align:left">Market View</div>
          </div>
          <div class="md-layout-item text-right" style="text-align:right">
            <div class="md-title">
              Current APR:
              <span
                :style="cumlativeNetRate==0 ? 'color: black': (cumlativeNetRate>0?'color: #2DC4B6':'color: #DA366D')"
              >{{(interestPlotData[0].y[interestPlotData[0].y.length-1]).toFixed(4)}}% APR</span>
            </div>
            <span>
              <b>Leading Position:</b>
              <md-chip
                :style="cumlativeNetRate>0 ? 'background: #2DC4B6': 'background: #DA366D'"
                v-if="cumlativeNetRate!=0"
              >{{cumlativeNetRate>0 ? 'Long': 'Short'}}</md-chip>
              <span v-if="cumlativeNetRate==0" style="margin-bottom:30px">Not locked yet</span>
            </span>
          </div>
        </div>
      </md-card-header>
      <div class="md-layout">
        <div class="md-layout-item md-size-30">
          <vue-plotly :data="depthPlotData" :layout="depthPlotLayout" :options="plotOptions" />
        </div>
        <div class="md-layout-item">
          <vue-plotly :data="interestPlotData" :layout="interestPlotLayout" :options="plotOptions" />
        </div>
      </div>
      <div class="md-layout" style="padding:20px">
        <div class="md-layout-item md-size-20" />
        <div class="md-layout-item md-size-60" style="padding:20px" id="endBox">
          <div class="md-layout">
            <div class="md-layout-item" style="padding-top:7px">
              <span>
                <b>
                  Your Position:
                  <md-chip
                    :style="position ? 'background: #DA366D': 'background: #2DC4B6'"
                  >{{position ? 'Short' : 'Long'}}</md-chip>
                </b>
              </span>
            </div>
            <div class="md-layout-item" style="padding-top:7px">
              <span>
                <b>Dai Committed:</b> {{amount}}
              </span>
            </div>
            <div class="md-layout-item" style="padding-top:7px">
              <b>Profit/Loss:</b>
              {{profitLoss.cherryPl.toFixed(4)}} Dai
            </div>
            <div class="md-layout-item" style="padding-top:7px">
              <b>Hodl cDai profit:</b>
              {{profitLoss.cDaiPl.toFixed(4)}} Dai
            </div>
          </div>
        </div>
      </div>
    </md-card>

    <md-card style="margin-top:25px;" v-if="!beginSimulation">
      <md-card-header>
        <div class="md-title" style="text-align:left">Begin Market Simulation</div>
      </md-card-header>
      <img :src="cone3" class="svg-image" alt="Demo logo" style="width:85px; padding-top:15px" />
      <p
        class="md-subheading"
        style="padding-top:20px; padding-bottom: 15px"
      >Similate the running time of a swap market running over a period of 1 month.</p>

      <md-button
        class="md-primary md-raised"
        id="commitButton"
        @click="startSimulation"
        :disabled="amount==0"
        style="margin-bottom: 20px"
      >Start simulation</md-button>
    </md-card>
  </div>
</template>

<script>
import VuePlotly from "@statnett/vue-plotly";
import cone3 from "@/assets/cone-3.svg";

import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "SwapPlot",
  components: { VuePlotly },
  data() {
    return {
      cone3,
      beginSimulation: false,
      mode: "commit",
      position: false,
      amount: 0,
      interestRate: [],

      plotOptions: {
        responsive: true,
        showLink: false,
        displayModeBar: false
      },
      cumaltiveSum: 0
    };
  },
  methods: {
    ...mapActions(["GENERATE_RANDOM_DATA"]),
    startSimulation() {
      this.beginSimulation = true;
      this.GENERATE_RANDOM_DATA();
    }
  },

  computed: {
    ...mapState(["interestRateOverTime", "volumeOverTime"]),
    cumlativeNetRate() {
      if (this.interestPlotData[0].y.length >= 60) {
        this.cumaltiveSum +=
          this.interestPlotData[0].y[this.interestPlotData[0].y.length - 1] -
          this.interestPlotData[0].y[59];
      } else {
        return 0;
      }
      return this.cumaltiveSum;
    },
    depthPlotData() {
      return [
        {
          x: this.volumeOverTime.x,
          y: this.volumeOverTime.yLong,
          fill: "tozeroy",
          mode: "line",
          line: { shape: "linear", color: "#2DC4B6" },
          name: "Long Volume"
        },
        {
          x: this.volumeOverTime.x,
          y: this.volumeOverTime.yShort,
          mode: "line",
          fill: "tozeroy",
          line: { shape: "linear", color: "#D81E5B" },
          name: "Short Volume"
        }
      ];
    },
    interestPlotData() {
      return [
        {
          x: this.interestRateOverTime.x,
          y: this.interestRateOverTime.y,
          mode: "line",
          line: { shape: "spline", color: "rgb(128, 0, 128)" }
        }
      ];
    },
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
              width: 3,
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
              width: 3,
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
              width: 3,
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
            x: 155,
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
    },
    profitLoss() {
      if (this.interestRateOverTime.y.length > 60) {
        let a = this.position ? -1 : 1;
        console.log("a", a);
        let longDai = this.volumeOverTime.yLong.reduce((a, b) => a + b, 0);
        console.log("longDai", longDai);
        let shortDai =
          -1 * this.volumeOverTime.yShort.reduce((a, b) => a + b, 0);
        console.log("shortDai", shortDai);
        let pt = longDai + shortDai;
        console.log("pt", pt);
        let pr = a == 1 ? shortDai / pt : longDai / pt;
        console.log("pr", pr);

        let t = (this.interestRateOverTime.y.length - 1 - 60) / 4 / 365;
        console.log("t", t);

        let pt1 =
          pt * (Math.exp((this.interestRateOverTime.y[60] / 100) * t) - 1);
        console.log("pt1", pt1);

        let pt2_val = 0;
        for (let i = 60; i < this.interestRateOverTime.y.length - 1; i++) {
          pt2_val +=
            Math.exp((this.interestRateOverTime.y[i] / 100) * (0.25 / 365)) - 1;
        }

        // let pt2_val = Math.exp(
        //   (this.interestRateOverTime.y[this.interestRateOverTime.y.length - 1] /
        //     100) *
        //     t
        // );
        console.log("pt2_val", pt2_val);
        let pt2 = pt2_val * pt;
        console.log("pt2", pt2);
        let plRatio = (a * pr * (pt2 - pt1)) / pt1;
        console.log("plRatio", plRatio);
        let individualPl = plRatio * this.amount;
        console.log("individualPl", individualPl);

        let cdaiPl = pt2_val * this.amount;
        console.log("cdaiPl", cdaiPl);
        return { cherryPl: individualPl, cDaiPl: cdaiPl };
      } else {
        return { cherryPl: 0, cDaiPl: 0 };
      }
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  border-bottom: 1px solid $greylight;
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
