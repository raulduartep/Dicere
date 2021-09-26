import faker from 'faker';
import { container } from 'tsyringe';

import { UserMap } from '@modules/users/mappers/UserMap';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetPendingsFriendshipsError } from './GetPendingsFriendshipsError';
import { GetPendingsFriendshipsUseCase } from './GetPendingsFriendshipsUseCase';

let usersRepository: IUsersRepository;
let friendshipsRepository: IFriendshipsRepository;
let getPendingsFriendshipsUseCase: GetPendingsFriendshipsUseCase;

describe('Get Pendings Friendships Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    friendshipsRepository = container.resolve('FriendshipsRepository');
    getPendingsFriendshipsUseCase = container.resolve(
      GetPendingsFriendshipsUseCase
    );
  });

  it('Should be able to get all pendings friendships', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const user1 = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const user2 = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const user3 = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user.id,
      friendId: user1.id,
    });

    const friendshipRequest2 = await friendshipsRepository.createRequest({
      userId: user.id,
      friendId: user2.id,
    });

    const friendshipRequest3 = await friendshipsRepository.createRequest({
      userId: user3.id,
      friendId: user.id,
    });

    const pendingsFriendships = await getPendingsFriendshipsUseCase.execute({
      userId: user.id,
    });

    expect(pendingsFriendships).toEqual({
      receivedPendingsFriendships: expect.arrayContaining([
        { friend: UserMap.mapForPublic(user3), friendship: friendshipRequest3 },
      ]),
      sentPendingsFriendships: expect.arrayContaining([
        { friend: UserMap.mapForPublic(user1), friendship: friendshipRequest },
        { friend: UserMap.mapForPublic(user2), friendship: friendshipRequest2 },
      ]),
    });
  });

  it('Should not be able to get all pendings friendships if user does not exist', async () => {
    expect(
      getPendingsFriendshipsUseCase.execute({
        userId: 'nonexistent user',
      })
    ).rejects.toEqual(new GetPendingsFriendshipsError.UserDoesNotExist());
  });
});
