import { IMessageStatus } from 'contexts/chat';
import React from 'react';
import { BiCheck, BiCheckDouble, BiTime } from 'react-icons/bi';

import { Container, ViewedIcon } from './styles';

export type ChatMessageStatusSize = 'normal' | 'small';

type Props = {
  status: IMessageStatus;
  size: ChatMessageStatusSize;
};

export const ChatStatus = ({ status, size }: Props): JSX.Element => {
  return (
    <Container size={size}>
      {status === 'viewed_by_users' ? (
        <ViewedIcon />
      ) : status === 'received_by_users' ? (
        <BiCheckDouble />
      ) : status === 'received_by_api' ? (
        <BiCheck />
      ) : (
        <BiTime />
      )}
    </Container>
  );
};
