import React, { AudioHTMLAttributes, useRef, useState } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';
import { ChatMessageAudioProgress } from '../ChatMessageAudioProgress';
import {
  ChatMessageAudioVelocitControl,
  StageVelocit,
  VelocitControlOnChangeValues,
} from '../ChatMessageAudioVelocitControl';
import {
  ChatMessageAudioVolumeControl,
  StageVolume,
  VolumeControlOnChangeValues,
} from '../ChatMessageAudioVolumeControl';

import { SliderOnChangeEvent } from '../Slider';

import { Container, Button } from './styles';

type Props = AudioHTMLAttributes<HTMLAudioElement>;

export const ChatMessageAudio = ({ src }: Props): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoadedData, setIsLoadedData] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVelocitStage, setCurrentVelocitStage] =
    useState<StageVelocit>('normal');
  const [currentVolumeStage, setCurrentVolumeStage] =
    useState<StageVolume>('medium');

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (audio) {
      const time = audio.currentTime;

      const valueToMove = Number(time.toFixed(2));

      setCurrentTime(valueToMove);
    }
  }

  function handleProgressChangeTime({ value }: SliderOnChangeEvent) {
    const audio = audioRef.current;

    if (audio) {
      audio.currentTime = value;

      const duration = Number(audio.duration.toFixed(2));

      if (value >= duration) {
        audio.currentTime = audio.duration;
      }
    }
  }

  function handleDragStart() {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.pause();
      }
    }
  }

  function handleDragEnd() {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.play();
      }
    }
  }

  function handlePlay() {
    const audio = audioRef.current;

    if (audio) {
      setIsPlaying(true);
      audio.play();
    }
  }

  function handlePause() {
    const audio = audioRef.current;

    if (audio) {
      setIsPlaying(false);
      audio.pause();
    }
  }

  function handleEnded() {
    setIsPlaying(false);
  }

  function handleChangeVolume(values: VolumeControlOnChangeValues) {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = values.value;
      setCurrentVolumeStage(values.stage);
    }
  }

  function handleChangeVelocit(values: VelocitControlOnChangeValues) {
    const audio = audioRef.current;

    if (audio) {
      audio.playbackRate = values.value;
      setCurrentVelocitStage(values.stage);
    }
  }

  return (
    <>
      <audio
        src={src}
        ref={audioRef}
        autoPlay={false}
        onLoadedData={() => setIsLoadedData(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      {isLoadedData && !!audioRef.current && (
        <Container>
          <Button
            icon={isPlaying ? BiPause : BiPlay}
            onClick={isPlaying ? handlePause : handlePlay}
          />
          <ChatMessageAudioProgress
            value={currentTime}
            max={audioRef.current.duration}
            onChange={handleProgressChangeTime}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          />
          <ChatMessageAudioVolumeControl
            stage={currentVolumeStage}
            onChange={handleChangeVolume}
          />
          <ChatMessageAudioVelocitControl
            stage={currentVelocitStage}
            onChange={handleChangeVelocit}
          />
        </Container>
      )}
    </>
  );
};
