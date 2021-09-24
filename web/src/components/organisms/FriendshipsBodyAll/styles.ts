import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  padding: 0 2.4rem;
  column-gap: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.onSurface.disabled};
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  text-transform: uppercase;
  padding-right: 0.8rem;
  border-right: 2px solid ${({ theme }) => theme.divider};
`;

export const Count = styled.span`
  font-size: 1.2rem;
`;

export const Body = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  height: 100%;
`;

export const FriendsList = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  row-gap: 0.8rem;
  overflow-y: auto;
  padding: 0 2.4rem;
`;
