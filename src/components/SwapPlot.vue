<template>
  <div>
    <md-card style="background:white">
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
              >{{(plotData[0].y[plotData[0].y.length-1]).toFixed(4)}}% APR</span>
            </div>
          </div>
        </div>

        <hr />
      </md-card-header>
      <vue-plotly :data="plotData" :layout="plotLayout" :options="plotOptions" />
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
      interestRate: [],
      plotData: [
        {
          x: [0],
          y: [20],
          mode: "line",
          line: { shape: "spline" }
        }
      ],
      plotOptions: {
        responsive: true,
        showLink: false,
        displayModeBar: false
      }
    };
  },
  methods: {},
  mounted() {
    this.plotData[0].x = Array.from(Array(200).keys());
    setInterval(() => {
      if (this.plotData[0].y.length < 200) {
        this.plotData[0].y.push(
          Math.random() * 8 -
            3.7 +
            this.plotData[0].y[this.plotData[0].y.length - 1]
        );
      }
    }, 100);
  },

  computed: {
    // ...mapState(["etherscanBase"]),
    plotLayout() {
      return {
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
            y0: this.plotData[0].y.length >= 60 ? this.plotData[0].y[60] : 20,
            x1: 200,
            y1: this.plotData[0].y.length >= 60 ? this.plotData[0].y[60] : 20,
            line: {
              color: "#D6D6D6",
              width: this.plotData[0].y.length >= 60 ? 2 : 0,
              dash: "dot"
            }
          },
          {
            type: "line",
            x0: 60,
            y0:
              Math.min(...this.plotData[0].y) < 10
                ? Math.min(...this.plotData[0].y)
                : 10,
            x1: 60,
            y1:
              Math.max(...this.plotData[0].y) > 30
                ? Math.max(...this.plotData[0].y)
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
              Math.min(...this.plotData[0].y) < 10
                ? Math.min(...this.plotData[0].y)
                : 10,
            x1: 180,
            y1:
              Math.max(...this.plotData[0].y) > 30
                ? Math.max(...this.plotData[0].y)
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
            x: 80,
            y:
              this.plotData[0].y.length >= 60 ? this.plotData[0].y[60] + 3 : 20,
            text:
              this.plotData[0].y.length >= 60
                ? "Fixed Rate(long pays, short recives)"
                : "",
            ax: 0,
            ay: -40,
            showarrow: false
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
