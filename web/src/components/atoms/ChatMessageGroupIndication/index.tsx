import { ChatMessageOwner } from 'components/molecules/ChatMessage';
import React from 'react';

import { Container } from './styles';

type Props = {
  owner: ChatMessageOwner;
};

export const ChatMessageGroupIndication = ({ owner }: Props): JSX.Element => {
  return <Container owner={owner} />;
};
