import React, { useRef } from 'react';
import { Slider, SliderOnChangeEvent, SliderRef } from '../Slider';

import { Container } from './styles';

type Props = {
  max: number;
  value: number;
  onChange: (event: SliderOnChangeEvent) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
};

export const ChatMessageAudioProgress = ({
  max,
  value,
  onChange,
  onDragEnd,
  onDragStart,
}: Props): JSX.Element => {
  const stepsRef = useRef(0.01);
  const sliderRef = useRef<SliderRef>(null);

  function treatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  return (
    <Container>
      <Slider
        ref={sliderRef}
        min={0}
        max={max}
        step={stepsRef.current}
        value={value}
        onChange={onChange}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
      <span>{`${treatTime(value)} / ${treatTime(max)}`}</span>
    </Container>
  );
};
