<template>
  <div v-if="ethAddress" class="md-layout eth-address">
    <jazzicon :address="ethAddress" :diameter="25"/>
    <a class="md-subheading" :href="buildLink" target="_blank" style="color: black;"> {{ dotDotDot }}</a>
  </div>
</template>

<script>
/* global web3:true */
import { mapGetters, mapState } from "vuex";

export default {
  name: "clickableAddress",
  components: {},
  props: {
    ethAddress: {
      type: String
    }
  },
  computed: {
    ...mapState(["etherscanBase"]),
    dotDotDot: function() {
      if (this.ethAddress) {
        return (
          this.ethAddress.substr(0, 6) +
          "..." +
          this.ethAddress.substr(
            this.ethAddress.length - 6,
            this.ethAddress.length
          )
        );
      }
      return "";
    },
    buildLink: function() {
      return `${this.etherscanBase}/address/${this.ethAddress}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

// Eth Address
.eth-address {
  // display: inline-block;
  padding-top: 7px;
  padding-left: 10px;
  padding-right: 10px;
  background: rgba($darkgray, 0.05);
  border-radius: 25px;

  &:hover {
    background: rgba($darkgray, 0.1);
    border-bottom: none;
  }
}
.md-subheading {
  font-size: 14px;
  padding-left: 10px;
}
</style>
