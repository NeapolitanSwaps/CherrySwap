import styled from "styled-components";

export const OpenPosition = styled.div`
  background-color: ${props => props.theme.white};
  margin-top: 16px;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.backgroundAccent};
`;

export const Header = styled.div`
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid #000;
  background-color: #eee000;
  align-items: center;
  height: 50px;
`;

export const HeaderTitle = styled.span``;

export const Body = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 0;
`;

export const ItemWrapper = styled.div<{ right?: boolean; top?: boolean }>`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-left: ${({ right }) => right && `1px solid #000}`};
  padding: ${({ right, top }) => (right ? `0 0 ${top ? `1rem` : `0`} 1rem` : `0 1rem ${top ? `1rem` : `0`} 0`)};
  width: 100%;
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  flex: 1;
`;

export const Item = styled.div`
  background-color: #eeebbb;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Footer = styled.div`
  height: 50px;
  display: flex;
  background-color: #eeeaaa;
  justify-content: flex-end;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #eee444;
`;
