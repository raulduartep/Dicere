import React from 'react';

import { Container } from './styles';

type Props = {
  content: string;
};

export const ChatCardMessageText = ({ content }: Props): JSX.Element => {
  return <Container>{content}</Container>;
};
