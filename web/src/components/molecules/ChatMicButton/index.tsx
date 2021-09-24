import React, { useState, useRef } from 'react';

import { BiCheck, BiMicrophone, BiX } from 'react-icons/bi';

import {
  Container,
  Info,
  ButtonStartRecording,
  Recording,
  Status,
  Count,
  CancelButton,
  AcceptButton,
} from './styles';

type Props = {
  onStart(): void;
  onEnd(): void;
};

export const ChatMicButton = ({ onStart, onEnd }: Props): JSX.Element => {
  const [recording, setRecording] = useState(false);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function handleStartRecording() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => setCount(value => value + 1), 1000);
    setRecording(true);
    onStart();
  }

  function handleStopRecording() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setRecording(false);
    setCount(0);
    onEnd();
  }

  const minutes = Math.floor(count / 60);
  const secondsFormated = String(count - minutes * 60).padStart(2, '0');

  return (
    <Container recording={recording}>
      <Recording>
        <CancelButton icon={BiX} onClick={handleStopRecording} />
        <Info>
          <Status />
          <Count>
            {minutes}:{secondsFormated}
          </Count>
        </Info>
        <AcceptButton icon={BiCheck} />
      </Recording>
      <ButtonStartRecording
        icon={BiMicrophone}
        onClick={handleStartRecording}
      />
    </Container>
  );
};
