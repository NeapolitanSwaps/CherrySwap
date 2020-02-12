import styled from "styled-components";

export const Main = styled.div`
  background-color: ${props => props.theme.backgroundPink};
  display: flex;
  flex-direction: column;
  max-width: 45rem;
  width: 100%;
  /* height: 70vh; */
  margin: 2vh auto;
  align-items: center;
  padding: 10px;
  border-radius: 25px;
  box-sizing: border-box;
`;
