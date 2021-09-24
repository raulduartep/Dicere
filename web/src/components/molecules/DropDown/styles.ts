import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  position: absolute;
  width: min-content;
  height: min-content;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.box.twentyfourdp};
  box-shadow: ${({ theme }) => theme.box.shadows.twentyfourdp};
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0.8rem;
`;
