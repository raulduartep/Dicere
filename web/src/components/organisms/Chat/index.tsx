import React, { useState, useEffect } from 'react';
import { ChatFooter } from 'components/molecules/ChatFooter';
import { ChatHeader } from 'components/molecules/ChatHeader';
import { ChatMessages } from 'components/organisms/ChatMessages';
import { useChat } from 'hooks/useChat';

import { useParams } from 'react-router-dom';
import { api } from 'utils/api';
import { IMessage } from 'contexts/chat';
import { MessageMap } from 'utils/MessageMap';
import { Container, SubContainer } from './styles';

export const Chat = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { getRoom } = useChat();
  const [room] = useState(() => getRoom(id));
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    async function handleData() {
      if (room) {
        const gettedMessages = await api.getMessages(room.id, 1);

        const mappedMessages = MessageMap.mapMany(gettedMessages);

        setMessages(mappedMessages);
      }
    }

    handleData();
  }, [room]);

  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <SubContainer>
        <ChatHeader
          picture={room.picture}
          status="avaliable"
          name={room.name}
        />
        <ChatMessages data={messages} />
        <ChatFooter />
      </SubContainer>
      {/* <MoreInformation /> */}
    </Container>
  );
};
