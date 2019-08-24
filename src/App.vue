<template>
  <md-app id="app" md-mode="reveal" style="min-height: 100vh;">
    <md-app-toolbar md-elevation="0">
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Home Page</span>

      <!-- <logo style="margin-left:600px"/> -->

      <div class="md-toolbar-section-end">
        <div
          class="md-layout md-gutter md-alignment-center-right"
          style="text-align:right; width:500px"
        >
          <div class="md-layout-item">
            <div class="md-subheading">{{currentNetwork}}</div>
          </div>
          <div class="md-layout-item">
            <div class="md-subheading">
              <clickable-address :eth-address="account" />
            </div>
          </div>
        </div>
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <!-- <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar> -->

      <md-list>
        <md-list-item>
          <md-icon>home</md-icon>
          <span class="md-list-item-text">
            <router-link to="/">Home</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>create</md-icon>
          <span class="md-list-item-text">
            <router-link to="/create">Create Snapfund</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>inbox</md-icon>
          <span class="md-list-item-text">
            <router-link to="/manage">Manage Snapfund</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>compare</md-icon>
          <span class="md-list-item-text">
            <a href="http://backtester.ethsnap.fund" target="__blank">Backtest SnapFund</a>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>code</md-icon>
          <span class="md-list-item-text">
            <a href="https://github.com/constantiam/snap" target="__blank">Github</a>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>chat</md-icon>
          <span class="md-list-item-text">
            <a href="https://github.com/constantiam/snap" target="__blank">Telegram</a>
          </span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content style="background-color: $vanilla">
      <router-view />
    </md-app-content>
  </md-app>
</template>

<script>
/* global web3:true */

import Web3 from "web3";
import * as actions from "@/store/actions";
import * as mutations from "@/store/mutation-types";
import ClickableAddress from "@/components/widgets/ClickableAddress";
import { mapActions, mapState } from "vuex";
import router from "@/router";

// import logo from "@/assets/SnapLogo.svg";
// import logo from "@/assets/SnapLogo.svg";

export default {
  name: "app",
  components: { ClickableAddress },
  data() {
    return {
      web3Detected: true,
      menuVisible: false
    };
  },
  methods: {
    ...mapActions(["INIT_APP"]),
    redirect(_path) {
      router.push({ name: _path });
    }
  },
  async mounted() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      console.log("web3 provider detected!");
      console.log(window.web3);

      // Request account access if needed
      ethereum
        .enable()
        .then(value => {
          console.log("Bootstrapping web app - provider acknowedgled", value);
          this.INIT_APP(window.web3);
        })
        .catch(error => {
          console.log(
            "User denied access, boostrapping application using infura",
            error
          );
          window.web3 = new Web3(
            new Web3.providers.HttpProvider(
              "https://mainnet.infura.io/v3/fb32a606c5c646c7932e43cfaf6c39df"
            )
          );
          this.INIT_APP(window.web3);
        });
    } else if (window.web3) {
      console.log("Running legacy web3 provider");
      window.web3 = new Web3(web3.currentProvider);
      this.INIT_APP(window.web3);
    } else {
      window.web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://mainnet.infura.io/v3/fb32a606c5c646c7932e43cfaf6c39df"
        )
      );
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      this.INIT_APP(window.web3);
    }
  },
  computed: {
    ...mapState(["currentNetwork", "account"])
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Space+Mono");
@import url('https://fonts.googleapis.com/css?family=Coiny|Rubik');
@import "/styles/variables.scss";
@import "~vue-material/dist/theme/engine"; // Import the theme engine

// @include md-register-theme(
//   "default",
//   (
//     primary: #ffefbc,
//     // The primary color of your brand
//       accent: #a78c9f // The secondary color of your brand
//   )
// );

@import "~vue-material/dist/theme/all"; // Apply the theme

html,
body {
  font-family: "Rubik", sans-serif;
  background-color: $vanilla;
}

#app {
  /* text-align: center; */
  color: #2c3e50;
  // margin-top: 10px;
}

#app {
  font-family: "Rubik", sans-serif;
}
nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
</style>