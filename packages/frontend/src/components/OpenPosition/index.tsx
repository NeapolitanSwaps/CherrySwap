import React from "react";
import { determineProfitLoss, formatCDAI, formatInterestRate, formatTimestampToDate } from "../../utils";
import Button from "../elements/Button";
import * as S from "./styles";

export interface Props {
  header: HeaderProps;
  body: BodyProps;
}

export interface HeaderProps {
  position: string;
  transactionId: string;
}

export interface BodyProps {
  position: string;
  positionYield: number;
  lockedBalance: number;
  interestRateFixed: number;
  interestRateCurrent: number;
  startDate: number;
  endDate: number;
}

const OpenPosition = (props: Props) => {
  const { header, body } = props;
  return (
    <S.OpenPosition>
      <Header {...header} />
      <S.Wrapper>
        <Body {...body} />
        <Footer />
      </S.Wrapper>
    </S.OpenPosition>
  );
};

const Header = ({ position }: { position: string }) => (
  <S.Header>
    <S.HeaderTitle>
      <b>{`${position} Position`}</b>
    </S.HeaderTitle>
    View Transaction
  </S.Header>
);

const Body = (props: BodyProps) => {
  const { position, positionYield, lockedBalance } = props;
  const { interestRateFixed, interestRateCurrent } = props;
  const { startDate, endDate } = props;
  const formattedYield = formatCDAI(positionYield);
  const formattedRateFixed = formatInterestRate(interestRateFixed);
  const formattedRateCurrent = formatInterestRate(interestRateCurrent);
  const formattedLockedBalance = formatCDAI(lockedBalance);
  const isPositionInProfit = determineProfitLoss(lockedBalance, 0);
  const yieldSymbol = isPositionInProfit ? "+" : "-";
  const formattedStartDate = formatTimestampToDate(startDate);
  const formattedEndDate = formatTimestampToDate(endDate);
  // flip colors based on `isPositionInProfit`
  return (
    <S.Body>
      <S.ItemContainer>
        <S.ItemWrapper top>
          <Item title={"Locked"} value={formattedLockedBalance} />
          <Item title={"Position"} value={position} />
        </S.ItemWrapper>
        <S.ItemWrapper>
          <Item title={"Start Date"} value={formattedStartDate} />
          <Item title={"End Date"} value={formattedEndDate} />
        </S.ItemWrapper>
      </S.ItemContainer>
      <S.ItemContainer>
        <S.ItemWrapper top right>
          <Item title={"Fixed interest rate"} value={formattedRateFixed} />
          <Item title={"Current interest rate"} value={formattedRateCurrent} />
        </S.ItemWrapper>
        <S.ItemWrapper right>
          <Item title={"Current returns"} value={`${yieldSymbol} ${formattedYield}`} />
        </S.ItemWrapper>
      </S.ItemContainer>
    </S.Body>
  );
};

const Footer = () => (
  <S.Footer>
    <S.ButtonWrapper>
      <Button title={"Withdraw"} />
    </S.ButtonWrapper>
  </S.Footer>
);

const Item = ({ title, value }: { title: string; value: string }) => (
  <S.Item>
    <S.ItemTitle>{title}</S.ItemTitle>
    <S.ItemValue>{value}</S.ItemValue>
  </S.Item>
);

export default OpenPosition;
