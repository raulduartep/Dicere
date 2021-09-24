import { IconButton } from 'components/atoms/IconButton';
import { PictureCircle } from 'components/atoms/PictureCircle';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Tooltip } from '../Tooltip';

import { Container, Content, Status } from './styles';

type Props = {
  picture: string;
  name: string;
  status: 'avaliable';
};

export const ChatHeader = ({ name, status, picture }: Props): JSX.Element => {
  return (
    <Container>
      <PictureCircle src={picture} alt={name} />
      <Content>
        <p>{name}</p>
        <Status>
          <div />
          <span>{status}</span>
        </Status>
      </Content>
      <Tooltip content="Mais">
        <IconButton icon={BiDotsVerticalRounded} />
      </Tooltip>
    </Container>
  );
};
