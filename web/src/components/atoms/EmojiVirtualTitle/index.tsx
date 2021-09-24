import React from 'react';

import { Container } from './styles';

type Props = {
  style: React.CSSProperties;
  text: string;
};

export const EmojiVirtualTitle = ({ style, text }: Props): JSX.Element => {
  return <Container style={style}>{text}</Container>;
};
