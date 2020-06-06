import { darken, lighten } from 'polished';
import { Link } from 'react-router-dom';
import styled from "styled-components";


export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 2rem 1rem;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img`
  color: #eee;
  height: 3rem;
`;

export const Account = styled.div<{ active: boolean }>`
  margin: 0 0 0 0.5rem;
  border-radius: 0.625rem;
  background: ${({ theme }) => lighten(0.02, theme.grey_00)};
  display: flex;
  align-items: center;
  
  p {
    margin: 0;
    font-size: 0.875rem;
    padding: ${({ active }) => active && `0 0.625rem`};
    font-weight: bold;
    color: ${({ theme }) => theme.grey_10};
    padding: ${({ active }) => active && `0.625rem 0.875rem`};
  }
  
  button {
    box-shadow: ${({ active, theme }) => active && `inset 0px 0px 0px 2px ${theme.grey_00}`};
    background: ${({ active, theme }) => active && `${theme.white}`};
    align-self: center;
    border-radius: 0.625rem;
    font-size: 0.875rem;
    padding: 0.625rem 0.875rem;
    color: ${({ theme }) => `${theme.red_00}`};
    font-weight: bold;
    background: ${({ theme, active }) => active ? theme.white : theme.backgroundPink};

    :hover, :active, :visited {
      cursor: ${({ active }) => active ? `cursor` : `pointer`};
      background-color: ${({ theme, active }) => active ? 'none' : darken(0.1, theme.backgroundPink)};
    }
  }
`;


export const CherryLink = styled(Link)`
  transition: all .2s ease-in-out;

  :hover {
    transform: scale(1.02);
    opacity: 0.7;
  }
`;

export const PositionLink = styled(Link)`
  text-decoration: none;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  font-weight: bold;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.grey_10};
  background: ${({ theme }) => lighten(0.02, theme.grey_00)};
  
  :hover {
    background: ${({ theme }) => darken(0.05, theme.grey_00)};
  }
  
  :visited, :active {
    color: ${({ theme }) => theme.grey_10};
  }
`;