import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Drizzle } from "@drizzle/store";
import CherrySwap from "@cherryswap/smart-contracts/build/contracts/CherrySwap.json";
import CherryDai from "@cherryswap/smart-contracts/build/contracts/CherryDai.json";
import './index.css';
import App from './App';

const options = {
  contracts: [
      CherrySwap,
      CherryDai
  ],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
};

const drizzle = new Drizzle(options);
ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
