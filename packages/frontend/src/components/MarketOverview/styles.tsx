import styled, { keyframes } from "styled-components";

export const MarketOverview = styled.div`
  background-color: ${props => props.theme.white};
  margin-top: 1rem;
  border-radius: 18px;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
  /* border: 1px solid #efb9b977; */
`;

export const MarketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const MarketHeaderTitle = styled.span < { bold?: boolean }> `
  color: ${({ theme }) => theme.textMedium};
  font-weight: ${({ bold }) => bold ? 'bold' : 'normal'};
  
  & span {
    font-weight: bold;
  }
`;

export const MarketBody = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
`;

export const MarketBodyBalanceTitle = styled.span<{ short?: boolean }>`
  color: ${({ short, theme }) => (short ? theme.red_00 : theme.green)};
`;

export const ProgressBar = styled.div`
  border-radius: 25px;
  position: relative;
  background-color: ${props => props.theme.backgroundPink};
  display: flex;
  height: 24px;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem;

  & span {
    margin: 0 8px;
    /* font-size: 0.75rem; */
  }
`;

export const ProgressBarPercentage = styled.span`
  color: ${props => props.theme.red_10};
  z-index: 2;
`;

export const Bar = styled.div<{ width?: number }>`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: 24px;
  display: flex;
  flex-direction: row;
  animation: ${keyframes`
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  `} 1.25s linear;
`;

export const ColoredBar = styled.div<{
  percentage: number;
  position: "left" | "right";
}>`
  ${({ position, percentage, theme }) => {
    const isLeft = position === "left";
    const newPercentage = percentage / 2;
    // DB1935, #B735B4, #7F16DB
    // 00E93C, #00E9CC, #009471)
    return `
      background: ${
      isLeft ? theme.leftGradient : theme.rightGradient
      };
      width: ${newPercentage}%;
      margin-left: ${isLeft ? `${50 - newPercentage}%` : "50%"};
      border-radius: ${isLeft ? "25px 0 0 25px" : "0 25px 25px 0"};
      z-index: ${isLeft ? 2 : 1};
    `;
  }}
`;
