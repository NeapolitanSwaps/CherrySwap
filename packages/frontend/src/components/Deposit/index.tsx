import React from "react";
import * as S from "./styles";
import { formatCurrency } from "../../utils";

interface DepositProps {
  onTextInput: (input: string) => void;
  errorMessage?: string;
  balance: number;
}

const Deposit = (props: DepositProps) => {
  const { onTextInput, balance, errorMessage } = props;
  return (
    <S.Deposit>
      <DepositHeader balance={balance} />
      <DepositBody onTextInput={onTextInput} errorMessage={errorMessage} />
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
  const { onTextInput, errorMessage } = props;
  return (
    <S.DepositBody>
      <S.DepositBodyInput
        type="number"
        min="0"
        placeholder="0.0"
        onChange={e => onTextInput(e.target.value)}
        error={!!errorMessage}
        onKeyPress={e => {
          const charCode = e.which ? e.which : e.keyCode;
          if (charCode === 45) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      />
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
