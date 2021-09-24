import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2.4rem;
  max-width: 480px;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  width: 100%;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2.4rem;
`;
