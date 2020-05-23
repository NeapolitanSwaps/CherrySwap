import React from "react";
import { formatInterestRate, formatTimestamp } from "../../utils";
import * as S from "./styles";

export interface Props {
  interestRate: number;
  position: string;
  lockPeriod: number;
}

const PositionOverview = (props: Props) => {
  const { interestRate, position, lockPeriod } = props;
  const formattedInterestRate = formatInterestRate(interestRate);
  const formattedLockPeriod = formatTimestamp(lockPeriod);
  return (
    <S.PositionOverview>
      <Item heading="Position" body={position} />
      <Item heading="Lock period" body={formattedLockPeriod} width={50} />
      <Item heading="Fixed interest rate" body={`~ ${formattedInterestRate} APR`} />
    </S.PositionOverview>
  );
};

const Item = ({ heading, body, width }: { heading?: string; body?: string; width?: number }) => (
  <S.Item width={width}>
    <S.ItemTitle>{heading}</S.ItemTitle>
    <S.ItemBody>{body}</S.ItemBody>
  </S.Item>
);

export default PositionOverview;
