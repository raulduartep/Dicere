import React from 'react';
import { DropDown } from '../DropDown';
import { FriendCardNewChat } from '../FriendCardNewChat';

import { Container, Title, FriendsList } from './styles';

type Props = {
  isOpen: boolean;
  anchorRef: React.MutableRefObject<HTMLButtonElement | null>;
  onRequestToClose(): void;
};

export const DropdownNewChat = ({
  isOpen,
  anchorRef,
  onRequestToClose,
}: Props): JSX.Element => {
  return (
    <DropDown
      isOpen={isOpen}
      anchorRef={anchorRef}
      verticalPosition="top"
      horizontalPosition="right"
      onRequestToClose={onRequestToClose}
    >
      <Container>
        <Title>Nova conversa</Title>
        <FriendsList>
          <FriendCardNewChat />
          <FriendCardNewChat />
          <FriendCardNewChat />
          <FriendCardNewChat />
          <FriendCardNewChat />
          <FriendCardNewChat />
          <FriendCardNewChat />
          <FriendCardNewChat />
        </FriendsList>
      </Container>
    </DropDown>
  );
};
