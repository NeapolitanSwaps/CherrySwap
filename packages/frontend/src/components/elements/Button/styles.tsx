import styled from "styled-components";
import { Props as ButtonProps } from "./index";

export const Button = styled.button`
  background-color: ${props => props.theme.togglePrimary};
  color: #fff;
  height: 40px;
  padding: 0 24px;
  border-radius: 25px;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-grow: 1;

  & span {
    align-self: center;
    display: flex;
  }

  &:active {
    /* change opacity to color */
    opacity: 0.9;
  }

  ${({ toggled, theme, state }: ButtonProps) => {
    if (state) {
      return `
      background-color: ${
        state === "primary" ? theme.togglePrimary : theme.toggleSecondary
      };
      color: ${state === "primary" ? theme.white : theme.togglePrimary}
    `;
    }
    return !toggled && `background-color: ${theme.toggleSecondary}`;
  }}}
`;

export const Title = styled.span``;
