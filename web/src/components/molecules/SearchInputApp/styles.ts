import { IconButton } from 'components/atoms/IconButton';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  column-gap: 0.8rem;
  align-items: center;
  background-color: ${({ theme }) => theme.input.background};
  height: 100%;
  width: 100%;
  max-width: 25rem;
  border-radius: 0.4rem;
  padding: 0.4rem 0.8rem 0.4rem 1.2rem;
  border: 2px solid ${({ theme }) => theme.input.background};
  transition: 0.1s border-color;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary.main};
  }
`;

export const Input = styled.input`
  font-size: 1.4rem;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.onSurface.high};
  padding-right: 3.2rem;

  &::placeholder {
    color: ${({ theme }) => theme.onSurface.disabled};
    font-weight: 300;
  }
`;

export const IconButtonCustom = styled(IconButton)`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -0.4rem;
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.divider};
  }
`;
