import { getManager, getRepository, Repository } from 'typeorm';

import { ICreateFriendshipRequestDTO } from '@modules/users/dtos/ICreateFriendshipRequestDTO';
import {
  IEnumDecisionFriendshipRequest,
  IFriendshipRequest,
} from '@modules/users/entities/IFriendshipRequest';
import { TypeORMFriendshipRequest } from '@modules/users/entities/implementations/typeorm/TypeORMFriendshipRequest';
import { TypeORMUserFriend } from '@modules/users/entities/implementations/typeorm/TypeORMUserFriend';
import { IUserFriend } from '@modules/users/entities/IUserFriend';

import {
  IAcceptFriendRequest,
  IFriendshipsRepository,
  IRejectFriendRequest,
} from '../../IFriendshipsRepository';

export class TypeORMFriendshipsRepository implements IFriendshipsRepository {
  private readonly friendshipsRequestRepository: Repository<TypeORMFriendshipRequest>;
  private readonly usersFriendsRepository: Repository<TypeORMUserFriend>;

  constructor() {
    this.friendshipsRequestRepository = getRepository(TypeORMFriendshipRequest);
    this.usersFriendsRepository = getRepository(TypeORMUserFriend);
  }

  async createRequest(
    data: ICreateFriendshipRequestDTO
  ): Promise<TypeORMFriendshipRequest> {
    const friendshipRequest = this.friendshipsRequestRepository.create(data);

    await this.friendshipsRequestRepository.save(friendshipRequest);

    return friendshipRequest;
  }

  async findFriendship({
    userId,
    friendId,
  }: {
    userId: string;
    friendId: string;
  }): Promise<IUserFriend> {
    const friendship = await this.usersFriendsRepository.findOne({
      where: {
        friendId,
        userId,
      },
    });

    return friendship;
  }

  async findUndecidedRequest({
    friendId,
    userId,
  }: {
    userId: string;
    friendId: string;
  }): Promise<TypeORMFriendshipRequest> {
    const friendshipRequest = await this.friendshipsRequestRepository.findOne({
      where: {
        friendId,
        userId,
        decision: null,
      },
    });

    return friendshipRequest;
  }

  async findRequestById(id: string): Promise<TypeORMFriendshipRequest> {
    const friendshipRequest = await this.friendshipsRequestRepository.findOne(
      id
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
    const decidedFriendship = await getManager().transaction(
      async (
        entityManager
      ): Promise<IAcceptFriendRequest | IRejectFriendRequest> => {
        const friendshipsRequestRepository = entityManager.getRepository(
          TypeORMFriendshipRequest
        );
        const usersFriendsRepository = entityManager.getRepository(
          TypeORMUserFriend
        );

        const friendshipRequest = await this.friendshipsRequestRepository.findOne(
          requestId
        );

        await friendshipsRequestRepository.update(friendshipRequest.id, {
          decision,
        });

        friendshipRequest.decision = decision;

        if (decision === IEnumDecisionFriendshipRequest.ACCEPTED) {
          const friendshipUser = await usersFriendsRepository.save({
            friendId: friendshipRequest.friendId,
            userId: friendshipRequest.userId,
          });

          const friendshipFriend = await usersFriendsRepository.save({
            friendId: friendshipRequest.userId,
            userId: friendshipRequest.friendId,
          });

          return {
            decision,
            friendshipFriend,
            friendshipRequest,
            friendshipUser,
          };
        }

        return {
          decision,
          friendshipRequest,
        };
      }
    );

    return decidedFriendship;
  }

  async deleteFriendRequest(requestId: string): Promise<IFriendshipRequest> {
    const friendshipRequest = await this.friendshipsRequestRepository.findOne(
      requestId
    );

    await this.friendshipsRequestRepository.update(requestId, {
      deleted: true,
    });

    return {
      ...friendshipRequest,
      deleted: true,
    };
  }
}
