import styled from 'styled-components';

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.divider};
  padding-top: 2.4rem;
  margin-top: 2.4rem;
  width: 100%;
  row-gap: 1.6rem;
`;

export const Complements = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CreateAccount = styled.div`
  display: flex;
  justify-content: center;

  a {
    margin-left: 0.8rem;
  }
`;
