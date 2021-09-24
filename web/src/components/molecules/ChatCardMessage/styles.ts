import styled from 'styled-components';
import { IMessageStatus } from 'contexts/chat';

type Props = {
  status: IMessageStatus;
};

export const Container = styled.div<Props>`
  display: flex;
  column-gap: 0.4rem;
  color: ${({ status, theme }) =>
    status === 'received_by_api'
      ? theme.onSurface.disabled
      : theme.onSurface.medium};

  p {
    font-size: 1.2rem;
  }

  > svg {
    display: flex;
    height: 1.6rem;
    width: auto;
    color: ${({ status, theme }) =>
      status === 'viewed_by_users'
        ? theme.primary.main
        : status === 'not_received_by_api'
        ? theme.onSurface.disabled
        : theme.onSurface.medium};
  }
`;
