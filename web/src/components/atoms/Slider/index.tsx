import React, {
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
} from 'react';

import { Container, Track, Thumb } from './styles';

export type SliderOnChangeEvent = {
  value: number;
  pxTraveled: number;
};

export type Direction = 'vertical' | 'horizontal';

type Props = {
  value?: number;
  min: number;
  max: number;
  step: number;
  direction?: Direction;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onChange?: (event: SliderOnChangeEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
};

function countDecimals(value: number) {
  if (Math.floor(value.valueOf()) === value.valueOf()) return 0;
  return value.toString().split('.')[1].length || 0;
}

export type SliderRef = {
  width?: number;
  height?: number;
};

export const Slider = React.forwardRef<SliderRef, Props>(
  (
    {
      value,
      min,
      max,
      step,
      onDragStart,
      onChange,
      onDragEnd,
      onMouseMove,
      onMouseLeave,
      direction = 'horizontal',
    },
    ref
  ) => {
    const isDraggedRef = useRef(false);
    const thumbRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef<boolean>(false);
    const draggedValueRef = useRef<number>(0);
    const barRef = useRef<HTMLDivElement>(null);
    const pxPerStepRef = useRef<number>(0);

    const getTraveledVerticallyPx = useCallback((mousePosition: number) => {
      const bar = barRef.current;

      if (bar) {
        const barEnd = Math.round(bar.getBoundingClientRect().y);
        const barBegin = barEnd + bar.clientHeight;

        if (mousePosition > barBegin) {
          return { pxTraveled: 0, draggedValueTraveled: 0 };
        }

        if (mousePosition < barEnd) {
          return { pxTraveled: bar.clientHeight, draggedValueTraveled: 100 };
        }

        const pxTraveled = Math.abs(barBegin - mousePosition);
        const draggedValueTraveled = (pxTraveled * 100) / bar.clientHeight;

        return { pxTraveled, draggedValueTraveled };
      }
    }, []);

    const getTraveledHorizontallyPx = useCallback((mousePosition: number) => {
      const bar = barRef.current;

      if (bar) {
        const barBegin = bar.getBoundingClientRect().x;
        const barEnd = barBegin + bar.clientWidth;

        if (mousePosition < barBegin) {
          return { pxTraveled: 0, draggedValueTraveled: 0 };
        }

        if (mousePosition > barEnd) {
          return { pxTraveled: bar.clientWidth, draggedValueTraveled: 100 };
        }

        const pxTraveled = Math.abs(barBegin - mousePosition);
        const draggedValueTraveled = (pxTraveled * 100) / bar.clientWidth;

        return { pxTraveled, draggedValueTraveled };
      }
    }, []);

    const handleOnChangeValue = useCallback(
      (pxTraveled: number) => {
        const pxPerStep = pxPerStepRef.current;

        if (pxPerStep) {
          const stepsTraveled = Math.floor(pxTraveled / pxPerStep);
          const valueTraveled = step * stepsTraveled;

          const decimalsCount = countDecimals(step);

          const refactoredValueTraveled = decimalsCount
            ? parseFloat(valueTraveled.toFixed(decimalsCount))
            : Math.floor(valueTraveled);

          if (onChange)
            onChange({
              value: refactoredValueTraveled,
              pxTraveled,
            });
        }
      },
      [onChange, step]
    );

    const move = useCallback(
      (valueToMove: number) => {
        const thumb = thumbRef.current;
        const track = trackRef.current;

        if (track && thumb) {
          if (direction === 'horizontal') {
            thumb.style.left = `${valueToMove}%`;
            track.style.width = `${valueToMove}%`;
            draggedValueRef.current = valueToMove;
            return;
          }

          thumb.style.bottom = `${valueToMove}%`;
          track.style.height = `${valueToMove}%`;
          draggedValueRef.current = valueToMove;
        }
      },
      [direction]
    );

    function treatEvent(event: MouseEvent | React.MouseEvent) {
      event.preventDefault();
      event.stopPropagation();
    }

    const handleMouseInteraction = useCallback(
      (event: React.MouseEvent | MouseEvent) => {
        if (!isDraggedRef.current) isDraggedRef.current = true;

        if (direction === 'horizontal') {
          const pxTraveledHorizontal = getTraveledHorizontallyPx(event.clientX);

          if (!pxTraveledHorizontal) {
            return;
          }

          move(pxTraveledHorizontal.draggedValueTraveled);

          if (onChange) handleOnChangeValue(pxTraveledHorizontal.pxTraveled);

          return;
        }

        const pxTraveledVertical = getTraveledVerticallyPx(event.clientY);

        if (!pxTraveledVertical) {
          return;
        }

        move(pxTraveledVertical.draggedValueTraveled);

        if (onChange) handleOnChangeValue(pxTraveledVertical.pxTraveled);
      },
      [
        direction,
        getTraveledHorizontallyPx,
        getTraveledVerticallyPx,
        handleOnChangeValue,
        move,
        onChange,
      ]
    );

    const handleMouseMoveOnDocument = useCallback(
      (event: MouseEvent) => {
        event.stopPropagation();

        const isDragging = isDraggingRef.current;

        if (isDragging) {
          handleMouseInteraction(event);
        }
      },
      [handleMouseInteraction]
    );

    const handleMouseUpOnDocument = useCallback(
      (event: MouseEvent) => {
        event.stopPropagation();

        if (isDraggingRef.current) {
          isDraggingRef.current = false;
          if (onDragEnd) onDragEnd();
        }
      },
      [onDragEnd]
    );

    function handleMouseDownOnBar(event: React.MouseEvent) {
      treatEvent(event);

      isDraggingRef.current = true;
      handleMouseInteraction(event);
      if (onDragStart) onDragStart();
    }

    const calcPxPerStep = useCallback(() => {
      const bar = barRef.current;

      if (bar) {
        if (direction === 'horizontal') {
          pxPerStepRef.current = bar.clientWidth / (max / step);
          return;
        }

        pxPerStepRef.current = bar.clientHeight / (max / step);
      }
    }, [direction, max, step]);

    useLayoutEffect(() => {
      document.addEventListener('mousemove', handleMouseMoveOnDocument, {
        passive: true,
      });
      document.addEventListener('mouseup', handleMouseUpOnDocument, {
        passive: true,
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMoveOnDocument);
        document.removeEventListener('mouseup', handleMouseUpOnDocument);
      };
    }, [handleMouseMoveOnDocument, handleMouseUpOnDocument]);

    useEffect(() => {
      if (barRef.current) {
        new ResizeObserver(calcPxPerStep).observe(barRef.current);
      }
    }, [calcPxPerStep]);

    useEffect(() => {
      if (value !== undefined) {
        if (isDraggedRef.current) {
          isDraggedRef.current = false;
        } else {
          const refactoredValue = value < min ? min : value > max ? max : value;
          const valuePercentage = (refactoredValue * 100) / max;

          move(valuePercentage);
        }
      }
    }, [max, min, move, value]);

    useImperativeHandle(ref, () => ({
      width: barRef.current?.clientWidth,
      height: barRef.current?.clientHeight,
    }));

    return (
      <Container
        ref={barRef}
        onMouseDown={handleMouseDownOnBar}
        direction={direction}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <Thumb ref={thumbRef} />
        <Track ref={trackRef} />
      </Container>
    );
  }
);
