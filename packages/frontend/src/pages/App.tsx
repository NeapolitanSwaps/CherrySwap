import React, { Suspense, lazy } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";
import Button from "../components/elements/Button";

const Swap = lazy(() => import("./Swap"));
const Position = lazy(() => import("./Position"));

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const App = () => {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Header />
        <Suspense fallback={null}>
          <Switch>
            <Route exact strict path="/" component={() => <Swap />} />
            <Route exact strict path="/position" component={() => <Position />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
      {/* <Header />
      <Main /> */}
    </AppWrapper>
  );
};

export default App;
