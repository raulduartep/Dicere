import styled from 'styled-components';

export const Container = styled.span`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.onSurface.disabled};
`;
