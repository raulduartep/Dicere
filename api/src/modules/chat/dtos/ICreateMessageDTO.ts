import { IMessageTypeEnum } from '../entities/IMessage';
import { IMessageMediaTypeEnum } from '../entities/IMessageMedia';

export type ICreateMessageMediaDTO = {
  creatorUserId: string;
  roomId: string;
  forUsers: string[];
  mediaPath: string;
  typeMessage: IMessageTypeEnum.MEDIA;
  typeMedia: IMessageMediaTypeEnum;
};

export type ICreateMessageTextDTO = {
  creatorUserId: string;
  roomId: string;
  forUsers: string[];
  typeMessage: IMessageTypeEnum.TEXT;
  content: string;
};
