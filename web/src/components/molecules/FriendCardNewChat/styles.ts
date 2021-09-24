import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 0.8rem;
  padding: 0.8rem;
  column-gap: 0.8rem;
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
  align-items: center;
  width: 100%;
`;

export const FriendName = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  overflow-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 12rem;
`;
