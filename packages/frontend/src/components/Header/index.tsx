import { useWeb3React } from "@web3-react/core";
import React from "react";
import logo from "../../assets/svg/logo.svg";
import { injected } from "../../connectors";
import { shortenAddress } from "../../utils";
import * as S from "./styles";

const Header = () => {
  const { activate, account } = useWeb3React();

  const handleAccountPress = () => {
    activate(injected)
  }

  return (
    <S.Header>
      <S.Navigation>
        <S.CherryLink to="/">
          <S.Logo src={logo} alt={"logo"} />
        </S.CherryLink>
        <div>
          <S.PositionLink to="/position">
            Positions
          </S.PositionLink>
          <S.Button onClick={handleAccountPress}>
            {account ? `${shortenAddress(account, 6)}` : `Connect`}
          </S.Button>
        </div>
      </S.Navigation>
    </S.Header>
  );
};

export default Header;
