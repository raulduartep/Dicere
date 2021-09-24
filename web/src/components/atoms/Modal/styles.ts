import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => `${theme.surface}F2`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: max-content;
  height: max-content;
  margin: 0 5rem;
`;

export const Header = styled.header`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.6rem;
`;

export const ProvidedHeader = styled.div``;
