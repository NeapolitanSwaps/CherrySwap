<template>
  <md-app id="app" md-mode="reveal" style="min-height: 100vh">
    <md-app-toolbar md-elevation="0" id="toolbar">
      <img :src="logo" class="logo-svg" style="padding-left:20px" alt="logo" />
      <div class="md-toolbar-section-end">
        {{currentNetwork}}
        <clickable-address :eth-address="account" />
      </div>
    </md-app-toolbar>

    <md-app-content id="content">
      <router-view />
      <div id="foot">
        🍒
        <b>Cherry Swap - made with ❤️ by Neapolitan Swaps 🍨</b>
      </div>
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
import logo from "@/assets/logo.svg";

export default {
  name: "app",
  components: { ClickableAddress },
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
  background-color: $background;
}

#app {
  /* text-align: center; */
  color: #2c3e50;
  // margin-top: 10px;
}

.logo-svg {
  width: 10vw;
}

#toolbar {
  background-color: $vanilla;
  width: 100%;
  align-self: center;
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
  margin-top: 25px;
  padding: 25px;
  text-align: center;
}

#content {
  background-color: $background;
  padding-left: 0;
  padding-right: 0;
  padding-top: 25px;
  padding-bottom: 0px;
  height: auto;
}
</style>