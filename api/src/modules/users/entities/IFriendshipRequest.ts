export enum IEnumDecisionFriendshipRequest {
  ACCEPTED = 'accepted',
  REJECT = 'reject',
}
export interface IFriendshipRequest {
  id: string;

  userId: string;

  friendId: string;

  decision: IEnumDecisionFriendshipRequest;

  deleted: boolean;

  createdAt: Date;
}
