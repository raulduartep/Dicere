import { IUserMapForPublic } from '@modules/users/mappers/UserMap';

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
  user: IUserMapForPublic;
  createdAt: Date;
  statusByUser: { userId: string; status: IMessageStatusEnum }[];
} & (IMessageTextMap | IMessageMediaMap);

export class MessageMap {
  static map(
    {
      message,
      messageContent,
      messageUserStatus,
    }: IMessageResponse<IMessageMedia | IMessageText>,
    user: IUserMapForPublic
  ): IMessageMap {
    const messageMap = {
      id: message.id,
      user,
      createdAt: message.createdAt,
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
    messages: {
      message: IMessageResponse<IMessageMedia | IMessageText>;
      user: IUserMapForPublic;
    }[]
  ): IMessageMap[] {
    const messagesMap = messages.map(({ message, user }) =>
      MessageMap.map(message, user)
    );

    return messagesMap;
  }
}
