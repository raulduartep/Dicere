import React, { HTMLAttributes } from 'react';

import { Container, Bar } from './styles';

type Props = HTMLAttributes<HTMLDivElement>;

export const LinearLoading = (props: Props): JSX.Element => {
  return (
    <Container {...props}>
      <Bar />
    </Container>
  );
};
