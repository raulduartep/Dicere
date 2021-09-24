import { IconButton } from 'components/atoms/IconButton';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 0.8rem;
  padding: 0.8rem;
  background-color: transparent;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => `${theme.primary.main}12`};
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Infos = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.6rem;
  justify-content: space-between;
`;

export const FriendName = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
`;

export const Description = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.onSurface.disabled};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;

export const DeleteIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.error};

  &:hover {
    background-color: ${({ theme }) => `${theme.error}1F`};
  }
`;
