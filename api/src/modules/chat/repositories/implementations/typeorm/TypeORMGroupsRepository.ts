import { getRepository, Repository } from 'typeorm';

import { ICreateGroupDTO } from '@modules/chat/dtos/ICreateGroupDTO';
import { IGroup } from '@modules/chat/entities/IGroup';
import { TypeORMGroup } from '@modules/chat/entities/implementations/typeorm/TypeORMGroup';

import { IGroupsRepository } from '../../IGroupsRepository';

export class TypeORMGroupsRepository implements IGroupsRepository {
  private readonly repository: Repository<TypeORMGroup>;

  constructor() {
    this.repository = getRepository(TypeORMGroup);
  }

  async create(data: ICreateGroupDTO): Promise<TypeORMGroup> {
    const group = this.repository.create(data);

    await this.repository.save(group);

    return group;
  }

  async findById(id: string): Promise<TypeORMGroup> {
    const group = await this.repository.findOne(id);

    return group;
  }

  async findByRoomId(roomId: string): Promise<IGroup> {
    const group = this.repository.findOne({ roomId });

    return group;
  }
}
