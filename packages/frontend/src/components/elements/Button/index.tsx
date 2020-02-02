import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  state?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  toggled?: boolean;
  leftMargin?: number;
}

const Button = (props: Props) => (
  <button className={props.className} onClick={props.onClick}>
    <span>{props.title}</span>
  </button>
);

const StyledButton = styled(Button)`
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

  ${({ toggled, theme, leftMargin, state }: any) => {
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

export default StyledButton;
