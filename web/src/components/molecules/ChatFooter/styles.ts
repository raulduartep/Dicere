import styled from 'styled-components';

export const Container = styled.footer`
  padding: 1.6rem;
  border-top: 1px solid ${({ theme }) => theme.divider};
`;

export const Side = styled.div`
  display: flex;
  height: 5rem;
  align-items: center;
  column-gap: 1.6rem;
`;

export const SubContainer = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 1.6rem;
`;
