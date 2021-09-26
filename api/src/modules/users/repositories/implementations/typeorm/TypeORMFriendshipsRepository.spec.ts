import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { IEnumDecisionFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';

import { TypeORMFriendshipsRepository } from './TypeORMFriendshipsRepository';
import { TypeORMUsersRepository } from './TypeORMUsersRepository';

let connection: Connection;
let usersRepository: TypeORMUsersRepository;
let friendshipsRepository: TypeORMFriendshipsRepository;

describe('TypeORM Friendships Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.dropDatabase();
    await connection.runMigrations();

    usersRepository = new TypeORMUsersRepository();
    friendshipsRepository = new TypeORMFriendshipsRepository();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should be able to create a new friendship request and return him', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    expect(friendshipRequest).toBeTruthy();
    expect(friendshipRequest).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        userId: user1.id,
        friendId: user2.id,
        decision: null,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to accept a user friends', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    const acceptedFriendship = await friendshipsRepository.decidedFriendRequest(
      {
        requestId: friendshipRequest.id,
        decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      }
    );

    expect(acceptedFriendship).toBeTruthy();
    expect(acceptedFriendship).toEqual(
      expect.objectContaining({
        friendshipRequest: expect.objectContaining({
          ...friendshipRequest,
          decision: IEnumDecisionFriendshipRequest.ACCEPTED,
        }),
        friendshipUser: expect.objectContaining({
          userId: user1.id,
          friendId: user2.id,
        }),
        friendshipFriend: expect.objectContaining({
          userId: user2.id,
          friendId: user1.id,
        }),
      })
    );
  });

  it('Should be able to reject a user friends', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    const rejectFriendship = await friendshipsRepository.decidedFriendRequest({
      requestId: friendshipRequest.id,
      decision: IEnumDecisionFriendshipRequest.REJECT,
    });

    expect(rejectFriendship).toBeTruthy();
    expect(rejectFriendship).toEqual(
      expect.objectContaining({
        friendshipRequest: expect.objectContaining({
          ...friendshipRequest,
          decision: IEnumDecisionFriendshipRequest.REJECT,
        }),
      })
    );
  });

  it('Should be able to find undecided friends request', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    const getFriendeshipRequest = await friendshipsRepository.findUndecidedRequest(
      {
        userId: user1.id,
        friendId: user2.id,
      }
    );

    expect(getFriendeshipRequest).toBeTruthy();
    expect(getFriendeshipRequest).toEqual(friendshipRequest);
  });

  it('Should be able to find a friendship', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    const acceptedFriendship = await friendshipsRepository.decidedFriendRequest(
      {
        requestId: friendshipRequest.id,
        decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      }
    );

    const getFriendship = await friendshipsRepository.findFriendship({
      friendId: user2.id,
      userId: user1.id,
    });

    expect(getFriendship).toBeTruthy();
    expect(getFriendship).toEqual(acceptedFriendship.friendshipUser);
  });

  it('Should be able to find a friendship request', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    const getFriendship = await friendshipsRepository.findRequestById(
      friendshipRequest.id
    );

    expect(getFriendship).toBeTruthy();
    expect(getFriendship).toEqual(friendshipRequest);
  });

  it('Should be able to delete a friendship request', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    const deletedFriendshipRequest = await friendshipsRepository.deleteFriendRequest(
      friendshipRequest.id
    );

    expect(deletedFriendshipRequest).toBeTruthy();
    expect(deletedFriendshipRequest).toEqual(
      expect.objectContaining({
        ...friendshipRequest,
        deleted: true,
      })
    );
  });

  it('Should be able to get all friendships', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    await friendshipsRepository.decidedFriendRequest({
      decision: IEnumDecisionFriendshipRequest.ACCEPTED,
      requestId: friendshipRequest.id,
    });

    const allFriendships = await friendshipsRepository.getFriendshipsByUser(
      user1.id
    );

    expect(allFriendships).toEqual([user2]);
  });

  it('Should be able to get all sent pendings friendships', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    const allPendingsSentFriendships = await friendshipsRepository.getPendingsSentFriendshipsByUser(
      user1.id
    );

    expect(allPendingsSentFriendships).toEqual([friendshipRequest]);
  });

  it('Should be able to get all received pendings friendships', async () => {
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

    const friendshipRequest = await friendshipsRepository.createRequest({
      userId: user1.id,
      friendId: user2.id,
    });

    const allPendingsSentFriendships = await friendshipsRepository.getPendingsReceivedFriendshipsByUser(
      user2.id
    );

    expect(allPendingsSentFriendships).toEqual([friendshipRequest]);
  });
});
