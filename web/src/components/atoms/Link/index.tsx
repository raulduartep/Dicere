import React from 'react';
import { LinkProps } from 'react-router-dom';

import { Container } from './styles';

export const Link = (props: LinkProps): JSX.Element => {
  return <Container {...props} />;
};
