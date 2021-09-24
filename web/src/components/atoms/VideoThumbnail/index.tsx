import React, { useEffect, useRef, useState } from 'react';

import { Image } from './styles';

type Props = {
  src: string;
  className?: string;
};

export const VideoThumbnail = ({ src, className }: Props): JSX.Element => {
  const [isLoadedMetadata, setIsLoadedMetadata] = useState(false);
  const [isLoadedData, setIsLoadedData] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [isSeeked, setIsSeeked] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const size = useRef<{ width: number; height: number }>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 1;
    }
  }, []);

  useEffect(() => {
    if (isLoadedMetadata && isLoadedData && isSuspended && isSeeked) {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;

      if (canvas && video) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        canvas.getContext('2d')?.drawImage(video, 0, 0);

        const createdThumbnail = canvas.toDataURL('image/png');

        canvas.remove();

        size.current = {
          width: video.videoWidth,
          height: video.videoHeight,
        };

        setThumbnail(createdThumbnail);
      }
    }
  }, [isLoadedData, isLoadedMetadata, isSeeked, isSuspended]);

  return (
    <>
      {thumbnail ? (
        <Image src={thumbnail} className={className} alt="" />
      ) : (
        <video
          src={src}
          muted
          hidden
          ref={videoRef}
          crossOrigin="Anonymous"
          onLoadedMetadata={() => setIsLoadedMetadata(true)}
          onLoadedData={() => setIsLoadedData(true)}
          onSuspend={() => setIsSuspended(true)}
          onSeeked={() => setIsSeeked(true)}
        />
      )}
    </>
  );
};
