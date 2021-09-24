import styled, { css } from 'styled-components';
import { Size } from '.';

type Props = {
  size: Size;
};

const normal = css`
  width: 4rem;
  height: 4rem;
  min-width: 4rem;
  min-height: 4rem;
`;

const small = css`
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  min-height: 3rem;
`;

export const Container = styled.div<Props>`
  border-radius: 50%;
  overflow: hidden;

  ${({ size }) => (size === 'normal' ? normal : small)}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
