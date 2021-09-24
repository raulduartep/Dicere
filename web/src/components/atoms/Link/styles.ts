import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled(Link)`
  color: ${({ theme }) => theme.primary.main};
  transition: color 0.1s;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.primary.mediumDark};
  }
`;
