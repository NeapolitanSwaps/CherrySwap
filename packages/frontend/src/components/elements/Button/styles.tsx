import styled from "styled-components";
import { Props as ButtonProps } from "./index";

export const Button = styled.button`
  /* background: ${props => props.theme.pink_20}; */
  color: #fff;
  height: 40px;
  padding: 0 24px;
  border-radius: 25px;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-grow: 1;
  font-weight: bold;

  & span {
    align-self: center;
    display: flex;
  }

  & active {
    /* change opacity to color */
    opacity: 0.9;
  }
  
  :hover {
  cursor: pointer;
}

${
  ({ toggled, theme, state }: ButtonProps) => {
    return `
      background: ${toggled ? `linear-gradient(${theme.orange_00}, ${theme.pink_20})` : 'transparent'}; 
      color: ${!toggled && theme.grey_10};
    `;
  }
  }}
`;

export const Title = styled.span``;
