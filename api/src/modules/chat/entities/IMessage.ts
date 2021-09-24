export enum IMessageTypeEnum {
  TEXT = 'text',
  MEDIA = 'media',
}
export interface IMessage {
  id: string;

  userId: string;

  type: IMessageTypeEnum;

  deleted: boolean;

  createdAt: Date;

  updatedAt: Date;
}
