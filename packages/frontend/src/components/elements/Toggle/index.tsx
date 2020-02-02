import React from "react";
import styled from "styled-components";
import StyledButton from "../Button";

interface Props {
  currentIndex: number;
  titles: string[];
  onClick: (index: number) => void;
}

const Toggle = (props: Props) => {
  const { currentIndex, titles, onClick } = props;
  return (
    <Wrapper>
      <StyledButton
        title={titles[0]}
        onClick={() => onClick(0)}
        toggled={0 === currentIndex}
      />
      <StyledButton
        title={titles[1]}
        onClick={() => onClick(1)}
        toggled={1 === currentIndex}
        leftMargin={-40}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Toggle;
