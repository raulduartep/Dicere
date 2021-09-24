import ChatContext from 'contexts/chat';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useContext } from 'react';

// import { v4 as uuid } from 'uuid';

export type ApiUser = {
  id: string;
  name: string;
  picture: string;
};

export type ApiMessageMediaType = 'image' | 'video' | 'audio';
export type ApiMessageStatusByUser = 'not_received' | 'received' | 'viewed';
export type ApiRoomType = 'group' | 'private';

export type ApiMessageText = {
  type: 'text';
  content: string;
};

export type ApiMessageMedia = {
  type: 'media';
  mediaPath: string;
  typeMedia: ApiMessageMediaType;
};

export type ApiMessage<T = ApiMessageText | ApiMessageMedia> = {
  id: string;
  user: ApiUser;
  createdAt: string;
  roomId: string;
  statusByUser: {
    userId: string;
    status: ApiMessageStatusByUser;
  }[];
} & T;

export type ApiRoom = {
  id: string;
  name: string;
  picture: string;
  type: ApiRoomType;
};

// type IMessageToUpdate = (
//   | IMessage<IMessageText>
//   | (IMessage<IMessageMedia> & { file: File })
// ) & { roomId: string };

// type IApiResponseChatState = {
//   room: IApiResponseRoom;
//   lastMessage: IApiResponseMessage;
// }[];

dayjs.extend(utc);

export const useChat = () => {
  const { rooms, getRoom, addRoom } = useContext(ChatContext);
  // const [messageToUpdate, setMessageToUpdate] = useState<IMessageToUpdate>();
  // const { socket } = useSocket();

  // function sendMessageText({
  //   type,
  //   creatorUserId,
  //   content,
  //   roomId,
  // }: IMessageText & {
  //   roomId: string;
  //   creatorUserId: string;
  // }) {
  //   const message = {
  //     id: `tempory-${uuid()}`,
  //     statusByUser: [],
  //     status: IMessageStatusEnum.NOT_RECEIVED_BY_API,
  //     creatorUserId,
  //     createdAt: dayjs.utc().format(),
  //     content,
  //     type,
  //     roomId,
  //   };

  //   addMessage(roomId, message);
  //   setMessageToUpdate(message);
  // }

  // function sendMessageMedia({
  //   typeMedia,
  //   type,
  //   url,
  //   creatorUserId,
  //   roomId,
  //   file,
  // }: IMessageMedia & {
  //   roomId: string;
  //   creatorUserId: string;
  //   file: File;
  // }) {
  //   const message = {
  //     id: `tempory-${uuid()}`,
  //     statusByUser: [],
  //     status: IMessageStatusEnum.NOT_RECEIVED_BY_API,
  //     creatorUserId,
  //     createdAt: dayjs.utc().format(),
  //     type,
  //     url,
  //     typeMedia,
  //     file,
  //     roomId,
  //   };

  //   addMessage(roomId, message);
  //   setMessageToUpdate(message);
  // }

  // function getMessagesFromApi(page: number, roomId: string) {
  //   return new Promise<IMessage[]>((resolve, reject) => {
  //     socket?.emit(
  //       'client:getMessage',
  //       {
  //         body: {
  //           roomId,
  //           page,
  //         },
  //       },
  //       (err: ApiError, data: IApiResponseMessage[]) => {
  //         if (!err) {
  //           const refactoredData = data.map(
  //             (item): IMessage => ({
  //               ...item,
  //               status: IMessageStatusEnum.RECEIVED_BY_API,
  //             })
  //           );

  //           addMessage(roomId, refactoredData);
  //           resolve(refactoredData);
  //           return;
  //         }
  //         reject(err);
  //       }
  //     );
  //   });
  // }

  // function getRoomsFromApi() {
  //   return new Promise<IRoom[]>(resolve => {
  //     socket?.on('server:chatState', (data: IApiResponseChatState) => {
  //       const refactoredData = data.map(
  //         ({ lastMessage, room }): IRoom => ({
  //           ...room,
  //           messages: [
  //             {
  //               ...lastMessage,
  //               status: IMessageStatusEnum.RECEIVED_BY_API,
  //             },
  //           ],
  //         })
  //       );

  //       addRoom(refactoredData);
  //       resolve(refactoredData);
  //     });
  //   });
  // }

  // useEffect(() => {
  //   if (messageToUpdate) {
  //     if (messageToUpdate.type === IMessageTypeEnum.TEXT) {
  //       socket?.emit(
  //         'client:sendMessage',
  //         {
  //           body: {
  //             roomId: messageToUpdate.roomId,
  //             typeMessage: messageToUpdate.type,
  //             content: messageToUpdate.content,
  //           },
  //         },
  //         (error: ApiError, data: IApiResponseMessage<IMessageText>) => {
  //           if (!error) {
  //             updateMessage({
  //               roomId: data.roomId,
  //               messageId: messageToUpdate.id,
  //               data: {
  //                 ...data,
  //                 status: IMessageStatusEnum.RECEIVED_BY_API,
  //               },
  //             });
  //             setMessageToUpdate(undefined);
  //           }
  //         }
  //       );
  //       return;
  //     }

  //     socket?.emit(
  //       'client:sendMessage',
  //       {
  //         body: {
  //           roomId: messageToUpdate.roomId,
  //           typeMessage: messageToUpdate.type,
  //           typeMedia: messageToUpdate.typeMedia,
  //         },
  //         file: {
  //           name: messageToUpdate.file.name,
  //           buffer: messageToUpdate.file,
  //           size: messageToUpdate.file.size,
  //           type: messageToUpdate.file.type,
  //           lasModified: messageToUpdate.file.lastModified,
  //         },
  //       },
  //       (error: ApiError, data: IApiResponseMessage<IMessageText>) => {
  //         if (!error) {
  //           updateMessage({
  //             roomId: data.roomId,
  //             messageId: messageToUpdate.id,
  //             data: {
  //               ...data,
  //               status: IMessageStatusEnum.RECEIVED_BY_API,
  //             },
  //           });
  //           setMessageToUpdate(undefined);
  //         }
  //       }
  //     );
  //   }
  // }, [messageToUpdate, socket, updateMessage]);

  return {
    // sendMessageText,
    rooms,
    getRoom,
    addRoom,
    // getRoomsFromApi,
    // getMessagesFromApi,
    // sendMessageMedia,
  };
};
