<template>
  <div class="page-container">
    <div style="margin-left: 50px; margin-top: 100px">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-60">
          <span class="md-display-3">
            words
            <br>aaa
          </span>

          <p
            style="margin-top:50px;"
          >Snap lets you create totally decentralised and automatically rebalancing smart contract portfolios.</p>

          <p>Choose your tokens, pick your ratios, set a time period, load up the contract and your new Snapfund will make sure your universe is balanced using the power of mathematics and decentralised exchanges.</p>

          <md-button class="md-raised md-primary" @click="goToCreate" style="margin-top:25px">Begin</md-button>
        </div>
        <div class="md-layout-item md-size-40">
          <!-- <img
            style="text-align: center; width:500px; margin-left:50px; margin-top:-100px;"
            src="@/assets/gif.gif"
          > -->
        </div>
      </div>
      <div class="md-layout md-gutter" style="padding-top:200px">
        <div class="md-layout-item">
          <p>
            Slap on a TCR
            <br>TCRs are pretty cool.
            <br>They’d also enable curated
            <br>bundles / social trading
            <br>which woulld be pretty neat.
          </p>
        </div>
        <div class="md-layout-item">
          <p>
            Manage a fund with a DAO
            <br>The more the merrier!
            <br>Decentralised and community
            <br>managed investment funds
            <br>have a lot of potential
          </p>(probably)
        </div>
        <div class="md-layout-item">
          Risk reduction
          <br>Investing is tricky.
          <br>Triggers a lot of fun cognitive biases.
          <br>Help newbies trade responsibly
          <br>and take profits on the way up!
        </div>
        <div class="md-layout-item">
          <p>
            Profit Stokvels Stokvels 
            <br>are neat. Wikipedia explains them well.
            <br>Why not use crypto assets and give
            <br> rebalanced profits to a member every period!
          </p>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-bottom-right" style="padding-top:100px">
        <div class="md-layout-item md-size-50">
          <p>Built with Ethereum, Uniswap 🦄, an unhealthy amount of ☕️💊 and of course ❤️.</p>
        </div>
        <div class="md-layout-item md-size-50">
          Fun isn’t something one consizers when balancing their portfolio.
          <br>But this… does put a smile on my face - Thanos.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

import router from "@/router";

export default {
  name: "home",
  components: {},
  methods: {
    goToCreate() {
      router.push({ name: "create" });
    }
  }
};
</script>
