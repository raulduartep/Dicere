import { inject, injectable } from 'tsyringe';

import { IRoomUser } from '@modules/chat/entities/IRoomUser';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateRoomUserError } from './CreateRoomUserError';

type IRequest = {
  userId: string;
  roomId: string;
};

@injectable()
export class CreateRoomUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository
  ) {}

  async execute({ userId, roomId }: IRequest): Promise<IRoomUser> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new CreateRoomUserError.UserDoesNotExist();
    }

    const room = await this.roomsRepository.findById(roomId);

    if (!room) {
      throw new CreateRoomUserError.RoomDoesNotExist();
    }

    const userAlreadyInRoom = await this.roomsUsersRepository.findByRoomAndUser(
      {
        roomId,
        userId: user.id,
      }
    );

    if (userAlreadyInRoom) {
      throw new CreateRoomUserError.UserAlreadyInRoom();
    }

    const roomUser = await this.roomsUsersRepository.create({
      userId: user.id,
      roomId: room.id,
    });

    return roomUser;
  }
}
