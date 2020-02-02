import React from "react";
import styled from "styled-components";

interface Props {
  currentIndex: number;
  titles: string[];
  onClick: (index: number) => void;
}

const Toggle = (props: Props) => {
  const { currentIndex, titles, onClick } = props;
  return (
    <>
      <StyledButton
        title={titles[0]}
        onClick={() => onClick(0)}
        toggled={0 === currentIndex}
      />
      <StyledButton
        title={titles[1]}
        onClick={() => onClick(1)}
        toggled={1 === currentIndex}
        leftMargin={-40}
      />
    </>
  );
};

const Button = ({
  toggled,
  title,
  onClick,
  className,
  leftMargin
}: {
  title: string;
  onClick: () => void;
  toggled?: boolean;
  className?: any;
  leftMargin?: number;
}) => (
  <div className={className} onClick={onClick}>
    <span>{title}</span>
  </div>
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

  ${({ toggled, theme, leftMargin }: any) => {
    const leftStyle = leftMargin && `margin-left: ${leftMargin}px`;
    const zStyle = `z-index: ${toggled ? 2 : 1}`;
    if (toggled) {
      return `
      ${leftStyle};
      ${zStyle};
      `;
    } else {
      return `
        background-color: ${theme.toggleSecondary};
        ${leftStyle};
        ${zStyle};
      `;
    }
  }}
`;

export default Toggle;
