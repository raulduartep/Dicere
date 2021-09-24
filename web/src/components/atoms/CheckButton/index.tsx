import React, { HTMLAttributes } from 'react';

import { Container, CheckedIcon } from './styles';

type Props = HTMLAttributes<HTMLDivElement> & {
  isChecked: boolean;
};

export const CheckButton = ({ isChecked }: Props): JSX.Element => {
  return (
    <Container isChecked={isChecked}>
      <CheckedIcon />
    </Container>
  );
};
