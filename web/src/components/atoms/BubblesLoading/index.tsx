import React, { HTMLAttributes } from 'react';

import { Bubble, Container } from './styles';

type Props = HTMLAttributes<HTMLDivElement>;

export const BubblesLoading = (props: Props): JSX.Element => {
  return (
    <Container {...props}>
      <Bubble />
      <Bubble />
      <Bubble />
    </Container>
  );
};
