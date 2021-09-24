import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { TypeORMUsersRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMUsersRepository';

import { TypeORMRoomsRepository } from './TypeORMRoomsRepository';
import { TypeORMRoomsUsersRepository } from './TypeORMRoomsUsersRepository';

let connection: Connection;
let roomsRepository: TypeORMRoomsRepository;
let roomsUsersRepository: TypeORMRoomsUsersRepository;
let usersRepository: TypeORMUsersRepository;

describe('TypeORM Rooms Users Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    roomsRepository = new TypeORMRoomsRepository();
    usersRepository = new TypeORMUsersRepository();
    roomsUsersRepository = new TypeORMRoomsUsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new room user', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const roomUser = await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    expect(roomUser).toEqual(
      expect.objectContaining({
        roomId: room.id,
        userId: user.id,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to find a room user', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const roomUserCreated = await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const getRoomUser = await roomsUsersRepository.findByRoomAndUser({
      roomId: room.id,
      userId: user.id,
    });

    expect(roomUserCreated).toEqual(getRoomUser);
  });

  it('Should be able to get all rooms users by user id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const room2 = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const roomUser1 = await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const roomUser2 = await roomsUsersRepository.create({
      roomId: room2.id,
      userId: user.id,
    });

    const getRoomsUser = await roomsUsersRepository.getByUserId(user.id);

    expect(getRoomsUser).toEqual(
      expect.arrayContaining([roomUser1, roomUser2])
    );
  });

  it('Should be able to get all rooms users by room id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const user2 = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const roomUser1 = await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const roomUser2 = await roomsUsersRepository.create({
      roomId: room.id,
      userId: user2.id,
    });

    const getRoomUsers = await roomsUsersRepository.getByRoomId(room.id);

    expect(getRoomUsers).toEqual(
      expect.arrayContaining([roomUser1, roomUser2])
    );
  });
});
