import React from "react";
import styled from "styled-components";
import { formatInterestRate, formatLiquidity } from "../../utils";

interface MarketOverviewProps {
  marketStats: MarketHeaderProps;
  providerStats?: MarketBodyProps; // rename
  className?: string;
}

const MarketOverview = (props: MarketOverviewProps) => {
  const { marketStats, providerStats, className } = props;
  return (
    <div className={className}>
      <MarketHeader {...marketStats} />
      <MarketBody />
    </div>
  );
};

// Market Header
export interface MarketHeaderProps {
  liquidity: number;
  interestRate: number;
}

const MarketHeader = (props: MarketHeaderProps) => {
  const { liquidity, interestRate } = props;
  return (
    <ItemWrapper>
      <Item>
        <span>Market Overview</span>
      </Item>
      <Item>
        <span>Liquidity</span>
        <span> {formatLiquidity(liquidity, "DAI")}</span>
      </Item>
      <Item>
        <span>Current IR (Compound)</span>
        <span> {formatInterestRate(interestRate)}</span>
      </Item>
    </ItemWrapper>
  );
};

// Market Body
interface MarketBodyProps {
  shortCount: number;
  longCount: number;
  totalLiquidity: number;
  totalPoolSize: number;
}

const MarketBody = () => {
  return (
    <div>
      <MarkerBodyWrapper>
        <Item>
          <span>Short</span>
        </Item>
        <Item>
          <span>Long</span>
        </Item>
      </MarkerBodyWrapper>
      <StyledProgressBar shortPercentage={30} longPercentage={70} />
      <MarkerBodyWrapper>
        <Item>
          <span>420,000 DAI</span>
        </Item>
        <Item>
          <span>520,000 DAI</span>
        </Item>
      </MarkerBodyWrapper>
    </div>
  );
};

// Progress Bar
interface ProgressBarProps {
  shortPercentage: number;
  longPercentage: number;
  className?: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  const { shortPercentage, longPercentage, className } = props;
  return (
    <>
      <div className={className}>
        <span>{shortPercentage}%</span>
        <span>{longPercentage}%</span>
        <BarWrapper>
          <StyledBar percentage={shortPercentage} position={"left"} />
        </BarWrapper>
        <BarWrapper>
          <StyledBar percentage={longPercentage} position={"right"} />
        </BarWrapper>
      </div>
    </>
  );
};

interface BarProps {
  percentage: number;
  position: "left" | "right";
  className?: string;
}

const Bar = (props: BarProps) => <div className={props.className ?? ""} />;

// Styled Components
const ItemWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const MarkerBodyWrapper = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const Item = styled.li`
  background: #ff00ff;
  display: inline;
`;

const StyledProgressBar = styled(ProgressBar)`
  background-color: ${props => props.theme.toggleSecondary};
  border-radius: 25px;
  display: flex;
  height: 24px;
  align-items: center;
  justify-content: space-between;

  & span {
    margin: 0 8px;
  }
`;

const BarWrapper = styled.div`
  position: absolute;
  width: 75vw;
  height: 25px;
  display: flex;
  flex-direction: row;
`;

const StyledBar = styled(Bar)`
  ${({ position, percentage }: BarProps) => {
    const isLeft = position === "left";
    const newPercentage = percentage / 2;
    return `
      background-color: ${isLeft ? "#eee000" : "#bbbeee"};
      width: ${newPercentage}%;
      margin-left: ${isLeft ? `${50 - newPercentage}%` : "50%"};
      border-radius: ${isLeft ? "25px 0 0 25px" : "0 25px 25px 0"};
      z-index: ${isLeft ? 2 : 1};
    `;
  }}
`;

export default MarketOverview;
