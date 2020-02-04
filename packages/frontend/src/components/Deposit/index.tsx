import React from "react";
import * as S from "./styles";
import { formatCurrency } from "../../utils";

interface DepositProps {
  onTextInput: (input: string) => void;
  balance: number;
}

const Deposit = (props: DepositProps) => {
  const { onTextInput, balance } = props;
  return (
    <S.Deposit>
      <DepositHeader balance={balance} />
      <DepositBody onTextInput={onTextInput} />
    </S.Deposit>
  );
};

const DepositHeader = (props: any) => {
  const { balance } = props;
  const formattedBalance = formatCurrency(balance ?? 0, "");
  return (
    <S.DepositHeader>
      <S.DepositHeaderTitle>To lock</S.DepositHeaderTitle>
      <S.DepositHeaderTitle>{`Balance: ${formattedBalance}`}</S.DepositHeaderTitle>
    </S.DepositHeader>
  );
};

const DepositBody = (props: any) => {
  const { onTextInput } = props;
  return (
    <S.DepositBody>
      <S.DepositBodyInput onChange={event => onTextInput(event.target.value)} />
      <CurrencySelector />
    </S.DepositBody>
  );
};

const CurrencySelector = (props: any) => {
  return (
    <div>
      <img src="" alt="image" />
      <span>cDAI</span>
    </div>
  );
};

export default Deposit;
