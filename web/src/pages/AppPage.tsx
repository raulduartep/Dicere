import { AppBar } from 'components/organisms/AppBar';
import { Chat } from 'components/organisms/Chat';
import { ChatCardData } from 'components/organisms/ChatCards';
import { Frienships } from 'components/organisms/Frienships';
import { SideBarApp } from 'components/organisms/SideBarApp';
import { AppTemplate } from 'components/templates/AppTemplate';
import { IRoomState } from 'contexts/chat';
import React, { useEffect, useState } from 'react';
import { MessageMap } from 'utils/MessageMap';

import { useChat } from '../hooks/useChat';
import { api } from '../utils/api';

export const AppPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const { rooms, addRoom } = useChat();

  const roomMappedForSideBar = rooms.map(
    (room): ChatCardData => ({
      roomName: room.name,
      roomId: room.id,
      roomPicture: room.picture,
      newMessagesCount: 1,
      lastMessage: room.messages[0],
    })
  );

  useEffect(() => {
    async function handleData() {
      const gettedRooms = await api.getRooms();

      const gettedRoomsMap = gettedRooms.map(
        ({ lastMessage, ...item }): IRoomState => ({
          ...item,
          messages: [MessageMap.map(lastMessage)],
        })
      );
      addRoom(gettedRoomsMap);
      setLoading(false);
    }

    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AppTemplate
      headerBar={<AppBar />}
      sideBar={<SideBarApp data={roomMappedForSideBar} />}
      chat={<Chat />}
      frienships={<Frienships />}
    />
  );
};
