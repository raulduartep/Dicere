import React from 'react';

import { FriendCardRequestReceived } from 'components/molecules/FriendCardRequestReceived';
import { FriendCardRequestSent } from 'components/molecules/FriendCarRequestSent';
import { Container, Header, Title, Count, Body, FriendsList } from './styles';

export const FriendshipsBodyPending = (): JSX.Element => {
  return (
    <Container>
      <Body>
        <Header>
          <Title>Pendentes</Title>
          <Count>1</Count>
        </Header>
        <FriendsList>
          <FriendCardRequestReceived />
          <FriendCardRequestSent />
        </FriendsList>
      </Body>
    </Container>
  );
};
