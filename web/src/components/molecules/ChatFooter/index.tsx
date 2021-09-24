import React, { useRef, useState } from 'react';
import { IconButton } from 'components/atoms/IconButton';
import { BiPaperclip, BiSend, BiSmile } from 'react-icons/bi';
import { Emoji, Emojis } from 'components/organisms/Emojis';
import { ChatInput, ChatInputRef } from '../ChatInput';
import { ChatMicButton } from '../ChatMicButton';
import { Tooltip } from '../Tooltip';

import { Container, Side, SubContainer } from './styles';
import { DropDown } from '../DropDown';

export const ChatFooter = (): JSX.Element => {
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<ChatInputRef>(null);
  const buttonEmojiRef = useRef<HTMLButtonElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const [emoticonsIsOpen, setEmoticonsIsOpen] = useState(false);

  function handleClickAttachmentButton() {
    attachmentInputRef.current?.click();
  }

  function handleOnChangeInput(value: string) {
    if (!value) {
      setInputIsEmpty(true);
      return;
    }

    if (inputIsEmpty) {
      setInputIsEmpty(false);
    }
  }

  function handleClickOnButtonEmoticons() {
    setEmoticonsIsOpen(!emoticonsIsOpen);
  }

  function handleClickOnEmoji(emoji: Emoji) {
    if (inputRef.current) {
      inputRef.current.addEmoji(emoji);
    }
  }

  return (
    <Container>
      <SubContainer>
        <Side>
          <input
            ref={attachmentInputRef}
            type="file"
            name="attachment"
            id="attachment"
            hidden
            accept="audio/*, video/*, image/*"
          />
          <Tooltip content="Anexar" position="top" isDisabled={isRecording}>
            <IconButton
              icon={BiPaperclip}
              onClick={handleClickAttachmentButton}
              disabled={isRecording}
            />
          </Tooltip>
          <Tooltip content="Emoticons" position="top" isDisabled={isRecording}>
            <IconButton
              ref={buttonEmojiRef}
              icon={BiSmile}
              disabled={isRecording}
              onClick={handleClickOnButtonEmoticons}
            />
          </Tooltip>
          <DropDown
            isOpen={emoticonsIsOpen}
            verticalPosition="top"
            horizontalPosition="left"
            onRequestToClose={() => setEmoticonsIsOpen(false)}
            anchorRef={buttonEmojiRef}
          >
            <Emojis onClickOnEmoji={handleClickOnEmoji} />
          </DropDown>
        </Side>
        <ChatInput
          ref={inputRef}
          onChange={handleOnChangeInput}
          isDisabled={isRecording}
        />
        <Side>
          {inputIsEmpty ? (
            <ChatMicButton
              onStart={() => setIsRecording(true)}
              onEnd={() => setIsRecording(false)}
            />
          ) : (
            <IconButton icon={BiSend} />
          )}
        </Side>
      </SubContainer>
    </Container>
  );
};
