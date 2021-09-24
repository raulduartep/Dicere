import React, { HTMLAttributes } from 'react';

import { Container } from './styles';

export type Type = 'full' | 'contracted';

export type Elevation = 'fourdp' | 'twodp' | 'twentyfourdp';

type Props = HTMLAttributes<HTMLDivElement> & {
  type?: Type;
  elevation?: Elevation;
};

export const Box = ({
  children,
  type = 'contracted',
  elevation,
  ...props
}: Props): JSX.Element => {
  return (
    <Container type={type} elevation={elevation} {...props}>
      {children}
    </Container>
  );
};
