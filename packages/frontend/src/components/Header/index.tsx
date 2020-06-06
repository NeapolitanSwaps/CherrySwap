import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import logo from "../../assets/svg/logo.svg";
import { injected } from "../../connectors";
import { shortenAddress } from "../../utils";
import * as S from "./styles";

const Header = () => {
  const { activate, account, library } = useWeb3React();
  const [ethBalance, setEthBalance] = useState<string | undefined>();

  const handleAccountPress = () => activate(injected);

  useEffect(() => {
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
  }, [account]);

  return (
    <S.Header>
      <S.Navigation>
        <S.CherryLink to="/">
          <S.Logo src={logo} alt={"logo"} />
        </S.CherryLink>
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <div>
            <S.PositionLink to="/position">
              Positions
          </S.PositionLink>
          </div>
          <S.Account active={!!ethBalance}>
            <p>
              {ethBalance && (
                `${ethers.utils.formatEther(ethBalance)} ETH`
              )}
            </p>
            <button onClick={handleAccountPress}>
              {account ? `${shortenAddress(account)}` : `Connect`}
            </button>
          </S.Account>
        </div>
      </S.Navigation>
    </S.Header>
  );
};

export default Header;
