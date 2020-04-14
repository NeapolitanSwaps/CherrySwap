import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 2rem 1rem;
  max-width: 768px;
  width: 100%;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled.img`
  color: #eee;
  height: 3rem;
`;

export const Button = styled.button`
  align-self: center;
  border-radius: 1rem;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  color: #efb9b9;
  border: 1px solid #efb9b9;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #efb9b9;
    color: #fff;
  }
`;
