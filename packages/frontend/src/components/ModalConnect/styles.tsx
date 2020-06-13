import styled from "styled-components";

export const ModalConnect = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const Button = styled.button`
  background: #eee;
  margin-bottom: 1rem;
  width: 100%;
  padding: 1rem;
  height: auto;
  margin: 0.5rem;
  border-radius: 1rem;
  
  img {
    height: 2rem;
    width: 2rem;
  }
  
  p {
    margin: 0.5rem 0 0;
  }
  
  &:hover {
    background: #ddd;
  }
`;