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
  margin: 0 0 1rem;
  border-bottom: ${props => `1px solid ${props.theme.greyAlpha}`};
  font-size: 1.5rem;
  color: ${({ error, theme }) => error && theme.primaryPink};
  -moz-appearance: textfield;
`;
