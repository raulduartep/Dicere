import React from 'react';
import { FiX } from 'react-icons/fi';

import { PictureCircle } from 'components/atoms/PictureCircle';
import { Tooltip } from '../Tooltip';

import {
  Container,
  Content,
  Infos,
  FriendName,
  Actions,
  DeleteIconButton,
  Description,
} from './styles';

export const FriendCardRequestSent = (): JSX.Element => {
  return (
    <Container>
      <PictureCircle
        src="https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no"
        alt="Lethicia Cunha de Souza"
      />
      <Content>
        <Infos>
          <FriendName>Lethicia Cunha de Souza</FriendName>
          <Description>Pedido de amizade enviado</Description>
        </Infos>
        <Actions>
          <Tooltip content="Cancelar pedido" position="left">
            <DeleteIconButton icon={FiX} />
          </Tooltip>
        </Actions>
      </Content>
    </Container>
  );
};
