import styled from "styled-components";

export const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background: white;
  height: 50vh;
  width: 33vw; 
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 3rem;
  background: #eee;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  align-items: center;
  display: flex;
  justify-content: space-between;
  
  p {
    font-weight: bold;
  }
  
  button {
    cursor: pointer;
  }
`;

export const Body = styled.div`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  display: flex;
  flex: 1;
`;

export const CloseIcon = styled.div`
  height: 1.75rem;
  width: 1.75rem;
  
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  
  img {
    width: 100%;
    height: 100%;
  }
`