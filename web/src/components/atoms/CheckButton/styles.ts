import { FaCheck } from 'react-icons/fa';
import styled, { css } from 'styled-components';

type Props = {
  isChecked: boolean;
};

export const CheckedIcon = styled(FaCheck)`
  width: 12px;
  height: auto;
  transition: color 0.1s;
  color: inherit;
`;

const checked = css`
  background-color: ${({ theme }) => theme.primary.main};
  border-color: ${({ theme }) => theme.primary.main};
  color: ${({ theme }) => theme.onPrimary.high};

  &:hover {
    background-color: ${({ theme }) => theme.primary.mediumDark};
  }
`;

const notChecked = css`
  border-color: ${({ theme }) => theme.onSurface.medium};
  color: ${({ theme }) => theme.onSurface.disabled};

  &:hover {
    background-color: ${({ theme }) => theme.button.hover};
  }
`;

export const Container = styled.button<Props>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: center;
  border-radius: 2px;
  transition: background-color 0.1s, border-color 0.1s;
  border: 1px solid;
  background-color: transparent;

  ${({ isChecked }) => (isChecked ? checked : notChecked)}
`;
