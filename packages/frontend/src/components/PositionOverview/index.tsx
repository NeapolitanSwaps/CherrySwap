import React from "react";
import * as S from "./styles";
import { formatInterestRate, formatTimestamp } from "../../utils";

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
      <Item heading="Fixed interest rate (estimated)" body={`${formattedInterestRate} APR`} width={65} />
      <Item heading="Position" body={position} />
      <Item heading="Lock period" body={formattedLockPeriod} />
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
