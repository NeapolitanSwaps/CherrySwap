import React from "react";
import Button from "../Button";
import * as S from "./styles";

interface Props {
  currentIndex: number;
  titles: string[];
  onClick: (index: number) => void;
}

const Toggle = (props: Props) => {
  const { currentIndex, titles, onClick } = props;
  return (
    <S.Toggle>
      <Button
        title={titles[0]}
        onClick={() => onClick(0)}
        toggled={0 === currentIndex}
      />
      <Button
        title={titles[1]}
        onClick={() => onClick(1)}
        toggled={1 === currentIndex}
      />
    </S.Toggle>
  );
};

export default Toggle;
