export enum IMessageStatusEnum {
  NOT_RECEIVED = 'not_received',
  RECEIVED = 'received',
  VIEWED = 'viewed',
}

export interface IMessageUserStatus {
  userId: string;

  messageId: string;

  status: IMessageStatusEnum;
}
