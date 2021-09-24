import React from 'react';
import { PictureCircle } from 'components/atoms/PictureCircle';
import { UserStatus } from 'components/atoms/UserStatus';

import { Container, Content, FriendName } from './styles';

export const FriendCardNewChat = (): JSX.Element => {
  return (
    <Container>
      <PictureCircle
        src="https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no"
        alt="Lethicia Cunha de Souza"
        size="small"
      />
      <Content>
        <FriendName>Lethicia Cunha de Souza</FriendName>
        <UserStatus reverse status="avaliable" />
      </Content>
    </Container>
  );
};
