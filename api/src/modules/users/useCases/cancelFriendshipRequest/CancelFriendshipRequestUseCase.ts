import { inject, injectable } from 'tsyringe';

import { IIoConnection } from '@modules/users/entities/IIoConnection';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IIoConnectionsRepository } from '@modules/users/repositories/IIoConnectionsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CancelFriendshipRequestError } from './CancelFriendshipRequestError';

type IRequest = {
  userId: string;
  friendshipRequestId: string;
};

type IResponse = {
  friendIoConnection: IIoConnection;
};

@injectable()
export class CancelFriendshipRequestUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FriendshipsRepository')
    private friendshipsRepository: IFriendshipsRepository,

    @inject('IoConnectionsRepository')
    private ioConnectionsRepository: IIoConnectionsRepository
  ) {}

  async execute({ friendshipRequestId, userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new CancelFriendshipRequestError.UserDoesNotExist();
    }

    const friendshipRequest = await this.friendshipsRepository.findRequestById(
      friendshipRequestId
    );

    if (!friendshipRequestId) {
      throw new CancelFriendshipRequestError.FriendshipRequestDoesNotExist();
    }

    if (friendshipRequest.userId !== userId) {
      throw new CancelFriendshipRequestError.UserNotAllowedToDeleted();
    }

    if (friendshipRequest.decision) {
      throw new CancelFriendshipRequestError.FriendshipRequestAlreadyDecided();
    }

    if (friendshipRequest.deleted) {
      throw new CancelFriendshipRequestError.FriendshipRequestAlreadyDeleted();
    }

    await this.friendshipsRepository.deleteFriendRequest(friendshipRequestId);

    const friendIoConnection = await this.ioConnectionsRepository.findByUserId(
      friendshipRequest.friendId
    );

    return {
      friendIoConnection,
    };
  }
}
