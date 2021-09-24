import React from 'react';
import { ChatCardMessageMedia } from 'components/atoms/ChatCardMessageMedia';
import { ChatCardMessageText } from 'components/atoms/ChatCardMessageText';
import { IMessage } from 'contexts/chat';

import { BiCheck, BiCheckDouble, BiTime } from 'react-icons/bi';

import { Container } from './styles';

type Props = {
  data: IMessage;
};

export const ChatCardMessage = ({ data }: Props): JSX.Element => {
  return (
    <Container status={data.status}>
      {data.status === 'viewed_by_users' ? (
        <BiCheckDouble />
      ) : data.status === 'received_by_users' ? (
        <BiCheckDouble />
      ) : data.status === 'received_by_api' ? (
        <BiCheck />
      ) : (
        <BiTime />
      )}
      {data.type === 'text' ? (
        <ChatCardMessageText content={data.content} />
      ) : (
        <ChatCardMessageMedia typeMedia={data.typeMedia} />
      )}
    </Container>
  );
};
