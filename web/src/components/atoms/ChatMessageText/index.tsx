import React from 'react';

import { Container } from './styles';

type Props = {
  text: string;
};

export const ChatMessageText = ({ text }: Props): JSX.Element => {
  return <Container>{text}</Container>;
};
