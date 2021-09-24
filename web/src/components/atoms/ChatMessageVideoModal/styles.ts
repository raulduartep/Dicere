import styled, { css } from 'styled-components';
import { IconButton } from '../IconButton';

type ControlsContainerProps = {
  isVisible: boolean;
};

export const Container = styled.div`
  display: flex;
  max-width: 50rem;
  max-height: 50rem;

  video {
    width: 100%;
    height: 100%;
  }
`;

export const SubContainer = styled.div`
  position: relative;
`;

export const Controls = styled.div`
  display: flex;
  visibility: hidden;
  opacity: 0;
  width: 100%;
  padding: 0.8rem;
  column-gap: 1.6rem;
  align-items: center;
  transition: visibility 0.1s, opacity 0.1s;
`;

export const ControlsContainer = styled.div<ControlsContainerProps>`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  transition: background-color 0.1s;

  ${({ isVisible, theme }) =>
    isVisible &&
    css`
      background-color: ${`${theme.surface}4D`};

      ${Controls} {
        visibility: visible;
        opacity: 1;
      }
    `}
`;
export const PlayPauseButton = styled(IconButton)`
  svg {
    height: 3.6rem;
  }
`;
