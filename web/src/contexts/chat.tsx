import React, { createContext, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type IMessageStatus =
  | 'not_received_by_api'
  | 'received_by_api'
  | 'received_by_users'
  | 'viewed_by_users';
export type IMessageMediaType = 'image' | 'video' | 'audio';
export type IRoomType = 'group' | 'private';
export type IMessageType = 'text' | 'media';

export type IMessage<T = IMessageText | IMessageMedia> = {
  status: IMessageStatus;
  id: string;
  user: IUser;
  date: string;
} & T;

export type IMessageText = {
  type: 'text';
  content: string;
};

export type IMessageMedia = {
  type: 'media';
  mediaName: string;
  loadedMediaUrl: string | undefined;
  typeMedia: IMessageMediaType;
};

export type IRoom = {
  id: string;
  name: string;
  picture: string;
  type: IRoomType;
};

export type IUser = {
  id: string;
  name: string;
  picture: string;
};

export type IRoomState = IRoom & { messages: IMessage[] };

interface ChatContextData {
  rooms: IRoomState[];
  getRoom(roomId: string): IRoomState | undefined;
  addMessage(roomId: string, data: IMessage | IMessage[]): void;
  updateMessage(data: IUpdateMessage): void;
  addRoom(data: IRoomState | IRoomState[]): void;
}

interface IUpdateMessage {
  messageId: string;
  roomId: string;
  data: Partial<IMessage>;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  const [rooms, setRooms] = useState<IRoomState[]>([]);

  const addMessage = useCallback(
    (roomId: string, data: IMessage | IMessage[]) => {
      const state = rooms;

      const roomIndex = state.findIndex(item => item.id === roomId);

      if (roomIndex !== -1) {
        const room = state[roomIndex];
        state.splice(roomIndex, 1);

        if (data instanceof Array) {
          data.forEach(item => {
            const repeatedIndex = room.messages.findIndex(
              ({ id }) => id === item.id
            );

            if (repeatedIndex !== -1) {
              room.messages.splice(repeatedIndex, 1);
            }
          });

          room.messages = [...data, ...room.messages];
        } else {
          const repeatedIndex = room.messages.findIndex(
            ({ id }) => id === data.id
          );

          if (repeatedIndex !== -1) {
            room.messages.splice(repeatedIndex, 1);
          }

          room.messages = [data, ...room.messages];
        }

        setRooms([room, ...state]);
      }
    },
    [rooms]
  );

  const updateMessage = useCallback(
    ({ roomId, data, messageId }: IUpdateMessage) => {
      const state = rooms;

      const room = state.find(item => item.id === roomId);

      if (room) {
        const message = room.messages.find(item => item.id === messageId);

        if (message) {
          Object.assign(message, data);

          setRooms(state);
        }
      }
    },
    [rooms]
  );

  const getRoom = useCallback(
    (roomId: string) => {
      const room = rooms.find(item => item.id === roomId);

      return room;
    },
    [rooms]
  );

  const addRoom = useCallback(
    (data: IRoomState | IRoomState[]) => {
      if (data instanceof Array) {
        setRooms([...data, ...rooms]);
        return;
      }

      setRooms([data, ...rooms]);
    },
    [rooms]
  );

  return (
    <ChatContext.Provider
      value={{ rooms, getRoom, addMessage, updateMessage, addRoom }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
