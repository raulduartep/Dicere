import React from 'react';
import { IconType } from 'react-icons';
import {
  BiVolume,
  BiVolumeFull,
  BiVolumeLow,
  BiVolumeMute,
} from 'react-icons/bi';
import { IconButton } from '../IconButton';

type Props = {
  stage: StageVolume;
  onChange: (values: VolumeControlOnChangeValues) => void;
};

export type StageVolume = 'muted' | 'low' | 'medium' | 'high';

export type VolumeControlOnChangeValues = {
  stage: StageVolume;
  value: number;
};

type StageVolumeValues = {
  stage: StageVolume;
  value: number;
  icon: IconType;
};

const indexesVolumeStages: Record<StageVolume, number> = {
  muted: 0,
  low: 1,
  medium: 2,
  high: 3,
};

const volumeStages: StageVolumeValues[] = [
  {
    stage: 'muted',
    value: 0,
    icon: BiVolumeMute,
  },
  {
    stage: 'low',
    value: 0.33,
    icon: BiVolume,
  },
  {
    stage: 'medium',
    value: 0.66,
    icon: BiVolumeLow,
  },
  {
    stage: 'high',
    value: 1,
    icon: BiVolumeFull,
  },
];

export const ChatMessageAudioVolumeControl = ({
  stage,
  onChange,
}: Props): JSX.Element => {
  function handleOnClick() {
    const currentVolumeIndex = indexesVolumeStages[stage];
    const nextVolumeIndex =
      currentVolumeIndex === volumeStages.length - 1
        ? 0
        : currentVolumeIndex + 1;

    const nextVolumeValues = volumeStages[nextVolumeIndex];

    onChange({
      stage: nextVolumeValues.stage,
      value: nextVolumeValues.value,
    });
  }

  return (
    <IconButton
      icon={volumeStages[indexesVolumeStages[stage]].icon}
      onClick={handleOnClick}
    />
  );
};
