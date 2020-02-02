import React, { useState } from "react";
import styled from "styled-components";
import Toggle from "../elements/Toggle";
import Button from "../elements/Button";
import MarketOverview, { MarketHeaderProps } from "../MarketOverview";

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
      <Market marketStats={marketStats} />
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

const Market = styled(MarketOverview)`
  background-color: ${props => props.theme.white};
  height: 100px;
  margin-top: 50px;
`;

export default Main;
