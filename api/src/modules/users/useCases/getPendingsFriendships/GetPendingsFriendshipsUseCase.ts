import { inject, injectable } from 'tsyringe';

import { IFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';
import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetPendingsFriendshipsError } from './GetPendingsFriendshipsError';

type PendingsFriendshipWithFriend = {
  friend: IUserMapForPublic;
  friendship: IFriendshipRequest;
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
      sentPendingsFriendships.map(async friendship => {
        const friend = await this.usersRepository.findById(friendship.friendId);

        return {
          friend: UserMap.mapForPublic(friend),
          friendship,
        };
      })
    );

    const receivedPendingsFriendships = await this.friendshipsRepository.getPendingsReceivedFriendshipsByUser(
      userId
    );

    const receivedPendingsFriendshipsWithUser = await Promise.all(
      receivedPendingsFriendships.map(async friendship => {
        const friend = await this.usersRepository.findById(friendship.userId);

        return {
          friend: UserMap.mapForPublic(friend),
          friendship,
        };
      })
    );

    return {
      receivedPendingsFriendships: receivedPendingsFriendshipsWithUser,
      sentPendingsFriendships: sentPendingsFriendshipsWithUsers,
    };
  }
}
