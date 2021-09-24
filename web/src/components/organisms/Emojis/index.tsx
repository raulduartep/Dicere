import React, { useMemo, useState, useRef } from 'react';
import { EmojisHeader } from 'components/molecules/EmojisHeader';
import {
  EmojisVirtualList,
  ListRef,
} from 'components/molecules/EmojisVirtualList';
import { useLocalStorage } from 'hooks/useLocalStorage';

import emojis from '../../../assets/static/emojis.json';

import { Container, EmojiListContainer } from './styles';

export type Emoji = {
  name: string;
  emoji: string;
};

export type EmojiGroup = {
  name: EmojisCategories;
  values: Emoji[];
};

export type EmojisCategories =
  | 'Recentes'
  | 'Pessoas'
  | 'Smileys'
  | 'Objetos'
  | 'Atividades'
  | 'Símbolos'
  | 'Viajens e Lugares'
  | 'Comidas e bebidas'
  | 'Animais e natureza'
  | 'Bandeiras';

type Props = {
  onClickOnEmoji: (value: Emoji) => void;
};

export const Emojis = ({ onClickOnEmoji }: Props): JSX.Element => {
  const [recentEmojisStoraged, setRecentEmojisStoraged] =
    useLocalStorage<Emoji[]>('recentEmojis');
  const emojisMemo = useMemo<EmojiGroup[]>(() => {
    const gettedEmojis = Object.entries(emojis).map((item): EmojiGroup => {
      const name = item[0] as EmojisCategories;
      const values = item[1];

      return {
        name,
        values,
      };
    });

    return [
      { name: 'Recentes', values: recentEmojisStoraged || [] },
      ...gettedEmojis,
    ];
  }, [recentEmojisStoraged]);
  const [emojiCategoryActivated, setEmojiCategoryActivated] = useState(
    emojisMemo[0].name
  );
  const virtualListRef = useRef<ListRef>(null);

  function handleOnClickOnHeaderButton(value: EmojisCategories) {
    setEmojiCategoryActivated(value);
    virtualListRef.current?.scrollToCategory(value);
  }

  function handleOnChangeScrollCategory(value: EmojisCategories) {
    setEmojiCategoryActivated(value);
  }

  function handleClickOnEmoji(emoji: Emoji) {
    const alreadyInside = recentEmojisStoraged?.some(
      item => item.name === emoji.name
    );

    if (!alreadyInside) {
      setRecentEmojisStoraged([...(recentEmojisStoraged || []), emoji]);
    }

    onClickOnEmoji(emoji);
  }

  return (
    <Container>
      <EmojisHeader
        categories={emojisMemo.map(item => item.name)}
        categoryActivated={emojiCategoryActivated}
        onClick={handleOnClickOnHeaderButton}
      />
      <EmojiListContainer>
        <EmojisVirtualList
          onChangeScrollCategory={handleOnChangeScrollCategory}
          ref={virtualListRef}
          emojis={emojisMemo}
          onClickOnEmoji={handleClickOnEmoji}
        />
      </EmojiListContainer>
    </Container>
  );
};
