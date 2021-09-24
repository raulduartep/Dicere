import React, { HTMLAttributes } from 'react';

import { Container } from './styles';

export type Type = 'h1' | 'h2' | 'h3' | 'h4';

type Props = HTMLAttributes<HTMLParagraphElement> & {
  type?: Type;
};

export const Title = ({
  children,
  type = 'h1',
  ...props
}: Props): JSX.Element => {
  return (
    <Container {...props} as={type}>
      {children}
    </Container>
  );
};
