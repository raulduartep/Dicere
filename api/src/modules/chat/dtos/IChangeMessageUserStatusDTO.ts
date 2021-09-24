import { IMessageStatusEnum } from '../entities/IMessageUserStatus';

export type IChangeMessageUserStatusDTO = {
  messageId: string;
  userId: string;
  status: IMessageStatusEnum;
};
