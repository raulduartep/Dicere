import React, { useState } from 'react';
import { ChatMessageImageModal } from '../ChatMessageImageModal';
import { ChatMessageMediaModalHeader } from '../ChatMessageMediaModalHeader';
import { Modal } from '../Modal';

import { Container, Image } from './styles';

type Props = {
  src?: string;
};

export const ChatMessageImage = ({ src }: Props): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleRequestToCloseModal() {
    setModalIsOpen(false);
  }

  if (!src) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container>
        <Image src={src} alt="" onClick={() => setModalIsOpen(true)} />
      </Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestToClose={handleRequestToCloseModal}
        header={<ChatMessageMediaModalHeader mediaSrc={src} />}
      >
        <ChatMessageImageModal src={src} />
      </Modal>
    </>
  );
};
