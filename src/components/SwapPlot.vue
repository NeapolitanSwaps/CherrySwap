<template>
  <div>
    a
    <vue-plotly :data="plotData" :layout="plotLayout" />
    {{plotData}}
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
      plotLayout: {
        shapes: [
          {
            type: "line",
            x0: 0,
            y0: 20,
            x1: 200,
            y1: 20,
            line: {
              color: "rgb(50, 171, 96)",
              width: 4,
              dash: "dashdot"
            }
          },
          {
            type: "line",
            x0: 60,
            y0: 10,
            x1: 60,
            y1: 30,
            line: {
              color: "rgb(50, 171, 96)",
              width: 4,
              dash: "dashdot"
            }
          },
          {
            type: "line",
            x0: 180,
            y0: 10,
            x1: 180,
            y1: 30,
            line: {
              color: "rgb(50, 171, 96)",
              width: 4,
              dash: "dashdot"
            }
          }
        ],
        annotations: [
          {
            x: 57,
            y: 25,
            xref: "x",
            yref: "2",
            text: "Start",
            ax: 0,
            ay: -40,
            textangle: "-90"
          }
        ]
      }
    };
  },
  methods: {},
  mounted() {
    this.plotData[0].x = Array.from(Array(180).keys());
    setInterval(() => {
      this.plotData[0].y.push(Math.random() * 10 + 15);
    }, 500);
  },

  computed: {
    // ...mapState(["etherscanBase"]),
    // plotDataz() {
    //   let value = 10;
    //   setInterval(this.addValueToPlot(), 1000);
    //   return this.interestRate;
    // }
  }
};
</script>

<style lang="scss" scoped>
</style>
