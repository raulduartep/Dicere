import styled from 'styled-components';
import { IconButton } from '../IconButton';

export const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  width: 25rem;
`;

export const Button = styled(IconButton)`
  svg {
    height: 3.6rem;
  }
`;
