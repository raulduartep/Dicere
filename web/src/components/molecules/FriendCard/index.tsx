import React from 'react';
import { BiMessageSquareDots } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';

import { PictureCircle } from 'components/atoms/PictureCircle';
import { UserStatus } from 'components/atoms/UserStatus';
import { IconButton } from 'components/atoms/IconButton';

import {
  Container,
  Content,
  Infos,
  FriendName,
  Actions,
  DeleteIconButton,
} from './styles';

export const FriendCard = (): JSX.Element => {
  return (
    <Container>
      <PictureCircle
        src="https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no"
        alt="Lethicia Cunha de Souza"
      />
      <Content>
        <Infos>
          <FriendName>Lethicia Cunha de Souza</FriendName>
          <UserStatus status="avaliable" />
        </Infos>
        <Actions>
          <IconButton icon={BiMessageSquareDots} />
          <DeleteIconButton icon={FiX} />
        </Actions>
      </Content>
    </Container>
  );
};
