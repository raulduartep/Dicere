import styled, { css } from 'styled-components';

type Props = {
  isDisabled: boolean;
};

export const Input = styled.div`
  word-wrap: break-word;
  background-color: transparent;
  white-space: pre-wrap;
  outline: 0;
  height: min-content;
  width: 100%;
  overflow-y: auto;
  max-height: 10rem;
  min-height: 5rem;
  padding: 1.6rem 0;

  &:focus {
    border: none;
  }
`;

export const Placeholder = styled.span`
  color: ${({ theme }) => theme.onSurface.disabled};
  cursor: text;
  height: min-content;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const disabled = css`
  background-color: rgba(255, 255, 255, 0.12);
  opacity: 0.3;
  cursor: not-allowed;

  ${Placeholder} {
    cursor: not-allowed;
  }

  ${Input} {
    cursor: not-allowed;
  }
`;

export const Container = styled.div<Props>`
  display: flex;
  background-color: rgba(255, 255, 255, 0.12);
  cursor: text;
  align-items: center;
  position: relative;
  border-radius: 0.4rem;
  flex-grow: 1;
  min-width: 0;
  padding: 0 1.4rem;
  height: 100%;

  ${({ isDisabled }) => isDisabled && disabled}
`;
