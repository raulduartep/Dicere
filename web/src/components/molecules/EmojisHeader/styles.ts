import { IconButton } from 'components/atoms/IconButton';
import styled, { css } from 'styled-components';

type ButtonProps = {
  isActivated: boolean;
};

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.divider};
`;

export const Button = styled(IconButton)<ButtonProps>`
  ${({ theme, isActivated }) =>
    css`
      color: ${isActivated ? theme.primary.main : theme.onSurface.medium};
    `}
`;
