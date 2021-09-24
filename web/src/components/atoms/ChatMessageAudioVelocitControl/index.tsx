import React from 'react';

import { Container } from './styles';

type Props = {
  stage: StageVelocit;
  onChange: (values: VelocitControlOnChangeValues) => void;
};

export type StageVelocit = 'normal' | 'medium' | 'high';

export type VelocitControlOnChangeValues = {
  stage: StageVelocit;
  value: number;
};

type StageVelocitValue = {
  stage: StageVelocit;
  value: number;
  text: string;
};

const indexesVelocitStages: Record<StageVelocit, number> = {
  normal: 0,
  medium: 1,
  high: 2,
};

const velocitStages: StageVelocitValue[] = [
  {
    stage: 'normal',
    value: 1,
    text: '1x',
  },
  {
    stage: 'medium',
    value: 1.5,
    text: '1.5x',
  },
  {
    stage: 'high',
    value: 2,
    text: '2x',
  },
];

export const ChatMessageAudioVelocitControl = ({
  onChange,
  stage,
}: Props): JSX.Element => {
  function handleOnClick() {
    const currentVelocitIndex = indexesVelocitStages[stage];
    const nextVelocitIndex =
      currentVelocitIndex === velocitStages.length - 1
        ? 0
        : currentVelocitIndex + 1;

    const nextVolumeValues = velocitStages[nextVelocitIndex];

    onChange({
      stage: nextVolumeValues.stage,
      value: nextVolumeValues.value,
    });
  }

  return (
    <Container onClick={handleOnClick}>
      <span>{velocitStages[indexesVelocitStages[stage]].text}</span>
    </Container>
  );
};
