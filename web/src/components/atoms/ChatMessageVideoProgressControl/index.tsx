import React, { useRef } from 'react';
import { SliderOnChangeEvent, Slider, SliderRef } from '../Slider';

import { Tooltip, Container } from './styles';

type Props = {
  max: number;
  value: number;
  onChangeValue?: (value: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

export const ChatMessageVideoProgressControl = ({
  max,
  value,
  onChangeValue,
  onDragEnd,
  onDragStart,
}: Props): JSX.Element => {
  const stepRef = useRef(0.01);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<SliderRef>(null);

  function moveTooltip(pxTraveled: number) {
    const tooltip = tooltipRef.current;
    const slider = sliderRef.current;

    if (tooltip && slider && slider.width) {
      const pxPerSeconds = slider.width / max;
      const traveledSeconds = Math.floor(pxTraveled / pxPerSeconds);

      const minutes = Math.floor(traveledSeconds / 60);
      const seconds = (traveledSeconds - minutes * 60)
        .toString()
        .padStart(2, '0');

      tooltip.style.left = `${pxTraveled}px`;
      tooltip.textContent = `${minutes}:${seconds}`;
    }
  }

  function hideTooltip() {
    const tooltip = tooltipRef.current;

    if (tooltip) {
      tooltip.style.visibility = 'hidden';
    }
  }

  function showTooltip() {
    const tooltip = tooltipRef.current;

    if (tooltip) {
      tooltip.style.visibility = 'visible';
    }
  }

  function handleOnChange({ value: valueTraveled }: SliderOnChangeEvent) {
    if (onChangeValue) onChangeValue(valueTraveled);
  }

  function handleMouseMove(event: React.MouseEvent) {
    const { clientX, currentTarget } = event;

    const sliderBegin = currentTarget.getBoundingClientRect().x;
    const pxTraveled = Math.abs(sliderBegin - clientX);

    showTooltip();
    moveTooltip(pxTraveled);
  }

  return (
    <Container>
      <Tooltip ref={tooltipRef} />
      <Slider
        ref={sliderRef}
        min={0}
        max={max}
        value={value}
        step={stepRef.current}
        onChange={handleOnChange}
        onMouseMove={handleMouseMove}
        onMouseLeave={hideTooltip}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      />
    </Container>
  );
};
