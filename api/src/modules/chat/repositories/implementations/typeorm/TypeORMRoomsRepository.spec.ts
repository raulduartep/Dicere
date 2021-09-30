import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { ICreateRoomDTO } from '@modules/chat/dtos/ICreateRoomDTO';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { TypeORMUsersRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMUsersRepository';

import { TypeORMGroupsRepository } from './TypeORMGroupsRepository';
import { TypeORMRoomsRepository } from './TypeORMRoomsRepository';

let connection: Connection;
let roomsRepository: TypeORMRoomsRepository;
let usersRepository: TypeORMUsersRepository;
let groupsRepository: TypeORMGroupsRepository;

describe('TypeORM Rooms Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    roomsRepository = new TypeORMRoomsRepository();
    usersRepository = new TypeORMUsersRepository();
    groupsRepository = new TypeORMGroupsRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new room with type private and return him', async () => {
    const room: ICreateRoomDTO = {
      typeConversation: IRoomTypeEnum.PRIVATE,
    };

    const createdRoom = await roomsRepository.create(room);

    expect(createdRoom).toBeTruthy();
    expect(createdRoom).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        typeConversation: room.typeConversation,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it('Should be able to create a new room with type group and return him', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const room: ICreateRoomDTO = {
      typeConversation: IRoomTypeEnum.GROUP,
    };

    const createdRoom = await roomsRepository.create(room);

    await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: createdRoom.id,
      adminId: user.id,
    });

    expect(createdRoom).toBeTruthy();
    expect(createdRoom).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        typeConversation: room.typeConversation,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it('Should be able to create a new room with the property value active as true  and return him', async () => {
    const room: ICreateRoomDTO = {
      typeConversation: IRoomTypeEnum.PRIVATE,
    };

    const createdRoom = await roomsRepository.create(room);

    expect(createdRoom).toBeTruthy();
    expect(createdRoom.active).toBeTruthy();
  });

  it('Should be able to find a room by id', async () => {
    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const getRoom = await roomsRepository.findById(room.id);

    expect(getRoom).toEqual(room);
  });
});
