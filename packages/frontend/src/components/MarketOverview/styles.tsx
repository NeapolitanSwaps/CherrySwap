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
  border-bottom: ${props => `1px solid ${props.theme.greyAlpha}`};
`;

export const MarketHeaderTitle = styled.span`
  color: #623c46;
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
  color: ${({ short, theme }) => (short ? theme.togglePrimary : theme.green)};
`;

export const ProgressBar = styled.div`
  border-radius: 25px;
  position: relative;
  background-color: ${props => props.theme.backgroundPink};
  display: flex;
  height: 24px;
  align-items: center;
  justify-content: space-between;

  & span {
    margin: 0 8px;
  }
`;

export const ProgressBarPercentage = styled.span`
  color: ${props => props.theme.darkCherry};
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
        !isLeft ? "linear-gradient(to right, #B735B4, #00E93C)" : "linear-gradient(to right, #DB1935, #B735B4)"
      };
      width: ${newPercentage}%;
      margin-left: ${isLeft ? `${50 - newPercentage}%` : "50%"};
      border-radius: ${isLeft ? "25px 0 0 25px" : "0 25px 25px 0"};
      z-index: ${isLeft ? 2 : 1};
    `;
  }}
`;
