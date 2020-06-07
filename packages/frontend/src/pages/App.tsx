import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Modal from "../components/Modal";
import AppProvider from "../context/AppProvider";
import ModalProvider from "../context/ModalContext";

const Swap = lazy(() => import("./Swap"));
const Position = lazy(() => import("./Position"));

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  return (
    <AppProvider>
      <Suspense fallback={null}>
        <AppWrapper>
          <BrowserRouter>
            <ModalProvider>
              <Header />
              <Modal />
              <Switch>
                <Route exact strict path="/" component={() => <Swap />} />
                <Route exact strict path="/position" component={() => <Position />} />
              </Switch>
            </ModalProvider>
          </BrowserRouter>
        </AppWrapper>
      </Suspense>
    </AppProvider>
  );
};

export default App;
