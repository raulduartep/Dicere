import { IMessageMediaType } from 'contexts/chat';
import React from 'react';
import { BiMicrophone, BiPaperclip } from 'react-icons/bi';

import { Container } from './styles';

type Props = {
  typeMedia: IMessageMediaType;
};

export const ChatCardMessageMedia = ({ typeMedia }: Props): JSX.Element => {
  const textType = {
    audio: 'Áudio',
    video: 'Vídeo',
    image: 'Imagem',
  };

  return (
    <Container>
      {typeMedia === 'audio' ? <BiMicrophone /> : <BiPaperclip />}
      <p>{textType[typeMedia]}</p>
    </Container>
  );
};
