import styled from "styled-components";

export const OpenPosition = styled.div`
  background-color: ${props => props.theme.backgroundPink};
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-radius: 25px;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 18px;
  padding: 1rem;
  margin: 8px 0 0 0;
  box-sizing: border-box;
`;

export const Header = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 1rem;
`;

export const HeaderTitle = styled.span`
  background: #bbb;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border-radius: 1rem;
  color: #fff;
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ItemWrapper = styled.div<{ right?: boolean; top?: boolean }>`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-left: ${({ right, theme }) => right && `1px solid ${theme.greyAlpha}}`};
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
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ItemTitle = styled.span`
  font-size: 1em;
`;

export const ItemValue = styled.span`
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 6px;
`;

export const Footer = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-end;
  border-top: ${({ theme }) => `1px solid ${theme.greyAlpha}}`};
  margin: 1rem 0 0 0;
  padding: 1rem 0 0 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
