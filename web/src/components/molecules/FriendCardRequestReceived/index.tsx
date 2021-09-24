import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

import { PictureCircle } from 'components/atoms/PictureCircle';

import {
  Container,
  Content,
  Infos,
  FriendName,
  Actions,
  DeleteIconButton,
  Description,
  AcceptIconButton,
} from './styles';
import { Tooltip } from '../Tooltip';

export const FriendCardRequestReceived = (): JSX.Element => {
  return (
    <Container>
      <PictureCircle
        src="https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no"
        alt="Lethicia Cunha de Souza"
      />
      <Content>
        <Infos>
          <FriendName>Lethicia Cunha de Souza</FriendName>
          <Description>Pedido de amizade recebido</Description>
        </Infos>
        <Actions>
          <Tooltip content="Aceitar pedido" position="left">
            <AcceptIconButton icon={FiCheck} />
          </Tooltip>
          <Tooltip content="Rejeitar pedido" position="left">
            <DeleteIconButton icon={FiX} />
          </Tooltip>
        </Actions>
      </Content>
    </Container>
  );
};
