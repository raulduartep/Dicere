import React from 'react';
import { RiDownloadLine } from 'react-icons/ri';
import { IconButton } from '../IconButton';

type Props = {
  mediaSrc: string;
};

export const ChatMessageMediaModalHeader = ({
  mediaSrc,
}: Props): JSX.Element => {
  function handleOnClickDownload() {
    const link = document.createElement('a');
    link.href = 'images.jpg';
    link.download = 'Download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <IconButton
        size="big"
        icon={RiDownloadLine}
        onClick={handleOnClickDownload}
      />
    </>
  );
};
