<template>
  <div class="page-container">
    <md-card style="padding:20px">
      <div class="md-layout md-gutter" style="text-align: center">
        <div class="md-layout-item" style="padding-left:0px; padding-right:0px">
          <span class="md-caption">Total Value</span>
          <br>
          <span class="md-display-1">425.5 USD</span>
        </div>
        <div class="md-layout-item" style="padding-left:0px; padding-right:0px">
          <span class="md-caption">Total Invested</span>
          <br>
          <span class="md-display-1">425.5 USD</span>
        </div>
        <div class="md-layout-item" style="padding-left:0px; padding-right:0px">
          <span class="md-caption">Snapped Value</span>
          <br>
          <span class="md-display-1">425.5 USD</span>
        </div>
      </div>
    </md-card>
    <md-table md-card style="padding:20px; margin-top:20px">
      <md-table-toolbar>
        <h1 class="md-title">My Snapfunds</h1>
        <md-button
          class="md-raised md-primary"
          @click="goToCreate"
          style="margin-top:25px"
        >New Snapfund</md-button>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head></md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Assets</md-table-head>
        <md-table-head>Next Rebalance</md-table-head>
        <md-table-head>Current Value</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>1</md-table-cell>
        <md-table-cell md-numeric>
          <jazzicon :address="abc" :diameter="40"/>
        </md-table-cell>
        <md-table-cell>
          Perfectly balanced
          <br>
          <span class="md-caption">perfectlybalanced.snapfund.eth</span>
        </md-table-cell>
        <md-table-cell>ETH, DAI, MKR</md-table-cell>
        <md-table-cell>2019-05-16 14:00</md-table-cell>
        <md-table-cell>$320.62</md-table-cell>
        <md-table-cell style="text-align:right">
          <md-button
            class="md-raised md-primary"
            @click="goToCreate"
            style="margin-top:25px"
          >Rebalance</md-button>
          <md-button
            class="md-raised md-primary"
            @click="goToCreate"
            style="margin-top:25px"
          >View/Edit</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
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
