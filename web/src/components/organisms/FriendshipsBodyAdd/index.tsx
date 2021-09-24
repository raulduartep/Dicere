import { FriendCardSendRequest } from 'components/molecules/FriendCarSendRequest';
import { Input } from 'components/molecules/Input';
import React from 'react';
import { BiUser } from 'react-icons/bi';

import { Container, Body, Header, Title, FriendsList } from './styles';

export const FriendshipsBodyAdd = (): JSX.Element => {
  return (
    <Container>
      <Body>
        <Header>
          <Title>Adicionar amigos</Title>
          <Input icon={BiUser} placeholder="Insira o nome de usuário" />
        </Header>
        <FriendsList>
          <FriendCardSendRequest />
        </FriendsList>
      </Body>
    </Container>
  );
};
