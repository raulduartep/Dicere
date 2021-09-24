import React, {
  FormEvent,
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from 'react';

import { Emoji } from 'components/organisms/Emojis';
import { Container, Input, Placeholder } from './styles';

type Props = {
  onChange(value: string): void;
  isDisabled: boolean;
};

export type ChatInputRef = {
  addEmoji: (emoji: Emoji) => void;
};

export const ChatInput = forwardRef<ChatInputRef, Props>(
  ({ onChange, isDisabled }, ref) => {
    const [isEmpty, setIsEmpty] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleOnInput(event: FormEvent<HTMLDivElement>) {
      const value = event.currentTarget.textContent || '';

      if (!value) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }

      onChange(value);
    }

    function addEmoji(emoji: Emoji) {
      const input = inputRef.current;

      if (input) {
        const selection = window.getSelection();

        if (selection) {
          let focusOffset = input.textContent?.length || 0;

          if (selection.focusNode?.parentNode?.isEqualNode(input)) {
            focusOffset = selection.focusOffset;
          }

          const currentValue = input.textContent || '';
          const value =
            currentValue.substring(0, focusOffset) +
            emoji.emoji +
            currentValue.substring(focusOffset);

          input.textContent = value;

          const range = document.createRange();
          range.collapse(true);
          range.setStart(input.childNodes[0], focusOffset + emoji.emoji.length);
          selection.removeAllRanges();
          selection.addRange(range);
          setIsEmpty(false);
          onChange(value);
        }
      }
    }

    useImperativeHandle(ref, () => ({
      addEmoji,
    }));

    return (
      <Container isDisabled={isDisabled}>
        <Input
          ref={inputRef}
          contentEditable={!isDisabled}
          onInput={handleOnInput}
          spellCheck={false}
        />
        {isEmpty && <Placeholder>Digite a sua mensagem...</Placeholder>}
      </Container>
    );
  }
);
