import { inject, injectable } from 'tsyringe';

import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetFriendshipsError } from './GetFriendshipsError';

type IRequest = {
  userId: string;
};

type IResponse = IUserMapForPublic[];

@injectable()
export class GetFriendshipsUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FriendshipsRepository')
    private frienshipsRepository: IFriendshipsRepository
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new GetFriendshipsError.UserDoesNotExist();
    }

    const friendships = await this.frienshipsRepository.getFriendshipsByUser(
      userId
    );

    const friends = await Promise.all(
      friendships.map(async friendship => {
        const friend = await this.usersRepository.findById(friendship.friendId);

        return UserMap.mapForPublic(friend);
      })
    );

    return friends;
  }
}
