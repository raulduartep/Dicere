import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  p {
    margin-left: 16px;
    color: ${({ theme }) => theme.onSurface.medium};
  }
`;
