import React, { useLayoutEffect, useRef } from 'react';

import { Container } from './styles';

type Props = {
  src: string;
};

export const ChatMessageImageModal = ({ src }: Props): JSX.Element => {
  const imageModalRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const imageModal = imageModalRef.current;

    if (imageModal) {
      const imageWidth = imageModal.naturalWidth;
      const imageHeight = imageModal.naturalHeight;

      imageModal.style.maxHeight = `${imageHeight}px`;
      imageModal.style.maxWidth = `${imageWidth}px`;
    }
  }, []);

  return <Container ref={imageModalRef} src={src} alt="" />;
};
