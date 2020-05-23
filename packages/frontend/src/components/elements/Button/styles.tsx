import styled from "styled-components";
import { Props as ButtonProps } from "./index";

export const Button = styled.button`
  background: ${props => props.theme.pink_20};
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

  &:active {
    /* change opacity to color */
    opacity: 0.9;
  }
  
  :hover {
    cursor: pointer;
  }

  ${({ toggled, theme, state }: ButtonProps) => {
    if (state) {
      return `
      background: ${state === "primary" ? theme.red_00 : theme.pink_00};
      color: ${state === "primary" ? theme.white : theme.red_00}
    `;
    }
    return !toggled && `background: ${theme.pink_00}`;
  }}}
`;

export const Title = styled.span``;
