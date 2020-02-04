import styled from "styled-components";

export const Deposit = styled.div`
  background-color: ${props => props.theme.white};
  margin-top: 50px;
  border-radius: 10px;
  padding: 0 16px;
`;

export const DepositHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: ${props => `1px solid ${props.theme.greyAlpha}`};
`;

export const DepositHeaderTitle = styled.span``;

export const DepositBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: baseline;
  justify-content: space-between;
`;

export const DepositBodyInput = styled.input`
  width: 75%;
  height: 50px;
  margin: 16px 0;
  border-bottom: 1px solid #000;
`;
