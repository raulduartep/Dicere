import React from 'react';
import { ChatCardData } from 'components/organisms/ChatCards';

import { PictureCircle } from 'components/atoms/PictureCircle';
import { Type } from 'components/organisms/SideBarApp';
import {
  Container,
  Content,
  FirstRow,
  SecondRow,
  RoomName,
  MessageDate,
  NewMessagesCount,
} from './styles';
import { ChatCardMessage } from '../ChatCardMessage';

type Props = {
  data: ChatCardData;
  type: Type;
  to: string;
};

export const ChatCard = ({ data, type, to }: Props): JSX.Element => {
  return (
    <Container to={to} activeClassName="selected" type={type}>
      <PictureCircle src={data.roomPicture} alt={data.roomName} />
      <Content>
        <FirstRow>
          <RoomName>{data.roomName}</RoomName>
          <MessageDate>{data.lastMessage.date}</MessageDate>
        </FirstRow>
        <SecondRow>
          <ChatCardMessage data={data.lastMessage} />
        </SecondRow>
      </Content>
      {!!data.newMessagesCount && (
        <NewMessagesCount>
          <span>{data.newMessagesCount}</span>
        </NewMessagesCount>
      )}
    </Container>
  );
};
