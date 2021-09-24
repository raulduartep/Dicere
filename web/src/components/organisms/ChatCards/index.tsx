import React from 'react';
import { ChatCard } from 'components/molecules/ChatCard';
import { IMessage } from 'contexts/chat';
import { useRouteMatch } from 'react-router-dom';
import { Type } from '../SideBarApp';

import { Container } from './styles';

export type ChatCardData = {
  roomId: string;
  newMessagesCount: number;
  roomName: string;
  roomPicture: string;
  lastMessage: IMessage;
};

type Props = {
  data: ChatCardData[];
  type: Type;
  onScroll: React.UIEventHandler<HTMLDivElement>;
};

export const ChatCards = ({ data, type, onScroll }: Props): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <Container type={type} onScroll={onScroll}>
      {data.map(item => (
        <ChatCard
          key={item.roomId}
          type={type}
          data={item}
          to={`/app/chat/${item.roomId}`}
        />
      ))}
    </Container>
  );
};
