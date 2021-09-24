import { ICreateInvitationGroupDTO } from '@modules/chat/dtos/ICreateInvitationGroupDTO';
import {
  IInvitationGroup,
  IEnumDecisionInvitationGroup,
} from '@modules/chat/entities/IInvitationGroup';
import { InMemoryInvitationGroup } from '@modules/chat/entities/implementations/inMemory/InMemoryInvitationGroup';

import { IInvitationsGroupsRepository } from '../../IInvitationsGroupsRepository';

export class InMemoryInvitationsGroupsRepository
  implements IInvitationsGroupsRepository {
  private invitationsGroups: InMemoryInvitationGroup[] = [];

  async create(
    data: ICreateInvitationGroupDTO
  ): Promise<InMemoryInvitationGroup> {
    const invitationGroup = new InMemoryInvitationGroup(data);

    this.invitationsGroups.push(invitationGroup);

    return invitationGroup;
  }

  async findById(id: string): Promise<IInvitationGroup> {
    const invitationGroup = this.invitationsGroups.find(
      invitationGroup => invitationGroup.id === id
    );

    return invitationGroup;
  }

  async findUndecided({
    friendId,
    groupId,
    userId,
  }: {
    userId: string;
    friendId: string;
    groupId: string;
  }): Promise<IInvitationGroup> {
    const invitationGroup = this.invitationsGroups.find(
      invitationGroup =>
        invitationGroup.userId === userId &&
        invitationGroup.friendId === friendId &&
        invitationGroup.groupId === groupId
    );

    return invitationGroup;
  }

  async decided({
    decision,
    id,
  }: {
    id: string;
    decision: IEnumDecisionInvitationGroup;
  }): Promise<void> {
    const invitationGroup = this.invitationsGroups.find(
      invitationGroup => invitationGroup.id === id
    );

    invitationGroup.decision = decision;
  }
}
