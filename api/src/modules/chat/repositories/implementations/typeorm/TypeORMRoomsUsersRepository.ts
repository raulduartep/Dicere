import { getRepository, Repository } from 'typeorm';

import { ICreateRoomUserDTO } from '@modules/chat/dtos/ICreateRoomUserDTO';
import { TypeORMRoomUser } from '@modules/chat/entities/implementations/typeorm/TypeORMRoomUser';
import { IRoomUser } from '@modules/chat/entities/IRoomUser';

import { IRoomsUsersRepository } from '../../IRoomsUsersRepository';

export class TypeORMRoomsUsersRepository implements IRoomsUsersRepository {
  private readonly repository: Repository<TypeORMRoomUser>;

  constructor() {
    this.repository = getRepository(TypeORMRoomUser);
  }

  async create(data: ICreateRoomUserDTO): Promise<IRoomUser> {
    const roomUser = this.repository.create(data);

    await this.repository.save(roomUser);

    return roomUser;
  }

  async findByRoomAndUser({
    roomId,
    userId,
  }: {
    userId: string;
    roomId: string;
  }): Promise<IRoomUser> {
    const roomUser = await this.repository.findOne({
      where: {
        userId,
        roomId,
      },
    });

    return roomUser;
  }

  async getByUserId(userId: string): Promise<IRoomUser[]> {
    const roomsUser = await this.repository.find({
      where: {
        userId,
      },
    });

    return roomsUser;
  }

  async getByRoomId(roomId: string): Promise<IRoomUser[]> {
    const roomUsers = await this.repository.find({
      where: {
        roomId,
      },
    });

    return roomUsers;
  }
}
