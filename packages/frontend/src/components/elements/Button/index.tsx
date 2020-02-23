import React from "react";
import * as S from "./styles";

export interface Props {
  title: string;
  state?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  toggled?: boolean;
  theme?: any;
  leftMargin?: number;
}

const Button = (props: Props) => (
  <S.Button {...props}>
    <S.Title>{props.title}</S.Title>
  </S.Button>
);

export default Button;
