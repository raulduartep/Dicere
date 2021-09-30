import { inject, injectable } from 'tsyringe';

import { IMessageMap, MessageMap } from '@modules/chat/mappers/MessageMap';
import { IRoomMap, RoomMap } from '@modules/chat/mappers/RoomMap';
import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetUserRoomsError } from './GetUserRoomsError';

type IRequest = {
  userId: string;
};

export type IResponse = {
  room: IRoomMap;
  lastMessage: IMessageMap;
};

@injectable()
export class GetUserRoomsUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new GetUserRoomsError.UserDoesNotExist();
    }

    const userRooms = await this.roomsUsersRepository.getByUserId(userId);

    const rooms = await Promise.all(
      userRooms.map(async userRoom => {
        const room = await this.roomsRepository.findById(userRoom.roomId);

        const lastMessage = await this.messagesRepository.getLastByRoomId(
          room.id
        );

        if (room.typeConversation === 'group') {
          const group = await this.groupsRepository.findByRoomId(room.id);

          return {
            room: RoomMap.mapGroup(room, group),
            lastMessage: lastMessage && MessageMap.map(lastMessage),
          };
        }

        const usersinRoom = await this.roomsUsersRepository.getByRoomId(
          room.id
        );

        const anotherUserInRoom = usersinRoom.find(
          user => user.userId !== userId
        );

        const anotherUser = await this.usersRepository.findById(
          anotherUserInRoom.userId
        );

        return {
          room: RoomMap.mapPrivate(room, anotherUser),
          lastMessage: lastMessage && MessageMap.map(lastMessage),
        };
      })
    );

    return rooms;
  }
}
