import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { ICreateGroupDTO } from '@modules/chat/dtos/ICreateGroupDTO';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { TypeORMUsersRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMUsersRepository';

import { TypeORMGroupsRepository } from './TypeORMGroupsRepository';
import { TypeORMRoomsRepository } from './TypeORMRoomsRepository';

let connection: Connection;
let groupsRepository: TypeORMGroupsRepository;
let roomsRepository: TypeORMRoomsRepository;
let usersRepository: TypeORMUsersRepository;

describe('TypeORM Groups Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    groupsRepository = new TypeORMGroupsRepository();
    roomsRepository = new TypeORMRoomsRepository();

    usersRepository = new TypeORMUsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new group and return him', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group: ICreateGroupDTO = {
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    };

    const createdGroup = await groupsRepository.create(group);

    expect(createdGroup).toBeTruthy();
    expect({
      ...createdGroup,
    }).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: group.name,
      })
    );
  });

  it('Should be able to create a new group with the property value deleted as false ', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group: ICreateGroupDTO = {
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    };

    const createdGroup = await groupsRepository.create(group);

    expect(createdGroup).toBeTruthy();
    expect(createdGroup.deleted).toBeFalsy();
  });

  it('Should be able to find a group by id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group = await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    const listedGroup = await groupsRepository.findById(group.id);

    expect(listedGroup).toEqual(group);
  });
});
