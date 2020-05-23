import { darken, lighten } from 'polished';
import { Link } from "react-router-dom";
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

export const Button = styled.button`
  align-self: center;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  padding: 0.625rem 0.875rem;
  color: ${({ theme }) => `${theme.red_00}`};
  font-weight: bold;
  background: ${({ theme }) => theme.backgroundPink};

  :hover, :active, :visited {
    cursor: pointer;
    background-color: ${({ theme }) => darken(0.1, theme.backgroundPink)};
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
  margin-right: 0.75rem;
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