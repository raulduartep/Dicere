import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IEnumDecisionFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';
import { UserMap } from '@modules/users/mappers/UserMap';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetFriendshipsError } from './GetFriendshipsError';
import { GetFriendshipsUseCase } from './GetFrienshipsUseCase';

let usersRepository: IUsersRepository;
let friendshipsRepository: IFriendshipsRepository;
let getFriendshipsUseCase: GetFriendshipsUseCase;

describe('Get Friendships Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    friendshipsRepository = container.resolve('FriendshipsRepository');
    getFriendshipsUseCase = container.resolve(GetFriendshipsUseCase);
  });

  it('Should be able to get all friendships', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friend2 = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user.id,
      friendId: friend.id,
    });

    const friendshipRequest2 = await friendshipsRepository.createRequest({
      userId: user.id,
      friendId: friend2.id,
    });

    await friendshipsRepository.decidedFriendRequest({
      decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      requestId: friendshipRequest.id,
    });

    await friendshipsRepository.decidedFriendRequest({
      decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      requestId: friendshipRequest2.id,
    });

    const friends = await getFriendshipsUseCase.execute({ userId: user.id });

    expect(friends).toEqual([
      UserMap.mapForPublic(friend),
      UserMap.mapForPublic(friend2),
    ]);
  });

  it('Shoulh not be able to get all frienships if user does not exist', async () => {
    await expect(
      getFriendshipsUseCase.execute({ userId: 'nonexistent user' })
    ).rejects.toEqual(new GetFriendshipsError.UserDoesNotExist());
  });
});
