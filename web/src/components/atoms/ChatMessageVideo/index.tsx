import React, { useState, VideoHTMLAttributes } from 'react';
import { BiPlay } from 'react-icons/bi';
import { ChatMessageVideoModal } from '../ChatMessageVideoModal';
import { Modal } from '../Modal';
import { VideoThumbnail } from '../VideoThumbnail';

import { Container, Button, VideoThumbnailContainer } from './styles';

type Props = VideoHTMLAttributes<HTMLVideoElement>;

export const ChatMessageVideo = (props: Props): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!props.src) {
    return <p>Loading...</p>;
  }

  function handleRequestToCloseModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Container>
        <VideoThumbnailContainer>
          <VideoThumbnail src={props.src} />
        </VideoThumbnailContainer>
        <Button onClick={() => setModalIsOpen(true)}>
          <BiPlay />
        </Button>
      </Container>
      <Modal isOpen={modalIsOpen} onRequestToClose={handleRequestToCloseModal}>
        <ChatMessageVideoModal src={props.src} />
      </Modal>
    </>
  );
};
