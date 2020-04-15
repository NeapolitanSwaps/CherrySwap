import React from "react";
import logo from "../../assets/svg/logo.svg";

import * as S from "./styles";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <S.Header>
      <S.Navigation>
        <Link to="/">
          <S.Logo src={logo} alt={"logo"} />
        </Link>
        <div>
          <Link to="/position" style={{ marginRight: 24, textDecoration: "none", color: "#000" }}>
            Positions
          </Link>
          <S.Button onClick={() => alert("hi")}>Connect</S.Button>
        </div>
      </S.Navigation>
      {/* Export out to Web3 component */}
    </S.Header>
  );
};

export default Header;
