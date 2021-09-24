import React from 'react';
import { IMessage } from 'contexts/chat';

import { ChatMessage } from 'components/molecules/ChatMessage';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Container } from './styles';

type Props = {
  data: IMessage[];
};

export const ChatMessages = ({ data }: Props): JSX.Element => {
  const [storagedUserId] = useLocalStorage<string>('userId');

  return (
    <Container>
      {data.map((message, index) => (
        <ChatMessage
          key={message.id}
          data={message}
          owner={message.user.id === storagedUserId ? 'mine' : 'yours'}
          isLastOfGroup={
            data[index + 1] ? data[index + 1].user.id !== message.user.id : true
          }
        />
      ))}
    </Container>
  );
};
