import { inject, injectable } from 'tsyringe';

import {
  FrienshipRequestMap,
  IFriendshipRequestMap,
} from '@modules/users/mappers/FriendshipRequestMap';
import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetPendingsFriendshipsError } from './GetPendingsFriendshipsError';

type PendingsFriendshipWithFriend = {
  friend: IUserMapForPublic;
  friendshipRequest: IFriendshipRequestMap;
};

type IRequest = {
  userId: string;
};

type IResponse = {
  receivedPendingsFriendships: PendingsFriendshipWithFriend[];
  sentPendingsFriendships: PendingsFriendshipWithFriend[];
};

@injectable()
export class GetPendingsFriendshipsUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FriendshipsRepository')
    private friendshipsRepository: IFriendshipsRepository
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new GetPendingsFriendshipsError.UserDoesNotExist();
    }

    const sentPendingsFriendships = await this.friendshipsRepository.getPendingsSentFriendshipsByUser(
      userId
    );

    const sentPendingsFriendshipsWithUsers = await Promise.all(
      sentPendingsFriendships.map(async friendshipRequest => {
        const friend = await this.usersRepository.findById(
          friendshipRequest.friendId
        );

        return {
          friend: UserMap.mapForPublic(friend),
          friendshipRequest: FrienshipRequestMap.map(friendshipRequest),
        };
      })
    );

    const receivedPendingsFriendships = await this.friendshipsRepository.getPendingsReceivedFriendshipsByUser(
      userId
    );

    const receivedPendingsFriendshipsWithUser = await Promise.all(
      receivedPendingsFriendships.map(async friendshipRequest => {
        const friend = await this.usersRepository.findById(
          friendshipRequest.userId
        );

        return {
          friend: UserMap.mapForPublic(friend),
          friendshipRequest: FrienshipRequestMap.map(friendshipRequest),
        };
      })
    );

    return {
      receivedPendingsFriendships: receivedPendingsFriendshipsWithUser,
      sentPendingsFriendships: sentPendingsFriendshipsWithUsers,
    };
  }
}
