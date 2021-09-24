import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Tooltip = styled.div`
  visibility: hidden;
  position: absolute;
  border-radius: 0.4rem;
  top: -0.4rem;
  left: 50%;
  transform: translateX(-50%) translateY(calc((100% + 0.8rem) * -1));
  padding: 0.6rem;
  color: ${({ theme }) => theme.onPrimary.high};
  font-weight: 700;
  background: ${({ theme }) => theme.onSurface.medium};
  font-size: 1.2rem;
  line-height: 1;
  z-index: 100;
  white-space: nowrap;

  &::before {
    content: '';
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 0.6rem;
    margin-left: -0.6rem;
    top: 100%;
    border-top-color: ${({ theme }) => theme.onSurface.medium};
    left: 50%;
  }
`;
