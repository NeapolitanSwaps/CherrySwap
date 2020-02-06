import styled from "styled-components";

export const Toggle = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.toggleSecondary};
  border-radius: 25px;
  width: 50%;
  min-width: 300px;
  justify-content: center;
`;
