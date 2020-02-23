import styled from "styled-components";

export const Deposit = styled.div`
  background-color: ${props => props.theme.white};
  margin-top: 16px;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.backgroundAccent};
`;

export const DepositHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0;
`;

export const DepositHeaderTitle = styled.span``;

export const DepositBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: baseline;
  justify-content: space-between;
`;

export const DepositBodyInput = styled.input<{ error?: boolean }>`
  width: 75%;
  height: 50px;
  margin: 0 0 16px;
  border-bottom: ${props => `1px solid ${props.theme.greyAlpha}`};
  font-size: 1.5rem;
  color: ${({ error, theme }) => error && theme.primaryPink};
  -moz-appearance: textfield;
`;
