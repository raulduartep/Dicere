import styled, { css } from 'styled-components';
import { Direction } from '.';

type Props = {
  direction: Direction;
};

export const Thumb = styled.div`
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.onSurface.high};
  z-index: 100;
`;

export const Track = styled.div`
  background-color: ${({ theme }) => theme.onSurface.high};
  border-radius: 0.25rem;
`;

const verticalStyles = css`
  width: 0.3rem;
  height: 100%;
  align-items: flex-end;

  ${Track} {
    width: 100%;
  }

  ${Thumb} {
    left: 0;
    bottom: 0;
    transform: translateX(-36.33%) translateY(50%);
  }
`;

const horizontalStyles = css`
  width: 100%;
  height: 0.3rem;

  ${Track} {
    height: 100%;
  }

  ${Thumb} {
    left: 0;
    top: 0;
    transform: translateX(-50%) translateY(-36.33%);
  }
`;

export const Container = styled.div<Props>`
  position: relative;
  background-color: ${({ theme }) => theme.onSurface.disabled};
  border-radius: 0.25rem;
  display: flex;
  cursor: pointer;

  ${({ direction }) =>
    direction === 'horizontal' ? horizontalStyles : verticalStyles}
`;
