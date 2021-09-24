import { getRepository, Repository } from 'typeorm';

import { ICreateRoomDTO } from '@modules/chat/dtos/ICreateRoomDTO';
import { TypeORMRoom } from '@modules/chat/entities/implementations/typeorm/TypeORMRoom';

import { IRoomsRepository } from '../../IRoomsRepository';

export class TypeORMRoomsRepository implements IRoomsRepository {
  private readonly repository: Repository<TypeORMRoom>;

  constructor() {
    this.repository = getRepository(TypeORMRoom);
  }

  async create(data: ICreateRoomDTO): Promise<TypeORMRoom> {
    const room = this.repository.create(data);

    await this.repository.save(room);

    return room;
  }

  async findById(id: string): Promise<TypeORMRoom> {
    const room = await this.repository.findOne(id);

    return room;
  }
}
