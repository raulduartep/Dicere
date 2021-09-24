import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

import { IMessageMap, MessageMap } from '@modules/chat/mappers/MessageMap';
import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetMessagesError } from './GetMessagesError';

type IRequest = {
  userId: string;
  roomId: string;
  page: number;
};

@injectable()
export class GetMessagesUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ userId, roomId, page }: IRequest): Promise<IMessageMap[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new GetMessagesError.UserDoesNotExist();
    }

    const room = await this.roomsRepository.findById(roomId);

    if (!room) {
      throw new GetMessagesError.RoomDoesNotExist();
    }

    const userInRoom = !!(await this.roomsUsersRepository.findByRoomAndUser({
      roomId,
      userId,
    }));

    if (!userInRoom) {
      throw new GetMessagesError.UserIsNotInRoom();
    }

    const messages = await this.messagesRepository.getByRoomId({
      roomId,
      page,
    });

    return MessageMap.mapMany(messages);
  }
}
