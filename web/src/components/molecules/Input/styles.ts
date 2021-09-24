import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContainerInput = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border: 2px solid transparent;
  border-radius: 4px;
  background: ${({ theme }) => theme.input.background};
  align-items: center;

  input {
    background-color: transparent;
    width: 100%;
    height: 5rem;
    color: ${({ theme }) => theme.onSurface.high};
    padding: 0 1.6rem 0 4.4rem;
    border-radius: 4px;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.onSurface.disabled};
      font-weight: 300;
    }
  }

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.primary.main};
  }
`;

export const PreviousIcon = styled.svg`
  position: absolute;
  left: 1.6rem;
  display: flex;
  width: 16px;
  height: min-content;
  fill: #525252;
`;
