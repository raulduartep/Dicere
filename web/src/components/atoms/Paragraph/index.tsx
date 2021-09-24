import React, { HTMLAttributes } from 'react';

import { Container } from './styles';

type Props = HTMLAttributes<HTMLParagraphElement>;

export const Paragraph = ({ children, ...props }: Props): JSX.Element => {
  return <Container {...props}>{children}</Container>;
};
