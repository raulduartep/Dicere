import React, { useRef, useState } from 'react';
import {
  BiVolume,
  BiVolumeFull,
  BiVolumeLow,
  BiVolumeMute,
} from 'react-icons/bi';
import { IconButton } from '../IconButton';
import { SliderOnChangeEvent, Slider } from '../Slider';

import { Container, VolumeSlider } from './styles';

type Props = {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onChangeValue: (value: number) => void;
  value: number;
};

export const ChatMessageVideoVolumeControl = ({
  onDragEnd,
  onDragStart,
  onChangeValue,
  value,
}: Props): JSX.Element => {
  const [isHover, setIsHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const memorizedValueRef = useRef<number>();
  const isMutedOnClickRef = useRef<boolean>(false);

  function handleOnDragStart() {
    setIsDragging(true);
    if (onDragStart) onDragStart();
  }

  function handleOnDragEnd() {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
  }

  function handleOnMouseLeave() {
    setIsHover(false);
  }

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleChange({ value: changedValue }: SliderOnChangeEvent) {
    isMutedOnClickRef.current = false;
    memorizedValueRef.current = undefined;
    onChangeValue(changedValue);
  }

  function handleClick() {
    const isMuted = isMutedOnClickRef.current;
    const memorizedValue = memorizedValueRef.current;

    if (isMuted && memorizedValue) {
      onChangeValue(memorizedValue);
      isMutedOnClickRef.current = false;
      memorizedValueRef.current = undefined;

      return;
    }

    memorizedValueRef.current = value;
    isMutedOnClickRef.current = true;
    onChangeValue(0);
  }

  return (
    <Container onMouseLeave={handleOnMouseLeave}>
      <VolumeSlider isVisible={isHover ? true : !!isDragging}>
        <Slider
          min={0}
          max={1}
          value={value}
          step={0.1}
          direction="vertical"
          onDragStart={handleOnDragStart}
          onDragEnd={handleOnDragEnd}
          onChange={handleChange}
        />
      </VolumeSlider>

      <IconButton
        icon={
          value === 0
            ? BiVolumeMute
            : value < 0.4
            ? BiVolume
            : value < 0.8
            ? BiVolumeLow
            : BiVolumeFull
        }
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      />
    </Container>
  );
};
