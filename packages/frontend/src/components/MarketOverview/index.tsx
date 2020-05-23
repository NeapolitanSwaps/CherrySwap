import React, { useRef } from "react";
import { useResize } from "../../hooks";
import { formatCurrency, formatInterestRate } from "../../utils";
import * as S from "./styles";

export interface Props {
  marketStats: MarketHeaderProps;
  providerStats: MarketBodyProps;
}

interface MarketHeaderProps {
  liquidity: number;
  interestRate: number;
}

interface MarketBodyProps {
  shortPoolBalance: number;
  longPoolBalance: number;
}

const MarketOverview = (props: Props) => (
  <S.MarketOverview>
    <MarketHeader {...props.marketStats} />
    <MarketBody {...props.providerStats} />
  </S.MarketOverview>
);

const MarketHeader = (props: MarketHeaderProps) => {
  const { liquidity, interestRate } = props;
  return (
    <S.MarketHeader>
      <S.MarketHeaderTitle>Market Overview</S.MarketHeaderTitle>
      <S.MarketHeaderTitle>Liquidity: {formatCurrency(liquidity, "DAI")}</S.MarketHeaderTitle>
      <S.MarketHeaderTitle>
        Current IR (Compound):
        <span> {formatInterestRate(interestRate)}</span>
      </S.MarketHeaderTitle>
    </S.MarketHeader>
  );
};

const MarketBody = (props: MarketBodyProps) => {
  const { shortPoolBalance, longPoolBalance } = props;
  const poolBalance = shortPoolBalance + longPoolBalance;
  const shortPercentage = 100 * (shortPoolBalance / poolBalance);
  const longPercentage = 100 * (longPoolBalance / poolBalance);

  const ref: any = useRef<any>(null);
  const { width } = useResize(ref);

  return (
    <div ref={ref}>
      <S.MarketBody>
        <span>Short</span>
        <span>Long</span>
      </S.MarketBody>
      <ProgressBar shortPercentage={shortPercentage} longPercentage={longPercentage} width={width} />
      <S.MarketBody>
        <S.MarketBodyBalanceTitle short>{formatCurrency(shortPoolBalance, "DAI")}</S.MarketBodyBalanceTitle>
        <S.MarketBodyBalanceTitle>{formatCurrency(longPoolBalance, "DAI")}</S.MarketBodyBalanceTitle>
      </S.MarketBody>
    </div>
  );
};

const ProgressBar = ({
  shortPercentage,
  longPercentage,
  width
}: {
  shortPercentage: number;
  longPercentage: number;
  width: number;
}) => (
    <S.ProgressBar>
      <S.ProgressBarPercentage>{shortPercentage.toFixed(0)}%</S.ProgressBarPercentage>
      <S.ProgressBarPercentage>{longPercentage.toFixed(0)}%</S.ProgressBarPercentage>
      <S.Bar width={width}>
        <S.ColoredBar percentage={shortPercentage} position={"left"} />
      </S.Bar>
      <S.Bar width={width}>
        <S.ColoredBar percentage={longPercentage} position={"right"} />
      </S.Bar>
    </S.ProgressBar>
  );

export default MarketOverview;
