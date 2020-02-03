import React, { useState } from "react";
import styled from "styled-components";
import Toggle from "../elements/Toggle";
import Button from "../elements/Button";
import MarketOverview, {
  MarketHeaderProps,
  MarketBodyProps
} from "../MarketOverview";

const Main = () => {
  const [positionSelectionIndex, setPositionSelectionIndex] = useState<number>(
    0
  );

  const positionTitles = ["Option A", "Option B"];

  const toggleState = (index: number) => {
    if (positionSelectionIndex === index) return;
    setPositionSelectionIndex(index);
  };

  const marketStats: MarketHeaderProps = {
    liquidity: 77332222,
    interestRate: 23
  };

  const providerStats: MarketBodyProps = {
    longPoolBalance: 2300,
    shortPoolBalance: 3200
  };

  return (
    <Root>
      <Toggle
        onClick={toggleState}
        currentIndex={positionSelectionIndex}
        titles={positionTitles}
      />
      <br />
      <Button state={"primary"} title={"Pending"} />
      <Button state={"secondary"} title={"Pending"} />
      <MarketOverview marketStats={marketStats} providerStats={providerStats} />
    </Root>
  );
};

const Root = styled.div`
  background-color: ${props => props.theme.primaryPink};
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 75vw;
  height: 70vh;
  margin: 5vh auto;
`;

export default Main;
