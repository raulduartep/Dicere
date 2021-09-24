import React, { useEffect, useRef, useState, VideoHTMLAttributes } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';
import { ChatMessageVideoProgressControl } from '../ChatMessageVideoProgressControl';
import { ChatMessageVideoVolumeControl } from '../ChatMessageVideoVolumeControl';

import {
  Container,
  SubContainer,
  Controls,
  ControlsContainer,
  PlayPauseButton,
} from './styles';

type Props = VideoHTMLAttributes<HTMLVideoElement>;

export const ChatMessageVideoModal = ({
  className,
  ...props
}: Props): JSX.Element => {
  const [isLoadedData, setIsLoadedData] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isDraggingSomeSlide, setIsDraggingSomeSlide] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout>();

  function handlePlay() {
    const video = videoRef.current;

    if (video) {
      setIsPlaying(true);
      video.play();
    }
  }

  function handlePause() {
    const video = videoRef.current;

    if (video) {
      setIsPlaying(false);
      video.pause();
    }
  }

  function handleMouseMove() {
    setIsHover(true);

    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    hoverTimeout.current = setTimeout(() => setIsHover(false), 3000);
  }

  function handleMouseLeave() {
    setIsHover(false);

    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = undefined;
    }
  }

  function handleDragStart() {
    setIsDraggingSomeSlide(true);
  }

  function handleDragEnd() {
    setIsDraggingSomeSlide(false);
  }

  function handleChangeVolume(value: number) {
    setCurrentVolume(value);
  }

  function handleChangeTime(value: number) {
    const video = videoRef.current;

    if (video) {
      video.currentTime = value;
    }
  }

  function handleTimeUpdate() {
    const video = videoRef.current;

    if (video) {
      const time = video.currentTime;

      const valueToMove = Number(time.toFixed(2));

      setCurrentTime(valueToMove);
    }
  }

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.volume = currentVolume;
    }
  }, [currentVolume]);

  return (
    <Container className={className}>
      <SubContainer>
        <video
          ref={videoRef}
          {...props}
          onLoadedData={() => setIsLoadedData(true)}
          onTimeUpdate={handleTimeUpdate}
        />
        {isLoadedData && !!videoRef.current && (
          <ControlsContainer
            isVisible={isHover ? true : !!isDraggingSomeSlide}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Controls>
              <PlayPauseButton
                icon={isPlaying ? BiPause : BiPlay}
                onClick={isPlaying ? handlePause : handlePlay}
              />

              <ChatMessageVideoProgressControl
                max={videoRef.current.duration}
                value={currentTime}
                onChangeValue={handleChangeTime}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />

              <ChatMessageVideoVolumeControl
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onChangeValue={handleChangeVolume}
                value={currentVolume}
              />
            </Controls>
          </ControlsContainer>
        )}
      </SubContainer>
    </Container>
  );
};
