import { ICreateRoomUserDTO } from '@modules/chat/dtos/ICreateRoomUserDTO';
import { InMemoryRoomUser } from '@modules/chat/entities/implementations/inMemory/InMemoryRoomUser';

import { IRoomsUsersRepository } from '../../IRoomsUsersRepository';

export class InMemoryRoomsUsersRepository implements IRoomsUsersRepository {
  private roomsUsers: InMemoryRoomUser[] = [];

  async create(data: ICreateRoomUserDTO): Promise<InMemoryRoomUser> {
    const roomUser = new InMemoryRoomUser(data);

    this.roomsUsers.push(roomUser);

    return roomUser;
  }

  async findByRoomAndUser({
    userId,
    roomId,
  }: {
    userId: string;
    roomId: string;
  }): Promise<InMemoryRoomUser> {
    const roomUser = this.roomsUsers.find(
      roomUser => roomUser.roomId === roomId && roomUser.userId === userId
    );

    return roomUser;
  }

  async getByUserId(userId: string): Promise<InMemoryRoomUser[]> {
    const roomsUser = this.roomsUsers.filter(
      roomUser => roomUser.userId === userId
    );

    return roomsUser;
  }

  async getByRoomId(roomId: string): Promise<InMemoryRoomUser[]> {
    const roomUsers = this.roomsUsers.filter(
      roomUser => roomUser.roomId === roomId
    );

    return roomUsers;
  }
}
