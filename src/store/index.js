import Web3 from "web3";
import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import moment from "moment";

import {
  getEtherscanAddress,
  getNetIdString,
}
from "@/utils/lookupTools";

import * as actions from "./actions";
import * as mutations from "./mutation-types";

import truffleContract from "truffle-contract";

// import FundFactoryABI from "../../build/contracts/FundFactory.json"

// const FundFactory = truffleContract(FundFactoryABI);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    account: null,
    currentNetwork: null,
    etherscanBase: null,
    interestRateOverTime: {
      x: [0],
      y: [20]
    },
    volumeOverTime: {
      x: [0],
      yLong: [0],
      yShort: [0]
    },
    swapPeriod: 'Open'
  },
  mutations: {
    //WEB3 Stuff
    [mutations.SET_ACCOUNT](state, account) {
      console.log("Account set")
      console.log(account)
      state.account = account;
    },
    [mutations.SET_CURRENT_NETWORK](state, currentNetwork) {
      state.currentNetwork = currentNetwork;
    },
    [mutations.SET_ETHERSCAN_NETWORK](state, etherscanBase) {
      state.etherscanBase = etherscanBase;
    },
    [mutations.SET_WEB3]: async function (state, web3) {
      state.web3 = web3;
    },
  },
  actions: {

    [actions.GENERATE_RANDOM_DATA]: function ({
      commit,
      dispatch,
      state
    }) {
      console.log("generating data")

      state.interestRateOverTime.x = Array.from(Array(180).keys());
      state.volumeOverTime.x = Array.from(Array(60).keys());

      setInterval(() => {
        if (state.interestRateOverTime.y.length < 180) {
          state.interestRateOverTime.y.push(
            Math.random() * 4 -
            1.9 +
            state.interestRateOverTime.y[state.interestRateOverTime.y.length - 1]
          );
        }
        if (state.interestRateOverTime.y.length < 60) {
          if (Math.random() > 0.7) {
            state.volumeOverTime.yLong.push(
              state.volumeOverTime.yLong[state.volumeOverTime.yLong.length - 1] +
              Math.random() * 25
            );
          } else {
            state.volumeOverTime.yLong.push(
              state.volumeOverTime.yLong[state.volumeOverTime.yLong.length - 1]
            );
          }
          if (Math.random() > 0.9) {
            state.volumeOverTime.yShort.push(
              state.volumeOverTime.yShort[state.volumeOverTime.yShort.length - 1] -
              Math.random() * 25
            );
          } else {
            state.volumeOverTime.yShort.push(
              state.volumeOverTime.yShort[state.volumeOverTime.yShort.length - 1]
            );
          }
        }
      }, 100);

      // commit(mutations.SET_INTERSTRATE_OVER_TIME, interestRateOverTime)
      // commit(mutations.SET_VOLUME_OVER_TIME, state.interestRateOverTime)


    },
    [actions.GET_CURRENT_NETWORK]: function ({
      commit,
      dispatch,
      state
    }) {
      getNetIdString().then(currentNetwork => {
        commit(mutations.SET_CURRENT_NETWORK, currentNetwork);
      });
      getEtherscanAddress().then(etherscanBase => {
        commit(mutations.SET_ETHERSCAN_NETWORK, etherscanBase);
      });
    },

    [actions.INIT_APP]: async function ({
      commit,
      dispatch,
      state
    }, web3) {
      // FundFactory.setProvider(web3.currentProvider)
      // Set the web3 instance
      console.log("IN STORE")
      console.log(web3)
      commit(mutations.SET_WEB3, {
        web3
      });
      console.log("set")

      dispatch(actions.GET_CURRENT_NETWORK);

      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      if (account) {
        commit(mutations.SET_ACCOUNT, account);
      }
      // let fundFactory = await FundFactory.at(state.factoryAddress)
      console.log("logging vyper from UI")
      // let numberOfFunds = await fundFactory.getAllFundUids()
    }
  }
})