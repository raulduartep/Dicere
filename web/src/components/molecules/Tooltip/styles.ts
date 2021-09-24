import styled, { css } from 'styled-components';

type ContentProps = {
  position?: 'bottom' | 'right' | 'left' | 'top';
  isActive: boolean;
};

export const Container = styled.div`
  display: inline-block;
  position: relative;
`;

export const Content = styled.div<ContentProps>`
  position: absolute;
  border-radius: 0.4rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.6rem;
  color: ${({ theme }) => theme.onSurface.high};
  font-weight: 700;
  background: ${({ theme }) => theme.box.twentyfourdp};
  font-size: 1.2rem;
  line-height: 1;
  z-index: 100;
  white-space: nowrap;
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};

  &::before {
    content: ' ';
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 0.6rem;
    margin-left: -0.6rem;
  }

  ${({ theme, position }) =>
    position === 'bottom'
      ? css`
          transform: translateX(-50%) translateY(8px);

          &::before {
            bottom: 100%;
            border-bottom-color: ${theme.box.twentyfourdp};
            left: 50%;
          }
        `
      : position === 'right'
      ? css`
          top: 50%;
          transform: translateX(calc(25% + 8px)) translateY(-50%);

          &::before {
            left: 1px;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            border-right-color: ${theme.box.twentyfourdp};
          }
        `
      : position === 'top'
      ? css`
          top: 0;
          transform: translateX(-50%) translateY(calc((100% + 8px) * -1));

          &::before {
            top: 100%;
            border-top-color: ${theme.box.twentyfourdp};
            left: 50%;
          }
        `
      : css`
          top: 50%;
          left: 0;
          transform: translateX(calc((100% + 8px) * -1)) translateY(-50%);

          &::before {
            right: 1px;
            top: 50%;
            transform: translateX(100%) translateY(-50%);
            border-left-color: ${theme.box.twentyfourdp};
          }
        `};
`;
