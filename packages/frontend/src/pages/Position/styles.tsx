import styled from "styled-components";

export const Position = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 18px;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
`;
