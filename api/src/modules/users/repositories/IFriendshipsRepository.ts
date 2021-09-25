import { ICreateFriendshipRequestDTO } from '../dtos/ICreateFriendshipRequestDTO';
import {
  IFriendshipRequest,
  IEnumDecisionFriendshipRequest,
} from '../entities/IFriendshipRequest';
import { IUserFriend } from '../entities/IUserFriend';

export type IAcceptFriendRequest = {
  decision: IEnumDecisionFriendshipRequest.ACCEPTED;
  friendshipUser: IUserFriend;
  friendshipFriend: IUserFriend;
  friendshipRequest: IFriendshipRequest;
};

export type IRejectFriendRequest = {
  decision: IEnumDecisionFriendshipRequest.REJECT;
  friendshipRequest: IFriendshipRequest;
};

export interface IFriendshipsRepository {
  createRequest(data: ICreateFriendshipRequestDTO): Promise<IFriendshipRequest>;

  findFriendship(data: {
    userId: string;
    friendId: string;
  }): Promise<IUserFriend>;

  getFriendshipsByUser(userId: string): Promise<IUserFriend[]>;

  findUndecidedRequest(data: {
    userId: string;
    friendId: string;
  }): Promise<IFriendshipRequest>;

  findRequestById(id: string): Promise<IFriendshipRequest>;

  decidedFriendRequest(data: {
    requestId: string;
    decision: IEnumDecisionFriendshipRequest.ACCEPTED;
  }): Promise<IAcceptFriendRequest>;
  decidedFriendRequest(data: {
    requestId: string;
    decision: IEnumDecisionFriendshipRequest.REJECT;
  }): Promise<IRejectFriendRequest>;
  decidedFriendRequest(data: {
    requestId: string;
    decision: IEnumDecisionFriendshipRequest;
  }): Promise<IAcceptFriendRequest | IRejectFriendRequest>;

  deleteFriendRequest(requestId: string): Promise<IFriendshipRequest>;
}
