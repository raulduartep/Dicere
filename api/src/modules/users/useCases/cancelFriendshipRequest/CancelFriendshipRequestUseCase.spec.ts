import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IEnumDecisionFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CancelFriendshipRequestError } from './CancelFriendshipRequestError';
import { CancelFriendshipRequestUseCase } from './CancelFriendshipRequestUseCase';

let usersRepository: IUsersRepository;
let friendshipsRepository: IFriendshipsRepository;
let cancelFriendshipRequestUseCase: CancelFriendshipRequestUseCase;

describe('Cancel Friendship Request Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    friendshipsRepository = container.resolve('FriendshipsRepository');
    cancelFriendshipRequestUseCase = container.resolve(
      CancelFriendshipRequestUseCase
    );
  });

  it('Should be able to cancel a friendship request', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    await expect(
      cancelFriendshipRequestUseCase.execute({
        friendshipRequestId: friendshipRequest.id,
        userId: user.id,
      })
    ).resolves.not.toThrow();
  });

  it('Should not be able to cancel a frienship request if user does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    await expect(
      cancelFriendshipRequestUseCase.execute({
        friendshipRequestId: friendshipRequest.id,
        userId: 'nonexistent user',
      })
    ).rejects.toEqual(new CancelFriendshipRequestError.UserDoesNotExist());
  });

  it('Should not be able  to cancel a frienship request if friendship request does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    await expect(
      cancelFriendshipRequestUseCase.execute({
        friendshipRequestId: 'nonexistent friendship request',
        userId: user.id,
      })
    ).rejects.toEqual(
      new CancelFriendshipRequestError.FriendshipRequestDoesNotExist()
    );
  });

  it('Should not be able to cancel a friendship request if friendship request already decided', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    await friendshipsRepository.decidedFriendRequest({
      decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      requestId: friendshipRequest.id,
    });

    await expect(
      cancelFriendshipRequestUseCase.execute({
        friendshipRequestId: friendshipRequest.id,
        userId: user.id,
      })
    ).rejects.toEqual(
      new CancelFriendshipRequestError.FriendshipRequestAlreadyDecided()
    );
  });

  it('Should not be able to cancel a friendship request if friendship request already deleted', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    await friendshipsRepository.deleteFriendRequest(friendshipRequest.id);

    await expect(
      cancelFriendshipRequestUseCase.execute({
        friendshipRequestId: friendshipRequest.id,
        userId: user.id,
      })
    ).rejects.toEqual(
      new CancelFriendshipRequestError.FriendshipRequestAlreadyDeleted()
    );
  });

  it('Should not be able to cancel a frienship request if user is not request owner', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const anotherUser = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const friendshipRequest = await friendshipsRepository.createRequest({
      friendId: friend.id,
      userId: user.id,
    });

    await expect(
      cancelFriendshipRequestUseCase.execute({
        friendshipRequestId: friendshipRequest.id,
        userId: anotherUser.id,
      })
    ).rejects.toEqual(
      new CancelFriendshipRequestError.UserNotAllowedToDeleted()
    );
  });
});
