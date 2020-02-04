import React from "react";
import { formatInterestRate, formatCurrency } from "../../utils";
import * as S from "./styles";

interface MarketOverviewProps {
  marketStats: MarketHeaderProps;
  providerStats: MarketBodyProps;
}

export interface MarketHeaderProps {
  liquidity: number;
  interestRate: number;
}

export interface MarketBodyProps {
  shortPoolBalance: number;
  longPoolBalance: number;
}

const MarketOverview = (props: MarketOverviewProps) => (
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
      <S.MarketHeaderTitle>
        Liquidity: {formatCurrency(liquidity, "DAI")}
      </S.MarketHeaderTitle>
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
  return (
    <>
      <S.MarketBody>
        <span>Short</span>
        <span>Long</span>
      </S.MarketBody>
      <ProgressBar
        shortPercentage={shortPercentage}
        longPercentage={longPercentage}
      />
      <S.MarketBody>
        <S.MarketBodyBalanceTitle short>
          {formatCurrency(shortPoolBalance, "DAI")}
        </S.MarketBodyBalanceTitle>
        <S.MarketBodyBalanceTitle>
          {formatCurrency(longPoolBalance, "DAI")}
        </S.MarketBodyBalanceTitle>
      </S.MarketBody>
    </>
  );
};

const ProgressBar = ({
  shortPercentage,
  longPercentage
}: {
  shortPercentage: number;
  longPercentage: number;
}) => (
  <S.ProgressBar>
    <S.ProgressBarPercentage>
      {shortPercentage.toFixed(0)}%
    </S.ProgressBarPercentage>
    <S.ProgressBarPercentage>
      {longPercentage.toFixed(0)}%
    </S.ProgressBarPercentage>
    <S.Bar>
      <S.ColoredBar percentage={shortPercentage} position={"left"} />
    </S.Bar>
    <S.Bar>
      <S.ColoredBar percentage={longPercentage} position={"right"} />
    </S.Bar>
  </S.ProgressBar>
);

export default MarketOverview;
