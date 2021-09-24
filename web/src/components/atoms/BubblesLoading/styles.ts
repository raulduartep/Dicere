import styled, { keyframes } from 'styled-components';

const bubblesAnimation = keyframes`
  0%, 100% { transform: scale(0); }
  50% { transform: scale(1); }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 0.8rem;
`;

export const Bubble = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.onPrimary.high};
  animation: ${bubblesAnimation} 1.2s ease-in infinite;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:last-child {
    animation-delay: 0.6s;
  }
`;
