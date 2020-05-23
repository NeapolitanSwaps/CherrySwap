import React from "react";
import logo from "../../assets/svg/logo.svg";
import * as S from "./styles";

const Header = () => {
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
          <S.Button onClick={() => alert("hi")}>Connect</S.Button>
        </div>
      </S.Navigation>
      {/* Export out to Web3 component */}
    </S.Header>
  );
};

export default Header;
