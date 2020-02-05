import styled from "styled-components";

export const Main = styled.div`
  background-color: ${props => props.theme.primaryPink};
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 75vw;
  height: 70vh;
  margin: 5vh auto;
  align-items: center;
`;
