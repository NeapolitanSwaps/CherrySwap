import React, { useState } from "react";
import styled from "styled-components";
import Toggle from "../elements/Toggle";

const Main = () => {
  const [positionSelectionIndex, setPositionSelectionIndex] = useState<number>(
    0
  );

  const positionTitles = ["Option A", "Option B"];

  const toggleState = (index: number) => {
    if (positionSelectionIndex === index) return;
    setPositionSelectionIndex(index);
  };

  return (
    <Root>
      <Toggle
        onClick={toggleState}
        currentIndex={positionSelectionIndex}
        titles={positionTitles}
      ></Toggle>
    </Root>
  );
};

const Root = styled.div`
  background-color: ${props => props.theme.primaryPink};
  display: flex;
  padding: 30px;
  width: 75vw;
  height: 70vh;
  margin: 5vh auto;
`;

export default Main;
