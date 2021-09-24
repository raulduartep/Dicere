import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

import { PictureCircle } from 'components/atoms/PictureCircle';
import { IconButton } from 'components/atoms/IconButton';
import { Tooltip } from '../Tooltip';

import {
  Container,
  Content,
  Infos,
  FriendName,
  Actions,
  UserName,
} from './styles';

export const FriendCardSendRequest = (): JSX.Element => {
  return (
    <Container>
      <PictureCircle
        src="https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no"
        alt="Lethicia Cunha de Souza"
      />
      <Content>
        <Infos>
          <FriendName>Lethicia Cunha de Souza</FriendName>
          <UserName>lethicinha_delicinha</UserName>
        </Infos>
        <Actions>
          <Tooltip content="Enviar" position="left">
            <IconButton icon={BiRightArrowAlt} />
          </Tooltip>
        </Actions>
      </Content>
    </Container>
  );
};
