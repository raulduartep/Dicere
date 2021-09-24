import { getRepository, Repository } from 'typeorm';

import { ICreateInvitationGroupDTO } from '@modules/chat/dtos/ICreateInvitationGroupDTO';
import { IEnumDecisionInvitationGroup } from '@modules/chat/entities/IInvitationGroup';
import { TypeORMInvitationGroup } from '@modules/chat/entities/implementations/typeorm/TypeORMInvitationGroup';

import { IInvitationsGroupsRepository } from '../../IInvitationsGroupsRepository';

export class TypeORMInvitationsGroupsRepository
  implements IInvitationsGroupsRepository {
  private readonly repository: Repository<TypeORMInvitationGroup>;

  constructor() {
    this.repository = getRepository(TypeORMInvitationGroup);
  }

  async create(
    data: ICreateInvitationGroupDTO
  ): Promise<TypeORMInvitationGroup> {
    const invitationGroup = this.repository.create(data);

    await this.repository.save(invitationGroup);

    return invitationGroup;
  }

  async findById(id: string): Promise<TypeORMInvitationGroup> {
    const invitationGroup = await this.repository.findOne(id);

    return invitationGroup;
  }

  async findUndecided({
    userId,
    groupId,
    friendId,
  }: {
    userId: string;
    friendId: string;
    groupId: string;
  }): Promise<TypeORMInvitationGroup> {
    const invitationGroup = await this.repository.findOne({
      where: {
        friendId,
        groupId,
        userId,
        decision: null,
      },
    });

    return invitationGroup;
  }

  async decided({
    id,
    decision,
  }: {
    id: string;
    decision: IEnumDecisionInvitationGroup;
  }): Promise<void> {
    await this.repository.update(id, { decision });
  }
}
