<template>
  <md-app id="app" md-mode="reveal" style="min-height: 100vh;">
    <md-app-toolbar md-elevation="0" id="toolbar">
      <a href="/">
        <img :src="logo" class="logo-svg" alt="logo" />
      </a>

      <div class="md-toolbar-section-end">
        <!-- {{currentNetwork}} -->
        <clickable-address :eth-address="account" />
      </div>
    </md-app-toolbar>

    <md-app-content id="content">
      <mining-transaction />
      <router-view />
      <div id="foot">
        <span>
          🍒
          <b>
            <a href="https://github.com/NeapolitanSwaps/CherrySwap">Cherry Swap</a> - made with ❤️ by Neapolitan Swaps 🍨
          </b>
        </span>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import MiningTransaction from "@/components/widgets/MiningTransaction";

import Web3 from "web3";
import * as actions from "@/store/actions";
import * as mutations from "@/store/mutation-types";
import ClickableAddress from "@/components/widgets/ClickableAddress";
import { mapActions, mapState } from "vuex";
import router from "@/router";

// import logo from "@/assets/SnapLogo.svg";
// import logo from "@/assets/SnapLogo.svg";
import logo from "@/assets/logo.svg";

export default {
  name: "app",
  components: { ClickableAddress, MiningTransaction },
  data() {
    return {
      logo: logo,
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
@import url("https://fonts.googleapis.com/css?family=Coiny|Rubik");
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
  color: #2c3e50;
}
.logo-svg {
  width: 10vw;
  min-width: 200px;
  padding: 0 20px;
  cursor: pointer;
}
#toolbar {
  background-color: $vanilla;
  width: 100%;
  align-self: center;
}
#toolbar a {
  text-align: center;
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
#foot {
  background-color: $vanilla;
  padding: 25px;
  text-align: center;
}
#content {
  background-color: $vanilla;
  padding: 0;
  height: auto;
}
.md-toolbar {
  min-height: 76px !important;
}
#foot span a {
  text-decoration: underline;
  color: #000;
}
@media only screen and (min-width: 768px) {
  #toolbar a {
    text-align: left;
  }
}
</style>