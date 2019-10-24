<template>
  <div>
    <swap-plot />
  </div>
</template>

<script>
/* global web3:true */
import { mapGetters, mapState } from "vuex";
import SwapPlot from "@/components/SwapPlot";

export default {
  name: "clickableAddress",
  components: { SwapPlot },

  computed: {
    // ...mapState(["etherscanBase"]),
  }
};
</script>

<style lang="scss" scoped>
// @import "../../styles/variables.scss";
</style>
