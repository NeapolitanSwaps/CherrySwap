import styled from "styled-components";

export const Main = styled.div`
  background-color: ${props => props.theme.backgroundPink};
  /* border: 2px solid ${props => props.theme.backgroundPink}; */
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-radius: 25px;
  box-sizing: border-box;
  max-width: 768px;
  width: 100%;
`;
