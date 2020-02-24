import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import Button from "../elements/Button";

interface Props {}

const OpenPosition = (props: Props) => (
  <S.OpenPosition>
    <Header />
    <Body />
    <Footer />
  </S.OpenPosition>
);

const Header = () => (
  <S.Header>
    <S.HeaderTitle>
      <b>Short Position</b>
    </S.HeaderTitle>
    <S.HeaderTitle>Hello</S.HeaderTitle>
  </S.Header>
);

const Body = () => (
  <S.Body>
    <S.ItemContainer>
      <S.ItemWrapper top>
        <Item title={"Locked"} value={"400.00"} />
        <Item title={"Position"} value={"Short"} />
      </S.ItemWrapper>
      <S.ItemWrapper>
        <Item title={"Start Date"} value={"01/02/03"} />
        <Item title={"End Date"} value={"02/02/04"} />
      </S.ItemWrapper>
    </S.ItemContainer>
    <S.ItemContainer>
      <S.ItemWrapper top right>
        <Item title={"Fixed interest rate"} value={"9%"} />
        <Item title={"Current interest rate"} value={"12%"} />
      </S.ItemWrapper>
      <S.ItemWrapper right>
        <Item title={"Current returns"} value={"+ 2 DAI"} />
      </S.ItemWrapper>
    </S.ItemContainer>
  </S.Body>
);

const Footer = () => (
  <S.Footer>
    <S.ButtonWrapper>
      <Button title={"Withdraw Now"} />
      <Button title={"View Stats"} />
    </S.ButtonWrapper>
  </S.Footer>
);

const Item = ({ title, value }: { title: string; value: string }) => (
  <S.Item>
    <span>{title}</span>
    <span>
      <b>{value}</b>
    </span>
  </S.Item>
);

export default OpenPosition;
