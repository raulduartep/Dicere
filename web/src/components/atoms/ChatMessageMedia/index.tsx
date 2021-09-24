import axios from 'axios';
import { IMessageMediaType } from 'contexts/chat';
import React, { useState, useEffect } from 'react';
import { ChatMessageAudio } from '../ChatMessageAudio';
import { ChatMessageImage } from '../ChatMessageImage';
import { ChatMessageVideo } from '../ChatMessageVideo';

type Props = {
  mediaName: string;
  url: string | undefined;
  typeMedia: IMessageMediaType;
};

export const ChatMessageMedia = ({
  mediaName,
  typeMedia,
  url,
}: Props): JSX.Element => {
  const [preview, setPreview] = useState(() => url);
  // const [dispatchFetch, stateFetch] = useLazyFetch<Blob>({
  //   endpoint: `static/${mediaName}`,
  //   options: {
  //     method: 'GET',
  //     responseType: 'blob',
  //   },
  // });

  // useEffect(() => {
  //   if (!url) {
  //     dispatchFetch({});
  //   }
  // }, [dispatchFetch, url]);

  // useEffect(() => {
  //   if (stateFetch.status === RequestStatus.fetched) {
  //     const previewUrl = URL.createObjectURL(stateFetch.data);
  //     setPreview(previewUrl);
  //   }
  // }, [stateFetch]);

  useEffect(() => {
    async function handleData() {
      if (!url) {
        const response = await axios.get(mediaName, {
          responseType: 'blob',
        });

        const previewUrl = URL.createObjectURL(response.data);
        setPreview(previewUrl);
      }
    }
    handleData();
  }, [mediaName, url]);

  return (
    <>
      {typeMedia === 'image' ? (
        <ChatMessageImage src={preview} />
      ) : typeMedia === 'video' ? (
        <ChatMessageVideo src={preview} />
      ) : (
        <ChatMessageAudio src={preview} />
      )}
    </>
  );
};
