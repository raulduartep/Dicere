import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  transition: 0.1s background-color, 0.2s color;
  width: 3.2rem;
  height: 3.2rem;
  min-width: 3.2rem;
  height: 3.2rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.onSurface.high};

  &:hover {
    background-color: ${({ theme }) => theme.button.hover};
  }
`;
