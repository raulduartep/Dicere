import styled, { css } from 'styled-components';
import { Variant } from './index';

type Props = {
  variant: Variant;
  loading: boolean;
};

export const StyledIcon = styled.svg`
  display: flex;
  width: 2.4rem;
  height: min-content;
  margin-right: 0.8rem;
`;

const contained = css`
  &:not(:disabled) {
    background-color: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.surface};

    &:hover {
      background-color: ${({ theme }) => theme.primary.mediumDark};
    }
  }

  &:disabled {
    background-color: ${({ theme }) => theme.button.disabled};
    color: ${({ theme }) => theme.onSurface.disabled};
  }
`;

const outlined = css`
  &:not(:disabled) {
    border: 1px solid ${({ theme }) => theme.divider};
    color: ${({ theme }) => theme.onSurface.medium};

    &:hover {
      background-color: ${({ theme }) => theme.button.hover};
    }
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.button.disabled};
    color: ${({ theme }) => theme.onSurface.disabled};
  }
`;

const text = css`
  border: none;
  text-transform: capitalize;
  font-weight: 500;

  ${StyledIcon} {
    width: 1.6rem;
  }

  &:not(:disabled) {
    color: ${({ theme }) => theme.onSurface.medium};

    &:hover {
      color: ${({ theme }) => theme.onSurface.high};
    }
  }

  &:disabled {
    color: ${({ theme }) => theme.onSurface.disabled};
  }
`;

const loadingStyles = css`
  pointer-events: none;
`;

export const Container = styled.button<Props>`
  display: flex;
  justify-content: center;
  column-gap: 0.8rem;
  align-items: center;
  min-height: 50px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 4px;
  width: 100%;
  transition: background-color 0.2s;

  ${({ variant }) =>
    variant === 'contained'
      ? contained
      : variant === 'outlined'
      ? outlined
      : text}

  ${({ loading }) => loading && loadingStyles}
`;
