import React from 'react';
import { FriendCard } from 'components/molecules/FriendCard';

import { Container, Header, Title, Count, Body, FriendsList } from './styles';

export const FriendshipsBodyAll = (): JSX.Element => {
  return (
    <Container>
      <Body>
        <Header>
          <Title>Todos os amigos</Title>
          <Count>1</Count>
        </Header>
        <FriendsList>
          <FriendCard />
        </FriendsList>
      </Body>
    </Container>
  );
};
