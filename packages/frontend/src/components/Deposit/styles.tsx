import styled from "styled-components";

export const Deposit = styled.div`
  background-color: ${props => props.theme.white};
  margin-top: 1rem;
  border-radius: 18px;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
`;

export const DepositHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const DepositHeaderTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const DepositBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 1rem;
`;

export const DepositBodyInput = styled.input<{ error?: boolean }>`
  width: 75%;
  height: 50px;
  border: ${props => `1px solid ${props.theme.greyAlpha}`};
  font-size: 1.5rem;
  border-radius: 0.675rem;
  padding-left: 1rem;
  color: ${({ error, theme }) => error && theme.primaryPink};
  -moz-appearance: textfield;
  
`;

export const CurrencySelector = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  margin-right: 1rem;
`;