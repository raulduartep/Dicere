import { ICreateFriendshipRequestDTO } from '@modules/users/dtos/ICreateFriendshipRequestDTO';
import {
  IEnumDecisionFriendshipRequest,
  IFriendshipRequest,
} from '@modules/users/entities/IFriendshipRequest';
import { InMemoryFriendshipRequest } from '@modules/users/entities/implementations/inMemory/InMemoryFriendshipRequest';
import { InMemoryUserFriend } from '@modules/users/entities/implementations/inMemory/InMemoryUserFriend';
import { IUserFriend } from '@modules/users/entities/IUserFriend';

import {
  IAcceptFriendRequest,
  IFriendshipsRepository,
  IRejectFriendRequest,
} from '../../IFriendshipsRepository';

export class InMemoryFriendshipsRepository implements IFriendshipsRepository {
  private friendshipsRequest: InMemoryFriendshipRequest[] = [];
  private usersFriends: InMemoryUserFriend[] = [];

  async createRequest(
    data: ICreateFriendshipRequestDTO
  ): Promise<InMemoryFriendshipRequest> {
    const frienshipRequest = new InMemoryFriendshipRequest(data);

    this.friendshipsRequest.push(frienshipRequest);

    return frienshipRequest;
  }

  async findUndecidedRequest({
    friendId,
    userId,
  }: {
    userId: string;
    friendId: string;
  }): Promise<InMemoryFriendshipRequest> {
    const friendshipRequest = this.friendshipsRequest.find(
      userFriend =>
        userFriend.userId === userId &&
        userFriend.friendId === friendId &&
        userFriend.decision === null
    );

    return friendshipRequest;
  }

  async findFriendship({
    friendId,
    userId,
  }: {
    userId: string;
    friendId: string;
  }): Promise<IUserFriend> {
    const friendship = this.usersFriends.find(
      userFriend =>
        userFriend.userId === userId && userFriend.friendId === friendId
    );

    return friendship;
  }

  async findRequestById(id: string): Promise<InMemoryFriendshipRequest> {
    const friendshipRequest = this.friendshipsRequest.find(
      userFriend => userFriend.id === id
    );

    return friendshipRequest;
  }

  decidedFriendRequest(data: {
    requestId: string;
    decision: IEnumDecisionFriendshipRequest.ACCEPTED;
  }): Promise<IAcceptFriendRequest>;
  decidedFriendRequest(data: {
    requestId: string;
    decision: IEnumDecisionFriendshipRequest.REJECT;
  }): Promise<IRejectFriendRequest>;
  async decidedFriendRequest({
    decision,
    requestId,
  }: {
    requestId: string;
    decision: IEnumDecisionFriendshipRequest;
  }): Promise<IAcceptFriendRequest | IRejectFriendRequest> {
    const friendshipRequest = this.friendshipsRequest.find(
      userFriend => userFriend.id === requestId
    );

    friendshipRequest.decision = decision;

    if (decision === IEnumDecisionFriendshipRequest.ACCEPTED) {
      const friendshipUser = new InMemoryUserFriend({
        friendId: friendshipRequest.friendId,
        userId: friendshipRequest.userId,
      });
      const friendshipFriend = new InMemoryUserFriend({
        friendId: friendshipRequest.userId,
        userId: friendshipRequest.friendId,
      });

      this.usersFriends.push(friendshipUser, friendshipFriend);

      return {
        decision,
        friendshipFriend,
        friendshipUser,
        friendshipRequest,
      };
    }

    return {
      decision,
      friendshipRequest,
    };
  }

  async deleteFriendRequest(requestId: string): Promise<IFriendshipRequest> {
    const friendshipRequest = this.friendshipsRequest.find(
      request => request.id === requestId
    );

    friendshipRequest.deleted = true;

    return friendshipRequest;
  }
}
