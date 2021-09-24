import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { ICreateIoConnectionsDTO } from '@modules/users/dtos/ICreateIoConnectionDTO';
import { TypeORMUsersRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMUsersRepository';

import { TypeORMIoConnectionsRepository } from './TypeORMIoConnectionsRepository';

let connection: Connection;
let ioConnectionRepository: TypeORMIoConnectionsRepository;
let usersRepository: TypeORMUsersRepository;

describe('TypeORM IoConnection Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    ioConnectionRepository = new TypeORMIoConnectionsRepository();

    usersRepository = new TypeORMUsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new ioConnection and return him', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const ioConnection: ICreateIoConnectionsDTO = {
      socketId: faker.datatype.uuid(),
      userId: user.id,
    };

    const createdIoConnection = await ioConnectionRepository.create(
      ioConnection
    );

    expect({
      ...createdIoConnection,
      createdAt: new Date(createdIoConnection.createdAt),
      updatedAt: new Date(createdIoConnection.updatedAt),
    }).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        socketId: ioConnection.socketId,
        userId: ioConnection.userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it('Should be able to get a io connection by user id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const createdIoConnection = await ioConnectionRepository.create({
      socketId: faker.datatype.uuid(),
      userId: user.id,
    });

    const getIoConnection = await ioConnectionRepository.findByUserId(user.id);

    expect(getIoConnection).toBeTruthy();
    expect({
      ...getIoConnection,
      createdAt: new Date(getIoConnection.createdAt),
      updatedAt: new Date(getIoConnection.updatedAt),
    }).toEqual(
      expect.objectContaining({
        id: createdIoConnection.id,
        userId: user.id,
        socketId: createdIoConnection.socketId,
        createdAt: new Date(createdIoConnection.createdAt),
        updatedAt: new Date(createdIoConnection.updatedAt),
      })
    );
  });

  it('Should be able to get a io connection by socket id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const createdIoConnection = await ioConnectionRepository.create({
      socketId: faker.datatype.uuid(),
      userId: user.id,
    });

    const getIoConnection = await ioConnectionRepository.findBySocketId(
      createdIoConnection.socketId
    );

    expect(getIoConnection).toBeTruthy();
    expect({
      ...getIoConnection,
      createdAt: new Date(getIoConnection.createdAt),
      updatedAt: new Date(getIoConnection.updatedAt),
    }).toEqual(
      expect.objectContaining({
        id: createdIoConnection.id,
        userId: user.id,
        socketId: createdIoConnection.socketId,
        createdAt: new Date(createdIoConnection.createdAt),
        updatedAt: new Date(createdIoConnection.updatedAt),
      })
    );
  });

  it('Should be able to update io connection data by id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const createdIoConnection = await ioConnectionRepository.create({
      socketId: faker.datatype.uuid(),
      userId: user.id,
    });

    const newSocketId = faker.datatype.uuid();

    await ioConnectionRepository.updateById(createdIoConnection.id, {
      socketId: newSocketId,
    });

    const getIoConnection = await ioConnectionRepository.findBySocketId(
      newSocketId
    );

    expect(getIoConnection).toBeTruthy();
    expect({
      ...getIoConnection,
      createdAt: new Date(getIoConnection.createdAt),
      updatedAt: new Date(getIoConnection.updatedAt),
    }).toEqual(
      expect.objectContaining({
        id: createdIoConnection.id,
        userId: user.id,
        socketId: newSocketId,
        createdAt: new Date(createdIoConnection.createdAt),
        updatedAt: expect.any(Date),
      })
    );
  });
});
