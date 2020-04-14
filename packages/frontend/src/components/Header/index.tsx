import React from "react";
import styled from "styled-components";
import logo from "../../assets/svg/logo.svg";

import * as S from "./styles";

const Header = () => {
  return (
    <S.Header>
      <S.Navigation>
        <S.Logo src={logo} alt={"logo"} />
        <S.Button onClick={() => alert("hi")}>Connect</S.Button>
      </S.Navigation>
      {/* Export out to Web3 component */}
    </S.Header>
  );
};

export default Header;
