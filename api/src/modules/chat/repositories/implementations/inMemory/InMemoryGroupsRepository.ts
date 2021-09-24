import { ICreateGroupDTO } from '@modules/chat/dtos/ICreateGroupDTO';
import { IGroup } from '@modules/chat/entities/IGroup';
import { InMemoryGroup } from '@modules/chat/entities/implementations/inMemory/InMemoryGroup';

import { IGroupsRepository } from '../../IGroupsRepository';

export class InMemoryGroupsRepository implements IGroupsRepository {
  private groups: InMemoryGroup[] = [];

  async create(data: ICreateGroupDTO): Promise<InMemoryGroup> {
    const group = new InMemoryGroup(data);

    this.groups.push(group);

    return group;
  }

  async findById(id: string): Promise<InMemoryGroup> {
    const group = this.groups.find(group => group.id === id);

    return group;
  }

  async findByRoomId(roomId: string): Promise<IGroup> {
    const group = this.groups.find(group => group.roomId === roomId);

    return group;
  }
}
