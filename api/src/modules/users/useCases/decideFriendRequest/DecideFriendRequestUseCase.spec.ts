import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IEnumDecisionFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { DecidedFriendRequestError } from './DecideFriendRequestError';
import { DecideFriendRequestUseCase } from './DecideFriendRequestUseCase';

let usersRepository: IUsersRepository;
let friendshipsRepository: IFriendshipsRepository;
let decideFriendRequestUseCase: DecideFriendRequestUseCase;

describe('Create Friend Request Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    friendshipsRepository = container.resolve('FriendshipsRepository');
    decideFriendRequestUseCase = container.resolve(DecideFriendRequestUseCase);
  });

  it('Should be able to accept a friend request and return him', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    const decidedUserFriend = await decideFriendRequestUseCase.execute({
      requestId: friendshipRequest.id,
      userId: friend.id,
      decision: IEnumDecisionFriendshipRequest.ACCEPTED,
    });

    expect(decidedUserFriend).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: friend.id,
        }),
        friendConnection: undefined,
        friend: expect.objectContaining({
          id: user.id,
        }),
      })
    );
  });

  it('Should be able to reject a friend request and return him', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    const decidedUserFriend = await decideFriendRequestUseCase.execute({
      requestId: friendshipRequest.id,
      userId: friend.id,
      decision: IEnumDecisionFriendshipRequest.REJECT,
    });

    expect(decidedUserFriend).toEqual(
      expect.objectContaining({
        user: undefined,
        friendConnection: undefined,
        friend: undefined,
      })
    );
  });

  it('Should not be able to decide a friend request if user does not exist', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    await expect(
      decideFriendRequestUseCase.execute({
        requestId: friendshipRequest.id,
        userId: 'nonexistent user',
        decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      })
    ).rejects.toEqual(new DecidedFriendRequestError.UserDoesNotExist());
  });

  it('Should not be able to decide a friend request if friendship request does not exist', async () => {
    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    await expect(
      decideFriendRequestUseCase.execute({
        requestId: 'nonexistent friendship request',
        userId: friend.id,
        decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      })
    ).rejects.toEqual(
      new DecidedFriendRequestError.UserFriendRequestDoesNotExist()
    );
  });

  it('Should not be able to decide a friend request if user is not request owner', async () => {
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

    const anotherUser = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    await expect(
      decideFriendRequestUseCase.execute({
        requestId: friendshipRequest.id,
        userId: anotherUser.id,
        decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      })
    ).rejects.toEqual(new DecidedFriendRequestError.UserNotAllowedToDecide());
  });

  it('Should not be able to decide a  friend request if the friendship request is already decided', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    await decideFriendRequestUseCase.execute({
      requestId: friendshipRequest.id,
      userId: friend.id,
      decision: IEnumDecisionFriendshipRequest.ACCEPTED,
    });

    await expect(
      decideFriendRequestUseCase.execute({
        requestId: friendshipRequest.id,
        userId: friend.id,
        decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      })
    ).rejects.toEqual(
      new DecidedFriendRequestError.UserFriendRequestAlreadyDecided()
    );
  });
});
