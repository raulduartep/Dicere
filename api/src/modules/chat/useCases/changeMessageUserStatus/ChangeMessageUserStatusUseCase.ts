import { inject, injectable } from 'tsyringe';

import { IMessageMedia } from '@modules/chat/entities/IMessageMedia';
import { IMessageText } from '@modules/chat/entities/IMessageText';
import { IMessageStatusEnum } from '@modules/chat/entities/IMessageUserStatus';
import {
  IMessagesRepository,
  IMessageResponse,
} from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { ChangeMessageUserStatusError } from './ChangeMessageUserStatusError';

type IRequest = {
  userId: string;
  messageId: string;
  status: IMessageStatusEnum;
};

@injectable()
export class ChangeMessageUserStatusUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository
  ) {}

  async execute({
    messageId,
    userId,
    status,
  }: IRequest): Promise<IMessageResponse<IMessageText | IMessageMedia>> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ChangeMessageUserStatusError.UserDoesNotExist();
    }

    const message = await this.messagesRepository.findById(messageId);

    if (!message) {
      throw new ChangeMessageUserStatusError.MessageDoesNotExist();
    }

    const userInRoom = await this.roomsRepository.verifyUser({
      roomId: message.roomMessage.roomId,
      userId,
    });

    if (!userInRoom) {
      throw new ChangeMessageUserStatusError.UserIsNotInRoom();
    }

    await this.messagesRepository.changeMessageUserStatus({
      messageId,
      userId,
      status,
    });

    return message;
  }
}
