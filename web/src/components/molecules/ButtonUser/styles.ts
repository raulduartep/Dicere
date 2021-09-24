import { Status } from 'components/atoms/UserStatus';
import styled from 'styled-components';

type UserStatusProps = {
  status: Status;
};

export const Container = styled.button`
  position: relative;
  border-radius: 0.4rem;
  padding: 0.3rem;

  &:hover {
    background-color: ${({ theme }) => theme.button.hover};
  }
`;

export const UserStatus = styled.span<UserStatusProps>`
  position: absolute;
  bottom: 4px;
  right: 2px;
  width: 7px;
  height: 7px;
  border-radius: 50%;

  background-color: ${({ theme, status }) =>
    status === 'avaliable' && theme.success};
`;
