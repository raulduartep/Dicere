import { ICreateInvitationGroupDTO } from '../dtos/ICreateInvitationGroupDTO';
import {
  IEnumDecisionInvitationGroup,
  IInvitationGroup,
} from '../entities/IInvitationGroup';

export interface IInvitationsGroupsRepository {
  create(data: ICreateInvitationGroupDTO): Promise<IInvitationGroup>;
  findById(id: string): Promise<IInvitationGroup>;
  findUndecided(data: {
    userId: string;
    friendId: string;
    groupId: string;
  }): Promise<IInvitationGroup>;
  decided(data: {
    id: string;
    decision: IEnumDecisionInvitationGroup;
  }): Promise<void>;
}
