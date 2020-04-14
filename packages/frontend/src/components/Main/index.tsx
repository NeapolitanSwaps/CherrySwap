import React, { useState, useRef } from "react";
import styled from "styled-components";
import Toggle from "../elements/Toggle";
import Button from "../elements/Button";
import MarketOverview, { Props as MarketOverviewProps } from "../MarketOverview";
import Deposit from "../Deposit";
import * as S from "./styles";
import PositionOverview, { Props as PositionOverviewProps } from "../PositionOverview";

const Main = () => {
  const [positionSelectionIndex, setPositionSelectionIndex] = useState<number>(0);

  const userInput = useRef<string>("");

  const positionTitles = ["Short", "Long"];

  const toggleState = (index: number) => {
    if (positionSelectionIndex === index) return;
    setPositionSelectionIndex(index);
  };

  const marketOverview: MarketOverviewProps = {
    providerStats: {
      longPoolBalance: 3200,
      shortPoolBalance: 1800
    },
    marketStats: {
      liquidity: 77332222,
      interestRate: 23
    }
  };

  const positionOverview: PositionOverviewProps = {
    interestRate: 3220,
    position: positionSelectionIndex ? "Long" : "Short",
    lockPeriod: 1586476800
  };

  return (
    <S.Main>
      <Toggle onClick={toggleState} currentIndex={positionSelectionIndex} titles={positionTitles} />
      {/* <br />
      <div>
        <Button state={"primary"} title={"Pending"} />
        <Button state={"secondary"} title={"Pending"} />
      </div> */}
      <MarketOverview {...marketOverview} />
      <Deposit
        onTextInput={input => {
          userInput.current = input;
        }}
        balance={10023}
      />
      <PositionOverview {...positionOverview} />
    </S.Main>
  );
};

export default Main;
