import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useRef, useState } from "react";
import { fetchCDAIInterestRate } from "../../api";
import Deposit from "../../components/Deposit";
import Toggle from "../../components/elements/Toggle";
import MarketOverview, { Props as MarketOverviewProps } from "../../components/MarketOverview";
import PositionOverview, { Props as PositionOverviewProps } from "../../components/PositionOverview";
import * as S from "./styles";

const Swap = () => {
  const { account, library } = useWeb3React();
  const [ethBalance, setEthBalance] = useState<string | undefined>();
  const [interestRate, setInterestRate] = useState<number | undefined>();

  const [positionSelectionIndex, setPositionSelectionIndex] = useState<number>(0);
  const userInput = useRef<string>("");
  const positionTitles = ["Short", "Long"];

  useEffect(() => {
    const getInterestRate = async () => {
      const rate = await fetchCDAIInterestRate();
      setInterestRate(rate)
    }
    const getBalance = async () => {
      if (library && account) {
        try {
          const balance = await library.getBalance(account);
          setEthBalance(balance)
        } catch (error) {
          console.log("Error with account balance")
          setEthBalance(undefined);
        }
      }
    }
    getBalance();
    getInterestRate();
  }, [library, account]);

  const toggleState = (index: number) => {
    if (positionSelectionIndex === index) return;
    setPositionSelectionIndex(index);
  };

  const marketOverview: MarketOverviewProps = {
    providerStats: {
      longPoolBalance: 3200,
      shortPoolBalance: 1800
    },
    marketStats: {
      liquidity: 77332222,
      interestRate: interestRate ?? 0
    }
  };

  const positionOverview: PositionOverviewProps = {
    interestRate: 3220,
    position: positionSelectionIndex ? "Long" : "Short",
    lockPeriod: 1586476800
  };

  return (
    <S.Main>
      {ethBalance && <p>{`balance: ${ethBalance}`}</p>}
      <Toggle onClick={toggleState} currentIndex={positionSelectionIndex} titles={positionTitles} />
      <MarketOverview {...marketOverview} />
      <Deposit
        onTextInput={input => {
          console.log("INPUT", input);
          userInput.current = input;
        }}
        balance={10023}
      />
      <PositionOverview {...positionOverview} />
    </S.Main>
  )
};

export default Swap;
