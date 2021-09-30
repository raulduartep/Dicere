import { inject, injectable } from 'tsyringe';

import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { RoomMap, IRoomMap } from '@modules/chat/mappers/RoomMap';
import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateGroupError } from './CreateGroupError';

type IRequest = {
  name: string;
  userId: string;
};

type IResponse = {
  room: IRoomMap;
  usersIn: IUserMapForPublic[];
  lastMessages: [];
};

@injectable()
export class CreateGroupUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository
  ) {}

  async execute({ name, userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new CreateGroupError.UserDoesNotExists();
    }

    const room = await this.roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group = await this.groupsRepository.create({
      name,
      roomId: room.id,
      adminId: userId,
    });

    await this.roomsUsersRepository.create({
      roomId: room.id,
      userId,
    });

    return {
      room: RoomMap.mapGroup(room, group),
      lastMessages: [],
      usersIn: [UserMap.mapForPublic(user)],
    };
  }
}
