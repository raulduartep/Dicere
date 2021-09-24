import { PictureCircle } from 'components/atoms/PictureCircle';
import { Status } from 'components/atoms/UserStatus';
import React from 'react';

import { Container, UserStatus } from './styles';

type Props = {
  status: Status;
  image: string;
  name: string;
};

export const ButtonUser = ({ status, image, name }: Props): JSX.Element => {
  return (
    <Container>
      <PictureCircle src={image} alt={name} size="small" />
      <UserStatus status={status} />
    </Container>
  );
};
