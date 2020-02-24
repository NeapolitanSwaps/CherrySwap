import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import styled from "styled-components";
import Header from "../components/Header";

const Swap = lazy(() => import("./Swap"));
const Position = lazy(() => import("./Position"));

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
  max-width: 45rem;
  margin: 2vh auto;
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
    </AppWrapper>
  );
};

export default App;
