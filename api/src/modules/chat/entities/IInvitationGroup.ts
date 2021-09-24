export enum IEnumDecisionInvitationGroup {
  ACCEPTED = 'accepted',
  REJECT = 'reject',
}
export interface IInvitationGroup {
  id: string;

  userId: string;

  friendId: string;

  groupId: string;

  decision: IEnumDecisionInvitationGroup;

  createdAt: Date;
}
