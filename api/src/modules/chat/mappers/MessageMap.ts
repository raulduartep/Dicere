import { IMessageTypeEnum } from '../entities/IMessage';
import {
  IMessageMedia,
  IMessageMediaTypeEnum,
} from '../entities/IMessageMedia';
import { IMessageText } from '../entities/IMessageText';
import { IMessageStatusEnum } from '../entities/IMessageUserStatus';
import { IMessageResponse } from '../repositories/IMessagesRepository';

type IMessageTextMap = {
  type: IMessageTypeEnum.TEXT;
  content: string;
};

type IMessageMediaMap = {
  type: IMessageTypeEnum.MEDIA;
  mediaPath: string;
  typeMedia: IMessageMediaTypeEnum;
};

export type IMessageMap = {
  id: string;
  creatorUserId: string;
  createdAt: Date;
  updatedAt: Date;
  statusByUser: { userId: string; status: IMessageStatusEnum }[];
  roomId: string;
} & (IMessageTextMap | IMessageMediaMap);

export class MessageMap {
  static map({
    message,
    messageContent,
    messageUserStatus,
    roomMessage,
  }: IMessageResponse<IMessageMedia | IMessageText>): IMessageMap {
    const messageMap = {
      id: message.id,
      creatorUserId: message.userId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      roomId: roomMessage.roomId,
      statusByUser: messageUserStatus.map(messageStatus => ({
        userId: messageStatus.userId,
        status: messageStatus.status,
      })),
    };

    if (message.type === 'text') {
      const messageContentText = messageContent as IMessageText;

      return {
        ...messageMap,
        type: IMessageTypeEnum.TEXT,
        content: messageContentText.content,
      };
    }

    const messageContentMedia = messageContent as IMessageMedia;

    return {
      ...messageMap,
      type: IMessageTypeEnum.MEDIA,
      mediaPath: messageContentMedia.mediaPath,
      typeMedia: messageContentMedia.type,
    };
  }

  static mapMany(
    messages: IMessageResponse<IMessageMedia | IMessageText>[]
  ): IMessageMap[] {
    const messagesMap = messages.map(message => MessageMap.map(message));

    return messagesMap;
  }
}
