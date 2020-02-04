import styled from "styled-components";
import { Props as ButtonProps } from "./index";

export const Button = styled.button`
  background-color: ${props => props.theme.togglePrimary};
  color: #fff;
  width: 300px;
  height: 40px;
  border-radius: 25px;
  text-align: center;
  justify-content: center;
  display: flex;

  & span {
    align-self: center;
    display: flex;
  }

  &:active {
    /* change opacity to color */
    opacity: 0.9;
  }

  ${({ toggled, theme, leftMargin, state }: ButtonProps) => {
    if (state) {
      return `
      background-color: ${
        state === "primary" ? theme.togglePrimary : theme.toggleSecondary
      };
      color: ${state === "primary" ? theme.white : theme.togglePrimary}
    `;
    }
    const leftStyle = leftMargin && `margin-left: ${leftMargin}px`;
    const zStyle = `z-index: ${toggled ? 2 : 1}`;
    return toggled
      ? `
        ${leftStyle};
        ${zStyle};
      `
      : `
        background-color: ${theme.toggleSecondary};
        ${leftStyle};
        ${zStyle};
      `;
  }}}
`;

export const Title = styled.span``;
