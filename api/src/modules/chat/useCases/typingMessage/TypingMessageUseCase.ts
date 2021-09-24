import { inject, injectable } from 'tsyringe';

import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { TypingMessageError } from './TypingMessageError';

type IRequest = {
  roomId: string;
  userId: string;
};

@injectable()
export class TypingMessageUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository
  ) {}

  async execute({ roomId, userId }: IRequest): Promise<IUserMapForPublic> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new TypingMessageError.UserDoesNotExist();
    }

    const room = !!(await this.roomsRepository.findById(roomId));

    if (!room) {
      throw new TypingMessageError.RoomDoesNotExist();
    }

    const userInRoom = !!(await this.roomsUsersRepository.findByRoomAndUser({
      roomId,
      userId,
    }));

    if (!userInRoom) {
      throw new TypingMessageError.UserNotInRoom();
    }

    return UserMap.mapForPublic(user);
  }
}
