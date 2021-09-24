import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Align, ListOnScrollProps, VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import {
  Emoji,
  EmojiGroup,
  EmojisCategories,
} from 'components/organisms/Emojis';
import { EmojiVirtualTitle } from 'components/atoms/EmojiVirtualTitle';
import { EmojiVirtualContent } from 'components/atoms/EmojiVirtualContent';

type Props = {
  emojis: EmojiGroup[];
  onChangeScrollCategory: (value: EmojisCategories) => void;
  onClickOnEmoji: (value: Emoji) => void;
};

type ListProps = {
  height: number;
  width: number;
} & Props;

type RowTitle = {
  text: string;
  type: 'title';
};

type RowEmojis = {
  emojis: Emoji[];
  type: 'emojis';
};

type FixedSizeListRef = {
  scrollToItem: (index: number, align: Align) => void;
};

export type ListRef = {
  scrollToCategory: (name: EmojisCategories) => void;
};

const itemSize = 40;
const itemTitleSize = 28;

const List = forwardRef<ListRef, ListProps>(
  (
    { emojis, height, width, onChangeScrollCategory, onClickOnEmoji },
    ref
  ): JSX.Element => {
    const countItensInOneLine = Math.floor(width / itemSize);
    const currentCategoryScroll = useRef(emojis[0].name);
    const rows: Array<RowTitle | RowEmojis> = [];
    const rowsTitle: Record<string, number> = {};
    const rowsTitleOffset: Record<string, number> = {};
    const listRef = useRef<FixedSizeListRef>(null);

    emojis.forEach(({ name, values }, emojiIndex) => {
      const indexInject = rows.push({
        type: 'title',
        text: name,
      });

      const rowIndexInject = indexInject - 1;
      const countOfRowsTitles = emojiIndex + 1;
      const countOfRowEmojis = Math.max(rowIndexInject - countOfRowsTitles, 0);

      rowsTitle[name] = rowIndexInject;
      rowsTitleOffset[name] =
        countOfRowsTitles * itemTitleSize + countOfRowEmojis * itemSize;

      const totalRows = Math.ceil(values.length / countItensInOneLine);

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < totalRows; index++) {
        const rowBegin = index * countItensInOneLine;
        const rowEnd = (index + 1) * countItensInOneLine;

        rows.push({
          emojis: values.slice(rowBegin, rowEnd),
          type: 'emojis',
        });
      }
    });

    function handleScrollToCategory(name: EmojisCategories) {
      const indexCategory = rowsTitle[name];

      listRef.current?.scrollToItem(indexCategory, 'start');
    }

    function getItemSize(index: number) {
      const isTitle = Object.values(rowsTitle).some(item => item === index);

      if (isTitle) {
        return itemTitleSize;
      }

      return itemSize;
    }

    function handleOnScroll({ scrollOffset }: ListOnScrollProps) {
      const offsetValues = Object.entries(rowsTitleOffset);

      const lastCategoryScroll = offsetValues
        .filter(([, value]) => scrollOffset > value)
        .pop();

      if (lastCategoryScroll) {
        const key = lastCategoryScroll[0] as EmojisCategories;

        if (key !== currentCategoryScroll.current) {
          onChangeScrollCategory(key);
          currentCategoryScroll.current = key;
        }
      }
    }

    useImperativeHandle(ref, () => ({
      scrollToCategory: handleScrollToCategory,
    }));

    return (
      <VariableSizeList
        ref={listRef as never}
        itemCount={rows.length}
        itemSize={getItemSize}
        height={height}
        width={width}
        onScroll={handleOnScroll}
      >
        {({ index, style }) => {
          const row = rows[index];

          if (row.type === 'title') {
            return <EmojiVirtualTitle style={style} text={row.text} />;
          }

          return (
            <EmojiVirtualContent
              style={style}
              emojis={row.emojis}
              onClickOnEmoji={onClickOnEmoji}
            />
          );
        }}
      </VariableSizeList>
    );
  }
);

export const EmojisVirtualList = forwardRef<ListRef, Props>(
  ({ emojis, onChangeScrollCategory, onClickOnEmoji }, ref): JSX.Element => {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            onChangeScrollCategory={onChangeScrollCategory}
            onClickOnEmoji={onClickOnEmoji}
            ref={ref}
            height={height}
            width={width}
            emojis={emojis}
          />
        )}
      </AutoSizer>
    );
  }
);
