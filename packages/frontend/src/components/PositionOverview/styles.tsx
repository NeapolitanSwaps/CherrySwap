import styled from "styled-components";

export const PositionOverview = styled.div`
  background-color: #fff;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  border: 1px solid ${props => props.theme.backgroundAccent};
`;

export const ItemTitle = styled.span``;

export const ItemBody = styled.span`
  color: #333;
  font-size: 1.5rem;
`;

export const Item = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? `${width}%` : `auto`)};
  min-width: 80px;

  & ${ItemTitle} {
    margin-bottom: 8px;
  }
`;
