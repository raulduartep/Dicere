import React from 'react';
import { ChatMessageText } from 'components/atoms/ChatMessageText';
import { ChatStatus } from 'components/atoms/ChatStatus';
import { IMessage } from 'contexts/chat';

import { ChatMessageGroupIndication } from 'components/atoms/ChatMessageGroupIndication';
import { ChatMessageMedia } from 'components/atoms/ChatMessageMedia';
import {
  Container,
  SubContainer,
  BoxContainer,
  MessageDate,
  Box,
} from './styles';

export type ChatMessageOwner = 'mine' | 'yours';

type Props = {
  data: IMessage;
  owner: ChatMessageOwner;
  isLastOfGroup: boolean;
};

export const ChatMessage = ({
  data,
  isLastOfGroup,
  owner,
}: Props): JSX.Element => {
  return (
    <Container
      isMine={owner === 'mine'}
      hasGroupIndication={isLastOfGroup}
      isDisabled={data.status === 'not_received_by_api'}
    >
      <SubContainer>
        <BoxContainer>
          <Box>
            {data.type === 'text' ? (
              <ChatMessageText text={data.content} />
            ) : (
              <ChatMessageMedia
                mediaName={data.mediaName}
                typeMedia={data.typeMedia}
                url={data.loadedMediaUrl}
              />
            )}
            <MessageDate>{data.date}</MessageDate>
          </Box>
          {isLastOfGroup && <ChatMessageGroupIndication owner={owner} />}
        </BoxContainer>
        {owner === 'mine' && <ChatStatus size="normal" status={data.status} />}
      </SubContainer>
    </Container>
  );
};
