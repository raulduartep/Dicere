import { Emoji } from 'components/organisms/Emojis';
import React from 'react';

import { Container, Content } from './styles';

type Props = {
  style: React.CSSProperties;
  emojis: Emoji[];
  onClickOnEmoji: (value: Emoji) => void;
};

export const EmojiVirtualContent = ({
  style,
  emojis,
  onClickOnEmoji,
}: Props): JSX.Element => {
  return (
    <Container style={style}>
      {emojis.map((item, index) => (
        <Content key={index} onClick={() => onClickOnEmoji(item)}>
          {item.emoji}
        </Content>
      ))}
    </Container>
  );
};
