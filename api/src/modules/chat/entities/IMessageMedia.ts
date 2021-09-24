export enum IMessageMediaTypeEnum {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
}

export interface IMessageMedia {
  messageId: string;

  mediaPath: string;

  type: IMessageMediaTypeEnum;
}
