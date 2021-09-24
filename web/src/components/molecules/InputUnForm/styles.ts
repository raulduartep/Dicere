import { IconButton } from 'components/atoms/IconButton';
import styled from 'styled-components';

type ContainerInputProps = {
  withError: boolean;
  isPassword: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContainerInput = styled.div<ContainerInputProps>`
  position: relative;
  display: flex;
  width: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.input.background};
  border: 2px solid;
  align-items: center;
  border-color: ${({ theme, withError }) =>
    withError ? theme.error : 'transparent'};

  input {
    background-color: transparent;
    width: 100%;
    height: 5rem;
    color: ${({ theme }) => theme.onSurface.high};
    padding: ${({ isPassword }) =>
      isPassword ? '0 5.0rem 0 4.4rem' : '0 1.6rem 0 4.4rem'};
    border-radius: 4px;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.onSurface.disabled};
      font-weight: 300;
    }
  }

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.primary.main};
  }
`;

export const ButtonHidden = styled(IconButton)`
  position: absolute;
  right: 1.6rem;
  color: ${({ theme }) => theme.primary.main};

  &:hover {
    background-color: ${({ theme }) => theme.button.hoverPrimary};
  }
`;

export const PreviousIcon = styled.svg`
  position: absolute;
  left: 1.6rem;
  display: flex;
  width: 16px;
  height: min-content;
  fill: #525252;
`;

export const Error = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.error};
`;
