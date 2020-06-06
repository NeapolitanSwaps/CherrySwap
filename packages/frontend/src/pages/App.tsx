import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from 'ethers';
import { Web3Provider } from "ethers/providers";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Web3ReactManager from "../components/Web3ReactManager";
import AppProvider from "../context/AppProvider";

const Swap = lazy(() => import("./Swap"));
const Position = lazy(() => import("./Position"));

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getLibrary = (provider: Web3Provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const App = () => {
  return (
    <AppWrapper>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ReactManager>
          <AppProvider>
            <BrowserRouter>
              <Header />
              <Suspense fallback={null}>
                <Switch>
                  <Route exact strict path="/" component={() => <Swap />} />
                  <Route exact strict path="/position" component={() => <Position />} />
                </Switch>
              </Suspense>
            </BrowserRouter>
          </AppProvider>
        </Web3ReactManager>
      </Web3ReactProvider>
    </AppWrapper>
  );
};

export default App;
