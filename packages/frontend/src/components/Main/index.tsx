import React from "react";
import styled from "styled-components";

const Main = () => {
  return <Root></Root>;
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
