import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;

export const Circle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  min-width: 0.8rem;
  min-height: 0.8rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.success};
`;

export const Description = styled.span`
  color: ${({ theme }) => theme.success};
  font-size: 1.2rem;
  font-weight: 700;
`;
