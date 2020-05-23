import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import styled from "styled-components";
import Header from "../components/Header";

const Index = lazy(() => import("./Index"));
const Position = lazy(() => import("./Position"));

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Header />
        <Suspense fallback={null}>
          <Switch>
            <Route exact strict path="/" component={() => <Index />} />
            <Route exact strict path="/position" component={() => <Position />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AppWrapper>
  );
};

export default App;
