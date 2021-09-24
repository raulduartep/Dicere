import React from 'react';

import { Container, Circle, Description } from './styles';

export type Status = 'avaliable';

type Props = {
  status: Status;
  reverse?: boolean;
};

export const UserStatus = ({ status, reverse = false }: Props): JSX.Element => {
  const statusDescription: Record<Status, string> = {
    avaliable: 'Disponível',
  };

  return (
    <Container>
      {!reverse && <Circle />}
      <Description>{statusDescription[status]}</Description>
      {reverse && <Circle />}
    </Container>
  );
};
