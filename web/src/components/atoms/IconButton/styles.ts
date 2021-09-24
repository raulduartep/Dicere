import styled, { css } from 'styled-components';
import { Size } from '.';

type Props = {
  size: Size;
};

const bigStyles = css`
  width: 3.6rem;
  height: 3.6rem;
  min-width: 3.6rem;
  height: 3.6rem;

  svg {
    height: 2.4rem;
  }
`;

const normalStyles = css`
  width: 3.2rem;
  height: 3.2rem;
  min-width: 3.2rem;
  height: 3.2rem;

  svg {
    height: 2rem;
  }
`;

const smallStyles = css`
  width: 2.4rem;
  height: 2.4rem;
  min-width: 2.4rem;
  height: 2.4rem;

  svg {
    height: 1.6rem;
  }
`;

const tinyStyles = css`
  width: 1.6rem;
  height: 1.6rem;
  min-width: 1.6rem;
  height: 1.6rem;

  svg {
    height: 1.2rem;
  }
`;

const disabledStyles = css`
  cursor: not-allowed;
  color: ${({ theme }) => theme.onSurface.disabled};
`;

const enableStyles = css`
  cursor: pointer;
  color: ${({ theme }) => theme.onSurface.high};

  &:hover {
    background-color: ${({ theme }) => theme.button.hover};
  }
`;

export const Container = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  transition: 0.1s background-color, 0.2s color;

  ${({ disabled }) => (disabled ? disabledStyles : enableStyles)}

  ${({ size }) =>
    size === 'normal'
      ? normalStyles
      : size === 'small'
      ? smallStyles
      : size === 'tiny'
      ? tinyStyles
      : bigStyles}

  svg {
    display: flex;
    width: auto;
    align-items: center;
    justify-content: center;
  }
`;
