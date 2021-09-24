import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
  width: 30rem;
  height: 23rem;
  padding: 0.8rem 0;
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.onSurface.medium};
  text-transform: uppercase;
  padding: 0 1.6rem;
`;

export const FriendsList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
`;
