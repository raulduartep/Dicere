import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IEnumDecisionFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateFriendshipRequestError } from './CreateFriendshipRequestError';
import { CreateFriendshipRequestUseCase } from './CreateFriendshipRequestUseCase';

let usersRepository: IUsersRepository;
let friendshipsRepository: IFriendshipsRepository;
let createFriendshipRequestUseCase: CreateFriendshipRequestUseCase;

describe('Create Friend Request Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    friendshipsRepository = container.resolve('FriendshipsRepository');
    createFriendshipRequestUseCase = container.resolve(
      CreateFriendshipRequestUseCase
    );
  });

  it('Should be able to create a new friendship request', async () => {
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

    const userFriend = await createFriendshipRequestUseCase.execute({
      friendId: friend.id,
      userId: user.id,
    });

    expect(userFriend).toEqual(
      expect.objectContaining({
        friendshipRequest: expect.objectContaining({
          id: expect.any(String),
          userId: user.id,
          friendId: friend.id,
          decision: null,
        }),
        user: expect.objectContaining({
          id: user.id,
        }),
        friendConnection: undefined,
      })
    );
  });

  it('Should not be able to create a new friendship request if user is the same as friend', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    await expect(
      createFriendshipRequestUseCase.execute({
        friendId: user.id,
        userId: user.id,
      })
    ).rejects.toEqual(new CreateFriendshipRequestError.UserSameFriend());
  });

  it('Should not be able to create a new friendship request if user does not exist', async () => {
    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    await expect(
      createFriendshipRequestUseCase.execute({
        friendId: friend.id,
        userId: 'nonexistent user',
      })
    ).rejects.toEqual(new CreateFriendshipRequestError.UserDoesNotExist());
  });

  it('Should not be able to create a new friendship request if friend does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    await expect(
      createFriendshipRequestUseCase.execute({
        friendId: 'nonexistent user',
        userId: user.id,
      })
    ).rejects.toEqual(new CreateFriendshipRequestError.FriendDoesNotExist());
  });

  it('Should not be able to create a new friendship request if user already request the friend', async () => {
    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    await createFriendshipRequestUseCase.execute({
      friendId: friend.id,
      userId: user.id,
    });

    await expect(
      createFriendshipRequestUseCase.execute({
        friendId: friend.id,
        userId: user.id,
      })
    ).rejects.toEqual(new CreateFriendshipRequestError.AlreadyExistUndecided());
  });

  it('Should not be able to create a new friendship request if users are already friends', async () => {
    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friendshipRequest = await createFriendshipRequestUseCase.execute({
      friendId: friend.id,
      userId: user.id,
    });

    await friendshipsRepository.decidedFriendRequest({
      requestId: friendshipRequest.friendshipRequest.id,
      decision: IEnumDecisionFriendshipRequest.ACCEPTED,
    });

    await expect(
      createFriendshipRequestUseCase.execute({
        friendId: friend.id,
        userId: user.id,
      })
    ).rejects.toEqual(
      new CreateFriendshipRequestError.UsersAreAlreadyFriends()
    );
  });
});
