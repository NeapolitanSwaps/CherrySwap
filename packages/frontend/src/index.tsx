import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Web3Provider } from "ethers/providers/web3-provider";
import React from "react";
import ReactDOM from "react-dom";
import { NetworkContextName } from "./constants";
import App from "./pages/App";
import ThemeProvider, { GlobalStyle } from "./theme";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const getLibrary = (provider: Web3Provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

ReactDOM.render(
  <>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ThemeProvider>
          <>
            <GlobalStyle />
            <App />
          </>
        </ThemeProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </>,
  document.getElementById("root")
);
