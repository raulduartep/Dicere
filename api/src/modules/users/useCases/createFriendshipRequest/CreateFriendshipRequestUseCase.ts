import { inject, injectable } from 'tsyringe';

import { IFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';
import { IIoConnection } from '@modules/users/entities/IIoConnection';
import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IIoConnectionsRepository } from '@modules/users/repositories/IIoConnectionsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateFriendshipRequestError } from './CreateFriendshipRequestError';

type IRequest = {
  userId: string;
  friendId: string;
};

type IResponse = {
  user: IUserMapForPublic;
  friendConnection: IIoConnection;
  friendshipRequest: IFriendshipRequest;
};

@injectable()
export class CreateFriendshipRequestUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FriendshipsRepository')
    private friendshipsRepository: IFriendshipsRepository,

    @inject('IoConnectionsRepository')
    private ioConnectionsRepository: IIoConnectionsRepository
  ) {}

  async execute({ friendId, userId }: IRequest): Promise<IResponse> {
    if (userId === friendId) {
      throw new CreateFriendshipRequestError.UserSameFriend();
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new CreateFriendshipRequestError.UserDoesNotExist();
    }

    const friend = !!(await this.usersRepository.findById(friendId));

    if (!friend) {
      throw new CreateFriendshipRequestError.FriendDoesNotExist();
    }

    const friendshipRequestAlreadyExist = !!(await this.friendshipsRepository.findUndecidedRequest(
      {
        userId,
        friendId,
      }
    ));

    if (friendshipRequestAlreadyExist) {
      throw new CreateFriendshipRequestError.AlreadyExistUndecided();
    }

    const friendshipAlreadyExist = !!(await this.friendshipsRepository.findFriendship(
      {
        friendId,
        userId,
      }
    ));

    if (friendshipAlreadyExist) {
      throw new CreateFriendshipRequestError.UsersAreAlreadyFriends();
    }

    const friendshipRequest = await this.friendshipsRepository.createRequest({
      friendId,
      userId,
    });

    const friendConnection = await this.ioConnectionsRepository.findByUserId(
      friendId
    );

    return {
      friendConnection,
      user: UserMap.mapForPublic(user),
      friendshipRequest,
    };
  }
}
