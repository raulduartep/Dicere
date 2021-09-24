import { IChangeMessageUserStatusDTO } from '../dtos/IChangeMessageUserStatusDTO';
import {
  ICreateMessageMediaDTO,
  ICreateMessageTextDTO,
} from '../dtos/ICreateMessageDTO';
import { IGetMessageByRoomIdDTO } from '../dtos/IGetMessageByRoomIdDTO';
import { IMessage } from '../entities/IMessage';
import { IMessageMedia } from '../entities/IMessageMedia';
import { IMessageText } from '../entities/IMessageText';
import { IMessageUserStatus } from '../entities/IMessageUserStatus';
import { IRoomMessage } from '../entities/IRoomMessage';

export type IMessageResponse<T = IMessageText | IMessageMedia> = {
  message: IMessage;
  messageContent: T;
  roomMessage: IRoomMessage;
  messageUserStatus: IMessageUserStatus[];
};
export interface IMessagesRepository {
  create(
    data: ICreateMessageMediaDTO
  ): Promise<IMessageResponse<IMessageMedia>>;
  create(data: ICreateMessageTextDTO): Promise<IMessageResponse<IMessageText>>;
  create(
    data: ICreateMessageTextDTO | ICreateMessageMediaDTO
  ): Promise<IMessageResponse>;

  getByRoomId(data: IGetMessageByRoomIdDTO): Promise<IMessageResponse[]>;
  getLastByRoomId(roomId: string): Promise<IMessageResponse>;

  findByMediaPath(mediaPath: string): Promise<IMessageResponse<IMessageMedia>>;
  findById(id: string): Promise<IMessageResponse>;
  changeMessageUserStatus(data: IChangeMessageUserStatusDTO): Promise<void>;
}
