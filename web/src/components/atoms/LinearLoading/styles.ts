import styled, { keyframes } from 'styled-components';

const linearAnimation = keyframes`
  0% { margin-left: 0px; margin-right: 100%; }
  50% { margin-left: 25%; margin-right: 0%; }
  100% { margin-left: 100%; margin-right: 0; }
`;

export const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.onSurface.disabled};
`;

export const Bar = styled.div`
  background-color: ${({ theme }) => theme.onSurface.high};
  display: flex;
  height: 100%;
  border-radius: 3px;
  animation: ${linearAnimation} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;
