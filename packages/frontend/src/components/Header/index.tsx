import React from "react";
import styled from "styled-components";
import logo from "../../assets/svg/logo.svg";

import * as S from "./styles";

const Header = () => {
  return (
    <S.Header>
      <Navigation>
        {/* <Button onClick={() => alert("hi")}>Connect a wallet</Button> */}
        <Logo src={logo} alt={"logo"} />
        {/* <Button onClick={() => alert("hi")}>Connect a wallet</Button> */}
      </Navigation>
      {/* Export out to Web3 component */}
    </S.Header>
  );
};

const Navigation = styled.div`
  display: flex;
  align-self: center;
`;

const Logo = styled.img`
  color: #eee;
  /* width: 170px; */
  height: 60px;
`;

const Button = styled.button`
  align-self: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 8px;
  border: 1px solid ${props => props.theme.cherry};
  border-radius: 15px;
  color: ${props => props.theme.cherry};
  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

export default Header;
