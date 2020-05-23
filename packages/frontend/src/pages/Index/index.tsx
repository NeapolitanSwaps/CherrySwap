import React, { useState, useRef } from "react";
import Toggle from "../../components/elements/Toggle";
import Deposit from "../../components/Deposit";
import MarketOverview, { Props as MarketOverviewProps } from "../../components/MarketOverview";
import PositionOverview, { Props as PositionOverviewProps } from "../../components/PositionOverview";

import * as S from "./styles";

const Index = () => {

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

      <MarketOverview {...marketOverview} />
      <Deposit
        onTextInput={input => {
          userInput.current = input;
        }}
        balance={10023}
      />
      <PositionOverview {...positionOverview} />
    </S.Main>
  )
};

export default Index;
